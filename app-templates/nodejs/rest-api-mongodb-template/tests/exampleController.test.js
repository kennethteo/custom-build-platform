const request = require('supertest');
const app = require('../src/app');

describe('Example Controller', () => {
  it('should fetch all examples', async () => {
    const response = await request(app).get('/api/v1/examples');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should create a new example', async () => {
    const newExample = {
      name: 'Test Example',
      description: 'This is a test example.'
    };

    const response = await request(app)
      .post('/api/v1/examples')
      .send(newExample);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(newExample.name);
  });
});
