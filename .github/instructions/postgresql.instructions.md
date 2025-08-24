---
applyTo: '**'
---
# Instructions for PostgreSQL
This section provides specific instructions for PostgreSQL database setup and configuration. Follow these guidelines to ensure best practices are implemented when working with PostgreSQL in your projects.

## General Instructions for PostgreSQL
- Ensure that all PostgreSQL instances are configured with secure authentication methods.
- Use environment variables to manage database connection strings and credentials.
- Implement regular backups and ensure that backup files are stored securely.
- Use role-based access control to manage database permissions.
- Optimize database performance by using indexing and query optimization techniques.
- Monitor database performance and set up alerts for critical issues.
- Follow best practices for schema design, including normalization and the use of appropriate data types.
- Ensure that all database migrations are version-controlled and tested before deployment.
- Use SSL/TLS to encrypt data in transit between the application and the PostgreSQL database.
- Regularly update PostgreSQL to the latest stable version to benefit from security patches and new features.

## Docker Instructions for PostgreSQL
- Use official PostgreSQL Docker images as the base for your Dockerfiles.
- Configure the PostgreSQL container using environment variables for settings such as `POSTGRES_USER`, `POSTGRES_PASSWORD`, and `POSTGRES_DB`.
- Ensure that data persistence is handled using Docker volumes to prevent data loss when containers are recreated.
- Set up health checks for the PostgreSQL container to ensure it is running correctly.
- Limit resource usage (CPU, memory) for the PostgreSQL container to prevent it from affecting other services.
- Use Docker Compose for managing multi-container applications that include PostgreSQL.
- Document the setup and configuration steps in a README file within the `infrastructure/postgresql/` folder.

## Folder Structure
- Place all Dockerfiles, setup scripts, and configuration files related to PostgreSQL in the `infrastructure/postgresql/` folder.
- Include a README.md file in the `infrastructure/postgresql/` folder with detailed instructions on how to set up and configure PostgreSQL for the project.

## Additional Resources
- Refer to the official PostgreSQL documentation for best practices and advanced configuration options: https://www.postgresql.org/docs/
- Use community resources and forums for troubleshooting and optimization tips.