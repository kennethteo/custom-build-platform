// MongoDB initialization script
// This script creates a dedicated database user for the application

// Switch to the application database
db = db.getSiblingDB('user-management');

// Create application user with read/write permissions
db.createUser({
  user: 'userapp',
  pwd: 'userapp123',
  roles: [
    {
      role: 'readWrite',
      db: 'user-management'
    }
  ]
});

// Create indexes for better performance
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ username: 1 }, { unique: true });
db.roles.createIndex({ name: 1 }, { unique: true });
db.permissions.createIndex({ name: 1 }, { unique: true });

console.log('✅ Database user created and indexes set up successfully');
