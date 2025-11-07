# Day 4 Exercise Materials - Code Quality and Security Scanning

This directory contains all support materials for Day 4 exercises covering SonarQube and JFrog Xray.

## Contents

### Configuration Files

- **`docker-compose.yml`** - SonarQube with PostgreSQL database setup
- **`sonar-project.properties`** - SonarQube project configuration template
- **`.github-workflows-sonar.yml`** - GitHub Actions workflow for self-hosted SonarQube
- **`.github-workflows-sonarcloud.yml`** - GitHub Actions workflow for SonarCloud

### Docker Examples

- **`Dockerfile-multistage-example`** - Multi-stage build example with security best practices

### Xray Policy Examples

- **`xray-policy-security.json`** - Security policy blocking critical vulnerabilities
- **`xray-policy-license.json`** - License compliance policy for open source

### Scripts

- **`check-environment.sh`** - Verifies all prerequisites are installed

### Documentation

- **`INSTRUCTOR-GUIDE.md`** - Comprehensive guide for instructors delivering Day 4 training
- **`README.md`** - This file

## Quick Start

### Prerequisites Check

Run the environment check script to verify you have all required tools:

```bash
./check-environment.sh
```

### Starting SonarQube

Start a local SonarQube instance using Docker Compose:

```bash
# Start SonarQube and PostgreSQL
docker compose up -d

# Wait for startup (1-2 minutes)
docker compose logs -f sonarqube

# Access SonarQube at http://localhost:9000
# Default credentials: admin / admin (change on first login)
```

### Stopping SonarQube

```bash
# Stop containers
docker compose down

# Stop and remove all data (clean slate)
docker compose down -v
```

## Exercise Overview

### Exercise 1: Local SonarQube Setup (45 min)

- Start SonarQube with Docker Compose
- Create a project and generate token
- Scan the nodejs_server project
- Review code quality metrics and issues

**Files needed:** `docker-compose.yml`, `sonar-project.properties`

### Exercise 2: SonarQube in CI/CD (45 min)

- Set up SonarCloud account or expose local SonarQube
- Configure GitHub Actions workflow
- Add secrets to repository
- Test with pull request decoration

**Files needed:** `.github-workflows-sonarcloud.yml` or `.github-workflows-sonar.yml`

### Exercise 3: Container Scanning with Xray (30 min)

- Build Docker image of nodejs_server
- Push to JFrog Artifactory
- Configure Xray scanning
- Review vulnerability reports and SBOM

**Files needed:** Artifactory instance with Xray enabled

### Exercise 4: Xray Policy Configuration (30 min)

- Create security and license policies
- Configure watches for repositories
- Test policy enforcement
- Handle violations

**Files needed:** `xray-policy-security.json`, `xray-policy-license.json`

## Using the Configuration Files

### SonarQube Project Configuration

Copy the template to your project root:

```bash
cp sonar-project.properties ../nodejs_server/
cd ../nodejs_server
```

Edit the file to customize:
- `sonar.projectKey` - Unique identifier for your project
- `sonar.projectName` - Display name
- `sonar.sources` - Source code directories
- `sonar.exclusions` - Files/directories to skip

### GitHub Actions Workflows

To use the workflow templates:

1. Choose SonarCloud (recommended) or self-hosted SonarQube
2. Copy the appropriate file:
   ```bash
   # For SonarCloud
   cp .github-workflows-sonarcloud.yml ../nodejs_server/.github/workflows/sonarqube.yml
   
   # For self-hosted
   cp .github-workflows-sonar.yml ../nodejs_server/.github/workflows/sonarqube.yml
   ```

3. Update the workflow with your project details
4. Add secrets to your GitHub repository:
   - `SONAR_TOKEN` - Authentication token
   - `SONAR_HOST_URL` - (self-hosted only) SonarQube server URL

### Xray Policies

The JSON policy examples can be:
- Imported directly into Xray UI (Administration → Xray → Policies → Import)
- Used as reference for manual policy creation
- Customized for your organization's requirements

## Troubleshooting

### SonarQube won't start

**Issue:** Container exits immediately

**Solutions:**
- Check Docker resources: Needs at least 2GB RAM
- Check port 9000 is available: `nc -z localhost 9000`
- View logs: `docker compose logs sonarqube`
- Try: `docker compose down -v && docker compose up -d`

### Scanner can't connect to SonarQube

**Issue:** Connection refused error

**Solutions:**
- Verify SonarQube is running: `docker compose ps`
- Check URL: should be `http://localhost:9000`
- Verify token is correct
- Wait for full startup (check logs)

### No code coverage in SonarQube

**Issue:** Coverage shows 0%

**Solutions:**
- Run tests with coverage before scanning: `npm test -- --coverage`
- Ensure coverage report path is correct in `sonar-project.properties`
- Check that lcov.info file exists in coverage directory

### Xray not scanning images

**Issue:** No scan results appear

**Solutions:**
- Verify Xray is enabled on Artifactory instance
- Check repository is indexed (Administration → Xray → Indexed Resources)
- Wait 1-2 minutes for indexing
- Trigger manual scan if needed

## Additional Resources

- [SonarQube Documentation](https://docs.sonarqube.org/)
- [SonarCloud Documentation](https://docs.sonarcloud.io/)
- [JFrog Xray Documentation](https://www.jfrog.com/confluence/display/JFROG/Xray)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

## Support

For issues with the exercises:
1. Check the [INSTRUCTOR-GUIDE.md](INSTRUCTOR-GUIDE.md) troubleshooting section
2. Review the exercise-specific README files
3. Ask your instructor for assistance

## License

These materials are provided for educational purposes as part of the DevOps training program.
