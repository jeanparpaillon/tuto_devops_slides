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

# Reusable Workflows - Inputs & Outputs

```yaml
# .github/workflows/reusable-build.yml
on:
  workflow_call:
    inputs:
      node-version:
        required: true
        type: string
      environment:
        required: false
        type: string
        default: 'dev'
    outputs:
      build-id:
        description: "Build identifier"
        value: ${{ jobs.build.outputs.build-id }}

jobs:
  build:
    runs-on: ubuntu-latest
    outputs:
      build-id: ${{ steps.build.outputs.id }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ inputs.node-version }}
      - run: npm ci && npm run build
      - id: build
        run: echo "id=$(date +%s)" >> $GITHUB_OUTPUT
```

---

# Using Reusable Workflows

```yaml
# .github/workflows/ci.yml
jobs:
  build:
    uses: ./.github/workflows/reusable-build.yml
    with:
      node-version: '20'
      environment: 'production'
  
  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - run: echo "Deploying build ${{ needs.build.outputs.build-id }}"
```

**Key points**:
- Use `uses:` to call reusable workflow
- Pass inputs with `with:`
- Access outputs via `needs.<job>.outputs.<output>`

---

# Managing Secrets in Reusable Workflows

```yaml
# Define in reusable workflow
on:
  workflow_call:
    secrets:
      NPM_TOKEN:
        required: true
      DEPLOY_KEY:
        required: false

# Call with explicit secrets
jobs:
  build:
    uses: ./.github/workflows/reusable.yml
    secrets:
      NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
      DEPLOY_KEY: ${{ secrets.DEPLOY_KEY }}
    
    # Or inherit all secrets
    secrets: inherit
```

---

# Organization and Best Practices

- **Centralized workflows**: Store in `.github` repository for org-wide access
- **Versioning**: Use tags or branches (`@v1`, `@main`)
- **Naming**: Clear, descriptive names (`reusable-build.yml`, `reusable-test.yml`)
- **Documentation**: Document inputs, outputs, and secrets in README
- **When to use**: Reusable workflows vs composite actions

---

# Composite Actions

For reusable steps within a workflow:

```yaml
# .github/actions/setup-node-env/action.yml
name: 'Setup Node Build Environment'
description: 'Setup Node.js and install dependencies'
inputs:
  node-version:
    required: true
runs:
  using: "composite"
  steps:
    - uses: actions/setup-node@v4
      with:
        node-version: ${{ inputs.node-version }}
        cache: 'npm'
    - run: npm ci
      shell: bash
```

Use: `uses: ./.github/actions/setup-node-env`

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

# Practical exercises

- Add scheduled maintenance workflow
- Create reusable workflow for testing
- Set up environment protections for staging/prod
- Create a Project board with automation
