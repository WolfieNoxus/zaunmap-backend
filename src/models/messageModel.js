const mongoose = require('mongoose');

// Message Schema Definition
const messageSchema = new mongoose.Schema({
    senderId: String, // Unique ID for the sender
    receiverId: String, // Unique ID for the receiver
    subject: String, // Subject of the message
    content: String, // Text content of the message
    isRead: {
        type: Boolean,
        default: false // Messages are unread by default
    },
}, {
    timestamps: true // Auto-adds createdAt and updatedAt fields
});

// Export the Message model using the defined schema
module.exports = mongoose.model('Message', messageSchema);
