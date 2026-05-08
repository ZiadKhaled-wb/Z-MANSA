const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Helper Function to Sign the JWT

const signToken = (id) => {
    return jwt.sign({id}, process.env.process.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
};

exports.register = async (req, res, next) => {
    try {
        const {name, email, password, role} = req.body;
        // Create the User in MongoDB
        const user = await User.create({name, email, password, role});
        // Generate Token
        const token = signToken(user._id);
        res.status(201).json({
            success: true,
            token: token,
            user: user
        });
    } catch (error) {
        next(error)
    }
};

exports.login = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please Provide an Email and a Password"
            });
        }
        // Check for the User and Explicitly Select the Password Filed
        const user = await User.find({email}).select('+password');
        
        if (!user || !user.matchPassword(password)) {
            return res.status(401).json({
                success: false,
                message: "Invalid Credntials"
            });
        }
        const token = signToken(user._id);
        return res.status(200).json({
            success: true,
            token: token,
            user: user
        });
    } catch (error) {
        next(erro);
    }
};