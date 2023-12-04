const mongoose = require('mongoose');

// Define a schema for comments
const commentSchema = new mongoose.Schema({
    content: String, // Content of the comment
    postedBy: String, // User who posted the comment
    likes: [String], // Array of users who liked the comment
    dislikes: [String], // Array of users who disliked the comment
    // Replies to the comment, referencing other Comment documents
    replies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
}, {
    timestamps: true // Automatically add createdAt and updatedAt timestamps
});

// Export the Comment model
module.exports = mongoose.model('Comment', commentSchema);
