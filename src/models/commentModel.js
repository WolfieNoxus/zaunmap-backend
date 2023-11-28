const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Comment Schema
const commentSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    content: String,
    map: { type: Schema.Types.ObjectId, ref: 'Map' },
    likes: {
        type: Number,
        default: 0,
    },
    dislikes: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Comment', commentSchema);
