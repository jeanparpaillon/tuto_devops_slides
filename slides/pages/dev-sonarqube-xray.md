---
layout: section
---

# Day 4 — SonarQube and Xray

## Objectives

- Understand code quality and security scanning
- Run local and CI analyses with SonarQube
- Scan dependencies and artifacts with Xray
- Integrate results into GitHub and CI pipelines

---

# SonarQube — overview

- Code quality: bugs, code smells, vulnerabilities
- Quality profiles and rules
- Quality gates (pass/fail criteria)
- Languages: JS/TS, Java, Python, ...

---

# SonarQube — local setup

- Run SonarQube locally (Docker)

```sh
# minimal local run
docker run -d --name sonarqube -p 9000:9000 sonarqube:lts
```

- Configure project, generate token

---

# SonarQube — analyze a Node.js project

```sh
# with sonar-scanner CLI
sonar-scanner \
  -Dsonar.projectKey=myapp \
  -Dsonar.sources=src \
  -Dsonar.tests=test \
  -Dsonar.host.url=http://localhost:9000 \
  -Dsonar.login=$SONAR_TOKEN
```

- Review issues and quality gate in the UI

---

# SonarQube — GitHub Actions integration

```yaml
name: ci
on: [push, pull_request]
jobs:
  sonar:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - name: SonarQube Scan
        uses: SonarSource/sonarqube-scan-action@v2
        env:
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
          SONAR_HOST_URL: ${{ secrets.SONAR_HOST_URL }}
```

---

# Xray — overview

- Dependency and artifact scanning (SCA + container images)
- Vulnerabilities (CVEs), licenses, policies
- Works with Artifactory repositories

---

# Xray — usage patterns

- CI scan of package manifests (npm, Maven, etc.)
- Image scan after build (SBOM, CVEs)
- Policy enforcement: block downloads/deployments

---

# Xray — GitHub Actions example

```yaml
jobs:
  scan-image:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: docker/setup-buildx-action@v3
      - uses: docker/login-action@v3
        with:
          registry: ${{ secrets.ARTI_REGISTRY }}
          username: ${{ secrets.ARTI_USER }}
          password: ${{ secrets.ARTI_PASSWORD }}
      - name: Build image
        run: docker build -t ${{ secrets.ARTI_REGISTRY }}/myorg/app:${{ github.sha }} .
      - name: Push image
        run: docker push ${{ secrets.ARTI_REGISTRY }}/myorg/app:${{ github.sha }}
      - name: Xray scan
        uses: jfrog/setup-jfrog-cli@v4
      - run: |
          jf rt c --url=${{ secrets.ARTI_URL }} --user=${{ secrets.ARTI_USER }} --password=${{ secrets.ARTI_PASSWORD }} --interactive=false
          jf xr s ${{ secrets.ARTI_REGISTRY }}/myorg/app:${{ github.sha }} --format simple
```

---

# Best practices

- Treat quality gate failure as build failure
- Keep rulesets lean and team-agreed
- Triage vulnerabilities; fix or suppress with justification
- Automate reports in PRs and releases
