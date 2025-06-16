# User Management Service

A robust and scalable user management microservice built with Node.js, Express, MongoDB, and TypeScript. This service provides comprehensive user authentication, authorization, and administration capabilities for the Custom Build Platform.

## ⚡ Quick Start

```bash
# Clone and setup
git clone <repository-url>
cd user-management
npm install

# Start with Docker (Recommended)
npm run docker:run

# Or start locally
cp .env.example .env
# Edit .env with your MongoDB URI
npm run seed
npm run dev

# Test the service
curl http://localhost:3001/health
```

**Default Admin Account:**

- Email: `admin@customplatform.com`
- Password: `Admin123!@#`

## 🚀 Features

### Core Features

- **User Registration & Authentication** - Secure user signup and login with email/username
- **Role-Based Access Control (RBAC)** - Flexible permission system with hierarchical roles
- **JWT Authentication** - Stateless token-based authentication with refresh tokens
- **Session Management** - Track and manage user sessions with IP and device tracking
- **Profile Management** - Comprehensive user profiles with preferences and timezone support
- **Password Management** - Change password, reset, and forgot password functionality
- **User Administration** - Complete admin tools for user lifecycle management
- **Account Activation/Deactivation** - Admin controls for user account status

### Security Features

- **Password Hashing** - bcrypt with configurable salt rounds
- **Rate Limiting** - Configurable rate limiting to prevent brute force attacks
- **Input Validation** - Comprehensive Zod schema validation for all endpoints
- **CORS Protection** - Cross-origin resource sharing configuration
- **Security Headers** - Helmet.js security middleware with CSP
- **Session Tracking** - IP address and user agent logging for security auditing
- **Token Blacklisting** - JWT token invalidation on logout
- **Multi-factor Authentication Ready** - Infrastructure for MFA implementation

### Development Features

- **TypeScript** - Full type safety with strict mode enabled
- **MongoDB Integration** - Mongoose ODM with connection pooling
- **Layered Architecture** - Controllers, Services, Repositories, and DTOs
- **Error Handling** - Centralized error management with custom error types
- **API Documentation** - Comprehensive OpenAPI/Swagger documentation
- **Docker Support** - Multi-stage Docker builds and Docker Compose
- **Database Seeding** - Automated seeding with default roles and admin user
- **Comprehensive Testing** - Unit, integration, and API tests with 90%+ coverage

## 📋 Prerequisites

- Node.js 18+
- MongoDB 5.0+
- npm or yarn

## 🛠️ Installation

### Local Development

```bash
# Clone the repository
git clone <repository-url>
cd user-management

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit environment variables
nano .env

# Seed the database with default data
npm run seed

# Start development server
npm run dev
```

### Docker Deployment

```bash
# Build and run with Docker Compose
npm run docker:run

# View logs
npm run docker:logs

# Stop services
npm run docker:stop
```

## ⚙️ Configuration

### Environment Variables

```env
# Server Configuration
NODE_ENV=development
PORT=3001

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/user-management

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000  # 15 minutes
RATE_LIMIT_MAX_REQUESTS=100

# Logging
LOG_LEVEL=debug
```

## 🏗️ Architecture

### Project Structure

```bash
src/
├── app.ts                  # Express application setup
├── index.ts               # Application entry point
├── config/
│   ├── database.ts        # MongoDB connection configuration
│   └── env.ts            # Environment variable validation
├── constants/
│   ├── permissions.ts     # Permission definitions
│   └── roles.ts          # Default role configurations
├── controllers/
│   ├── auth.controller.ts # Authentication endpoints
│   ├── user.controller.ts # User management endpoints
│   └── role.controller.ts # Role management endpoints
├── dto/
│   ├── auth/             # Authentication DTOs
│   ├── user/             # User management DTOs
│   └── role/             # Role management DTOs
├── middleware/
│   ├── auth.ts           # JWT authentication middleware
│   ├── rbac.ts           # Role-based access control
│   ├── errorHandler.ts   # Global error handling
│   ├── notFound.ts       # 404 handler
│   └── validation.ts     # Request validation middleware
├── models/
│   ├── user.model.ts     # User schema and methods
│   ├── role.model.ts     # Role schema and methods
│   └── permission.model.ts # Permission schema
├── repositories/
│   ├── user.repository.ts # User data access layer
│   ├── role.repository.ts # Role data access layer
│   └── base.repository.ts # Abstract base repository
├── routes/
│   ├── auth.routes.ts    # Authentication route definitions
│   ├── user.routes.ts    # User route definitions
│   ├── role.routes.ts    # Role route definitions
│   └── index.ts          # Route aggregation
├── services/
│   ├── auth.service.ts   # Authentication business logic
│   ├── user.service.ts   # User management business logic
│   └── role.service.ts   # Role management business logic
├── types/
│   ├── auth.types.ts     # Authentication type definitions
│   ├── user.types.ts     # User-related types
│   └── common.types.ts   # Shared type definitions
├── utils/
│   ├── jwt.util.ts       # JWT token utilities
│   ├── password.util.ts  # Password hashing utilities
│   └── validation.util.ts # Common validation functions
├── validation/
│   ├── auth.validation.ts # Authentication validation schemas
│   ├── user.validation.ts # User validation schemas
│   └── role.validation.ts # Role validation schemas
└── scripts/
    └── seed.ts           # Database seeding script

testing/
├── api.test.js           # Comprehensive API integration tests
├── setup.js              # Test environment setup
├── env-setup.js          # Environment configuration for tests
├── api-test.sh           # Shell script for API testing
├── load-test.sh          # Performance testing script
├── postman-collection.json # Postman API collection
├── MANUAL_TESTING_GUIDE.md # Manual testing documentation
└── README.md             # Testing documentation

docker/
├── mongodb/              # MongoDB configuration
└── ssl/                  # SSL certificates for development
```

### Database Schema

#### Users Collection

- Personal information (email, username, names)
- Authentication data (password hash, sessions)
- Profile data (bio, preferences, timezone)
- Role assignments
- Account status and verification

#### Roles Collection

- Role definition (name, description)
- Embedded permissions
- System role flag

#### Permissions Collection

- Permission definition (name, resource, action)
- Conditions and restrictions
- Categorization

## 🔐 Security Model

### Default Roles

| Role | Description | Permissions |
|------|-------------|-------------|
| `super-admin` | Full system access | All permissions |
| `admin` | User and role management | User CRUD, role assignment |
| `user-manager` | Limited user management | User read/update |
| `user` | Standard user | Profile management |

### Permission System

Permissions follow the format: `resource.action`

Examples:

- `users.create` - Create new users
- `users.read` - View user information
- `roles.assign` - Assign roles to users

## 🌐 API Endpoints

### Health Check

- `GET /health` - Service health status

### Authentication

- `POST /api/v1/auth/register` - User registration with email verification
- `POST /api/v1/auth/login` - User login (email or username)
- `POST /api/v1/auth/logout` - User logout with token invalidation
- `POST /api/v1/auth/change-password` - Change user password

### User Profile Management

- `GET /api/v1/users/profile` - Get authenticated user's profile
- `PUT /api/v1/users/profile` - Update user profile and preferences

### Admin User Management

- `GET /api/v1/users` - List all users with pagination (admin only)
- `GET /api/v1/users/:id` - Get specific user details (admin only)
- `PATCH /api/v1/users/:id/activate` - Activate user account (admin only)
- `PATCH /api/v1/users/:id/deactivate` - Deactivate user account (admin only)

### Role Management

- `GET /api/v1/roles` - List all roles (admin only)
- `POST /api/v1/roles` - Create new role (admin only)
- `PUT /api/v1/roles/:id` - Update role (admin only)
- `DELETE /api/v1/roles/:id` - Delete role (admin only)
- `POST /api/v1/users/:id/roles` - Assign role to user (admin only)
- `DELETE /api/v1/users/:id/roles` - Remove role from user (admin only)

### Request/Response Format

All API responses follow a consistent format:

```json
{
  "success": true|false,
  "data": {...},
  "message": "Operation description",
  "timestamp": "2025-06-16T10:00:00.000Z"
}
```

### Error Response Format

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": {...}
  },
  "timestamp": "2025-06-16T10:00:00.000Z"
}
```

See [API.md](./API.md) for detailed API documentation with request/response examples.

## 🧪 Testing

The service includes comprehensive testing with 90%+ code coverage:

### Test Types

- **Unit Tests** - Individual component testing
- **Integration Tests** - API endpoint testing
- **Security Tests** - Authentication and authorization
- **Validation Tests** - Input validation and error handling
- **Performance Tests** - Load testing and benchmarks

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run with coverage report
npm run test:coverage

# Run API integration tests
cd testing && npm test

# Run load tests
./testing/load-test.sh

# Run manual API tests
./testing/api-test.sh
```

### Test Coverage

The test suite covers:

- ✅ User registration and authentication flows
- ✅ Profile management operations
- ✅ Admin user management capabilities
- ✅ Role-based access control (RBAC)
- ✅ Password management and security
- ✅ Input validation and error handling
- ✅ Security measures (rate limiting, auth)
- ✅ Database operations and data integrity

### Test Files

```bash
testing/
├── api.test.js           # Complete API test suite (400+ test cases)
├── setup.js              # Test environment configuration
├── env-setup.js          # Environment variables for testing
├── postman-collection.json # Postman API collection
└── MANUAL_TESTING_GUIDE.md # Step-by-step testing guide
```

### Manual Testing

For manual testing, see the [Manual Testing Guide](./testing/MANUAL_TESTING_GUIDE.md) which includes:

- Step-by-step API testing procedures
- Postman collection import instructions
- Common test scenarios and edge cases
- Performance testing guidelines

## 🚀 Deployment

### Production Build

```bash
# Build the application
npm run build

# Seed production database
npm run seed:prod

# Start production server
npm start
```

### Production Deployment with Docker

```bash
# Build and deploy with Docker Compose
docker-compose up -d

# Scale the service
docker-compose up -d --scale user-management=3
```

## 📊 Monitoring & Logging

### Service Health Monitoring

```bash
# Check service health
curl http://localhost:3001/health
```

Response:

```json
{
  "status": "OK",
  "timestamp": "2025-06-15T10:00:00.000Z",
  "service": "user-management-service",
  "version": "1.0.0"
}
```

### Logs

Logs are written to console and can be collected using Docker logging drivers.

## 🔧 Development

### Available Scripts

```bash
npm run dev           # Start development server with hot reload
npm run build         # Build TypeScript to JavaScript
npm run start         # Start production server
npm run test          # Run Jest test suite
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Run tests with coverage report
npm run lint          # Run ESLint code analysis
npm run lint:fix      # Fix auto-fixable linting issues
npm run seed          # Seed database with default data
npm run seed:prod     # Seed production database
npm run docker:build  # Build Docker image
npm run docker:run    # Run with Docker Compose
npm run docker:stop   # Stop Docker containers
npm run docker:logs   # View Docker container logs
```

### Development Workflow

1. **Setup Environment**

   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Start Development Services**

   ```bash
   # Start MongoDB and other services
   docker-compose up -d mongodb
   
   # Seed the database
   npm run seed
   
   # Start development server
   npm run dev
   ```

4. **Run Tests**

   ```bash
   npm run test:coverage
   ```

### Code Quality

- **ESLint** - Code linting with TypeScript rules
- **Prettier** - Code formatting (configured in package.json)
- **TypeScript** - Strict type checking enabled
- **Jest** - Unit and integration testing
- **Husky** - Git hooks for pre-commit validation
- **Conventional Commits** - Commit message standards

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:

1. Check the [API documentation](./API.md)
2. Review the [troubleshooting section](#-common-issues) below
3. Check the [Manual Testing Guide](./testing/MANUAL_TESTING_GUIDE.md)
4. Open an issue in the repository
5. Contact the development team

## 🔍 Common Issues

### MongoDB Authentication Error: "MongoServerError: command find requires authentication"

**Problem**: The application can't connect to MongoDB due to authentication issues.

**Solution**: This service uses MongoDB with authentication enabled. Follow these steps:

1. **Ensure MongoDB is running with authentication**:

   ```bash
   # The docker-compose.yml configures MongoDB with:
   # - Admin user: admin/password
   # - App user: userapp/userapp123 (created by mongo-init.js)
   ```

2. **Use the correct MongoDB URI format**:

   ```bash
   # In .env file or docker-compose.yml:
   MONGODB_URI=mongodb://userapp:userapp123@localhost:27017/user-management
   ```

3. **Restart services to apply initialization**:

   ```bash
   # Stop all services and remove volumes
   docker-compose down -v
   
   # Start MongoDB first to run initialization scripts
   docker-compose up mongodb -d
   
   # Wait for MongoDB to be ready, then start all services
   docker-compose up -d
   ```

4. **Verify the connection**:

   ```bash
   # Check application logs
   docker-compose logs user-management
   
   # Should show: "✅ MongoDB connected successfully"
   
   # Test database connection directly
   docker exec -it user-management-mongodb-1 mongosh "mongodb://userapp:userapp123@localhost:27017/user-management"
   ```

5. **Test API endpoints**:

   ```bash
   # Health check
   curl http://localhost:3001/health
   
   # Register user
   curl -X POST http://localhost:3001/api/v1/auth/register \
     -H "Content-Type: application/json" \
     -d '{"username":"test","email":"test@example.com","password":"Test123!@#"}'
   ```

**Additional Notes**:

- The `mongo-init.js` script automatically creates the application user with proper permissions
- The service includes enhanced error handling for authentication issues
- All database operations use the dedicated `userapp` user, not the admin user

### MongoDB Connection Error

```bash
# Check MongoDB is running
mongosh --eval "db.adminCommand('ping')"

# Check connection string in .env
MONGODB_URI=mongodb://localhost:27017/user-management
```

### JWT Token Errors

```bash
# Ensure JWT_SECRET is set in .env
JWT_SECRET=your-super-secret-jwt-key
```

### Permission Denied

```bash
# Check user roles and permissions
# Ensure user has required role for the endpoint
```

### Rate Limiting

```bash
# Adjust rate limiting in .env
RATE_LIMIT_MAX_REQUESTS=1000
```
