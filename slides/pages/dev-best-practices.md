---
layout: section
epoch: d2pm
---

# Day 2 — Best Practices

## Docker & GitHub Actions

Now that you've gained hands-on experience, let's explore best practices to:
- Build better Docker images
- Write more efficient workflows
- Follow security guidelines
- Optimize for performance

---

# Why Best Practices Matter

**Building good habits early is crucial**

- 🚀 **Performance**: Faster builds, smaller images
- 🔒 **Security**: Protect against vulnerabilities
- 💰 **Cost**: Reduce storage and compute resources
- 🔄 **Maintainability**: Easier to update and debug
- 📈 **Scalability**: Handle growing projects efficiently

---
layout: section
---

# Dockerfile Best Practices

---

# Image Optimization

## Choose the Right Base Image

**Use Alpine-based images when possible**

```dockerfile
# ❌ Large base image (~1GB)
FROM node:20

# ✅ Smaller Alpine base (~180MB)
FROM node:20-alpine
```

**Benefits of Alpine:**
- Minimal attack surface
- Faster download and deployment
- Reduced storage costs

**When not to use Alpine:**
- Need specific system libraries not in Alpine
- Compatibility issues with native dependencies

---

# Image Optimization: Multi-stage Builds

**Separate build dependencies from runtime**

```dockerfile
# ❌ Single stage - includes build tools in final image
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci  # Includes devDependencies
COPY . .
RUN npm run build
CMD ["node", "dist/server.js"]
```

```dockerfile
# ✅ Multi-stage - minimal final image
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=builder /app/dist ./dist
CMD ["node", "dist/server.js"]
```

---

# Image Optimization: Layer Management

## Combine RUN commands to reduce layers

```dockerfile
# ❌ Multiple layers
RUN apk update
RUN apk add --no-cache git
RUN apk add --no-cache curl

# ✅ Single layer
RUN apk update && \
    apk add --no-cache git curl
```

## Order instructions by change frequency

```dockerfile
# ✅ Good ordering - least to most frequently changed
FROM node:20-alpine
WORKDIR /app

# 1. Dependencies (changes less often)
COPY package*.json ./
RUN npm ci --omit=dev

# 2. Source code (changes more often)
COPY . .

# 3. Configuration
EXPOSE 3000
CMD ["node", "server.js"]
```

---

# Image Optimization: .dockerignore

**Exclude unnecessary files from build context**

```bash
# .dockerignore file
node_modules
npm-debug.log
.git
.gitignore
README.md
.env
.env.local
dist
coverage
.DS_Store
*.md
!README.md
```

**Benefits:**
- Faster build context transfer
- Smaller images
- Avoid accidentally copying sensitive files

---

# Security Best Practices

## Don't Run as Root

```dockerfile
# ❌ Runs as root (default)
FROM node:20-alpine
WORKDIR /app
COPY . .
CMD ["node", "server.js"]

# ✅ Runs as non-root user
FROM node:20-alpine
WORKDIR /app
COPY --chown=node:node . .
USER node
CMD ["node", "server.js"]
```

**Why?**
- Limits damage if container is compromised
- Follows principle of least privilege
- Required by many security policies

---

# Security Best Practices: Image Tags

## Use Specific Tags

```dockerfile
# ❌ Unpredictable - 'latest' changes
FROM node:latest

# ❌ Too broad - major version only
FROM node:20

# ✅ Specific version
FROM node:20.10.0-alpine3.19

# ✅ Acceptable compromise
FROM node:20-alpine
```

**Best practice:**
- Pin to specific versions in production
- Use major versions for development
- Regular updates are still necessary

---

# Security Best Practices: Secrets

## Never Include Secrets in Images

```dockerfile
# ❌ NEVER do this!
ENV DATABASE_PASSWORD="my-secret-password"
COPY .env .

# ✅ Use build arguments for build-time secrets
ARG NPM_TOKEN
RUN echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" > .npmrc && \
    npm ci && \
    rm .npmrc

# ✅ Use environment variables at runtime
# Pass secrets via docker run or orchestration platform
```

**At runtime:**

```sh
# Pass secrets as environment variables
docker run -e DATABASE_PASSWORD="$DB_PASS" my-app

# Or use Docker secrets (Swarm/Kubernetes)
docker secret create db_password ./password.txt
```

---

# Security Best Practices: Minimize Dependencies

```dockerfile
# ✅ Install only what you need
FROM node:20-alpine
WORKDIR /app

# Install only production dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Clean up package manager cache
RUN npm cache clean --force

COPY . .
USER node
CMD ["node", "server.js"]
```

**Additional tips:**
- Regularly scan images for vulnerabilities
- Remove package manager caches
- Audit dependencies regularly (`npm audit`)

---

# Cache Optimization

## Leverage Build Cache Effectively

**Copy dependency files before source code**

```dockerfile
# ✅ Optimized for caching
FROM node:20-alpine
WORKDIR /app

# These layers rarely change - cached often
COPY package*.json ./
RUN npm ci --omit=dev

# This layer changes frequently - rebuilt often
COPY . .

CMD ["node", "server.js"]
```

**Result:**
- `package.json` unchanged → npm install skipped (fast!)
- Source code changed → only source copy & final layers rebuild

---

# Cache Optimization: BuildKit

**Enable BuildKit for better caching**

```sh
# Enable BuildKit
export DOCKER_BUILDKIT=1

# Or use syntax directive in Dockerfile
# syntax=docker/dockerfile:1
```

**In CI/CD - use cache mount:**

```dockerfile
# syntax=docker/dockerfile:1
FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

COPY . .
CMD ["node", "server.js"]
```

**Benefits:**
- Persistent cache across builds
- Faster CI/CD pipelines
- Reduced network usage

---
layout: section
---

# GitHub Actions Best Practices

---

# Workflow Optimization: Matrix Builds

**Test across multiple configurations efficiently**

```yaml
# ❌ Separate jobs for each version
jobs:
  test-node-18:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
      - run: npm test

  test-node-20:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm test
```

```yaml
# ✅ Use matrix strategy
jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18, 20, 22]
    steps:
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
      - run: npm test
```

---

# Workflow Optimization: Caching Dependencies

**Cache npm dependencies**

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'  # ✅ Built-in npm caching
      
      - run: npm ci
      - run: npm test
```

**Cache Docker layers:**

```yaml
- name: Build and push
  uses: docker/build-push-action@v5
  with:
    context: .
    push: true
    tags: ghcr.io/${{ github.repository }}:latest
    cache-from: type=gha  # ✅ Use GitHub Actions cache
    cache-to: type=gha,mode=max
```

**Impact:** 50-90% faster builds!

---

# Workflow Optimization: Parallel Jobs

**Run independent jobs in parallel**

```yaml
# ✅ Jobs run in parallel by default
jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm run lint

  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm test

  build:
    needs: [lint, test]  # Runs after lint and test complete
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm run build
```

**Benefits:**
- Faster overall workflow execution
- Better resource utilization
- Quick feedback on failures

---

# Workflow Optimization: Timeouts

**Set appropriate timeouts to prevent stuck jobs**

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    timeout-minutes: 10  # ✅ Job-level timeout
    steps:
      - uses: actions/checkout@v4
        timeout-minutes: 2  # ✅ Step-level timeout
      
      - run: npm ci
        timeout-minutes: 5
      
      - run: npm test
        timeout-minutes: 3
```

**Default timeout:** 360 minutes (6 hours)

**Best practice:**
- Set realistic timeouts based on typical duration
- Fail fast on hung jobs
- Save CI/CD minutes

---

# Workflow Optimization: Reusable Workflows

**Create reusable workflows for common tasks**

`.github/workflows/reusable-test.yml`:

```yaml
name: Reusable test workflow

on:
  workflow_call:
    inputs:
      node-version:
        required: true
        type: string

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ inputs.node-version }}
      - run: npm ci
      - run: npm test
```

**Usage in another workflow:**

```yaml
jobs:
  test:
    uses: ./.github/workflows/reusable-test.yml
    with:
      node-version: '20'
```

---

# Security in CI: GitHub Secrets

**Never hardcode sensitive data**

```yaml
# ❌ NEVER do this!
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - run: |
          curl -X POST https://api.example.com \
            -H "Authorization: Bearer sk_live_abc123xyz"

# ✅ Use GitHub secrets
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - run: |
          curl -X POST https://api.example.com \
            -H "Authorization: Bearer ${{ secrets.API_TOKEN }}"
```

**Setting secrets:**
1. Repository Settings → Secrets and variables → Actions
2. New repository secret
3. Reference with `${{ secrets.SECRET_NAME }}`

---

# Security in CI: Minimal Permissions

**Grant only necessary permissions**

```yaml
# ✅ Explicit minimal permissions
jobs:
  build:
    runs-on: ubuntu-latest
    permissions:
      contents: read        # Read repository contents
      packages: write       # Push to GitHub Packages
      pull-requests: write  # Comment on PRs
    steps:
      - uses: actions/checkout@v4
      # ... build and push
```

**Permission scopes:**
- `actions`, `checks`, `contents`, `deployments`
- `issues`, `packages`, `pull-requests`, `security-events`
- Values: `read`, `write`, `none`

**Default permissions can be restricted in repository settings**

---

# Security in CI: Pin Action Versions

**Use commit SHA for critical actions**

```yaml
# ❌ Unpredictable - tag can be moved
- uses: actions/checkout@v4

# ⚠️ Better but still mutable
- uses: actions/checkout@v4.1.0

# ✅ Best - immutable commit SHA
- uses: actions/checkout@b4ffde65f46336ab88eb53be808477a3936bae11  # v4.1.0
```

**Why pin to SHA?**
- Tags can be moved to malicious commits
- Protection against supply chain attacks
- Ensures reproducible builds

**Maintain with Dependabot:**

```yaml
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
      interval: "weekly"
```

---

# Security in CI: Review Third-Party Actions

**Audit actions before using them**

```yaml
# ⚠️ Unknown third-party action
- uses: random-user/suspicious-action@v1
  with:
    github-token: ${{ secrets.GITHUB_TOKEN }}
```

**Security checklist:**
- ✅ Check action's source code on GitHub
- ✅ Review number of stars and community usage
- ✅ Check for recent maintenance and updates
- ✅ Look for security advisories
- ✅ Prefer official actions or verified creators
- ✅ Use minimal permissions

**Official/Trusted actions:**
- `actions/*` - GitHub official
- `docker/*` - Docker official
- Verified publishers (blue checkmark)

---

# Summary: Key Takeaways

## Dockerfile Best Practices

✅ Use Alpine base images for smaller size  
✅ Multi-stage builds to exclude build dependencies  
✅ Combine RUN commands to reduce layers  
✅ Order instructions by change frequency  
✅ Use .dockerignore effectively  
✅ Never run as root (use USER instruction)  
✅ Scan images for vulnerabilities  
✅ Use specific image tags, not 'latest'  
✅ Never include secrets in images  

## GitHub Actions Best Practices

✅ Use matrix builds for multiple configurations  
✅ Cache dependencies (npm, Docker layers)  
✅ Run jobs in parallel when possible  
✅ Set appropriate timeouts  
✅ Use reusable workflows  
✅ Store secrets in GitHub Secrets  
✅ Set minimal permissions  
✅ Pin action versions (preferably to SHA)  
✅ Review third-party actions before use  

---

# Additional Resources

## Official Documentation

- [Dockerfile Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Docker Security](https://docs.docker.com/engine/security/)
- [GitHub Actions Security](https://docs.github.com/en/actions/security-guides)
- [Workflow Syntax](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)

## Tools

- [Hadolint](https://github.com/hadolint/hadolint) - Dockerfile linter
- [Trivy](https://github.com/aquasecurity/trivy) - Container security scanner
- [Docker Scout](https://docs.docker.com/scout/) - Image analysis
- [Dependabot](https://github.com/dependabot) - Automated dependency updates

## Next Steps

- Apply these practices to your current projects
- Set up automated scanning in CI/CD
- Review and improve existing Dockerfiles and workflows
