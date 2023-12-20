// Import the mongoose library to work with MongoDB
const mongoose = require('mongoose');

// Define the schema for the Message model
const messageSchema = new mongoose.Schema({
    senderId: String, // Unique identifier for the message sender
    receiverId: String, // Unique identifier for the message receiver
    subject: String, // Subject line of the message
    content: String, // Main text content of the message

    // Field to track if the message has been read
    isRead: {
        type: Boolean, // Specify the data type as Boolean
        default: false // Set the default value to false (message is unread by default)
    },
}, {
    timestamps: true // Automatically add 'createdAt' and 'updatedAt' fields to each document
});

// Export the Message model, allowing it to be imported and used in other files
module.exports = mongoose.model('Message', messageSchema);
