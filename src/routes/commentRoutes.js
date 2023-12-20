// Import the Express framework to create a router
const express = require('express');
const router = express.Router();

// Import the comment controller which handles the logic for comment-related routes
const CommentController = require('../controllers/commentController');

// Import the JWT check middleware for authentication purposes
const { checkJwt } = require('../config/auth');

// Define routes for comment operations

// GET route to retrieve comments. No authentication required.
router.get('/', CommentController.getComment);

// POST route to create a new comment. Requires JWT authentication.
router.post('/', checkJwt, CommentController.createComment);

// POST route for replying to a comment. Requires JWT authentication.
router.post('/reply', checkJwt, CommentController.replyComment);

// PUT route to like a comment. Requires JWT authentication.
router.put('/like', checkJwt, CommentController.likeComment);

// PUT route to dislike a comment. Requires JWT authentication.
router.put('/dislike', checkJwt, CommentController.dislikeComment);

// DELETE route to delete a comment. Requires JWT authentication.
router.delete('/', checkJwt, CommentController.deleteComment);

// Export the router to be used in other parts of the application
module.exports = router;
