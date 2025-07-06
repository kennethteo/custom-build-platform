# Keycloak Project

This directory contains the configuration and setup for running a Keycloak identity and access management server, typically used for authentication and authorization in your platform.

## Prerequisites

- [Docker](https://www.docker.com/) installed
- [Docker Compose](https://docs.docker.com/compose/) installed

## Getting Started

### 1. Clone the Repository

```sh
cd infrastructure/security/keycloak
```

### 2. Start Keycloak with Docker Compose

```sh
docker-compose up -d
```

- This will start the Keycloak server and its dependencies (e.g., PostgreSQL).

### 3. Access Keycloak Admin Console

- Open [http://localhost:8080](http://localhost:8080) in your browser.
- Default admin credentials (change as needed):
  - Username: `admin`
  - Password: `admin`

### 4. Configuration

- Edit the `docker-compose.yml` or `.env` file to customize Keycloak settings, database credentials, or ports.
- Import realms, clients, or users as needed using the Keycloak admin console or CLI.

### 5. Stopping the Server

```sh
docker-compose down
```

## References

- [Keycloak Documentation](https://www.keycloak.org/documentation)
- [Keycloak Docker Guide](https://www.keycloak.org/getting-started/getting-started-docker)
