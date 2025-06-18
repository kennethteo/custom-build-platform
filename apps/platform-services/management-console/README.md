# Management Console

A modern React-based management console for the Custom Build Platform that provides administrative access to the User Management Service APIs.

## Features

- 🔐 **Authentication**: JWT-based login system
- 👥 **User Management**: 
  - View, create, edit, and delete users
  - Assign/remove roles
  - Activate/deactivate user accounts
  - Search and pagination
- 🛡️ **Role Management**:
  - View, create, edit, and delete roles
  - Manage role permissions
- 📱 **Responsive Design**: Modern UI with Tailwind CSS
- ⚡ **Real-time Updates**: React Query for efficient data fetching
- 🔄 **Form Validation**: Zod schema validation with React Hook Form

## Tech Stack

- **Frontend**: Next.js 14 with App Router
- **UI Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Query for server state
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **HTTP Client**: Axios

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- User Management Service running on port 3001

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

### Default Login

Use the default admin credentials from the User Management Service:
- **Email**: admin@customplatform.com
- **Password**: Admin123!@#

## Project Structure

```
src/
├── app/                    # Next.js 13+ app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── providers.tsx      # React providers
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── auth/             # Authentication components
│   ├── dashboard/        # Dashboard components
│   ├── roles/           # Role management
│   ├── ui/              # Reusable UI components
│   └── users/           # User management
├── contexts/             # React contexts
│   └── AuthContext.tsx  # Authentication context
├── lib/                 # Utilities and configurations
│   └── api-client.ts    # HTTP client setup
├── services/            # API service layer
│   └── api.ts          # API service methods
└── types/              # TypeScript type definitions
    └── api.ts         # API-related types
```

## Features Overview

### Authentication
- JWT token-based authentication
- Automatic token refresh
- Protected routes
- Login/logout functionality

### User Management
- **List Users**: Paginated user list with search
- **User Details**: View user profile and role assignments
- **Create User**: Add new users with role assignment
- **Edit User**: Update user information
- **Role Assignment**: Assign/remove roles from users
- **Account Status**: Activate/deactivate user accounts
- **Delete User**: Remove users from the system

### Role Management
- **List Roles**: View all available roles
- **Role Details**: View role permissions
- **Create Role**: Add new roles with permissions
- **Edit Role**: Update role information and permissions
- **Delete Role**: Remove roles from the system

### UI Components
- **Responsive Design**: Mobile-first approach
- **Loading States**: Skeleton screens and spinners
- **Error Handling**: User-friendly error messages
- **Form Validation**: Real-time validation with error messages
- **Confirmation Dialogs**: Safe deletion confirmations

## API Integration

The management console integrates with the User Management Service through a well-defined API layer:

### Authentication Endpoints
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `GET /users/profile` - Get current user profile

### User Management Endpoints
- `GET /users` - List users (with pagination and search)
- `GET /users/:id` - Get user by ID
- `POST /users` - Create new user
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user
- `POST /users/:id/roles` - Assign role to user
- `DELETE /users/:id/roles` - Remove role from user
- `PATCH /users/:id/activate` - Activate user
- `PATCH /users/:id/deactivate` - Deactivate user

### Role Management Endpoints
- `GET /roles` - List all roles
- `GET /roles/:id` - Get role by ID
- `POST /roles` - Create new role
- `PUT /roles/:id` - Update role
- `DELETE /roles/:id` - Delete role

## Development

### Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type checking
npm run type-check

# Linting
npm run lint
```

### Code Standards

- **TypeScript**: Strict mode enabled
- **ESLint**: Next.js recommended configuration
- **Prettier**: Automatic code formatting
- **Component Structure**: Functional components with hooks
- **API Integration**: Centralized API service layer
- **Error Handling**: Comprehensive error boundaries

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | User Management Service API URL | `http://localhost:3001/api/v1` |

## Deployment

### Production Build

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

### Docker Deployment

```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

## Security Considerations

- **JWT Token Storage**: Secure cookie-based token storage
- **HTTPS**: Use HTTPS in production
- **CORS**: Properly configured CORS headers
- **Input Validation**: Client and server-side validation
- **Error Handling**: No sensitive data in error messages

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is part of the Custom Build Platform and follows the same licensing terms.
