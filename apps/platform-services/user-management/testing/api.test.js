const request = require('supertest');
// Import the app module (without starting the server)
const app = require('../dist/app.js').default;

describe('User Management Service API', () => {
  let authToken = '';
  let adminToken = '';
  let userId = '';
  let roleId = '';
  let newRoleId = '';

  // Test data
  const testUser = {
    email: 'testuser@example.com',
    username: 'testuser',
    password: 'TestPass123!',
    firstName: 'Test',
    lastName: 'User',
    acceptTerms: true
  };

  const adminCredentials = {
    emailOrUsername: 'admin@customplatform.com',
    password: 'Admin123!@#'
  };

  beforeAll(async () => {
    // Wait for database connection
    await new Promise(resolve => setTimeout(resolve, 2000));
  });

  // Cleanup function to remove test users
  const cleanupTestUsers = async () => {
    try {
      const mongoose = require('mongoose');
      if (mongoose.connection.readyState === 1) {
        // Remove test users that might exist from previous runs
        await mongoose.connection.db.collection('users').deleteMany({
          $or: [
            { email: testUser.email },
            { username: testUser.username },
            { email: 'testuser@example.com' },
            { username: 'testuser' }
          ]
        });
      }
    } catch (error) {
      console.warn('Warning: Could not cleanup test users:', error.message);
    }
  };

  afterAll(async () => {
    // Close any open handles to allow Jest to exit cleanly
    try {
      const mongoose = require('mongoose');
      if (mongoose.connection.readyState !== 0) {
        await mongoose.connection.close();
      }
      await mongoose.disconnect();
    } catch (error) {
      console.error('Cleanup error:', error);
    }
  });

  describe('Health Check', () => {
    test('GET /health should return healthy status', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.text).toContain('healthy');
    });
  });

  describe('Authentication', () => {
    beforeAll(async () => {
      // Clean up any existing test users before the authentication test suite
      await cleanupTestUsers();
    });

    test('POST /api/v1/auth/register should register a new user', async () => {
      const response = await request(app)
        .post('/api/v1/auth/register')
        .send(testUser)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('user');
      expect(response.body.data).toHaveProperty('token');
      expect(response.body.data.user.email).toBe(testUser.email);

      authToken = response.body.data.token;
      userId = response.body.data.user.id;
    });

    test('POST /api/v1/auth/login should login user', async () => {
      const response = await request(app)
        .post('/api/v1/auth/login')
        .send({
          emailOrUsername: testUser.email,
          password: testUser.password
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('token');
      expect(response.body.data).toHaveProperty('user');

      authToken = response.body.data.token;
    });

    test('POST /api/v1/auth/login should login admin', async () => {
      const response = await request(app)
        .post('/api/v1/auth/login')
        .send(adminCredentials)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('token');

      adminToken = response.body.data.token;
    });

    test('POST /api/v1/auth/register should fail with duplicate email', async () => {
      const response = await request(app)
        .post('/api/v1/auth/register')
        .send(testUser)
        .expect(400);

      expect(response.body.success).toBe(false);
    });

    test('POST /api/v1/auth/login should fail with wrong password', async () => {
      const response = await request(app)
        .post('/api/v1/auth/login')
        .send({
          emailOrUsername: testUser.email,
          password: 'wrongpassword'
        })
        .expect(401);

      expect(response.body.success).toBe(false);
    });
  });

  describe('User Profile Management', () => {
    test('GET /api/v1/users/profile should return user profile', async () => {
      const response = await request(app)
        .get('/api/v1/users/profile')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('email', testUser.email);
      expect(response.body.data).toHaveProperty('firstName', testUser.firstName);
    });

    test('PUT /api/v1/users/profile should update user profile', async () => {
      const updateData = {
        firstName: 'Updated',
        lastName: 'User',
        phone: '+1234567890',
        profile: {
          bio: 'Updated bio',
          timezone: 'America/New_York',
          preferences: {
            theme: 'dark',
            notifications: {
              email: true,
              push: false
            }
          }
        }
      };

      const response = await request(app)
        .put('/api/v1/users/profile')
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.firstName).toBe('Updated');
      expect(response.body.data.phone).toBe('+1234567890');
    });

    test('GET /api/v1/users/profile should fail without auth token', async () => {
      const response = await request(app)
        .get('/api/v1/users/profile')
        .expect(401);

      expect(response.body.success).toBe(false);
    });

    test('GET /api/v1/users/profile should fail with invalid token', async () => {
      const response = await request(app)
        .get('/api/v1/users/profile')
        .set('Authorization', 'Bearer invalid-token')
        .expect(401);

      expect(response.body.success).toBe(false);
    });
  });

  describe('Admin User Management', () => {
    beforeAll(async () => {
      // Ensure we have admin token and user ID for admin tests
      if (!adminToken) {
        const adminLoginResponse = await request(app)
          .post('/api/v1/auth/login')
          .send(adminCredentials);
        
        if (adminLoginResponse.status === 200) {
          adminToken = adminLoginResponse.body.data.token;
        }
      }
      
      // Ensure we have a user ID for testing (create a test user if needed)
      if (!userId) {
        // Clean up any existing test users first
        await cleanupTestUsers();
        
        const registerResponse = await request(app)
          .post('/api/v1/auth/register')
          .send(testUser);
        
        if (registerResponse.status === 201) {
          userId = registerResponse.body.data.user.id;
          authToken = registerResponse.body.data.token;
        }
      }
    });

    test('GET /api/v1/users should return all users for admin', async () => {
      const response = await request(app)
        .get('/api/v1/users?page=1&limit=10')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('users');
      expect(Array.isArray(response.body.data.users)).toBe(true);
      expect(response.body.data).toHaveProperty('pagination');
    });

    test('GET /api/v1/users/:id should return specific user for admin', async () => {
      const response = await request(app)
        .get(`/api/v1/users/${userId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('user');
      expect(response.body.data.user.id).toBe(userId);
    });

    test('PATCH /api/v1/users/:id/activate should activate user', async () => {
      const response = await request(app)
        .patch(`/api/v1/users/${userId}/activate`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
    });

    test('PATCH /api/v1/users/:id/deactivate should deactivate user', async () => {
      const response = await request(app)
        .patch(`/api/v1/users/${userId}/deactivate`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
    });

    test('GET /api/v1/users should fail for regular user', async () => {
      const response = await request(app)
        .get('/api/v1/users')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(403);

      expect(response.body.success).toBe(false);
    });
  });

  describe('Role Management', () => {
    beforeAll(async () => {
      // Ensure we have admin token and user ID for role management tests
      if (!adminToken) {
        const adminLoginResponse = await request(app)
          .post('/api/v1/auth/login')
          .send(adminCredentials);
        
        if (adminLoginResponse.status === 200) {
          adminToken = adminLoginResponse.body.data.token;
        }
      }
      
      // Ensure we have a user ID for testing (create a test user if needed)
      if (!userId) {
        // Clean up any existing test users first
        await cleanupTestUsers();
        
        const registerResponse = await request(app)
          .post('/api/v1/auth/register')
          .send(testUser);
        
        if (registerResponse.status === 201) {
          userId = registerResponse.body.data.user.id;
          authToken = registerResponse.body.data.token;
        }
      }
    });

    test('GET /api/v1/roles should return all roles for admin', async () => {
      const response = await request(app)
        .get('/api/v1/roles')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('roles');
      expect(Array.isArray(response.body.data.roles)).toBe(true);
      
      if (response.body.data.roles.length > 0) {
        roleId = response.body.data.roles[0].id;
      }
    });

    test('POST /api/v1/roles should create new role', async () => {
      const roleData = {
        name: `test-role-${Date.now()}`,
        description: 'Test role for automated testing',
        permissions: []
      };

      const response = await request(app)
        .post('/api/v1/roles')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(roleData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('role');
      expect(response.body.data.role.name).toBe(roleData.name);
      
      newRoleId = response.body.data.role.id;
    });

    test('PUT /api/v1/roles/:id should update role', async () => {
      const updateData = {
        name: `updated-test-role-${Date.now()}`,
        description: 'Updated test role description'
      };

      const response = await request(app)
        .put(`/api/v1/roles/${newRoleId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send(updateData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('role');
      expect(response.body.data.role.name).toBe(updateData.name);
    });

    test('POST /api/v1/users/:id/roles should assign role to user', async () => {
      const response = await request(app)
        .post(`/api/v1/users/${userId}/roles`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ roleId: newRoleId })
        .expect(200);

      expect(response.body.success).toBe(true);
    });

    test('DELETE /api/v1/users/:id/roles should remove role from user', async () => {
      const response = await request(app)
        .delete(`/api/v1/users/${userId}/roles`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ roleId: newRoleId })
        .expect(200);

      expect(response.body.success).toBe(true);
    });

    test('DELETE /api/v1/roles/:id should delete role', async () => {
      const response = await request(app)
        .delete(`/api/v1/roles/${newRoleId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
    });

    test('GET /api/v1/roles should fail for regular user', async () => {
      const response = await request(app)
        .get('/api/v1/roles')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(403);

      expect(response.body.success).toBe(false);
    });
  });

  describe('Password Management', () => {
    test('POST /api/v1/auth/change-password should change password', async () => {
      const passwordData = {
        currentPassword: testUser.password,
        newPassword: 'NewTestPass123!'
      };

      const response = await request(app)
        .post('/api/v1/auth/change-password')
        .set('Authorization', `Bearer ${authToken}`)
        .send(passwordData)
        .expect(200);

      expect(response.body.success).toBe(true);

      // Update test user password for cleanup
      testUser.password = passwordData.newPassword;
    });

    test('POST /api/v1/auth/change-password should fail with wrong current password', async () => {
      const passwordData = {
        currentPassword: 'wrongpassword',
        newPassword: 'AnotherNewPass123!'
      };

      const response = await request(app)
        .post('/api/v1/auth/change-password')
        .set('Authorization', `Bearer ${authToken}`)
        .send(passwordData)
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });

  describe('Security Tests', () => {
    test('Should reject requests without authorization header', async () => {
      const response = await request(app)
        .get('/api/v1/users/profile')
        .expect(401);

      expect(response.body.success).toBe(false);
    });

    test('Should reject requests with malformed authorization header', async () => {
      const response = await request(app)
        .get('/api/v1/users/profile')
        .set('Authorization', 'malformed-header')
        .expect(401);

      expect(response.body.success).toBe(false);
    });

    test('Should reject admin endpoints for regular users', async () => {
      const response = await request(app)
        .get('/api/v1/roles')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(403);

      expect(response.body.success).toBe(false);
    });
  });

  describe('Validation Tests', () => {
    test('POST /api/v1/auth/register should fail with invalid email', async () => {
      const invalidUser = {
        ...testUser,
        email: 'invalid-email'
      };

      const response = await request(app)
        .post('/api/v1/auth/register')
        .send(invalidUser)
        .expect(400);

      expect(response.body.success).toBe(false);
    });

    test('POST /api/v1/auth/register should fail with weak password', async () => {
      const invalidUser = {
        ...testUser,
        email: 'newuser@example.com',
        password: '123'
      };

      const response = await request(app)
        .post('/api/v1/auth/register')
        .send(invalidUser)
        .expect(400);

      expect(response.body.success).toBe(false);
    });

    test('PUT /api/v1/users/profile should fail with invalid phone number', async () => {
      const invalidData = {
        phone: 'invalid-phone'
      };

      const response = await request(app)
        .put('/api/v1/users/profile')
        .set('Authorization', `Bearer ${authToken}`)
        .send(invalidData)
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });

  describe('Cleanup', () => {
    test('POST /api/v1/auth/logout should logout user', async () => {
      const response = await request(app)
        .post('/api/v1/auth/logout')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
    });
  });
});
