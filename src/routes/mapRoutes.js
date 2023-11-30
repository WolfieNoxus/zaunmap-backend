const express = require('express');
const router = express.Router();
const MapController = require('../controllers/mapController');

router.post('/', MapController.createMap);
router.put('/import', MapController.importMap);
router.put('/', MapController.updateMapMetadata);
router.get('/', MapController.getMap);
router.get('/public', MapController.getAllPublicMaps);
router.get('/all', MapController.getAllMaps);
// router.get('/search', MapController.searchMaps);
// Retired
// router.get('/json', MapController.getMapJSON);

module.exports = router;
