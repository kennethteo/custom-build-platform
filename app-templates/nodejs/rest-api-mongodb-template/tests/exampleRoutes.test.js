const request = require('supertest');
const app = require('../src/app');
const winston = require('winston');
const mongoose = require('mongoose');

// Mock winston logger
jest.mock('winston', () => ({
    createLogger: jest.fn(() => ({
        info: jest.fn(),
        error: jest.fn()
    }))
}));

jest.setTimeout(60000); // Set timeout to 60 seconds

// Add logging to debug validation errors
const originalConsoleError = console.error;
console.error = (...args) => {
    originalConsoleError(...args);
    if (args[0] && typeof args[0] === 'string' && args[0].includes('Validation error')) {
        console.log('Validation error details:', args);
    } else if (args[0] && typeof args[0] === 'string' && args[0].includes('Request body')) {
        console.log('Request body details:', args);
    }
};

beforeAll(async () => {
    if (mongoose.connection.readyState === 0) {
        try {
            const mongoUri = process.env.MONGO_URI || 'mongodb://app_user:app_password@localhost:27017/local_database?authSource=local_database';
            await mongoose.connect(mongoUri, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            console.log('Database connection established for tests.');
        } catch (error) {
            console.error('Error connecting to the database:', error);
            throw error;
        }
    }
});

afterAll(async () => {
    if (mongoose.connection.readyState === 1) {
        try {
            await mongoose.connection.close();
            console.log('Database connection closed after tests.');
        } catch (error) {
            console.error('Error closing the database connection:', error);
        }
    }
});

describe('Example Routes', () => {
  afterEach(async () => {
    // Clean up database after each test
    if (mongoose.connection.readyState === 1) { // Ensure the connection is open
        const collections = mongoose.connection.collections;
        for (const key in collections) {
            try {
                await collections[key].deleteMany({}, { timeout: 20000 }); // Increase timeout
            } catch (error) {
                console.error(`Error cleaning up collection ${key}:`, error);
            }
        }
    } else {
        console.warn('Skipping cleanup as the database connection is not open.');
    }
  });

  it('should return 404 for an unknown route', async () => {
    const response = await request(app).get('/unknown-route');
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message', 'Not Found'); // Update expected message
  });

  it('should handle invalid input for creating an example', async () => {
    const invalidExample = {
        name: '' // Invalid input
    };

    const response = await request(app)
        .post('/api/v1/examples')
        .send(invalidExample);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'Validation error');
    expect(response.body.details).toEqual(
        expect.arrayContaining([
            expect.objectContaining({
                message: expect.stringContaining('"name" is not allowed to be empty')
            })
        ])
    );
  });

  it('should create a new example with valid input', async () => {
    const validExample = {
      name: 'Valid Example',
      description: 'This is a valid example.'
    };

    const response = await request(app)
      .post('/api/v1/examples')
      .send(validExample);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name', validExample.name);
    expect(response.body).toHaveProperty('description', validExample.description);
  });

  it('should return 200 for the /health endpoint', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', 'UP');
  });

  it('should return 400 for missing fields in the request body', async () => {
    const incompleteExample = {
        description: 'Missing name field.'
    };

    const response = await request(app)
        .post('/api/v1/examples')
        .send(incompleteExample);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'Validation error');
    expect(response.body.details).toEqual(
        expect.arrayContaining([
            expect.objectContaining({
                message: expect.stringContaining('"name" is required')
            })
        ])
    );
  });

  it('should return 400 for duplicate entries if applicable', async () => {
    const duplicateExample = {
      name: 'Duplicate Example',
      description: 'This is a duplicate example.'
    };

    // Create the first entry
    await request(app).post('/api/v1/examples').send(duplicateExample);

    // Attempt to create a duplicate entry
    const response = await request(app)
      .post('/api/v1/examples')
      .send(duplicateExample);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });

  it('should fetch all examples after creating multiple entries', async () => {
    const examples = [
      { name: 'Example 1', description: 'Description 1' },
      { name: 'Example 2', description: 'Description 2' }
    ];

    // Create multiple entries
    for (const example of examples) {
      await request(app).post('/api/v1/examples').send(example);
    }

    // Fetch all entries
    const response = await request(app).get('/api/v1/examples');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(2);
    expect(response.body[0]).toHaveProperty('name');
    expect(response.body[0]).toHaveProperty('description');
  });
});
