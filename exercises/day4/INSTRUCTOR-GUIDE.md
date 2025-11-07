# Day 4 Instructor Guide - Code Quality and Security Scanning

## Overview

Day 4 focuses on integrating automated code quality and security scanning into the DevOps workflow using **SonarQube** for code quality and **JFrog Xray** for vulnerability scanning.

**Duration:** Full day (6-7 hours of instruction + exercises)

**Target Audience:** DevOps practitioners, developers, and operations teams

## Learning Objectives

By the end of Day 4, students will be able to:

1. Set up and configure SonarQube for code quality analysis
2. Understand quality metrics, gates, and profiles
3. Integrate SonarQube into CI/CD pipelines
4. Configure and use JFrog Xray for vulnerability scanning
5. Create and enforce security policies with Xray
6. Implement DevSecOps practices in their workflow

## Schedule Overview

### Morning Session (3.5 hours)

- **Introduction** (30 min)
- **SonarQube Basics** (60 min)
- **Exercise 1: Local SonarQube Setup** (45 min)
- **Break** (15 min)
- **Quality Gates & CI/CD Integration** (60 min)

### Afternoon Session (3 hours)

- **Exercise 2: SonarQube in CI/CD** (45 min)
- **JFrog Xray Overview** (45 min)
- **Exercise 3: Container Scanning** (30 min)
- **Break** (15 min)
- **Exercise 4: Xray Policies** (30 min)
- **Best Practices & Wrap-up** (30 min)

---

## Pre-Class Preparation

### For Instructors

1. **Environment Setup**
   - Run the environment check script on your machine
   - Start SonarQube using docker-compose: `docker compose up -d`
   - Verify SonarQube is accessible at http://localhost:9000
   - Access to a JFrog Artifactory instance with Xray enabled (can be cloud trial)
   - Prepare demo repositories with intentional code quality issues

2. **Materials Check**
   - All exercise materials in `exercises/day4/` directory
   - Sample workflows tested and working
   - Presentation slides reviewed and ready
   - Exercise solutions prepared

3. **Demo Preparation**
   - Fork the `exercises/nodejs_server` to your account
   - Set up SonarCloud account or local SonarQube
   - Create sample quality gates
   - Prepare Xray policies in Artifactory

### For Students

**Prerequisites (send 1 week before):**

1. **Required Software**
   - Docker Desktop installed and running
   - Node.js 20+ installed
   - Git configured with username and email
   - GitHub account with Actions enabled

2. **Optional but Recommended**
   - GitHub CLI (`gh`) for easier authentication
   - Visual Studio Code or preferred IDE
   - Docker Desktop resource allocation: 4GB RAM minimum

3. **Pre-class Tasks**
   - Run environment check: `./exercises/day4/check-environment.sh`
   - Fork the tuto_devops_slides repository
   - Create a SonarCloud account (free for public repos)
   - Ensure GitHub Actions is enabled on forked repo

---

## Exercise 1: Local SonarQube Setup (45 minutes)

### Objective

Get hands-on experience with local SonarQube installation and run the first code analysis.

### Prerequisites Check (5 min)

Before starting, verify:
- Docker is running: `docker info`
- Port 9000 is available: `nc -z localhost 9000 || echo "Port available"`
- Students are in the `exercises/day4` directory

### Step-by-Step Guide

#### Part 1: Start SonarQube (10 min)

1. **Navigate to exercise directory**
   ```bash
   cd exercises/day4
   ```

2. **Start SonarQube with Docker Compose**
   ```bash
   docker compose up -d
   ```

3. **Wait for startup** (takes 1-2 minutes)
   ```bash
   # Watch logs
   docker compose logs -f sonarqube
   
   # Look for: "SonarQube is operational"
   ```

4. **Access SonarQube UI**
   - Open browser: http://localhost:9000
   - Default credentials: `admin` / `admin`
   - **Important:** Change password when prompted

**Common Issues:**
- Port 9000 already in use → Check and stop other services
- Container crashes → Check Docker resources (needs 2GB+ RAM)
- Slow startup → Normal for first time, be patient

#### Part 2: Create Project and Generate Token (10 min)

1. **Create New Project**
   - Click "Create Project" → "Manually"
   - Project key: `nodejs-server`
   - Display name: `Node.js Server`
   - Click "Set Up"

2. **Generate Project Token**
   - Choose "Locally"
   - Generate token
   - **Important:** Copy token immediately (shown only once)
   - Save token as environment variable:
     ```bash
     export SONAR_TOKEN="your-token-here"
     ```

3. **Choose Analysis Method**
   - Select "Other" (for manual analysis)
   - OS: Linux/Mac
   - Copy the provided scanner command

#### Part 3: Analyze the Project (15 min)

1. **Navigate to nodejs_server**
   ```bash
   cd ../nodejs_server
   ```

2. **Copy SonarQube configuration**
   ```bash
   cp ../day4/sonar-project.properties .
   ```

3. **Review configuration** (explain each setting)
   ```properties
   sonar.projectKey=nodejs-server
   sonar.sources=.
   sonar.exclusions=node_modules/**
   ```

4. **Run analysis** (using npx, no installation needed)
   ```bash
   npx sonar-scanner \
     -Dsonar.host.url=http://localhost:9000 \
     -Dsonar.token=$SONAR_TOKEN
   ```

5. **Review results in UI**
   - Refresh SonarQube dashboard
   - Explore: Bugs, Code Smells, Security Hotspots
   - Show code examples with issues
   - Explain severity levels

#### Part 4: Understanding the Results (10 min)

**Walk through the UI together:**

1. **Overview Dashboard**
   - Reliability rating (Bugs)
   - Security rating (Vulnerabilities)
   - Maintainability rating (Code Smells)
   - Coverage percentage
   - Duplications

2. **Issues Tab**
   - Filter by type, severity
   - Show example bug
   - Explain "Why is this an issue?"
   - Demonstrate code location

3. **Measures Tab**
   - Complexity metrics
   - Technical debt
   - Coverage details

**Discussion Points:**
- What surprises you about the results?
- Do you agree with all issues found?
- How would you prioritize fixes?

### Exercise Deliverables

✅ Running SonarQube instance  
✅ Successfully scanned nodejs_server project  
✅ Understanding of basic metrics and issues

### Troubleshooting

| Problem | Solution |
|---------|----------|
| Scanner not found | Use `npx sonar-scanner` instead of `sonar-scanner` |
| Authentication failed | Check token is correct, regenerate if needed |
| Connection refused | Ensure SonarQube is fully started (check logs) |
| No issues found | Check exclusions in sonar-project.properties |

---

## Exercise 2: SonarQube in CI/CD (45 minutes)

### Objective

Integrate SonarQube scanning into GitHub Actions workflow with automatic quality gate checking.

### Prerequisites Check (5 min)

- Students have forked the repository
- GitHub Actions is enabled
- Students have SonarCloud account OR local SonarQube exposed via ngrok/tunnel

### Setup Options

**Option A: SonarCloud (Recommended for exercises)**
- Free for public repositories
- No infrastructure needed
- PR decoration included

**Option B: Self-hosted SonarQube**
- Use local instance from Exercise 1
- Requires exposing via ngrok or similar
- More realistic for enterprise scenarios

### Step-by-Step Guide (Option A: SonarCloud)

#### Part 1: SonarCloud Setup (10 min)

1. **Create SonarCloud Account**
   - Go to https://sonarcloud.io
   - Sign in with GitHub
   - Authorize SonarCloud

2. **Import Repository**
   - Click "+" → "Analyze new project"
   - Select your forked repository
   - Click "Set Up"

3. **Get Organization and Project Keys**
   - Note your organization key (usually GitHub username)
   - Note project key (usually repo name)

4. **Generate Token**
   - My Account → Security → Generate Token
   - Name: "GitHub Actions"
   - Copy token immediately

#### Part 2: Configure GitHub Secrets (5 min)

1. **Navigate to Repository Settings**
   - Your forked repo → Settings → Secrets and variables → Actions

2. **Add Repository Secrets**
   ```
   SONAR_TOKEN: <your-sonarcloud-token>
   ```

3. **Verify secrets are set** (they won't be visible, but will appear in list)

#### Part 3: Create Workflow (15 min)

1. **Create workflow file**
   ```bash
   mkdir -p .github/workflows
   ```

2. **Copy template**
   ```bash
   cp exercises/day4/.github-workflows-sonarcloud.yml \
      .github/workflows/sonarqube.yml
   ```

3. **Update configuration** in the workflow file:
   ```yaml
   args: >
     -Dsonar.projectKey=YOUR_USERNAME_YOUR_REPO
     -Dsonar.organization=YOUR_USERNAME
   ```

4. **Commit and push**
   ```bash
   git add .github/workflows/sonarqube.yml
   git commit -m "Add SonarQube workflow"
   git push
   ```

#### Part 4: Verify and Test (10 min)

1. **Check workflow execution**
   - Go to Actions tab in GitHub
   - Find "SonarCloud Analysis" workflow
   - Verify it runs successfully

2. **View results in SonarCloud**
   - Go back to SonarCloud
   - See the analysis results
   - Compare with local analysis

3. **Create a PR to test PR decoration**
   ```bash
   git checkout -b test-sonar
   # Make a small change
   echo "// Test comment" >> server.js
   git add server.js
   git commit -m "Test SonarQube PR decoration"
   git push -u origin test-sonar
   ```

4. **Create PR on GitHub and observe**
   - Quality gate status appears in PR
   - SonarCloud bot comments on PR
   - Code quality metrics visible

### Exercise Deliverables

✅ SonarCloud configured for repository  
✅ GitHub Actions workflow running successfully  
✅ PR decoration working  
✅ Understanding of CI integration

### Advanced Challenges (Optional)

For students who finish early:

1. Configure quality gate to fail on new bugs
2. Add branch protection rule requiring quality gate pass
3. Set up notifications for failed quality gates
4. Implement coverage threshold enforcement

### Troubleshooting

| Problem | Solution |
|---------|----------|
| Workflow fails with auth error | Check SONAR_TOKEN secret is set correctly |
| No PR decoration | Ensure SonarCloud app is installed on repository |
| Analysis takes too long | Normal for first run, subsequent runs are faster |
| Quality gate always passes | Review gate conditions in SonarCloud |

---

## Exercise 3: Container Scanning with Xray (30 minutes)

### Objective

Scan Docker container images for vulnerabilities using JFrog Xray.

### Prerequisites

**Note:** This exercise requires access to JFrog Artifactory with Xray. Options:

1. **Cloud Trial** (Recommended): Free JFrog Cloud trial
2. **Instructor-provided**: Shared Artifactory instance
3. **Demo Only**: Instructor demonstrates if infrastructure unavailable

### Setup (If using cloud trial)

1. **Create JFrog Cloud Account**
   - Go to https://jfrog.com/start-free/
   - Sign up for free trial
   - Wait for environment provisioning (~5 min)

2. **Create Docker Repository**
   - Administration → Repositories → Add Repository
   - Choose "Docker" → "Local"
   - Key: `docker-local`
   - Click "Create"

### Step-by-Step Guide

#### Part 1: Build and Tag Image (10 min)

1. **Navigate to nodejs_server**
   ```bash
   cd exercises/nodejs_server
   ```

2. **Build the image**
   ```bash
   docker build -t nodejs-server:latest .
   ```

3. **Tag for Artifactory**
   ```bash
   # Replace with your Artifactory URL
   docker tag nodejs-server:latest \
     <your-instance>.jfrog.io/docker-local/nodejs-server:1.0.0
   ```

#### Part 2: Push to Artifactory (10 min)

1. **Login to Artifactory**
   ```bash
   docker login <your-instance>.jfrog.io
   # Username: your-email
   # Password: get from: User menu → Set Me Up → Docker → Generate token
   ```

2. **Push the image**
   ```bash
   docker push <your-instance>.jfrog.io/docker-local/nodejs-server:1.0.0
   ```

3. **Verify in UI**
   - Application → Artifactory → Artifacts
   - Navigate to docker-local
   - Find your image

#### Part 3: Configure and View Scan Results (10 min)

1. **Enable Xray Indexing**
   - Administration → Xray → Indexed Resources
   - Add docker-local repository
   - Save

2. **Trigger Scan** (automatic or manual)
   - Wait 1-2 minutes for indexing
   - Application → Xray → Scan List
   - Find your image

3. **Review Scan Results**
   - Click on the scanned artifact
   - View vulnerabilities by severity:
     - Critical (CVSS 9.0-10.0)
     - High (CVSS 7.0-8.9)
     - Medium (CVSS 4.0-6.9)
     - Low (CVSS 0.1-3.9)

4. **Explore SBOM (Software Bill of Materials)**
   - Components tab
   - See all dependencies
   - Identify direct vs transitive dependencies

**Discussion Points:**
- What vulnerabilities were found?
- Which ones should be addressed immediately?
- How would you remediate critical vulnerabilities?
- What is the impact of fixing vs. not fixing?

### Exercise Deliverables

✅ Docker image built and pushed to Artifactory  
✅ Xray scan completed  
✅ Understanding of vulnerability severity  
✅ Knowledge of SBOM concept

### Troubleshooting

| Problem | Solution |
|---------|----------|
| Can't login to Artifactory | Regenerate token, check URL format |
| Push fails | Check repository permissions |
| No scan results | Wait for indexing, check Xray is enabled |
| All vulnerabilities are low | This is fine! nodejs:20-alpine is minimal |

---

## Exercise 4: Xray Policy Configuration (30 minutes)

### Objective

Configure Xray policies to enforce security and license compliance rules.

### Step-by-Step Guide

#### Part 1: Create Security Policy (10 min)

1. **Navigate to Policies**
   - Application → Xray → Policies
   - Click "New Policy"

2. **Configure Policy**
   - Name: `production-security`
   - Description: `Security policy for production artifacts`

3. **Add Security Rule**
   - Click "New Rule"
   - Name: `block-critical-vulnerabilities`
   - Criteria:
     - Min Severity: Critical
     - CVSS Score: 9.0 - 10.0
   - Actions:
     - ✅ Fail Build
     - ✅ Block Download
     - ✅ Notify Deployer
   - Save Rule

4. **Add High Severity Rule**
   - Name: `warn-high-vulnerabilities`
   - Min Severity: High
   - Actions:
     - ❌ Fail Build (warn only)
     - ✅ Notify Deployer

#### Part 2: Create Watch (10 min)

1. **Create Watch**
   - Application → Xray → Watches
   - Click "New Watch"
   - Name: `production-watch`
   - Description: `Watch for production Docker images`

2. **Add Resources**
   - Type: Repository
   - Select: docker-local
   - Filter: `*/production/*` (or `*` for all)

3. **Assign Policy**
   - Select `production-security` policy
   - Save Watch

#### Part 3: Test Policy Enforcement (10 min)

**Option 1: Use a vulnerable base image**

1. **Create Dockerfile with known vulnerability**
   ```dockerfile
   # Use older Node.js version with known CVEs
   FROM node:14.15.0
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci
   COPY . .
   CMD ["node", "server.js"]
   ```

2. **Build and push**
   ```bash
   docker build -f Dockerfile.vulnerable -t nodejs-vuln:1.0 .
   docker tag nodejs-vuln:1.0 \
     <your-instance>.jfrog.io/docker-local/nodejs-vuln:1.0
   docker push <your-instance>.jfrog.io/docker-local/nodejs-vuln:1.0
   ```

3. **Check for policy violation**
   - Xray → Violations
   - See the blocked artifact
   - Review violation details

**Option 2: Simulate with instructor demo**

If students don't have vulnerable images, demonstrate with pre-prepared example.

### Exercise Deliverables

✅ Security policy created  
✅ Watch configured and active  
✅ Understanding of policy enforcement  
✅ Experience with violation handling

### Advanced Discussion Topics

1. **Policy Strategy**
   - How strict should policies be?
   - Gradual enforcement vs. strict from day 1
   - Handling false positives

2. **Remediation Process**
   - Update dependencies
   - Find alternative packages
   - Use ignore/exception with justification

3. **License Compliance**
   - Show license policy example
   - Discuss GPL vs. permissive licenses
   - Legal implications

---

## Common Issues and Solutions

### SonarQube Issues

| Issue | Cause | Solution |
|-------|-------|----------|
| Scanner can't connect | Wrong URL or token | Verify `SONAR_HOST_URL` and token |
| Quality gate fails unexpectedly | New code period not set | Configure new code definition |
| Coverage showing 0% | No coverage report generated | Run tests with coverage first |
| Too many issues | First time scan | Focus on new code quality gate |

### Xray Issues

| Issue | Cause | Solution |
|-------|-------|----------|
| No vulnerabilities found | Not indexed yet | Wait for indexing, trigger manual scan |
| Policy not enforced | Watch not active | Check watch status and repository scope |
| False positives | Xray database outdated | Ignore with justification, update Xray |
| Can't push to Artifactory | Permissions | Check user has deploy permission |

---

## Best Practices to Emphasize

### SonarQube Best Practices

1. **Focus on New Code First**
   - Use "water leak" principle
   - Set strict gates for new code
   - Gradually improve overall code

2. **Quality Gate Configuration**
   - Start lenient, tighten over time
   - Get team buy-in on rules
   - Review and adjust regularly

3. **Integration Strategy**
   - Run on every commit/PR
   - Show results in PR reviews
   - Block merges on failed gates

4. **Team Adoption**
   - Training for all developers
   - Regular review of metrics
   - Celebrate improvements

### Xray Best Practices

1. **Policy Strategy**
   - Critical vulnerabilities → Block immediately
   - High vulnerabilities → Fix within sprint
   - Medium/Low → Backlog with risk assessment

2. **SBOM Maintenance**
   - Regular dependency updates
   - Monitor for new CVEs
   - Track components across services

3. **License Compliance**
   - Define acceptable licenses
   - Legal review of edge cases
   - Document exceptions

4. **Remediation Workflow**
   - Prioritize by exploitability
   - Consider context (internet-facing vs. internal)
   - Balance security vs. functionality

---

## Post-Exercise Discussion Topics

### Real-World Scenarios

1. **Legacy Code with Many Issues**
   - Q: "We have 10,000 issues in SonarQube. Where do we start?"
   - A: Focus on new code only. Set gates for new code, chip away at old issues gradually.

2. **False Positive Vulnerabilities**
   - Q: "Xray flagged a vulnerability that doesn't affect us. What do we do?"
   - A: Document why it's not applicable, create ignore rule with expiration date.

3. **Conflicting Priorities**
   - Q: "Fixing all critical CVEs will take weeks. We have a release deadline."
   - A: Risk assessment. Fix exploitable issues, plan others. Consider runtime protection.

4. **Developer Resistance**
   - Q: "Developers are annoyed by quality gates blocking their PRs."
   - A: Education on why it matters. Gradual adoption. Quick feedback loops. Celebrate success.

### Organizational Adoption

- Start with pilot team
- Demonstrate value with metrics
- Provide training and support
- Make it easy to do the right thing
- Iterate based on feedback

---

## Homework Suggestions

1. **SonarQube**
   - Set up SonarCloud for personal project
   - Configure custom quality gate
   - Add coverage reporting to tests
   - Fix top 5 code smells

2. **Xray**
   - Review dependencies in current project
   - Identify critical vulnerabilities
   - Create remediation plan
   - Document license compliance

3. **Integration**
   - Add both SonarQube and security scanning to CI/CD
   - Set up notifications for violations
   - Create dashboard for metrics

---

## Additional Resources

### Documentation

- [SonarQube Documentation](https://docs.sonarqube.org/)
- [SonarCloud Documentation](https://docs.sonarcloud.io/)
- [JFrog Xray Documentation](https://www.jfrog.com/confluence/display/JFROG/Xray)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [CVE Database](https://cve.mitre.org/)

### Tools

- [SonarLint IDE Plugin](https://www.sonarlint.org/)
- [Docker Scout](https://docs.docker.com/scout/)
- [Snyk](https://snyk.io/)
- [Dependabot](https://github.com/dependabot)

### Further Learning

- [DevSecOps Practices](https://www.devsecops.org/)
- [Software Composition Analysis (SCA)](https://owasp.org/www-community/Component_Analysis)
- [Secure Software Development Lifecycle](https://safecode.org/)

---

## Feedback Collection

At end of day, ask students:

1. Which exercise was most valuable?
2. What concepts are still unclear?
3. What would you change in your current workflow?
4. Any technical difficulties encountered?
5. Suggestions for improvement?

Use this feedback to improve future sessions and address gaps in understanding.

---

## Quick Reference

### Docker Commands

```bash
# Start SonarQube
docker compose up -d

# Check logs
docker compose logs -f sonarqube

# Stop SonarQube
docker compose down

# Stop and remove data
docker compose down -v
```

### SonarScanner Commands

```bash
# Run analysis
npx sonar-scanner \
  -Dsonar.host.url=http://localhost:9000 \
  -Dsonar.token=$SONAR_TOKEN

# With additional parameters
npx sonar-scanner \
  -Dsonar.projectKey=my-project \
  -Dsonar.sources=. \
  -Dsonar.host.url=http://localhost:9000 \
  -Dsonar.token=$SONAR_TOKEN
```

### File Locations

- Docker Compose: `exercises/day4/docker-compose.yml`
- SonarQube config: `exercises/day4/sonar-project.properties`
- Workflows: `exercises/day4/.github-workflows-*.yml`
- Xray policies: `exercises/day4/xray-policy-*.json`
- Environment check: `exercises/day4/check-environment.sh`

---

## Notes for Instructor

- **Timing is tight**: Be prepared to skip Exercise 4 if running behind
- **Technical issues**: Have backup plans (pre-recorded demos, screenshots)
- **Mixed skill levels**: Pair advanced students with beginners
- **Keep it practical**: Focus on real-world applicability
- **Encourage questions**: Make it interactive
- **Follow up**: Provide summary and resources after class

Good luck with the training! 🚀
