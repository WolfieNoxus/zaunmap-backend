// Import mongoose for MongoDB interaction
const mongoose = require('mongoose');

// Define a schema for the Comment model
const commentSchema = new mongoose.Schema({
    mapId: String, // Identifier for the map related to the comment
    content: String, // Text content of the comment
    postedBy: String, // User ID of the person who posted the comment

    // Users who liked the comment - array of user IDs
    likes: [String], 

    // Users who disliked the comment - array of user IDs
    dislikes: [String], 

    // Replies to this comment, stored as an array of Comment document references
    replies: [{
        type: mongoose.Schema.Types.ObjectId, // Reference to another Comment document
        ref: 'Comment' // Specifies the Comment model for the reference
    }]
}, {
    timestamps: true // Automatically add 'createdAt' and 'updatedAt' timestamps to the document
});

// Export the Comment model for use in other parts of the application
module.exports = mongoose.model('Comment', commentSchema);
