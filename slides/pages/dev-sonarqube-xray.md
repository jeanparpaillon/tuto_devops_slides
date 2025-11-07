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
layout: two-cols-header
---

# Exercise 1: SonarQube Local Setup

::left::

## Objective
Get hands-on experience with local SonarQube installation and first scan

## Duration
45 minutes

::right::

## Steps
1. Start SonarQube using Docker
2. Access UI and change default password
3. Create a new project manually
4. Generate project token
5. Navigate to `exercises/nodejs_server`
6. Create `sonar-project.properties`
7. Run scanner with token
8. Review results in SonarQube UI

---

# Exercise 1: Detailed Instructions

## Step 1: Start SonarQube

```bash
docker run -d --name sonarqube -p 9000:9000 sonarqube:lts
```

Wait 2-3 minutes for startup, then access http://localhost:9000

## Step 2: Login and Setup

- Login with **admin/admin**
- Change password when prompted
- Create new project: "nodejs-server"
- Generate token and save it

---

# Exercise 1: Scan Configuration

## Step 3: Create sonar-project.properties

```properties
sonar.projectKey=nodejs-server
sonar.projectName=Node.js Server
sonar.sources=.
sonar.exclusions=node_modules/**,test/**
sonar.tests=server.test.js
sonar.javascript.lcov.reportPaths=coverage/lcov.info
```

## Step 4: Run Scanner

```bash
cd exercises/nodejs_server
npm install
npx sonar-scanner \
  -Dsonar.host.url=http://localhost:9000 \
  -Dsonar.token=YOUR_TOKEN_HERE
```

---

# Exercise 1: Expected Results

## What to Observe

- **Dashboard**: Overall quality gate status
- **Issues**: Bugs, vulnerabilities, code smells
- **Measures**: Lines of code, duplication, complexity
- **Code**: Browse code with highlighted issues

## Deliverables

✅ Running SonarQube instance  
✅ Successfully scanned nodejs_server project  
✅ Understanding of basic issue types  
✅ Familiarity with SonarQube UI

---

# Exercise 2: Quality Gates Configuration

## Objective
Configure custom quality gates and see build pass/fail based on code quality

## Duration
45 minutes

---

# Exercise 2: Setup Steps

## Step 1: Create Custom Quality Gate

1. In SonarQube, go to **Quality Gates**
2. Create new gate: **"Strict Quality"**
3. Add conditions:
   - Coverage on new code > 80%
   - Bugs = 0
   - Code Smells < 5
   - Security Hotspots reviewed = 100%

## Step 2: Assign to Project

- Go to your nodejs-server project
- Select "Strict Quality" gate
- Save configuration

---

# Exercise 2: Test Quality Gate

## Step 3: Introduce Bugs

Modify `server.js` to add issues:

```javascript
// Add unused variable (code smell)
const unusedVariable = "this will trigger code smell";

// Add potential null reference
app.get('/bug', (req, res) => {
  const data = null;
  res.send(data.toString()); // Will trigger bug detection
});
```

## Step 4: Re-scan and Observe

```bash
npx sonar-scanner -Dsonar.host.url=http://localhost:9000 -Dsonar.token=YOUR_TOKEN
```

Quality gate should **FAIL** ❌

---

# Exercise 2: Fix and Pass

## Step 5: Fix the Issues

Remove the bugs you introduced:

```javascript
// Remove unused variable
// Remove buggy endpoint
```

## Step 6: Re-scan

```bash
npx sonar-scanner -Dsonar.host.url=http://localhost:9000 -Dsonar.token=YOUR_TOKEN
```

Quality gate should **PASS** ✅

## Deliverables

✅ Custom quality gate configured  
✅ Understanding of pass/fail criteria  
✅ Experience fixing quality gate failures

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

# Exercise 3: GitHub Actions Integration

## Objective
Integrate SonarQube scanning into GitHub Actions workflow

## Duration
45 minutes

---

# Exercise 3: Prerequisites

## What You Need

1. **Fork** the nodejs_server repository to your GitHub account
2. **SonarCloud** account (free for public repos)
   - Or use your local SonarQube server
3. **GitHub Secrets** configured:
   - `SONAR_TOKEN`
   - `SONAR_HOST_URL` (if using server, not SonarCloud)

## SonarCloud Setup

1. Go to https://sonarcloud.io
2. Sign in with GitHub
3. Add your organization/repository
4. Generate token in Account → Security

---

# Exercise 3: Workflow Creation

## Create `.github/workflows/sonar.yml`

```yaml
name: SonarQube Scan
on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  sonar:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0  # Shallow clones should be disabled
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm test -- --coverage
      - name: SonarQube Scan
        uses: SonarSource/sonarqube-scan-action@v2
        env:
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
          SONAR_HOST_URL: ${{ secrets.SONAR_HOST_URL }}
```

---

# Exercise 3: Test the Integration

## Step 1: Commit and Push

```bash
git add .github/workflows/sonar.yml
git commit -m "Add SonarQube CI integration"
git push
```

## Step 2: Verify Workflow

- Go to **Actions** tab in GitHub
- Watch the workflow run
- Check for successful scan

## Step 3: Create a PR

1. Create new branch with code changes
2. Push and create Pull Request
3. Observe **PR decoration** with quality gate status
4. Check inline comments on issues

---

# Exercise 3: Branch Protection

## Step 4: Enforce Quality Gate

Configure branch protection on `main`:

1. Go to **Settings** → **Branches**
2. Add rule for `main`
3. Enable **Require status checks**
4. Select **SonarQube Code Analysis**
5. Save rules

Now PRs with failing quality gates cannot be merged! 🎯

## Deliverables

✅ Working GitHub Actions workflow  
✅ PR decoration enabled  
✅ Branch protection configured  
✅ Understanding of CI integration

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

# Exercise 4: Xray Container Scanning

## Objective
Scan a Docker container image for vulnerabilities using Xray

## Duration
30 minutes

---

# Exercise 4: Prerequisites

## What You Need

- Docker installed locally
- Access to JFrog Artifactory with Xray enabled
  - *For training: Use provided demo instance*
- Artifactory credentials (username/password or API key)

## Setup Check

```bash
docker --version
docker info
```

If not installed, use Docker Desktop or follow https://docs.docker.com/get-docker/

---

# Exercise 4: Build and Push Image

## Step 1: Build Docker Image

```bash
cd exercises/nodejs_server
docker build -t myapp:latest .
```

## Step 2: Tag for Artifactory

```bash
docker tag myapp:latest \
  <artifactory-url>/docker-local/myapp:1.0.0
```

## Step 3: Login and Push

```bash
docker login <artifactory-url>
# Enter credentials
docker push <artifactory-url>/docker-local/myapp:1.0.0
```

---

# Exercise 4: Configure Xray Scanning

## Step 4: Enable Repository Indexing

In JFrog Platform UI:

1. Go to **Administration** → **Xray** → **Settings**
2. Select **Indexed Resources**
3. Add **docker-local** repository
4. Enable **automatic scanning**
5. Save configuration

## Step 5: Trigger Scan

- Wait for automatic scan (1-2 minutes)
- Or manually trigger: **Xray** → **Scans** → **Scan Now**

---

# Exercise 4: Review Results

## Step 6: View Scan Results

Navigate to: **Application** → **Artifactory** → **Artifacts**

Find your image: `docker-local/myapp/1.0.0`

Click **Xray Data** tab to see:

- 🔴 **Critical** vulnerabilities
- 🟠 **High** severity issues
- 🟡 **Medium** severity issues
- 🔵 **Low** severity issues
- **SBOM** (Software Bill of Materials)

## Step 7: Investigate Vulnerabilities

- Click on top 3 critical vulnerabilities
- Review CVE details, CVSS score
- Check if fixes are available
- Note affected components

---

# Exercise 4: Expected Results

## What You Should See

```
Vulnerabilities Summary:
├── Critical: 2
├── High: 8
├── Medium: 15
└── Low: 23

Top Vulnerability: CVE-2024-XXXXX
├── Severity: Critical (9.8)
├── Component: express@4.18.2
└── Fix: Upgrade to express@4.19.0
```

## Deliverables

✅ Docker image scanned by Xray  
✅ Understanding of vulnerability reports  
✅ Knowledge of SBOM  
✅ Ability to identify critical issues

---

# Exercise 5: Xray Policy Configuration

## Objective
Configure Xray policies to enforce security and compliance rules

## Duration
30 minutes

---

# Exercise 5: Create Watch and Policy

## Step 1: Create Xray Watch

In JFrog Platform:

1. Go to **Administration** → **Xray** → **Watches & Policies**
2. Click **New Watch**
3. Name: **"Docker Production Watch"**
4. Add repository: **docker-local**
5. Save watch

---

# Exercise 5: Define Security Policy

## Step 2: Create Policy

1. Click **New Policy**
2. Name: **"Production Security"**
3. Type: **Security**

## Step 3: Add Rules

**Rule 1: Block Critical**
- Criteria: Min Severity = **Critical**
- Action: **Fail Build** ❌

**Rule 2: Warn High**
- Criteria: Min Severity = **High**
- Action: **Generate Violations** ⚠️

---

# Exercise 5: License Compliance

## Step 4: Add License Policy

Create second policy for licenses:

1. Name: **"License Compliance"**
2. Type: **License**

**Rule: Block GPL**
- Banned licenses: **GPL, AGPL**
- Allowed licenses: **MIT, Apache-2.0, BSD**
- Action: **Fail Build** ❌

## Step 5: Assign Policies to Watch

- Go back to your watch
- Assign both policies
- Activate watch

---

# Exercise 5: Test Policy Enforcement

## Step 6: Intentional Violation

Modify `package.json` to add package with known CVE:

```json
{
  "dependencies": {
    "express": "4.17.0"  // Older version with vulnerabilities
  }
}
```

Rebuild and push:

```bash
docker build -t <artifactory-url>/docker-local/myapp:1.0.1 .
docker push <artifactory-url>/docker-local/myapp:1.0.1
```

---

# Exercise 5: Observe Violations

## Step 7: Check Policy Violations

1. Wait for scan (1-2 min)
2. Go to **Xray** → **Violations**
3. Find your image violations
4. See blocked status 🚫

## Step 8: Create Remediation Plan

Document:
- Which vulnerabilities triggered policies?
- What actions are needed to pass?
- Priority order for fixes

## Deliverables

✅ Working Xray policy  
✅ Understanding of policy enforcement  
✅ Experience with violation handling  
✅ Remediation planning skills

---

# Best practices

- Treat quality gate failure as build failure
- Keep rulesets lean and team-agreed
- Triage vulnerabilities; fix or suppress with justification
- Automate reports in PRs and releases
