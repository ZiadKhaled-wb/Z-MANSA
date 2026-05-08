const mongoose = require('mongoose');

const recyclingTransactionSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    bin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SmartBin",
        required: true
    },
    waste_type: {
        type: String,
        enum: ['Plastic', 'Metal', 'Glass', 'Paper']
    },
    confidence_score: {
        type: Number
    },
    points_earned: {
        type: Number
    },
    carbon_footprint_saved: {
        type: Number
    }
});

const RecyclingTranscation = mongoose.model("RecyclingTranscation", recyclingTransactionSchema);

module.exports = RecyclingTranscation;