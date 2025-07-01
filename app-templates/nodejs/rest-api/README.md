# Node.js REST API Template

## Description

A boilerplate for building RESTful APIs using Node.js, Express, and TypeScript. Follows best practices for structure, security, and maintainability.

## Features

- Express.js server
- TypeScript support
- Environment variable management with dotenv
- Linting with ESLint
- Prettier for code formatting
- Unit testing with Jest
- API documentation with Swagger/OpenAPI
- Input validation with Joi
- Docker support for containerization
- Example folder structure for scalable projects

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- [Docker](https://www.docker.com/) (optional, for containerization)

### Installation

```bash
git clone <repo-url>
cd <project-directory>
npm install
```

### Running the App

```bash
npm run dev
```

### Running with Docker

1. Build the Docker image:

    ```bash
    docker build -t nodejs-rest-api .
    ```

2. Run the container:

    ```bash
    docker run -p 3000:3000 --env-file .env nodejs-rest-api
    ```

## Project Structure

```text
app/
  controllers/
  models/
  routes/
  services/
  middlewares/
  utils/
  validators/
  tests/
  ...
```

## API Documentation

- Swagger UI available at `/api-docs` when running the app.
- See `swagger.yaml` or `openapi.json` for endpoint specs.

## Input Validation

- Input validation is implemented using [Joi](https://joi.dev/).
- Validation logic is placed in the `validators/` directory and used as middleware in routes.
- Example usage:

```js
// app/validators/userValidator.js
const Joi = require('joi');

exports.createUserSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
});
```

```js
// app/routes/user.js
const express = require('express');
const router = express.Router();
const { createUserSchema } = require('../validators/userValidator');
const validate = require('../middlewares/validate');

router.post('/users', validate(createUserSchema), (req, res) => {
    // ...controller logic...
});

module.exports = router;
```

## Testing

```bash
npm test
```

## Environment Variables

- `.env` file in the root directory
- Example:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/mydb
JWT_SECRET=your_jwt_secret
```

## Scripts

- `npm run dev` — Start development server with hot reload
- `npm run build` — Build for production
- `npm start` — Start production server
- `npm test` — Run tests
- `npm run lint` — Lint code
- `npm run format` — Format code

## Contributing

Pull requests are welcome. Please follow the coding standards and add tests for new features.

## License

MIT
