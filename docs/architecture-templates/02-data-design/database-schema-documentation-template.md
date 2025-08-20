# 📚 Database Schema Documentation Template

**Version**: 1.0  
**Author**: [Your Name]  
**Date**: [Insert Date]  
**Project Name**: [Insert Project Name]  
**Document ID**: DSD-[Project Code]-[Version]

---

## 🔖 Table of Contents

1. [Introduction](#1-introduction)  
    1.1 [Purpose](#11-purpose)  
    1.2 [Scope](#12-scope)  
    1.3 [Conventions](#13-conventions)  
2. [Database Overview](#2-database-overview)  
    2.1 [Architecture Overview](#21-architecture-overview)  
    2.2 [Database Environment](#22-database-environment)  
    2.3 [Naming Conventions](#23-naming-conventions)  
3. [Schema Structure](#3-schema-structure)  
    3.1 [Schema Organization](#31-schema-organization)  
    3.2 [Table Groups](#32-table-groups)  
    3.3 [Security Schema](#33-security-schema)  
4. [Table Specifications](#4-table-specifications)  
    4.1 [Core Tables](#41-core-tables)  
    4.2 [Reference Tables](#42-reference-tables)  
    4.3 [Audit Tables](#43-audit-tables)  
5. [Indexes and Performance](#5-indexes-and-performance)  
    5.1 [Primary Indexes](#51-primary-indexes)  
    5.2 [Secondary Indexes](#52-secondary-indexes)  
    5.3 [Performance Considerations](#53-performance-considerations)  
6. [Constraints and Rules](#6-constraints-and-rules)  
    6.1 [Primary Key Constraints](#61-primary-key-constraints)  
    6.2 [Foreign Key Constraints](#62-foreign-key-constraints)  
    6.3 [Check Constraints](#63-check-constraints)  
    6.4 [Unique Constraints](#64-unique-constraints)  
7. [Views and Stored Procedures](#7-views-and-stored-procedures)  
    7.1 [Business Views](#71-business-views)  
    7.2 [Security Views](#72-security-views)  
    7.3 [Stored Procedures](#73-stored-procedures)  
8. [Data Migration and Versioning](#8-data-migration-and-versioning)  
9. [Security and Access Control](#9-security-and-access-control)  
10. [Backup and Recovery](#10-backup-and-recovery)  
11. [Appendix](#11-appendix)  

---

## 1. Introduction

### 1.1 Purpose

This document provides comprehensive documentation of the database schema for the [Project Name] system. It serves as a reference for database administrators, developers, and anyone who needs to understand the database structure and design decisions.

**Target Audience:**
- Database Administrators (DBAs)
- Backend Developers
- Data Engineers
- System Architects
- DevOps Engineers
- Quality Assurance Engineers

### 1.2 Scope

This documentation covers:
- Complete database schema structure
- Table definitions with all columns and constraints
- Index specifications and rationale
- Stored procedures and views
- Security and access control mechanisms
- Data migration strategies
- Performance optimization guidelines

**Out of Scope:**
- Application-level business logic
- User interface specifications
- Network configuration
- Hardware specifications

### 1.3 Conventions

**Naming Conventions:**
- **Tables**: PascalCase (e.g., `CustomerOrder`)
- **Columns**: camelCase (e.g., `firstName`)
- **Indexes**: `IX_TableName_ColumnName`
- **Foreign Keys**: `FK_ChildTable_ParentTable`
- **Check Constraints**: `CK_TableName_ColumnName`
- **Primary Keys**: `PK_TableName`

**Data Type Conventions:**
- **IDs**: `INT IDENTITY(1,1)` for auto-incrementing primary keys
- **Names**: `NVARCHAR(100)` for user-defined names
- **Descriptions**: `NVARCHAR(MAX)` for long text
- **Dates**: `DATETIME2` for timestamp precision
- **Money**: `DECIMAL(10,2)` for currency values
- **Flags**: `BIT` for boolean values

---

## 2. Database Overview

### 2.1 Architecture Overview

**Database Type**: [SQL Server / PostgreSQL / MySQL / Oracle]  
**Version**: [Specific version, e.g., SQL Server 2019]  
**Collation**: [e.g., SQL_Latin1_General_CP1_CI_AS]  
**Character Set**: [e.g., UTF-8]

**Architecture Pattern**: [Single Database / Multi-tenant / Sharded / Federated]

**Key Characteristics:**
- **ACID Compliance**: Full transactional integrity
- **Normalization Level**: 3rd Normal Form with selective denormalization
- **Scalability**: Horizontal scaling through read replicas
- **High Availability**: Always On Availability Groups

### 2.2 Database Environment

**Development Environment:**
- **Server**: [development-db-server.company.com]
- **Database Name**: [ProjectName_Dev]
- **Connection String**: [Development connection details]

**Staging Environment:**
- **Server**: [staging-db-server.company.com]
- **Database Name**: [ProjectName_Stage]
- **Connection String**: [Staging connection details]

**Production Environment:**
- **Server**: [production-db-server.company.com]
- **Database Name**: [ProjectName_Prod]
- **Connection String**: [Production connection details]

### 2.3 Naming Conventions

**Table Naming:**
- Use descriptive, business-meaningful names
- Singular form (e.g., `Customer` not `Customers`)
- No prefixes or suffixes unless necessary for clarity
- Avoid abbreviations unless widely understood

**Column Naming:**
- Use descriptive names that clearly indicate content
- Include units in name if applicable (e.g., `weightInKg`)
- Use consistent patterns across similar columns
- Primary keys: `[TableName]Id`
- Foreign keys: `[ReferencedTableName]Id`

---

## 3. Schema Structure

### 3.1 Schema Organization

**Core Schema** (`dbo`):
- Primary business entities and transactions
- Main application tables
- Core business logic

**Reference Schema** (`ref`):
- Lookup tables and reference data
- Static data that rarely changes
- Configuration and settings

**Audit Schema** (`audit`):
- Audit trail tables
- Historical data tracking
- Compliance and governance

**Security Schema** (`security`):
- User management
- Role and permission definitions
- Authentication and authorization

### 3.2 Table Groups

#### Business Entity Tables
Core business objects that represent the main entities of the system.

| Table Name | Description | Record Count (Est.) |
|------------|-------------|-------------------|
| Customer | Customer information and profiles | 100,000 |
| Product | Product catalog and specifications | 10,000 |
| Order | Customer orders and transactions | 500,000 |
| OrderItem | Individual items within orders | 2,000,000 |

#### Reference Data Tables
Lookup tables and static reference data.

| Table Name | Description | Record Count (Est.) |
|------------|-------------|-------------------|
| Category | Product categories | 100 |
| Country | Countries and regions | 250 |
| OrderStatus | Order status types | 10 |
| PaymentMethod | Available payment methods | 15 |

#### System Tables
System configuration and operational data.

| Table Name | Description | Record Count (Est.) |
|------------|-------------|-------------------|
| SystemConfig | Application configuration settings | 50 |
| ErrorLog | System error tracking | 100,000 |
| AuditTrail | Data change audit trail | 1,000,000 |

### 3.3 Security Schema

**User Management:**
- `Users`: System user accounts
- `Roles`: Role definitions and permissions
- `UserRoles`: User-to-role assignments

**Access Control:**
- `Permissions`: Available system permissions
- `RolePermissions`: Role-to-permission mappings
- `ResourceAccess`: Resource-level access control

---

## 4. Table Specifications

### 4.1 Core Tables

#### 4.1.1 Customer Table

**Purpose**: Stores customer information and profile data.

**Table Definition:**
```sql
CREATE TABLE [dbo].[Customer] (
    [CustomerId]        INT IDENTITY(1,1)   NOT NULL,
    [FirstName]         NVARCHAR(50)        NOT NULL,
    [LastName]          NVARCHAR(50)        NOT NULL,
    [Email]             NVARCHAR(100)       NOT NULL,
    [PhoneNumber]       NVARCHAR(20)        NULL,
    [DateOfBirth]       DATE                NULL,
    [Gender]            CHAR(1)             NULL,
    [AddressLine1]      NVARCHAR(100)       NULL,
    [AddressLine2]      NVARCHAR(100)       NULL,
    [City]              NVARCHAR(50)        NULL,
    [StateProvince]     NVARCHAR(50)        NULL,
    [PostalCode]        NVARCHAR(20)        NULL,
    [CountryId]         INT                 NULL,
    [IsActive]          BIT                 NOT NULL DEFAULT 1,
    [IsEmailVerified]   BIT                 NOT NULL DEFAULT 0,
    [CreatedDate]       DATETIME2           NOT NULL DEFAULT GETUTCDATE(),
    [ModifiedDate]      DATETIME2           NOT NULL DEFAULT GETUTCDATE(),
    [CreatedBy]         INT                 NOT NULL,
    [ModifiedBy]        INT                 NOT NULL,
    
    CONSTRAINT [PK_Customer] PRIMARY KEY CLUSTERED ([CustomerId]),
    CONSTRAINT [FK_Customer_Country] FOREIGN KEY ([CountryId]) 
        REFERENCES [ref].[Country] ([CountryId]),
    CONSTRAINT [FK_Customer_CreatedBy] FOREIGN KEY ([CreatedBy]) 
        REFERENCES [security].[User] ([UserId]),
    CONSTRAINT [FK_Customer_ModifiedBy] FOREIGN KEY ([ModifiedBy]) 
        REFERENCES [security].[User] ([UserId]),
    CONSTRAINT [CK_Customer_Gender] CHECK ([Gender] IN ('M', 'F', 'O')),
    CONSTRAINT [CK_Customer_Email] CHECK ([Email] LIKE '%@%.%')
);
```

**Column Specifications:**

| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| CustomerId | INT IDENTITY(1,1) | PK, NOT NULL | Unique customer identifier |
| FirstName | NVARCHAR(50) | NOT NULL | Customer's first name |
| LastName | NVARCHAR(50) | NOT NULL | Customer's last name |
| Email | NVARCHAR(100) | NOT NULL, UNIQUE | Customer's email address |
| PhoneNumber | NVARCHAR(20) | NULL | Customer's phone number |
| DateOfBirth | DATE | NULL | Customer's date of birth |
| Gender | CHAR(1) | NULL, CHECK | Gender: M/F/O |
| AddressLine1 | NVARCHAR(100) | NULL | Primary address line |
| AddressLine2 | NVARCHAR(100) | NULL | Secondary address line |
| City | NVARCHAR(50) | NULL | City name |
| StateProvince | NVARCHAR(50) | NULL | State or province |
| PostalCode | NVARCHAR(20) | NULL | Postal/ZIP code |
| CountryId | INT | NULL, FK | Reference to Country table |
| IsActive | BIT | NOT NULL, DEFAULT 1 | Account status flag |
| IsEmailVerified | BIT | NOT NULL, DEFAULT 0 | Email verification status |
| CreatedDate | DATETIME2 | NOT NULL, DEFAULT | Record creation timestamp |
| ModifiedDate | DATETIME2 | NOT NULL, DEFAULT | Last modification timestamp |
| CreatedBy | INT | NOT NULL, FK | User who created record |
| ModifiedBy | INT | NOT NULL, FK | User who last modified record |

**Business Rules:**
- Email must be unique across all customers
- Phone number format should be validated at application level
- Customers cannot be physically deleted (soft delete via IsActive flag)
- Email verification required for account activation
- Audit trail maintained through CreatedBy/ModifiedBy

**Indexes:**
```sql
-- Unique index on email
CREATE UNIQUE NONCLUSTERED INDEX [IX_Customer_Email] 
ON [dbo].[Customer] ([Email]) WHERE [IsActive] = 1;

-- Index for active customers
CREATE NONCLUSTERED INDEX [IX_Customer_IsActive] 
ON [dbo].[Customer] ([IsActive]) INCLUDE ([FirstName], [LastName], [Email]);

-- Index for name searches
CREATE NONCLUSTERED INDEX [IX_Customer_Names] 
ON [dbo].[Customer] ([LastName], [FirstName]) WHERE [IsActive] = 1;
```

#### 4.1.2 Product Table

**Purpose**: Stores product catalog information and specifications.

**Table Definition:**
```sql
CREATE TABLE [dbo].[Product] (
    [ProductId]         INT IDENTITY(1,1)   NOT NULL,
    [ProductName]       NVARCHAR(100)       NOT NULL,
    [ProductCode]       NVARCHAR(50)        NOT NULL,
    [Description]       NVARCHAR(MAX)       NULL,
    [ShortDescription]  NVARCHAR(500)       NULL,
    [CategoryId]        INT                 NOT NULL,
    [BrandId]           INT                 NULL,
    [Price]             DECIMAL(10,2)       NOT NULL,
    [CostPrice]         DECIMAL(10,2)       NULL,
    [Weight]            DECIMAL(8,3)        NULL,
    [Dimensions]        NVARCHAR(50)        NULL,
    [StockQuantity]     INT                 NOT NULL DEFAULT 0,
    [ReorderLevel]      INT                 NOT NULL DEFAULT 10,
    [IsActive]          BIT                 NOT NULL DEFAULT 1,
    [IsFeatured]        BIT                 NOT NULL DEFAULT 0,
    [ImageUrl]          NVARCHAR(500)       NULL,
    [MetaTitle]         NVARCHAR(100)       NULL,
    [MetaDescription]   NVARCHAR(200)       NULL,
    [CreatedDate]       DATETIME2           NOT NULL DEFAULT GETUTCDATE(),
    [ModifiedDate]      DATETIME2           NOT NULL DEFAULT GETUTCDATE(),
    [CreatedBy]         INT                 NOT NULL,
    [ModifiedBy]        INT                 NOT NULL,
    
    CONSTRAINT [PK_Product] PRIMARY KEY CLUSTERED ([ProductId]),
    CONSTRAINT [FK_Product_Category] FOREIGN KEY ([CategoryId]) 
        REFERENCES [ref].[Category] ([CategoryId]),
    CONSTRAINT [FK_Product_Brand] FOREIGN KEY ([BrandId]) 
        REFERENCES [ref].[Brand] ([BrandId]),
    CONSTRAINT [CK_Product_Price] CHECK ([Price] >= 0),
    CONSTRAINT [CK_Product_CostPrice] CHECK ([CostPrice] >= 0),
    CONSTRAINT [CK_Product_StockQuantity] CHECK ([StockQuantity] >= 0)
);
```

**Column Specifications:**

| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| ProductId | INT IDENTITY(1,1) | PK, NOT NULL | Unique product identifier |
| ProductName | NVARCHAR(100) | NOT NULL | Product display name |
| ProductCode | NVARCHAR(50) | NOT NULL, UNIQUE | Product SKU/code |
| Description | NVARCHAR(MAX) | NULL | Detailed product description |
| ShortDescription | NVARCHAR(500) | NULL | Brief product summary |
| CategoryId | INT | NOT NULL, FK | Product category reference |
| BrandId | INT | NULL, FK | Product brand reference |
| Price | DECIMAL(10,2) | NOT NULL, CHECK ≥ 0 | Selling price |
| CostPrice | DECIMAL(10,2) | NULL, CHECK ≥ 0 | Cost/wholesale price |
| Weight | DECIMAL(8,3) | NULL | Product weight in kg |
| Dimensions | NVARCHAR(50) | NULL | Product dimensions (L×W×H) |
| StockQuantity | INT | NOT NULL, CHECK ≥ 0 | Current inventory level |
| ReorderLevel | INT | NOT NULL, DEFAULT 10 | Reorder threshold |
| IsActive | BIT | NOT NULL, DEFAULT 1 | Product availability status |
| IsFeatured | BIT | NOT NULL, DEFAULT 0 | Featured product flag |
| ImageUrl | NVARCHAR(500) | NULL | Primary product image URL |
| MetaTitle | NVARCHAR(100) | NULL | SEO meta title |
| MetaDescription | NVARCHAR(200) | NULL | SEO meta description |

### 4.2 Reference Tables

#### 4.2.1 Category Table

**Purpose**: Product categorization for organization and navigation.

**Table Definition:**
```sql
CREATE TABLE [ref].[Category] (
    [CategoryId]        INT IDENTITY(1,1)   NOT NULL,
    [CategoryName]      NVARCHAR(50)        NOT NULL,
    [CategoryCode]      NVARCHAR(20)        NOT NULL,
    [Description]       NVARCHAR(500)       NULL,
    [ParentCategoryId]  INT                 NULL,
    [SortOrder]         INT                 NOT NULL DEFAULT 0,
    [ImageUrl]          NVARCHAR(500)       NULL,
    [IsActive]          BIT                 NOT NULL DEFAULT 1,
    [CreatedDate]       DATETIME2           NOT NULL DEFAULT GETUTCDATE(),
    [ModifiedDate]      DATETIME2           NOT NULL DEFAULT GETUTCDATE(),
    
    CONSTRAINT [PK_Category] PRIMARY KEY CLUSTERED ([CategoryId]),
    CONSTRAINT [FK_Category_Parent] FOREIGN KEY ([ParentCategoryId]) 
        REFERENCES [ref].[Category] ([CategoryId]),
    CONSTRAINT [UK_Category_Name] UNIQUE ([CategoryName]),
    CONSTRAINT [UK_Category_Code] UNIQUE ([CategoryCode])
);
```

### 4.3 Audit Tables

#### 4.3.1 AuditTrail Table

**Purpose**: Comprehensive audit trail for data changes and system events.

**Table Definition:**
```sql
CREATE TABLE [audit].[AuditTrail] (
    [AuditId]           BIGINT IDENTITY(1,1) NOT NULL,
    [TableName]         NVARCHAR(100)        NOT NULL,
    [RecordId]          NVARCHAR(50)         NOT NULL,
    [Operation]         CHAR(1)              NOT NULL,
    [OldValues]         NVARCHAR(MAX)        NULL,
    [NewValues]         NVARCHAR(MAX)        NULL,
    [ChangedColumns]    NVARCHAR(MAX)        NULL,
    [UserId]            INT                  NOT NULL,
    [UserName]          NVARCHAR(100)        NOT NULL,
    [ApplicationName]   NVARCHAR(100)        NULL,
    [MachineName]       NVARCHAR(100)        NULL,
    [CreatedDate]       DATETIME2            NOT NULL DEFAULT GETUTCDATE(),
    
    CONSTRAINT [PK_AuditTrail] PRIMARY KEY CLUSTERED ([AuditId]),
    CONSTRAINT [CK_AuditTrail_Operation] CHECK ([Operation] IN ('I', 'U', 'D'))
);
```

---

## 5. Indexes and Performance

### 5.1 Primary Indexes

All tables use clustered indexes on their primary key columns for optimal performance and data organization.

### 5.2 Secondary Indexes

**Customer Table Indexes:**
```sql
-- Email lookup (unique, filtered)
CREATE UNIQUE NONCLUSTERED INDEX [IX_Customer_Email] 
ON [dbo].[Customer] ([Email]) 
WHERE [IsActive] = 1;

-- Name search optimization
CREATE NONCLUSTERED INDEX [IX_Customer_Names] 
ON [dbo].[Customer] ([LastName], [FirstName]) 
INCLUDE ([Email], [PhoneNumber])
WHERE [IsActive] = 1;

-- Date range queries
CREATE NONCLUSTERED INDEX [IX_Customer_CreatedDate] 
ON [dbo].[Customer] ([CreatedDate]) 
INCLUDE ([CustomerId], [FirstName], [LastName]);
```

**Product Table Indexes:**
```sql
-- Product code lookup (unique)
CREATE UNIQUE NONCLUSTERED INDEX [IX_Product_ProductCode] 
ON [dbo].[Product] ([ProductCode]);

-- Category filtering
CREATE NONCLUSTERED INDEX [IX_Product_Category_Active] 
ON [dbo].[Product] ([CategoryId], [IsActive]) 
INCLUDE ([ProductName], [Price], [StockQuantity]);

-- Price range searches
CREATE NONCLUSTERED INDEX [IX_Product_Price] 
ON [dbo].[Product] ([Price], [IsActive]) 
INCLUDE ([ProductName], [CategoryId]);

-- Stock level monitoring
CREATE NONCLUSTERED INDEX [IX_Product_StockLevel] 
ON [dbo].[Product] ([StockQuantity]) 
WHERE [IsActive] = 1 AND [StockQuantity] <= [ReorderLevel];
```

### 5.3 Performance Considerations

**Query Optimization Strategies:**
- Use covering indexes for frequently accessed columns
- Implement filtered indexes for commonly used WHERE clauses
- Consider partitioning for large historical tables
- Regularly update statistics for optimal query plans

**Maintenance Tasks:**
- Weekly index fragmentation analysis and rebuilds
- Monthly statistics updates
- Quarterly performance review and optimization

---

## 6. Constraints and Rules

### 6.1 Primary Key Constraints

All tables implement surrogate primary keys using `INT IDENTITY(1,1)` for:
- Guaranteed uniqueness
- Optimal performance
- Stable references for foreign keys
- Simple replication and synchronization

### 6.2 Foreign Key Constraints

**Referential Integrity Rules:**
```sql
-- Customer to Country reference
ALTER TABLE [dbo].[Customer] 
ADD CONSTRAINT [FK_Customer_Country] 
FOREIGN KEY ([CountryId]) REFERENCES [ref].[Country] ([CountryId]);

-- Product to Category reference
ALTER TABLE [dbo].[Product] 
ADD CONSTRAINT [FK_Product_Category] 
FOREIGN KEY ([CategoryId]) REFERENCES [ref].[Category] ([CategoryId]);

-- Order to Customer reference
ALTER TABLE [dbo].[Order] 
ADD CONSTRAINT [FK_Order_Customer] 
FOREIGN KEY ([CustomerId]) REFERENCES [dbo].[Customer] ([CustomerId]);
```

### 6.3 Check Constraints

**Data Validation Rules:**
```sql
-- Email format validation
ALTER TABLE [dbo].[Customer] 
ADD CONSTRAINT [CK_Customer_Email] 
CHECK ([Email] LIKE '%@%.%');

-- Price validation
ALTER TABLE [dbo].[Product] 
ADD CONSTRAINT [CK_Product_Price] 
CHECK ([Price] >= 0);

-- Gender validation
ALTER TABLE [dbo].[Customer] 
ADD CONSTRAINT [CK_Customer_Gender] 
CHECK ([Gender] IN ('M', 'F', 'O'));

-- Order status validation
ALTER TABLE [dbo].[Order] 
ADD CONSTRAINT [CK_Order_Status] 
CHECK ([Status] IN ('PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED'));
```

### 6.4 Unique Constraints

**Business Rule Enforcement:**
```sql
-- Customer email uniqueness
ALTER TABLE [dbo].[Customer] 
ADD CONSTRAINT [UK_Customer_Email] 
UNIQUE ([Email]);

-- Product code uniqueness
ALTER TABLE [dbo].[Product] 
ADD CONSTRAINT [UK_Product_Code] 
UNIQUE ([ProductCode]);

-- Category name uniqueness
ALTER TABLE [ref].[Category] 
ADD CONSTRAINT [UK_Category_Name] 
UNIQUE ([CategoryName]);
```

---

## 7. Views and Stored Procedures

### 7.1 Business Views

#### Customer Summary View
```sql
CREATE VIEW [dbo].[vw_CustomerSummary] AS
SELECT 
    c.CustomerId,
    c.FirstName + ' ' + c.LastName AS FullName,
    c.Email,
    c.PhoneNumber,
    co.CountryName,
    c.IsActive,
    c.CreatedDate,
    COUNT(o.OrderId) AS TotalOrders,
    ISNULL(SUM(o.TotalAmount), 0) AS TotalSpent,
    MAX(o.OrderDate) AS LastOrderDate
FROM [dbo].[Customer] c
    LEFT JOIN [ref].[Country] co ON c.CountryId = co.CountryId
    LEFT JOIN [dbo].[Order] o ON c.CustomerId = o.CustomerId
GROUP BY 
    c.CustomerId, c.FirstName, c.LastName, c.Email, 
    c.PhoneNumber, co.CountryName, c.IsActive, c.CreatedDate;
```

#### Product Catalog View
```sql
CREATE VIEW [dbo].[vw_ProductCatalog] AS
SELECT 
    p.ProductId,
    p.ProductName,
    p.ProductCode,
    p.ShortDescription,
    p.Price,
    p.StockQuantity,
    c.CategoryName,
    b.BrandName,
    p.IsActive,
    p.IsFeatured,
    CASE 
        WHEN p.StockQuantity <= p.ReorderLevel THEN 'Low Stock'
        WHEN p.StockQuantity = 0 THEN 'Out of Stock'
        ELSE 'In Stock'
    END AS StockStatus
FROM [dbo].[Product] p
    INNER JOIN [ref].[Category] c ON p.CategoryId = c.CategoryId
    LEFT JOIN [ref].[Brand] b ON p.BrandId = b.BrandId
WHERE p.IsActive = 1;
```

### 7.2 Security Views

Views that filter sensitive data based on user permissions and roles.

### 7.3 Stored Procedures

#### Customer Registration Procedure
```sql
CREATE PROCEDURE [dbo].[sp_RegisterCustomer]
    @FirstName NVARCHAR(50),
    @LastName NVARCHAR(50),
    @Email NVARCHAR(100),
    @PhoneNumber NVARCHAR(20) = NULL,
    @CreatedBy INT,
    @CustomerId INT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRANSACTION;
    
    BEGIN TRY
        -- Check if email already exists
        IF EXISTS (SELECT 1 FROM [dbo].[Customer] WHERE [Email] = @Email)
        BEGIN
            RAISERROR('Email address already exists', 16, 1);
            RETURN;
        END
        
        -- Insert new customer
        INSERT INTO [dbo].[Customer] (
            [FirstName], [LastName], [Email], [PhoneNumber],
            [CreatedBy], [ModifiedBy]
        )
        VALUES (
            @FirstName, @LastName, @Email, @PhoneNumber,
            @CreatedBy, @CreatedBy
        );
        
        SET @CustomerId = SCOPE_IDENTITY();
        
        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END
```

---

## 8. Data Migration and Versioning

### Database Version Control

**Version Numbering**: `MAJOR.MINOR.PATCH` (e.g., 1.2.3)
- **MAJOR**: Breaking changes or major schema restructuring
- **MINOR**: New features, new tables, new columns
- **PATCH**: Bug fixes, index changes, constraint modifications

**Migration Scripts Location**: `/database/migrations/`

**Migration Script Naming**: `V{version}_{description}.sql`
- Example: `V1.2.3_Add_Customer_Email_Index.sql`

### Migration Process

1. **Development**: Create migration scripts in development environment
2. **Testing**: Apply migrations to staging environment
3. **Validation**: Verify data integrity and application functionality
4. **Production**: Schedule maintenance window for production deployment

### Rollback Strategy

- Always include rollback scripts for schema changes
- Test rollback procedures in staging environment
- Maintain database backups before major migrations

---

## 9. Security and Access Control

### User Roles

**Database Roles:**
- `db_app_read`: Read-only access to application tables
- `db_app_write`: Read/write access to application tables
- `db_app_execute`: Execute stored procedures and functions
- `db_report_read`: Read access for reporting and analytics

**Application Users:**
- `app_user`: Main application database user
- `report_user`: Reporting service database user
- `backup_user`: Backup service database user

### Row-Level Security

Implement row-level security for multi-tenant scenarios:
```sql
-- Create security predicate function
CREATE FUNCTION [security].[fn_SecurityPredicate](@TenantId INT)
RETURNS TABLE
WITH SCHEMABINDING
AS
RETURN SELECT 1 AS result 
WHERE @TenantId = CAST(SESSION_CONTEXT(N'TenantId') AS INT);

-- Apply security policy
CREATE SECURITY POLICY [security].[TenantSecurityPolicy]
ADD FILTER PREDICATE [security].[fn_SecurityPredicate]([TenantId]) 
ON [dbo].[Customer];
```

### Data Encryption

**Encryption at Rest:**
- Transparent Data Encryption (TDE) enabled for entire database
- Sensitive columns encrypted using Always Encrypted feature

**Encryption in Transit:**
- SSL/TLS encryption required for all connections
- Certificate-based authentication for service accounts

---

## 10. Backup and Recovery

### Backup Strategy

**Full Backups**: Daily at 2:00 AM UTC
**Differential Backups**: Every 6 hours
**Transaction Log Backups**: Every 15 minutes

**Retention Policy:**
- Full backups: 30 days
- Differential backups: 7 days
- Transaction log backups: 3 days

### Recovery Scenarios

**Point-in-Time Recovery**: Available within retention period
**Database Corruption**: Restore from most recent full backup + differentials + logs
**Disaster Recovery**: Geographic backup replication with 4-hour RPO

### Testing

**Monthly**: Recovery testing of random backup sets
**Quarterly**: Full disaster recovery simulation
**Annually**: Complete data center failover test

---

## 11. Appendix

### A. Database Objects Summary

| Object Type | Count | Examples |
|-------------|-------|----------|
| Tables | 25 | Customer, Product, Order |
| Views | 8 | vw_CustomerSummary, vw_ProductCatalog |
| Stored Procedures | 15 | sp_RegisterCustomer, sp_ProcessOrder |
| Functions | 6 | fn_CalculateOrderTotal, fn_SecurityPredicate |
| Indexes | 45 | IX_Customer_Email, IX_Product_Category |
| Constraints | 38 | FK_Order_Customer, CK_Product_Price |

### B. Performance Baselines

| Metric | Target | Current |
|--------|---------|---------|
| Average Query Response Time | < 100ms | 85ms |
| Index Fragmentation | < 10% | 7% |
| Database Size Growth | < 10% monthly | 8% monthly |
| Concurrent Users | 1000+ | 750 |

### C. Monitoring and Alerts

**Performance Monitors:**
- Query execution time > 5 seconds
- Index fragmentation > 15%
- Database size growth > 15% monthly
- Blocked processes > 30 seconds

**Availability Monitors:**
- Database connection failures
- Backup job failures
- Disk space < 20% free
- Memory usage > 90%

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | [Date] | [Author] | Initial database schema documentation |

---

## Review and Approval

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Database Administrator | [Name] | [Date] | [Signature] |
| Technical Architect | [Name] | [Date] | [Signature] |
| Security Officer | [Name] | [Date] | [Signature] |
| Development Lead | [Name] | [Date] | [Signature] |