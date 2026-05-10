const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
    // 1. Grab the authorization header
    const authHeader = req.headers.authorization;
    // 2. Check if it exists AND starts with 'Bearer '
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: 'Please log in' });
    }
    // 3. IMPORTANT FIX: Add [1] to extract just the token string!
    const token = authHeader.split(' ')[1];
    try {
        // Verify token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Fetch fresh user from DB and attach to the request object
        req.user = await User.findById(decoded.id);
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "User no longer exists"
            });
        }
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            messgae: "Invalid or expired token"
        });
    }
};

exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: `Role ${req.user.role} is not allowed here`
            });
        }
        next();
    }
};