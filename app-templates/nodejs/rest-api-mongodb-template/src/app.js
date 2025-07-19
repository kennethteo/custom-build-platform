const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const exampleRoutes = require('./routes/exampleRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON request bodies
app.use(morgan('combined')); // Log HTTP requests

// Routes
app.use('/api/v1/examples', exampleRoutes);

// Health Check Endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'UP' });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    const statusCode = err.status || 500;
    const message = statusCode === 500 ? 'Internal Server Error' : err.message;
    res.status(statusCode).json({ message });
});

module.exports = app;
