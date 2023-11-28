const Map = require('../models/mapModel');
const User = require('../models/userModel');
const axios = require('axios');
const FormData = require('form-data');
const toGeoJSON = require('@tmcw/togeojson');
const shpjs = require('shpjs');
const JSZip = require('jszip');
const { parse } = require('fast-xml-parser');
const mongoose = require('mongoose');

exports.createMap = async (req, res) => {
    try {
        const user_id = req.query.user_id;
        // Validate the query parameters
        if (!user_id) {
            return res.status(400).json({ message: "Missing user_id in query parameters" });
        }

        const newMap = new Map({
            owner: user_id
        });

        const user = await User.findOne({ user_id: user_id });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.maps.push(newMap._id);
        await user.save();

        // Save the new map
        await newMap.save();

        // Send a successful response
        res.status(201).json(newMap);
    } catch (error) {
        // Handle any errors that occur during the process
        res.status(500).json({ message: "Error creating map", error: error.message });
    }
};


exports.importMap = async (req, res) => {
    try {
        const user_id = req.query.user_id;
        const map_id = req.query.map_id;
        const object_id = req.body.object_id;
        const format = req.body.format;

        // Get raw data
        const rawDataResponse = await axios.get(`https://zaunmap.pages.dev/file/?user_id=${user_id}&object_id=${object_id}`, { responseType: 'arraybuffer' });
        let rawData = rawDataResponse.data;

        // Convert to GeoJSON
        let geoJsonData = await convertToGeoJson(rawData, format);

        // PUT the converted data
        const formData = new FormData();
        formData.append('file', JSON.stringify(geoJsonData));
        const config = {
            headers: formData.getHeaders(),
        };
        await axios.put(`https://zaunmap.pages.dev/file/?user_id=${user_id}&object_id=${object_id}`, formData, config);

        res.send('Map import successful');
    } catch (error) {
        console.error('Error importing map:', error);
        res.status(500).send('Error importing map');
    }
};

async function convertToGeoJson(data, format) {
    switch (format) {
        case 'geojson':
            return JSON.parse(data); // Assuming the data is in GeoJSON format as a string
        case 'kml':
            const xml = data.toString('utf-8');
            const kmlObject = parse(xml, { ignoreAttributes: false });
            return toGeoJSON.kml(kmlObject);
        case 'shp':
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