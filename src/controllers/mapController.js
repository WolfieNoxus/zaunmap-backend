const Map = require('../models/mapModel');
const User = require('../models/userModel');
const axios = require('axios');
const JSZip = require('jszip');
const shpjs = require('shpjs');
const { DOMParser } = require('xmldom');
const toGeoJSON = require('@tmcw/togeojson');

exports.createMap = async (req, res) => {
    try {
        const userId = req.query.userId;
        // Validate the query parameters
        if (!userId) {
            return res.status(400).json({ message: "Missing userId in query parameters" });
        }

        // Initialize an empty GeoJSON object
        const emptyGeoJSON = {
            "type": "FeatureCollection",
            "features": []
        };

        // Set headers for raw data payload
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        // Perform the HTTP POST request to send the empty GeoJSON
        const postResponse = await axios.post(`https://zaunmap.pages.dev/file?user_id=${userId}`, emptyGeoJSON, config);

        // check and Extract the objectId from the POST response
        const objectId = postResponse.data.object_id;

        // Create a new Map instance with the userId and objectId
        const newMap = new Map({ author: userId, objectId: objectId, mapId: Date.now() });

        // Save the new map to the database
        await newMap.save();

        // Simulated database operations for finding the user and saving the map
        const user = await User.findOne({ userId: userId });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.maps.push(newMap._id);
        await user.save();

        // Send a successful response with the new map details
        res.status(201).json(newMap);
    } catch (error) {
        // Handle any errors that occur during the process
        res.status(500).json({ message: "Error creating map", error: error.message, error: error, stack: error.stack });
    }
};

exports.importMap = async (req, res) => {
    try {
        const userId = req.query.userId;
        const mapId = req.query.mapId;
        const objectId = req.query.objectId;
        const rawDataResponse = await axios.get(`https://zaunmap.pages.dev/file/?user_id=${userId}&object_id=${objectId}`, { responseType: 'arraybuffer' });
        const rawData = rawDataResponse.data;
        let format = 'json'; // Default format
        if (rawDataResponse.headers['content-type']) {
            format = rawDataResponse.headers['content-type'].split('/')[1];
        }
        const geoJsonData = await convertToGeoJson(rawData, format);
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const targetMap = await Map.findOne({ _id: mapId });
        const targetMapId = targetMap.objectId;
        await axios.put(`https://zaunmap.pages.dev/file/?user_id=${userId}&object_id=${targetMapId}`, geoJsonData, config);
        res.status(200).send('Map imported successfully');
    } catch (error) {
        res.status(500).send(`Error importing map: ${error.message}`);
    }
};

async function convertToGeoJson(data, format) {
    switch (format) {
        case 'json':
            return JSON.parse(data);
        case 'xml':
            return convertXmlToGeoJson(data);
        case 'x-esri-shape':
            return convertShapeToGeoJson(data);
        case 'zip':
            return convertZipToGeoJson(data);
        default:
            throw new Error('Unsupported format');
    }
}

async function convertXmlToGeoJson(xmlData) {
    // Parse the KML to a DOM
    const parser = new DOMParser();
    const kmlDom = parser.parseFromString(Buffer.from(xmlData).toString(), 'text/xml');

    // Convert the KML to GeoJSON
    const geoJSON = toGeoJSON.kml(kmlDom);

    return geoJSON;
}

async function convertShapeToGeoJson(shapeData) {
    return await shpjs.parseShp(shapeData);
}

async function convertZipToGeoJson(zipData) {
    const zip = await JSZip.loadAsync(zipData);
    const shpFile = await findFileInZip(zip, '.shp');
    const dbfFile = await findFileInZip(zip, '.dbf');
    return await shpjs.combine([await shpjs.parseShp(shpFile), await shpjs.parseDbf(dbfFile)]);
}

async function findFileInZip(zip, extension) {
    const files = Object.keys(zip.files).filter(fileName => fileName.endsWith(extension));
    if (files.length === 0) {
        throw new Error(`No ${extension} file found in ZIP`);
    }
    return await zip.files[files[0]].async("nodebuffer");
}

exports.getMap = async (req, res) => {
    try {
        const mapId = req.query.mapId;
        // Validate the query parameters
        if (!mapId) {
            return res.status(400).json({ message: "Missing mapId in query parameters" });
        }

        // Find the map with the provided mapId
        const map = await Map.findOne({ _id: mapId });
        if (!map) {
            return res.status(404).json({ message: "Map not found" });
        }

        // Send the map in the response
        res.status(200).json(map);
    } catch (error) {
        // Handle any errors that occur during the process
        res.status(500).json({ message: "Error getting map", error: error.message });
    }
}

exports.getAllPublicMaps = async (req, res) => {
    try {
        // Find all maps that are public
        const maps = await Map.find({ public: true });

        // Send the maps in the response
        res.status(200).json(maps);
    } catch (error) {
        // Handle any errors that occur during the process
        res.status(500).json({ message: "Error getting maps", error: error.message });
    }
}

exports.getAllMaps = async (req, res) => {
    try {
        // Find all maps that are public
        const maps = await Map.find({});

        // Send the maps in the response
        res.status(200).json(maps);
    } catch (error) {
        // Handle any errors that occur during the process
        res.status(500).json({ message: "Error getting maps", error: error.message });
    }
}

exports.updateMapMetadata = async (req, res) => {
    try {
        const mapId = req.query.mapId;
        const map = await Map.findOne({ _id: mapId });
        Object.assign(map, req.body);
        await map.save();
        res.status(200).json(map);
    }
    catch (error) {
        res.status(404).send(error.message);
    }
}

exports.deleteMap = async (req, res) => {
    try {
        const mapId = req.query.mapId;
        const map = await Map.findById(mapId);
        const userId = map.owner;
        const objectId = map.objectId;
        await axios.delete(`https://zaunmap.pages.dev/file/?user_id=${userId}&object_id=${objectId}`);
        await map.delete();
        res.status(200).send('Map deleted successfully');
    }
    catch (error) {
        res.status(404).send(error.message);
    }
}

exports.rateMap = async (req, res) => {
    try {
        const mapId = req.query.mapId;
        const userId = req.query.userId;
        const rating = req.query.rating;
        const map = await Map.findById(mapId);
        const ratingObj = { userId: userId, rating: rating };
        const ratings = map.ratings;
        const existingRating = ratings.find(rating => rating.userId === userId);
        if (existingRating) {
            existingRating.rating = rating;
        }
        else {
            ratings.push(ratingObj);
        }
        map.ratings = ratings;
        const ratingCount = ratings.length;
        const ratingSum = ratings.reduce((sum, rating) => sum + rating.rating, 0);
        map.averageRating = ratingSum / ratingCount;
        map.ratingCount = ratingCount;
        await map.save();
        res.status(200).send('Map rated successfully');
    }
    catch (error) {
        res.status(404).send(error.message);
    }
}
