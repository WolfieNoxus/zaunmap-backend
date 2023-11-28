const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    // user_id is from Auth0
    user_id: {
        type: String,
        required: true,
    },
    user_name: { type: String },
    role: {
        type: String,
        enum: ['user', 'disabled', 'admin', 'restricted'],
        default: 'user'
    },
    maps: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Map'
    }],
}, {
    timestamps: true,
});

module.exports = mongoose.model('User', userSchema);
