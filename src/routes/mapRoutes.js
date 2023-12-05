const express = require('express');
const router = express.Router();
const MapController = require('../controllers/mapController');

router.get('/', MapController.getMap);
router.get('/search', MapController.searchMaps);
router.post('/', MapController.createMap);
router.put('/rate', MapController.rateMap);
router.put('/import', MapController.importMap);
router.delete('/', MapController.deleteMap);

module.exports = router;
