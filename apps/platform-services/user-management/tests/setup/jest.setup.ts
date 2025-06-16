import 'dotenv/config';

// Extend Jest matchers
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeValidObjectId(): R;
      toBeValidEmail(): R;
      toBeValidPassword(): R;
    }
  }
}

// Custom Jest matchers for common validations
expect.extend({
  toBeValidObjectId(received: any) {
    const isValid = typeof received === 'string' && /^[0-9a-fA-F]{24}$/.test(received);
    return {
      message: () => `expected ${received} ${isValid ? 'not ' : ''}to be a valid ObjectId`,
      pass: isValid,
    };
  },
  
  toBeValidEmail(received: any) {
    const isValid = typeof received === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(received);
    return {
      message: () => `expected ${received} ${isValid ? 'not ' : ''}to be a valid email`,
      pass: isValid,
    };
  },
  
  toBeValidPassword(received: any) {
    const isValid = typeof received === 'string' && 
      received.length >= 8 && 
      /[A-Z]/.test(received) && 
      /[a-z]/.test(received) && 
      /\d/.test(received) && 
      /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(received);
    return {
      message: () => `expected ${received} ${isValid ? 'not ' : ''}to be a valid password`,
      pass: isValid,
    };
  },
});

// Global test configuration
beforeAll(async () => {
  // Global setup before all tests
  console.log('🧪 Starting test suite...');
});

afterAll(async () => {
  // Global cleanup after all tests
  console.log('✅ Test suite completed');
});

// Global error handling for tests
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection during tests:', reason);
});

// Mock console methods to avoid noise in test output
const originalError = console.error;
beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation((...args) => {
    // Only show errors that are not test-related
    if (!args.some(arg => typeof arg === 'string' && arg.includes('test'))) {
      originalError(...args);
    }
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});
