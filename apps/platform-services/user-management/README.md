# User Management Service

A robust and scalable user management microservice built with Node.js, Express, MongoDB, and TypeScript. This service provides comprehensive user authentication, authorization, and administration capabilities for the Custom Build Platform.

## 🚀 Features

### Core Features

- **User Registration & Authentication** - Secure user signup and login
- **Role-Based Access Control (RBAC)** - Flexible permission system
- **JWT Authentication** - Stateless token-based authentication
- **Session Management** - Track and manage user sessions
- **Profile Management** - User profile and preferences
- **Password Management** - Change, reset, and forgot password
- **User Administration** - Admin tools for user management

### Security Features

- **Password Hashing** - bcrypt with salt rounds
- **Rate Limiting** - Prevent brute force attacks
- **Input Validation** - Zod schema validation
- **CORS Protection** - Cross-origin resource sharing
- **Security Headers** - Helmet.js security middleware
- **Session Tracking** - IP and user agent logging

### Development Features

- **TypeScript** - Full type safety
- **MongoDB Integration** - Mongoose ODM
- **Error Handling** - Centralized error management
- **API Documentation** - Comprehensive API docs
- **Docker Support** - Container deployment
- **Database Seeding** - Default roles and admin user

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
├── config/
│   └── database.ts         # MongoDB connection
├── controllers/
│   ├── auth.controller.ts  # Authentication endpoints
│   ├── user.controller.ts  # User management endpoints
│   └── role.controller.ts  # Role management endpoints
├── middleware/
│   ├── auth.ts            # Authentication middleware
│   ├── errorHandler.ts    # Error handling
│   ├── notFound.ts        # 404 handler
│   └── validation.ts      # Input validation
├── models/
│   ├── user.model.ts      # User schema and methods
│   ├── role.model.ts      # Role schema and methods
│   └── permission.model.ts # Permission schema
├── routes/
│   ├── auth.routes.ts     # Auth route definitions
│   ├── user.routes.ts     # User route definitions
│   └── role.routes.ts     # Role route definitions
├── services/
│   └── user.service.ts    # Business logic layer
├── scripts/
│   └── seed.ts           # Database seeding
└── index.ts              # Application entry point
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

### Authentication

- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/logout` - User logout
- `POST /api/v1/auth/change-password` - Change password

### User Management

- `GET /api/v1/users/profile` - Get own profile
- `PUT /api/v1/users/profile` - Update own profile
- `GET /api/v1/users` - List all users (admin)
- `GET /api/v1/users/:id` - Get user by ID (admin)
- `POST /api/v1/users/:id/roles` - Assign role (admin)
- `DELETE /api/v1/users/:id/roles` - Remove role (admin)

### Role Management

- `GET /api/v1/roles` - List all roles (admin)
- `POST /api/v1/roles` - Create role (admin)
- `PUT /api/v1/roles/:id` - Update role (admin)
- `DELETE /api/v1/roles/:id` - Delete role (admin)

See [API.md](./API.md) for detailed API documentation.

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run with coverage
npm run test:coverage
```

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

### Docker Deployment

```bash
# Build and deploy with Docker Compose
docker-compose up -d

# Scale the service
docker-compose up -d --scale user-management=3
```

## 📊 Monitoring & Logging

### Health Check

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
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run test         # Run tests
npm run lint         # Lint code
npm run seed         # Seed database
npm run docker:build # Build Docker image
npm run docker:run   # Run with Docker Compose
```

### Code Quality

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Type checking
- **Jest** - Unit testing

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
2. Review the [troubleshooting guide](#troubleshooting)
3. Open an issue in the repository
4. Contact the development team

## 🔍 Troubleshooting

### Common Issues

#### MongoDB Authentication Error: "MongoServerError: command find requires authentication"

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

#### MongoDB Connection Error

```bash
# Check MongoDB is running
mongosh --eval "db.adminCommand('ping')"

# Check connection string in .env
MONGODB_URI=mongodb://localhost:27017/user-management
```

#### JWT Token Errors

```bash
# Ensure JWT_SECRET is set in .env
JWT_SECRET=your-super-secret-jwt-key
```

#### Permission Denied

```bash
# Check user roles and permissions
# Ensure user has required role for the endpoint
```

#### Rate Limiting

```bash
# Adjust rate limiting in .env
RATE_LIMIT_MAX_REQUESTS=1000
```
