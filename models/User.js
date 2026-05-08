const bcrypt = require('bcryptjs')
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

// Pre-save hook to hash the password before saving to the database
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Instance method to check if the entered password matches the hashed password
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};
const User = mongoose.model("User", userSchema);

module.exports = User;