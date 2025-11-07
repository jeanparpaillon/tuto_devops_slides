# GitHub Actions Workflow Templates

This directory contains GitHub Actions workflow templates for the hands-on exercises in Day 2 of the DevOps training.

## Available Templates

### Exercise 1: `exercise-1-first-workflow.yml`
**Objective**: Create your first GitHub Actions workflow

- Runs on push to main/develop branches
- Checks out the code
- Verifies required files exist
- Simple validation workflow to get started

### Exercise 2: `exercise-2-testing.yml`
**Objective**: Add automated testing to CI

- Sets up Node.js environment
- Installs dependencies with npm ci
- Runs npm test
- Demonstrates CI best practices with caching

### Exercise 3: `exercise-3-docker.yml`
**Objective**: Build and push Docker images

- Builds Docker image using Dockerfile
- Authenticates with GitHub Container Registry
- Pushes image with multiple tags (branch, SHA, latest)
- Only runs on push to main branch

### Complete CI/CD: `complete-ci-cd.yml`
**Objective**: Full CI/CD pipeline

- Combines testing and Docker builds
- Tests run on all pushes and PRs
- Docker build only on main branch pushes
- Uses job dependencies (docker needs test)
- Implements Docker layer caching for faster builds

## How to Use These Templates

### Method 1: Copy to Your Repository

1. Create `.github/workflows/` directory in your repository:

   ```bash
   mkdir -p .github/workflows
   ```

2. Copy the desired workflow file:

   ```bash
   cp exercises/nodejs_server/.github/workflows/exercise-1-first-workflow.yml .github/workflows/
   ```

3. Commit and push:

   ```bash
   git add .github/workflows/
   git commit -m "Add GitHub Actions workflow"
   git push
   ```

4. Check the Actions tab in your GitHub repository

### Method 2: Create from Scratch (Recommended for Learning)

Follow the exercise instructions in the slides to create workflows step by step.

## Testing Locally

While you cannot run GitHub Actions locally in the same environment, you can:

1. **Validate YAML syntax**:

   ```bash
   # Using yamllint
   yamllint .github/workflows/*.yml
   
   # Or online: http://www.yamllint.com/
   ```

2. **Test individual commands**:

   ```bash
   # Test the same commands that run in CI
   npm ci
   npm test
   docker build -t test-image .
   ```

3. **Use act (GitHub Actions locally)**:

   ```bash
   # Install act: https://github.com/nektos/act
   brew install act  # macOS
   # or
   curl https://raw.githubusercontent.com/nektos/act/master/install.sh | sudo bash
   
   # Run workflows locally
   act -l  # List workflows
   act push  # Run workflows triggered by push
   ```

## Common Issues and Solutions

### Issue: Workflow not appearing in Actions tab
- **Solution**: Ensure file is in `.github/workflows/` directory
- **Solution**: Check YAML syntax is valid
- **Solution**: Push to a branch that triggers the workflow (check `on:` section)

### Issue: Permission denied when pushing Docker image
- **Solution**: Add `permissions:` block to the job (see exercise-3-docker.yml)
- **Solution**: Ensure GITHUB_TOKEN has package write permissions

### Issue: Tests failing in CI but passing locally
- **Solution**: Check Node.js version matches (workflow uses Node 20)
- **Solution**: Use `npm ci` instead of `npm install` for reproducible builds
- **Solution**: Check for missing environment variables

### Issue: Docker build failing
- **Solution**: Ensure Dockerfile exists in repository root
- **Solution**: Check Dockerfile syntax
- **Solution**: Verify all COPY commands reference existing files

## Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Workflow Syntax Reference](https://docs.github.com/en/actions/writing-workflows/workflow-syntax-for-github-actions)
- [GitHub Actions Marketplace](https://github.com/marketplace?type=actions)
- [Docker Build Push Action](https://github.com/docker/build-push-action)
- [Setup Node Action](https://github.com/actions/setup-node)

## Exercise Progression

Follow this progression for the best learning experience:

1. **Exercise 1**: Start simple - just checkout and verify files
2. **Exercise 2**: Add testing - learn about Node.js setup and caching
3. **Exercise 3**: Build Docker images - understand registry authentication
4. **Exercise 4**: Debug issues - practice troubleshooting (see slides)
5. **Complete CI/CD**: Combine everything into a production-ready pipeline

Each exercise builds on the previous one, gradually increasing complexity.
