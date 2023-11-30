const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Map Schema
const mapSchema = new Schema({
    // for unkown purpose
    map_id: {
        type: Number,
        required: false,
        unique: false
    },
    name: {
        type: String,
        default: 'Untitled Map'
    },
    author: {
        type: String,
    },
    public: {
        type: Boolean,
        default: true
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
