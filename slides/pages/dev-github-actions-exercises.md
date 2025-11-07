---
layout: section
epoch: d2pm
---

# Day 2 — GitHub Actions Hands-on Exercises

## Practice what you learned

- Create and run GitHub Actions workflows
- Add automated testing to CI
- Build and push Docker images
- Debug common workflow issues

---

# Exercise setup

Before starting the exercises:

1. **Fork the nodejs_server repository**
   - Or use your own Node.js project with tests
   - Ensure you have push access to a GitHub repository

2. **Requirements**
   - GitHub account with Actions enabled
   - Basic understanding of YAML syntax
   - Node.js project with `package.json`

3. **Reference documentation**
   - [GitHub Actions docs](https://docs.github.com/en/actions)
   - [Workflow syntax](https://docs.github.com/en/actions/writing-workflows/workflow-syntax-for-github-actions)

---
layout: two-cols-header
---

# Exercise 1: Create your first workflow

::left::

## Objective

Create a basic CI workflow that runs on every push to validate your code.

## Steps

1. Create `.github/workflows/` directory
2. Create `ci.yml` file
3. Add basic workflow structure
4. Add checkout step
5. Add a simple validation step
6. Push and observe workflow run

::right::

## Expected workflow file

```yaml
name: CI

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Verify files exist
        run: |
          test -f package.json
          echo "✅ package.json found"
```

---

# Exercise 1: Validation

## Expected outcome

✅ Green workflow run in the **Actions** tab

## How to verify

1. Go to your repository on GitHub
2. Click the **Actions** tab
3. You should see your workflow run
4. Click on the run to see details
5. All steps should be green ✅

## Troubleshooting tips

- **Workflow not appearing?** Check file is in `.github/workflows/`
- **Syntax error?** Validate YAML syntax with [YAML Lint](http://www.yamllint.com/)
- **Job failing?** Check the logs in the Actions tab for error messages

---
layout: two-cols-header
---

# Exercise 2: Add testing steps

::left::

## Objective

Add Node.js setup and npm test to your workflow.

## Steps

1. Add Node.js setup action
2. Add npm install step
3. Add npm test step
4. Configure test script in package.json
5. Push and verify tests run

::right::

## Update your workflow

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
```

---

# Exercise 2: Handle test failures

## Make tests fail intentionally

Modify a test to fail and observe the workflow behavior:

```js
// In your test file
test('should fail', () => {
  expect(1 + 1).toBe(3); // This will fail
});
```

## Observations

- ❌ Workflow run shows failure
- 🔍 Click on failed step to see error details
- 📧 GitHub may send email notification (check settings)

## Fix the test

```js
test('should pass', () => {
  expect(1 + 1).toBe(2); // Fixed
});
```

Commit, push, and verify the workflow is green again ✅

---
layout: two-cols-header
---

# Exercise 3: Build and push Docker image

::left::

## Objective

Integrate Docker build into CI and push to GitHub Container Registry.

## Prerequisites

1. Add a `Dockerfile` to your project
2. Enable GitHub Container Registry

## Steps

1. Add Docker build step
2. Configure registry authentication
3. Tag image with commit SHA
4. Push to GHCR

::right::

## Add Docker job

```yaml
jobs:
  docker:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
    steps:
      - uses: actions/checkout@v4
      
      - name: Log in to GHCR
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
      
      - name: Build and push
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: |
            ghcr.io/${{ github.repository }}:latest
            ghcr.io/${{ github.repository }}:${{ github.sha }}
```

---

# Exercise 3: Verification

## Expected outcome

✅ Container image appears in GitHub Container Registry

## How to verify

1. Go to your repository main page
2. Look for **Packages** section on right sidebar
3. Click on your package
4. Verify tags: `latest` and `<commit-sha>`

## Pull and run your image

```sh
# Authenticate with GHCR
echo $GITHUB_TOKEN | docker login ghcr.io -u YOUR_USERNAME --password-stdin

# Pull the image
docker pull ghcr.io/YOUR_USERNAME/YOUR_REPO:latest

# Run it
docker run --rm -p 3000:3000 ghcr.io/YOUR_USERNAME/YOUR_REPO:latest
```

---

# Exercise 3: Troubleshooting

## Common issues

### Permission denied to push

**Problem**: `denied: permission_denied: write_package`

**Solution**: Add `permissions:` block to job:
```yaml
permissions:
  contents: read
  packages: write
```

### Package visibility

**Problem**: Cannot pull image - permission denied

**Solution**: Make package public:
1. Go to package settings
2. Change visibility to public
3. Or authenticate when pulling

---
layout: two-cols-header
---

# Exercise 4: Debug a failing workflow

::left::

## Objective

Practice troubleshooting common workflow issues.

## Scenario 1: YAML syntax error

Introduce this error:
```yaml
jobs:
  test:
    runs-on: ubuntu-latest
  steps:  # ❌ Wrong indentation!
    - uses: actions/checkout@v4
```

**What happens?**
- Workflow file rejected
- Error message in commit status

**Fix**: Correct indentation
```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    steps:  # ✅ Correct
      - uses: actions/checkout@v4
```

::right::

## Scenario 2: Missing permissions

Try to create a release without permissions:
```yaml
jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - name: Create release
        run: gh release create v1.0.0
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

**What happens?**
- Job runs but step fails
- Error: insufficient permissions

**Fix**: Add permissions
```yaml
jobs:
  release:
    runs-on: ubuntu-latest
    permissions:
      contents: write
    # ... rest of job
```

---

# Exercise 4: Reading logs

## How to debug failed steps

1. **Go to Actions tab** → Click on failed run
2. **Click on failed job** → See which step failed
3. **Expand failed step** → Read error output
4. **Look for keywords**:
   - `Error:` - The actual error message
   - `exit code 1` - Command failed
   - `not found` - Missing file/command
   - `permission denied` - Access issue

## Example log reading

```
Run npm test
npm error Missing script: "test"
Error: Process completed with exit code 1.
```

**Diagnosis**: No test script in package.json

**Fix**: Add to package.json:
```json
{
  "scripts": {
    "test": "node --test"
  }
}
```

---

# Exercise 4: Advanced debugging

## Enable debug logging

Add to workflow file:
```yaml
env:
  ACTIONS_STEP_DEBUG: true
  ACTIONS_RUNNER_DEBUG: true
```

Or set as repository secrets for persistent debugging.

## Use tmate for SSH access

For complex debugging, connect to the runner:

```yaml
- name: Setup tmate session
  uses: mxschmitt/action-tmate@v3
  if: failure()
```

This gives you SSH access to the runner when a step fails.

---

# Bonus: Complete CI/CD workflow

Combine all exercises into a complete workflow:

```yaml
name: CI/CD

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm test
      - run: npm run lint

  docker:
    needs: test
    if: github.event_name == 'push'
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
    steps:
      - uses: actions/checkout@v4
      - uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
      - uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: ghcr.io/${{ github.repository }}:${{ github.sha }}
```

---

# Summary and best practices

## What you learned

✅ Create GitHub Actions workflows from scratch  
✅ Run automated tests in CI  
✅ Build and publish Docker images  
✅ Debug workflow failures  
✅ Read and interpret workflow logs  

## Best practices

- **Start simple** - Add complexity incrementally
- **Use caching** - Speed up builds with `cache:` option
- **Fail fast** - Put quick checks first
- **Use conditions** - Run expensive jobs only when needed
- **Secure secrets** - Never commit tokens/passwords
- **Monitor costs** - Public repos = free, private repos = limited minutes

## Next steps

- Explore [GitHub Actions Marketplace](https://github.com/marketplace?type=actions)
- Set up branch protection rules requiring CI
- Add code coverage reporting
- Implement deployment workflows
