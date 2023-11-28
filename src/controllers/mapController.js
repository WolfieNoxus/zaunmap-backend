const Map = require('../models/mapModel');

exports.getMap = async (req, res) => {
    try {
        const map = await Map.findOne({ _id: req.params.id });
        res.status(200).json(map);
    }
    catch (error) {
        res.status(404).send(error.message);
    }
}

exports.createMap = async (req, res) => {
    try {
        const newMap = new Map(req.body);
        await newMap.save();
        res.status(201).json(newMap);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

exports.updateMap = async (req, res) => {
    try {
        const map = await Map.findOne({ _id: req.params.id });
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
        const map = await Map.findOne({ _id: req.params.id });
        await map.remove();
        res.status(200).json({ message: 'Map deleted successfully' });
    }
    catch (error) {
        res.status(404).send(error.message);
    }
}