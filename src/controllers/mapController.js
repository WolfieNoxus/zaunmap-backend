const Map = require('../models/mapModel');
const User = require('../models/userModel');
const axios = require('axios');
const JSZip = require('jszip');
const shpjs = require('shpjs');
const { DOMParser } = require('xmldom');
const toGeoJSON = require('@tmcw/togeojson');

// Function to retrieve a specific map by mapId
exports.getMap = async (req, res) => {
    try {
        // Extract mapId from query parameters
        const mapId = req.query.mapId;
        if (!mapId) {
            // Respond with an error if mapId is not provided
            return res.status(400).json({ message: "Missing mapId in query parameters" });
        }

        // Find the map with the provided mapId
        const map = await Map.findOne({ _id: mapId });
        if (!map) {
            // Respond with an error if the map is not found
            return res.status(404).json({ message: "Map not found" });
        }

        // Send the found map in the response
        res.status(200).json(map);
    } catch (error) {
        // Handle any errors that occur during the process
        res.status(500).json({ message: "Error getting map", error: error.message });
    }
};

// Function to search for maps based on name, tags, and optional sorting
exports.searchMaps = async (req, res) => {
    try {
        // Extract search and sorting parameters from query
        const name = req.query.name;
        const tags = req.query.tags;
        const sortBy = req.query.sortBy;
        const sortOrder = req.query.sortOrder;

        // Retrieve all public maps
        let maps = await Map.find({ isPublic: true });

        // Filter maps by name if provided
        if (name) {
            maps = maps.filter(map => map.name.toLowerCase().includes(name.toLowerCase()));
        }

        // Filter maps by tags if provided
        if (tags) {
            const tagsArray = tags.split(',');
            maps = maps.filter(map => map.tags.some(tag => tagsArray.includes(tag)));
        }

        // Sort maps if sorting parameters are provided
        if (sortBy && sortOrder) {
            maps = maps.sort((a, b) => sortOrder === 'asc' ? (a[sortBy] < b[sortBy] ? -1 : 1) : (a[sortBy] > b[sortBy] ? 1 : -1));
        }

        // Send the sorted/filtered map list in the response
        res.status(200).json(maps);
    } catch (error) {
        // Handle any errors that occur during the process
        res.status(500).json({ message: "Error searching maps", error: error.message });
    }
};

// Function to create a new map
exports.createMap = async (req, res) => {
    try {
        // Validate the authorization token from the request header
        const bearerHeader = req.headers['authorization'];
        if (!bearerHeader) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const bearer = bearerHeader.split(' ');
        if (bearer.length !== 2) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const token = bearer[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Decode the JWT token to get user information
        const decoded = jwt.decode(token);
        if (!decoded) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Retrieve userId from the decoded token
        const userId = decoded.sub;
        if (!userId) {
            return res.status(400).json({ message: "Missing userId in query parameters" });
        }

        // Prepare empty GeoJSON structure
        const emptyGeoJSON = {
            "type": "FeatureCollection",
            "features": []
        };

        // Post the empty GeoJSON to an external service to create an object ID
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const postResponse = await axios.post(`https://zaunmap.pages.dev/file?user_id=${userId}`, emptyGeoJSON, config);
        const objectId = postResponse.data.object_id;
        if (!objectId) {
            return res.status(404).json({ message: "Object ID not found" });
        }

        // Create a new map with the object ID
        const newMap = new Map({ owner: userId, objectId: objectId });

        // Find the user and check their role
        const user = await User.findOne({ userId: userId });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (user.role == 'restricted') {
            newMap.isPublic = false;
        }
        if (user.role == 'disabled') {
            return res.status(403).json({ message: "User is disabled" });
        }

        // Add the new map to the user's map collection and save changes
        user.maps.push(newMap._id);
        await newMap.save();
        await user.save();

        // Respond with the created map
        res.status(201).json(newMap);
    } catch (error) {
        // Handle any errors during the process
        res.status(500).json({ message: "Error creating map", error: error.message, stack: error.stack });
    }
};

// Function to update the details of an existing map
exports.updateMap = async (req, res) => {
    try {
        // Validate the authorization token from the request header
        const bearerHeader = req.headers['authorization'];
        if (!bearerHeader) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const bearer = bearerHeader.split(' ');
        if (bearer.length !== 2) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const token = bearer[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Decode the JWT token to get user information
        const decoded = jwt.decode(token);
        if (!decoded) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Retrieve userId from the decoded token
        const userId = decoded.sub;
        if (!userId) {
            return res.status(400).json({ message: "Missing userId in query parameters" });
        }

        // Find the user in the database
        const user = await User.findOne({ userId: userId });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Extract mapId from query parameters
        const mapId = req.query.mapId;
        if (!mapId) {
            return res.status(400).json({ message: "Missing mapId in query parameters" });
        }

        // Find the map to be updated
        const map = await Map.findById(mapId);
        if (!map) {
            return res.status(404).json({ message: "Map not found" });
        }

        // Check if the requesting user is the owner of the map
        if (map.owner !== userId) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        // Update map details based on the provided data
        const { name, description, tags, isPublic, meta } = req.body;
        if (name) map.name = name;
        if (description) map.description = description;
        if (tags) map.tags = tags;
        if (typeof isPublic === 'boolean') {
            map.isPublic = user.role !== 'restricted' ? isPublic : false;
        }
        if (meta) map.meta = meta;

        // Save the updated map to the database
        await map.save();

        // Send the updated map in the response
        res.status(200).json(map);
    } catch (error) {
        // Handle any errors during the process
        res.status(500).json({ message: "Error updating map", error: error.message });
    }
};

<<<<<<< HEAD
exports.updateMap = async (req, res) => {
    try {
        const mapId = req.query.mapId;
        const map = await Map.findById(mapId);
        if (!map) {
            return res.status(404).json({ message: "Map not found" });
        }
        const newName = req.body.name;
        const newDescription = req.body.description;
        const newTags = req.body.tags;
        const newIsPublic = req.body.isPublic;
        const newMeta = req.body.meta;
        if (newMeta) {
            map.meta = newMeta;
        }
        if (newName) {
            map.name = newName;
        }
        if (newDescription) {
            map.description = newDescription;
        }
        if (newTags) {
            map.tags = newTags;
        }
        if (newIsPublic === true || newIsPublic === false) {
            map.isPublic = newIsPublic;
        }
        await map.save();
        res.status(200).json(map);
    } catch (error) {
        res.status(500).json({ message: "Error updating map", error: error.message });
    }
}

=======
// Function to handle rating a map
>>>>>>> jwt
exports.rateMap = async (req, res) => {
    try {
        // Validate the authorization token from the request header
        const bearerHeader = req.headers['authorization'];
        if (!bearerHeader) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const bearer = bearerHeader.split(' ');
        if (bearer.length !== 2) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const token = bearer[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Decode the JWT token to get user information
        const decoded = jwt.decode(token);
        if (!decoded) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Retrieve userId from the decoded token and mapId, rating from query parameters
        const userId = decoded.sub;
        const mapId = req.query.mapId;
        const rating = parseInt(req.query.rating, 10);
        if (!userId) {
            return res.status(400).json({ message: "Missing userId in query parameters" });
        }

        // Find the user and check their role
        const user = await User.findOne({ userId: userId });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (user.role === 'disabled' || user.role === 'restricted') {
            return res.status(403).json({ message: "Unauthorized" });
        }

        // Validate mapId and rating
        if (!mapId) {
            return res.status(400).json({ message: "Missing mapId in query parameters" });
        }
        if (isNaN(rating) || rating < 0 || rating > 5) {
            return res.status(400).json({ message: "Rating must be between 0 and 5" });
        }

        // Find the map and update its ratings
        const map = await Map.findById(mapId);
        if (!map) {
            return res.status(404).json({ message: "Map not found" });
        }

        // Check for an existing rating by the user and update or add new rating
        const existingRatingIndex = map.ratings.findIndex(r => r.userId === userId);
        if (existingRatingIndex !== -1) {
            map.ratings[existingRatingIndex].rating = rating;
        } else {
            map.ratings.push({ userId, rating });
        }

        // Recalculate the average rating
        const totalRating = map.ratings.reduce((acc, r) => acc + r.rating, 0);
        map.averageRating = totalRating / map.ratings.length;
        map.ratingCount = map.ratings.length;

        // Save the updated map to the database
        await map.save();

        // Send the updated map in the response
        res.status(200).json(map);
    } catch (error) {
        // Handle any errors during the process
        res.status(500).send(`Error rating map: ${error.message}`);
    }
};

// Function to import a map from another map's data
exports.importMap = async (req, res) => {
    try {
<<<<<<< HEAD
        const userId = req.query.userId;
        const objectOwner = req.query.objectOwner || userId;
        const mapId = req.query.mapId;
        const objectId = req.query.objectId;
        // check the query parameters
        if (!userId) {
            return res.status(400).json({ message: "Missing userId in query parameters" });
=======
        // Validate the authorization token from the request header
        const bearerHeader = req.headers['authorization'];
        if (!bearerHeader) {
            return res.status(401).json({ message: 'Unauthorized' });
>>>>>>> jwt
        }
        const bearer = bearerHeader.split(' ');
        if (bearer.length !== 2) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const token = bearer[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Decode the JWT token to get user information
        const decoded = jwt.decode(token);
        if (!decoded) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Retrieve userId, mapId, and objectId from query parameters
        const userId = decoded.sub;
        const mapId = req.query.mapId;
        const objectId = req.query.objectId;
        if (!userId || !mapId || !objectId) {
            return res.status(400).json({ message: "Missing required query parameters" });
        }

        // Find the user and the map in the database
        const user = await User.findOne({ userId: userId });
        const map = await Map.findById(mapId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (!map || map.owner !== userId) {
            return res.status(404).json({ message: "Map not found or unauthorized" });
        }

        // Find the map associated with the objectId
        const objectMap = await Map.findOne({ objectId: objectId });
        if (!objectMap) {
            return res.status(404).json({ message: "Map not found" });
        }

<<<<<<< HEAD
        const rawDataResponse = await axios.get(`https://zaunmap.pages.dev/file/?user_id=${objectOwner}&object_id=${objectId}`, { responseType: 'arraybuffer' });
=======
        // Retrieve the raw data of the object to be imported
        const rawDataResponse = await axios.get(`https://zaunmap.pages.dev/file/?user_id=${objectMap.owner}&object_id=${objectId}`, { responseType: 'arraybuffer' });
>>>>>>> jwt
        const rawData = rawDataResponse.data;

        // Determine the format of the raw data
        let format = 'json'; // Default format
        if (rawDataResponse.headers['content-type']) {
            format = rawDataResponse.headers['content-type'].split('/')[1];
        }

        // Convert the raw data to GeoJSON format
        const geoJsonData = await convertToGeoJson(rawData, format);

        // Update the target map with the imported data
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        await axios.put(`https://zaunmap.pages.dev/file/?user_id=${userId}&object_id=${map.objectId}`, geoJsonData, config);

        // Send a success response
        res.status(200).send('Map imported successfully');
    } catch (error) {
        // Handle any errors during the process
        res.status(500).send(`Error importing map: ${error.message}`);
    }
};

// Function to convert various data formats to GeoJSON
async function convertToGeoJson(data, format) {
    switch (format) {
        case 'json':
            // Directly parse JSON data
            return JSON.parse(data);
        case 'vnd.google-earth.kml+xml':
        case 'kml':
            // Convert KML format to GeoJSON
            return convertXmlToGeoJson(data);
        case 'x-esri-shape':
            // Convert ESRI Shape format to GeoJSON
            return convertShapeToGeoJson(data);
        case 'zip':
            // Convert ZIP file containing SHP and DBF files to GeoJSON
            return convertZipToGeoJson(data);
        default:
            // Handle unsupported formats
            throw new Error('Unsupported format');
    }
}

// Function to convert XML (KML) data to GeoJSON
async function convertXmlToGeoJson(xmlData) {
    // Parse the KML to a DOM structure
    const parser = new DOMParser();
    const kmlDom = parser.parseFromString(Buffer.from(xmlData).toString(), 'text/xml');

    // Convert the KML DOM to GeoJSON
    const geoJSON = toGeoJSON.kml(kmlDom);

    return geoJSON;
}

// Function to convert Shapefile data to GeoJSON
async function convertShapeToGeoJson(shapeData) {
    // Parse Shapefile data
    return await shpjs.parseShp(shapeData);
}

// Function to convert ZIP archive to GeoJSON
async function convertZipToGeoJson(zipData) {
    // Load the ZIP file
    const zip = await JSZip.loadAsync(zipData);

    // Find and extract the SHP and DBF files from the ZIP
    const shpFile = await findFileInZip(zip, '.shp');
    const dbfFile = await findFileInZip(zip, '.dbf');

    // Combine SHP and DBF files into GeoJSON
    return await shpjs.combine([await shpjs.parseShp(shpFile), await shpjs.parseDbf(dbfFile)]);
}

// Helper function to find a specific file within a ZIP archive
async function findFileInZip(zip, extension) {
    // Filter the files in the ZIP to find the one with the specified extension
    const files = Object.keys(zip.files).filter(fileName => fileName.endsWith(extension));
    if (files.length === 0) {
        // Handle case where the specified file type is not found in the ZIP
        throw new Error(`No ${extension} file found in ZIP`);
    }

    // Return the contents of the found file as a buffer
    return await zip.files[files[0]].async("nodebuffer");
}

// Function to delete a map
exports.deleteMap = async (req, res) => {
    try {
        // Validate the authorization token from the request header
        const bearerHeader = req.headers['authorization'];
        if (!bearerHeader) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const bearer = bearerHeader.split(' ');
        if (bearer.length !== 2) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const token = bearer[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Decode the JWT token to get user information
        const decoded = jwt.decode(token);
        if (!decoded) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Retrieve userId from the decoded token and mapId from query parameters
        const userId = decoded.sub;
        const mapId = req.query.mapId;
        if (!userId || !mapId) {
            return res.status(400).json({ message: "Missing required query parameters" });
        }

        // Find the map in the database
        const map = await Map.findById(mapId);
        if (!map) {
            return res.status(404).json({ message: "Map not found" });
        }

        // Check if the requesting user is the owner of the map
        if (map.owner !== userId) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        // Delete the map's external data
        const objectId = map.objectId;
        await axios.delete(`https://zaunmap.pages.dev/file/?user_id=${userId}&object_id=${objectId}`);

        // Delete the map from the database
        await map.delete();

        // Remove the map from the user's map collection
        const user = await User.findOne({ userId: userId });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.maps.pull(mapId);
        await user.save();

        // Send a success response
        res.status(200).send('Map deleted successfully');
    } catch (error) {
        // Handle any errors during the process
        res.status(500).send(`Error deleting map: ${error.message}`);
    }
};
