// Import the Express framework to create a router
const express = require('express');
const router = express.Router();

// Import the map controller which handles the logic for map-related routes
const MapController = require('../controllers/mapController');

// Import the JWT check middleware for authentication purposes
const { checkJwt } = require('../config/auth');

// Define routes for map operations

// GET route to retrieve maps. No authentication required.
router.get('/', MapController.getMap);

// GET route to search for maps. No authentication required.
router.get('/search', MapController.searchMaps);

// POST route to create a new map. Requires JWT authentication.
router.post('/', checkJwt, MapController.createMap);

// PUT route to update an existing map. Requires JWT authentication.
router.put('/', checkJwt, MapController.updateMap);

// PUT route for rating a map. Requires JWT authentication.
router.put('/rate', checkJwt, MapController.rateMap);

// PUT route to import a map. Requires JWT authentication.
router.put('/import', checkJwt, MapController.importMap);

// DELETE route to delete a map. Requires JWT authentication.
router.delete('/', checkJwt, MapController.deleteMap);

// Export the router to be used in other parts of the application
module.exports = router;
