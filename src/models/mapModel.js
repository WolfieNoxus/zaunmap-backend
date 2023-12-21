// Import mongoose to work with MongoDB
const mongoose = require('mongoose');

const metaSchema = new mongoose.Schema({
    mode: {
        type: String,
        default: "general"      // Game mode associated with the map
    },
    colorHeat: {
        type: String,
        default: "#ff0000"      // Color scheme for the heatmap
    },
    heatLevel: {
        type: Number,
        default: 5      // Heat level for the heatmap
    },
    heatValueMin: {
        type: Number,
        default: 0      // Minimum value for the heatmap
    },
    heatValueMax: {
        type: Number,
        default: 100      // Maximum value for the heatmap
    },
    colorTags: [{
        tag: {
            type: String
        },
        color: {
            type: String
        }
    }],
});

/**
 * Define the schema for the Map model.
 * This schema includes various details about a map such as its name, owner, visibility,
 * unique identifier, tags, description, ratings, and associated comments.
 */
const mapSchema = new mongoose.Schema({
    name: {
        type: String      // Name of the map
    },
    owner: {
        type: String      // User ID of the map's owner
    },
    isPublic: {
        type: Boolean     // Boolean indicating if the map is public
    },
    objectId: {
        type: String      // Unique identifier for the map
    },
    tags: [{
        type: String      // Array of tags associated with the map
    }],
    description: {
        type: String      // Description of the map
    },
    ratings: [{          // Array of user ratings for the map
        userId: {
            type: String  // User ID of the individual who provided the rating
        },
        rating: {
            type: Number, // Numeric rating value
            min: 0,       // Minimum possible rating value
            max: 5        // Maximum possible rating value
        }
    }],
    averageRating: {
        type: Number,     // Average rating calculated from individual ratings
        default: 0       // Default value for the average rating
    },
    ratingCount: {
        type: Number,     // Count of the total ratings received
        default: 0       // Default value for the count of ratings
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'   // Reference to Comment model for comments related to the map
    }],
    meta: {
        type: metaSchema,
        default: () => ({})
    }
}, {
    timestamps: true     // Automatically add 'createdAt' and 'updatedAt' fields
});

// Export the Map model to be used in other parts of the application
module.exports = mongoose.model('Map', mapSchema);
