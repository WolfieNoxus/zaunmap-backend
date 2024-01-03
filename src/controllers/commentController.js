// Import required models and libraries
const User = require('../models/userModel');
const Comment = require('../models/commentModel');
const Map = require('../models/mapModel');
const jwt = require('jsonwebtoken');

// Function to retrieve a specific comment
exports.getComment = async (req, res) => {
    try {
        // Extract commentId from query parameters
        const commentId = req.query.commentId;
        if (!commentId) {
            return res.status(400).json({ message: 'Comment ID not provided' });
        }

        // Find the comment in the database
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        // Return the found comment
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ message: 'Error getting comment', error: error.message });
    }
};

// Function to create a new comment
exports.createComment = async (req, res) => {
    try {
        // Validate JWT token from authorization header
        const bearerHeader = req.headers['authorization'];
        if (!bearerHeader) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const token = bearerHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const decoded = jwt.decode(token);
        if (!decoded) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Retrieve userId from JWT and mapId, content from request body
        const userId = decoded.sub;
        const mapId = req.body.mapId;
        const content = req.body.content;

        // Validate user ID, map ID, and comment content
        if (!userId || !mapId || !content) {
            return res.status(400).json({ message: 'Required fields not provided' });
        }

        // Validate user existence and status
        const user = await User.findOne({ userId: userId });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (user.role === 'restricted' || user.role === 'disabled') {
            return res.status(403).json({ message: `User is ${user.role}` });
        }

        // Validate map existence and visibility
        const map = await Map.findById(mapId);
        if (!map) {
            return res.status(404).json({ message: 'Map not found' });
        }
        if (!map.isPublic) {
            return res.status(403).json({ message: 'Map is private' });
        }

        // Create and save the new comment
        const comment = new Comment({ mapId, content, postedBy: userId });
        await comment.save();

        // Update map's comment list
        map.comments.push(comment._id);
        await map.save();

        res.status(201).json(comment); // Return the created comment
    } catch (error) {
        res.status(500).json({ message: 'Error creating comment', error: error.message });
    }
};

// Function to handle replying to a comment
exports.replyComment = async (req, res) => {
    try {
        // Extract and validate the JWT token from the authorization header
        const bearerHeader = req.headers['authorization'];
        if (!bearerHeader) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const bearer = bearerHeader.split(' ');
        if (bearer.length !== 2) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const token = bearer[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const decoded = jwt.decode(token); // Decode JWT to get user information
        if (!decoded) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Retrieve userId from the decoded token and validate input parameters
        const userId = decoded.sub;
        const commentId = req.body.commentId;
        const content = req.body.content;
        if (!userId || !commentId || !content) {
            return res.status(400).json({ message: 'Required fields not provided' });
        }

        // Verify the user's existence and status
        const user = await User.findOne({ userId: userId });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (user.role === 'restricted' || user.role === 'disabled') {
            return res.status(403).json({ message: `User is ${user.role}` });
        }

        // Find the comment to which the user is replying
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        // Create and save the reply comment
        const reply = new Comment({ mapId: comment.mapId, content, postedBy: userId });
        await reply.save();

        // Link the reply to the original comment
        comment.replies.push(reply._id);
        await comment.save();

        // Send the created reply as the response
        res.status(200).json(reply);
    } catch (error) {
        // Handle any errors during the process
        res.status(500).json({ message: 'Error replying to comment', error: error.message });
    }
};

// Function to handle liking or unliking a comment
exports.likeComment = async (req, res) => {
    try {
        // Extract and validate the JWT token from the authorization header
        const bearerHeader = req.headers['authorization'];
        if (!bearerHeader) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const bearer = bearerHeader.split(' ');
        if (bearer.length !== 2) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const token = bearer[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const decoded = jwt.decode(token); // Decode JWT to get user information
        if (!decoded) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Retrieve userId from the decoded token and commentId from query parameters
        const userId = decoded.sub;
        const commentId = req.query.commentId;
        if (!userId || !commentId) {
            return res.status(400).json({ message: 'Required fields not provided' });
        }

        // Verify the user's existence and status
        const user = await User.findOne({ userId: userId });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (user.role === 'restricted' || user.role === 'disabled') {
            return res.status(403).json({ message: `User is ${user.role}` });
        }

        // Validate like parameter and find the comment
        const likeStr = req.query.like?.toLowerCase();
        if (!['true', 'false'].includes(likeStr)) {
            return res.status(400).json({ message: 'Invalid like parameter' });
        }
        const like = likeStr === 'true';
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        // Update the comment's likes or dislikes based on the user's action
        if (like) {
            if (comment.likes.includes(userId)) {
                res.status(200).json({ message: 'Comment already liked' });
            } else if (comment.dislikes.includes(userId)) {
<<<<<<< HEAD
                res.status(200).json({ message: 'Comment already disliked' });
            } else {
                comment.likes.push(userId);
                await comment.save();
                res.status(200).json({ message: 'Comment liked successfully' });
            }
=======
                comment.dislikes.pull(userId);
            }
            comment.likes.push(userId);
>>>>>>> jwt
        } else {
            if (!comment.likes.includes(userId)) {
                res.status(200).json({ message: 'Comment not liked' });
            } else {
                comment.likes.pull(userId);
            }
        }
        await comment.save();

        // Send response based on the action performed
        res.status(200).json({ message: like ? 'Comment liked successfully' : 'Comment unliked successfully' });
    }
    catch (error) {
        // Handle any errors during the process
        res.status(500).json({ message: 'Error liking comment', error: error.message });
    }
};

// Function to handle disliking or undisliking a comment
exports.dislikeComment = async (req, res) => {
    try {
        // Extract and validate the JWT token from the authorization header
        const bearerHeader = req.headers['authorization'];
        if (!bearerHeader) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const bearer = bearerHeader.split(' ');
        if (bearer.length !== 2) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const token = bearer[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const decoded = jwt.decode(token); // Decode JWT to get user information
        if (!decoded) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Retrieve userId from the decoded token and commentId from query parameters
        const userId = decoded.sub;
        const commentId = req.query.commentId;
        if (!userId || !commentId) {
            return res.status(400).json({ message: 'Required fields not provided' });
        }

        // Verify the user's existence and status
        const user = await User.findOne({ userId: userId });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (user.role === 'restricted' || user.role === 'disabled') {
            return res.status(403).json({ message: `User is ${user.role}` });
        }

        // Validate dislike parameter and find the comment
        const dislikeStr = req.query.dislike?.toLowerCase();
        if (!['true', 'false'].includes(dislikeStr)) {
            return res.status(400).json({ message: 'Invalid dislike parameter' });
        }
        const dislike = dislikeStr === 'true';
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        // Update the comment's dislikes based on the user's action
        if (dislike) {
            if (comment.dislikes.includes(userId)) {
                res.status(200).json({ message: 'Comment already disliked' });
            } else if (comment.likes.includes(userId)) {
<<<<<<< HEAD
                res.status(200).json({ message: 'Comment already liked' });
            } else {
                comment.dislikes.push(userId);
                await comment.save();
                res.status(200).json({ message: 'Comment disliked successfully' });
            }
=======
                comment.likes.pull(userId);
            }
            comment.dislikes.push(userId);
>>>>>>> jwt
        } else {
            if (!comment.dislikes.includes(userId)) {
                res.status(200).json({ message: 'Comment not disliked' });
            } else {
                comment.dislikes.pull(userId);
            }
        }
        await comment.save();

        // Send response based on the action performed
        res.status(200).json({ message: dislike ? 'Comment disliked successfully' : 'Comment undisliked successfully' });
    }
    catch (error) {
        // Handle any errors during the process
        res.status(500).json({ message: 'Error disliking comment', error: error.message });
    }
};

// Function to handle the deletion of a comment
exports.deleteComment = async (req, res) => {
    try {
        // Extract and validate the JWT token from the authorization header
        const bearerHeader = req.headers['authorization'];
        if (!bearerHeader) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const bearer = bearerHeader.split(' ');
        if (bearer.length !== 2) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const token = bearer[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const decoded = jwt.decode(token); // Decode JWT to get user information
        if (!decoded) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Retrieve userId from the decoded token and commentId from query parameters
        const userIdByToken = decoded.sub;
        const commentId = req.query.commentId;
        if (!userIdByToken || !commentId) {
            return res.status(400).json({ message: 'Required fields not provided' });
        }

        // Find the comment and validate its existence and ownership
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        if (comment.postedBy !== userIdByToken) {
            return res.status(403).json({ message: 'User is not the author of this comment' });
        }

        // Validate the existence of the map associated with the comment
        const map = await Map.findById(comment.mapId);
        if (!map) {
            return res.status(404).json({ message: 'Map not found' });
        }

        // Remove the comment from the map's comments list
        if (map.comments.includes(commentId)) {
            map.comments.pull(commentId);
            await map.save();
        }

        // Delete the comment and its replies recursively
        await deleteCommentHelper(commentId);

        res.status(200).json({ message: 'Comment deleted successfully' });
    }
    catch (error) {
        // Handle any errors during the process
        res.status(500).send(error.message);
    }
};

// Helper function to recursively delete a comment and its replies
async function deleteCommentHelper(commentId) {
    try {
        // Find the comment
        const comment = await Comment.findById(commentId);

        // Recursively delete all replies
        for (let replyId of comment.replies) {
            await deleteCommentHelper(replyId);
        }

        // Delete the comment itself
        await Comment.findByIdAndDelete(commentId);
    }
    catch (error) {
        console.log('Error in deleteCommentHelper:', error.message);
    }
};
