#!/bin/bash

# Create SSL certificates for development
# This script generates self-signed certificates for local development

SSL_DIR="./ssl"
CERT_FILE="$SSL_DIR/server.crt"
KEY_FILE="$SSL_DIR/server.key"

# Create SSL directory if it doesn't exist
mkdir -p "$SSL_DIR"

# Check if certificates already exist
if [ -f "$CERT_FILE" ] && [ -f "$KEY_FILE" ]; then
    echo "SSL certificates already exist. Skipping generation."
    echo "Certificate: $CERT_FILE"
    echo "Private Key: $KEY_FILE"
    exit 0
fi

# Generate private key
echo "Generating private key..."
openssl genrsa -out "$KEY_FILE" 2048

# Generate certificate signing request
echo "Generating certificate signing request..."
openssl req -new -key "$KEY_FILE" -out "$SSL_DIR/server.csr" -subj "/C=US/ST=CA/L=San Francisco/O=Custom Build Platform/OU=User Management/CN=localhost"

# Generate self-signed certificate
echo "Generating self-signed certificate..."
openssl x509 -req -days 365 -in "$SSL_DIR/server.csr" -signkey "$KEY_FILE" -out "$CERT_FILE"

# Clean up CSR file
rm "$SSL_DIR/server.csr"

# Set appropriate permissions
chmod 600 "$KEY_FILE"
chmod 644 "$CERT_FILE"

echo "SSL certificates generated successfully!"
echo "Certificate: $CERT_FILE"
echo "Private Key: $KEY_FILE"
echo ""
echo "⚠️  Note: These are self-signed certificates for development only."
echo "   Your browser will show a security warning. This is expected."
echo "   For production, use certificates from a trusted CA."
