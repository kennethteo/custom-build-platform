# Go REST API Template

This is a starter template for building RESTful APIs in Go.

## Features
- Clean project structure
- RESTful routing using [Gin](https://github.com/gin-gonic/gin)
- Environment variable management with [godotenv](https://github.com/joho/godotenv)
- Configuration via `.env`
- Basic logging
- Example health check endpoint
- Dockerfile for containerization
- Makefile for common tasks
- API documentation with Swagger (OpenAPI)

## Getting Started

### Prerequisites
- Go 1.20+
- Docker (optional, for containerization)

### Setup
```bash
git clone <this-repo>
cd app-templates/go/rest-api
cp .env.example .env
go mod tidy
go run main.go
```

### API Endpoints
- `GET /health` - Health check

### Development
- Edit `.env` for configuration
- Add routes in `main.go` or split into modules

### Build & Run
```bash
go build -o rest-api
./rest-api
```

### Docker
```bash
docker build -t go-rest-api .
docker run --env-file .env -p 8080:8080 go-rest-api
```

### Lint & Test
```bash
make lint
make test
```

## Best Practices
- Use environment variables for secrets/config
- Write unit tests for handlers and services
- Document APIs with Swagger
- Use dependency injection for services
- Follow Go idioms and effective Go guidelines

## License
MIT
