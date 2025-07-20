# 🔄 Data Flow Diagram (DFD) Template

**Version**: 1.0  
**Author**: [Your Name]  
**Date**: [Insert Date]  
**Project Name**: [Insert Project Name]  
**Document ID**: DFD-[Project Code]-[Version]

---

## 🔖 Table of Contents

1. [Introduction](#1-introduction)  
    1.1 [Purpose](#11-purpose)  
    1.2 [Scope](#12-scope)  
    1.3 [DFD Conventions](#13-dfd-conventions)  
2. [System Context](#2-system-context)  
    2.1 [System Boundary](#21-system-boundary)  
    2.2 [External Entities](#22-external-entities)  
    2.3 [System Overview](#23-system-overview)  
3. [DFD Hierarchy](#3-dfd-hierarchy)  
    3.1 [Context Diagram (Level 0)](#31-context-diagram-level-0)  
    3.2 [Level 1 DFD](#32-level-1-dfd)  
    3.3 [Level 2 DFD](#33-level-2-dfd)  
    3.4 [Level 3+ DFD](#34-level-3-dfd)  
4. [Process Specifications](#4-process-specifications)  
    4.1 [Core Processes](#41-core-processes)  
    4.2 [Supporting Processes](#42-supporting-processes)  
5. [Data Store Specifications](#5-data-store-specifications)  
    5.1 [Primary Data Stores](#51-primary-data-stores)  
    5.2 [Temporary Data Stores](#52-temporary-data-stores)  
6. [Data Flow Specifications](#6-data-flow-specifications)  
    6.1 [Input Data Flows](#61-input-data-flows)  
    6.2 [Output Data Flows](#62-output-data-flows)  
    6.3 [Internal Data Flows](#63-internal-data-flows)  
7. [Data Dictionary Reference](#7-data-dictionary-reference)  
8. [Validation and Verification](#8-validation-and-verification)  
9. [Appendix](#9-appendix)  

---

## 1. Introduction

### 1.1 Purpose

This document presents the Data Flow Diagrams (DFDs) for the [Project Name] system. DFDs provide a graphical representation of how data moves through the system, showing the flow of information from external entities through various processes and data stores.

**Target Audience:**
- System analysts
- Business analysts
- Software developers
- System architects
- Stakeholders and project managers
- Quality assurance engineers

### 1.2 Scope

This DFD documentation covers:
- Complete data flow hierarchy from context level to detailed process levels
- All major business processes and their data transformations
- External entities that interact with the system
- Data stores and their relationships
- Data flow specifications and validation rules

**Out of Scope:**
- Implementation details (code, database design)
- User interface design
- Network architecture
- Security implementation details

### 1.3 DFD Conventions

**Symbols and Notation:**

| Symbol | Description | Representation |
|--------|-------------|----------------|
| ⭕ | **Process** | Circles/bubbles - transform data |
| ⬜ | **External Entity** | Rectangles - sources/sinks of data |
| ⬜ | **Data Store** | Open rectangles - data repositories |
| ➡️ | **Data Flow** | Arrows - movement of data |

**Naming Conventions:**
- **Processes**: Verb + Object (e.g., "Process Order", "Validate Customer")
- **Data Stores**: Noun describing data (e.g., "Customer Database", "Order History")
- **External Entities**: Noun representing person/system (e.g., "Customer", "Payment Gateway")
- **Data Flows**: Noun describing data (e.g., "Order Request", "Customer Details")

**Numbering System:**
- **Level 0**: Single process (Context Diagram)
- **Level 1**: Processes numbered 1, 2, 3, etc.
- **Level 2**: Sub-processes numbered 1.1, 1.2, 2.1, etc.
- **Level 3**: Further sub-processes numbered 1.1.1, 1.1.2, etc.

---

## 2. System Context

### 2.1 System Boundary

**System Name**: [Project Name]  
**System Type**: [Web Application / Desktop Application / Mobile App / Enterprise System]  
**Business Domain**: [E-commerce / Healthcare / Financial Services / Manufacturing / etc.]

**System Boundary Definition:**
The system boundary encompasses all processes, data stores, and data flows that are part of the [Project Name] system. External entities represent sources and destinations of data that exist outside this boundary.

### 2.2 External Entities

External entities are people, organizations, or systems that provide input to or receive output from the system.

| Entity Name | Type | Description | Primary Interactions |
|-------------|------|-------------|---------------------|
| Customer | Person | End users who purchase products/services | Place orders, manage profile, view history |
| Administrator | Person | System managers and operators | Manage products, view reports, configure system |
| Payment Gateway | System | External payment processing service | Process payments, handle refunds |
| Shipping Provider | Organization | Third-party logistics and delivery | Update shipping status, provide tracking |
| Inventory System | System | External inventory management | Update stock levels, product availability |
| Email Service | System | External email delivery service | Send notifications, confirmations |

### 2.3 System Overview

**Primary Functions:**
1. **Customer Management**: Registration, authentication, profile management
2. **Product Catalog**: Product browsing, search, category management
3. **Order Processing**: Shopping cart, checkout, payment processing
4. **Inventory Management**: Stock tracking, product availability
5. **Reporting**: Sales reports, analytics, business intelligence

**Key Data Flows:**
- Customer registration and authentication data
- Product catalog and inventory information
- Order and payment transaction data
- Shipping and delivery tracking data
- Business reports and analytics data

---

## 3. DFD Hierarchy

### 3.1 Context Diagram (Level 0)

**Purpose**: Provides the highest-level view of the system showing the system as a single process with its external entities.

```
[Context Diagram Visualization]

              Customer Data
                    ↓
    Customer ──────────────────► [0]
       ↑                    E-Commerce
       │                     System        ───────────► Payment Gateway
       │                        ↓                           ↑
       └─────── Order Status    │                    Payment Data
                                │
                                ▼
                         Inventory System ←──── Stock Updates
                                ↑
                         Shipping Data
                                │
                                ▼
                        Shipping Provider
```

**Context Diagram Elements:**

| Element | Type | Description |
|---------|------|-------------|
| E-Commerce System | Process (0) | The entire system being modeled |
| Customer | External Entity | Users who interact with the system |
| Payment Gateway | External Entity | Processes payment transactions |
| Inventory System | External Entity | Manages product stock levels |
| Shipping Provider | External Entity | Handles order fulfillment and delivery |

**Data Flows:**
- **Customer Data**: Registration, login, profile information
- **Order Status**: Order confirmations, shipping updates, delivery notifications
- **Payment Data**: Payment requests, confirmations, refund information
- **Stock Updates**: Inventory levels, product availability
- **Shipping Data**: Delivery addresses, tracking information

### 3.2 Level 1 DFD

**Purpose**: Decomposes the context diagram into major functional processes.

```
[Level 1 DFD Visualization]

Customer ──► 1. Customer        Customer Info     ┌─────────────┐
             Management    ──────────────────────►│D1 Customer  │
                ↓                                 │   Database  │
         Customer ID                              └─────────────┘
                ↓
             2. Product         Product Data      ┌─────────────┐
Customer ──► Catalog       ──────────────────────►│D2 Product   │
             Management                           │   Database  │
                ↓                                 └─────────────┘
            Order Request
                ↓
             3. Order           Order Data        ┌─────────────┐
             Processing    ──────────────────────►│D3 Order     │
                ↓                                 │   Database  │
         Payment Request                          └─────────────┘
                ↓
Payment ◄──── 4. Payment
Gateway        Processing
                ↓
            Order Status
                ↓
             5. Order           Shipping Data
             Fulfillment   ─────────────────────► Shipping
                                                  Provider
```

**Level 1 Processes:**

| Process | Name | Description | Inputs | Outputs |
|---------|------|-------------|--------|---------|
| 1 | Customer Management | Handle customer registration, authentication, profile updates | Customer Data | Customer Info, Customer ID |
| 2 | Product Catalog Management | Manage product information, categories, search | Product Queries | Product Data |
| 3 | Order Processing | Process shopping cart, create orders, calculate totals | Order Request, Customer ID | Order Data, Payment Request |
| 4 | Payment Processing | Handle payment transactions, refunds | Payment Request | Payment Confirmation, Order Status |
| 5 | Order Fulfillment | Manage shipping, tracking, delivery | Order Data | Shipping Data, Order Status |

### 3.3 Level 2 DFD

**Purpose**: Further decomposes Level 1 processes into more detailed sub-processes.

#### 3.3.1 Process 1: Customer Management (Level 2)

```
[Customer Management Level 2 DFD]

Customer ──► 1.1 Customer      Registration     ┌─────────────┐
             Registration  ─────────────────────►│D1.1 Customer│
                ↓                               │    Profiles │
        Registration Data                       └─────────────┘
                ↓
             1.2 User           Login Request
Customer ──► Authentication ◄─────────────────── Customer
                ↓
            Auth Token
                ↓
             1.3 Profile        Profile Data     ┌─────────────┐
Customer ──► Management    ─────────────────────►│D1.2 Customer│
                                                │   Settings  │
                                                └─────────────┘
```

**Customer Management Sub-processes:**

| Process | Name | Description | Business Rules |
|---------|------|-------------|----------------|
| 1.1 | Customer Registration | Create new customer accounts | Email must be unique, password requirements |
| 1.2 | User Authentication | Validate login credentials | Max 3 login attempts, session timeout |
| 1.3 | Profile Management | Update customer information | Email verification required for changes |

#### 3.3.2 Process 3: Order Processing (Level 2)

```
[Order Processing Level 2 DFD]

Customer ──► 3.1 Shopping        Cart Data       ┌─────────────┐
             Cart            ─────────────────────►│D3.1 Shopping│
             Management                            │    Cart     │
                ↓                                 └─────────────┘
         Cart Contents
                ↓
             3.2 Order          Order Details     ┌─────────────┐
             Creation      ─────────────────────►│D3.2 Order   │
                ↓                                │   Headers   │
         Order Summary                           └─────────────┘
                ↓
             3.3 Order          Pricing Data     ┌─────────────┐
             Calculation   ◄─────────────────────│D2 Product   │
                ↓                                │   Database  │
         Total Amount                            └─────────────┘
                ↓
Payment     ◄──── 3.4 Payment
Gateway           Integration
```

### 3.4 Level 3+ DFD

For complex processes, continue decomposition to Level 3 and beyond as needed.

---

## 4. Process Specifications

### 4.1 Core Processes

#### Process 1.1: Customer Registration

**Input Data Flows:**
- Registration Data (from Customer)

**Output Data Flows:**
- Customer Profile (to Customer Database)
- Registration Confirmation (to Customer)

**Process Logic:**
1. Validate required fields (name, email, password)
2. Check email uniqueness against existing customers
3. Validate password strength requirements
4. Generate unique customer ID
5. Hash password for secure storage
6. Store customer profile in database
7. Send registration confirmation email

**Business Rules:**
- Email address must be unique
- Password must be minimum 8 characters with special characters
- All required fields must be completed
- Email verification required before account activation

**Error Handling:**
- Duplicate email: Return error message
- Invalid password: Return validation errors
- Database error: Log error and return generic failure message

#### Process 3.2: Order Creation

**Input Data Flows:**
- Cart Contents (from Shopping Cart Management)
- Customer ID (from User Authentication)

**Output Data Flows:**
- Order Details (to Order Database)
- Order Summary (to Order Calculation)

**Process Logic:**
1. Validate customer authentication
2. Retrieve cart contents and verify products exist
3. Check product availability and stock levels
4. Generate unique order ID
5. Create order header record
6. Create order line items for each cart product
7. Clear shopping cart
8. Return order summary for calculation

**Business Rules:**
- Customer must be authenticated
- All cart items must be available
- Minimum order value may apply
- Maximum quantity limits per product

### 4.2 Supporting Processes

#### Process 4.1: Payment Authorization

**Input Data Flows:**
- Payment Request (from Order Processing)

**Output Data Flows:**
- Payment Response (to Payment Gateway)
- Authorization Status (to Order Processing)

**Process Logic:**
1. Validate payment information format
2. Check for duplicate transaction
3. Send authorization request to payment gateway
4. Process gateway response
5. Update order status based on result
6. Log transaction details for audit

---

## 5. Data Store Specifications

### 5.1 Primary Data Stores

#### D1: Customer Database

**Description**: Stores customer profile information and account details.

**Data Elements:**
- Customer ID (Primary Key)
- Personal Information (Name, Email, Phone)
- Address Information
- Account Settings
- Registration Date
- Last Login Date

**Access Patterns:**
- **Read**: Customer authentication, profile retrieval, order association
- **Write**: Registration, profile updates, login tracking
- **Volume**: Estimated 100,000 customers, growing 10% monthly

**Data Retention**: Customer data retained for 7 years after account closure per compliance requirements.

#### D2: Product Database

**Description**: Contains product catalog information including descriptions, pricing, and inventory.

**Data Elements:**
- Product ID (Primary Key)
- Product Name and Description
- Category and Brand Information
- Pricing Information
- Stock Levels
- Product Images and Metadata

**Access Patterns:**
- **Read**: Product browsing, search, order processing
- **Write**: Product updates, inventory adjustments, price changes
- **Volume**: 10,000 products with daily updates

#### D3: Order Database

**Description**: Stores order transactions and order line items.

**Data Elements:**
- Order ID (Primary Key)
- Customer ID (Foreign Key)
- Order Date and Status
- Billing and Shipping Addresses
- Order Total and Tax Information
- Order Line Items with Quantities and Prices

**Access Patterns:**
- **Read**: Order history, reporting, fulfillment processing
- **Write**: New orders, status updates, modifications
- **Volume**: 500,000 orders annually, 2M order line items

### 5.2 Temporary Data Stores

#### D3.1: Shopping Cart

**Description**: Temporary storage for items before order creation.

**Data Elements:**
- Session ID
- Customer ID (if authenticated)
- Product ID and Quantity
- Add Date
- Session Expiration

**Access Patterns:**
- High-frequency read/write during shopping session
- Periodic cleanup of expired sessions

---

## 6. Data Flow Specifications

### 6.1 Input Data Flows

#### Customer Registration Data

**Source**: Customer (External Entity)  
**Destination**: Process 1.1 (Customer Registration)  
**Data Elements**:
- First Name (Required, String, Max 50 chars)
- Last Name (Required, String, Max 50 chars)
- Email Address (Required, String, Valid email format)
- Password (Required, String, Min 8 chars)
- Phone Number (Optional, String, Valid phone format)
- Address Information (Optional, Structured address)

**Validation Rules**:
- Email format validation using regex
- Password strength requirements
- Phone number format validation
- Required field validation

#### Product Search Query

**Source**: Customer (External Entity)  
**Destination**: Process 2.1 (Product Search)  
**Data Elements**:
- Search Terms (String, Max 100 chars)
- Category Filter (String, Valid category)
- Price Range (Numeric, Min/Max values)
- Sort Preference (String, Valid sort options)

### 6.2 Output Data Flows

#### Order Confirmation

**Source**: Process 3.4 (Payment Integration)  
**Destination**: Customer (External Entity)  
**Data Elements**:
- Order ID (String, Unique identifier)
- Order Date (DateTime)
- Order Items (List of products with quantities)
- Total Amount (Decimal, Currency formatted)
- Estimated Delivery Date (Date)
- Tracking Information (String, When available)

#### Shipping Instructions

**Source**: Process 5.1 (Order Fulfillment)  
**Destination**: Shipping Provider (External Entity)  
**Data Elements**:
- Order ID (Reference)
- Shipping Address (Structured address)
- Package Contents (List of items)
- Delivery Instructions (String)
- Service Level (String, Standard/Express/etc.)

### 6.3 Internal Data Flows

#### Customer Authentication Token

**Source**: Process 1.2 (User Authentication)  
**Destination**: Process 3.1 (Shopping Cart Management)  
**Data Elements**:
- Customer ID (Integer, Unique identifier)
- Session Token (String, Encrypted)
- Expiration Time (DateTime)
- User Role (String, Permission level)

---

## 7. Data Dictionary Reference

This DFD should be used in conjunction with the complete [Data Dictionary](./data-dictionary-template.md) which provides:
- Detailed data element definitions
- Data types and formats
- Validation rules and constraints
- Business definitions and examples

**Cross-Reference:**
- All data flows reference data dictionary entries
- Data stores align with entity definitions
- Process specifications include data validation rules

---

## 8. Validation and Verification

### 8.1 DFD Balancing

**Level Balancing**: Ensure each level of DFD is properly balanced:
- Inputs and outputs of parent processes match child process decomposition
- Data stores appear at the appropriate levels
- External entities are consistent across all levels

**Data Flow Conservation**: 
- No data flows appear or disappear between levels
- All inputs to a process are used in sub-processes
- All outputs from sub-processes contribute to parent outputs

### 8.2 Completeness Checks

**Process Coverage**: All business functions are represented by processes
**Data Store Coverage**: All persistent data is represented by data stores
**External Entity Coverage**: All sources and destinations of data are identified
**Data Flow Coverage**: All movement of data is documented

### 8.3 Consistency Validation

**Naming Consistency**: Names are consistent across all levels and diagrams
**Data Dictionary Alignment**: All data flows and stores reference data dictionary
**Business Rule Compliance**: Process specifications align with business requirements

---

## 9. Appendix

### A. DFD Summary Statistics

| Level | Number of Processes | Number of Data Stores | Number of External Entities |
|-------|-------------------|---------------------|---------------------------|
| 0 (Context) | 1 | 0 | 5 |
| 1 | 5 | 3 | 5 |
| 2 | 12 | 8 | 5 |
| 3 | 8 | 3 | 0 |

### B. Process Hierarchy

```
0. E-Commerce System
├── 1. Customer Management
│   ├── 1.1 Customer Registration
│   ├── 1.2 User Authentication
│   └── 1.3 Profile Management
├── 2. Product Catalog Management
│   ├── 2.1 Product Search
│   ├── 2.2 Product Display
│   └── 2.3 Category Management
├── 3. Order Processing
│   ├── 3.1 Shopping Cart Management
│   ├── 3.2 Order Creation
│   ├── 3.3 Order Calculation
│   └── 3.4 Payment Integration
├── 4. Payment Processing
│   ├── 4.1 Payment Authorization
│   └── 4.2 Payment Confirmation
└── 5. Order Fulfillment
    ├── 5.1 Shipping Coordination
    └── 5.2 Delivery Tracking
```

### C. Data Store Cross-Reference

| Data Store | Used by Processes | Updated by Processes |
|------------|------------------|-------------------|
| D1 Customer Database | 1.2, 3.2, 5.1 | 1.1, 1.3 |
| D2 Product Database | 2.1, 2.2, 3.3 | 2.3 |
| D3 Order Database | 3.4, 5.1, 5.2 | 3.2, 4.2 |

### D. Business Rules Summary

1. **Customer Management**:
   - Unique email addresses required
   - Password complexity requirements
   - Email verification for activation

2. **Order Processing**:
   - Authentication required for orders
   - Stock availability validation
   - Price calculation includes taxes

3. **Payment Processing**:
   - Secure payment gateway integration
   - Transaction logging for audit
   - Refund processing capabilities

### E. Tools and Standards

**Modeling Tools**: 
- Draw.io for diagram creation
- Microsoft Visio for complex diagrams
- Lucidchart for collaborative modeling

**Standards Compliance**:
- Yourdon/DeMarco DFD notation
- IEEE 830 software requirements standard
- ISO/IEC 12207 systems lifecycle standard

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | [Date] | [Author] | Initial DFD documentation |

---

## Review and Approval

| Role | Name | Date | Signature |
|------|------|------|-----------|
| System Analyst | [Name] | [Date] | [Signature] |
| Business Analyst | [Name] | [Date] | [Signature] |
| Technical Architect | [Name] | [Date] | [Signature] |
| Project Manager | [Name] | [Date] | [Signature] |