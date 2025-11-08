---
layout: section
epoch: d2pm
---

# Troubleshooting and Debugging

## Essential debugging skills

- Docker troubleshooting
- GitHub Actions debugging
- Common errors and solutions

---

# Why troubleshooting matters

**You will encounter errors** — it's a normal part of development

## Benefits of debugging skills

- ✅ **Self-sufficiency** - Solve problems independently
- ✅ **Faster resolution** - Identify and fix issues quickly
- ✅ **Better understanding** - Learn how systems work
- ✅ **Reduced frustration** - Know where to look and what to try

## Debugging mindset

1. **Read the error message** - Don't panic, read carefully
2. **Check recent changes** - What did you change?
3. **Search for solutions** - Others likely faced the same issue
4. **Test systematically** - Change one thing at a time
5. **Document solutions** - Help your future self and others

---
layout: section
---

# Docker Troubleshooting

---

# Common Docker errors

## 1. Cannot connect to Docker daemon

**Error message:**

```
Cannot connect to the Docker daemon at unix:///var/run/docker.sock.
Is the docker daemon running?
```

**Causes:**
- Docker service not started
- User not in `docker` group (Linux)
- Docker Desktop not running (Windows/Mac)

**Solutions:**

```sh
# Linux: Start Docker service
sudo systemctl start docker

# Add user to docker group (requires logout/login)
sudo usermod -aG docker $USER

# Windows/Mac: Start Docker Desktop application
```

---

# Common Docker errors (2)

## 2. Port already in use

**Error message:**

```
Error starting userland proxy: listen tcp4 0.0.0.0:3000:
bind: address already in use
```

**Cause:** Another process is using the port

**Solutions:**

```sh
# Find what's using the port
sudo lsof -i :3000
# or
sudo netstat -nlp | grep 3000

# Stop the conflicting process, or use a different port
docker run -p 8080:3000 my-image

# Stop all containers on that port
docker ps | grep 3000
docker stop <container-id>
```

---

# Common Docker errors (3)

## 3. No space left on device

**Error message:**

```
Error processing tar file: write /path/to/file: no space left on device
```

**Cause:** Disk full from images, containers, or volumes

**Solutions:**

```sh
# Check disk usage
docker system df

# Remove unused containers, images, networks
docker system prune

# Remove with volumes (⚠️ data loss!)
docker system prune -a --volumes

# Remove specific items
docker container prune  # Remove stopped containers
docker image prune -a   # Remove unused images
docker volume prune     # Remove unused volumes
```

---

# Common Docker errors (4)

## 4. Permission denied

**Error message:**

```
Got permission denied while trying to connect to the Docker daemon socket
```

**Cause:** User doesn't have permissions to access Docker

**Solution (Linux):**

```sh
# Add user to docker group
sudo usermod -aG docker $USER

# Log out and back in, or run:
newgrp docker

# Verify
docker ps
```

**Temporary workaround (not recommended for regular use):**

```sh
sudo docker ps
```

---

# Common Docker errors (5)

## 5. Image not found / Pull access denied

**Error messages:**

```
Error response from daemon: pull access denied for myimage, 
repository does not exist or may require 'docker login'

manifest for node:99 not found
```

**Solutions:**

```sh
# Check image name and tag are correct
docker pull node:20-alpine  # ✅ Correct
docker pull node:99         # ❌ Tag doesn't exist

# Authenticate to private registry
docker login ghcr.io
docker login registry.example.com

# Check image exists
docker search node
```

---

# Docker debugging commands

## Essential commands for troubleshooting

```sh
# View container logs (last 50 lines)
docker logs <container-name>

# Follow logs in real-time
docker logs -f <container-name>

# View logs with timestamps
docker logs --timestamps <container-name>

# Get last N lines
docker logs --tail 100 <container-name>
```

**Pro tip:** Combine flags for better debugging

```sh
docker logs --tail 50 --timestamps -f my-container
```

---

# Docker debugging commands (2)

## Interactive debugging

```sh
# Execute shell inside running container
docker exec -it <container-name> /bin/sh
# or
docker exec -it <container-name> /bin/bash

# Run commands without entering container
docker exec <container-name> ls -la /app
docker exec <container-name> cat /app/config.json

# Check environment variables
docker exec <container-name> env

# Test network connectivity
docker exec <container-name> ping google.com
docker exec <container-name> curl http://localhost:3000
```

---

# Docker debugging commands (3)

## Inspection and monitoring

```sh
# View detailed container configuration
docker inspect <container-name>

# Get specific information (use --format)
docker inspect --format='{{.State.Status}}' <container-name>
docker inspect --format='{{.NetworkSettings.IPAddress}}' <container-name>

# Check disk usage by Docker
docker system df

# Show detailed usage breakdown
docker system df -v

# Monitor container resource usage in real-time
docker stats

# Monitor specific container
docker stats <container-name>
```

---

# Docker debugging commands (4)

## Troubleshooting builds

```sh
# Build with detailed output
docker build --progress=plain -t my-image .

# Build without cache (for debugging layer issues)
docker build --no-cache -t my-image .

# Build specific target in multi-stage
docker build --target=deps -t my-image:deps .

# Show image layers and sizes
docker history my-image

# Show detailed size info
docker history --no-trunc my-image
```

---

# Dockerfile issues

## 1. Build context too large

**Problem:** Build is slow, uploads many files

**Symptom:**

```
Sending build context to Docker daemon  2.5GB
```

**Solution:** Use `.dockerignore`

```ini
# .dockerignore
node_modules
dist
.git
*.log
coverage
.env
.cache
tmp
```

**Result:** Faster builds, smaller context

---

# Dockerfile issues (2)

## 2. Build failures

**Common causes and solutions:**

### Missing base image or wrong tag

```dockerfile
# ❌ Wrong
FROM node:latest-alpine

# ✅ Correct
FROM node:20-alpine
```

### Commands failing

```dockerfile
# ❌ May fail in Alpine (missing bash)
RUN npm install && bash setup.sh

# ✅ Use sh or install bash
RUN npm install && sh setup.sh
```

### File not found

```dockerfile
# ❌ Files not copied yet
RUN npm install
COPY package*.json ./

# ✅ Copy dependencies first
COPY package*.json ./
RUN npm install
```

---

# Dockerfile issues (3)

## 3. Slow builds

**Problem:** Builds take too long, rebuild everything

**Solution:** Optimize layer caching

```dockerfile
# ❌ Bad: Breaks cache on any code change
COPY . .
RUN npm install

# ✅ Good: Cache dependencies separately
COPY package*.json ./
RUN npm install
COPY . .
```

**More optimization tips:**

```dockerfile
# Order commands from least to most frequently changing
FROM node:20-alpine
WORKDIR /app

# 1. Dependencies (rarely change)
COPY package*.json ./
RUN npm ci --omit=dev

# 2. Source code (changes often)
COPY . .

# 3. Build (changes with code)
RUN npm run build
```

---

# Dockerfile issues (4)

## 4. Large images

**Problem:** Image size is too large (>500MB for simple app)

**Solution:** Use multi-stage builds

```dockerfile
# ❌ Single stage: includes build tools
FROM node:20
WORKDIR /app
COPY package*.json ./
RUN npm install  # Installs dev dependencies too
COPY . .
RUN npm run build
CMD ["node", "dist/index.js"]
# Result: ~1GB image with dev dependencies and build tools

# ✅ Multi-stage: production only
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
CMD ["node", "dist/index.js"]
# Result: ~150MB image with only production files
```

---

# Dockerfile best practices

## Summary of optimization techniques

✅ **Use specific base image tags** - Avoid `latest`  
✅ **Use Alpine images** - Smaller base (node:20-alpine vs node:20)  
✅ **Order layers strategically** - Cache dependencies before code  
✅ **Use multi-stage builds** - Reduce final image size  
✅ **Use .dockerignore** - Exclude unnecessary files  
✅ **Combine RUN commands** - Reduce layers (when appropriate)  
✅ **Clean up in same layer** - Remove temp files before layer closes  

```dockerfile
# Good example
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

FROM node:20-alpine
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
```

---
layout: section
---

# GitHub Actions Troubleshooting

---

# Common workflow errors

## 1. YAML syntax errors

**Error message:**

```
Invalid workflow file: .github/workflows/ci.yml
Error parsing workflow: mapping values are not allowed here
```

**Common causes:**

```yaml
# ❌ Wrong indentation
jobs:
  test:
    runs-on: ubuntu-latest
  steps:  # Should be indented under 'test'
    - uses: actions/checkout@v4

# ❌ Missing colon
jobs
  test:

# ❌ Inconsistent indentation (mixing tabs/spaces)
jobs:
  test:
 runs-on: ubuntu-latest  # Tab here
    steps:                   # Spaces here
```

**Solution:** Use a YAML validator and consistent indentation (2 spaces)

---

# Common workflow errors (2)

## 2. Missing permissions

**Error message:**

```
Resource not accessible by integration
refusing to allow a GitHub App to create or update workflow
```

**Cause:** Job needs permissions to write/access resources

**Solution:** Add permissions to job or workflow

```yaml
# Workflow-level permissions
permissions:
  contents: write
  packages: write

jobs:
  deploy:
    # Or job-level permissions
    permissions:
      contents: write
      packages: write
    steps:
      # ...
```

**Common permission needs:**
- `contents: write` - Push commits, create releases
- `packages: write` - Push to GitHub Container Registry
- `pull-requests: write` - Comment on PRs
- `issues: write` - Create/update issues

---

# Common workflow errors (3)

## 3. Secret not found

**Error message:**

```
Error: Input required and not supplied: password
Warning: Skip output 'digest' since it may contain secret.
```

**Causes:**
- Secret name typo
- Secret not defined in repository
- Using wrong secret context

**Solutions:**

```yaml
# ❌ Wrong: Using environment variable syntax
password: $MY_SECRET

# ✅ Correct: Using secrets context
password: ${{ secrets.MY_SECRET }}

# Check secret is defined:
# Repo → Settings → Secrets and variables → Actions
```

**Note:** Secret names are case-sensitive!

---

# Common workflow errors (4)

## 4. Timeout errors

**Error message:**

```
The job running on runner github-hosted-runner has exceeded
the maximum execution time of 360 minutes.
```

**Causes:**
- Long-running tests
- Infinite loops
- Waiting for external service

**Solutions:**

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    timeout-minutes: 10  # Set appropriate timeout
    steps:
      - name: Run tests
        run: npm test
        timeout-minutes: 5  # Step-level timeout
```

**Best practices:**
- Set realistic timeouts
- Use caching to speed up builds
- Run long tests only on specific branches

---

# Common workflow errors (5)

## 5. Failed steps

**Error messages vary:**

```
Error: Process completed with exit code 1.
npm error Missing script: "test"
Error: Docker login failed
```

**Debugging approach:**

1. **Read the full error** - Scroll up in logs
2. **Check exit code** - Non-zero = failure
3. **Verify command works locally** - Test outside CI
4. **Check dependencies** - All required packages installed?
5. **Review environment** - Using correct Node version, env vars?

**Common fixes:**

```yaml
# Missing script
# Add to package.json: "scripts": { "test": "..." }

# Wrong Node version
- uses: actions/setup-node@v4
  with:
    node-version: '20'  # Match your local version
```

---

# Debugging workflows

## Reading error messages in logs

**Step 1: Navigate to the failure**
1. Go to **Actions** tab in repository
2. Click on the failed workflow run
3. Click on the failed job name (red ❌)
4. Click on the failed step to expand

**Step 2: Identify the error**
Look for keywords:
- `Error:` - The actual error
- `exit code 1` - Command failed
- `ENOENT` - File not found
- `permission denied` - Access issue
- `timeout` - Process took too long

**Step 3: Find the root cause**
- Read from the first error (scroll up)
- Check the command that was executed
- Look at the working directory
- Verify file paths are correct

---

# Debugging workflows (2)

## Enable debug logging

**Method 1: Repository secrets (persistent)**

Add these secrets in your repository:
- `ACTIONS_RUNNER_DEBUG` = `true`
- `ACTIONS_STEP_DEBUG` = `true`

**Method 2: Workflow file (temporary)**

```yaml
env:
  ACTIONS_RUNNER_DEBUG: true
  ACTIONS_STEP_DEBUG: true

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm test
```

**Result:** Much more verbose output showing:
- Runner diagnostics
- Step execution details
- Environment setup
- File operations

---

# Debugging workflows (3)

## Use continue-on-error for testing

**Scenario:** Testing a new feature, but don't want to break CI

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Experimental feature
        run: npm run new-feature-test
        continue-on-error: true  # Won't fail the workflow
      
      - name: Critical tests
        run: npm test  # This still must pass
```

**Use cases:**
- Testing new tools/steps
- Non-blocking checks (linting, formatting)
- Gradual migration to new processes

**Warning:** Don't use for critical steps!

---

# Debugging workflows (4)

## Test workflows locally with act

**act** is a tool to run GitHub Actions locally

```sh
# Install act (requires Docker)
brew install act  # macOS
# or
curl https://raw.githubusercontent.com/nektos/act/master/install.sh | sudo bash

# Run default event (push)
act

# Run specific job
act -j test

# Run with secrets
act -s GITHUB_TOKEN=<token>

# List available workflows
act -l
```

**Limitations:**
- Not 100% compatible with GitHub-hosted runners
- Some actions may not work locally
- Good for basic testing, not a replacement for real runs

**Best use:** Quick feedback loop during workflow development

---

# Debugging workflows (5)

## Interactive debugging with tmate

**For complex issues:** SSH into the runner during workflow execution

```yaml
jobs:
  debug:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup tmate session
        uses: mxschmitt/action-tmate@v3
        if: failure()  # Only on failure
        # Or always:
        # if: always()
        # Or manually triggered:
        # if: github.event.inputs.debug == 'true'
```

**How it works:**
1. Workflow runs and hits the tmate step
2. Logs show SSH connection command
3. You SSH into the runner
4. Explore files, run commands interactively
5. Session times out after 30 minutes (configurable)

**Security:** Only use in private repos or with trusted contributors!

---

# Debugging best practices

## General troubleshooting workflow

1. **Check workflow file syntax** - Use YAML validator
2. **Read error messages completely** - Don't skip details
3. **Test locally first** - Verify commands work on your machine
4. **Enable debug logging** - When errors are unclear
5. **Use step outputs** - Echo variables to understand state
6. **Test in isolation** - Comment out unrelated steps
7. **Check GitHub status** - Sometimes it's a platform issue
8. **Search existing issues** - Others may have solved it

## Preventing errors

✅ **Use workflow templates** - Start from known-good examples  
✅ **Pin action versions** - Use `@v4` not `@main`  
✅ **Set timeouts** - Prevent runaway workflows  
✅ **Add validation steps** - Check files exist before using  
✅ **Use matrix testing** - Test on multiple Node versions  
✅ **Document workflow** - Add comments explaining complex parts  

---

# Troubleshooting resources

## Documentation

- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Workflow syntax](https://docs.github.com/en/actions/writing-workflows/workflow-syntax-for-github-actions)
- [Docker documentation](https://docs.docker.com/)
- [Docker best practices](https://docs.docker.com/develop/dev-best-practices/)

## Tools

- [YAML Lint](http://www.yamllint.com/) - Validate YAML syntax
- [act](https://github.com/nektos/act) - Run Actions locally
- [hadolint](https://github.com/hadolint/hadolint) - Dockerfile linter
- [dive](https://github.com/wagoodman/dive) - Analyze Docker image layers

## Community

- [GitHub Community Forum](https://github.community/)
- Stack Overflow (tags: `github-actions`, `docker`, `dockerfile`)
- Search GitHub issues in action repositories

---

# Key takeaways

## Remember these debugging principles

🔍 **Read error messages carefully** - They usually tell you what's wrong  
🧪 **Test changes incrementally** - Small steps are easier to debug  
📝 **Keep logs and documentation** - Future you will be grateful  
🤝 **Ask for help when stuck** - But show what you've tried  
💡 **Learn from errors** - Each bug solved makes you stronger  

## Practice makes perfect

The more you debug, the faster you'll become at:
- Recognizing error patterns
- Knowing where to look
- Finding solutions quickly
- Preventing common mistakes

## Next steps

Continue with the exercises and apply these debugging techniques when you encounter issues. Don't hesitate to use the debugging commands and tools covered in this section!
