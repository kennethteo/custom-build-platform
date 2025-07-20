const mongoose = require('mongoose');

// Mock MongoDB connection
beforeAll(async () => {
    const mongoUri = process.env.MONGO_URI || 'mongodb://app_user:app_password@localhost:27017/local_database?authSource=local_database';
    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
});

// Clear database after each test
afterEach(async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        await collections[key].deleteMany({});
    }
});

// Close database connection after all tests
afterAll(async () => {
    await mongoose.connection.close();
});
