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
        lowerCase: true,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    eco_points: {
        type: Number
    },
    total_carbon_saved: {
        type: Number
    }
}, {timestamps : true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;