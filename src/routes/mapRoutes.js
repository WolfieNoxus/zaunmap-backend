const express = require('express');
const router = express.Router();
const MapController = require('../controllers/mapController');

router.get('/:id', MapController.getMap);
router.post('/', MapController.createMap);
router.put('/:id', MapController.updateMap);
router.delete('/:id', MapController.deleteMap);

module.exports = router;
