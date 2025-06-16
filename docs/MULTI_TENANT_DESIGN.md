# Multi-Tenant Application Architecture Design

A comprehensive guide for designing and implementing multi-tenant applications that serve multiple customers (tenants) from a single application instance.

## Table of Contents

- [Multi-Tenancy Overview](#multi-tenancy-overview)
- [Tenancy Models](#tenancy-models)
- [Architecture Patterns](#architecture-patterns)
- [Implementation Strategies](#implementation-strategies)
- [Security Considerations](#security-considerations)
- [Deployment Patterns](#deployment-patterns)
- [Technology Stack Examples](#technology-stack-examples)
- [Best Practices](#best-practices)

---

## Multi-Tenancy Overview

Multi-tenancy is a software architecture pattern where a single instance of an application serves multiple tenants (customers), with each tenant's data and configuration isolated from others.

### Key Characteristics

- **Resource Sharing**: Single application instance serves multiple customers
- **Data Isolation**: Each tenant's data is logically or physically separated
- **Customization**: Tenants can have different configurations and branding
- **Cost Efficiency**: Shared infrastructure reduces per-tenant costs
- **Scalability**: Efficient resource utilization across tenants

### Benefits

- **Lower Infrastructure Costs**: Shared resources reduce operational overhead
- **Easier Maintenance**: Single codebase to maintain and update
- **Faster Time to Market**: New tenants can be onboarded quickly
- **Centralized Security**: Unified security policies and updates
- **Economies of Scale**: Cost advantages as tenant count grows

### Challenges

- **Complexity**: Managing tenant isolation and customization
- **Performance**: Ensuring one tenant doesn't impact others
- **Security**: Strict data isolation requirements
- **Compliance**: Meeting various tenant regulatory requirements
- **Scaling**: Handling varying tenant loads and growth patterns

---

## Tenancy Models

### 1. Single-Tenant (Dedicated)

```text
┌─────────────────────────────────────────────────────┐
│                   Tenant A                         │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐    │
│  │     App     │ │     API     │ │  Database   │    │
│  │  Instance   │ │  Instance   │ │  Instance   │    │
│  └─────────────┘ └─────────────┘ └─────────────┘    │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│                   Tenant B                         │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐    │
│  │     App     │ │     API     │ │  Database   │    │
│  │  Instance   │ │  Instance   │ │  Instance   │    │
│  └─────────────┘ └─────────────┘ └─────────────┘    │
└─────────────────────────────────────────────────────┘
```

**Use Cases**: High-security requirements, regulatory compliance, large enterprise clients

**Pros**:

- Complete data isolation
- Full customization capability
- Independent scaling
- No noisy neighbor issues

**Cons**:

- Higher infrastructure costs
- More complex deployment
- Resource inefficiency
- Maintenance overhead

### 2. Multi-Tenant Shared Database

```text
┌─────────────────────────────────────────────────────┐
│                Shared Application                   │
│  ┌─────────────┐ ┌─────────────┐                    │
│  │  Tenant A   │ │  Tenant B   │                    │
│  │    UI       │ │    UI       │                    │
│  └─────────────┘ └─────────────┘                    │
│                       │                             │
│           ┌───────────┴───────────┐                 │
│           │    Shared API Layer   │                 │
│           └───────────┬───────────┘                 │
│                       │                             │
│           ┌───────────▼───────────┐                 │
│           │   Shared Database     │                 │
│           │ ┌─────────┬─────────┐ │                 │
│           │ │Tenant A │Tenant B │ │                 │
│           │ │  Data   │  Data   │ │                 │
│           │ └─────────┴─────────┘ │                 │
│           └─────────────────────────┘                 │
└─────────────────────────────────────────────────────┘
```

**Use Cases**: SaaS applications, cost-sensitive scenarios, moderate security requirements

**Pros**:

- Cost-effective
- Easy maintenance
- Efficient resource usage
- Quick tenant onboarding

**Cons**:

- Potential data leakage risks
- Limited customization
- Shared performance impact
- Complex backup/restore

### 3. Multi-Tenant Separate Databases

```text
┌─────────────────────────────────────────────────────┐
│                Shared Application                   │
│  ┌─────────────┐ ┌─────────────┐                    │
│  │  Tenant A   │ │  Tenant B   │                    │
│  │    UI       │ │    UI       │                    │
│  └─────────────┘ └─────────────┘                    │
│                       │                             │
│           ┌───────────┴───────────┐                 │
│           │    Shared API Layer   │                 │
│           └───────────┬───────────┘                 │
│                       │                             │
│   ┌───────────────────┼───────────────────┐         │
│   │                   │                   │         │
│   ▼                   ▼                   ▼         │
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐     │
│ │  Tenant A   │ │  Tenant B   │ │  Tenant C   │     │
│ │  Database   │ │  Database   │ │  Database   │     │
│ └─────────────┘ └─────────────┘ └─────────────┘     │
└─────────────────────────────────────────────────────┘
```

**Use Cases**: Balance between cost and isolation, regulated industries

**Pros**:

- Strong data isolation
- Independent backup/restore
- Tenant-specific performance
- Compliance-friendly

**Cons**:

- Higher infrastructure costs
- Connection pool management
- Complex monitoring
- Schema migration complexity

### 4. Hybrid Multi-Tenant

```text
┌─────────────────────────────────────────────────────┐
│                Shared Application                   │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐    │
│  │  Tenant A   │ │  Tenant B   │ │  Tenant C   │    │
│  │    UI       │ │    UI       │ │    UI       │    │
│  └─────────────┘ └─────────────┘ └─────────────┘    │
│           │               │               │         │
│           │    ┌──────────┴──────────┐    │         │
│           │    │   Shared Services   │    │         │
│           │    └──────────┬──────────┘    │         │
│           │               │               │         │
│     ┌─────▼─────┐   ┌─────▼─────┐   ┌─────▼─────┐   │
│     │  Small    │   │  Shared   │   │   Large   │   │
│     │  Tenants  │   │ Database  │   │  Tenant   │   │
│     │ Database  │   │           │   │ Dedicated │   │
│     └───────────┘   └───────────┘   └───────────┘   │
└─────────────────────────────────────────────────────┘
```

**Use Cases**: Mixed tenant sizes, freemium models, enterprise + SMB customers

**Pros**:

- Flexible isolation levels
- Cost optimization
- Scalable architecture
- Accommodates different needs

**Cons**:

- Complex implementation
- Multiple data strategies
- Operational complexity
- Harder to standardize

---

## Architecture Patterns

### 1. Tenant Context Resolution

```text
┌─────────────────────────────────────────────────────┐
│                  Request Flow                       │
└─────────────────────────────────────────────────────┘
                           │
           ┌───────────────▼───────────────┐
           │      Load Balancer/CDN        │
           └───────────────┬───────────────┘
                           │
           ┌───────────────▼───────────────┐
           │     Tenant Resolution         │
           │   (Subdomain/Header/Path)     │
           └───────────────┬───────────────┘
                           │
           ┌───────────────▼───────────────┐
           │    Application Instance       │
           │  ┌─────────────────────────┐  │
           │  │   Tenant Context        │  │
           │  │   Service/Middleware    │  │
           │  └─────────────────────────┘  │
           └───────────────┬───────────────┘
                           │
           ┌───────────────▼───────────────┐
           │    Business Logic Layer       │
           └───────────────┬───────────────┘
                           │
           ┌───────────────▼───────────────┐
           │      Data Access Layer        │
           │   (Tenant-aware Queries)      │
           └─────────────────────────────────┘
```

#### Tenant Identification Strategies

1. Subdomain-based

```text
tenant1.myapp.com
tenant2.myapp.com
enterprise.myapp.com
```

1. Header-based

```text
X-Tenant-ID: tenant1
Authorization: Bearer {tenant-specific-token}
```

1. Path-based

```text
myapp.com/tenant1/dashboard
myapp.com/tenant2/api/users
```

1. Database-driven

```text
User login → Tenant lookup → Context setting
```

### 2. Data Isolation Patterns

#### Row-Level Security (RLS)

```sql
-- PostgreSQL Example
CREATE POLICY tenant_isolation ON users
    USING (tenant_id = current_setting('app.current_tenant'));

-- Application sets tenant context
SET app.current_tenant = 'tenant1';
SELECT * FROM users; -- Only returns tenant1 users
```

#### Query Filters

```csharp
// Entity Framework Example
public class ApplicationDbContext : DbContext
{
    private readonly ITenantService _tenantService;
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>()
            .HasQueryFilter(u => u.TenantId == _tenantService.GetCurrentTenant());
    }
}
```

#### Schema Separation

```sql
-- Separate schemas per tenant
CREATE SCHEMA tenant1;
CREATE SCHEMA tenant2;

-- Dynamic schema selection
SET search_path TO tenant1, public;
SELECT * FROM users; -- Uses tenant1.users
```

### 3. Configuration Management

```text
┌─────────────────────────────────────────────────────┐
│              Configuration Hierarchy                │
├─────────────────────────────────────────────────────┤
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐    │
│  │   Global    │ │   Tenant    │ │    User     │    │
│  │   Config    │ │   Config    │ │   Config    │    │
│  │             │ │             │ │             │    │
│  │ • Features  │ │ • Branding  │ │ • Prefs     │    │
│  │ • Limits    │ │ • Themes    │ │ • Settings  │    │
│  │ • Security  │ │ • Modules   │ │ • Language  │    │
│  └─────────────┘ └─────────────┘ └─────────────┘    │
│         │               │               │           │
│         └───────────────┼───────────────┘           │
│                         │                           │
│              ┌──────────▼──────────┐                │
│              │   Merged Config     │                │
│              │   (Runtime)         │                │
│              └─────────────────────┘                │
└─────────────────────────────────────────────────────┘
```

---

## Implementation Strategies

### 1. .NET Core Multi-Tenant Implementation

#### Tenant Service

```csharp
public interface ITenantService
{
    string GetCurrentTenant();
    Task<TenantInfo> GetTenantInfoAsync(string tenantId);
    void SetTenant(string tenantId);
}

public class TenantService : ITenantService
{
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly ITenantRepository _tenantRepository;
    private string _currentTenant;

    public TenantService(
        IHttpContextAccessor httpContextAccessor,
        ITenantRepository tenantRepository)
    {
        _httpContextAccessor = httpContextAccessor;
        _tenantRepository = tenantRepository;
    }

    public string GetCurrentTenant()
    {
        if (!string.IsNullOrEmpty(_currentTenant))
            return _currentTenant;

        // Try header first
        if (_httpContextAccessor.HttpContext?.Request.Headers
            .TryGetValue("X-Tenant-ID", out var tenantHeader) == true)
        {
            return tenantHeader.FirstOrDefault();
        }

        // Try subdomain
        var host = _httpContextAccessor.HttpContext?.Request.Host.Host;
        if (!string.IsNullOrEmpty(host))
        {
            var parts = host.Split('.');
            if (parts.Length > 2)
            {
                return parts[0]; // subdomain as tenant
            }
        }

        throw new InvalidOperationException("Tenant not found");
    }

    public async Task<TenantInfo> GetTenantInfoAsync(string tenantId)
    {
        return await _tenantRepository.GetByIdAsync(tenantId);
    }

    public void SetTenant(string tenantId)
    {
        _currentTenant = tenantId;
    }
}
```

#### Multi-Tenant DbContext

```csharp
public class MultiTenantDbContext : DbContext
{
    private readonly ITenantService _tenantService;

    public MultiTenantDbContext(
        DbContextOptions<MultiTenantDbContext> options,
        ITenantService tenantService) : base(options)
    {
        _tenantService = tenantService;
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<Tenant> Tenants { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Global query filters for multi-tenancy
        modelBuilder.Entity<User>()
            .HasQueryFilter(u => u.TenantId == _tenantService.GetCurrentTenant());
        
        modelBuilder.Entity<Order>()
            .HasQueryFilter(o => o.TenantId == _tenantService.GetCurrentTenant());

        // Tenant entity doesn't need filter
        base.OnModelCreating(modelBuilder);
    }

    public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        var currentTenant = _tenantService.GetCurrentTenant();
        
        foreach (var entry in ChangeTracker.Entries<ITenantEntity>())
        {
            if (entry.State == EntityState.Added)
            {
                entry.Entity.TenantId = currentTenant;
            }
        }

        return await base.SaveChangesAsync(cancellationToken);
    }
}

public interface ITenantEntity
{
    string TenantId { get; set; }
}

public class User : ITenantEntity
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string TenantId { get; set; }
}
```

#### Tenant Resolution Middleware

```csharp
public class TenantResolutionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<TenantResolutionMiddleware> _logger;

    public TenantResolutionMiddleware(
        RequestDelegate next,
        ILogger<TenantResolutionMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(
        HttpContext context,
        ITenantService tenantService,
        ITenantRepository tenantRepository)
    {
        try
        {
            var tenantId = ResolveTenantId(context);
            
            if (!string.IsNullOrEmpty(tenantId))
            {
                // Validate tenant exists and is active
                var tenant = await tenantRepository.GetByIdAsync(tenantId);
                if (tenant?.IsActive == true)
                {
                    tenantService.SetTenant(tenantId);
                    context.Items["TenantId"] = tenantId;
                    context.Items["TenantInfo"] = tenant;
                }
                else
                {
                    _logger.LogWarning("Invalid or inactive tenant: {TenantId}", tenantId);
                    context.Response.StatusCode = 404;
                    await context.Response.WriteAsync("Tenant not found");
                    return;
                }
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error resolving tenant");
            context.Response.StatusCode = 500;
            await context.Response.WriteAsync("Internal server error");
            return;
        }

        await _next(context);
    }

    private string ResolveTenantId(HttpContext context)
    {
        // Priority: Header > Subdomain > Path
        
        // 1. Check header
        if (context.Request.Headers.TryGetValue("X-Tenant-ID", out var headerValue))
        {
            return headerValue.FirstOrDefault();
        }

        // 2. Check subdomain
        var host = context.Request.Host.Host;
        var parts = host.Split('.');
        if (parts.Length > 2 && parts[0] != "www")
        {
            return parts[0];
        }

        // 3. Check path
        var path = context.Request.Path.Value;
        if (!string.IsNullOrEmpty(path))
        {
            var segments = path.Split('/', StringSplitOptions.RemoveEmptyEntries);
            if (segments.Length > 1 && segments[0] == "tenant")
            {
                return segments[1];
            }
        }

        return null;
    }
}
```

### 2. Node.js Multi-Tenant Implementation

#### Tenant Middleware

```javascript
// tenantMiddleware.js
const tenantRepository = require('../repositories/tenantRepository');

const resolveTenant = async (req, res, next) => {
    try {
        let tenantId = null;

        // Check header
        tenantId = req.headers['x-tenant-id'];
        
        // Check subdomain
        if (!tenantId) {
            const host = req.get('host');
            const subdomain = host.split('.')[0];
            if (subdomain && subdomain !== 'www') {
                tenantId = subdomain;
            }
        }

        // Check path
        if (!tenantId) {
            const pathSegments = req.path.split('/');
            if (pathSegments[1] === 'tenant' && pathSegments[2]) {
                tenantId = pathSegments[2];
            }
        }

        if (!tenantId) {
            return res.status(400).json({ error: 'Tenant not specified' });
        }

        // Validate tenant
        const tenant = await tenantRepository.findById(tenantId);
        if (!tenant || !tenant.isActive) {
            return res.status(404).json({ error: 'Tenant not found' });
        }

        // Set tenant context
        req.tenant = tenant;
        req.tenantId = tenantId;
        
        next();
    } catch (error) {
        console.error('Tenant resolution error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { resolveTenant };
```

#### Database Connection Manager

```javascript
// dbManager.js
const { Pool } = require('pg');
const config = require('../config');

class DatabaseManager {
    constructor() {
        this.pools = new Map();
        this.sharedPool = new Pool(config.database.shared);
    }

    // Get tenant-specific connection
    async getTenantConnection(tenantId) {
        const tenantConfig = await this.getTenantDbConfig(tenantId);
        
        if (tenantConfig.isolationLevel === 'dedicated') {
            return this.getDedicatedConnection(tenantId, tenantConfig);
        } else {
            return this.getSharedConnection(tenantId);
        }
    }

    getDedicatedConnection(tenantId, config) {
        if (!this.pools.has(tenantId)) {
            const pool = new Pool({
                host: config.host,
                database: config.database,
                user: config.user,
                password: config.password,
                port: config.port,
                max: 10,
                idleTimeoutMillis: 30000,
            });
            this.pools.set(tenantId, pool);
        }
        return this.pools.get(tenantId);
    }

    getSharedConnection(tenantId) {
        // Return shared pool with tenant context
        return {
            ...this.sharedPool,
            tenantId: tenantId
        };
    }

    async getTenantDbConfig(tenantId) {
        // Fetch tenant database configuration
        const client = await this.sharedPool.connect();
        try {
            const result = await client.query(
                'SELECT * FROM tenant_configs WHERE tenant_id = $1',
                [tenantId]
            );
            return result.rows[0];
        } finally {
            client.release();
        }
    }
}

module.exports = new DatabaseManager();
```

#### Tenant-Aware Query Builder

```javascript
// queryBuilder.js
class TenantQueryBuilder {
    constructor(tenantId) {
        this.tenantId = tenantId;
        this.baseQuery = '';
        this.params = [];
    }

    select(table, columns = '*') {
        this.baseQuery = `SELECT ${columns} FROM ${table}`;
        this.addTenantFilter();
        return this;
    }

    insert(table, data) {
        data.tenant_id = this.tenantId;
        const columns = Object.keys(data).join(', ');
        const placeholders = Object.keys(data).map((_, i) => `$${i + 1}`).join(', ');
        this.params = Object.values(data);
        this.baseQuery = `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`;
        return this;
    }

    update(table, data, conditions = {}) {
        data.updated_at = new Date();
        const setClause = Object.keys(data).map((key, i) => `${key} = $${i + 1}`).join(', ');
        this.params = Object.values(data);
        this.baseQuery = `UPDATE ${table} SET ${setClause}`;
        
        // Add tenant filter to conditions
        conditions.tenant_id = this.tenantId;
        this.addConditions(conditions);
        return this;
    }

    delete(table, conditions = {}) {
        this.baseQuery = `DELETE FROM ${table}`;
        conditions.tenant_id = this.tenantId;
        this.addConditions(conditions);
        return this;
    }

    addTenantFilter() {
        if (this.baseQuery.includes('WHERE')) {
            this.baseQuery += ` AND tenant_id = $${this.params.length + 1}`;
        } else {
            this.baseQuery += ` WHERE tenant_id = $${this.params.length + 1}`;
        }
        this.params.push(this.tenantId);
    }

    addConditions(conditions) {
        const conditionKeys = Object.keys(conditions);
        if (conditionKeys.length === 0) return;

        const conditionClauses = conditionKeys.map((key, i) => {
            const paramIndex = this.params.length + i + 1;
            return `${key} = $${paramIndex}`;
        });

        if (this.baseQuery.includes('WHERE')) {
            this.baseQuery += ` AND ${conditionClauses.join(' AND ')}`;
        } else {
            this.baseQuery += ` WHERE ${conditionClauses.join(' AND ')}`;
        }

        this.params.push(...Object.values(conditions));
    }

    build() {
        return {
            text: this.baseQuery,
            values: this.params
        };
    }
}

// Usage
const createTenantQuery = (tenantId) => new TenantQueryBuilder(tenantId);

module.exports = { createTenantQuery };
```

### 3. React Multi-Tenant Frontend

#### Tenant Context Provider

```jsx
// TenantContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { tenantService } from '../services/tenantService';

const TenantContext = createContext();

export const useTenant = () => {
    const context = useContext(TenantContext);
    if (!context) {
        throw new Error('useTenant must be used within a TenantProvider');
    }
    return context;
};

export const TenantProvider = ({ children }) => {
    const [tenant, setTenant] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const initializeTenant = async () => {
            try {
                setLoading(true);
                const tenantInfo = await tenantService.getCurrentTenant();
                setTenant(tenantInfo);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        initializeTenant();
    }, []);

    const updateTenant = async (tenantId) => {
        try {
            setLoading(true);
            const tenantInfo = await tenantService.switchTenant(tenantId);
            setTenant(tenantInfo);
            // Update URL or storage as needed
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const value = {
        tenant,
        loading,
        error,
        updateTenant,
        isFeatureEnabled: (feature) => tenant?.features?.includes(feature),
        getTheme: () => tenant?.theme || 'default',
        getBranding: () => tenant?.branding || {}
    };

    if (loading) return <div>Loading tenant information...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <TenantContext.Provider value={value}>
            {children}
        </TenantContext.Provider>
    );
};
```

#### Tenant-Aware HTTP Client

```javascript
// apiClient.js
import axios from 'axios';

class ApiClient {
    constructor() {
        this.client = axios.create({
            baseURL: process.env.REACT_APP_API_URL,
            timeout: 10000,
        });

        this.setupInterceptors();
    }

    setupInterceptors() {
        // Request interceptor to add tenant header
        this.client.interceptors.request.use(
            (config) => {
                const tenantId = this.getCurrentTenantId();
                if (tenantId) {
                    config.headers['X-Tenant-ID'] = tenantId;
                }
                
                const token = localStorage.getItem('authToken');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                
                return config;
            },
            (error) => Promise.reject(error)
        );

        // Response interceptor for error handling
        this.client.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response?.status === 404 && 
                    error.response?.data?.error === 'Tenant not found') {
                    // Redirect to tenant selection or error page
                    window.location.href = '/tenant-not-found';
                }
                return Promise.reject(error);
            }
        );
    }

    getCurrentTenantId() {
        // Extract tenant from subdomain
        const host = window.location.hostname;
        const subdomain = host.split('.')[0];
        if (subdomain && subdomain !== 'www' && subdomain !== 'localhost') {
            return subdomain;
        }

        // Or get from path
        const pathSegments = window.location.pathname.split('/');
        if (pathSegments[1] === 'tenant' && pathSegments[2]) {
            return pathSegments[2];
        }

        // Or get from storage
        return localStorage.getItem('tenantId');
    }

    async get(url, config = {}) {
        const response = await this.client.get(url, config);
        return response.data;
    }

    async post(url, data, config = {}) {
        const response = await this.client.post(url, data, config);
        return response.data;
    }

    async put(url, data, config = {}) {
        const response = await this.client.put(url, data, config);
        return response.data;
    }

    async delete(url, config = {}) {
        const response = await this.client.delete(url, config);
        return response.data;
    }
}

export const apiClient = new ApiClient();
```

#### Dynamic Theming Component

```jsx
// DynamicTheme.js
import React, { useEffect } from 'react';
import { useTenant } from '../context/TenantContext';

const DynamicTheme = ({ children }) => {
    const { tenant } = useTenant();

    useEffect(() => {
        if (tenant?.theme) {
            applyTheme(tenant.theme);
        }
    }, [tenant]);

    const applyTheme = (theme) => {
        const root = document.documentElement;
        
        // Apply CSS custom properties
        if (theme.colors) {
            Object.entries(theme.colors).forEach(([key, value]) => {
                root.style.setProperty(`--color-${key}`, value);
            });
        }

        if (theme.fonts) {
            Object.entries(theme.fonts).forEach(([key, value]) => {
                root.style.setProperty(`--font-${key}`, value);
            });
        }

        // Apply logo
        if (theme.logo) {
            const logoElements = document.querySelectorAll('.tenant-logo');
            logoElements.forEach(el => {
                el.src = theme.logo;
            });
        }

        // Apply custom CSS
        if (theme.customCss) {
            let styleEl = document.getElementById('tenant-custom-styles');
            if (!styleEl) {
                styleEl = document.createElement('style');
                styleEl.id = 'tenant-custom-styles';
                document.head.appendChild(styleEl);
            }
            styleEl.textContent = theme.customCss;
        }
    };

    return <>{children}</>;
};

export default DynamicTheme;
```

---

## Security Considerations

### 1. Data Isolation

#### Database Level Security

```sql
-- Row Level Security (PostgreSQL)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation ON users
    USING (tenant_id = current_setting('app.current_tenant')::text);

-- Grant access only to tenant-specific data
GRANT SELECT, INSERT, UPDATE, DELETE ON users TO app_user;
```

#### Application Level Security

```csharp
// Attribute-based authorization
[TenantAuthorize]
public class UsersController : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetUsers()
    {
        // Automatically filtered by tenant
        var users = await _userService.GetUsersAsync();
        return Ok(users);
    }
}

public class TenantAuthorizeAttribute : Attribute, IAuthorizationFilter
{
    public void OnAuthorization(AuthorizationFilterContext context)
    {
        var tenantService = context.HttpContext.RequestServices
            .GetRequiredService<ITenantService>();
            
        var currentTenant = tenantService.GetCurrentTenant();
        if (string.IsNullOrEmpty(currentTenant))
        {
            context.Result = new UnauthorizedResult();
        }
    }
}
```

### 2. Authentication & Authorization

#### JWT with Tenant Claims

```csharp
public class TenantJwtService
{
    public string GenerateToken(User user, string tenantId)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_secretKey);
        
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim("tenant_id", tenantId),
                new Claim("tenant_roles", string.Join(",", user.GetTenantRoles(tenantId)))
            }),
            Expires = DateTime.UtcNow.AddHours(8),
            SigningCredentials = new SigningCredentials(
                new SymmetricSecurityKey(key),
                SecurityAlgorithms.HmacSha256Signature)
        };
        
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }
}
```

### 3. Input Validation

```csharp
public class TenantScopeValidationAttribute : ValidationAttribute
{
    protected override ValidationResult IsValid(object value, ValidationContext validationContext)
    {
        var tenantService = validationContext.GetRequiredService<ITenantService>();
        var currentTenant = tenantService.GetCurrentTenant();
        
        // Validate that the resource belongs to current tenant
        if (value is ITenantScoped scopedValue)
        {
            if (scopedValue.TenantId != currentTenant)
            {
                return new ValidationResult("Resource does not belong to current tenant");
            }
        }
        
        return ValidationResult.Success;
    }
}
```

---

## Deployment Patterns

### 1. Container-Based Multi-Tenancy

```yaml
# docker-compose.yml
version: '3.8'
services:
  app:
    image: myapp:latest
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/shared_db
      - REDIS_URL=redis://redis:6379
      - TENANT_MODE=shared
    depends_on:
      - db
      - redis
    ports:
      - "3000:3000"
    
  db:
    image: postgres:13
    environment:
      POSTGRES_DB: shared_db
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
    volumes:
      - postgres_data:/var/lib/postgresql/data
    
  redis:
    image: redis:6-alpine
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
```

### 2. Kubernetes Multi-Tenant Deployment

```yaml
# tenant-namespace.yaml
apiVersion: v1
kind: Namespace
metadata:
  name: tenant-system
  labels:
    name: tenant-system

---
# configmap for tenant configuration
apiVersion: v1
kind: ConfigMap
metadata:
  name: tenant-config
  namespace: tenant-system
data:
  tenants.json: |
    {
      "tenants": [
        {
          "id": "tenant1",
          "name": "Tenant One",
          "database": "shared",
          "features": ["feature1", "feature2"]
        },
        {
          "id": "tenant2", 
          "name": "Tenant Two",
          "database": "dedicated",
          "features": ["feature1", "feature3"]
        }
      ]
    }

---
# deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: multitenant-app
  namespace: tenant-system
spec:
  replicas: 3
  selector:
    matchLabels:
      app: multitenant-app
  template:
    metadata:
      labels:
        app: multitenant-app
    spec:
      containers:
      - name: app
        image: myapp:latest
        ports:
        - containerPort: 3000
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: db-secret
              key: connection-string
        - name: TENANT_CONFIG_PATH
          value: "/config/tenants.json"
        volumeMounts:
        - name: tenant-config-volume
          mountPath: /config
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
      volumes:
      - name: tenant-config-volume
        configMap:
          name: tenant-config

---
# service
apiVersion: v1
kind: Service
metadata:
  name: multitenant-service
  namespace: tenant-system
spec:
  selector:
    app: multitenant-app
  ports:
  - port: 80
    targetPort: 3000
  type: LoadBalancer

---
# ingress for subdomain routing
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: tenant-ingress
  namespace: tenant-system
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  rules:
  - host: "*.myapp.com"
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: multitenant-service
            port:
              number: 80
```

---

## Technology Stack Examples

### 1. .NET Core Stack

```json
{
  "architecture": "Multi-tenant SaaS",
  "technologies": {
    "backend": {
      "framework": "ASP.NET Core 6+",
      "orm": "Entity Framework Core",
      "authentication": "JWT + Identity",
      "caching": "Redis",
      "messaging": "Azure Service Bus"
    },
    "frontend": {
      "framework": "React 18 + TypeScript",
      "state": "Redux Toolkit",
      "styling": "Styled Components",
      "build": "Vite"
    },
    "database": {
      "primary": "PostgreSQL",
      "tenant_strategy": "Shared DB with RLS",
      "migrations": "EF Core Migrations"
    },
    "infrastructure": {
      "hosting": "Azure App Service",
      "cdn": "Azure CDN",
      "monitoring": "Application Insights",
      "secrets": "Azure Key Vault"
    }
  }
}
```

### 2. Node.js Stack

```json
{
  "architecture": "Multi-tenant SaaS",
  "technologies": {
    "backend": {
      "framework": "Express.js",
      "orm": "Prisma",
      "authentication": "PassportJS + JWT",
      "validation": "Joi",
      "caching": "Redis"
    },
    "frontend": {
      "framework": "Next.js 13+",
      "styling": "Tailwind CSS",
      "state": "Zustand",
      "api": "tRPC"
    },
    "database": {
      "primary": "PostgreSQL",
      "tenant_strategy": "Database per tenant",
      "migrations": "Prisma Migrate"
    },
    "infrastructure": {
      "hosting": "Vercel + Railway",
      "monitoring": "DataDog",
      "errors": "Sentry",
      "cdn": "Cloudflare"
    }
  }
}
```

### 3. Java Spring Boot Stack

```json
{
  "architecture": "Multi-tenant Enterprise",
  "technologies": {
    "backend": {
      "framework": "Spring Boot 3+",
      "data": "Spring Data JPA",
      "security": "Spring Security + OAuth2",
      "messaging": "Apache Kafka",
      "caching": "Redis + Caffeine"
    },
    "frontend": {
      "framework": "Angular 16+",
      "styling": "Angular Material",
      "state": "NgRx",
      "build": "Angular CLI"
    },
    "database": {
      "primary": "PostgreSQL",
      "tenant_strategy": "Schema per tenant",
      "migrations": "Flyway"
    },
    "infrastructure": {
      "hosting": "AWS ECS",
      "api_gateway": "AWS API Gateway",
      "monitoring": "CloudWatch + X-Ray",
      "secrets": "AWS Secrets Manager"
    }
  }
}
```

---

## Best Practices

### 1. Development Best Practices

#### Tenant-First Development

```csharp
// Always include tenant context in services
public interface IUserService
{
    Task<User> GetUserAsync(int userId); // Automatically scoped to tenant
    Task<IEnumerable<User>> GetUsersAsync(); // Tenant-filtered
    Task<User> CreateUserAsync(CreateUserRequest request);
}

// Repository pattern with tenant awareness
public class UserRepository : IUserRepository
{
    private readonly ITenantService _tenantService;
    private readonly DbContext _context;

    public async Task<User> GetByIdAsync(int id)
    {
        return await _context.Users
            .Where(u => u.TenantId == _tenantService.GetCurrentTenant())
            .FirstOrDefaultAsync(u => u.Id == id);
    }
}
```

#### Configuration Management

```yaml
# appsettings.json
{
  "MultiTenant": {
    "Strategy": "SharedDatabase", // SharedDatabase, DatabasePerTenant, Hybrid
    "TenantResolution": {
      "Strategy": "Subdomain", // Subdomain, Header, Path
      "CacheTimeout": "00:15:00"
    },
    "Database": {
      "ConnectionStringTemplate": "Server=localhost;Database=App_{TenantId};...",
      "SharedConnectionString": "Server=localhost;Database=AppShared;...",
      "MaxPoolSize": 100
    },
    "Features": {
      "EnableTenantCustomization": true,
      "EnableDynamicTheming": true,
      "EnableTenantIsolatedStorage": true
    }
  }
}
```

### 2. Performance Optimization

#### Connection Pooling

```csharp
public class TenantConnectionPool
{
    private readonly ConcurrentDictionary<string, IDbConnectionFactory> _pools;
    private readonly IConfiguration _configuration;

    public IDbConnection GetConnection(string tenantId)
    {
        var factory = _pools.GetOrAdd(tenantId, CreateConnectionFactory);
        return factory.CreateConnection();
    }

    private IDbConnectionFactory CreateConnectionFactory(string tenantId)
    {
        var connectionString = BuildConnectionString(tenantId);
        return new NpgsqlConnectionFactory(connectionString);
    }
}
```

#### Caching Strategy

```csharp
public class TenantAwareCacheService
{
    private readonly IMemoryCache _cache;
    private readonly ITenantService _tenantService;

    public T Get<T>(string key)
    {
        var tenantKey = $"{_tenantService.GetCurrentTenant()}:{key}";
        return _cache.Get<T>(tenantKey);
    }

    public void Set<T>(string key, T value, TimeSpan? expiry = null)
    {
        var tenantKey = $"{_tenantService.GetCurrentTenant()}:{key}";
        _cache.Set(tenantKey, value, expiry ?? TimeSpan.FromMinutes(15));
    }
}
```

### 3. Monitoring and Observability

#### Tenant-Aware Logging

```csharp
public class TenantLogEnricher : ILogEventEnricher
{
    public void Enrich(LogEvent logEvent, ILogEventPropertyFactory propertyFactory)
    {
        var tenantService = // Get from DI container
        var tenantId = tenantService?.GetCurrentTenant();
        
        if (!string.IsNullOrEmpty(tenantId))
        {
            logEvent.AddPropertyIfAbsent(
                propertyFactory.CreateProperty("TenantId", tenantId));
        }
    }
}

// Usage in Startup
Log.Logger = new LoggerConfiguration()
    .Enrich.With<TenantLogEnricher>()
    .WriteTo.Console()
    .CreateLogger();
```

#### Metrics Collection

```csharp
public class TenantMetrics
{
    private readonly Counter _requestsCounter;
    private readonly Histogram _responseTimeHistogram;
    
    public TenantMetrics()
    {
        _requestsCounter = Metrics
            .CreateCounter("tenant_requests_total", "Total tenant requests", "tenant_id");
        _responseTimeHistogram = Metrics
            .CreateHistogram("tenant_request_duration_seconds", "Request duration", "tenant_id");
    }

    public void RecordRequest(string tenantId, double duration)
    {
        _requestsCounter.WithLabels(tenantId).Inc();
        _responseTimeHistogram.WithLabels(tenantId).Observe(duration);
    }
}
```

### 4. Testing Strategies

#### Multi-Tenant Integration Tests

```csharp
[TestClass]
public class MultiTenantIntegrationTests
{
    private WebApplicationFactory<Program> _factory;
    private HttpClient _client;

    [TestInitialize]
    public void Setup()
    {
        _factory = new WebApplicationFactory<Program>()
            .WithWebHostBuilder(builder =>
            {
                builder.ConfigureServices(services =>
                {
                    services.AddSingleton<ITenantService, TestTenantService>();
                });
            });
        _client = _factory.CreateClient();
    }

    [TestMethod]
    public async Task GetUsers_WithTenantA_ReturnsOnlyTenantAUsers()
    {
        // Arrange
        _client.DefaultRequestHeaders.Add("X-Tenant-ID", "tenant-a");

        // Act
        var response = await _client.GetAsync("/api/users");
        var users = await response.Content.ReadFromJsonAsync<List<User>>();

        // Assert
        Assert.IsTrue(users.All(u => u.TenantId == "tenant-a"));
    }

    [TestMethod]
    public async Task CreateUser_WithoutTenant_ReturnsBadRequest()
    {
        // Act
        var response = await _client.PostAsJsonAsync("/api/users", new CreateUserRequest());

        // Assert
        Assert.AreEqual(HttpStatusCode.BadRequest, response.StatusCode);
    }
}
```

### 5. Security Best Practices

#### Tenant Isolation Validation

```csharp
public class TenantSecurityMiddleware
{
    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        // Validate tenant access for authenticated users
        if (context.User.Identity.IsAuthenticated)
        {
            var userTenants = GetUserTenants(context.User);
            var requestedTenant = GetRequestedTenant(context);
            
            if (!userTenants.Contains(requestedTenant))
            {
                context.Response.StatusCode = 403;
                await context.Response.WriteAsync("Access denied");
                return;
            }
        }

        await next(context);
    }
}
```

#### Data Encryption

```csharp
public class TenantDataEncryption
{
    public string Encrypt(string data, string tenantId)
    {
        var key = GetTenantEncryptionKey(tenantId);
        // Encrypt data with tenant-specific key
        return EncryptionHelper.Encrypt(data, key);
    }

    private string GetTenantEncryptionKey(string tenantId)
    {
        // Generate or retrieve tenant-specific encryption key
        return $"{_masterKey}:{tenantId}".ToSHA256();
    }
}
```

---

## Conclusion

Multi-tenant architecture requires careful planning and implementation to balance cost efficiency, security, and scalability. Key considerations include:

1. **Choose the right tenancy model** based on isolation requirements and scale
2. **Implement robust tenant resolution** and context management
3. **Ensure strong data isolation** at all application layers
4. **Plan for tenant-specific customization** and branding needs
5. **Monitor tenant-specific metrics** and performance
6. **Test thoroughly** with multiple tenant scenarios
7. **Implement comprehensive security** measures and validation

The examples and patterns provided in this guide can be adapted to your specific requirements and technology stack. Start with a simple approach and evolve the architecture as your multi-tenant application grows in complexity and scale.

---

*This design guide provides a foundation for building scalable, secure, and maintainable multi-tenant applications.*
