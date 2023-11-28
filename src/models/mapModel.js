const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Map Schema
const mapSchema = new Schema({
    map_id: {
        type: String,
        required: true,
    },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    likes: {
        type: Number,
        default: 0,
    },
    dislikes: {
        type: Number,
        default: 0,
    },
    data: {
        type: Schema.Types.Mixed,
        default: {},
    },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
}, { timestamps: true });

module.exports = mongoose.model('Map', mapSchema);
