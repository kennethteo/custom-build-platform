const request = require('supertest');
const app = require('../src/app');

jest.setTimeout(60000);

jest.mock('../src/models/exampleModel', () => ({
  create: jest.fn((input) => Promise.resolve({ _id: '123', ...input })), // Dynamically return input values
  find: jest.fn().mockResolvedValue([]),
  findOne: jest.fn().mockResolvedValue(null), // Mock findOne to resolve the error
}));

describe('Example Controller', () => {
  it('should fetch all examples', async () => {
    const response = await request(app).get('/api/v1/examples');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should create a new example', async () => {
    const newExample = {
      name: 'Valid Example Name', // Ensure the name field is valid
      description: 'This is a test example.'
    };

    const response = await request(app)
      .post('/api/v1/examples')
      .send(newExample);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(newExample.name);
  }, 10000); // Increase timeout to 10 seconds
});
