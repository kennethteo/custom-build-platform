const dotenv = require('dotenv');
const app = require('./app');
const connectDB = require('./config/db');
const winston = require('winston');

// Load environment variables
dotenv.config();

// Validate required environment variables
if (!process.env.PORT || !process.env.MONGO_URI) {
    winston.error('Missing required environment variables: PORT or MONGO_URI');
    process.exit(1);
}

// Configure winston logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'server.log' })
    ]
});

// Connect to MongoDB with retry logic
const connectWithRetry = async (retries = 5, delay = 5000) => {
    for (let i = 0; i < retries; i++) {
        try {
            await connectDB();
            logger.info('Successfully connected to MongoDB');
            return;
        } catch (error) {
            logger.error(`MongoDB connection failed (attempt ${i + 1}): ${error.message}`);
            if (i < retries - 1) {
                logger.info(`Retrying in ${delay / 1000} seconds...`);
                await new Promise((resolve) => setTimeout(resolve, delay));
            } else {
                logger.error('All retry attempts failed. Exiting.');
                process.exit(1);
            }
        }
    }
};

connectWithRetry();

// Start the server
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    logger.info(`Server running on http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    logger.info('SIGINT received: closing server');
    server.close(() => {
        logger.info('Server closed');
        process.exit(0);
    });
});

process.on('SIGTERM', () => {
    logger.info('SIGTERM received: closing server');
    server.close(() => {
        logger.info('Server closed');
        process.exit(0);
    });
});
