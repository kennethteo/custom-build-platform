# Start from the official Golang image
FROM golang:1.20-alpine AS builder
WORKDIR /app
COPY . .
RUN go mod tidy && go build -o rest-api

# Use a minimal image for running
FROM alpine:3.18
WORKDIR /app
COPY --from=builder /app/rest-api ./rest-api
COPY .env.example .env
EXPOSE 8080
CMD ["./rest-api"]
