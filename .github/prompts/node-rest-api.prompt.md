---
mode: agent
description: 'Create or Update Nodejs based REST API.'
tools: ['changes', 'codebase', 'editFiles', 'extensions', 'fetch', 'githubRepo', 'openSimpleBrowser', 'problems', 'runCommands', 'runTasks', 'search', 'searchResults', 'terminalLastCommand', 'terminalSelection', 'testFailure', 'usages', 'vscodeAPI']
---
# Create or Update Node.js REST API

Please create or update a Node.js REST API with the following specifications: 

## Inputs
- **API Title**: `${input:APITitle}`
- **API Description**: `${input:APIDescription}`
- **API Version**: `${input:APIVersion}`
- **Folder Path**: `${input:FolderPath}` (default: `app-templates/nodejs/`)

## Input Validation
If any of the required inputs are not provided or cannot be determined from the conversation history, ask the user to provide the missing information before proceeding with REST API generation.

If any of the inputs are not provided, refer to the README.md file to determine the default values for the API title, description, and version.

## Requirements

1. **Project Structure**:
   - Use the `app-templates/nodejs/` folder for the code.
   - Follow the folder structure and naming conventions as outlined in `nodejs.project-structure.instructions.md`.
   - Follow the coding standards in `nodejs.instructions.md`.

2. **Frameworks & Tools**:
   - Use Express.js for the API framework.
   - Use Mongoose for MongoDB integration.
   - Use Swagger for API documentation.
   - Use Jest for unit testing.
   - Use Joi for request validation and express-validator for business validation.

3. **Environment Configuration**:
   - Use environment variables for database connection strings.
   - Include a `.env` file for local development.

4. **Dockerization**:
   - Create a `Dockerfile` and `.dockerignore` file for containerizing the application.
   - Follow the best practices in `containerization-docker-best-practices.instructions.md`.

6. **Testing**:
   - Write unit tests for all API endpoints using Jest.
   - Include a `test` script in `package.json`.

7. **Documentation**:
   - Add an OpenAPI (Swagger) specification for the API.
   - Include a `README.md` file with setup instructions, following the standards in `markdown.instructions.md`.
   - Document the API endpoints, request/response formats, and example usage.
   - Use the `docs/` folder for API documentation and user stories.
   - Include architectural decisions and diagrams in the `docs/architecture/` folder.
   - Use the `docs/api-docs/` folder for OpenAPI/Swagger specifications.
   - Ensure the `README.md` file is updated with the API title, description, version, and usage instructions.
   - If the docs folder already exists, refer to the existing documentation structure and update it accordingly.

8. **Additional Requirements**:
   - Ensure the code is modular and adheres to the Single Responsibility Principle.
   - Use ES6+ syntax and follow Node.js best practices.
   - Include proper error handling and meaningful HTTP status codes.

9. **Output**:
    - Provide the complete folder structure and code for the API.
    - Include instructions for running the application locally and in Docker.
