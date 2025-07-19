# Local Docker

## Run MongoDB with Docker Compose

To start MongoDB using Docker Compose, follow these steps:

1. Navigate to the directory containing the `docker-compose.yml` file:

   ```bash
   cd /Users/kennethteo/dev/projects/custom-build-platform/infrastructure/database/mongodb
   ```

2. Start the MongoDB container:

   ```bash
   docker-compose up -d
   ```

3. Verify that the container is running:

   ```bash
   docker ps
   ```

## Run MongoDB with Docker Command

Alternatively, you can run MongoDB using the following Docker command:

```bash
docker run -d \
    --name mongodb \
    -p 27017:27017 \
    -e MONGO_INITDB_ROOT_USERNAME=admin \
    -e MONGO_INITDB_ROOT_PASSWORD=password123 \
    -e MONGO_INITDB_DATABASE=local_database \
    mongo:latest
```
