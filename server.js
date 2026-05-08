require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Intitalize Express App
const app = express();

// Connect to MongoDB Atlas
connectDB()

// Middleware to Parse Incoming JSON Data
app.use(express.json());

// Middleware to allow cross-origin requests (from your future React app)
app.use(cors);

// Basic test route
app.get('/', (req, res) => {
    res.send('Z-MANSA API is running...');
});

// Centralized Error Handler
app.use(errorHandler);

// Define PORT and start listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});