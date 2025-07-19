# REST API Template with MongoDB

This is a REST API template built with Node.js, Express.js, and MongoDB. It provides a starting point for building scalable and maintainable APIs.

## Features

- **Express.js**: Lightweight and fast web framework.
- **MongoDB**: Database integration using Mongoose.
- **Environment Variables**: Managed with `dotenv`.
- **CORS**: Enabled for cross-origin requests.
- **Error Handling**: Centralized error handling middleware.

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- [MongoDB](https://www.mongodb.com/) (local or cloud instance)

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd app-templates/nodejs/rest-api-mongodb-template
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory and add the following:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/rest-api-template
```

### 4. Start the Server

For development:

```bash
npm run dev
```

For production:

```bash
npm start
```

### 5. Test the API

Use a tool like [Postman](https://www.postman.com/) or `curl` to test the following endpoints:

#### Endpoints

- **GET /api/v1/examples**: Fetch all examples.
- **POST /api/v1/examples**: Create a new example.

  - **Request Body**:

    ```json
    {
      "name": "Example Name",
      "description": "Example Description"
    }
    ```

## Project Structure

```plaintext
rest-api-mongodb-template/
├── src/
│   ├── config/
│   │   └── db.js          # MongoDB connection setup
│   ├── controllers/
│   │   └── exampleController.js  # CRUD operations
│   ├── models/
│   │   └── exampleModel.js       # Mongoose schema
│   ├── routes/
│   │   └── exampleRoutes.js      # API routes
│   ├── app.js          # Express app setup
│   └── server.js       # Server entry point
├── .env                # Environment variables
├── .gitignore          # Ignored files
├── package.json        # Project metadata and dependencies
└── README.md           # Documentation
```

## Best Practices

- Use `helmet` for securing HTTP headers.
- Validate input using `express-validator`.
- Add logging with `winston` or `pino`.
- Use `dotenv` to manage environment variables securely.
- Write unit tests for all endpoints.

## License

This project is licensed under the MIT License.
