require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Intitalize Express App
const app = express();

// Connect to MongoDB Atlas
connectDB()

// Middleware to Parse Incoming JSON Data
app.use(express.json());

// Middleware to allow cross-origin requests (from your future React app)
app.use(cors());

// Swagger Configuration
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Z-MANSA API',
            version: '1.0.0',
            description: 'API documentation for the Z-MANSA Sustainability Platform',
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT || 8000}`,
            },
        ],
        // ADD THIS NEW COMPONENTS SECTION:
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
    },
    // Paths to files containing OpenAPI definitions (your routes)
    apis: ['./routes/*.js'], 
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api/v1/auth', require('./routes/authRoutes'))

// Centralized Error Handler
app.use(errorHandler);

// Define PORT and start listening
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});