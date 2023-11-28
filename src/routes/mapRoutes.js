const express = require('express');
const router = express.Router();
const mapController = require('../controllers/mapController');

router.get('/:id', mapController.getMap);
router.post('/', mapController.createMap);
router.put('/:id', mapController.updateMap);
router.delete('/:id', mapController.deleteMap);

module.exports = router;
