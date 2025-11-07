---
layout: section
---

# Day 5 — Advanced GitHub usage

## Objectives

- Go beyond basics with GitHub Actions
- Explore advanced triggers and workflows
- Leverage GitHub for project management

---

# Day 5 — Building on the Week

**Day 1**: Git & GitHub basics → branches, PRs

**Day 2**: CI/CD basics → first workflows

**Day 3**: Artifacts → dependency management

**Day 4**: Security → SonarQube, Xray

**Today**: Advanced Actions & project management

---

# Week's Journey

```mermaid
graph TB
    D1[Day 1: Git & GitHub] --> D2[Day 2: CI/CD]
    D2 --> D3[Day 3: Artifacts]
    D3 --> D4[Day 4: Security]
    D4 --> D5[Day 5: Advanced]
    
    style D1 fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
    style D2 fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
    style D3 fill:#e8f5e9,stroke:#388e3c,stroke-width:2px
    style D4 fill:#fff3e0,stroke:#f57c00,stroke-width:2px
    style D5 fill:#fce4ec,stroke:#c2185b,stroke-width:3px
```

---

# GitHub Actions — advanced triggers

**Recall from Day 2**: We created workflows with `on: push`

**Today**: We expand to sophisticated triggers

- on: schedule (cron)
- on: issue_comment, issues, pull_request_review
- on: workflow_run (chained workflows)
- Path filters and conditional jobs

```yaml
on:
  push:
    branches: [ main ]
    paths: [ 'src/**', '!docs/**' ]
  schedule:
    - cron: '0 7 * * 1-5' # weekdays 7am UTC
```

---

# Reusable and composite workflows

- Reusable workflows with workflow_call
- Composite actions to share steps

```yaml
# .github/workflows/reuse.yml
on: workflow_call
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: make ci
```

---

# Environments and approvals

- Protected environments (dev, staging, prod)
- Required reviewers and wait timers
- Environment secrets and variables

---

# Caching and artifacts

**Building on Day 3**: We learned about artifact management with Artifactory

**Today**: GitHub's built-in artifact and caching features

- actions/cache for dependencies
- upload/download-artifact for build outputs
- Retention and size limits

---

# GitHub-native security

**Building on Day 4**: We learned SonarQube and Xray

**Today**: GitHub's integrated security features

- CodeQL for code scanning
- Dependabot for dependency updates
- Secret scanning
- Security advisories

---

# Complete workflow example

Bringing together all 5 days:

```yaml
# .github/workflows/complete-pipeline.yml
name: Complete CI/CD Pipeline
on:
  push:
    branches: [ main ]          # Day 1: Git workflows
  pull_request:
    branches: [ main ]
  schedule:
    - cron: '0 2 * * 1'         # Day 5: Advanced triggers

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      # Day 2: CI/CD automation
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          
      # Day 3: Artifact caching
      - name: Cache dependencies
        uses: actions/cache@v4
        with:
          path: ~/.npm
          key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build project
        run: npm run build
        
      - name: Run tests
        run: npm test
        
      # Day 4: Security scanning
      - name: SonarQube Scan
        run: sonar-scanner
        env:
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
          
      # Day 5: Advanced features
      - name: Upload test results
        uses: actions/upload-artifact@v4
        with:
          name: test-results
          path: coverage/
          
  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      # Day 4 & 5: GitHub-native security
      - name: Initialize CodeQL
        uses: github/codeql-action/init@v3
        with:
          languages: javascript
          
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          
      - name: Install and build
        run: |
          npm ci
          npm run build
          
      - name: Perform CodeQL Analysis
        uses: github/codeql-action/analyze@v3
```

---

# Project management with GitHub

- Issues, labels, milestones
- Projects (tables/boards), workflows automation
- Discussions and Wikis
- Code Owners and branch protection rules

---

# Troubleshooting and Debugging

Students will encounter errors in GitHub Actions

**This section covers**:
- Debug logging techniques
- Interactive debugging tools
- Common error patterns
- How to read logs effectively

---

# Debug Logging

Enable detailed output to see what's happening:

**Set repository secrets** (Settings → Secrets → Actions):
```yaml
ACTIONS_STEP_DEBUG = true
ACTIONS_RUNNER_DEBUG = true
```

**Or in workflow file**:
```yaml
env:
  ACTIONS_STEP_DEBUG: true
```

This shows internal step execution and debug messages

---

# Interactive Debugging

**SSH Debugging with tmate**:

```yaml
steps:
  - uses: actions/checkout@v4
  - name: Setup tmate session
    uses: mxschmitt/action-tmate@v3
    if: failure()  # Only on failure
```

**Alternative**: Print context for debugging
```yaml
- name: Dump GitHub context
  run: echo '${{ toJSON(github) }}'
- name: Dump job context
  run: echo '${{ toJSON(job) }}'
```

---

# Common Errors — Syntax

**Invalid YAML**:
```yaml
# Wrong indentation
jobs:
build:  # Missing spaces
  runs-on: ubuntu-latest
```

**Wrong event names**:
```yaml
on: pull-request  # ❌ Wrong
on: pull_request  # ✅ Correct
```

**Missing required fields**:
```yaml
jobs:
  test:
    # Missing runs-on
    steps: [...]
```

---

# Common Errors — Permissions

```yaml
Error: Resource not accessible by integration
```

**Solution**: Add explicit permissions
```yaml
permissions:
  contents: write
  pull-requests: write
```

**Default permissions** are often read-only

**Principle of least privilege**: Only grant what's needed

---

# Common Errors — Runtime

**Command not found**:
```bash
Error: python: command not found
```
→ Add setup step: `actions/setup-python@v5`

**File not found**:
```bash
Error: package.json: No such file
```
→ Add checkout: `actions/checkout@v4`

**Exit code 1**:
→ Review logs for the actual error message

---

# Reading Logs Effectively

**Step-by-step approach**:
1. Find failed step (red X icon)
2. Expand to see full output
3. Scroll to bottom (error usually at end)
4. Look for "Error:" or "FAILED" messages
5. Check exit codes

**Tip**: Errors often appear in the last 10-20 lines

**Use search** (Ctrl+F) to find "error" or "failed"

---

# Best Practices Summary

Consolidating what we've learned throughout the week

**This section covers**:
- Workflow organization
- Security best practices
- Performance optimization
- Team collaboration

---

# Workflow Organization

**DRY Principle** (Don't Repeat Yourself):
- Use reusable workflows (`workflow_call`)
- Extract common steps into composite actions
- Avoid duplication across workflows

**Naming Conventions**:
- Workflows: `ci-build-test.yml`, `deploy-production.yml`
- Jobs: `build`, `test`, `deploy`
- Secrets: `AWS_ACCESS_KEY`, `NPM_TOKEN`

Clear names help team understanding

---

# Security — Secrets Management

**Never hardcode sensitive data**:
```yaml
# ❌ Bad
- run: aws configure --access-key AKIAIOSFODNN7EXAMPLE

# ✅ Good
- run: aws configure --access-key ${{ secrets.AWS_ACCESS_KEY }}
```

**Best practices**:
- Use environment-specific secrets (`DEV_DB_PASSWORD`, `PROD_DB_PASSWORD`)
- Rotate secrets regularly
- Apply principle of least privilege
- Review secret access in audit logs

---

# Security — Permissions

**Minimal permissions** by default:
```yaml
permissions:
  contents: read  # Minimal access
```

**Grant only what's needed**:
```yaml
permissions:
  contents: write      # To push changes
  pull-requests: write # To comment on PRs
  issues: read         # To read issues
```

**Avoid `permissions: write-all`** unless absolutely necessary

---

# Performance — Caching

**Cache dependencies** to speed up builds:
```yaml
- uses: actions/cache@v4
  with:
    path: ~/.npm
    key: ${{ runner.os }}-npm-${{ hashFiles('**/package-lock.json') }}
    restore-keys: |
      ${{ runner.os }}-npm-
```

**Use built-in caching** when available:
```yaml
- uses: actions/setup-node@v4
  with:
    node-version: '20'
    cache: 'npm'  # Built-in caching
```

---

# Performance — Parallelization

**Run independent jobs in parallel**:
```yaml
jobs:
  test-unit:
    runs-on: ubuntu-latest
  test-integration:
    runs-on: ubuntu-latest
  lint:
    runs-on: ubuntu-latest
```

**Use matrix for testing multiple versions**:
```yaml
strategy:
  matrix:
    node-version: [18, 20, 22]
    os: [ubuntu-latest, windows-latest]
```

---

# Team Collaboration — Code Review

**Branch protection rules**:
- Require pull request reviews (1-2 reviewers)
- Require status checks to pass
- Dismiss stale approvals on new commits
- Require signed commits

**Code owners** (CODEOWNERS file):
```
# Require review from team leads
*.yml @devops-team
src/security/* @security-team
```

---

# Team Collaboration — Branch Strategy

**Protect critical branches**:
- `main` / `production` branches
- Require status checks before merge
- Prevent force push
- Prevent deletion

**Recommended workflow**:
```mermaid
graph LR
    A[Feature Branch] --> B[Pull Request]
    B --> C[Code Review]
    C --> D[CI Checks]
    D --> E[Merge to Main]
    E --> F[Deploy]
    
    style A fill:#e3f2fd
    style B fill:#f3e5f5
    style C fill:#e8f5e9
    style D fill:#fff3e0
    style E fill:#fce4ec
    style F fill:#ffebee
```

---

# Practical exercises

- Add scheduled maintenance workflow
- Create reusable workflow for testing
- Set up environment protections for staging/prod
- Create a Project board with automation
