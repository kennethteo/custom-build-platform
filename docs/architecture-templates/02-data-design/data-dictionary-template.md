# 📖 Data Dictionary Template

**Version**: 1.0  
**Author**: [Your Name]  
**Date**: [Insert Date]  
**Project Name**: [Insert Project Name]  
**Document ID**: DD-[Project Code]-[Version]

---

## 🔖 Table of Contents

1. [Introduction](#1-introduction)  
    1.1 [Purpose](#11-purpose)  
    1.2 [Scope](#12-scope)  
    1.3 [Conventions](#13-conventions)  
2. [Data Element Specifications](#2-data-element-specifications)  
    2.1 [Core Business Data](#21-core-business-data)  
    2.2 [Reference Data](#22-reference-data)  
    2.3 [System Data](#23-system-data)  
3. [Data Structures](#3-data-structures)  
    3.1 [Record Structures](#31-record-structures)  
    3.2 [Data Flows](#32-data-flows)  
    3.3 [Complex Data Types](#33-complex-data-types)  
4. [Validation Rules](#4-validation-rules)  
    4.1 [Field Validation](#41-field-validation)  
    4.2 [Business Rules](#42-business-rules)  
    4.3 [Cross-Field Validation](#43-cross-field-validation)  
5. [Data Relationships](#5-data-relationships)  
    5.1 [Entity Relationships](#51-entity-relationships)  
    5.2 [Dependencies](#52-dependencies)  
    5.3 [Hierarchies](#53-hierarchies)  
6. [Data Standards](#6-data-standards)  
    6.1 [Naming Standards](#61-naming-standards)  
    6.2 [Coding Standards](#62-coding-standards)  
    6.3 [Quality Standards](#63-quality-standards)  
7. [Data Sources and Lineage](#7-data-sources-and-lineage)  
8. [Appendix](#8-appendix)  

---

## 1. Introduction

### 1.1 Purpose

This Data Dictionary provides comprehensive definitions and specifications for all data elements used in the [Project Name] system. It serves as the authoritative reference for understanding data structure, meaning, validation rules, and relationships within the system.

**Target Audience:**
- Database administrators
- Software developers
- Business analysts
- Data architects
- Quality assurance engineers
- Business stakeholders

### 1.2 Scope

This data dictionary covers:
- All data elements stored in system databases
- Data exchanged between system components
- External interface data specifications
- Reference data and lookup values
- Data validation rules and constraints
- Business definitions and context

**Out of Scope:**
- Application user interface specifications
- System configuration parameters
- Temporary or transient data
- Log files and audit trails (unless business-relevant)

### 1.3 Conventions

**Data Type Notation:**
- **VARCHAR(n)**: Variable-length character string, maximum n characters
- **CHAR(n)**: Fixed-length character string, exactly n characters
- **INT**: 32-bit integer
- **BIGINT**: 64-bit integer
- **DECIMAL(p,s)**: Decimal number with p total digits, s decimal places
- **DATETIME**: Date and time value
- **BIT**: Boolean value (0/1, True/False)

**Constraint Notation:**
- **PK**: Primary Key
- **FK**: Foreign Key
- **NN**: Not Null
- **UQ**: Unique
- **CK**: Check Constraint
- **DF**: Default Value

**Field Specification Format:**
```
Data Element Name
├── Alias(es): [Alternative names]
├── Definition: [Business definition]
├── Data Type: [Technical specification]
├── Constraints: [Validation rules]
├── Source: [Data origin]
├── Usage: [Where/how used]
└── Examples: [Sample values]
```

---

## 2. Data Element Specifications

### 2.1 Core Business Data

#### Customer Data Elements

##### CustomerId
- **Aliases**: Customer Number, CustID
- **Definition**: Unique identifier assigned to each customer account in the system
- **Data Type**: INT, IDENTITY(1,1)
- **Constraints**: PK, NN, Auto-generated
- **Source**: System-generated upon customer registration
- **Usage**: Primary reference for all customer-related transactions and data
- **Examples**: 1001, 1002, 1003
- **Business Rules**: 
  - Automatically assigned in sequential order
  - Cannot be modified once assigned
  - Used as foreign key in related tables

##### FirstName
- **Aliases**: Given Name, First Name
- **Definition**: Customer's legal first name as provided during registration
- **Data Type**: NVARCHAR(50)
- **Constraints**: NN, No leading/trailing spaces
- **Source**: Customer input during registration or profile update
- **Usage**: Customer identification, personalization, legal documents
- **Examples**: "John", "Mary", "Mohammed", "李"
- **Business Rules**:
  - Minimum 1 character, maximum 50 characters
  - Must contain at least one alphabetic character
  - Special characters (apostrophes, hyphens) allowed
  - Leading and trailing spaces automatically trimmed

##### LastName
- **Aliases**: Surname, Family Name, Last Name
- **Definition**: Customer's legal last name or family name
- **Data Type**: NVARCHAR(50)
- **Constraints**: NN, No leading/trailing spaces
- **Source**: Customer input during registration or profile update
- **Usage**: Customer identification, sorting, legal documents
- **Examples**: "Smith", "O'Connor", "Van Der Berg", "王"
- **Business Rules**:
  - Minimum 1 character, maximum 50 characters
  - Must contain at least one alphabetic character
  - Special characters (apostrophes, hyphens, spaces) allowed
  - Leading and trailing spaces automatically trimmed

##### EmailAddress
- **Aliases**: Email, Email Address, Contact Email
- **Definition**: Customer's primary email address for communication and authentication
- **Data Type**: NVARCHAR(100)
- **Constraints**: NN, UQ, Email format validation
- **Source**: Customer input during registration
- **Usage**: User authentication, communications, password reset
- **Examples**: "john.smith@example.com", "user123@domain.org"
- **Business Rules**:
  - Must be unique across all customer records
  - Must follow valid email format (contains @ and domain)
  - Case-insensitive for uniqueness checking
  - Stored in lowercase format
  - Cannot be empty or null

##### PhoneNumber
- **Aliases**: Phone, Mobile Number, Contact Number
- **Definition**: Customer's primary phone number for contact purposes
- **Data Type**: NVARCHAR(20)
- **Constraints**: NULL allowed, Phone format validation
- **Source**: Customer input during registration or profile update
- **Usage**: Customer support contact, delivery coordination, verification
- **Examples**: "+1-555-123-4567", "555.123.4567", "15551234567"
- **Business Rules**:
  - Optional field (can be null)
  - International format preferred but not required
  - Minimum 10 digits (excluding formatting characters)
  - Formatting characters (spaces, dashes, parentheses) allowed
  - System normalizes format for storage

##### DateOfBirth
- **Aliases**: DOB, Birth Date, Birthday
- **Definition**: Customer's date of birth for age verification and personalization
- **Data Type**: DATE
- **Constraints**: NULL allowed, Must be past date, Age >= 13
- **Source**: Customer input during registration or profile update
- **Usage**: Age verification, birthday promotions, legal compliance
- **Examples**: "1990-05-15", "1985-12-03", "2000-01-01"
- **Business Rules**:
  - Optional field (can be null)
  - Must be a valid date in the past
  - Customer must be at least 13 years old (COPPA compliance)
  - Cannot be more than 120 years in the past
  - Used to calculate current age

#### Product Data Elements

##### ProductId
- **Aliases**: Product Number, SKU ID, Item ID
- **Definition**: Unique identifier for each product in the catalog
- **Data Type**: INT, IDENTITY(1,1)
- **Constraints**: PK, NN, Auto-generated
- **Source**: System-generated when product is created
- **Usage**: Product identification, inventory tracking, order processing
- **Examples**: 10001, 10002, 10003
- **Business Rules**:
  - Automatically assigned in sequential order
  - Cannot be modified once assigned
  - Remains constant throughout product lifecycle

##### ProductName
- **Aliases**: Product Title, Item Name
- **Definition**: Descriptive name of the product as displayed to customers
- **Data Type**: NVARCHAR(100)
- **Constraints**: NN, Unique within category
- **Source**: Product manager input during product creation
- **Usage**: Product display, search, customer communication
- **Examples**: "Wireless Bluetooth Headphones", "Cotton T-Shirt - Blue"
- **Business Rules**:
  - Must be unique within the same product category
  - Minimum 5 characters, maximum 100 characters
  - Should be descriptive and customer-friendly
  - Special characters allowed except < > & "

##### ProductCode
- **Aliases**: SKU, Product SKU, Item Code
- **Definition**: Unique alphanumeric code for product identification and inventory
- **Data Type**: NVARCHAR(50)
- **Constraints**: NN, UQ, Alphanumeric format
- **Source**: Product manager or system-generated using naming convention
- **Usage**: Inventory management, barcode generation, supplier communication
- **Examples**: "ELC-HDN-001", "CLT-TSH-BLU-M", "ACC-CHG-USB-C"
- **Business Rules**:
  - Must be unique across all products
  - Alphanumeric characters only (A-Z, 0-9, hyphen allowed)
  - Follows company naming convention: [Category]-[Type]-[Variant]
  - Cannot be modified once assigned
  - Minimum 6 characters, maximum 50 characters

##### Price
- **Aliases**: Unit Price, Selling Price, Cost
- **Definition**: Current selling price of the product in base currency
- **Data Type**: DECIMAL(10,2)
- **Constraints**: NN, CK (>= 0), Two decimal places
- **Source**: Product manager input based on pricing strategy
- **Usage**: Price display, order calculation, revenue reporting
- **Examples**: 29.99, 199.00, 1499.95
- **Business Rules**:
  - Must be non-negative (>= 0.00)
  - Stored with exactly 2 decimal places
  - Price changes tracked in price history table
  - Zero price allowed for promotional items
  - Currency assumed to be base system currency (USD)

##### StockQuantity
- **Aliases**: Inventory Level, Available Stock, Qty Available
- **Definition**: Current number of units available for sale
- **Data Type**: INT
- **Constraints**: NN, CK (>= 0), Default 0
- **Source**: Inventory management system updates
- **Usage**: Inventory tracking, availability display, reorder alerts
- **Examples**: 0, 25, 150, 1000
- **Business Rules**:
  - Cannot be negative
  - Automatically decremented when orders are placed
  - Zero indicates out of stock
  - Triggers reorder alert when below reorder level
  - Updated in real-time with inventory transactions

#### Order Data Elements

##### OrderId
- **Aliases**: Order Number, Transaction ID
- **Definition**: Unique identifier for each customer order
- **Data Type**: INT, IDENTITY(1,1)
- **Constraints**: PK, NN, Auto-generated
- **Source**: System-generated when order is created
- **Usage**: Order tracking, customer service, reporting
- **Examples**: 5001, 5002, 5003
- **Business Rules**:
  - Automatically assigned in sequential order
  - Cannot be modified once assigned
  - Used for order tracking and customer communication

##### OrderDate
- **Aliases**: Order Timestamp, Purchase Date, Transaction Date
- **Definition**: Date and time when the order was placed by the customer
- **Data Type**: DATETIME2
- **Constraints**: NN, Default GETUTCDATE()
- **Source**: System timestamp when order is submitted
- **Usage**: Order tracking, reporting, customer service
- **Examples**: "2024-01-15 14:30:25", "2024-01-15 09:15:00"
- **Business Rules**:
  - Automatically set to current UTC time when order is created
  - Cannot be modified after order creation
  - Used for order aging and delivery time calculations
  - Stored in UTC format, displayed in customer's timezone

##### OrderStatus
- **Aliases**: Status, Order State, Processing Status
- **Definition**: Current status of the order in the fulfillment process
- **Data Type**: NVARCHAR(20)
- **Constraints**: NN, CK (Valid status values), Default 'PENDING'
- **Source**: System updates based on order processing workflow
- **Usage**: Order tracking, customer communication, workflow management
- **Examples**: "PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"
- **Business Rules**:
  - Must be one of predefined status values
  - Status transitions follow defined workflow rules
  - Status history maintained for audit purposes
  - Customer notifications triggered on status changes

**Valid Order Status Values:**
| Status | Description | Next Allowed Status |
|--------|-------------|-------------------|
| PENDING | Order placed, awaiting payment | CONFIRMED, CANCELLED |
| CONFIRMED | Payment confirmed, awaiting fulfillment | SHIPPED, CANCELLED |
| SHIPPED | Order shipped to customer | DELIVERED |
| DELIVERED | Order delivered to customer | (Final status) |
| CANCELLED | Order cancelled | (Final status) |

##### TotalAmount
- **Aliases**: Order Total, Final Amount, Grand Total
- **Definition**: Total monetary amount for the order including taxes and fees
- **Data Type**: DECIMAL(10,2)
- **Constraints**: NN, CK (>= 0), Two decimal places
- **Source**: Calculated from order items, taxes, and fees
- **Usage**: Payment processing, financial reporting, customer display
- **Examples**: 49.99, 125.47, 1299.95
- **Business Rules**:
  - Must be non-negative
  - Calculated as sum of line items + taxes + shipping - discounts
  - Cannot be manually edited (always calculated)
  - Changes only when order items are modified (before confirmation)
  - Stored with exactly 2 decimal places

### 2.2 Reference Data

#### Category Data Elements

##### CategoryId
- **Aliases**: Category Number, Cat ID
- **Definition**: Unique identifier for product categories
- **Data Type**: INT, IDENTITY(1,1)
- **Constraints**: PK, NN, Auto-generated
- **Source**: System-generated when category is created
- **Usage**: Product categorization, navigation, filtering
- **Examples**: 1, 2, 3, 10, 25
- **Business Rules**:
  - Automatically assigned in sequential order
  - Cannot be modified once assigned
  - Used to organize products hierarchically

##### CategoryName
- **Aliases**: Category Title, Category Label
- **Definition**: Descriptive name of the product category
- **Data Type**: NVARCHAR(50)
- **Constraints**: NN, UQ
- **Source**: Product manager input during category creation
- **Usage**: Category display, navigation, product organization
- **Examples**: "Electronics", "Clothing", "Home & Garden", "Sports & Outdoors"
- **Business Rules**:
  - Must be unique across all categories
  - Minimum 3 characters, maximum 50 characters
  - Should be descriptive and customer-friendly
  - Cannot contain special characters except spaces and ampersands

##### ParentCategoryId
- **Aliases**: Parent Category, Parent ID
- **Definition**: Reference to parent category for hierarchical organization
- **Data Type**: INT
- **Constraints**: NULL allowed, FK to CategoryId
- **Source**: Category manager input during category creation
- **Usage**: Category hierarchy, navigation breadcrumbs
- **Examples**: NULL (top-level), 1, 5, 10
- **Business Rules**:
  - NULL indicates top-level category
  - Must reference valid existing category
  - Cannot create circular references
  - Maximum hierarchy depth of 4 levels

#### Country Data Elements

##### CountryId
- **Aliases**: Country Code ID
- **Definition**: Unique identifier for countries and territories
- **Data Type**: INT, IDENTITY(1,1)
- **Constraints**: PK, NN, Auto-generated
- **Source**: System-generated from reference data initialization
- **Usage**: Address validation, shipping rules, tax calculation
- **Examples**: 1, 2, 3, 50, 100
- **Business Rules**:
  - Static reference data loaded during system initialization
  - Based on ISO 3166 country codes
  - Cannot be modified by regular users

##### CountryName
- **Aliases**: Country
- **Definition**: Full name of the country or territory
- **Data Type**: NVARCHAR(100)
- **Constraints**: NN, UQ
- **Source**: ISO 3166 country names
- **Usage**: Address display, country selection
- **Examples**: "United States", "Canada", "United Kingdom", "Germany"
- **Business Rules**:
  - Must be unique
  - Official ISO 3166 country names preferred
  - Cannot be empty or null

##### CountryCode
- **Aliases**: ISO Code, Country Abbreviation
- **Definition**: Two-letter ISO 3166 alpha-2 country code
- **Data Type**: CHAR(2)
- **Constraints**: NN, UQ, Uppercase
- **Source**: ISO 3166 alpha-2 codes
- **Usage**: Integration with external services, compact display
- **Examples**: "US", "CA", "GB", "DE", "FR"
- **Business Rules**:
  - Must be valid ISO 3166 alpha-2 code
  - Always stored in uppercase
  - Must be unique across all countries
  - Used for international shipping and tax rules

### 2.3 System Data

#### Audit Data Elements

##### AuditId
- **Aliases**: Audit Record ID, Log ID
- **Definition**: Unique identifier for each audit trail record
- **Data Type**: BIGINT, IDENTITY(1,1)
- **Constraints**: PK, NN, Auto-generated
- **Source**: System-generated for each audited operation
- **Usage**: Audit trail tracking, compliance reporting
- **Examples**: 1000001, 1000002, 1000003
- **Business Rules**:
  - Automatically assigned for all audited operations
  - Cannot be modified or deleted
  - Used for forensic analysis and compliance

##### UserId
- **Aliases**: User ID, Actor ID
- **Definition**: Identifier of the user who performed the audited action
- **Data Type**: INT
- **Constraints**: NN, FK to User table
- **Source**: Current authenticated user context
- **Usage**: User activity tracking, responsibility assignment
- **Examples**: 1001, 1002, 2001
- **Business Rules**:
  - Must reference valid user account
  - Cannot be null (system user used for automated actions)
  - Immutable once recorded

##### ActionType
- **Aliases**: Operation Type, Action
- **Definition**: Type of operation performed (INSERT, UPDATE, DELETE)
- **Data Type**: CHAR(1)
- **Constraints**: NN, CK (I, U, D)
- **Source**: Database trigger or application logic
- **Usage**: Audit filtering, compliance reporting
- **Examples**: "I", "U", "D"
- **Business Rules**:
  - I = Insert (record creation)
  - U = Update (record modification)  
  - D = Delete (record removal)
  - Must be one of the three valid values

##### Timestamp
- **Aliases**: Action Time, Event Time
- **Definition**: Date and time when the audited action occurred
- **Data Type**: DATETIME2
- **Constraints**: NN, Default GETUTCDATE()
- **Source**: System timestamp when action is performed
- **Usage**: Audit chronology, compliance reporting
- **Examples**: "2024-01-15 14:30:25.123", "2024-01-15 09:15:00.456"
- **Business Rules**:
  - Automatically set to current UTC time
  - Cannot be modified after creation
  - High precision for chronological ordering

---

## 3. Data Structures

### 3.1 Record Structures

#### Customer Record
```
Customer = {
    CustomerId: INT [PK, NN, IDENTITY]
    FirstName: NVARCHAR(50) [NN]
    LastName: NVARCHAR(50) [NN]
    EmailAddress: NVARCHAR(100) [NN, UQ]
    PhoneNumber: NVARCHAR(20) [NULL]
    DateOfBirth: DATE [NULL]
    AddressLine1: NVARCHAR(100) [NULL]
    AddressLine2: NVARCHAR(100) [NULL]
    City: NVARCHAR(50) [NULL]
    StateProvince: NVARCHAR(50) [NULL]
    PostalCode: NVARCHAR(20) [NULL]
    CountryId: INT [NULL, FK→Country.CountryId]
    IsActive: BIT [NN, Default=1]
    CreatedDate: DATETIME2 [NN, Default=GETUTCDATE()]
    ModifiedDate: DATETIME2 [NN, Default=GETUTCDATE()]
}
```

#### Product Record
```
Product = {
    ProductId: INT [PK, NN, IDENTITY]
    ProductName: NVARCHAR(100) [NN]
    ProductCode: NVARCHAR(50) [NN, UQ]
    Description: NVARCHAR(MAX) [NULL]
    CategoryId: INT [NN, FK→Category.CategoryId]
    Price: DECIMAL(10,2) [NN, CK≥0]
    StockQuantity: INT [NN, CK≥0, Default=0]
    ReorderLevel: INT [NN, Default=10]
    IsActive: BIT [NN, Default=1]
    CreatedDate: DATETIME2 [NN, Default=GETUTCDATE()]
    ModifiedDate: DATETIME2 [NN, Default=GETUTCDATE()]
}
```

#### Order Record
```
Order = {
    OrderId: INT [PK, NN, IDENTITY]
    CustomerId: INT [NN, FK→Customer.CustomerId]
    OrderDate: DATETIME2 [NN, Default=GETUTCDATE()]
    OrderStatus: NVARCHAR(20) [NN, CK∈ValidStatuses, Default='PENDING']
    TotalAmount: DECIMAL(10,2) [NN, CK≥0]
    TaxAmount: DECIMAL(10,2) [NN, CK≥0, Default=0]
    ShippingAmount: DECIMAL(10,2) [NN, CK≥0, Default=0]
    BillingAddressId: INT [NN, FK→Address.AddressId]
    ShippingAddressId: INT [NN, FK→Address.AddressId]
    CreatedDate: DATETIME2 [NN, Default=GETUTCDATE()]
    ModifiedDate: DATETIME2 [NN, Default=GETUTCDATE()]
}
```

### 3.2 Data Flows

#### Customer Registration Flow
```
CustomerRegistrationRequest = {
    FirstName: NVARCHAR(50) [Required]
    LastName: NVARCHAR(50) [Required]
    EmailAddress: NVARCHAR(100) [Required, Email Format]
    Password: NVARCHAR(100) [Required, Min Length 8]
    PhoneNumber: NVARCHAR(20) [Optional]
    AgreeToTerms: BIT [Required, Must be True]
}

CustomerRegistrationResponse = {
    CustomerId: INT [Generated]
    Status: NVARCHAR(20) [Success/Error]
    Message: NVARCHAR(500) [Status Description]
    VerificationRequired: BIT [Email Verification Flag]
}
```

#### Order Submission Flow
```
OrderSubmissionRequest = {
    CustomerId: INT [Required, Valid Customer]
    OrderItems: Array<OrderItem> [Required, Min 1 Item]
    BillingAddress: Address [Required]
    ShippingAddress: Address [Required]
    PaymentInformation: PaymentInfo [Required]
}

OrderItem = {
    ProductId: INT [Required, Valid Product]
    Quantity: INT [Required, Min 1, Max 99]
    UnitPrice: DECIMAL(10,2) [Auto-calculated]
}

OrderSubmissionResponse = {
    OrderId: INT [Generated if successful]
    OrderStatus: NVARCHAR(20) [Initial status]
    TotalAmount: DECIMAL(10,2) [Calculated total]
    EstimatedDeliveryDate: DATE [Calculated]
    Status: NVARCHAR(20) [Success/Error]
    ErrorMessages: Array<NVARCHAR(500)> [If errors occurred]
}
```

### 3.3 Complex Data Types

#### Address Structure
```
Address = {
    AddressLine1: NVARCHAR(100) [Required]
    AddressLine2: NVARCHAR(100) [Optional]
    City: NVARCHAR(50) [Required]
    StateProvince: NVARCHAR(50) [Required for US/CA]
    PostalCode: NVARCHAR(20) [Required]
    CountryId: INT [Required, FK→Country.CountryId]
    AddressType: NVARCHAR(20) [Billing/Shipping/Both]
}
```

#### Payment Information Structure
```
PaymentInfo = {
    PaymentMethod: NVARCHAR(20) [CreditCard/DebitCard/PayPal/etc.]
    CardNumber: NVARCHAR(20) [Encrypted, PCI Compliance]
    ExpirationMonth: INT [1-12]
    ExpirationYear: INT [Current year or later]
    SecurityCode: NVARCHAR(4) [Not stored, validation only]
    CardholderName: NVARCHAR(100) [As appears on card]
    BillingAddressId: INT [FK→Address.AddressId]
}
```

---

## 4. Validation Rules

### 4.1 Field Validation

#### String Field Validation
- **Length Validation**: All string fields must respect minimum and maximum length constraints
- **Character Set Validation**: Only allowed characters based on field purpose
- **Format Validation**: Specific formats for structured data (email, phone, etc.)
- **Encoding Validation**: UTF-8 encoding for international character support

#### Numeric Field Validation
- **Range Validation**: All numeric fields must be within specified ranges
- **Precision Validation**: Decimal fields must respect precision and scale
- **Currency Validation**: Currency amounts must be non-negative with 2 decimal places
- **Integer Validation**: Integer fields must be whole numbers within range

#### Date/Time Field Validation
- **Format Validation**: Dates must be in valid ISO format
- **Range Validation**: Dates must be within reasonable business ranges
- **Business Logic**: Birth dates must indicate age >= 13, order dates cannot be future
- **Timezone Handling**: All timestamps stored in UTC, displayed in user timezone

### 4.2 Business Rules

#### Customer Business Rules
1. **Email Uniqueness**: Email addresses must be unique across all active customers
2. **Age Requirement**: Customers must be at least 13 years old (COPPA compliance)
3. **Contact Information**: At least one contact method (email or phone) required
4. **Address Validation**: Addresses must be valid for the specified country
5. **Account Status**: Only active customers can place orders

#### Product Business Rules
1. **SKU Uniqueness**: Product codes must be unique across all products
2. **Pricing Rules**: Prices must be non-negative, special handling for promotional pricing
3. **Inventory Rules**: Stock cannot be negative, automatic reorder alerts
4. **Category Assignment**: Products must belong to exactly one leaf category
5. **Lifecycle Management**: Product status changes follow defined workflow

#### Order Business Rules
1. **Customer Authentication**: Orders can only be placed by authenticated customers
2. **Product Availability**: All ordered products must be in stock and active
3. **Payment Validation**: Payment information must be valid before order confirmation
4. **Address Requirements**: Both billing and shipping addresses required
5. **Status Workflow**: Order status changes must follow predefined workflow

### 4.3 Cross-Field Validation

#### Address Validation Rules
```sql
-- Postal code format validation based on country
CASE 
    WHEN CountryCode = 'US' THEN PostalCode LIKE '[0-9][0-9][0-9][0-9][0-9]'
         OR PostalCode LIKE '[0-9][0-9][0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]'
    WHEN CountryCode = 'CA' THEN PostalCode LIKE '[A-Z][0-9][A-Z] [0-9][A-Z][0-9]'
    WHEN CountryCode = 'GB' THEN LEN(PostalCode) BETWEEN 5 AND 8
    ELSE LEN(PostalCode) BETWEEN 3 AND 10
END
```

#### Order Validation Rules
```sql
-- Order total must equal sum of line items plus tax and shipping
TotalAmount = (
    SELECT SUM(Quantity * UnitPrice) FROM OrderItem WHERE OrderId = @OrderId
) + TaxAmount + ShippingAmount

-- Order cannot be modified after confirmation
IF OrderStatus IN ('CONFIRMED', 'SHIPPED', 'DELIVERED')
    THEN RAISE ERROR 'Order cannot be modified after confirmation'
```

#### Customer Validation Rules
```sql
-- Age calculation and validation
DATEDIFF(YEAR, DateOfBirth, GETDATE()) >= 13

-- Email format validation
EmailAddress LIKE '%@%.%' 
AND EmailAddress NOT LIKE '@%'
AND EmailAddress NOT LIKE '%@'
AND EmailAddress NOT LIKE '%.@%'
AND EmailAddress NOT LIKE '%@.%'
```

---

## 5. Data Relationships

### 5.1 Entity Relationships

#### Primary Relationships

**Customer ↔ Order** (One-to-Many)
- **Relationship**: One customer can place multiple orders
- **Foreign Key**: Order.CustomerId → Customer.CustomerId
- **Cardinality**: 1:N (mandatory customer, optional orders)
- **Business Rule**: Orders cannot exist without a customer

**Order ↔ OrderItem** (One-to-Many)
- **Relationship**: One order contains multiple line items
- **Foreign Key**: OrderItem.OrderId → Order.OrderId
- **Cardinality**: 1:N (mandatory order, at least one item)
- **Business Rule**: Orders must have at least one line item

**Product ↔ OrderItem** (One-to-Many)
- **Relationship**: One product can appear in multiple order items
- **Foreign Key**: OrderItem.ProductId → Product.ProductId
- **Cardinality**: 1:N (mandatory product, optional order items)
- **Business Rule**: Products must exist and be active to be ordered

**Category ↔ Product** (One-to-Many)
- **Relationship**: One category contains multiple products
- **Foreign Key**: Product.CategoryId → Category.CategoryId
- **Cardinality**: 1:N (mandatory category, optional products)
- **Business Rule**: Products must belong to exactly one category

#### Secondary Relationships

**Country ↔ Customer** (One-to-Many)
- **Relationship**: One country can have multiple customers
- **Foreign Key**: Customer.CountryId → Country.CountryId
- **Cardinality**: 1:N (optional country, optional customers)
- **Business Rule**: Country reference for address validation

**Category ↔ Category** (One-to-Many, Recursive)
- **Relationship**: Categories can have subcategories
- **Foreign Key**: Category.ParentCategoryId → Category.CategoryId
- **Cardinality**: 1:N (optional parent, optional children)
- **Business Rule**: Maximum hierarchy depth of 4 levels

### 5.2 Dependencies

#### Data Dependencies

**Order Processing Dependencies**:
1. Customer must exist and be active
2. Products must exist, be active, and have sufficient stock
3. Addresses must be valid for the specified country
4. Payment information must be validated

**Inventory Dependencies**:
1. Stock levels updated when orders are placed
2. Reorder alerts triggered when stock falls below threshold
3. Product availability affects ordering capability

**Audit Dependencies**:
1. All data changes must be logged to audit trail
2. User context required for all audited operations
3. Audit records cannot be modified or deleted

#### System Dependencies

**Reference Data Dependencies**:
- Countries and categories must be loaded before transactional data
- Lookup values must be consistent across all environments
- Reference data changes require careful migration planning

### 5.3 Hierarchies

#### Category Hierarchy
```
Electronics (CategoryId: 1)
├── Computers (CategoryId: 10, ParentCategoryId: 1)
│   ├── Laptops (CategoryId: 101, ParentCategoryId: 10)
│   ├── Desktops (CategoryId: 102, ParentCategoryId: 10)
│   └── Tablets (CategoryId: 103, ParentCategoryId: 10)
├── Audio (CategoryId: 11, ParentCategoryId: 1)
│   ├── Headphones (CategoryId: 111, ParentCategoryId: 11)
│   └── Speakers (CategoryId: 112, ParentCategoryId: 11)
└── Mobile Phones (CategoryId: 12, ParentCategoryId: 1)
    ├── Smartphones (CategoryId: 121, ParentCategoryId: 12)
    └── Accessories (CategoryId: 122, ParentCategoryId: 12)
```

#### Organizational Hierarchy
```
System Roles:
├── Administrator (Full system access)
├── Manager (Business operations access)
│   ├── Product Manager (Product catalog management)
│   ├── Order Manager (Order processing and fulfillment)
│   └── Customer Service (Customer support and inquiries)
└── User (Customer-facing operations)
    ├── Customer (Shopping and account management)
    └── Guest (Limited browsing access)
```

---

## 6. Data Standards

### 6.1 Naming Standards

#### Table Naming Standards
- Use PascalCase (e.g., `Customer`, `OrderItem`, `ProductCategory`)
- Use singular form (e.g., `Customer` not `Customers`)
- Be descriptive and business-meaningful
- Avoid abbreviations unless widely understood
- Maximum 50 characters

#### Column Naming Standards
- Use PascalCase (e.g., `FirstName`, `EmailAddress`, `OrderDate`)
- Primary keys: `[TableName]Id` (e.g., `CustomerId`, `ProductId`)
- Foreign keys: `[ReferencedTableName]Id` (e.g., `CustomerId`, `CategoryId`)
- Boolean columns: `Is[Condition]` (e.g., `IsActive`, `IsVerified`)
- Date/time columns: Include time component (e.g., `CreatedDate`, `ModifiedDate`)

#### Index Naming Standards
- Primary key indexes: `PK_[TableName]`
- Foreign key indexes: `FK_[ChildTable]_[ParentTable]`
- Unique indexes: `UQ_[TableName]_[Column(s)]`
- Non-clustered indexes: `IX_[TableName]_[Column(s)]`

#### Constraint Naming Standards
- Check constraints: `CK_[TableName]_[Column]_[Description]`
- Default constraints: `DF_[TableName]_[Column]`
- Unique constraints: `UQ_[TableName]_[Column(s)]`

### 6.2 Coding Standards

#### Data Type Standards
- **Text Data**: Use NVARCHAR for Unicode support unless ASCII-only is certain
- **Identifiers**: Use INT IDENTITY for primary keys, BIGINT for high-volume tables
- **Currency**: Use DECIMAL(10,2) for monetary values
- **Dates**: Use DATE for date-only, DATETIME2 for date/time with precision
- **Flags**: Use BIT for boolean values
- **Large Text**: Use NVARCHAR(MAX) for unlimited text

#### Default Value Standards
- **Created/Modified Dates**: DEFAULT GETUTCDATE()
- **Status Fields**: Appropriate initial status (e.g., 'PENDING', 'ACTIVE')
- **Boolean Fields**: DEFAULT 0 or 1 based on business logic
- **Numeric Fields**: DEFAULT 0 for quantities, NULL for optional calculations
- **Text Fields**: Generally NULL unless specific default required

#### NULL Handling Standards
- **Primary Keys**: Always NOT NULL
- **Required Business Data**: NOT NULL with appropriate defaults
- **Optional Data**: Allow NULL but handle gracefully in applications
- **Foreign Keys**: NULL allowed only if relationship is optional
- **Calculated Fields**: NOT NULL if always computable

### 6.3 Quality Standards

#### Data Quality Metrics
- **Completeness**: Required fields must be populated (target: 100%)
- **Accuracy**: Data must be correct and current (target: 99.5%)
- **Consistency**: Data format and values must be consistent (target: 99.9%)
- **Uniqueness**: Unique constraints must be enforced (target: 100%)
- **Timeliness**: Data must be current and up-to-date (target: real-time for critical data)

#### Data Validation Standards
- **Input Validation**: All data validated at entry point
- **Business Rule Validation**: Business rules enforced through constraints
- **Cross-Reference Validation**: Foreign key relationships maintained
- **Format Validation**: Consistent formats for structured data
- **Range Validation**: Numeric and date values within valid ranges

#### Data Maintenance Standards
- **Regular Cleanup**: Remove obsolete and orphaned data
- **Archival Process**: Move historical data to archive tables
- **Index Maintenance**: Regular reindexing and statistics updates
- **Audit Compliance**: Maintain complete audit trail for compliance
- **Backup Verification**: Regular backup testing and verification

---

## 7. Data Sources and Lineage

### Data Source Mapping

#### Customer Data Sources
| Data Element | Primary Source | Secondary Sources | Update Frequency |
|--------------|---------------|-------------------|------------------|
| Customer Profile | User Registration | Customer Service Updates | Real-time |
| Email Address | User Input | Admin Correction | Real-time |
| Address Information | User Input | Order Processing | On-demand |
| Phone Number | User Input | Customer Service | On-demand |

#### Product Data Sources
| Data Element | Primary Source | Secondary Sources | Update Frequency |
|--------------|---------------|-------------------|------------------|
| Product Information | Product Manager | Supplier Updates | Daily |
| Pricing Data | Pricing System | Manual Override | Real-time |
| Inventory Levels | Warehouse System | Manual Adjustment | Real-time |
| Product Images | Asset Management | External CDN | On-demand |

#### Order Data Sources
| Data Element | Primary Source | Secondary Sources | Update Frequency |
|--------------|---------------|-------------------|------------------|
| Order Details | E-commerce Platform | Customer Service | Real-time |
| Payment Information | Payment Gateway | Manual Processing | Real-time |
| Shipping Information | Logistics System | Carrier Updates | Near real-time |
| Order Status | Fulfillment System | Manual Updates | Real-time |

### Data Lineage Documentation

#### Customer Data Lineage
```
User Registration Form
    ↓ (Validation & Processing)
Customer Management Service
    ↓ (Database Insert/Update)
Customer Database Table
    ↓ (Replication)
Data Warehouse
    ↓ (ETL Processing)
Customer Analytics Reports
```

#### Order Data Lineage
```
Shopping Cart → Order Creation → Payment Processing → Order Confirmation
    ↓               ↓               ↓                   ↓
Cart Storage    Order Database   Payment Gateway     Order Database
    ↓               ↓               ↓                   ↓
Session Cache   OLTP Database   External System     OLTP Database
    ↓               ↓               ↓                   ↓
    (Cleanup)   Data Warehouse  Audit Logs      Order Reports
```

#### Product Data Lineage
```
Supplier Systems → Product Import → Data Validation → Product Database
    ↓                  ↓               ↓               ↓
CSV/API Feeds     Import Service   Business Rules   Product Catalog
    ↓                  ↓               ↓               ↓
External Data     Staging Tables   Error Handling   E-commerce Site
```

---

## 8. Appendix

### A. Data Element Summary

| Category | Number of Elements | Examples |
|----------|-------------------|----------|
| Customer Data | 15 | CustomerId, FirstName, LastName, EmailAddress |
| Product Data | 12 | ProductId, ProductName, Price, StockQuantity |
| Order Data | 18 | OrderId, OrderDate, OrderStatus, TotalAmount |
| Reference Data | 8 | CategoryId, CountryId, CategoryName, CountryCode |
| System Data | 6 | AuditId, UserId, ActionType, Timestamp |
| **Total** | **59** | **All core business and system data elements** |

### B. Data Type Usage Summary

| Data Type | Usage Count | Percentage | Primary Use Cases |
|-----------|-------------|------------|------------------|
| INT | 18 | 30.5% | Identifiers, quantities, references |
| NVARCHAR | 25 | 42.4% | Names, descriptions, text data |
| DECIMAL | 8 | 13.6% | Currency, pricing, calculations |
| DATETIME2 | 4 | 6.8% | Timestamps, dates |
| BIT | 3 | 5.1% | Boolean flags, status indicators |
| CHAR | 1 | 1.7% | Fixed-length codes |

### C. Constraint Summary

| Constraint Type | Count | Examples |
|----------------|-------|----------|
| Primary Key (PK) | 12 | CustomerId, ProductId, OrderId |
| Foreign Key (FK) | 15 | Order.CustomerId, Product.CategoryId |
| Not Null (NN) | 45 | All required business fields |
| Unique (UQ) | 8 | EmailAddress, ProductCode |
| Check (CK) | 12 | Price >= 0, Status values |
| Default (DF) | 10 | CreatedDate, IsActive flags |

### D. Business Rule Summary

1. **Data Quality Rules**: 25 rules covering completeness, accuracy, consistency
2. **Security Rules**: 8 rules covering access control, data protection
3. **Business Process Rules**: 15 rules covering workflow, validation
4. **Integration Rules**: 6 rules covering external system interfaces
5. **Compliance Rules**: 4 rules covering regulatory requirements

### E. Validation Rule Summary

#### Email Validation Pattern
```regex
^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$
```

#### Phone Number Validation Patterns
```regex
US/Canada: ^\+?1?[-.\s]?\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}$
International: ^\+?[1-9]\d{1,14}$
```

#### Postal Code Validation Patterns
```regex
US: ^\d{5}(-\d{4})?$
Canada: ^[A-Z]\d[A-Z]\s\d[A-Z]\d$
UK: ^[A-Z]{1,2}\d[A-Z\d]?\s\d[A-Z]{2}$
```

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | [Date] | [Author] | Initial data dictionary creation |

---

## Review and Approval

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Data Architect | [Name] | [Date] | [Signature] |
| Database Administrator | [Name] | [Date] | [Signature] |
| Business Analyst | [Name] | [Date] | [Signature] |
| Development Lead | [Name] | [Date] | [Signature] |