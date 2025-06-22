# GitHub Copilot Instructions

## Project Overview

## Project Folder Structure
```bash
custom-build-platform/
├── .github/ ## GitHub configurations and workflows
├── app-templates/ ## Application templates (refer to this folder all code samples for different tech stacks )
    ├── dotnet/ ## .NET application templates (For instructions refer to ### dotnet Instructions)
    ├── java/ ## Java application templates (For instructions refer to ### Java Instructions)
    ├── nodejs/ ## Node.js application templates (For instructions refer to ### Node.js Instructions)
    ├── python/ ## Python application templates (For instructions refer to ### Python Instructions)
    ├── go/ ## Go application templates (For instructions refer to ### Go Instructions)
├── apps/ ## Custom applications built on the platform
├── docs/ ## Documentation for the project
├── infrastructure/ ## Infrastructure as Code (IaC) for the platform
├── devsecops/ ## DevSecOps configurations and scripts
├── .gitignore ## Git ignore file
├── README.md ## Project README file
├── LICENSE ## Project license file
```

## Technology Stack Instructions

### General Instructions
---
For API development, follow these guidelines:
- Use RESTful principles for API design.
- Ensure APIs are well-documented with OpenAPI specifications.
- Implement versioning for APIs to maintain backward compatibility.
- Use JSON as the primary data format for API responses.
- Implement proper error handling and return meaningful HTTP status codes.
- Ensure APIs are secure, using OAuth2 or JWT for authentication.

### Application Template Instructions
---
For each application template, follow these guidelines:
- Ensure the application is containerized using Docker.
- Use environment variables for configuration management.
- Implement logging and monitoring using industry-standard tools.
- Follow best practices for the specific programming language and framework used.

### Node.js Instructions
---
Coding standards, domain knowledge, and preferences that AI should follow.

### dotnet Instructions
---
Coding standards, domain knowledge, and preferences that AI should follow.

### Python Instructions
---
Coding standards, domain knowledge, and preferences that AI should follow.

### Java Instructions
---
Coding standards, domain knowledge, and preferences that AI should follow.

### Go Instructions
---
Coding standards, domain knowledge, and preferences that AI should follow.