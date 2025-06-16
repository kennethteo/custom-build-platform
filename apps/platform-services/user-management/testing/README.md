# API Testing Suite

Complete testing toolkit for the User Management Service API, including automated tests, manual testing guides, and load testing tools.

## 📁 Files Overview

| File | Description | Usage |
|------|-------------|-------|
| `postman-collection.json` | Postman/Insomnia collection | Import into API client |
| `api-test.sh` | Automated curl-based tests | `./api-test.sh` |
| `api.test.js` | Jest integration tests | `npm test testing/api.test.js` |
| `MANUAL_TESTING_GUIDE.md` | Step-by-step manual guide | Follow instructions |
| `load-test.sh` | Basic load testing script | `./load-test.sh` |

## 🚀 Quick Start

### 1. Start the Service
```bash
# Make sure your service is running
npm run dev
# OR
docker-compose up
```

### 2. Run Automated Tests
```bash
# Run comprehensive curl tests
./testing/api-test.sh

# Run Jest integration tests
npm test testing/api.test.js

# Run load tests
./testing/load-test.sh
```

### 3. Manual Testing
```bash
# Import into Postman/Insomnia
# File: testing/postman-collection.json

# Follow manual guide
# File: testing/MANUAL_TESTING_GUIDE.md
```

## 🧪 Testing Options

### Option 1: Automated Shell Script Testing

**Best for:** Quick comprehensive testing, CI/CD pipelines

```bash
./testing/api-test.sh
```

**Features:**
- ✅ Tests all endpoints automatically
- ✅ Handles authentication flow
- ✅ Validates responses
- ✅ Security testing
- ✅ Colored output
- ✅ Token management

**Sample Output:**
```
🚀 Starting User Management Service API Tests

===========================================
HEALTH CHECK
===========================================
Response: healthy
✅ Health check

===========================================
AUTHENTICATION TESTS
===========================================
📝 Registering new user...
✅ User registration
Auth Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

🔑 Logging in user...
✅ User login
Updated Auth Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Option 2: Jest Integration Tests

**Best for:** Development, detailed testing, test reports

```bash
npm test testing/api.test.js
```

**Features:**
- ✅ Comprehensive test coverage
- ✅ Detailed assertions
- ✅ Test reports
- ✅ Easy debugging
- ✅ IDE integration

**Sample Output:**
```
 PASS  testing/api.test.js
  User Management Service API
    Health Check
      ✓ GET /health should return healthy status (45ms)
    Authentication
      ✓ POST /api/v1/auth/register should register a new user (123ms)
      ✓ POST /api/v1/auth/login should login user (89ms)
```

### Option 3: Postman/Insomnia Collection

**Best for:** Interactive testing, API exploration, team collaboration

1. **Import Collection:**
   - Open Postman/Insomnia
   - Import `testing/postman-collection.json`

2. **Set Variables:**
   ```
   baseUrl: http://localhost
   ```

3. **Run Tests:**
   - Run individual requests
   - Use collection runner for automation
   - Variables auto-populate (tokens, IDs)

**Features:**
- ✅ Interactive testing
- ✅ Automatic token management
- ✅ Response validation
- ✅ Environment variables
- ✅ Test scripts included

### Option 4: Manual Testing

**Best for:** Learning the API, troubleshooting, documentation

Follow the detailed guide in `MANUAL_TESTING_GUIDE.md`:

1. **Authentication Flow**
2. **User Profile Management**
3. **Admin Operations**
4. **Role Management**
5. **Security Testing**
6. **Error Handling**

### Option 5: Load Testing

**Best for:** Performance testing, scalability assessment

```bash
# Basic load test
./testing/load-test.sh

# Custom parameters
./testing/load-test.sh -c 20 -n 500

# Help
./testing/load-test.sh --help
```

**Features:**
- ✅ Concurrent request testing
- ✅ Response time analysis
- ✅ Performance metrics
- ✅ Configurable parameters

## 📊 Test Coverage

### Endpoints Tested

| Category | Endpoints | Auth Required | Admin Only |
|----------|-----------|---------------|------------|
| **Health** | `/health` | ❌ | ❌ |
| **Authentication** | `/api/v1/auth/*` | Varies | ❌ |
| **User Profile** | `/api/v1/users/profile` | ✅ | ❌ |
| **User Management** | `/api/v1/users` | ✅ | ✅ |
| **Role Management** | `/api/v1/roles` | ✅ | ✅ |

### Test Scenarios

#### ✅ Functional Tests
- [x] User registration
- [x] User login/logout  
- [x] Profile management
- [x] Password changes
- [x] Role creation/management
- [x] User role assignment
- [x] Admin operations

#### ✅ Security Tests
- [x] Unauthorized access blocking
- [x] Invalid token rejection
- [x] Admin endpoint protection
- [x] Input validation
- [x] SQL injection prevention
- [x] XSS protection

#### ✅ Error Handling
- [x] 400 Bad Request
- [x] 401 Unauthorized
- [x] 403 Forbidden
- [x] 404 Not Found
- [x] 500 Internal Server Error

#### ✅ Performance Tests
- [x] Response time measurement
- [x] Concurrent request handling
- [x] Load testing
- [x] Rate limiting

## 🔧 Configuration

### Environment Variables
```bash
# Service configuration
BASE_URL=http://localhost
NODE_ENV=development

# Test configuration
TEST_TIMEOUT=30000
TEST_CONCURRENT_REQUESTS=10
TEST_TOTAL_REQUESTS=100
```

### Default Test Data
```json
{
  "testUser": {
    "email": "testuser@example.com",
    "username": "testuser", 
    "password": "TestPass123!",
    "firstName": "Test",
    "lastName": "User"
  },
  "adminUser": {
    "email": "admin@customplatform.com",
    "password": "Admin123!@#"
  }
}
```

## 🐛 Troubleshooting

### Common Issues

#### Service Not Running
```bash
# Check if service is running
curl http://localhost/health

# Start service
npm run dev
# OR
docker-compose up
```

#### Database Not Seeded
```bash
# Seed database with default admin user
npm run seed
```

#### Permission Denied on Scripts
```bash
# Make scripts executable
chmod +x testing/*.sh
```

#### Tests Failing
```bash
# Check service logs
npm run dev
# OR
docker-compose logs

# Verify environment variables
cat .env

# Reset database
npm run seed
```

### Test Script Options

#### api-test.sh Options
```bash
# Basic usage
./testing/api-test.sh

# Modify base URL
BASE_URL=https://your-domain.com ./testing/api-test.sh
```

#### load-test.sh Options
```bash
# Custom concurrent requests and total requests
./testing/load-test.sh -c 20 -n 1000

# Different base URL
./testing/load-test.sh -u https://your-domain.com

# Help
./testing/load-test.sh --help
```

## 📈 CI/CD Integration

### GitHub Actions Example
```yaml
name: API Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm install
      - name: Start service
        run: npm run dev &
      - name: Wait for service
        run: sleep 10
      - name: Run API tests
        run: ./testing/api-test.sh
      - name: Run Jest tests
        run: npm test testing/api.test.js
```

### Docker Testing
```bash
# Test in Docker environment
docker-compose up -d
sleep 10
./testing/api-test.sh
docker-compose down
```

## 📝 Adding New Tests

### 1. Add to Shell Script
Edit `api-test.sh`:
```bash
test_new_feature() {
    print_header "NEW FEATURE TESTS"
    
    local response=$(curl -s -X POST "$BASE_URL/api/v1/new-endpoint" \
        -H "Authorization: Bearer $AUTH_TOKEN" \
        -H "$CONTENT_TYPE" \
        -d '{"data": "value"}')
    
    check_response "$response" "New feature test"
}
```

### 2. Add to Jest Tests
Edit `api.test.js`:
```javascript
describe('New Feature', () => {
  test('should handle new functionality', async () => {
    const response = await request(app)
      .post('/api/v1/new-endpoint')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ data: 'value' })
      .expect(200);

    expect(response.body.success).toBe(true);
  });
});
```

### 3. Add to Postman Collection
1. Add new request to appropriate folder
2. Set up test scripts in "Tests" tab
3. Export updated collection

### 4. Update Manual Guide
Add new section to `MANUAL_TESTING_GUIDE.md` with:
- Endpoint details
- Request examples  
- Expected responses
- Error scenarios

## 🎯 Best Practices

### Test Organization
- ✅ Group related tests together
- ✅ Use descriptive test names
- ✅ Test both success and failure cases
- ✅ Include edge cases
- ✅ Test security scenarios

### Test Data Management
- ✅ Use consistent test data
- ✅ Clean up after tests
- ✅ Avoid hard-coded values
- ✅ Use environment variables
- ✅ Generate unique data when needed

### Error Testing
- ✅ Test all error codes
- ✅ Verify error messages
- ✅ Check response format
- ✅ Test malformed requests
- ✅ Test boundary conditions

### Performance Testing
- ✅ Test with realistic data volumes
- ✅ Measure response times
- ✅ Test concurrent access
- ✅ Monitor resource usage
- ✅ Test rate limiting

---

**Happy Testing! 🚀**

For questions or issues, check the main project documentation or create an issue in the repository.
