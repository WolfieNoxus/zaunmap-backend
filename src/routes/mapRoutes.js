const express = require('express');
const router = express.Router();
const MapController = require('../controllers/mapController');

router.post('/', MapController.createMap);
router.put('/import', MapController.importMap);
router.put('/', MapController.updateMapMetadata);
router.get('/', MapController.getMap);
router.get('/public', MapController.getAllPublicMaps);
router.get('/all', MapController.getAllMaps);
router.put('/rating', MapController.rateMap);
router.delete('/', MapController.deleteMap);
router.get('/search', MapController.searchMaps);

module.exports = router;
