# Multi-Tenant SaaS Application (.NET Core)

A complete template for building a multi-tenant SaaS application using .NET Core with shared database and row-level security.

## 🏗️ Architecture Overview

This template implements a **Shared Database Multi-Tenancy** pattern with:

- **Tenant Resolution**: Subdomain and header-based tenant identification
- **Data Isolation**: Row-level security using global query filters
- **Authentication**: JWT tokens with tenant claims
- **Configuration**: Tenant-specific settings and feature flags
- **Monitoring**: Tenant-aware logging and metrics

```text
┌─────────────────────────────────────────────────────┐
│                Multi-Tenant SaaS                   │
├─────────────────────────────────────────────────────┤
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐    │
│  │  Tenant A   │ │  Tenant B   │ │  Tenant C   │    │
│  │   Domain    │ │   Domain    │ │   Domain    │    │
│  └─────────────┘ └─────────────┘ └─────────────┘    │
│           │               │               │         │
│           └───────────────┼───────────────┘         │
│                           │                         │
│           ┌───────────────▼───────────────┐         │
│           │      API Gateway/LB           │         │
│           └───────────────┬───────────────┘         │
│                           │                         │
│           ┌───────────────▼───────────────┐         │
│           │    .NET Core Web API          │         │
│           │  ┌─────────────────────────┐  │         │
│           │  │   Tenant Middleware     │  │         │
│           │  │   Context Service       │  │         │
│           │  └─────────────────────────┘  │         │
│           └───────────────┬───────────────┘         │
│                           │                         │
│           ┌───────────────▼───────────────┐         │
│           │     Shared Database           │         │
│           │ ┌─────────┬─────────────────┐ │         │
│           │ │Tenant A │Tenant B│Tenant C│ │         │
│           │ │  Data   │  Data  │  Data  │ │         │
│           │ └─────────┴─────────────────┘ │         │
│           └─────────────────────────────────┘         │
└─────────────────────────────────────────────────────┘
```

## 🚀 Features

### Core Multi-Tenancy

- ✅ Automatic tenant resolution from subdomain/header
- ✅ Row-level security with EF Core query filters
- ✅ Tenant-scoped data access and operations
- ✅ Tenant isolation validation and security

### Authentication & Authorization

- ✅ JWT authentication with tenant claims
- ✅ Role-based authorization per tenant
- ✅ Tenant-specific user management
- ✅ Cross-tenant access prevention

### Configuration & Customization

- ✅ Tenant-specific configuration settings
- ✅ Feature flags per tenant
- ✅ Tenant branding and theming support
- ✅ Custom domain mapping

### Monitoring & Operations

- ✅ Tenant-aware logging with Serilog
- ✅ Metrics collection per tenant
- ✅ Health checks and monitoring
- ✅ Error tracking and alerting

## 📁 Project Structure

```bash
MultiTenantSaaS/
├── src/
│   ├── MultiTenantSaaS.Api/
│   │   ├── Controllers/
│   │   │   ├── TenantsController.cs
│   │   │   ├── UsersController.cs
│   │   │   └── OrdersController.cs
│   │   ├── Middleware/
│   │   │   ├── TenantResolutionMiddleware.cs
│   │   │   └── TenantValidationMiddleware.cs
│   │   ├── Configuration/
│   │   │   └── TenantConfiguration.cs
│   │   └── Program.cs
│   │
│   ├── MultiTenantSaaS.Core/
│   │   ├── Entities/
│   │   │   ├── Tenant.cs
│   │   │   ├── User.cs
│   │   │   ├── Order.cs
│   │   │   └── Interfaces/
│   │   │       └── ITenantEntity.cs
│   │   ├── Services/
│   │   │   ├── ITenantService.cs
│   │   │   ├── TenantService.cs
│   │   │   └── TenantConfigurationService.cs
│   │   └── DTOs/
│   │       ├── TenantDto.cs
│   │       └── UserDto.cs
│   │
│   ├── MultiTenantSaaS.Infrastructure/
│   │   ├── Data/
│   │   │   ├── ApplicationDbContext.cs
│   │   │   ├── TenantDbContext.cs
│   │   │   └── Configurations/
│   │   ├── Repositories/
│   │   │   ├── TenantRepository.cs
│   │   │   └── UserRepository.cs
│   │   └── Services/
│   │       ├── AuthenticationService.cs
│   │       └── TenantCacheService.cs
│   │
│   └── MultiTenantSaaS.Shared/
│       ├── Constants/
│       ├── Extensions/
│       └── Attributes/
│           ├── TenantAuthorizeAttribute.cs
│           └── TenantScopeValidationAttribute.cs
│
├── tests/
│   ├── MultiTenantSaaS.Api.Tests/
│   ├── MultiTenantSaaS.Core.Tests/
│   └── MultiTenantSaaS.Integration.Tests/
│
├── docker/
│   ├── Dockerfile
│   ├── docker-compose.yml
│   └── docker-compose.override.yml
│
├── docs/
│   ├── api.md
│   ├── deployment.md
│   └── tenant-onboarding.md
│
└── scripts/
    ├── build.sh
    ├── deploy.sh
    └── seed-data.sql
```

## 🛠️ Getting Started

### Prerequisites

- .NET 8.0 SDK or later
- PostgreSQL 13+ or SQL Server 2019+
- Redis (for caching)
- Docker (optional)

### 1. Clone and Setup

```bash
# Clone the template
git clone <repository-url>
cd multi-tenant-saas

# Restore packages
dotnet restore

# Update connection strings in appsettings.json
# Configure your database and Redis connections
```

### 2. Database Setup

```bash
# Create and run migrations
dotnet ef migrations add InitialCreate --project src/MultiTenantSaaS.Infrastructure --startup-project src/MultiTenantSaaS.Api

dotnet ef database update --project src/MultiTenantSaaS.Infrastructure --startup-project src/MultiTenantSaaS.Api

# Seed initial data (optional)
dotnet run --project src/MultiTenantSaaS.Api -- --seed-data
```

### 3. Configuration

Update `appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Database=MultiTenantSaaS;Username=your_user;Password=your_password",
    "Redis": "localhost:6379"
  },
  "MultiTenant": {
    "DefaultStrategy": "Subdomain",
    "RequireTenant": true,
    "CacheTenantInfo": true,
    "CacheTimeout": "00:15:00"
  },
  "Jwt": {
    "Key": "your-super-secret-key-here-change-in-production",
    "Issuer": "MultiTenantSaaS",
    "Audience": "MultiTenantSaaS.Api",
    "ExpirationMinutes": 480
  }
}
```

### 4. Run the Application

```bash
# Development
dotnet run --project src/MultiTenantSaaS.Api

# Or with Docker
docker-compose up -d
```

The API will be available at:

- `https://localhost:5001` (main domain)
- `https://tenant1.localhost:5001` (tenant subdomain)

## 🔧 Configuration Options

### Tenant Resolution Strategies

```csharp
// In Program.cs
builder.Services.Configure<MultiTenantOptions>(options =>
{
    options.Strategy = TenantResolutionStrategy.Subdomain; // or Header, Path
    options.HeaderName = "X-Tenant-ID"; // for header strategy
    options.ClaimType = "tenant_id"; // for JWT claims
    options.CacheTimeout = TimeSpan.FromMinutes(15);
});
```

### Database Strategies

```csharp
// Shared Database with Row-Level Security (default)
services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(connectionString));

// Database per Tenant (alternative)
services.AddDbContext<ApplicationDbContext>((serviceProvider, options) =>
{
    var tenantService = serviceProvider.GetRequiredService<ITenantService>();
    var connectionString = GetTenantConnectionString(tenantService.GetCurrentTenant());
    options.UseNpgsql(connectionString);
});
```

## 📊 API Examples

### Tenant Management

```bash
# Get tenant information
GET /api/tenants/current
Headers: X-Tenant-ID: tenant1

# Create new tenant
POST /api/tenants
{
  "name": "Acme Corporation",
  "subdomain": "acme",
  "plan": "professional",
  "features": ["feature1", "feature2"]
}

# Update tenant settings
PUT /api/tenants/settings
{
  "theme": {
    "primaryColor": "#007bff",
    "logo": "https://example.com/logo.png"
  },
  "features": {
    "enableNotifications": true,
    "maxUsers": 100
  }
}
```

### User Management (Tenant-Scoped)

```bash
# Get users for current tenant
GET /api/users
Headers: 
  Authorization: Bearer <jwt-token>
  X-Tenant-ID: tenant1

# Create user in current tenant
POST /api/users
Headers: 
  Authorization: Bearer <jwt-token>
  X-Tenant-ID: tenant1
{
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "role": "User"
}
```

### Orders (Tenant-Scoped)

```bash
# Get orders for current tenant
GET /api/orders
Headers: 
  Authorization: Bearer <jwt-token>
  X-Tenant-ID: tenant1

# Create order in current tenant
POST /api/orders
Headers: 
  Authorization: Bearer <jwt-token>
  X-Tenant-ID: tenant1
{
  "customerEmail": "customer@example.com",
  "items": [
    {
      "productId": "prod-123",
      "quantity": 2,
      "price": 99.99
    }
  ]
}
```

## 🧪 Testing

### Unit Tests

```bash
# Run all tests
dotnet test

# Run specific test project
dotnet test tests/MultiTenantSaaS.Core.Tests/

# Run with coverage
dotnet test --collect:"XPlat Code Coverage"
```

### Integration Tests

```bash
# Run integration tests
dotnet test tests/MultiTenantSaaS.Integration.Tests/

# Test with different tenants
TENANT_ID=tenant1 dotnet test tests/MultiTenantSaaS.Integration.Tests/
TENANT_ID=tenant2 dotnet test tests/MultiTenantSaaS.Integration.Tests/
```

### Manual Testing

```bash
# Test tenant resolution
curl -H "X-Tenant-ID: tenant1" https://localhost:5001/api/tenants/current

# Test subdomain resolution
curl https://tenant1.localhost:5001/api/tenants/current

# Test cross-tenant isolation
curl -H "X-Tenant-ID: tenant1" -H "Authorization: Bearer <tenant2-token>" \
  https://localhost:5001/api/users
# Should return 403 Forbidden
```

## 🚀 Deployment

### Docker Deployment

```bash
# Build and push image
docker build -t myregistry/multitenant-saas:latest .
docker push myregistry/multitenant-saas:latest

# Deploy with Docker Compose
docker-compose -f docker-compose.prod.yml up -d
```

### Kubernetes Deployment

```bash
# Apply Kubernetes manifests
kubectl apply -f k8s/

# Or using Helm
helm install multitenant-saas ./helm-chart
```

### Azure App Service

```bash
# Deploy to Azure
az webapp create --resource-group myRG --plan myPlan --name myapp
az webapp deployment source config-zip --resource-group myRG --name myapp --src ./publish.zip
```

## 📈 Monitoring

### Application Insights

```csharp
// Configured automatically with tenant enrichment
builder.Services.AddApplicationInsightsTelemetry();
builder.Services.AddSingleton<ITelemetryInitializer, TenantTelemetryInitializer>();
```

### Serilog with Tenant Enrichment

```csharp
Log.Logger = new LoggerConfiguration()
    .Enrich.With<TenantLogEnricher>()
    .WriteTo.Console()
    .WriteTo.ApplicationInsights(TelemetryConverter.Traces)
    .CreateLogger();
```

### Health Checks

```bash
# Check application health
GET /health

# Check tenant-specific health
GET /health/tenant
Headers: X-Tenant-ID: tenant1
```

## 🔒 Security Considerations

### Data Isolation

- ✅ Global query filters prevent cross-tenant data access
- ✅ Repository pattern with tenant validation
- ✅ Integration tests verify isolation

### Authentication

- ✅ JWT tokens include tenant claims
- ✅ Tenant validation on each request
- ✅ Role-based authorization per tenant

### Input Validation

- ✅ Tenant-scoped resource validation
- ✅ Anti-forgery token protection
- ✅ Rate limiting per tenant

## 📚 Additional Resources

- [Multi-Tenant Design Guide](../MULTI_TENANT_DESIGN.md)
- [Architecture Decisions](./docs/architecture-decisions.md)
- [API Documentation](./docs/api.md)
- [Deployment Guide](./docs/deployment.md)
- [Tenant Onboarding](./docs/tenant-onboarding.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Ensure all tests pass
5. Submit a pull request

## 📄 License

This template is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

*This template provides a solid foundation for building scalable, secure multi-tenant SaaS applications with .NET Core.*
