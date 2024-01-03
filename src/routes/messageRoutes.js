// Import the Express framework and create a router
const express = require('express');
const router = express.Router();

// Import the message controller which handles the logic for message-related routes
const MessageController = require('../controllers/messageController');

// Import the JWT check middleware for authentication
const { checkJwt } = require('../config/auth');

// Define routes for message operations

// GET route to retrieve messages. Requires JWT authentication.
router.get('/', checkJwt, MessageController.getMessage);

// POST route to create a new message. Requires JWT authentication.
router.post('/', checkJwt, MessageController.createMessage);

// PUT route to mark a message as read. Requires JWT authentication.
router.put('/read', checkJwt, MessageController.readMessage);

// DELETE route to delete a message. Requires JWT authentication.
router.delete('/', checkJwt, MessageController.deleteMessage);

// Export the router to be used in other parts of the application
module.exports = router;
