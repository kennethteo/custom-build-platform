#!/bin/bash

# Load Testing Script for User Management Service
# This script performs basic load testing using curl

BASE_URL="http://localhost"
CONCURRENT_REQUESTS=10
TOTAL_REQUESTS=100

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

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

# Function to perform load test
run_load_test() {
    local endpoint="$1"
    local method="$2"
    local headers="$3"
    local data="$4"
    local description="$5"
    
    echo "Testing: $description"
    echo "Endpoint: $method $endpoint"
    echo "Concurrent requests: $CONCURRENT_REQUESTS"
    echo "Total requests: $TOTAL_REQUESTS"
    echo ""
    
    # Create temporary files for results
    local results_file="/tmp/load_test_results_$$.txt"
    local times_file="/tmp/load_test_times_$$.txt"
    
    # Run concurrent requests
    for ((i=1; i<=TOTAL_REQUESTS; i++)); do
        {
            if [ -n "$data" ]; then
                response_time=$(curl -s -o /dev/null -w "%{time_total}" \
                    -X "$method" \
                    $headers \
                    -d "$data" \
                    "$BASE_URL$endpoint" 2>/dev/null)
            else
                response_time=$(curl -s -o /dev/null -w "%{time_total}" \
                    -X "$method" \
                    $headers \
                    "$BASE_URL$endpoint" 2>/dev/null)
            fi
            
            echo "$response_time" >> "$times_file"
            echo "Request $i completed in ${response_time}s" >> "$results_file"
        } &
        
        # Limit concurrent processes
        if (( i % CONCURRENT_REQUESTS == 0 )); then
            wait
        fi
    done
    
    # Wait for remaining processes
    wait
    
    # Calculate statistics
    if [ -f "$times_file" ]; then
        local total_time=$(awk '{sum+=$1} END {print sum}' "$times_file")
        local avg_time=$(awk '{sum+=$1} END {print sum/NR}' "$times_file")
        local min_time=$(sort -n "$times_file" | head -1)
        local max_time=$(sort -n "$times_file" | tail -1)
        local requests_per_second=$(echo "scale=2; $TOTAL_REQUESTS / $total_time" | bc -l 2>/dev/null || echo "N/A")
        
        echo "Results:"
        echo "  Total requests: $TOTAL_REQUESTS"
        echo "  Total time: ${total_time}s"
        echo "  Average response time: ${avg_time}s"
        echo "  Min response time: ${min_time}s"
        echo "  Max response time: ${max_time}s"
        echo "  Requests per second: $requests_per_second"
        
        # Check if performance is acceptable
        if (( $(echo "$avg_time < 1.0" | bc -l 2>/dev/null || echo 0) )); then
            print_success "Performance is good (avg < 1s)"
        elif (( $(echo "$avg_time < 3.0" | bc -l 2>/dev/null || echo 0) )); then
            print_warning "Performance is acceptable (avg < 3s)"
        else
            print_error "Performance is poor (avg >= 3s)"
        fi
        
        # Cleanup
        rm -f "$times_file" "$results_file"
    else
        print_error "No timing data collected"
    fi
    
    echo ""
}

# Main load testing function
main() {
    print_header "LOAD TESTING USER MANAGEMENT SERVICE"
    
    # Check if bc is available for calculations
    if ! command -v bc &> /dev/null; then
        print_warning "bc not found. Install it for better statistics."
    fi
    
    # Test health endpoint
    print_header "TESTING HEALTH ENDPOINT"
    run_load_test "/health" "GET" "" "" "Health Check Load Test"
    
    # Get admin token first
    echo "Getting admin token for authenticated tests..."
    admin_response=$(curl -s -X POST "$BASE_URL/api/v1/auth/login" \
        -H "Content-Type: application/json" \
        -d '{
            "emailOrUsername": "admin@customplatform.com",
            "password": "Admin123!@#"
        }')
    
    admin_token=$(echo "$admin_response" | grep -o '"token":"[^"]*"' | cut -d'"' -f4)
    
    if [ -n "$admin_token" ]; then
        print_success "Admin token obtained"
        
        # Test authenticated endpoint
        print_header "TESTING AUTHENTICATED ENDPOINT"
        run_load_test "/api/v1/roles" "GET" "-H \"Authorization: Bearer $admin_token\"" "" "Get Roles Load Test"
        
        # Test user registration
        print_header "TESTING USER REGISTRATION"
        timestamp=$(date +%s)
        registration_data="{
            \"email\": \"loadtest${timestamp}@example.com\",
            \"username\": \"loadtest${timestamp}\",
            \"password\": \"LoadTest123!\",
            \"firstName\": \"Load\",
            \"lastName\": \"Test\"
        }"
        
        run_load_test "/api/v1/auth/register" "POST" "-H \"Content-Type: application/json\"" "$registration_data" "User Registration Load Test"
        
    else
        print_error "Could not obtain admin token. Skipping authenticated tests."
    fi
    
    print_header "LOAD TESTING SUMMARY"
    echo "Load testing completed!"
    echo ""
    echo "Performance Guidelines:"
    echo "- Good: Average response time < 1s"
    echo "- Acceptable: Average response time < 3s"
    echo "- Poor: Average response time >= 3s"
    echo ""
    echo "For production load testing, consider using:"
    echo "- Apache Bench (ab): ab -n 1000 -c 10 $BASE_URL/health"
    echo "- Artillery: artillery quick --count 10 --num 100 $BASE_URL/health"
    echo "- k6: k6 run load-test-script.js"
}

# Check dependencies
check_dependencies() {
    if ! command -v curl &> /dev/null; then
        print_error "curl is required but not installed."
        exit 1
    fi
    
    # Check if service is running
    if ! curl -s "$BASE_URL/health" > /dev/null; then
        print_error "Service is not running at $BASE_URL"
        exit 1
    fi
}

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -c|--concurrent)
            CONCURRENT_REQUESTS="$2"
            shift 2
            ;;
        -n|--requests)
            TOTAL_REQUESTS="$2"
            shift 2
            ;;
        -u|--url)
            BASE_URL="$2"
            shift 2
            ;;
        -h|--help)
            echo "Usage: $0 [OPTIONS]"
            echo "Options:"
            echo "  -c, --concurrent NUM   Number of concurrent requests (default: 10)"
            echo "  -n, --requests NUM     Total number of requests (default: 100)"
            echo "  -u, --url URL          Base URL (default: http://localhost)"
            echo "  -h, --help             Show this help message"
            exit 0
            ;;
        *)
            print_error "Unknown option: $1"
            exit 1
            ;;
    esac
done

# Run the load test
check_dependencies
main
