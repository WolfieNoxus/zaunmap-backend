const express = require('express');
const router = express.Router();
const MapController = require('../controllers/mapController');

router.post('/create', MapController.createMap);
router.put('/import', MapController.importMap);
router.get('/', MapController.getMap);
router.get('/public', MapController.getAllPublicMaps);

module.exports = router;
