# Docker Configuration for User Management Service

This directory contains Docker-related configuration files for the User Management Service.

## Files Overview

### `nginx.conf`
Production-ready nginx configuration with:
- ✅ SSL/HTTPS enforcement
- ✅ Rate limiting for security
- ✅ Security headers
- ✅ Gzip compression
- ✅ Load balancing ready
- ✅ Error handling
- ✅ Health checks

### `nginx-dev.conf`
Development nginx configuration with:
- ✅ HTTP only (no SSL required)
- ✅ Relaxed rate limiting
- ✅ Simplified setup
- ✅ Easy debugging

### `generate-ssl.sh`
Script to generate self-signed SSL certificates for development.

## Quick Start

### Development (HTTP only)
```bash
# Use development nginx config
docker-compose up
```

### Production (HTTPS with SSL)
```bash
# 1. Generate SSL certificates
chmod +x docker/generate-ssl.sh
./docker/generate-ssl.sh

# 2. Update docker-compose.yml to use production nginx config
# Change: ./docker/nginx-dev.conf:/etc/nginx/nginx.conf:ro
# To:     ./docker/nginx.conf:/etc/nginx/nginx.conf:ro

# 3. Start services
docker-compose up -d
```

## Configuration Details

### Rate Limiting
- **Authentication endpoints**: 5 requests/minute
- **API endpoints**: 30 requests/minute  
- **General endpoints**: 100 requests/minute

### Security Features
- HTTPS redirect (production)
- Security headers (HSTS, XSS protection, etc.)
- Request size limits (10MB)
- Connection limits (20 per IP)

### Load Balancing
The configuration supports multiple backend servers. To add more:

```nginx
upstream user_management_backend {
    least_conn;
    server user-management:3001;
    server user-management-2:3001;  # Add more servers
    server user-management-3:3001;
}
```

## SSL Certificates

### Development
Use the provided script to generate self-signed certificates:
```bash
./docker/generate-ssl.sh
```

### Production
Replace the generated certificates with real ones from a trusted CA:
```bash
# Place your certificates in the ssl/ directory
cp your-domain.crt ssl/server.crt
cp your-domain.key ssl/server.key
```

## Environment-Specific Configs

### Switch to Development Config
```yaml
# In docker-compose.yml
volumes:
  - ./docker/nginx-dev.conf:/etc/nginx/nginx.conf:ro
```

### Switch to Production Config
```yaml
# In docker-compose.yml
volumes:
  - ./docker/nginx.conf:/etc/nginx/nginx.conf:ro
  - ./ssl:/etc/nginx/ssl:ro
```

## Monitoring

### Health Checks
- HTTP: `http://localhost/health`
- HTTPS: `https://localhost/health`

### Logs
```bash
# View nginx logs
docker-compose logs nginx

# Follow nginx logs
docker-compose logs -f nginx
```

## Troubleshooting

### SSL Certificate Issues
```bash
# Check certificate validity
openssl x509 -in ssl/server.crt -text -noout

# Regenerate certificates
rm -rf ssl/
./docker/generate-ssl.sh
```

### Rate Limiting Issues
If you're hitting rate limits during development, use the dev config or increase limits in nginx.conf:

```nginx
limit_req_zone $binary_remote_addr zone=api:10m rate=100r/m;  # Increase rate
```

### Connection Issues
```bash
# Check if backend is accessible
docker-compose exec nginx wget -qO- http://user-management:3001/health

# Check nginx config syntax
docker-compose exec nginx nginx -t
```
