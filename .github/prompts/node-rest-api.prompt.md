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

## Requirements

1. **Project Structure**:
   - Use the `app-templates/nodejs/` folder for the code.
    - Follow the folder structure and naming conventions as outlined in `nodejs.project-structure.instructions.md`.
   - Follow the coding standards in `nodejs.instructions.md`.

2. **API Details**:
   - The API should manage a resource called `tasks`.
   - Implement CRUD operations:
     - `GET /tasks`: Retrieve all tasks.
     - `GET /tasks/:id`: Retrieve a single task by ID.
     - `POST /tasks`: Create a new task.
     - `PUT /tasks/:id`: Update an existing task by ID.
     - `DELETE /tasks/:id`: Delete a task by ID.
   - Use JSON as the data format for requests and responses.

3. **Database**:
   - Use MongoDB as the database.
   - Include a `Task` model with the following fields:
     - `id`: Unique identifier (auto-generated).
     - `title`: String, required.
     - `description`: String, optional.
     - `completed`: Boolean, default `false`.

4. **Frameworks & Tools**:
   - Use Express.js for the API framework.
   - Use Mongoose for MongoDB integration.
   - Include validation for request payloads using a library like `Joi`.

5. **Environment Configuration**:
   - Use environment variables for database connection strings.
   - Include a `.env` file for local development.

6. **Dockerization**:
   - Create a `Dockerfile` and `.dockerignore` file for containerizing the application.
   - Follow the best practices in `containerization-docker-best-practices.instructions.md`.

7. **Testing**:
   - Write unit tests for all API endpoints using Jest.
   - Include a `test` script in `package.json`.

8. **Documentation**:
   - Add an OpenAPI (Swagger) specification for the API.
   - Include a `README.md` file with setup instructions, following the standards in `markdown.instructions.md`.

9. **Additional Requirements**:
   - Ensure the code is modular and adheres to the Single Responsibility Principle.
   - Use ES6+ syntax and follow Node.js best practices.
   - Include proper error handling and meaningful HTTP status codes.

10. **Output**:
    - Provide the complete folder structure and code for the API.
    - Include instructions for running the application locally and in Docker.
