const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    // Mongoose Validation Error
    if (err.name === 'ValidaionError') {
        const msg = Object.values(err.errors).map(e => e.message);
        return res.status(400).json({
            success: false,
            message: msg
        });
    }
    // Mongoose Duplicate Key
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue);
        return res.status(400).json({
            success: false,
            message: `Duplicate field ${field}`
        });
    }
    // Mongoose Bad ObjectId
    if (err.name === 'CastError') {
        return res.status(404).json({
            success: false,
            message: `Resource Not Found With ID : ${err.value}`
        });
    }
    // Default to 500 server error
    return res.status(500).json({
        success: false,
        message: err.message || 'Server Error'
    });
}

module.exports = errorHandler;