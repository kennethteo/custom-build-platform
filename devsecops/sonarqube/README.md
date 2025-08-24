# SonarQube

Production‑grade code quality and security analysis for this monorepo.

## What you get

- Local SonarQube + PostgreSQL via Docker Compose
- Monorepo defaults in `sonar-project.properties`
- GitHub Actions workflow to run analysis and enforce the Quality Gate

## Local setup (Docker Compose)

1. Copy env template and adjust if needed

```bash
cp devsecops/sonarqube/.env.example devsecops/sonarqube/.env
```

2. Start SonarQube (first start may take 1–2 minutes)

```bash
docker compose -f devsecops/sonarqube/docker-compose.yml up -d
```

3. Open <http://localhost:9000> (default admin login: admin/admin). Change the admin password when prompted.

4. Create a project and generate a token (Administration > Security > Users > Tokens). Save the token for CI.

To stop:

```bash
docker compose -f devsecops/sonarqube/docker-compose.yml down
```

Notes:

- Uses `sonarqube:lts-community` and `postgres:15-alpine` with persistent volumes
- On macOS/Windows, kernel settings like vm.max_map_count aren’t required

## Monorepo configuration

Root `sonar-project.properties` defines sensible defaults:

- Sources: `app-templates/nodejs`, `app-templates/go`, and `apps`
- Exclusions: infra/docs/test artifacts, node_modules, build outputs
- JS/TS coverage auto-detection at `**/coverage/lcov.info` (if present)

You can override per app by adding an app‑level `sonar-project.properties`.

## CI integration (GitHub Actions)

Workflow: `.github/workflows/sonarqube.yml`

Secrets required at repo/org level:

- `SONAR_HOST_URL` → e.g. `http://your-sonarqube.example.com` (local: `http://localhost:9000`)
- `SONAR_TOKEN` → user token created in SonarQube

The workflow checks out the repository, runs the SonarQube scan, and waits for the Quality Gate.

## Local scan (optional)

Using Homebrew:

```bash
brew install sonar-scanner
sonar-scanner \
 -Dsonar.host.url=http://localhost:9000 \
 -Dsonar.login=<your_token>
```

Or via Docker:

```bash
docker run --rm -e SONAR_HOST_URL=http://localhost:9000 -e SONAR_LOGIN=<your_token> \
 -v "$(pwd)":/usr/src sonarsource/sonar-scanner-cli \
 -Dsonar.projectBaseDir=/usr/src
```

## Troubleshooting

- 502/503 on first start: wait ~1–2 minutes; check `docker logs` for `sonarqube` and `db` services
- Permission denied on volumes: remove containers, `docker volume rm` the `sonarqube_*` volumes, then re‑up
- No coverage reported: ensure your app produces `coverage/lcov.info` and commit it or upload as artifact in CI
