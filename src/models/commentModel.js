const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Comment Schema
const commentSchema = new Schema({
    content: {
        type: String
    },
    postedBy: {
        type: String
    },
    likes: [{
        type: String
    }],
    dislikes: [{
        type: String
    }],
    replies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
}, {
    timestamps: true,
});

module.exports = mongoose.model('Comment', commentSchema);
