# User Management Service API

A comprehensive user management service providing authentication, authorization, and user administration capabilities.

## Features

- ✅ User registration and authentication
- ✅ Role-based access control (RBAC)
- ✅ JWT-based session management
- ✅ Password management
- ✅ User profile management
- ✅ Admin user management
- ✅ Permission system
- ✅ Rate limiting
- ✅ Input validation
- ✅ Error handling

## Quick Start

### Prerequisites

- Node.js 18+
- MongoDB 5.0+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit environment variables
nano .env

# Seed the database
npm run seed

# Start in development mode
npm run dev

# Build for production
npm run build
npm start
```

## API Endpoints

### Authentication Routes (`/api/v1/auth`)

#### Register User
```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "username": "username",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

#### Login
```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "emailOrUsername": "user@example.com",
  "password": "password123"
}
```

#### Logout
```http
POST /api/v1/auth/logout
Authorization: Bearer <token>
```

#### Change Password
```http
POST /api/v1/auth/change-password
Authorization: Bearer <token>
Content-Type: application/json

{
  "currentPassword": "oldpassword",
  "newPassword": "newpassword123"
}
```

### User Routes (`/api/v1/users`)

#### Get Own Profile
```http
GET /api/v1/users/profile
Authorization: Bearer <token>
```

#### Update Profile
```http
PUT /api/v1/users/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890",
  "profile": {
    "bio": "Software developer",
    "timezone": "America/New_York",
    "preferences": {
      "theme": "dark",
      "notifications": {
        "email": true,
        "push": false
      }
    }
  }
}
```

#### Get All Users (Admin)
```http
GET /api/v1/users?page=1&limit=10&search=john
Authorization: Bearer <admin-token>
```

#### Get User by ID (Admin)
```http
GET /api/v1/users/:id
Authorization: Bearer <admin-token>
```

#### Assign Role (Admin)
```http
POST /api/v1/users/:id/roles
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "roleId": "role-id-here"
}
```

#### Remove Role (Admin)
```http
DELETE /api/v1/users/:id/roles
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "roleId": "role-id-here"
}
```

#### Activate/Deactivate User (Admin)
```http
PATCH /api/v1/users/:id/activate
PATCH /api/v1/users/:id/deactivate
Authorization: Bearer <admin-token>
```

### Role Routes (`/api/v1/roles`)

#### Get All Roles (Admin)
```http
GET /api/v1/roles
Authorization: Bearer <admin-token>
```

#### Create Role (Admin)
```http
POST /api/v1/roles
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "name": "editor",
  "description": "Content editor role",
  "permissions": ["permission-id-1", "permission-id-2"]
}
```

#### Update Role (Admin)
```http
PUT /api/v1/roles/:id
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "name": "senior-editor",
  "description": "Senior content editor role"
}
```

#### Delete Role (Admin)
```http
DELETE /api/v1/roles/:id
Authorization: Bearer <admin-token>
```

## Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {
    // Response data
  }
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "message": "Error description"
  }
}
```

## Default Roles

- **super-admin**: Full system access
- **admin**: User and role management
- **user-manager**: Limited user management
- **user**: Basic user access

## Default Admin User

- **Email**: admin@customplatform.com
- **Username**: admin
- **Password**: Admin123!@# (Change immediately!)

## Environment Variables

```env
NODE_ENV=development
PORT=3001
MONGODB_URI=mongodb://localhost:27017/user-management
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Rate limiting
- Input validation with Zod
- CORS protection
- Helmet security headers
- Session management

## Database Schema

The service uses MongoDB with the following collections:

- **users**: User accounts and profiles
- **roles**: Role definitions and permissions
- **permissions**: Available permissions in the system

## Development

```bash
# Run in development mode
npm run dev

# Run tests
npm test

# Lint code
npm run lint

# Build for production
npm run build
```

## Production Deployment

1. Set environment variables
2. Build the application
3. Run database migrations/seeding
4. Start the service
5. Configure reverse proxy (nginx)
6. Set up monitoring and logging

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request
