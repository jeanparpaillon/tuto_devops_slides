# GitHub Actions Exercises - Instructor Guide

## Day 2 Afternoon Session

This guide helps instructors deliver the hands-on GitHub Actions exercises added to Day 2.

## Time Allocation (Recommended)

- **Exercise Setup** (10 min): Get students ready
- **Exercise 1** (20 min): First workflow
- **Exercise 2** (25 min): Add testing
- **Exercise 3** (30 min): Docker build and push
- **Exercise 4** (20 min): Debugging practice
- **Review & Q&A** (15 min): Discussion and troubleshooting

**Total**: ~2 hours

## Pre-class Preparation

### For Instructors

1. **Test all workflows** in the `exercises/nodejs_server/.github/workflows/` directory
2. **Fork or clone** the tuto_devops_slides repository to your own account
3. **Enable GitHub Actions** in your forked repository
4. **Enable GitHub Container Registry** (GHCR) permissions
5. **Prepare a demo repository** with intentional errors for Exercise 4
6. **Have access** to a working repository for live demonstration

### For Students

Send these prerequisites before class:

1. **GitHub account** with Actions enabled (free tier is sufficient)
2. **Git installed** locally
3. **Basic understanding** of Git commands (push, commit, clone)
4. **Node.js installed** (version 20+) for local testing (optional)
5. **Docker installed** for local testing (optional but recommended)

## Exercise Delivery Notes

### Exercise 1: First Workflow (20 min)

**Objectives**: Students learn basic workflow structure and how to run their first CI check.

**Instructor Actions**:
1. Live demo: Create `.github/workflows/ci.yml` from scratch
2. Explain each line of the workflow
3. Push and show the Actions tab
4. Point out the green checkmark on commits

**Common Issues**:
- File not in correct directory (`.github/workflows/` vs `github/workflows/`)
- YAML indentation errors - use a linter demo
- Workflow doesn't trigger - check branch names

**Validation**: Ask students to share screenshot of their green workflow run.

### Exercise 2: Testing (25 min)

**Objectives**: Add Node.js setup and automated testing to CI.

**Instructor Actions**:
1. Show the workflow template in `exercise-2-testing.yml`
2. Explain caching and why it's important
3. Demonstrate intentional test failure
4. Show how to read error logs

**Common Issues**:
- `npm ci` fails - usually due to package-lock.json issues
- Node version mismatch - emphasize version specification
- Tests pass locally but fail in CI - environment differences

**Pro Tip**: Have students commit a failing test first, then fix it. This teaches them how to interpret CI failures.

### Exercise 3: Docker Build (30 min)

**Objectives**: Build Docker images in CI and push to GitHub Container Registry.

**Note**: This is the most complex exercise - allow extra time.

**Instructor Actions**:
1. Show how to enable GHCR (GitHub Packages)
2. Explain `permissions:` block and why it's needed
3. Demonstrate the workflow running
4. Show the package appearing in GitHub UI
5. Demo pulling and running the image

**Common Issues**:
- **Permission denied**: Most common issue
  - Solution: Add `permissions: packages: write`
- **Package not visible**: Privacy settings
  - Solution: Change package visibility in settings
- **Build fails**: Dockerfile errors
  - Solution: Test Dockerfile locally first: `docker build -t test .`
- **Tags not applied correctly**: Metadata action confusion
  - Solution: Show the tags in the package UI

**Advanced**: If time permits, show how to use the built image in another workflow.

### Exercise 4: Debugging (20 min)

**Objectives**: Practice troubleshooting real workflow issues.

**Instructor Actions**:
1. Use a pre-prepared repository with broken workflows
2. Walk through each scenario live
3. Show how to enable debug logging
4. Demonstrate reading logs systematically

**Scenarios to Demo**:
1. **YAML syntax error**: Wrong indentation
2. **Missing permissions**: Try to write without permissions
3. **Command not found**: Typo in script name
4. **Environment variable issue**: Missing secret

**Teaching Method**: Make it interactive - show the error, ask students what they think is wrong, then fix it together.

## Tips for Success

### Time Management

- **Start on time** - exercises require full session
- **Have faster students help slower ones** - peer teaching
- **Prepare to skip Exercise 4** if running behind - it's practice, not new concepts
- **Use breaks strategically** - after Exercise 2 is a good break point

### Handling Different Skill Levels

**For Advanced Students**:
- Challenge them with the complete CI/CD workflow
- Ask them to add branch protection rules
- Have them implement the caching optimization
- Let them help troubleshoot for others

**For Struggling Students**:
- Pair them with advanced students
- Provide the exact workflow templates to copy
- Focus on understanding concepts over completing all exercises
- Encourage them to complete remaining exercises as homework

### Common Pitfalls to Avoid

1. **Don't rush through Exercise 1** - it's foundational
2. **Don't skip permission explanations** - security is important
3. **Don't assume students have Docker experience** - quick intro may be needed
4. **Don't ignore errors** - make them teaching moments

## Troubleshooting Guide

### GitHub Actions Not Running

**Check**:
- Is Actions enabled in repository settings?
- Is the file in `.github/workflows/`?
- Is the trigger matching the branch being pushed?
- Is the YAML valid? Use yamllint.com

### Permission Errors

**Check**:
- Is `permissions:` block present?
- Does it include `packages: write` for GHCR?
- Is the repository public or private? (Different permission models)

### Docker Build Failures

**Check**:
- Does Dockerfile exist in repository root?
- Are all COPY commands referencing existing files?
- Can the image build locally?
- Are there any .dockerignore conflicts?

### Students Can't See Their Package

**Check**:
- Was the push successful? (Check workflow logs)
- Is package visibility set correctly?
- Are they looking in the right place? (Packages tab on profile or repo)

## Post-Exercise Discussion Topics

1. **Best Practices**: What did we learn about workflow design?
2. **Security**: Why are permissions important?
3. **Efficiency**: How does caching help?
4. **Real-world Use**: How would you use this in production?

## Homework Suggestions

1. Add linting to the CI workflow
2. Set up branch protection rules requiring CI to pass
3. Add a deployment step (e.g., to GitHub Pages)
4. Implement matrix builds for multiple Node versions
5. Add code coverage reporting

## Additional Resources for Students

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GitHub Actions Marketplace](https://github.com/marketplace?type=actions)
- [Docker Documentation](https://docs.docker.com/)
- [YAML Tutorial](https://www.cloudbees.com/blog/yaml-tutorial-everything-you-need-get-started)

## Feedback Collection

After the session, ask students:
1. Which exercise was most valuable?
2. Which exercise was most challenging?
3. What would you like to practice more?
4. Are the instructions clear enough?

Use this feedback to improve future sessions.

## Quick Reference: Workflow Locations

All workflow templates are in: `exercises/nodejs_server/.github/workflows/`

- `exercise-1-first-workflow.yml` - Basic validation
- `exercise-2-testing.yml` - npm test integration
- `exercise-3-docker.yml` - Docker build and push
- `complete-ci-cd.yml` - Full pipeline example
- `README.md` - Detailed documentation

Students can reference these as they work through the exercises.
