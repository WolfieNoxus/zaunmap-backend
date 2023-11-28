const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    user_id: {
        type: String,
        required: true,
    },
    user_name: { type: String },
    role: {
        type: String,
        enum: ['user', 'banned_user', 'admin'],
        default: 'user'
    },
});

module.exports = mongoose.model('User', userSchema);
