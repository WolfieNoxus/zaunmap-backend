const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    // The Auth0 user ID, required for each user.
    userId: {
        type: String,
        required: true
    },

    // The user's name.
    name: {
        type: String,
        default: 'Unnamed User'
    },

    // The user's role, with predefined options. Defaults to 'user'.
    role: {
        type: String,
        enum: ['user', 'disabled', 'restricted', 'admin'],
        default: 'user'
    },

    picture: String, // The user's profile picture.
    
    // References to map objects associated with the user.
    maps: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Map'
    }],

    // User IDs of users that this user is following.
    following: [{
        type: String
    }],

    // User IDs of users that are following this user.
    followers: [{
        type: String
    }],

    // List of user IDs representing users blocked from messaging.
    blocked: [{
        type: String
    }],

    // References to messages received by the user.
    messagesReceived: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }]
}, {
    timestamps: true // Enables automatic creation of createdAt and updatedAt fields.
});

module.exports = mongoose.model('User', userSchema);
