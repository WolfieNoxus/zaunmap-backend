const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    user_id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
    },
    picture: {
        type: String,
    },
});

module.exports = mongoose.model('User', userSchema);
