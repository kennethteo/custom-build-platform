# GitHub Copilot Instructions

## Project Overview
This is a **Custom Build Platform** with a **User Management Service** built using TypeScript, Express.js, MongoDB, and Docker. The project follows enterprise-grade architecture patterns with comprehensive testing, security, and scalability considerations.

## 🏗️ Architecture & Patterns

### Primary Stack
- **Backend**: Node.js, Express.js, TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT with refresh tokens, bcrypt password hashing
- **Testing**: Jest, Supertest (90%+ coverage target)
- **DevOps**: Docker, Docker Compose, SSL/TLS
- **Validation**: Zod schemas with custom validators

### Design Patterns
- **Repository Pattern**: Base repository with specific implementations
- **Service Layer Pattern**: Business logic separation
- **DTO Pattern**: Data Transfer Objects for API contracts
- **Middleware Pattern**: Authentication, validation, error handling
- **Factory Pattern**: For creating entities and responses

## 📁 Project Structure Rules

### Core Directories
```
apps/platform-services/user-management/
├── src/
│   ├── controllers/     # HTTP request handlers
│   ├── services/        # Business logic layer
│   ├── repositories/    # Data access layer
│   ├── models/          # MongoDB/Mongoose schemas
│   ├── middleware/      # Auth, validation, error handling
│   ├── dto/             # Data Transfer Objects (organized by feature)
│   ├── utils/           # Utility functions
│   ├── validation/      # Zod validation schemas
│   ├── types/           # TypeScript type definitions
│   └── constants/       # Application constants
├── tests/               # Mirror src/ structure exactly
│   ├── unit/           # Unit tests (mirrors src/)
│   ├── integration/    # Integration tests
│   ├── e2e/           # End-to-end tests
│   ├── fixtures/      # Test data
│   └── helpers/       # Test utilities
├── docker/             # Docker configurations
├── ssl/               # SSL certificates
└── docs/              # Documentation
```

### File Naming Conventions
- **Controllers**: `*.controller.ts` (e.g., `user.controller.ts`)
- **Services**: `*.service.ts` (e.g., `user.service.ts`)
- **Repositories**: `*.repository.ts` (e.g., `user.repository.ts`)
- **Models**: `*.model.ts` (e.g., `user.model.ts`)
- **DTOs**: `*.dto.ts` organized by feature folder
- **Validation**: `*.validation.ts` (e.g., `user.validation.ts`)
- **Tests**: `*.test.ts` mirroring the source file structure
- **Types**: Use PascalCase interfaces (e.g., `UserData`, `AuthResponse`)

## 🎯 Code Generation Guidelines

### When creating new features:

1. **Always start with DTOs and validation schemas**
2. **Create comprehensive tests FIRST (TDD approach)**
3. **Follow the layered architecture**: Controller → Service → Repository → Model
4. **Ensure proper error handling and logging**
5. **Add proper TypeScript types and interfaces**

### API Endpoints Pattern
```typescript
// Controller pattern
export class UserController {
  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const userData = req.body as CreateUserDto;
      const user = await this.userService.createUser(userData);
      res.status(201).json({
        success: true,
        data: user,
        message: 'User created successfully'
      });
    } catch (error) {
      next(error);
    }
  }
}
```

### Service Layer Pattern
```typescript
// Service pattern - business logic only
export class UserService {
  constructor(private userRepository: UserRepository) {}
  
  async createUser(userData: CreateUserDto): Promise<UserResponseDto> {
    // Business logic here
    const hashedPassword = await hashPassword(userData.password);
    return await this.userRepository.create({ ...userData, password: hashedPassword });
  }
}
```

### Repository Pattern
```typescript
// Repository pattern - data access only
export class UserRepository extends BaseRepository<User> {
  constructor() {
    super(UserModel);
  }
  
  async findByEmail(email: string): Promise<User | null> {
    return this.findOne({ email });
  }
}
```

## 🧪 Testing Standards

### Test Structure Requirements
- **Unit tests**: 90%+ coverage for services, repositories, utils
- **Integration tests**: API endpoints with real database
- **E2E tests**: Complete user workflows
- **Test files must mirror src/ structure exactly**

### Test Patterns
```typescript
describe('UserService', () => {
  let userService: UserService;
  let mockUserRepository: jest.Mocked<UserRepository>;

  beforeEach(() => {
    mockUserRepository = createMockRepository();
    userService = new UserService(mockUserRepository);
  });

  describe('createUser', () => {
    it('should create user with hashed password', async () => {
      // Arrange
      const userData = { email: 'test@example.com', password: 'password' };
      
      // Act
      const result = await userService.createUser(userData);
      
      // Assert
      expect(result.email).toBe(userData.email);
      expect(mockUserRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          email: userData.email,
          password: expect.not.stringMatching(userData.password)
        })
      );
    });
  });
});
```

## 🔒 Security Requirements

### Authentication & Authorization
- **JWT tokens**: Access (15min) + Refresh (7 days)
- **Password hashing**: bcrypt with salt rounds 12
- **Role-based access**: Admin, User roles with permissions
- **Account management**: Activation/deactivation support

### Security Middleware
```typescript
// Always include these middleware patterns
app.use(helmet()); // Security headers
app.use(cors(corsOptions)); // CORS configuration
app.use(rateLimiter); // Rate limiting
app.use(authenticateToken); // JWT validation
app.use(authorizeRole(['admin'])); // Role-based access
```

## 📝 Documentation Standards

### Code Comments
- **JSDoc comments** for all public methods
- **Inline comments** for complex business logic
- **TODO comments** with GitHub issue references

### API Documentation
```typescript
/**
 * Creates a new user account
 * @route POST /api/users
 * @access Public
 * @param {CreateUserDto} userData - User registration data
 * @returns {Promise<UserResponseDto>} Created user data
 * @throws {ValidationError} When input data is invalid
 * @throws {ConflictError} When email already exists
 */
```

## 🚨 Error Handling Patterns

### Custom Error Classes
```typescript
export class ValidationError extends Error {
  constructor(message: string, public field?: string) {
    super(message);
    this.name = 'ValidationError';
  }
}
```

### Error Response Format
```typescript
{
  success: false,
  error: {
    type: 'ValidationError',
    message: 'Email is required',
    field: 'email',
    timestamp: '2024-01-01T00:00:00.000Z'
  }
}
```

## 🔧 Development Workflow

### Before committing:
1. **Run tests**: `npm test` (must pass 100%)
2. **Type checking**: `npm run type-check`
3. **Linting**: `npm run lint`
4. **Format code**: `npm run format`

### Environment Variables
- Always use `.env` files for configuration
- Never commit sensitive data
- Document all required environment variables

## 🎨 Code Style Preferences

### TypeScript
- **Strict mode enabled**
- **Explicit return types** for functions
- **Interface over type** for object shapes
- **Enum for constants** with multiple values

### Imports
```typescript
// External libraries first
import express from 'express';
import bcrypt from 'bcrypt';

// Internal imports by layer
import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';
import { UserRepository } from '../repositories/user.repository';

// Types and DTOs last
import type { CreateUserDto, UserResponseDto } from '../dto/user/user.dto';
```

### Function Style
- **Async/await** over Promises
- **Arrow functions** for simple operations
- **Regular functions** for class methods
- **Destructuring** for cleaner code

## 📊 Performance Guidelines

### Database
- **Use indexes** for frequently queried fields
- **Implement pagination** for list endpoints
- **Use aggregation pipelines** for complex queries
- **Connection pooling** for database connections

### Caching Strategy
- **Redis** for session storage
- **Memory caching** for frequently accessed data
- **HTTP caching headers** for static responses

## 🌐 API Design Standards

### RESTful Conventions
- `GET /users` - List users (with pagination)
- `GET /users/:id` - Get specific user
- `POST /users` - Create user
- `PUT /users/:id` - Update user (full)
- `PATCH /users/:id` - Update user (partial)
- `DELETE /users/:id` - Delete user

### Response Format
```typescript
// Success response
{
  success: true,
  data: T,
  message?: string,
  pagination?: PaginationInfo
}

// Error response
{
  success: false,
  error: ErrorInfo
}
```

## 🐳 Docker & Deployment

### Container Strategy
- **Multi-stage builds** for production optimization
- **Non-root user** for security
- **Health checks** for container monitoring
- **Environment-specific** configurations

## 🤖 AI Code Generation Preferences

### Copilot Interaction Style
- **Be explicit about requirements**: Always specify layer (controller/service/repository) when requesting code
- **Request complete implementations**: Ask for "full feature with tests" rather than partial code
- **Specify error handling**: Include error handling requirements in prompts
- **Mention performance considerations**: When applicable, ask for optimized database queries

### Code Quality Expectations
- **Type safety first**: All generated code must be fully typed
- **Security by default**: Include authentication/authorization checks
- **Test coverage**: Generate tests alongside implementation code
- **Documentation**: Include JSDoc comments for all public methods

### Example Prompts for Best Results
```
// Good prompt
"Create a complete user profile feature with DTO validation, service layer business logic, repository with database queries, comprehensive tests, and proper error handling"

// Better prompt
"Generate a user profile update endpoint following the repository pattern, with Zod validation, JWT authentication middleware, optimized MongoDB queries, and 90% test coverage including edge cases"
```

## 🔄 Code Review Standards

### Pull Request Requirements
- **All tests must pass** (90%+ coverage)
- **TypeScript strict mode** compliance
- **ESLint and Prettier** formatting
- **Security scan** results clean
- **Performance impact** assessment for database changes

### Code Quality Metrics
- **Cyclomatic complexity**: Max 10 per function
- **Function length**: Max 50 lines
- **File length**: Max 300 lines
- **Import depth**: Max 3 levels

## 🎯 Feature Development Checklist

When generating new features, ensure:
- [ ] DTO with Zod validation schema
- [ ] Service layer with business logic
- [ ] Repository with optimized queries
- [ ] Controller with proper error handling
- [ ] Middleware for authentication/authorization
- [ ] Unit tests (90%+ coverage)
- [ ] Integration tests for API endpoints
- [ ] API documentation (JSDoc)
- [ ] Error handling with custom error types
- [ ] Logging for debugging and monitoring

Remember: This is an enterprise-grade user management service. Prioritize security, scalability, maintainability, and comprehensive testing in all generated code.