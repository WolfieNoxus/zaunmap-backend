const express = require('express');
const router = express.Router();
const MapController = require('../controllers/mapController');

router.post('/', MapController.createMap);
router.put('/import', MapController.importMap);
router.get('/', MapController.getMap);
router.put('/rating', MapController.rateMap);
router.delete('/', MapController.deleteMap);

module.exports = router;
