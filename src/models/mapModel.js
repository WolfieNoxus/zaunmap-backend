const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Map Schema
const mapSchema = new Schema({
    name: {
        type: String,
    },
    owner: {
        type: String,
    },
    public: {
        type: Boolean,
        default: true
    },
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    },
    object_id: {
        type: String,
    },
    tags: [{
        type: String,
    }],
    description: {
        type: String,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Map', mapSchema);
