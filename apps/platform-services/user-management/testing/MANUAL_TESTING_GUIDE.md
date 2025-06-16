# Manual API Testing Guide

This guide provides step-by-step instructions for manually testing all User Management Service APIs.

## Prerequisites

1. **Service Running**: Ensure the service is running on `http://localhost` (or your configured base URL)
2. **Database Seeded**: Run `npm run seed` to create default admin user
3. **Testing Tool**: Use Postman, Insomnia, curl, or any HTTP client

## Base Configuration

```
Base URL: http://localhost
Content-Type: application/json
```

## 1. Health Check

### Check Service Health
```http
GET /health
```

**Expected Response:**
```
healthy
```

---

## 2. Authentication Flow

### 2.1 Register New User

```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "email": "testuser@example.com",
  "username": "testuser",
  "password": "TestPass123!",
  "firstName": "Test",
  "lastName": "User"
}
```

**Expected Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "user-id",
      "email": "testuser@example.com",
      "username": "testuser",
      "firstName": "Test",
      "lastName": "User",
      "isActive": true,
      "isVerified": false,
      "roles": ["user"]
    },
    "token": "jwt-token-here"
  }
}
```

**Save the token for subsequent requests!**

### 2.2 Login User

```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "emailOrUsername": "testuser@example.com",
  "password": "TestPass123!"
}
```

**Expected Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "user-id",
      "email": "testuser@example.com",
      "roles": ["user"]
    },
    "token": "new-jwt-token"
  }
}
```

### 2.3 Login Admin (for admin tests)

```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "emailOrUsername": "admin@customplatform.com",
  "password": "Admin123!@#"
}
```

**Save the admin token separately!**

---

## 3. User Profile Management

**⚠️ Requires Authorization: Bearer {user-token}**

### 3.1 Get Own Profile

```http
GET /api/v1/users/profile
Authorization: Bearer {user-token}
```

**Expected Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "user-id",
    "email": "testuser@example.com",
    "username": "testuser",
    "firstName": "Test",
    "lastName": "User",
    "isActive": true,
    "roles": [{"name": "user"}],
    "profile": {
      "timezone": "UTC",
      "language": "en"
    }
  }
}
```

### 3.2 Update Profile

```http
PUT /api/v1/users/profile
Authorization: Bearer {user-token}
Content-Type: application/json

{
  "firstName": "Updated",
  "lastName": "User",
  "phone": "+1234567890",
  "profile": {
    "bio": "Software developer and API tester",
    "timezone": "America/New_York",
    "language": "en",
    "preferences": {
      "theme": "dark",
      "notifications": {
        "email": true,
        "push": false,
        "sms": false
      },
      "privacy": {
        "profileVisible": true,
        "showEmail": false
      }
    }
  }
}
```

**Expected Response (200):**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "id": "user-id",
    "firstName": "Updated",
    "lastName": "User",
    "phone": "+1234567890",
    "profile": {
      "bio": "Software developer and API tester",
      "timezone": "America/New_York"
    }
  }
}
```

---

## 4. Admin User Management

**⚠️ Requires Authorization: Bearer {admin-token}**

### 4.1 Get All Users

```http
GET /api/v1/users?page=1&limit=10&search=test
Authorization: Bearer {admin-token}
```

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `search`: Search term (optional)

**Expected Response (200):**
```json
{
  "success": true,
  "data": {
    "users": [
      {
        "id": "user-id",
        "email": "testuser@example.com",
        "firstName": "Updated",
        "lastName": "User",
        "isActive": true,
        "roles": ["user"]
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 1,
      "totalPages": 1
    }
  }
}
```

### 4.2 Get User by ID

```http
GET /api/v1/users/{user-id}
Authorization: Bearer {admin-token}
```

### 4.3 Activate User

```http
PATCH /api/v1/users/{user-id}/activate
Authorization: Bearer {admin-token}
```

### 4.4 Deactivate User

```http
PATCH /api/v1/users/{user-id}/deactivate
Authorization: Bearer {admin-token}
```

---

## 5. Role Management

**⚠️ Requires Authorization: Bearer {admin-token}**

### 5.1 Get All Roles

```http
GET /api/v1/roles
Authorization: Bearer {admin-token}
```

**Expected Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "role-id",
      "name": "super-admin",
      "description": "Super administrator with full system access",
      "isSystemRole": true,
      "permissions": [...]
    },
    {
      "_id": "role-id-2",
      "name": "admin",
      "description": "Administrator with user and role management access",
      "isSystemRole": true,
      "permissions": [...]
    }
  ]
}
```

**Save a role ID for user assignment tests!**

### 5.2 Create New Role

```http
POST /api/v1/roles
Authorization: Bearer {admin-token}
Content-Type: application/json

{
  "name": "content-editor",
  "description": "Content editor with limited permissions",
  "permissions": []
}
```

**Expected Response (201):**
```json
{
  "success": true,
  "message": "Role created successfully",
  "data": {
    "_id": "new-role-id",
    "name": "content-editor",
    "description": "Content editor with limited permissions",
    "isSystemRole": false,
    "permissions": []
  }
}
```

**Save the new role ID!**

### 5.3 Update Role

```http
PUT /api/v1/roles/{new-role-id}
Authorization: Bearer {admin-token}
Content-Type: application/json

{
  "name": "senior-content-editor",
  "description": "Senior content editor with expanded permissions"
}
```

### 5.4 Assign Role to User

```http
POST /api/v1/users/{user-id}/roles
Authorization: Bearer {admin-token}
Content-Type: application/json

{
  "roleId": "{new-role-id}"
}
```

### 5.5 Remove Role from User

```http
DELETE /api/v1/users/{user-id}/roles
Authorization: Bearer {admin-token}
Content-Type: application/json

{
  "roleId": "{new-role-id}"
}
```

### 5.6 Delete Role

```http
DELETE /api/v1/roles/{new-role-id}
Authorization: Bearer {admin-token}
```

---

## 6. Password Management

**⚠️ Requires Authorization: Bearer {user-token}**

### 6.1 Change Password

```http
POST /api/v1/auth/change-password
Authorization: Bearer {user-token}
Content-Type: application/json

{
  "currentPassword": "TestPass123!",
  "newPassword": "NewTestPass123!"
}
```

**Expected Response (200):**
```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

---

## 7. Security Tests

### 7.1 Test Unauthorized Access

```http
GET /api/v1/users/profile
```

**Expected Response (401):**
```json
{
  "success": false,
  "error": {
    "message": "Authentication required"
  }
}
```

### 7.2 Test Invalid Token

```http
GET /api/v1/users/profile
Authorization: Bearer invalid-token
```

**Expected Response (401):**
```json
{
  "success": false,
  "error": {
    "message": "Invalid or expired token"
  }
}
```

### 7.3 Test Admin Endpoint with User Token

```http
GET /api/v1/users
Authorization: Bearer {user-token}
```

**Expected Response (403):**
```json
{
  "success": false,
  "error": {
    "message": "Insufficient permissions"
  }
}
```

---

## 8. Input Validation Tests

### 8.1 Invalid Email Registration

```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "email": "invalid-email",
  "username": "testuser2",
  "password": "TestPass123!",
  "firstName": "Test",
  "lastName": "User"
}
```

**Expected Response (400):**
```json
{
  "success": false,
  "error": {
    "message": "Validation failed",
    "details": "email: Invalid email format"
  }
}
```

### 8.2 Weak Password Registration

```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "email": "testuser2@example.com",
  "username": "testuser2",
  "password": "123",
  "firstName": "Test",
  "lastName": "User"
}
```

**Expected Response (400):**
```json
{
  "success": false,
  "error": {
    "message": "Validation failed",
    "details": "password: Password must be at least 8 characters"
  }
}
```

---

## 9. Cleanup

### 9.1 Logout

```http
POST /api/v1/auth/logout
Authorization: Bearer {user-token}
```

**Expected Response (200):**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## Common Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "error": {
    "message": "Validation failed",
    "details": "field: error description"
  }
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "error": {
    "message": "Authentication required"
  }
}
```

### 403 Forbidden
```json
{
  "success": false,
  "error": {
    "message": "Insufficient permissions"
  }
}
```

### 404 Not Found
```json
{
  "success": false,
  "error": {
    "message": "Resource not found"
  }
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "error": {
    "message": "Internal server error"
  }
}
```

---

## Testing Checklist

- [ ] Health check returns healthy status
- [ ] User registration works with valid data
- [ ] User registration fails with invalid data
- [ ] User login works with correct credentials
- [ ] User login fails with wrong credentials
- [ ] Admin login works
- [ ] Get user profile works with valid token
- [ ] Update user profile works
- [ ] Admin can get all users
- [ ] Admin can get specific user
- [ ] Admin can activate/deactivate users
- [ ] Admin can get all roles
- [ ] Admin can create new roles
- [ ] Admin can update roles
- [ ] Admin can assign/remove user roles
- [ ] Admin can delete roles
- [ ] User can change password
- [ ] Unauthorized requests are blocked
- [ ] Invalid tokens are rejected
- [ ] Admin endpoints reject user tokens
- [ ] Input validation works correctly
- [ ] Logout functionality works

## Automation

Use the provided scripts for automated testing:

```bash
# Run curl script tests
./testing/api-test.sh

# Run Jest integration tests
npm test testing/api.test.js

# Import Postman collection
# Import testing/postman-collection.json into Postman
```
