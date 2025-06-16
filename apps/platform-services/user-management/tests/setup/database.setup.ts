import mongoose from 'mongoose';

const MONGODB_TEST_URI = process.env.MONGODB_TEST_URI || 'mongodb://localhost:27017/user-management-test';

export const setupTestDatabase = async (): Promise<void> => {
  await mongoose.connect(MONGODB_TEST_URI);
  console.log('🔗 Connected to test database');
};

export const teardownTestDatabase = async (): Promise<void> => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  console.log('🗑️  Test database cleaned up');
};

export const clearTestData = async (): Promise<void> => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
};
