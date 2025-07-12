---
applyTo: 'app-templates/dotnet/**,**/*.cs,**/*.csproj,**/*.sln'
description: 'Guidelines for building .NET base applications'
---

# Project Coding Standards
## General Guidelines
- Use **camelCase** for variable and method names.
- Use **PascalCase** for class names.
- Use **UPPERCASE** for constants.
- Use **snake_case** for file names.
- Use **4 spaces** for indentation.
- Use **UTF-8** encoding for all files.

## Comments
- Use **XML documentation comments** for public APIs.
- Use **inline comments** sparingly and only when necessary to clarify complex logic.
- Use **TODO** comments to indicate areas that need further work or review.

## Naming Conventions
- Use descriptive names that clearly indicate the purpose of the variable, method, or class.
- Avoid abbreviations unless they are well-known acronyms.
- Use prefixes for interfaces (e.g., `IRepository`, `IService`).

## Code Structure
- Organize code into **namespaces** that reflect the project structure.
- Use **partial classes** to separate large classes into manageable files.
- Keep methods short and focused on a single responsibility.
- Use **regions** to group related methods or properties within a class.

## Error Handling
- Use **try-catch** blocks for exception handling.
- Log exceptions using a consistent logging framework.
- Avoid catching general exceptions; catch specific exceptions where possible.

## Testing
- Write unit tests for all public methods.
- Use **xUnit** or **NUnit** as the testing framework.
- Follow the **Arrange-Act-Assert** pattern for structuring tests. 
- Use **mocks** for dependencies in unit tests to isolate the code being tested.

## Dependency Management
- Use **NuGet** for managing external libraries.
- Keep dependencies up to date and remove unused packages.
- Use a **global.json** file to specify the SDK version for consistency across development environments.

## Code Reviews
- Conduct code reviews for all pull requests.
- Use a checklist to ensure all coding standards are met.
- Provide constructive feedback and suggestions for improvement.

## Documentation
- Maintain a **README.md** file with project overview, setup instructions, and usage examples.
- Use **Markdown** for documentation files.
- Keep documentation up to date with code changes.

## Version Control
- Use **Git** for version control.
- Follow a branching strategy (e.g., **Git Flow** or **GitHub Flow**).
- Write clear and descriptive commit messages. 
- Use pull requests for code reviews and merging changes.
- Tag releases with version numbers following **Semantic Versioning** (e.g., `v1.0.0`).

## Performance
- Optimize for performance where necessary, but prioritize readability and maintainability.
- Use profiling tools to identify performance bottlenecks.
- Avoid premature optimization; focus on writing clean and understandable code first.

## Security
- Follow secure coding practices to prevent common vulnerabilities (e.g., SQL injection, XSS).
- Use parameterized queries or ORM frameworks to interact with databases.
- Validate and sanitize user input to prevent injection attacks.
- Store sensitive information (e.g., API keys, connection strings) in secure locations (e.g., environment variables, secure vaults).
- Use HTTPS for all network communications.

## CI/CD
- Use a CI/CD pipeline to automate builds, tests, and deployments.
- Use tools like **GitHub Actions** or **Azure DevOps** for continuous integration and deployment.
- Ensure that the pipeline includes steps for building, testing, and deploying the application.
- Use versioning for deployments to track changes and rollbacks.

## Code Style
- Follow the **.editorconfig** file for consistent code style across the project.
- Use tools like **StyleCop** or **Roslyn Analyzers** to enforce coding standards.
- Format code automatically on save using IDE settings or pre-commit hooks. 

## Miscellaneous
- Use **async/await** for asynchronous programming to improve responsiveness.
- Avoid using magic numbers; define constants for any hard-coded values.
- Use **LINQ** for querying collections to improve readability and maintainability.
- Use **dependency injection** to manage dependencies and improve testability.
- Keep configuration settings in a separate file (e.g., `appsettings.json`) and use a configuration provider to access them.
- Use **feature flags** for enabling/disabling features without deploying new code.
- Use **code analysis tools** to identify potential issues and improve code quality (e.g., SonarQube, ReSharper).
- Use **Git hooks** to enforce coding standards and run tests before committing code.
- Use **Docker** for containerization to ensure consistent development and deployment environments.
- Use **Swagger** for API documentation and testing.
- Use **FluentValidation** for model validation to keep validation logic separate from business logic.
- Use **AutoMapper** for object mapping to reduce boilerplate code.
- Use **Serilog** or similar logging frameworks for structured logging.
- Use **Health Checks** to monitor the status of services and dependencies.
- Use **Feature Toggles** to control feature availability without deploying new code.
- Use **Polly** for resilience and transient fault handling in network calls.
- Use **MediatR** for implementing the mediator pattern to decouple request handling from business logic.
- Use **Entity Framework Core** for data access with a focus on code-first migrations.
- Use **CQRS** (Command Query Responsibility Segregation) for separating read and write operations in complex applications.
- Use **gRPC** for high-performance RPC calls between services.
- Use **SignalR** for real-time web functionality.
- Use **OpenTelemetry** for distributed tracing and observability.
