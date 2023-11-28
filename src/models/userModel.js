const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    user_id: {
        type: String,
        required: true,
    },
    username: { type: String },
    maps: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Map' }],
    likedMaps: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Map' }],
    dislikedMaps: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Map' }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    likedComments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    dislikedComments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
}, {
    timestamps: true,
});

module.exports = mongoose.model('User', userSchema);
