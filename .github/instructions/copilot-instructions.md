---
applyTo: '*'
description: 'Comprehensive best practices for creating optimized, secure, and efficient Docker images and managing containers. Covers multi-stage builds, image layer optimization, security scanning, and runtime best practices.'
---

# GitHub Copilot Instructions

## Project Overview

This project is a custom build platform designed to streamline the development and deployment of applications across various technology stacks. It includes application templates, infrastructure as code, DevSecOps configurations, and comprehensive documentation.

The platform supports multiple programming languages and frameworks, providing a consistent development experience. The project is structured to facilitate easy navigation and understanding of the components involved.

The platform is designed to be extensible, allowing developers to add new application templates and infrastructure components as needed. It emphasizes best practices in API development, security, and DevSecOps, ensuring that applications built on the platform are robust, secure, and maintainable.

# Project Structure
The project is organized into several key directories, each serving a specific purpose. Below is an overview of the project structure: 

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

# Instructions for GitHub Copilot
This section provides guidelines for using GitHub Copilot effectively within the project. It includes instructions for code reviews, coding standards, and specific instructions for different technology stacks.

## Code Review Instructions
---
When performing a code review, ensure the following:
- Validate that there are changes in the `README.md` file that match the changes in the pull request. If there are no changes, or if the changes do not match, then the pull request is not ready to be merged.
- Ensure that the values in the front matter are wrapped in single quotes.
- Ensure that the `description` field in the front matter is not empty.
- When reviewing a `.instructions.md` file, ensure there is an `applyTo` property in the front matter that specifies the technology stack the instructions apply to.
- Ensure that the `applyTo` property in the front matter is a valid technology stack supported by the project (e.g., `nodejs`, `dotnet`, `python`, `java`, `go`).
- Ensure that the `applyTo` property is used consistently across all `.instructions.md` files.
- Ensure that the `applyTo` property is used in the front matter of all `.instructions.md` files to indicate the technology stack the instructions apply to.

## General Coding Standards
---
- Follow the project's coding standards and best practices for each technology stack.
- Ensure that code is well-documented with comments and clear variable names.
- Use consistent formatting and indentation.
- Write unit tests for all new features and ensure existing tests pass.
- Use version control best practices, including meaningful commit messages and branching strategies.
- Ensure that all code adheres to the project's security guidelines, including input validation and sanitization.
- Use descriptive commit messages that explain the purpose of the changes.
- Ensure that all code is tested and passes the project's test suite before merging.
- Use pull requests for code reviews and ensure that all changes are reviewed by at least one other developer before merging.

## General Instructions
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
- Follow best practices for the specific programming language and framework used.`

API Security Guidelines:
- Implement input validation and sanitization to prevent injection attacks.
- Use HTTPS for all API endpoints.
- Implement rate limiting to prevent abuse of APIs.
- Use OAuth2 or JWT for secure authentication and authorization.
- Use WebAuthn for secure API access.
- Ensure sensitive data is encrypted both in transit and at rest.
- Use leveled api keys for different access levels (e.g., read-only, read-write).
- Implement authorization checks to ensure users have the necessary permissions for each API endpoint.
- Implement API Versioning to maintain backward compatibility.
- Considering Allowlisting IPs for sensitive APIs to restrict access.
- Check for OWASP Top Ten vulnerabilities and implement mitigations.
- Use API gateways for additional security features like throttling, caching, and logging.
- Implement proper error handling and return meaningful HTTP status codes, providing clear error messages. 

## Technology Stack Instructions
---
This section provides specific instructions for different technology stacks supported by the project. Each technology stack has its own set of coding standards, domain knowledge, and preferences that GitHub Copilot should follow when generating code or providing suggestions.

### General Instructions for All Technology Stacks
---
- Ensure that all code is modular and follows the Single Responsibility Principle.
- Use dependency injection where applicable to enhance testability and maintainability.
- Follow the project's naming conventions for files, classes, methods, and variables.
- Use version control best practices, including meaningful commit messages and branching strategies.
- Ensure that all code is tested and passes the project's test suite before merging.

### Node.js Instructions
---
- Refer to the `app-templates/nodejs/` folder for code samples and templates.
- go to nodejs.instructions.md for detailed instructions.

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
- All code templates will go to `app-templates/go/` folder
- go to go.instructions.md for detailed instructions.

### PostgreSQL Instructions
---
- All Dockerfiles and setup scripts will go to `infrastructure/postgresql/` folder
- go to postgresql.instructions.md for detailed instructions.