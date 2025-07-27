---
applyTo: '**nodejs**'
description: 'Guidelines for building Node.js base applications'
---

# Project Coding Standards
## Folder Structure

- Use the following folder structure for Node.js projects:

```bash
apps/[application]/
├── src/ ## Source code for the application
│   ├── controllers/ ## Controllers for handling requests
│   ├── models/ ## Mongoose models for MongoDB
│   ├── routes/ ## API routes
│   ├── services/ ## Business logic and service layer
│   ├── utils/ ## Utility functions and helpers
│   ├── config/ ## Configuration files (e.g., database connection, OpenAPI/Swagger configuration)
│   ├── middlewares/ ## Custom middleware functions
│   ├── docs/ ## OpenAPI/Swagger specifications and documentation
│   └── app.js ## Main application file
├── tests/ ## Unit and integration tests
│   ├── controllers/ ## Tests for controllers
│   ├── models/ ## Tests for models
│   ├── routes/ ## Tests for routes
│   └── services/ ## Tests for services
├── docs/ ## Documentation for the application
│   ├── user-stories/ ## User stories and use cases
│   ├── architecture/ ## Architectural decisions and diagrams
│   │   ├── design/ ## Design documents and diagrams
│   │   ├── decisions/ ## Architectural decision records (ADRs)
│   │   └── diagrams/ ## Diagrams (e.g., flowcharts, sequence diagrams)
│   ├── api-docs/ ## API documentation (OpenAPI/Swagger)
│   └── README.md ## Application documentation 
├── .env ## Environment variables for local development
├── .gitignore ## Git ignore file
├── Dockerfile ## Dockerfile for containerization
├── .dockerignore ## Docker ignore file
├── package.json ## Project metadata and dependencies
├── package-lock.json ## Lock file for dependencies
└── README.md ## Project documentation
```