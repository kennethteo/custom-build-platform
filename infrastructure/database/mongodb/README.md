# Local Docker 

```bash
docker run -d \
    --name mongodb \
    -p 27017:27017 \
    -e MONGO_INITDB_ROOT_USERNAME=admin \
    -e MONGO_INITDB_ROOT_PASSWORD=password123 \
    -e MONGO_INITDB_DATABASE=user_management \
    mongo:latest
```
