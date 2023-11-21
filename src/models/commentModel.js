const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Comment Schema
const commentSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    content: String,
    map: { type: Schema.Types.ObjectId, ref: 'Map' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comment', commentSchema);
