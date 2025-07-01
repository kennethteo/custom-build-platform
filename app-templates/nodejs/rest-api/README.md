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

## Authentication

- This API is designed to work with 3rd party authentication providers (e.g., Auth0, Azure AD, Okta, Google Identity, etc.).
- User registration and login are handled by the identity provider.
- Clients must obtain an access token from the provider and include it in the `Authorization: Bearer <token>` header for protected endpoints.
- The API validates incoming JWTs using the provider's public keys and checks claims (issuer, audience, scopes, etc.).
- Example middleware for Auth0:

```js
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    jwksUri: 'https://YOUR_DOMAIN/.well-known/jwks.json'
  }),
  audience: 'YOUR_API_AUDIENCE',
  issuer: 'https://YOUR_DOMAIN/',
  algorithms: ['RS256']
});

// Use checkJwt as middleware on protected routes
router.get('/protected', checkJwt, (req, res) => {
  res.json({ message: 'Protected data' });
});
```

## API Versioning

- The API uses versioning via the URL path, e.g., `/api/v1/resource`.

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- [Docker](https://www.docker.com/) (optional, for containerization)
- Account and configuration with your chosen identity provider

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

## Error Handling

- All errors return a JSON response with a `message` and `statusCode`.
- Example:

  ```json
  {
    "message": "Resource not found",
    "statusCode": 404
  }
  ```

## Security

- Uses [helmet](https://www.npmjs.com/package/helmet) for HTTP headers.
- CORS is enabled and configurable.
- Input validation is enforced with Joi.
- Rate limiting is implemented to prevent abuse.
- All authentication and authorization is delegated to the identity provider.

## Example Requests

Access a protected endpoint:

```bash
curl -H "Authorization: Bearer <access_token>" http://localhost:3000/api/v1/protected
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
AUTH_DOMAIN=your-tenant.auth0.com
AUTH_AUDIENCE=your-api-identifier
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
