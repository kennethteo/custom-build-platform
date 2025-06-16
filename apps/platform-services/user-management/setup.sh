#!/bin/bash

# Setup script for User Management Service
set -e

echo "🚀 Setting up User Management Service..."

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
echo "📋 Checking prerequisites..."

if ! command_exists docker; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

if ! command_exists docker-compose; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

echo "✅ Docker and Docker Compose are available"

# Choose environment
echo ""
echo "🔧 Choose your environment:"
echo "1) Development (HTTP only, easier setup)"
echo "2) Production (HTTPS with SSL certificates)"
read -p "Enter your choice (1 or 2): " choice

if [ "$choice" = "2" ]; then
    echo ""
    echo "🔐 Setting up production environment with SSL..."
    
    # Generate SSL certificates
    if [ ! -f "./ssl/server.crt" ] || [ ! -f "./ssl/server.key" ]; then
        echo "📜 Generating SSL certificates..."
        ./docker/generate-ssl.sh
    else
        echo "✅ SSL certificates already exist"
    fi
    
    # Update docker-compose to use production nginx config
    echo "⚙️  Updating docker-compose.yml for production..."
    sed -i.bak 's|./docker/nginx-dev.conf:/etc/nginx/nginx.conf:ro|./docker/nginx.conf:/etc/nginx/nginx.conf:ro|g' docker-compose.yml
    
    echo "✅ Production environment configured"
    echo "🌐 Your service will be available at:"
    echo "   - HTTP:  http://localhost (redirects to HTTPS)"
    echo "   - HTTPS: https://localhost"
    echo "   - Note: You'll see a security warning for self-signed certificates"
    
else
    echo ""
    echo "🔧 Setting up development environment..."
    
    # Ensure docker-compose uses dev config
    sed -i.bak 's|./docker/nginx.conf:/etc/nginx/nginx.conf:ro|./docker/nginx-dev.conf:/etc/nginx/nginx.conf:ro|g' docker-compose.yml
    
    echo "✅ Development environment configured"
    echo "🌐 Your service will be available at:"
    echo "   - HTTP: http://localhost"
fi

# Create necessary directories
echo ""
echo "📁 Creating necessary directories..."
mkdir -p logs ssl

# Copy environment file if it doesn't exist
if [ ! -f ".env" ]; then
    echo "⚙️  Creating environment file..."
    cp .env.example .env
    echo "✅ Created .env from .env.example"
    echo "📝 Please review and update .env with your configuration"
fi

echo ""
echo "🐳 Starting services..."
docker-compose up -d

echo ""
echo "⏳ Waiting for services to start..."
sleep 10

# Check if services are running
if docker-compose ps | grep -q "Up"; then
    echo "✅ Services started successfully!"
    echo ""
    echo "🎉 Setup complete!"
    echo ""
    echo "📊 Service Status:"
    docker-compose ps
    echo ""
    echo "🔍 Useful commands:"
    echo "  View logs:           docker-compose logs -f"
    echo "  Stop services:       docker-compose down"
    echo "  Restart services:    docker-compose restart"
    echo "  Check health:        curl http://localhost/health"
    echo ""
    
    if [ "$choice" = "2" ]; then
        echo "🔐 SSL Configuration:"
        echo "  - Certificates are in ./ssl/ directory"
        echo "  - For production, replace with real certificates from a trusted CA"
    fi
    
else
    echo "❌ Some services failed to start. Check logs:"
    docker-compose logs
    exit 1
fi
