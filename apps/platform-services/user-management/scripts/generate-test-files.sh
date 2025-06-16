#!/bin/bash

# generate-test-files.sh
# Script to generate test file templates that align with src/ structure

echo "🔨 Generating test file templates..."

PROJECT_ROOT="/Users/kennethteo/dev/projects/custom-build-platform/apps/platform-services/user-management"
cd "$PROJECT_ROOT"

# Function to create test file template
create_test_file() {
    local src_file="$1"
    local test_file="$2"
    local module_name="$3"
    local test_type="$4"
    
    if [ ! -f "$test_file" ]; then
        cat > "$test_file" << EOF
import { ${module_name} } from '../../../src/${src_file}';

describe('${module_name}', () => {
  beforeEach(() => {
    // Setup before each test
  });

  afterEach(() => {
    // Cleanup after each test
  });

  describe('${test_type} tests', () => {
    it('should be defined', () => {
      expect(${module_name}).toBeDefined();
    });

    // Add specific tests here
  });
});
EOF
        echo "✅ Created: $test_file"
    fi
}

# Generate controller tests
echo "📝 Generating controller tests..."
create_test_file "controllers/auth.controller" "tests/unit/controllers/auth.controller.test.ts" "AuthController" "Controller"
create_test_file "controllers/user.controller" "tests/unit/controllers/user.controller.test.ts" "UserController" "Controller"
create_test_file "controllers/role.controller" "tests/unit/controllers/role.controller.test.ts" "RoleController" "Controller"

# Generate service tests
echo "📝 Generating service tests..."
create_test_file "services/user.service" "tests/unit/services/user.service.test.ts" "UserService" "Service"
create_test_file "services/role.service" "tests/unit/services/role.service.test.ts" "RoleService" "Service"
create_test_file "services/permission.service" "tests/unit/services/permission.service.test.ts" "PermissionService" "Service"

# Generate repository tests
echo "📝 Generating repository tests..."
create_test_file "repositories/user.repository" "tests/unit/repositories/user.repository.test.ts" "UserRepository" "Repository"
create_test_file "repositories/role.repository" "tests/unit/repositories/role.repository.test.ts" "RoleRepository" "Repository"
create_test_file "repositories/permission.repository" "tests/unit/repositories/permission.repository.test.ts" "PermissionRepository" "Repository"

# Generate model tests
echo "📝 Generating model tests..."
for model in user role permission; do
    test_file="tests/unit/models/${model}.model.test.ts"
    if [ ! -f "$test_file" ]; then
        cat > "$test_file" << EOF
import mongoose from 'mongoose';
import { ${model^}Model } from '../../../src/models/${model}.model';

describe('${model^}Model', () => {
  beforeAll(async () => {
    // Setup test database connection
  });

  afterAll(async () => {
    // Close database connection
    await mongoose.connection.close();
  });

  afterEach(async () => {
    // Clean up test data
    await ${model^}Model.deleteMany({});
  });

  describe('${model} model validation', () => {
    it('should be defined', () => {
      expect(${model^}Model).toBeDefined();
    });

    it('should create a valid ${model}', async () => {
      // Add ${model} creation test
    });

    it('should fail validation with invalid data', async () => {
      // Add validation failure test
    });
  });
});
EOF
        echo "✅ Created: $test_file"
    fi
done

# Generate middleware tests
echo "📝 Generating middleware tests..."
for middleware in auth validation; do
    test_file="tests/unit/middleware/${middleware}.middleware.test.ts"
    if [ ! -f "$test_file" ]; then
        cat > "$test_file" << EOF
import { Request, Response, NextFunction } from 'express';
import { ${middleware}Middleware } from '../../../src/middleware/${middleware}';

describe('${middleware^}Middleware', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    nextFunction = jest.fn();
  });

  describe('${middleware} middleware', () => {
    it('should be defined', () => {
      expect(${middleware}Middleware).toBeDefined();
    });

    // Add specific middleware tests here
  });
});
EOF
        echo "✅ Created: $test_file"
    fi
done

# Generate utils tests
echo "📝 Generating utils tests..."
for util in jwt password validation; do
    test_file="tests/unit/utils/${util}.util.test.ts"
    if [ ! -f "$test_file" ]; then
        cat > "$test_file" << EOF
import { ${util}Util } from '../../../src/utils/${util}.util';

describe('${util^}Util', () => {
  describe('${util} utilities', () => {
    it('should be defined', () => {
      expect(${util}Util).toBeDefined();
    });

    // Add specific utility tests here
  });
});
EOF
        echo "✅ Created: $test_file"
    fi
done

# Generate validation tests
echo "📝 Generating validation tests..."
for validation in auth user role; do
    test_file="tests/unit/validation/${validation}.validation.test.ts"
    if [ ! -f "$test_file" ]; then
        cat > "$test_file" << EOF
import { ${validation}ValidationSchema } from '../../../src/validation/${validation}.validation';

describe('${validation^}Validation', () => {
  describe('${validation} validation schema', () => {
    it('should be defined', () => {
      expect(${validation}ValidationSchema).toBeDefined();
    });

    it('should validate correct ${validation} data', () => {
      // Add validation success tests
    });

    it('should reject invalid ${validation} data', () => {
      // Add validation failure tests
    });
  });
});
EOF
        echo "✅ Created: $test_file"
    fi
done

# Generate integration tests
echo "📝 Generating integration tests..."
for integration in auth user role; do
    test_file="tests/integration/${integration}.integration.test.ts"
    if [ ! -f "$test_file" ]; then
        cat > "$test_file" << EOF
import request from 'supertest';
import { app } from '../../src/app';

describe('${integration^} Integration Tests', () => {
  beforeAll(async () => {
    // Setup test database and server
  });

  afterAll(async () => {
    // Cleanup test database
  });

  describe('${integration} API endpoints', () => {
    it('should handle ${integration} operations', async () => {
      // Add integration tests for ${integration} endpoints
    });
  });
});
EOF
        echo "✅ Created: $test_file"
    fi
done

# Generate e2e tests
echo "📝 Generating e2e tests..."
for e2e in "auth.e2e" "user-management.e2e" "role-management.e2e"; do
    test_file="tests/e2e/${e2e}.test.ts"
    if [ ! -f "$test_file" ]; then
        cat > "$test_file" << EOF
import request from 'supertest';
import { app } from '../../src/app';

describe('${e2e^} E2E Tests', () => {
  beforeAll(async () => {
    // Setup complete application for e2e testing
  });

  afterAll(async () => {
    // Cleanup after e2e tests
  });

  describe('End-to-end user workflows', () => {
    it('should complete full user workflow', async () => {
      // Add complete workflow tests
    });
  });
});
EOF
        echo "✅ Created: $test_file"
    fi
done

# Generate test setup files
echo "📝 Generating test setup files..."

# Jest setup
cat > "tests/setup/jest.setup.ts" << 'EOF'
import 'dotenv/config';

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
EOF

# Database setup
cat > "tests/setup/database.setup.ts" << 'EOF'
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
EOF

# Server setup
cat > "tests/setup/server.setup.ts" << 'EOF'
import { app } from '../../src/app';

export const setupTestServer = () => {
  const port = process.env.TEST_PORT || 3002;
  return app.listen(port, () => {
    console.log(`🚀 Test server running on port ${port}`);
  });
};
EOF

echo "✅ Created test setup files"

# Generate fixtures
echo "📝 Generating test fixtures..."

cat > "tests/fixtures/users.fixture.ts" << 'EOF'
export const validUserData = {
  email: 'test@example.com',
  username: 'testuser',
  password: 'TestPass123!',
  firstName: 'Test',
  lastName: 'User',
  acceptTerms: true
};

export const invalidUserData = {
  email: 'invalid-email',
  username: '',
  password: '123',
  firstName: '',
  lastName: '',
  acceptTerms: false
};

export const adminUserData = {
  email: 'admin@example.com',
  username: 'admin',
  password: 'AdminPass123!',
  firstName: 'Admin',
  lastName: 'User',
  acceptTerms: true
};
EOF

cat > "tests/fixtures/roles.fixture.ts" << 'EOF'
export const validRoleData = {
  name: 'test-role',
  description: 'Test role for testing',
  permissions: []
};

export const adminRoleData = {
  name: 'admin',
  description: 'Administrator role',
  permissions: ['users.create', 'users.read', 'users.update', 'users.delete']
};

export const userRoleData = {
  name: 'user',
  description: 'Standard user role',
  permissions: ['users.read']
};
EOF

echo "✅ Created test fixtures"

# Generate helpers
echo "📝 Generating test helpers..."

cat > "tests/helpers/auth.helper.ts" << 'EOF'
import jwt from 'jsonwebtoken';

export const generateTestToken = (userId: string, role: string = 'user'): string => {
  return jwt.sign(
    { userId, role },
    process.env.JWT_SECRET || 'test-secret',
    { expiresIn: '1h' }
  );
};

export const createAuthHeader = (token: string): object => {
  return { Authorization: `Bearer ${token}` };
};
EOF

cat > "tests/helpers/database.helper.ts" << 'EOF'
import { UserModel } from '../../src/models/user.model';
import { RoleModel } from '../../src/models/role.model';

export const createTestUser = async (userData: any) => {
  return await UserModel.create(userData);
};

export const createTestRole = async (roleData: any) => {
  return await RoleModel.create(roleData);
};

export const findUserByEmail = async (email: string) => {
  return await UserModel.findOne({ email });
};
EOF

echo "✅ Created test helpers"

# Create Jest configuration
echo "📝 Creating Jest configuration..."

cat > "jest.config.js" << 'EOF'
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  testMatch: [
    '**/__tests__/**/*.ts',
    '**/?(*.)+(spec|test).ts'
  ],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  setupFilesAfterEnv: ['<rootDir>/tests/setup/jest.setup.ts'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/index.ts',
    '!src/scripts/**',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  testTimeout: 10000,
  verbose: true
};
EOF

echo "✅ Created Jest configuration"

echo ""
echo "🎉 Test file generation complete!"
echo ""
echo "📊 Generated structure:"
echo "├── tests/"
echo "│   ├── unit/ (mirrors src/ structure)"
echo "│   ├── integration/"
echo "│   ├── e2e/"
echo "│   ├── fixtures/"
echo "│   ├── helpers/"
echo "│   └── setup/"
echo "├── jest.config.js"
echo "└── Updated package.json scripts needed"
echo ""
echo "📝 Next steps:"
echo "1. Update package.json test scripts"
echo "2. Install testing dependencies: npm install --save-dev jest @types/jest ts-jest supertest @types/supertest"
echo "3. Run tests: npm test"
echo "4. Fill in test implementations"
echo ""
echo "✅ Your testing structure is now perfectly aligned with src/ directory!"
