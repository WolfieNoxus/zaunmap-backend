// Import mongoose to work with MongoDB
const mongoose = require('mongoose');

// Define a schema for the User model
const userSchema = new mongoose.Schema({
    userId: {
        type: String, // Define the data type as String
        required: true // Make this field required
    },
    name: {
        type: String, // Define the data type as String
        default: 'Unnamed User' // Set a default value if none is provided
    },
    role: {
        type: String, // Define the data type as String
        enum: ['user', 'disabled', 'restricted', 'admin'], // Limit the value to one of these options
        default: 'user' // Set a default value if none is provided
    },
    picture: String, // Simple String field for user's picture
    maps: [{
        type: mongoose.Schema.Types.ObjectId, // Reference to another model (Map)
        ref: 'Map' // This indicates which model is being referenced
    }],
    following: [{
        type: String // Array of Strings representing user IDs the user is following
    }],
    followers: [{
        type: String // Array of Strings representing user IDs of followers
    }],
    blocked: [{
        type: String // Array of Strings representing user IDs who are blocked
    }],
    messagesReceived: [{
        type: mongoose.Schema.Types.ObjectId, // Reference to another model (Message)
        ref: 'Message' // This indicates which model is being referenced
    }]
}, {
    timestamps: true // Automatically add 'createdAt' and 'updatedAt' fields
});

// Export the model, allowing it to be imported and used in other files
module.exports = mongoose.model('User', userSchema);
