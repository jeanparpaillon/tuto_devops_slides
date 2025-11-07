# Day 4 Exercises: SonarQube and Xray

This directory contains support materials for Day 4 hands-on exercises.

## Exercises Overview

### Exercise 1: SonarQube Local Setup (45 min)
Get hands-on experience with local SonarQube installation and first scan

**Key Learning:**
- Starting SonarQube with Docker
- Creating and configuring projects
- Running your first code analysis
- Understanding basic issue types

### Exercise 2: Quality Gates Configuration (45 min)
Configure custom quality gates and see build pass/fail based on code quality

**Key Learning:**
- Creating custom quality gates
- Setting quality thresholds
- Understanding pass/fail criteria
- Fixing code to meet quality standards

### Exercise 3: GitHub Actions Integration (45 min)
Integrate SonarQube scanning into GitHub Actions workflow

**Key Learning:**
- Setting up CI/CD integration
- Configuring GitHub Actions workflows
- PR decoration with quality results
- Branch protection with quality gates

### Exercise 4: Xray Container Scanning (30 min)
Scan a Docker container image for vulnerabilities using Xray

**Key Learning:**
- Building and pushing Docker images
- Configuring Xray scanning
- Understanding vulnerability reports
- Reading SBOM (Software Bill of Materials)

### Exercise 5: Xray Policy Configuration (30 min)
Configure Xray policies to enforce security and compliance rules

**Key Learning:**
- Creating watches and policies
- Defining security rules
- License compliance management
- Handling policy violations

## Support Materials

- `docker-compose.yml` - Quick setup for SonarQube
- `sonar-project.properties.template` - Configuration template for SonarQube scanner
- `Dockerfile` - Example Dockerfile (copy to nodejs_server directory or use as reference)
- `github-workflow-sonar.yml` - GitHub Actions workflow template
- `INSTRUCTOR_GUIDE.md` - Detailed solutions and teaching notes

**Note:** The Dockerfile has been copied to `exercises/nodejs_server/` for direct use in exercises 4-5.

## Prerequisites

### For All Exercises
- Docker Desktop installed
- Git installed
- Text editor (VS Code recommended)
- Terminal/command line access

### For Exercise 1-2
- Docker Desktop with at least 4GB RAM allocated
- Port 9000 available (not used by other services)
- **Note:** nodejs_server directory should exist at `exercises/nodejs_server/`

### For Exercise 3
- GitHub account
- Fork of nodejs_server repository
- SonarCloud account (or local SonarQube server)

### For Exercise 4-5
- Access to JFrog Artifactory with Xray enabled
- Artifactory credentials (provided during training)

## Quick Start

### Start SonarQube for Exercises 1-2

```bash
cd exercises/day4
docker-compose up -d
```

Wait 2-3 minutes for startup, then access http://localhost:9000

### Use Configuration Templates

Copy and customize the templates:

```bash
cd exercises/nodejs_server
cp ../day4/sonar-project.properties.template sonar-project.properties
# Edit with your token
```

### Cleanup

Stop all services:

```bash
cd exercises/day4
docker-compose down
```

Remove volumes to reset:

```bash
docker-compose down -v
```

## Common Issues and Solutions

### SonarQube won't start
- Check Docker is running: `docker info`
- Check port 9000 is available: `netstat -an | grep 9000`
- Check logs: `docker logs sonarqube`
- Increase Docker memory to 4GB minimum

### Scanner connection fails
- Verify SonarQube is running: `curl http://localhost:9000`
- Check token is correct
- Ensure no firewall blocking port 9000

### GitHub Actions workflow fails
- Verify secrets are set correctly
- Check token has correct permissions
- Ensure repository is public or SonarCloud organization has access
- Review workflow logs for specific error

### Xray scan shows no results
- Verify repository is indexed in Xray
- Wait 2-3 minutes for automatic scan
- Check watch is active and assigned to repository
- Verify Xray license is valid

## Additional Resources

- [SonarQube Documentation](https://docs.sonarqube.org/latest/)
- [SonarCloud Documentation](https://docs.sonarcloud.io/)
- [JFrog Xray Documentation](https://www.jfrog.com/confluence/display/JFROG/Xray)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

## Feedback

If you encounter issues not covered here, please ask your instructor.
