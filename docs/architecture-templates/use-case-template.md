# Use Case Template

## Overview

This template provides a structured format for documenting use cases in software development and system analysis. Use cases describe how users interact with a system to achieve specific goals, making them essential for requirements gathering and system design.

---

## Template Structure

### Use Case Name

[Insert a clear, descriptive name for the use case using action verbs]

### Use Case ID

[Insert a unique identifier for the use case (e.g., UC-001)]

### Version

[Insert the version of the use case (e.g., 1.0)]

### Author

[Insert the name of the author]

### Date

[Insert the date of creation/last update]

### Description

[Provide a brief, clear description of what the use case accomplishes]

### Actors

- **Primary Actor:** [The main user or system that initiates this use case]
- **Secondary Actors:** [Other users, systems, or external entities involved]

### Preconditions

[List conditions that must be true before the use case can be executed]

### Postconditions

**Success Postconditions:**
[List the expected outcomes when the use case completes successfully]

**Failure Postconditions:**
[List the expected state when the use case fails]

### Basic Flow

1. [Describe the first step of the main success scenario]
2. [Describe the second step]
3. [Continue until the basic flow is complete]
4. [Include decision points and branching where applicable]

### Alternate Flows

#### Alternate Flow 1: [Name of alternate scenario]

**Condition:** [When this alternate flow occurs]
**Steps:**
1. [Describe the alternate steps]
2. [Continue with alternate flow]
3. [Return to main flow or end]

#### Alternate Flow 2: [Name of another alternate scenario]

**Condition:** [When this alternate flow occurs]
**Steps:**
1. [Describe the alternate steps]
2. [Continue with alternate flow]
3. [Return to main flow or end]

### Exceptions

#### Exception 1: [Name of exception]
- **Trigger:** [What causes this exception]
- **Response:** [How the system handles this exception]

#### Exception 2: [Name of another exception]
- **Trigger:** [What causes this exception]
- **Response:** [How the system handles this exception]

### Special Requirements

#### Non-Functional Requirements
- **Performance:** [Response time, throughput requirements]
- **Security:** [Authentication, authorization, data protection]
- **Usability:** [User experience considerations]
- **Reliability:** [Availability, fault tolerance requirements]

#### Technical Constraints
- [List any technical limitations or constraints]

### Business Rules

- [List any business rules that apply to this use case]
- [Include validation rules, business logic constraints]

### Related Artifacts

- **Use Cases:** [Links to related use cases]
- **User Stories:** [Links to corresponding user stories]
- **Requirements:** [Links to functional/non-functional requirements]
- **Diagrams:** [Links to sequence diagrams, activity diagrams, etc.]

### Notes

[Additional notes, assumptions, or comments related to this use case]

---

## Examples

### Example 1: User Login

#### Use Case Name
User Login

#### Use Case ID
UC-001

#### Version
1.2

#### Author
System Analyst

#### Date
2024-01-15

#### Description
This use case describes how a registered user logs into the system to access their account and personal features.

#### Actors
- **Primary Actor:** Registered User
- **Secondary Actors:** Authentication Service, Audit System

#### Preconditions
- User has a valid account in the system
- User has access to the login page
- System is operational

#### Postconditions
**Success Postconditions:**
- User is authenticated and logged into the system
- User session is created and stored
- User is redirected to their dashboard
- Login event is logged for audit purposes

**Failure Postconditions:**
- User remains unauthenticated
- Error message is displayed
- Failed login attempt is logged

#### Basic Flow
1. User navigates to the login page
2. System displays the login form with username and password fields
3. User enters their username and password
4. User clicks the "Login" button
5. System validates the credentials against the user database
6. System creates a new user session
7. System redirects the user to their dashboard
8. System logs the successful login event

#### Alternate Flows

##### Alternate Flow 1: Remember Me Option
**Condition:** User selects "Remember Me" checkbox
**Steps:**
1. User checks the "Remember Me" checkbox before logging in
2. After successful authentication (step 6 in basic flow)
3. System creates a persistent authentication token
4. System stores the token in a secure cookie
5. Continue with steps 7-8 of basic flow

##### Alternate Flow 2: First-Time Login
**Condition:** User is logging in for the first time
**Steps:**
1-6. Follow basic flow steps 1-6
7. System detects first-time login
8. System redirects user to profile setup page
9. System prompts user to complete their profile
10. After profile completion, redirect to dashboard

#### Exceptions

##### Exception 1: Invalid Credentials
- **Trigger:** User enters incorrect username or password
- **Response:** 
  1. System displays "Invalid username or password" error message
  2. System clears the password field
  3. System increments failed login attempt counter
  4. System logs the failed attempt
  5. Return to step 2 of basic flow

##### Exception 2: Account Locked
- **Trigger:** User has exceeded maximum login attempts
- **Response:**
  1. System displays "Account temporarily locked" message
  2. System sends unlock notification to user's email
  3. System logs the lockout event
  4. Use case ends

##### Exception 3: System Unavailable
- **Trigger:** Authentication service is down
- **Response:**
  1. System displays "Service temporarily unavailable" message
  2. System logs the system error
  3. Use case ends

#### Special Requirements

##### Non-Functional Requirements
- **Performance:** Login process must complete within 3 seconds
- **Security:** Passwords must be encrypted during transmission and storage
- **Usability:** Error messages must be clear and helpful
- **Reliability:** System must be available 99.9% of the time

##### Technical Constraints
- Must support all major web browsers
- Must work on mobile devices
- Must integrate with existing LDAP authentication

#### Business Rules
- Users must wait 15 minutes after account lockout before attempting to login again
- Password must meet complexity requirements (minimum 8 characters, special characters, etc.)
- User sessions expire after 30 minutes of inactivity

#### Related Artifacts
- **Use Cases:** UC-002 (User Registration), UC-003 (Password Reset)
- **User Stories:** US-001 (User Login Story)
- **Requirements:** REQ-SEC-001 (Authentication Requirements)
- **Diagrams:** Login Sequence Diagram, Authentication Flow Diagram

#### Notes
- Consider implementing multi-factor authentication in future versions
- Monitor login patterns for security anomalies
- Password complexity requirements may need to be configurable

---

### Example 2: Online Purchase

#### Use Case Name
Complete Online Purchase

#### Use Case ID
UC-015

#### Version
2.1

#### Author
Business Analyst

#### Date
2024-01-20

#### Description
This use case describes the process of a customer completing a purchase in an e-commerce system, from cart review to order confirmation.

#### Actors
- **Primary Actor:** Customer
- **Secondary Actors:** Payment Gateway, Inventory System, Order Management System, Email Service

#### Preconditions
- Customer has items in their shopping cart
- Customer has a registered account or proceeds as guest
- Selected items are in stock
- Payment gateway is operational

#### Postconditions
**Success Postconditions:**
- Order is created and confirmed
- Payment is processed successfully
- Inventory is updated
- Confirmation email is sent to customer
- Customer receives order number

**Failure Postconditions:**
- No order is created
- No payment is charged
- Cart items remain unchanged
- Customer is informed of the failure reason

#### Basic Flow
1. Customer reviews items in shopping cart
2. Customer clicks "Proceed to Checkout"
3. System displays shipping address form
4. Customer enters or confirms shipping address
5. System displays available shipping options
6. Customer selects preferred shipping method
7. System displays payment form
8. Customer enters payment information
9. Customer reviews order summary
10. Customer clicks "Place Order"
11. System processes payment through payment gateway
12. System creates order record
13. System updates inventory levels
14. System sends confirmation email to customer
15. System displays order confirmation page with order number

#### Alternate Flows

##### Alternate Flow 1: Guest Checkout
**Condition:** Customer chooses to checkout without creating account
**Steps:**
1-2. Follow basic flow
3. System displays guest checkout option
4. Customer selects "Checkout as Guest"
5. System requests email address for order notifications
6. Customer provides email address
7. Continue with step 3 of basic flow

##### Alternate Flow 2: Apply Discount Code
**Condition:** Customer has a discount code
**Steps:**
1. During order review (step 9 of basic flow)
2. Customer clicks "Apply Discount Code"
3. System displays discount code input field
4. Customer enters discount code
5. System validates and applies discount
6. System recalculates order total
7. Continue with step 10 of basic flow

#### Exceptions

##### Exception 1: Payment Declined
- **Trigger:** Payment gateway rejects the payment
- **Response:**
  1. System displays payment declined message
  2. System suggests trying another payment method
  3. Return to step 7 of basic flow
  4. Log payment failure for analysis

##### Exception 2: Item Out of Stock
- **Trigger:** Selected item becomes unavailable during checkout
- **Response:**
  1. System displays out-of-stock notification
  2. System removes unavailable item from cart
  3. System recalculates order total
  4. Return to step 1 of basic flow

##### Exception 3: Invalid Shipping Address
- **Trigger:** Shipping address cannot be validated
- **Response:**
  1. System displays address validation error
  2. System highlights problematic fields
  3. Return to step 3 of basic flow

#### Special Requirements

##### Non-Functional Requirements
- **Performance:** Checkout process must complete within 30 seconds
- **Security:** All payment data must be encrypted and PCI compliant
- **Usability:** Progress indicator must show checkout steps
- **Reliability:** System must handle high transaction volumes during peak times

##### Technical Constraints
- Must integrate with multiple payment gateways
- Must comply with international shipping regulations
- Must support multiple currencies

#### Business Rules
- Minimum order value may apply for free shipping
- Certain items may have shipping restrictions by region
- Payment authorization must be completed before order confirmation
- Inventory must be reserved during checkout process

#### Related Artifacts
- **Use Cases:** UC-012 (Add to Cart), UC-016 (Order Tracking), UC-017 (Cancel Order)
- **User Stories:** US-025 (Checkout Process), US-026 (Payment Processing)
- **Requirements:** REQ-PAY-001 (Payment Security), REQ-ORD-001 (Order Management)
- **Diagrams:** Checkout Flow Diagram, Payment Processing Sequence

#### Notes
- Consider implementing one-click purchase for returning customers
- Monitor checkout abandonment rates to identify process improvements
- Ensure compliance with local tax regulations for different regions

---

## Best Practices

### Writing Effective Use Cases

1. **Use Clear, Simple Language:** Write in plain language that stakeholders can understand
2. **Focus on User Goals:** Describe what the user wants to achieve, not just system functions
3. **Be Specific:** Include concrete steps and avoid vague descriptions
4. **Consider All Scenarios:** Include both success and failure paths
5. **Maintain Consistency:** Use consistent terminology throughout

### Common Mistakes to Avoid

- Writing use cases that are too technical or implementation-focused
- Forgetting to include exception handling and error scenarios
- Making use cases too granular or too high-level
- Not considering all types of users and their different needs
- Failing to update use cases when requirements change

### When to Use This Template

- **Requirements Analysis:** Capturing functional requirements from user perspective
- **System Design:** Understanding user interactions with the system
- **Testing:** Creating test scenarios based on user behavior
- **Documentation:** Providing clear specification for development teams
- **Stakeholder Communication:** Explaining system behavior to non-technical stakeholders
