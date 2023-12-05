const mongoose = require('mongoose');

/**
 * Schema for Map.
 * Includes details about the map, its owner, visibility, tags, and ratings.
 */
const mapSchema = new mongoose.Schema({
    map_id: {
        type: Number,
        default: Date.now,
        unique: false,
        required: false
    },
    name: {
        type: String      // name of the map
    },
    owner: {
        type: String      // owner of the map
    },
    isPublic: {
        type: Boolean     // visibility of the map
    },
    objectId: {
        type: String      // unique object identifier
    },
    tags: [{
        type: String      // tags associated with the map
    }],
    description: {
        type: String      // description of the map
    },
    ratings: [{          // user ratings for the map
        userId: {
            type: String  // identifier of the user who rated
        },
        rating: {
            type: Number,
            min: 0,       // minimum rating value
            max: 5        // maximum rating value
        }
    }],
    averageRating: {
        type: Number,
        default: 0       // default average rating
    },
    ratingCount: {
        type: Number,
        default: 0       // default count of ratings
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'   // reference to the comments on the map
    }],
}, {
    timestamps: true     // timestamps for creation and last update
});

// Exporting the model
module.exports = mongoose.model('Map', mapSchema);
