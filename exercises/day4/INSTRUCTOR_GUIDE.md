# Day 4 Instructor Guide

This guide provides detailed solutions, teaching notes, and common issues for all Day 4 exercises.

## Table of Contents
1. [Exercise 1: SonarQube Local Setup](#exercise-1-sonarqube-local-setup)
2. [Exercise 2: Quality Gates Configuration](#exercise-2-quality-gates-configuration)
3. [Exercise 3: GitHub Actions Integration](#exercise-3-github-actions-integration)
4. [Exercise 4: Xray Container Scanning](#exercise-4-xray-container-scanning)
5. [Exercise 5: Xray Policy Configuration](#exercise-5-xray-policy-configuration)
6. [Common Issues](#common-issues)
7. [Teaching Tips](#teaching-tips)

---

## Exercise 1: SonarQube Local Setup

**Duration:** 45 minutes  
**Difficulty:** Beginner

### Learning Objectives
- Understand SonarQube architecture
- Install and configure SonarQube locally
- Run first code analysis
- Navigate SonarQube UI

### Complete Solution

#### Step 1: Start SonarQube

```bash
# Using docker-compose (recommended)
cd exercises/day4
docker-compose up -d

# OR using docker run directly
docker run -d --name sonarqube -p 9000:9000 sonarqube:lts-community
```

**Wait time:** 2-3 minutes for full startup

**Verification:**
```bash
# Check if container is running
docker ps | grep sonarqube

# Check logs
docker logs sonarqube

# Test web UI
curl -I http://localhost:9000
```

#### Step 2: Initial Configuration

1. Access http://localhost:9000
2. Login with credentials: `admin` / `admin`
3. System prompts password change
4. New password: (student chooses, e.g., `admin123!`)
5. Skip tutorial (or follow it briefly)

#### Step 3: Create Project

1. Click **"Create Project"** → **"Manually"**
2. Project key: `nodejs-server`
3. Project name: `Node.js Server Example`
4. Branch: `main`
5. Click **"Set Up"**

#### Step 4: Generate Token

1. Select **"Locally"** for analysis method
2. Generate token:
   - Token name: `nodejs-scanner-token`
   - Click **"Generate"**
   - **COPY TOKEN** (show only once)
   - Example: `sqp_1234567890abcdef1234567890abcdef`

#### Step 5: Configure Project

Create `sonar-project.properties` in `exercises/nodejs_server/`:

```properties
sonar.projectKey=nodejs-server
sonar.projectName=Node.js Server
sonar.sources=.
sonar.exclusions=node_modules/**,coverage/**
sonar.tests=server.test.js
sonar.javascript.lcov.reportPaths=coverage/lcov.info
```

#### Step 6: Install Scanner and Run

```bash
cd exercises/nodejs_server

# Install dependencies if not done
npm install

# Install sonar-scanner globally (one-time)
npm install -g sonar-scanner

# OR use npx (no install needed)
npx sonar-scanner \
  -Dsonar.host.url=http://localhost:9000 \
  -Dsonar.login=sqp_YOUR_TOKEN_HERE
```

**Expected output:**
```
INFO: Scanner configuration file: /path/to/sonar-scanner/conf/sonar-scanner.properties
INFO: Project root configuration file: /path/to/sonar-project.properties
INFO: Analyzing on SonarQube server 10.x
INFO: Base dir: /path/to/exercises/nodejs_server
INFO: Source paths: .
INFO: Test paths: server.test.js
...
INFO: Analysis report uploaded in XXXms
INFO: ANALYSIS SUCCESSFUL
```

#### Step 7: Review Results

Navigate to http://localhost:9000/dashboard?id=nodejs-server

**Expected findings for nodejs_server:**
- **Lines of Code:** ~15-20
- **Bugs:** 0-1
- **Vulnerabilities:** 0
- **Code Smells:** 2-5 (typically minor issues)
- **Coverage:** 0% (no coverage report generated)
- **Duplications:** 0%

**Common issues found:**
1. Missing JSDoc comments
2. Unused variables (if any)
3. Console.log statements
4. Arrow functions could be simplified

### Teaching Notes

**Key Points to Emphasize:**
- SonarQube is a **static analysis** tool (no code execution)
- Quality metrics help maintain **code health**
- **Technical debt** accumulates over time
- **Quality gates** prevent degradation

**Discussion Questions:**
1. *"Why do we need code quality tools?"*
   - Catch bugs early
   - Maintain consistency
   - Reduce technical debt
   
2. *"Should we fix all issues immediately?"*
   - No, prioritize by severity
   - Focus on new code first
   - Use "water leak" approach

**Common Student Questions:**

Q: *"Why does my SonarQube take so long to start?"*  
A: SonarQube uses Elasticsearch internally, which needs time to initialize. First startup can take 2-3 minutes.

Q: *"Can I use SonarQube for production?"*  
A: Yes, but use PostgreSQL instead of embedded H2 database and configure proper resources.

Q: *"What's the difference between bugs and code smells?"*  
A: Bugs are likely to cause runtime failures. Code smells are maintainability issues.

### Troubleshooting

**Issue 1: Port 9000 already in use**
```bash
# Find process using port 9000
lsof -i :9000
# Kill process or change port
docker run -d --name sonarqube -p 9001:9000 sonarqube:lts-community
```

**Issue 2: Scanner can't connect**
- Check SonarQube is fully started: `docker logs sonarqube | grep "SonarQube is operational"`
- Verify URL: `curl http://localhost:9000/api/system/status`
- Check firewall settings

**Issue 3: Token not working**
- Ensure token is copied correctly (no extra spaces)
- Token must be passed with `-Dsonar.login=` or in properties file
- Check token hasn't been revoked in SonarQube

**Issue 4: No coverage data**
- nodejs_server doesn't generate coverage by default
- Run: `npm test -- --coverage` to generate lcov.info
- Then re-run sonar-scanner

---

## Exercise 2: Quality Gates Configuration

**Duration:** 45 minutes  
**Difficulty:** Intermediate

### Learning Objectives
- Understand quality gates concept
- Create custom quality gates
- Configure quality thresholds
- Experience pass/fail scenarios

### Complete Solution

#### Step 1: Create Quality Gate

1. Navigate to **Quality Gates** (top menu)
2. Click **"Create"**
3. Name: `Strict Quality`
4. Description: `Strict quality standards for production code`
5. Click **"Create"**

#### Step 2: Add Conditions

Add the following conditions (click **"Add Condition"**):

**Condition 1: Coverage on New Code**
- Metric: `Coverage on New Code`
- Operator: `is less than`
- Value: `80`
- (This means: fail if coverage < 80%)

**Condition 2: Bugs**
- Metric: `Bugs`
- Operator: `is greater than`
- Value: `0`
- (Fail if any bugs exist)

**Condition 3: Code Smells**
- Metric: `Code Smells`
- Operator: `is greater than`
- Value: `5`
- (Fail if more than 5 code smells)

**Condition 4: Security Hotspots Reviewed**
- Metric: `Security Hotspots Reviewed`
- Operator: `is less than`
- Value: `100`
- (Fail if any security hotspots not reviewed)

**Condition 5: Vulnerabilities**
- Metric: `Vulnerabilities`
- Operator: `is greater than`
- Value: `0`
- (Fail if any vulnerabilities)

#### Step 3: Assign to Project

1. Go to your **nodejs-server** project
2. Click **"Project Settings"** → **"Quality Gate"**
3. Select **"Strict Quality"** from dropdown
4. Click **"Save"**

#### Step 4: Introduce Bugs

Edit `exercises/nodejs_server/server.js`:

```javascript
import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

// BUG 1: Unused variable (Code Smell)
const unusedVariable = "This triggers a code smell";

// BUG 2: Potential null reference (Bug)
app.get('/bug', (req, res) => {
  const data = null;
  res.send(data.toString()); // Will crash if called
});

// BUG 3: Console.log in production (Code Smell)
console.log("Debugging info that should not be in production");

app.get('/', (req, res) => {
  const currentDateTime = new Date().toLocaleString();
  res.send(`Hello World, it is ${currentDateTime}`);
});

if (import.meta.url === `file://${process.argv[1]}`) {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

export default app;
```

#### Step 5: Scan with Bugs

```bash
cd exercises/nodejs_server
npx sonar-scanner \
  -Dsonar.host.url=http://localhost:9000 \
  -Dsonar.login=YOUR_TOKEN
```

**Expected Result:** Quality Gate **FAILED** ❌

Check dashboard:
- **Bugs:** 1 (null pointer)
- **Code Smells:** 3-6 (unused variable, console.log, etc.)
- **Status:** Failed ❌

#### Step 6: Fix Issues

Corrected `server.js`:

```javascript
import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

// Removed: unusedVariable
// Removed: buggy /bug endpoint
// Removed: console.log statement

app.get('/', (req, res) => {
  const currentDateTime = new Date().toLocaleString();
  res.send(`Hello World, it is ${currentDateTime}`);
});

if (import.meta.url === `file://${process.argv[1]}`) {
  app.listen(PORT, () => {
    // This console.log is acceptable for startup
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

export default app;
```

#### Step 7: Re-scan

```bash
npx sonar-scanner \
  -Dsonar.host.url=http://localhost:9000 \
  -Dsonar.login=YOUR_TOKEN
```

**Expected Result:** Quality Gate **PASSED** ✅

### Teaching Notes

**Key Concepts:**
- **Quality gates** = Automated pass/fail criteria
- **New code** vs **Overall code** - focus on preventing new issues
- **Gradual improvement** - don't fix everything at once

**Discussion:**
1. *"How strict should quality gates be?"*
   - Start lenient, tighten gradually
   - Align with team capabilities
   - Different gates for different project stages

2. *"What if legacy code has many issues?"*
   - Use "New Code" conditions
   - Focus on preventing deterioration
   - Plan technical debt reduction sprints

**Real-World Scenarios:**
- Production: Very strict (0 bugs, high coverage)
- Development: More lenient (allow some code smells)
- Prototypes: Minimal gates (just security vulnerabilities)

### Common Issues

**Issue: Coverage condition always fails**
- Need to generate coverage report first: `npm test -- --coverage`
- Ensure lcov.info path is correct in sonar-project.properties

**Issue: Quality gate shows "None"**
- Project hasn't been scanned yet with the new gate
- Run scanner again

**Issue: Can't delete default quality gate**
- Default gates (Sonar way) cannot be deleted
- Can be modified or replaced as project default

---

## Exercise 3: GitHub Actions Integration

**Duration:** 45 minutes  
**Difficulty:** Intermediate

### Learning Objectives
- Integrate SonarQube in CI/CD
- Configure GitHub Actions workflows
- Understand PR decoration
- Set up branch protection

### Prerequisites

Students need:
1. GitHub account
2. Forked repository of nodejs_server
3. SonarCloud account (or accessible SonarQube server)

### Complete Solution

#### Step 1: Setup SonarCloud

**For SonarCloud (recommended for training):**

1. Go to https://sonarcloud.io
2. Click **"Log in"** → **"With GitHub"**
3. Authorize SonarCloud
4. Click **"Analyze new project"**
5. Import your forked repository
6. Select organization (personal or create new)
7. Choose **"With GitHub Actions"**

**Generate Token:**
1. Go to **My Account** → **Security**
2. Generate token: `github-actions-token`
3. Copy token (e.g., `abc123def456...`)

#### Step 2: Configure GitHub Secrets

In your forked repository:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Click **"New repository secret"**

**For SonarCloud:**
- Name: `SONAR_TOKEN`
- Value: `your-sonarcloud-token`

**For SonarQube Server:**
- Name: `SONAR_TOKEN`
- Value: `your-sonarqube-token`
- Name: `SONAR_HOST_URL`
- Value: `http://your-server:9000`

#### Step 3: Create Workflow File

Create `.github/workflows/sonar.yml`:

```yaml
name: SonarQube Code Analysis

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  sonarqube:
    name: SonarQube Scan
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        with:
          fetch-depth: 0  # Important for accurate analysis
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests with coverage
        run: npm test -- --coverage
        continue-on-error: true
      
      - name: SonarQube Scan
        uses: SonarSource/sonarqube-scan-action@v2
        env:
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
          SONAR_HOST_URL: ${{ secrets.SONAR_HOST_URL }}  # Remove for SonarCloud
      
      - name: Quality Gate Check
        uses: sonarsource/sonarqube-quality-gate-action@master
        timeout-minutes: 5
        env:
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
```

**For SonarCloud only:**
```yaml
      - name: SonarCloud Scan
        uses: SonarSource/sonarcloud-github-action@master
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
```

#### Step 4: Add sonar-project.properties

Create `sonar-project.properties` in repository root:

**For SonarCloud:**
```properties
sonar.projectKey=your-org_nodejs-server
sonar.organization=your-org
sonar.sources=.
sonar.exclusions=node_modules/**,coverage/**
sonar.tests=server.test.js
sonar.javascript.lcov.reportPaths=coverage/lcov.info
```

**For SonarQube:**
```properties
sonar.projectKey=nodejs-server
sonar.sources=.
sonar.exclusions=node_modules/**,coverage/**
sonar.tests=server.test.js
sonar.javascript.lcov.reportPaths=coverage/lcov.info
```

#### Step 5: Commit and Push

```bash
git add .github/workflows/sonar.yml sonar-project.properties
git commit -m "Add SonarQube CI integration"
git push origin main
```

**Verify:**
1. Go to **Actions** tab
2. See workflow running
3. Wait for completion (1-2 minutes)
4. Check for green checkmark ✅

#### Step 6: Test PR Decoration

```bash
# Create feature branch
git checkout -b feature/test-sonar

# Make a change (add comment or modify code)
echo "// Test comment" >> server.js

# Commit and push
git add server.js
git commit -m "Test SonarQube on PR"
git push origin feature/test-sonar
```

**Create Pull Request:**
1. Go to GitHub repository
2. Click **"Compare & pull request"**
3. Create PR to `main`

**Observe:**
- GitHub Actions runs automatically
- SonarQube/SonarCloud adds comment to PR
- Quality gate status shown
- Code annotations on changed files

#### Step 7: Branch Protection

1. Go to **Settings** → **Branches**
2. Click **"Add rule"** or edit existing
3. Branch name pattern: `main`
4. Enable:
   - ✅ Require status checks to pass
   - ✅ Require branches to be up to date
5. Select: `SonarQube Code Analysis` (or similar)
6. Click **"Create"** or **"Save changes"**

**Test:**
- Try to merge PR with failing quality gate → Blocked 🚫
- Fix issues, push again
- Quality gate passes → Can merge ✅

### Teaching Notes

**Key Concepts:**
- **CI integration** shifts quality left
- **PR decoration** provides immediate feedback
- **Branch protection** enforces quality standards
- **Fail fast** prevents bad code from merging

**Discussion:**
1. *"Should we block all PRs with any issues?"*
   - Depends on project maturity
   - Can start with warnings only
   - Gradually enforce stricter rules

2. *"What about false positives?"*
   - Mark as false positive in SonarQube
   - Add to exclusions if pattern-based
   - Don't disable rules globally

**Best Practices:**
- Run tests with coverage in CI
- Use shallow clone disabling (`fetch-depth: 0`)
- Set reasonable timeouts
- Configure different gates for branches

### Common Issues

**Issue: Workflow fails with "No token provided"**
- Check secrets are set correctly
- Verify secret name matches workflow
- For SonarCloud, ensure GITHUB_TOKEN is included

**Issue: PR decoration not showing**
- Verify SonarCloud/SonarQube has GitHub integration
- Check permissions on GitHub token
- Ensure PR targets correct base branch

**Issue: Quality gate always pending**
- Increase timeout in quality gate action
- Check SonarQube server is accessible
- Verify webhook is configured

**Issue: Coverage shows 0%**
- Ensure `npm test -- --coverage` runs successfully
- Check lcov.info is generated
- Verify path in sonar-project.properties

---

## Exercise 4: Xray Container Scanning

**Duration:** 30 minutes  
**Difficulty:** Intermediate

### Learning Objectives
- Build and tag Docker images
- Push images to Artifactory
- Configure Xray scanning
- Interpret vulnerability reports

### Prerequisites

**Provided during training:**
- JFrog Artifactory URL
- Credentials (username/password or API key)
- Repository name (e.g., `docker-local`)

**Student needs:**
- Docker Desktop installed and running

### Complete Solution

#### Step 1: Verify Docker

```bash
docker --version
# Docker version 24.0.x or higher

docker info
# Verify Docker daemon is running
```

If not installed: https://docs.docker.com/get-docker/

#### Step 2: Create Dockerfile

In `exercises/nodejs_server/`, create `Dockerfile`:

```dockerfile
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:20-alpine

WORKDIR /app

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

COPY --from=builder /app/node_modules ./node_modules
COPY --chown=nodejs:nodejs . .

USER nodejs
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

CMD ["node", "server.js"]
```

#### Step 3: Build Image

```bash
cd exercises/nodejs_server

docker build -t myapp:latest .
```

**Expected output:**
```
[+] Building X.Xs
 => [internal] load build definition
 => [internal] load .dockerignore
 => [builder 1/3] FROM docker.io/library/node:20-alpine
 ...
 => => naming to docker.io/library/myapp:latest
```

**Verify:**
```bash
docker images | grep myapp
# myapp  latest  abc123  X minutes ago  XXX MB
```

#### Step 4: Tag for Artifactory

Replace placeholders:
- `<ARTIFACTORY_URL>`: Provided by instructor (e.g., `mycompany.jfrog.io`)
- `<REPO_NAME>`: Typically `docker-local`

```bash
docker tag myapp:latest \
  <ARTIFACTORY_URL>/<REPO_NAME>/myapp:1.0.0
```

Example:
```bash
docker tag myapp:latest \
  mycompany.jfrog.io/docker-local/myapp:1.0.0
```

#### Step 5: Login to Artifactory

```bash
docker login <ARTIFACTORY_URL>
# Username: student01  (or provided username)
# Password: ********  (or API key)
```

**Alternative with credentials:**
```bash
echo $ARTIFACTORY_PASSWORD | docker login <ARTIFACTORY_URL> \
  -u $ARTIFACTORY_USERNAME --password-stdin
```

#### Step 6: Push Image

```bash
docker push <ARTIFACTORY_URL>/<REPO_NAME>/myapp:1.0.0
```

**Expected output:**
```
The push refers to repository [...]
abc123: Pushed
def456: Pushed
...
1.0.0: digest: sha256:xyz789... size: 1234
```

#### Step 7: Configure Xray (Instructor may have done this)

In JFrog Platform:

1. **Administration** → **Xray** → **Settings** → **Indexed Resources**
2. Click **"Add a Repository"**
3. Select **`docker-local`**
4. Enable **automatic scanning**
5. Click **"Save"**

#### Step 8: Wait for Scan

- Automatic scan triggers in 1-2 minutes
- Or manually: **Xray** → **Scans** → **Scan Artifact**

**Monitor:**
```bash
# Check if scan is complete
# Via UI: Artifactory → Artifacts → docker-local/myapp/1.0.0 → Xray Data tab
```

#### Step 9: View Results

Navigate to artifact in Artifactory:

**Path:** `docker-local/myapp/1.0.0/manifest.json`

Click **"Xray Data"** tab:

**Expected results (example):**
```
Security Vulnerabilities: 18
├── Critical: 2
├── High: 5
├── Medium: 8
└── Low: 3

License Issues: 0

Top Vulnerabilities:
1. CVE-2024-1234 - Critical (CVSS 9.8)
   Component: openssl@1.1.1
   Fix: Upgrade to openssl@3.0.0
   
2. CVE-2024-5678 - Critical (CVSS 9.1)
   Component: libcurl@7.68
   Fix: Upgrade to libcurl@8.0
```

#### Step 10: Investigate

Click on each critical vulnerability:

**Information includes:**
- **CVE ID** and description
- **CVSS Score** (0-10 severity)
- **Affected component** and version
- **Fix version** (if available)
- **References** (NVD, vendor advisories)
- **Exploit availability**

#### Step 11: Review SBOM

Click **"Component Details"** or **"SBOM"**:

**Shows:**
- All dependencies detected
- Licenses for each component
- Vulnerability summary per component
- Dependency graph

### Teaching Notes

**Key Concepts:**
- **SCA (Software Composition Analysis)** scans dependencies
- **Container scanning** includes OS packages and application dependencies
- **SBOM** = Software Bill of Materials (inventory)
- **CVE** = Common Vulnerabilities and Exposures
- **CVSS** = Common Vulnerability Scoring System (0-10)

**Discussion:**
1. *"Should we fix all vulnerabilities?"*
   - Prioritize by severity and exploitability
   - Critical/High in production = immediate
   - Consider context (exposed service vs internal tool)

2. *"What if no fix is available?"*
   - Apply workarounds/mitigations
   - Consider alternative packages
   - Document risk acceptance
   - Monitor for patches

**Real-World Example:**
- Show Log4Shell (CVE-2021-44228) - Critical 10.0
- Discuss impact: Remote Code Execution
- Demonstrate urgency of critical CVEs

### Common Issues

**Issue: Docker build fails**
```bash
# Check Docker daemon
docker info

# Check Dockerfile syntax
docker build --no-cache -t myapp:latest .
```

**Issue: Push fails - unauthorized**
```bash
# Re-login
docker logout <ARTIFACTORY_URL>
docker login <ARTIFACTORY_URL>

# Verify credentials
docker info | grep Username
```

**Issue: No vulnerabilities shown**
- Wait 2-3 minutes for scan completion
- Check repository is indexed
- Verify Xray license is active
- Check image contains actual packages (alpine is minimal)

**Issue: Too many vulnerabilities**
- This is realistic! Base images often have many
- Use official, regularly updated base images
- Consider distroless images for production
- Update base images regularly

---

## Exercise 5: Xray Policy Configuration

**Duration:** 30 minutes  
**Difficulty:** Advanced

### Learning Objectives
- Create Xray watches
- Define security and license policies
- Configure rules and actions
- Handle policy violations

### Complete Solution

#### Step 1: Create Watch

In JFrog Platform:

1. **Administration** → **Xray** → **Watches & Policies**
2. Click **"New Watch"**
3. **Name:** `Docker Production Watch`
4. **Description:** `Monitor production Docker images`
5. **Resources:**
   - Type: **Repositories**
   - Add: **docker-local**
6. **Filters** (optional):
   - Can filter by path pattern (e.g., `*/prod/*`)
7. Click **"Create"**

#### Step 2: Create Security Policy

1. Still in Watches & Policies, click **"New Policy"**
2. **Name:** `Production Security`
3. **Description:** `Security rules for production`
4. **Type:** **Security**

#### Step 3: Add Security Rules

**Rule 1: Block Critical Vulnerabilities**

- Click **"New Rule"**
- **Name:** `Block Critical CVEs`
- **Criteria:**
  - Minimum Severity: **Critical**
  - CVE Score: **9.0 - 10.0**
- **Actions:**
  - ✅ Fail Build
  - ✅ Notify Deployer
  - ✅ Create Ticket (if integrated)
- **Click "Save Rule"**

**Rule 2: Warn on High Vulnerabilities**

- **Name:** `Warn High CVEs`
- **Criteria:**
  - Minimum Severity: **High**
  - CVE Score: **7.0 - 8.9**
- **Actions:**
  - ✅ Generate Violation (warning only)
  - ✅ Notify Watchers
- **Save Rule**

**Rule 3: Block Malicious Packages**

- **Name:** `Block Malware`
- **Criteria:**
  - Package Type: **Any**
  - Malicious Package: **True**
- **Actions:**
  - ✅ Fail Build
  - ✅ Block Download
  - ✅ Notify Security Team
- **Save Rule**

3. Click **"Create Policy"**

#### Step 4: Create License Policy

1. Click **"New Policy"**
2. **Name:** `License Compliance`
3. **Type:** **License**

**Rule: Block Copyleft Licenses**

- **Name:** `Block Restrictive Licenses`
- **Criteria:**
  - **Banned Licenses:**
    - GPL-2.0
    - GPL-3.0
    - AGPL-3.0
  - **Allowed Licenses:**
    - MIT
    - Apache-2.0
    - BSD-2-Clause
    - BSD-3-Clause
    - ISC
- **Actions:**
  - ✅ Fail Build
  - ✅ Notify Legal Team
- **Save Rule**

3. **Create Policy**

#### Step 5: Assign Policies to Watch

1. Go back to **"Docker Production Watch"**
2. Click **"Edit"**
3. **Assigned Policies:**
   - Add: **Production Security**
   - Add: **License Compliance**
4. **Status:** Ensure watch is **Active** ✅
5. Click **"Update"**

#### Step 6: Test Security Policy

**Introduce vulnerability** by using older base image:

Modify `Dockerfile`:
```dockerfile
# Use older image with known vulnerabilities
FROM node:16.0.0-alpine  # Very old version

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
```

**Rebuild and push:**
```bash
docker build -t <ARTIFACTORY_URL>/docker-local/myapp:1.0.1 .
docker push <ARTIFACTORY_URL>/docker-local/myapp:1.0.1
```

#### Step 7: Wait for Scan & Check Violations

After 1-2 minutes:

1. **Xray** → **Violations**
2. Filter by **Watch:** `Docker Production Watch`
3. Find violations for `myapp:1.0.1`

**Expected:**
- Multiple security violations (critical CVEs in old node version)
- Possibly license violations if dependencies changed

#### Step 8: Test License Policy

**Introduce GPL dependency:**

Modify `package.json`:
```json
{
  "dependencies": {
    "express": "^4.18.2",
    "readline-sync": "^1.4.10"  // Has GPL-3.0 license
  }
}
```

**Rebuild and push:**
```bash
npm install
docker build -t <ARTIFACTORY_URL>/docker-local/myapp:1.0.2 .
docker push <ARTIFACTORY_URL>/docker-local/myapp:1.0.2
```

**Check violations:**
- Should see license policy violation
- GPL-3.0 from readline-sync

#### Step 9: Handle Violations

**Options:**

**1. Fix the issue (preferred):**
```bash
# For security: Update to newer base image
FROM node:20-alpine

# For license: Remove GPL package or get legal approval
npm uninstall readline-sync
```

**2. Create exception:**
- In violation details, click **"Ignore"**
- Provide justification: "Approved by Legal team - ticket #123"
- Set expiration date

**3. Update policy:**
- If false positive or acceptable risk
- Modify policy rules
- Document decision

#### Step 10: Create Remediation Report

Document findings:

```markdown
## Vulnerability Remediation Plan

### Image: myapp:1.0.1

**Critical Issues:**
1. CVE-2024-XXXX - Node.js vulnerability
   - Severity: 9.8
   - Fix: Upgrade base image to node:20-alpine
   - Priority: P0 - Immediate
   
2. CVE-2024-YYYY - Alpine package vulnerability
   - Severity: 9.1
   - Fix: Use newer Alpine version
   - Priority: P0 - Immediate

**License Issues:**
1. readline-sync - GPL-3.0
   - Risk: Copyleft license
   - Action: Remove package or seek legal approval
   - Priority: P1 - Before production deployment
```

### Teaching Notes

**Key Concepts:**
- **Watches** define what to scan
- **Policies** define rules and enforcement
- **Rules** are individual conditions
- **Actions** are automatic responses
- **Violations** are policy breaches

**Policy Design Philosophy:**
1. **Security policies:** Protect from vulnerabilities
2. **License policies:** Ensure compliance
3. **Operational policies:** Enforce standards

**Discussion:**
1. *"How strict should policies be?"*
   - Production: Very strict
   - Development: More lenient
   - POC: Minimal
   - Balance security vs development velocity

2. *"What about false positives?"*
   - Document and ignore with justification
   - Review periodically
   - Provide feedback to Xray (improve AI)

**Best Practices:**
- Start with warnings, then enforce
- Different policies for different environments
- Regular policy reviews
- Clear escalation paths

### Common Issues

**Issue: Policy not enforcing**
```bash
# Check:
1. Watch is Active
2. Policy is assigned to watch
3. Repository is in watch scope
4. Scan has completed
```

**Issue: Too many violations**
- Expected for older images
- Prioritize by severity
- Create remediation backlog
- Fix incrementally

**Issue: Can't delete policy**
- Check if policy is assigned to any watch
- Unassign first, then delete

**Issue: Violation doesn't appear**
- Wait for scan to complete (2-3 minutes)
- Check watch and policy are both active
- Verify repository is indexed

---

## Common Issues Across All Exercises

### Environment Issues

**Docker Desktop not starting:**
- Windows: Enable WSL 2, allocate more RAM
- Mac: Increase memory in Docker Desktop settings
- Linux: Check docker service status

**Port conflicts:**
```bash
# Find what's using port 9000
lsof -i :9000
netstat -ano | findstr :9000  # Windows

# Kill process or change port
```

**Network/firewall issues:**
- Corporate firewalls may block Docker Hub
- May need proxy configuration
- Check with IT department

### Time Management

**Exercise running over time:**
- Have pre-built images ready
- Use docker-compose for quick setup
- Skip optional steps if needed

**Students falling behind:**
- Pair slower students with faster ones
- Provide completed examples to catch up
- Focus on concepts vs completion

### Technical Variations

**Different tools versions:**
- Docker versions may vary
- Node.js versions affect results
- SonarQube rules change between versions
- Document versions used in training

**Platform differences:**
- Windows vs Mac vs Linux paths
- Line endings (CRLF vs LF)
- File permissions

---

## Teaching Tips

### Before Class

**Preparation:**
1. Test all exercises yourself
2. Prepare backup accounts/servers
3. Have Docker images pre-pulled
4. Check all URLs/credentials work
5. Prepare troubleshooting cheat sheet

**Environment Setup:**
- Ensure good internet connectivity
- Have offline alternatives ready
- Pre-download large files
- Test screen sharing/projection

### During Class

**Engagement:**
- Walk around, check student progress
- Ask questions to check understanding
- Encourage students to help each other
- Celebrate successes

**Pacing:**
- Build in buffer time
- Have extension exercises ready
- Allow breaks during long exercises
- Check for questions frequently

**Troubleshooting:**
- Help debug quickly to maintain momentum
- Document common issues on board
- Use student problems as teaching moments
- Have alternative paths ready

### After Class

**Follow-up:**
- Collect feedback
- Document issues encountered
- Update materials based on experience
- Share additional resources

### Difficult Scenarios

**"It works on my machine":**
- Check environment differences
- Use containers for consistency
- Document known issues

**Complete failure of service:**
- Have backup instances ready
- Use screenshots/videos as fallback
- Pair students to share working environments

**Student frustration:**
- Acknowledge the challenge
- Provide positive encouragement
- Offer one-on-one help during breaks
- Focus on learning vs completion

---

## Additional Resources

### Documentation
- [SonarQube Docs](https://docs.sonarqube.org/)
- [SonarCloud Docs](https://docs.sonarcloud.io/)
- [JFrog Xray Docs](https://www.jfrog.com/confluence/display/JFROG/Xray)
- [Docker Docs](https://docs.docker.com/)
- [GitHub Actions Docs](https://docs.github.com/en/actions)

### Best Practices
- [SonarQube Best Practices](https://docs.sonarqube.org/latest/analysis/overview/)
- [Container Security Best Practices](https://docs.docker.com/develop/security-best-practices/)
- [DevSecOps Practices](https://www.devsecops.org/)

### Tools
- [SonarLint IDE Extension](https://www.sonarlint.org/)
- [JFrog CLI](https://www.jfrog.com/confluence/display/CLI/JFrog+CLI)
- [Docker Desktop](https://www.docker.com/products/docker-desktop)

---

## Appendix: Quick Reference

### SonarQube Commands

```bash
# Start SonarQube
docker run -d --name sonarqube -p 9000:9000 sonarqube:lts-community

# Stop SonarQube
docker stop sonarqube

# View logs
docker logs -f sonarqube

# Scan project
npx sonar-scanner \
  -Dsonar.host.url=http://localhost:9000 \
  -Dsonar.login=TOKEN
```

### Docker Commands

```bash
# Build image
docker build -t myapp:tag .

# Tag image
docker tag myapp:tag registry/repo/myapp:tag

# Push image
docker push registry/repo/myapp:tag

# List images
docker images

# Remove image
docker rmi myapp:tag
```

### Common URLs

- **SonarQube Local:** http://localhost:9000
- **SonarCloud:** https://sonarcloud.io
- **Artifactory:** (provided by instructor)

### Default Credentials

- **SonarQube:** admin / admin (change on first login)
- **Artifactory:** (provided by instructor)

---

**End of Instructor Guide**
