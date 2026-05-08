const mongoose = require('mongoose');

const smartBinSchema = mongoose.Schema({
    location: {
        type: String
    },
    latitude: {
        type: Number
    },
    longitude: {
        type: Number
    },
    fill_level: {
        type: Number
    },
    types: {
        type: [String],
    },
    status: {
        type: String,
        enum: ['Full', 'Empty']
    }
}, {timestamps: true});

const SmartBin = mongoose.model("SmartBin", smartBinSchema);

module.exports = SmartBin;