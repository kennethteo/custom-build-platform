import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/user-management';
    
    // Connection options for better error handling and authentication
    const options = {
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      bufferCommands: false, // Disable mongoose buffering
    };
    
    console.log('🔄 Connecting to MongoDB...');
    console.log('📍 URI:', mongoURI.replace(/\/\/[^:]+:[^@]+@/, '//***:***@')); // Hide credentials in logs
    
    await mongoose.connect(mongoURI, options);
    
    console.log('✅ MongoDB connected successfully');
    if (mongoose.connection.db) {
      console.log('🏠 Database:', mongoose.connection.db.databaseName);
    }
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️ MongoDB disconnected');
    });
    
    mongoose.connection.on('reconnected', () => {
      console.log('🔄 MongoDB reconnected');
    });
    
    // Handle process termination
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('🔄 MongoDB connection closed due to app termination');
      process.exit(0);
    });
    
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    
    // Provide helpful error messages
    if (error instanceof Error) {
      if (error.message.includes('authentication')) {
        console.error('🔐 Authentication Error: Check your MongoDB credentials');
        console.error('💡 Make sure MONGODB_URI includes correct username/password');
      } else if (error.message.includes('ECONNREFUSED')) {
        console.error('🔌 Connection Refused: MongoDB server is not running');
        console.error('💡 Start MongoDB with: docker-compose up mongodb');
      } else if (error.message.includes('serverSelectionTimeoutMS')) {
        console.error('⏰ Connection Timeout: MongoDB server is unreachable');
        console.error('💡 Check if MongoDB is running and accessible');
      }
    }
    
    process.exit(1);
  }
};

export const disconnectDB = async (): Promise<void> => {
  try {
    if (mongoose.connection.readyState !== 0) {
      console.log('🔄 Closing MongoDB connection...');
      await mongoose.connection.close();
      console.log('✅ MongoDB connection closed');
    }
  } catch (error) {
    console.error('❌ Error closing MongoDB connection:', error);
  }
};
