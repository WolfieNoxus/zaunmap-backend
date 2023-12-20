// Import the Express framework and create a router
const express = require('express');
const router = express.Router();

// Import the user controller which handles the logic for user-related routes
const userController = require('../controllers/userController');

// Import the JWT check middleware for authentication
const { checkJwt } = require('../config/auth');

// Define an array of allowed IP addresses for access control
const allowedIps = ['54.245.16.146', '35.82.131.220', '54.200.12.78', '3.21.254.195', '18.218.26.94', '18.117.64.128', '34.228.148.119'];

/**
 * Middleware to check if the client's IP address is in the list of allowed IPs.
 * If the IP is allowed, it calls next() to continue to the next middleware.
 * Otherwise, it sends a 403 Forbidden response.
 */
const checkIp = (req, res, next) => {
    const clientIp = req.ip || req.connection.remoteAddress; // Get the client's IP address
    if (allowedIps.includes(clientIp)) {
        next(); // Continue if IP is allowed
    } else {
        res.status(403).send('Access denied'); // Deny access if IP is not allowed
    }
};

// User routes
router.get('/', userController.getUser); // Get a user, no authentication required
router.get('/search', userController.searchUsers); // Search for users, no authentication required
router.post('/', checkIp, userController.createUser); // Create a user, restricted by client IP
router.put('/rename', checkJwt, userController.renameUser); // Rename a user, requires JWT authentication
router.put('/follow', checkJwt, userController.followUser); // Follow a user, requires JWT authentication
router.put('/block', checkJwt, userController.blockUser); // Block a user, requires JWT authentication
router.put('/role', checkJwt, userController.changeUserRole); // Change a user's role, requires JWT authentication
router.delete('/', checkJwt, userController.deleteUser); // Delete a user, requires JWT authentication

// Export the router to be used in other parts of the application
module.exports = router;
