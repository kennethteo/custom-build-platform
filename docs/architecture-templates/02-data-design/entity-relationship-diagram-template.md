# 📊 Entity-Relationship Diagram (ERD) Template

**Version**: 1.0  
**Author**: [Your Name]  
**Date**: [Insert Date]  
**Project Name**: [Insert Project Name]  
**Document ID**: ERD-[Project Code]-[Version]

---

## 🔖 Table of Contents

1. [Introduction](#1-introduction)  
    1.1 [Purpose](#11-purpose)  
    1.2 [Scope](#12-scope)  
    1.3 [Conventions](#13-conventions)  
2. [Data Model Overview](#2-data-model-overview)  
    2.1 [Business Context](#21-business-context)  
    2.2 [Data Architecture](#22-data-architecture)  
    2.3 [Model Assumptions](#23-model-assumptions)  
3. [Entity Definitions](#3-entity-definitions)  
    3.1 [Core Entities](#31-core-entities)  
    3.2 [Supporting Entities](#32-supporting-entities)  
    3.3 [Lookup Entities](#33-lookup-entities)  
4. [Relationship Definitions](#4-relationship-definitions)  
    4.1 [Primary Relationships](#41-primary-relationships)  
    4.2 [Secondary Relationships](#42-secondary-relationships)  
5. [Data Integrity Rules](#5-data-integrity-rules)  
    5.1 [Business Rules](#51-business-rules)  
    5.2 [Referential Integrity](#52-referential-integrity)  
    5.3 [Domain Constraints](#53-domain-constraints)  
6. [ERD Diagrams](#6-erd-diagrams)  
    6.1 [Conceptual ERD](#61-conceptual-erd)  
    6.2 [Logical ERD](#62-logical-erd)  
    6.3 [Physical ERD](#63-physical-erd)  
7. [Data Dictionary Reference](#7-data-dictionary-reference)  
8. [Appendix](#8-appendix)  

---

## 1. Introduction

### 1.1 Purpose

This document presents the Entity-Relationship Diagram (ERD) for the [Project Name] system. It serves as a blueprint for understanding the data structure, relationships, and constraints within the database design.

**Target Audience:**
- Database administrators
- Backend developers
- Data architects
- Business analysts
- QA engineers

### 1.2 Scope

This ERD covers:
- All primary business entities and their attributes
- Relationships between entities and their cardinalities
- Key constraints and business rules
- Data integrity requirements
- Normalization considerations

**Out of Scope:**
- Performance optimization details
- Specific database vendor implementations
- Data migration strategies
- Backup and recovery procedures

### 1.3 Conventions

**Notation Standards:**
- **Chen Notation** / **Crow's Foot Notation** / **UML Notation** (specify which)
- **Entity Names**: PascalCase (e.g., `CustomerOrder`)
- **Attribute Names**: camelCase (e.g., `firstName`)
- **Relationship Names**: Descriptive verbs (e.g., "places", "contains")

**Cardinality Symbols:**
- `1` : One (exactly one)
- `0..1` : Zero or one (optional)
- `1..*` : One or many (at least one)
- `0..*` : Zero or many (optional many)

**Entity Types:**
- 🟦 **Strong Entity**: Independent existence
- 🟨 **Weak Entity**: Depends on strong entity
- 🟪 **Associative Entity**: Represents many-to-many relationship

---

## 2. Data Model Overview

### 2.1 Business Context

Provide context about the business domain and how the data model supports business operations.

**Business Domain**: [e.g., E-commerce, Healthcare, Financial Services]

**Key Business Processes Supported**:
1. [Process 1 - e.g., Order Management]
2. [Process 2 - e.g., Customer Relationship Management]
3. [Process 3 - e.g., Inventory Management]

### 2.2 Data Architecture

**Architecture Style**: [Normalized/Denormalized/Hybrid]

**Normalization Level**: [1NF/2NF/3NF/BCNF]

**Design Principles**:
- Data integrity and consistency
- Minimal redundancy
- Support for ACID transactions
- Scalability considerations
- Performance optimization

### 2.3 Model Assumptions

List key assumptions made during the data modeling process:

1. **Business Assumptions**:
   - Customers can have multiple addresses
   - Orders cannot be modified after shipment
   - Products can belong to multiple categories

2. **Technical Assumptions**:
   - Primary keys will be auto-generated integers
   - Foreign key constraints will be enforced
   - Soft deletes will be used for audit purposes

---

## 3. Entity Definitions

### 3.1 Core Entities

Core entities represent the fundamental business objects.

#### 3.1.1 Customer Entity 🟦

**Purpose**: Represents individuals or organizations that purchase products or services.

**Attributes**:
| Attribute Name | Data Type | Constraints | Description |
|---------------|-----------|-------------|-------------|
| customerId | INT | PK, NOT NULL, AUTO_INCREMENT | Unique customer identifier |
| firstName | VARCHAR(50) | NOT NULL | Customer's first name |
| lastName | VARCHAR(50) | NOT NULL | Customer's last name |
| email | VARCHAR(100) | UNIQUE, NOT NULL | Customer's email address |
| phoneNumber | VARCHAR(20) | NULL | Customer's phone number |
| dateCreated | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Account creation date |
| isActive | BOOLEAN | NOT NULL, DEFAULT TRUE | Account status |

**Business Rules**:
- Email must be unique across all customers
- Phone number format must be validated
- Customers cannot be physically deleted (soft delete only)

#### 3.1.2 Product Entity 🟦

**Purpose**: Represents items available for purchase.

**Attributes**:
| Attribute Name | Data Type | Constraints | Description |
|---------------|-----------|-------------|-------------|
| productId | INT | PK, NOT NULL, AUTO_INCREMENT | Unique product identifier |
| productName | VARCHAR(100) | NOT NULL | Product name |
| description | TEXT | NULL | Detailed product description |
| price | DECIMAL(10,2) | NOT NULL, CHECK (price >= 0) | Product price |
| stockQuantity | INT | NOT NULL, DEFAULT 0 | Available inventory |
| categoryId | INT | FK, NOT NULL | Reference to Category |
| isActive | BOOLEAN | NOT NULL, DEFAULT TRUE | Product availability status |

**Business Rules**:
- Price cannot be negative
- Stock quantity cannot be negative
- Products must belong to exactly one category

#### 3.1.3 Order Entity 🟦

**Purpose**: Represents a customer's purchase transaction.

**Attributes**:
| Attribute Name | Data Type | Constraints | Description |
|---------------|-----------|-------------|-------------|
| orderId | INT | PK, NOT NULL, AUTO_INCREMENT | Unique order identifier |
| customerId | INT | FK, NOT NULL | Reference to Customer |
| orderDate | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Order placement date |
| totalAmount | DECIMAL(10,2) | NOT NULL, CHECK (totalAmount >= 0) | Total order value |
| orderStatus | ENUM | NOT NULL, DEFAULT 'PENDING' | Order processing status |
| shippingAddress | TEXT | NOT NULL | Delivery address |

**Business Rules**:
- Orders must have at least one order item
- Total amount must equal sum of order items
- Order status follows: PENDING → CONFIRMED → SHIPPED → DELIVERED

### 3.2 Supporting Entities

#### 3.2.1 OrderItem Entity 🟨

**Purpose**: Represents individual products within an order (weak entity).

**Attributes**:
| Attribute Name | Data Type | Constraints | Description |
|---------------|-----------|-------------|-------------|
| orderItemId | INT | PK, NOT NULL, AUTO_INCREMENT | Unique order item identifier |
| orderId | INT | FK, NOT NULL | Reference to Order |
| productId | INT | FK, NOT NULL | Reference to Product |
| quantity | INT | NOT NULL, CHECK (quantity > 0) | Quantity ordered |
| unitPrice | DECIMAL(10,2) | NOT NULL, CHECK (unitPrice >= 0) | Price per unit at time of order |
| lineTotal | DECIMAL(10,2) | NOT NULL | Calculated total for this line |

**Business Rules**:
- Line total = quantity × unit price
- Quantity must be positive
- Unit price captured at time of order (price history)

### 3.3 Lookup Entities

#### 3.3.1 Category Entity 🟦

**Purpose**: Product categorization for organization and filtering.

**Attributes**:
| Attribute Name | Data Type | Constraints | Description |
|---------------|-----------|-------------|-------------|
| categoryId | INT | PK, NOT NULL, AUTO_INCREMENT | Unique category identifier |
| categoryName | VARCHAR(50) | UNIQUE, NOT NULL | Category name |
| description | TEXT | NULL | Category description |
| parentCategoryId | INT | FK, NULL | Self-reference for hierarchical categories |

---

## 4. Relationship Definitions

### 4.1 Primary Relationships

#### 4.1.1 Customer-Order Relationship

**Type**: One-to-Many (1:*)  
**Description**: A customer can place multiple orders, but each order belongs to exactly one customer.

**Cardinality**: Customer (1) → Order (*)  
**Foreign Key**: Order.customerId → Customer.customerId  
**Business Rule**: Customers must exist before orders can be placed  

#### 4.1.2 Order-OrderItem Relationship

**Type**: One-to-Many (1:*)  
**Description**: An order contains multiple line items, each item belongs to one order.

**Cardinality**: Order (1) → OrderItem (*)  
**Foreign Key**: OrderItem.orderId → Order.orderId  
**Business Rule**: Orders must have at least one order item  

#### 4.1.3 Product-OrderItem Relationship

**Type**: One-to-Many (1:*)  
**Description**: A product can appear in multiple order items, each item references one product.

**Cardinality**: Product (1) → OrderItem (*)  
**Foreign Key**: OrderItem.productId → Product.productId  
**Business Rule**: Products must exist and be active to be ordered  

### 4.2 Secondary Relationships

#### 4.2.1 Category-Product Relationship

**Type**: One-to-Many (1:*)  
**Description**: A category contains multiple products, each product belongs to one category.

**Cardinality**: Category (1) → Product (*)  
**Foreign Key**: Product.categoryId → Category.categoryId  

#### 4.2.2 Category Self-Reference Relationship

**Type**: One-to-Many (1:*) - Recursive  
**Description**: Categories can have subcategories (hierarchical structure).

**Cardinality**: Category (1) → Category (*) [as subcategories]  
**Foreign Key**: Category.parentCategoryId → Category.categoryId  

---

## 5. Data Integrity Rules

### 5.1 Business Rules

1. **Customer Rules**:
   - Each customer must have a unique email address
   - Customer names cannot be empty
   - Inactive customers cannot place new orders

2. **Product Rules**:
   - Product prices must be non-negative
   - Stock quantities cannot be negative
   - Inactive products cannot be ordered

3. **Order Rules**:
   - Orders must have at least one order item
   - Total amount must equal sum of all line totals
   - Order status transitions must follow defined workflow

### 5.2 Referential Integrity

**Foreign Key Constraints**:
- `Order.customerId` REFERENCES `Customer.customerId` ON DELETE RESTRICT
- `OrderItem.orderId` REFERENCES `Order.orderId` ON DELETE CASCADE
- `OrderItem.productId` REFERENCES `Product.productId` ON DELETE RESTRICT
- `Product.categoryId` REFERENCES `Category.categoryId` ON DELETE RESTRICT

**Delete Rules**:
- **RESTRICT**: Prevent deletion if referenced records exist
- **CASCADE**: Delete related records when parent is deleted
- **SET NULL**: Set foreign key to NULL when parent is deleted

### 5.3 Domain Constraints

**Check Constraints**:
```sql
-- Product price validation
ALTER TABLE Product ADD CONSTRAINT chk_product_price 
CHECK (price >= 0);

-- Order item quantity validation
ALTER TABLE OrderItem ADD CONSTRAINT chk_orderitem_quantity 
CHECK (quantity > 0);

-- Order total amount validation
ALTER TABLE Order ADD CONSTRAINT chk_order_total 
CHECK (totalAmount >= 0);
```

**Unique Constraints**:
```sql
-- Customer email uniqueness
ALTER TABLE Customer ADD CONSTRAINT uk_customer_email 
UNIQUE (email);

-- Category name uniqueness
ALTER TABLE Category ADD CONSTRAINT uk_category_name 
UNIQUE (categoryName);
```

---

## 6. ERD Diagrams

### 6.1 Conceptual ERD

**High-level view showing main business entities and relationships**

```
[Insert Conceptual ERD Diagram Here]

Conceptual ERD should show:
- Main business entities (Customer, Product, Order, Category)
- Primary relationships without technical details
- Focus on business understanding
```

**Tools for Creation**: Draw.io, Lucidchart, Visio, or any ERD tool

### 6.2 Logical ERD

**Detailed view with all attributes and relationships**

```
[Insert Logical ERD Diagram Here]

Logical ERD should show:
- All entities with complete attribute lists
- All relationships with cardinalities
- Primary and foreign keys
- Data types for each attribute
```

### 6.3 Physical ERD

**Database-specific implementation view**

```
[Insert Physical ERD Diagram Here]

Physical ERD should show:
- Table names (potentially different from entity names)
- Column specifications with data types and constraints
- Indexes and performance considerations
- Database-specific features
```

---

## 7. Data Dictionary Reference

This ERD should be used in conjunction with the complete [Data Dictionary](./data-dictionary-template.md) which provides:
- Detailed attribute specifications
- Business definitions and rules
- Data validation requirements
- Sample data and examples

---

## 8. Appendix

### A. Entity Summary

| Entity Type | Entity Name | Primary Key | Number of Attributes |
|-------------|-------------|-------------|---------------------|
| Strong | Customer | customerId | 6 |
| Strong | Product | productId | 7 |
| Strong | Order | orderId | 6 |
| Strong | Category | categoryId | 4 |
| Weak | OrderItem | orderItemId | 6 |

### B. Relationship Summary

| Relationship | Type | Cardinality | Mandatory |
|--------------|------|-------------|-----------|
| Customer → Order | 1:* | 1..* | Yes |
| Order → OrderItem | 1:* | 1..* | Yes |
| Product → OrderItem | 1:* | 0..* | No |
| Category → Product | 1:* | 0..* | No |
| Category → Category | 1:* | 0..* | No |

### C. Normalization Analysis

**1st Normal Form (1NF)**: ✅ All attributes contain atomic values  
**2nd Normal Form (2NF)**: ✅ No partial dependencies on composite keys  
**3rd Normal Form (3NF)**: ✅ No transitive dependencies  
**Boyce-Codd Normal Form (BCNF)**: ✅ All determinants are candidate keys  

### D. Sample Data

**Customer Table**:
| customerId | firstName | lastName | email | phoneNumber | isActive |
|------------|-----------|----------|-------|-------------|----------|
| 1 | John | Doe | john.doe@email.com | +1-555-0123 | TRUE |
| 2 | Jane | Smith | jane.smith@email.com | +1-555-0124 | TRUE |

**Product Table**:
| productId | productName | price | stockQuantity | categoryId | isActive |
|-----------|-------------|-------|---------------|------------|----------|
| 1 | Laptop Computer | 999.99 | 25 | 1 | TRUE |
| 2 | Wireless Mouse | 29.99 | 100 | 1 | TRUE |

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | [Date] | [Author] | Initial ERD documentation |

---

## Review and Approval

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Data Architect | [Name] | [Date] | [Signature] |
| Database Administrator | [Name] | [Date] | [Signature] |
| Technical Lead | [Name] | [Date] | [Signature] |
| Business Analyst | [Name] | [Date] | [Signature] |