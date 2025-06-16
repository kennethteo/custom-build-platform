module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src', '<rootDir>/testing'],
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts', '**/?(*.)+(spec|test).js'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
  ],
  setupFilesAfterEnv: ['<rootDir>/testing/setup.js'],
  testTimeout: 30000,
  // Set test environment variables
  setupFiles: ['<rootDir>/testing/env-setup.js'],
  // Handle open handles and force exit
  forceExit: true,
  detectOpenHandles: true,
  // Ensure tests exit cleanly
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
};
