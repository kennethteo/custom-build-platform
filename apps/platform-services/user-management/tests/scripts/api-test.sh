#!/bin/bash

# User Management Service API Test Scripts
# This script provides curl commands to test al    # Login with user
    echo "🔑 Logging in user..."
    local login_response=$(curl -s -X POST "$BASE_URL/api/v1/auth/login" \
        -H "$CONTENT_TYPE" \
        -d '{
            "emailOrUsername": "testuser2@example.com",
            "password": "TestPass123!"
        }')dpoints

# Configuration
BASE_URL="http://localhost:3001"
CONTENT_TYPE="Content-Type: application/json"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Variables to store tokens and IDs
AUTH_TOKEN=""
ADMIN_TOKEN=""
USER_ID=""
ROLE_ID=""

# Function to print colored output
print_header() {
    echo -e "${BLUE}===========================================${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}===========================================${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# Function to check response and extract data
check_response() {
    local response="$1"
    local description="$2"
    
    echo "Response: $response"
    
    if echo "$response" | grep -q '"success":true' || echo "$response" | grep -q '"status":"OK"'; then
        print_success "$description"
        return 0
    else
        print_error "$description"
        return 1
    fi
}

# Function to extract token from response
extract_token() {
    local response="$1"
    echo "$response" | grep -o '"token":"[^"]*"' | cut -d'"' -f4
}

# Function to extract ID from response
extract_id() {
    local response="$1"
    local field="$2"
    echo "$response" | grep -o "\"$field\":\"[^\"]*\"" | cut -d'"' -f4
}

# 1. Health Check
test_health_check() {
    print_header "HEALTH CHECK"
    
    local response=$(curl -s "$BASE_URL/health")
    check_response "$response" "Health check"
    echo ""
}

# 2. Authentication Tests
test_authentication() {
    print_header "AUTHENTICATION TESTS"
    
    # Register new user
    echo "📝 Registering new user..."
    local register_response=$(curl -s -X POST "$BASE_URL/api/v1/auth/register" \
        -H "$CONTENT_TYPE" \
        -d '{
            "email": "testuser2@example.com",
            "username": "testuser2",
            "password": "TestPass123!",
            "firstName": "Test",
            "lastName": "User2"
        }')
    
    if check_response "$register_response" "User registration"; then
        AUTH_TOKEN=$(extract_token "$register_response")
        USER_ID=$(extract_id "$register_response" "id")
        echo "Auth Token: $AUTH_TOKEN"
        echo "User ID: $USER_ID"
    fi
    echo ""
    
    # Login regular user
    echo "🔑 Logging in user..."
    local login_response=$(curl -s -X POST "$BASE_URL/api/v1/auth/login" \
        -H "$CONTENT_TYPE" \
        -d '{
            "emailOrUsername": "testuser2@example.com",
            "password": "TestPass123!"
        }')
    
    if check_response "$login_response" "User login"; then
        AUTH_TOKEN=$(extract_token "$login_response")
        echo "Updated Auth Token: $AUTH_TOKEN"
    fi
    echo ""
    
    # Login admin user
    echo "👑 Logging in admin..."
    local admin_login_response=$(curl -s -X POST "$BASE_URL/api/v1/auth/login" \
        -H "$CONTENT_TYPE" \
        -d '{
            "emailOrUsername": "admin@customplatform.com",
            "password": "Admin123!@#"
        }')
    
    if check_response "$admin_login_response" "Admin login"; then
        ADMIN_TOKEN=$(extract_token "$admin_login_response")
        echo "Admin Token: $ADMIN_TOKEN"
    fi
    echo ""
}

# 3. User Profile Tests
test_user_profile() {
    print_header "USER PROFILE TESTS"
    
    if [ -z "$AUTH_TOKEN" ]; then
        print_error "No auth token available. Run authentication tests first."
        return 1
    fi
    
    # Get own profile
    echo "👤 Getting user profile..."
    local profile_response=$(curl -s -X GET "$BASE_URL/api/v1/users/profile" \
        -H "Authorization: Bearer $AUTH_TOKEN")
    
    check_response "$profile_response" "Get user profile"
    echo ""
    
    # Update profile
    echo "✏️  Updating user profile..."
    local update_response=$(curl -s -X PUT "$BASE_URL/api/v1/users/profile" \
        -H "Authorization: Bearer $AUTH_TOKEN" \
        -H "$CONTENT_TYPE" \
        -d '{
            "firstName": "Updated",
            "lastName": "User",
            "phone": "+1234567890",
            "profile": {
                "bio": "Updated bio via API test",
                "timezone": "America/New_York",
                "preferences": {
                    "theme": "dark",
                    "notifications": {
                        "email": true,
                        "push": false
                    }
                }
            }
        }')
    
    check_response "$update_response" "Update user profile"
    echo ""
}

# 4. Admin User Management Tests
test_admin_user_management() {
    print_header "ADMIN USER MANAGEMENT TESTS"
    
    if [ -z "$ADMIN_TOKEN" ]; then
        print_error "No admin token available. Run authentication tests first."
        return 1
    fi
    
    # Get all users
    echo "📋 Getting all users..."
    local users_response=$(curl -s -X GET "$BASE_URL/api/v1/users?page=1&limit=10" \
        -H "Authorization: Bearer $ADMIN_TOKEN")
    
    check_response "$users_response" "Get all users"
    echo ""
    
    # Get specific user
    if [ -n "$USER_ID" ]; then
        echo "🔍 Getting user by ID..."
        local user_response=$(curl -s -X GET "$BASE_URL/api/v1/users/$USER_ID" \
            -H "Authorization: Bearer $ADMIN_TOKEN")
        
        check_response "$user_response" "Get user by ID"
        echo ""
    fi
    
    # Activate user
    if [ -n "$USER_ID" ]; then
        echo "✅ Activating user..."
        local activate_response=$(curl -s -X PATCH "$BASE_URL/api/v1/users/$USER_ID/activate" \
            -H "Authorization: Bearer $ADMIN_TOKEN")
        
        check_response "$activate_response" "Activate user"
        echo ""
    fi
}

# 5. Role Management Tests
test_role_management() {
    print_header "ROLE MANAGEMENT TESTS"
    
    if [ -z "$ADMIN_TOKEN" ]; then
        print_error "No admin token available. Run authentication tests first."
        return 1
    fi
    
    # Get all roles
    echo "📋 Getting all roles..."
    local roles_response=$(curl -s -X GET "$BASE_URL/api/v1/roles" \
        -H "Authorization: Bearer $ADMIN_TOKEN")
    
    if check_response "$roles_response" "Get all roles"; then
        # Extract first role ID for testing
        ROLE_ID=$(echo "$roles_response" | grep -o '"_id":"[^"]*"' | head -1 | cut -d'"' -f4)
        echo "Role ID for testing: $ROLE_ID"
    fi
    echo ""
    
    # Create new role
    echo "➕ Creating new role..."
    local create_role_response=$(curl -s -X POST "$BASE_URL/api/v1/roles" \
        -H "Authorization: Bearer $ADMIN_TOKEN" \
        -H "$CONTENT_TYPE" \
        -d '{
            "name": "test-role-'$(date +%s)'",
            "description": "Test role created by API test script",
            "permissions": []
        }')
    
    if check_response "$create_role_response" "Create role"; then
        NEW_ROLE_ID=$(extract_id "$create_role_response" "_id")
        echo "New Role ID: $NEW_ROLE_ID"
        
        # Update the role
        echo "✏️  Updating role..."
        local update_role_response=$(curl -s -X PUT "$BASE_URL/api/v1/roles/$NEW_ROLE_ID" \
            -H "Authorization: Bearer $ADMIN_TOKEN" \
            -H "$CONTENT_TYPE" \
            -d '{
                "name": "updated-test-role-'$(date +%s)'",
                "description": "Updated test role description"
            }')
        
        check_response "$update_role_response" "Update role"
        echo ""
        
        # Assign role to user
        if [ -n "$USER_ID" ]; then
            echo "🔗 Assigning role to user..."
            local assign_response=$(curl -s -X POST "$BASE_URL/api/v1/users/$USER_ID/roles" \
                -H "Authorization: Bearer $ADMIN_TOKEN" \
                -H "$CONTENT_TYPE" \
                -d "{\"roleId\": \"$NEW_ROLE_ID\"}")
            
            check_response "$assign_response" "Assign role to user"
            echo ""
            
            # Remove role from user
            echo "🔗 Removing role from user..."
            local remove_response=$(curl -s -X DELETE "$BASE_URL/api/v1/users/$USER_ID/roles" \
                -H "Authorization: Bearer $ADMIN_TOKEN" \
                -H "$CONTENT_TYPE" \
                -d "{\"roleId\": \"$NEW_ROLE_ID\"}")
            
            check_response "$remove_response" "Remove role from user"
            echo ""
        fi
        
        # Delete the test role
        echo "🗑️  Deleting test role..."
        local delete_response=$(curl -s -X DELETE "$BASE_URL/api/v1/roles/$NEW_ROLE_ID" \
            -H "Authorization: Bearer $ADMIN_TOKEN")
        
        check_response "$delete_response" "Delete role"
        echo ""
    fi
}

# 6. Security Tests
test_security() {
    print_header "SECURITY TESTS"
    
    # Test unauthorized access
    echo "🔒 Testing unauthorized access..."
    local unauthorized_response=$(curl -s -X GET "$BASE_URL/api/v1/users/profile")
    
    if echo "$unauthorized_response" | grep -q "401\|Unauthorized"; then
        print_success "Unauthorized access properly blocked"
    else
        print_error "Security issue: Unauthorized access not blocked"
    fi
    echo ""
    
    # Test invalid token
    echo "🔒 Testing invalid token..."
    local invalid_token_response=$(curl -s -X GET "$BASE_URL/api/v1/users/profile" \
        -H "Authorization: Bearer invalid-token")
    
    if echo "$invalid_token_response" | grep -q "401\|403\|Unauthorized\|Forbidden"; then
        print_success "Invalid token properly rejected"
    else
        print_error "Security issue: Invalid token not rejected"
    fi
    echo ""
    
    # Test admin endpoint with user token
    if [ -n "$AUTH_TOKEN" ]; then
        echo "🔒 Testing admin endpoint with user token..."
        local forbidden_response=$(curl -s -X GET "$BASE_URL/api/v1/users" \
            -H "Authorization: Bearer $AUTH_TOKEN")
        
        if echo "$forbidden_response" | grep -q "403\|Forbidden\|Insufficient"; then
            print_success "Admin endpoint properly protected"
        else
            print_error "Security issue: Admin endpoint not properly protected"
        fi
        echo ""
    fi
}

# 7. Logout and Cleanup
test_cleanup() {
    print_header "CLEANUP"
    
    # Logout user
    if [ -n "$AUTH_TOKEN" ]; then
        echo "👋 Logging out user..."
        local logout_response=$(curl -s -X POST "$BASE_URL/api/v1/auth/logout" \
            -H "Authorization: Bearer $AUTH_TOKEN")
        
        check_response "$logout_response" "User logout"
        echo ""
    fi
}

# Main execution
main() {
    echo -e "${YELLOW}🚀 Starting User Management Service API Tests${NC}"
    echo ""
    
    test_health_check
    test_authentication
    test_user_profile
    test_admin_user_management
    test_role_management
    test_security
    test_cleanup
    
    print_header "TEST SUMMARY"
    echo -e "${GREEN}✅ All API tests completed!${NC}"
    echo ""
    echo "Generated tokens for manual testing:"
    echo "Auth Token: $AUTH_TOKEN"
    echo "Admin Token: $ADMIN_TOKEN"
    echo "User ID: $USER_ID"
    echo "Role ID: $ROLE_ID"
}

# Run tests if script is executed directly
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi
