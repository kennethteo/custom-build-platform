// Jest setup file
// Add any global test setup here
const mongoose = require('mongoose');

// Global teardown function to close database connections
global.afterAll(async () => {
  try {
    // Close mongoose connection
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
    }
    
    // Close any remaining connections
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error during test cleanup:', error);
  }
});

// Increase timeout for async operations
jest.setTimeout(30000);
