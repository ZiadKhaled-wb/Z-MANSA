const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        select: false
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    eco_points: {
        type: Number,
        default: 0
    },
    total_carbon_saved: {
        type: Number,
        default: 0
    }
}, {timestamps : true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;