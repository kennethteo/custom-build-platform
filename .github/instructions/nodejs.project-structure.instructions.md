---
applyTo: '**nodejs**'
description: 'Guidelines for building Node.js base applications'
---

# Project Coding Standards
## Folder Structure

- Use the following folder structure for Node.js projects:

```bash
apps/{Application Name}/
├── src/ ## Source code for the application
│   ├── controllers/ ## Controllers for handling requests
│   ├── models/ ## Mongoose models for MongoDB
│   ├── routes/ ## API routes
│   ├── services/ ## Business logic and service layer
│   ├── utils/ ## Utility functions and helpers
│   ├── config/ ## Configuration files (e.g., database connection)
│   ├── middlewares/ ## Custom middleware functions
│   └── app.js ## Main application file
├── tests/ ## Unit and integration tests
│   ├── controllers/ ## Tests for controllers
│   ├── models/ ## Tests for models
│   ├── routes/ ## Tests for routes
│   └── services/ ## Tests for services
├── .env ## Environment variables for local development
├── .gitignore ## Git ignore file
├── Dockerfile ## Dockerfile for containerization
├── .dockerignore ## Docker ignore file
├── package.json ## Project metadata and dependencies
├── package-lock.json ## Lock file for dependencies
└── README.md ## Project documentation
```

## OpenAPI/Swagger Specifications

- **Purpose**: Document APIs for better understanding, testing, and integration.
- **Implementation**:
  - Use the `swagger-jsdoc` or `@nestjs/swagger` library to generate OpenAPI specs.
  - Place the OpenAPI configuration in the `src/config/` folder.
  - Serve the API documentation at `/api-docs` using `swagger-ui-express`.

### Example Setup

1. **Install Dependencies**:
   ```bash
   npm install swagger-jsdoc swagger-ui-express
   ```

2. **Add Swagger Configuration**:
   Create a file `src/config/swagger.js`:
   ```javascript
   const swaggerJsDoc = require('swagger-jsdoc');

   const options = {
     definition: {
       openapi: '3.0.0',
       info: {
         title: 'API Documentation',
         version: '1.0.0',
         description: 'API information',
       },
     },
     apis: ['./src/routes/*.js'], // Path to the API docs
   };

   const swaggerSpec = swaggerJsDoc(options);

   module.exports = swaggerSpec;
   ```

3. **Serve Swagger UI**:
   Update `src/app.js`:
   ```javascript
   const swaggerUi = require('swagger-ui-express');
   const swaggerSpec = require('./config/swagger');

   app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
   ```

4. **Annotate Routes**:
   Add JSDoc comments in `src/routes/*.js`:
   ```javascript
   /**
    * @swagger
    * /tasks:
    *   get:
    *     summary: Retrieve a list of tasks
    *     responses:
    *       200:
    *         description: A list of tasks.
    */
   router.get('/tasks', taskController.getTasks);
   ```