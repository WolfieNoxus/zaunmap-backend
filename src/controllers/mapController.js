const Map = require('../models/mapModel');
const User = require('../models/userModel');
const axios = require('axios');
const FormData = require('form-data');
const toGeoJSON = require('@tmcw/togeojson');
const shpjs = require('shpjs');
const JSZip = require('jszip');
const { parse } = require('fast-xml-parser');

exports.createMap = async (req, res) => {
    try {
        const user_id = req.query.user_id;
        // Validate the query parameters
        if (!user_id) {
            return res.status(400).json({ message: "Missing user_id in query parameters" });
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
        const postResponse = await axios.post(`https://zaunmap.pages.dev/file?user_id=${user_id}`, emptyGeoJSON, config);

        // check and Extract the object_id from the POST response
        const object_id = postResponse.data.object_id;

        // Create a new Map instance with the user_id and object_id
        const newMap = new Map({ author: user_id, object_id: object_id, map_id: Date.now()});
        
        // Save the new map to the database
        await newMap.save();

        // Simulated database operations for finding the user and saving the map
        const user = await User.findOne({ user_id: user_id });
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
        const user_id = req.query.user_id;
        const map_id = req.query.map_id;
        const object_id = req.query.object_id;

        // link the object_id to the map
        Object.assign(Map.findOne({ _id: map_id }), { object_id: object_id });

        // Get raw data
        const rawDataResponse = await axios.get(`https://zaunmap.pages.dev/file/?user_id=${user_id}&object_id=${object_id}`, { responseType: 'arraybuffer' });
        let rawData = rawDataResponse.data;

        // Get format from response headers Content-Type
        const format = rawDataResponse.headers['content-type'].split('/')[1] || 'json';

        // Convert to GeoJSON
        let geoJsonData = await convertToGeoJson(rawData, format);
        console.log("geojson data successful");

        res.send(geoJsonData);

        const config = {
            headers: 'application/json'
        };
        await axios.put(`https://zaunmap.pages.dev/file/?user_id=${user_id}&object_id=${object_id}`, geoJsonData, config);

        res.send('Map import successful');
    } catch (error) {
        console.error('Error importing map:', error);
        res.status(500).send('Error importing map');
    }
};

async function convertToGeoJson(data, format) {
    switch (format) {
        case 'json':
            return JSON.parse(data);
        case 'xml':
            const xml = data.toString('utf-8');
            const kmlObject = parse(xml, { ignoreAttributes: false });
            return toGeoJSON.kml(kmlObject);
        case 'x-esri-shape':
            return await shpjs.parseZip(data);
        case 'zip': // Assuming ZIP contains SHP files
            const zip = await JSZip.loadAsync(data);
            const shpFile = await findFileInZip(zip, '.shp');
            const dbfFile = await findFileInZip(zip, '.dbf');
            return await shpjs.combine([await shpjs.parseShp(shpFile), await shpjs.parseDbf(dbfFile)]);
        default:
            throw new Error('Unsupported format');
    }
}

async function findFileInZip(zip, extension) {
    const fileNames = Object.keys(zip.files).filter(name => name.endsWith(extension));
    if (fileNames.length === 0) {
        throw new Error(`No ${extension} file found in ZIP`);
    }
    return await zip.file(fileNames[0]).async('arraybuffer');
}

exports.getMap = async (req, res) => {
    try {
        const _id = req.query._id;
        // Validate the query parameters
        if (!_id) {
            return res.status(400).json({ message: "Missing _id in query parameters" });
        }

        // Find the map with the provided map_id
        const map = await Map.findOne({ _id: _id });
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
        const _id = req.query._id;
        const map = await Map.findOne({ _id: _id });
        Object.assign(map, req.body);
        await map.save();
        res.status(200).json(map);
    }
    catch (error) {
        res.status(404).send(error.message);
    }
}

exports.getMapJSON = async (req, res) => {
    try {
        const _id = req.query._id;
        const map = await Map.findOne({ _id: _id });
        const object_id = map.object_id;
        const user_id = map.author;
        const rawDataResponse = await axios.get(`https://zaunmap.pages.dev/file/?user_id=${user_id}&object_id=${object_id}`, { responseType: 'arraybuffer' });
        let rawData = rawDataResponse.data;
        let geoJsonData = await convertToGeoJson(rawData, 'json');
        res.send(geoJsonData);
    }
    catch (error) {
        res.status(404).send(error.message);
    }
}
