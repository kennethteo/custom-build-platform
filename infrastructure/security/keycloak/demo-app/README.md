# Demo App for Keycloak

## Pre-requisite:

- Run Docker compose in infrastructure/security/keycloak

## Running the demo app

```bash
cd infrastructure/security/keycloak/keycloak-quickstarts/js/spa

npm run create-realm
npm install
npm start
```

## Access the Quickstart

---------------------

You can access the application with the following URL: <http://localhost:8180>.

Try to authenticate with any of these users:

| Username | Password | Roles              |
|----------|----------|--------------------|
| alice    | alice    | user               |
| admin    | admin    | admin              |

Once authenticated, you are redirected to the application and you can perform the following actions:

- Show the Access Token
- Show the ID Token
- Refresh Token
- Logout

## Clean up

```bash
npm run delete-realm
```
