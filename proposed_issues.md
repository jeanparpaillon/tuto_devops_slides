# Proposed GitHub Issues for Day 2 Improvements

This document contains detailed issue descriptions to be created for Day 2 program improvements. Each issue should be reviewed and validated before implementation.

---

## Issue 1: Add hands-on Docker exercises to Day 2

**Priority**: CRITICAL  
**Labels**: enhancement, day-2, docker, exercises

### Description
Day 2 currently lacks explicit hands-on exercises for Docker. Students need practical experience to reinforce containerization concepts.

### Proposed Content
Add exercise slides covering:

1. **Exercise 1: Write your first Dockerfile**
   - Objective: Containerize the nodejs_server application
   - Steps:
     - Clone/navigate to exercises/nodejs_server
     - Create a Dockerfile
     - Choose appropriate base image (node:20-alpine)
     - Set up working directory
     - Copy dependencies and source code
     - Define the startup command
   - Expected outcome: Working Dockerfile
   - Validation: `docker build -t my-node-app .`

2. **Exercise 2: Optimize with multi-stage builds**
   - Objective: Reduce image size using multi-stage builds
   - Steps:
     - Create a deps stage for dependencies
     - Create a runner stage for the application
     - Compare image sizes (before/after)
   - Expected outcome: Smaller, more efficient image

3. **Exercise 3: Run and test the container**
   - Objective: Run container locally and verify functionality
   - Steps:
     - Run container with proper port mapping
     - Test the application endpoint
     - View logs
     - Stop and remove container
   - Expected outcome: Running application accessible at localhost:3000

4. **Exercise 4: Debug common issues**
   - Practice debugging:
     - Missing dependencies
     - Port conflicts
     - Permission issues
   - Learn useful commands: `docker logs`, `docker exec`, `docker inspect`

### Additional Notes
- Each exercise should have a dedicated slide with clear objectives
- Include "Try it yourself" timer slides (5-15 minutes per exercise)
- Add troubleshooting tips for common errors
- Reference: exercises/nodejs_server should be explicitly mentioned

---

## Issue 2: Add hands-on GitHub Actions exercises to Day 2

**Priority**: CRITICAL  
**Labels**: enhancement, day-2, github-actions, exercises

### Description
Day 2 lacks practical GitHub Actions exercises. Students need hands-on experience creating and debugging workflows.

### Proposed Content
Add exercise slides covering:

1. **Exercise 1: Create your first workflow**
   - Objective: Create a basic CI workflow that runs on push
   - Steps:
     - Create `.github/workflows/` directory
     - Write a simple workflow YAML
     - Add checkout step
     - Add a simple test/check step
     - Push and observe workflow run
   - Expected outcome: Green workflow in GitHub Actions tab

2. **Exercise 2: Add testing steps**
   - Objective: Add npm test to the workflow
   - Steps:
     - Add Node.js setup action
     - Add npm install step
     - Add npm test step
     - Handle test failures
   - Expected outcome: Tests running in CI

3. **Exercise 3: Build and push Docker image**
   - Objective: Integrate Docker build into CI
   - Steps:
     - Add Docker build step
     - Configure registry authentication
     - Tag image appropriately
     - Push to GitHub Container Registry
   - Expected outcome: Container image in GHCR

4. **Exercise 4: Debug a failing workflow**
   - Practice troubleshooting:
     - Syntax errors in YAML
     - Missing permissions
     - Failed steps
   - Learn to read logs and identify issues

### Additional Notes
- Reference the nodejs_server repository for workflow examples
- Include screenshots of expected GitHub UI
- Add links to GitHub Actions documentation
- Provide workflow templates as starting points

---

## Issue 3: Add docker-compose section to Day 2

**Priority**: HIGH  
**Labels**: enhancement, day-2, docker-compose

### Description
Current Day 2 content only covers single containers. Many real-world applications require multiple containers (app + database + cache). Adding docker-compose provides a more complete picture.

### Proposed Content
Add slides covering:

1. **docker-compose fundamentals** (2-3 slides)
   - What is docker-compose
   - When to use it
   - Basic structure of docker-compose.yml

2. **Example: Node.js + PostgreSQL** (2-3 slides)
   - Multi-container application
   - Services definition
   - Networking between containers
   - Environment variables
   - Volumes for data persistence

3. **Common commands** (1 slide)
   - `docker-compose up`
   - `docker-compose down`
   - `docker-compose logs`
   - `docker-compose ps`

4. **Optional Exercise** (1 slide)
   - Add Redis or PostgreSQL to nodejs_server
   - Create docker-compose.yml
   - Run multi-container app

### Additional Notes
- Keep this section concise (30-45 minutes)
- Can be marked as "bonus" if time is tight
- Provides foundation for Day 3 topics if applicable

---

## Issue 4: Add troubleshooting and debugging section to Day 2

**Priority**: HIGH  
**Labels**: enhancement, day-2, docker, github-actions, troubleshooting

### Description
Students will encounter errors. A troubleshooting section will help them become self-sufficient and reduce frustration during exercises.

### Proposed Content

### Docker Troubleshooting (3-4 slides)

1. **Common Docker errors**
   - "Cannot connect to Docker daemon"
   - "Port already in use"
   - "No space left on device"
   - "Permission denied"
   - Image not found / pull access denied

2. **Debugging commands**
   - `docker logs <container>` - View container logs
   - `docker exec -it <container> /bin/sh` - Enter container
   - `docker inspect <container>` - View configuration
   - `docker system df` - Check disk usage
   - `docker system prune` - Clean up resources

3. **Dockerfile issues**
   - Build context too large → use .dockerignore
   - Build failures → check base image, commands
   - Slow builds → optimize layer caching
   - Large images → use multi-stage builds

### GitHub Actions Troubleshooting (2-3 slides)

1. **Common workflow errors**
   - YAML syntax errors
   - Missing permissions
   - Secret not found
   - Timeout errors
   - Failed steps

2. **Debugging workflows**
   - Read error messages in logs
   - Enable debug logging
   - Use `continue-on-error` for testing
   - Run locally with act (optional)

### Additional Notes
- Position this section after initial exercises
- Use real error examples from common mistakes
- Include screenshots of errors and solutions

---

## Issue 5: Add best practices slides to Day 2

**Priority**: MEDIUM  
**Labels**: enhancement, day-2, best-practices, docker, github-actions

### Description
Students should learn not just how to use Docker and GitHub Actions, but how to use them well. Best practices slides will set good habits early.

### Proposed Content

### Dockerfile Best Practices (3-4 slides)

1. **Image optimization**
   - Use Alpine base images when possible
   - Multi-stage builds to reduce size
   - Combine RUN commands to reduce layers
   - Order instructions by change frequency
   - Use .dockerignore effectively

2. **Security best practices**
   - Don't run as root (use USER instruction)
   - Scan images for vulnerabilities
   - Don't include secrets in images
   - Use specific image tags, not 'latest'
   - Minimize installed packages

3. **Cache optimization**
   - Copy package files before source code
   - Leverage build cache effectively
   - Use BuildKit for better caching

### GitHub Actions Best Practices (2-3 slides)

1. **Workflow optimization**
   - Use matrix builds for multiple configurations
   - Cache dependencies (npm, docker layers)
   - Run jobs in parallel when possible
   - Set appropriate timeouts
   - Use reusable workflows

2. **Security in CI**
   - Use GitHub secrets for sensitive data
   - Set minimal permissions
   - Pin action versions
   - Review third-party actions

### Additional Notes
- Present these after students have hands-on experience
- Use before/after examples
- Reference official documentation

---

## Issue 6: Reorganize Day 2 slide flow for better progression

**Priority**: MEDIUM  
**Labels**: enhancement, day-2, organization

### Description
Current slide organization has weak connections between topics. Reorganizing will create a better learning flow from basics to integration.

### Proposed Reorganization

**Current structure:**
- dev-ci.md: All CI content (morning + afternoon)
- dev-containerization.md: All Docker content (morning only)

**Suggested structure:**

**Morning (d2am):**
1. CI/CD Basics (from dev-ci.md)
2. Containerization Fundamentals (from dev-containerization.md)
3. **Exercise: Docker hands-on** (NEW)
4. GitHub Actions Intro (from dev-ci.md)

**Afternoon (d2pm):**
1. **Exercise: First GitHub Action** (NEW)
2. **Integration: Building containers in CI** (NEW/EXPANDED)
3. Advanced GitHub Actions (from dev-ci.md)
4. **Best Practices & Troubleshooting** (NEW)
5. **Q&A and Recap** (NEW)

### Changes Required
- Reorder some existing slides
- Add transition slides between sections
- Add integration section connecting Docker + CI
- Add recap slides at end of morning and day

### Additional Notes
- Maintain backward compatibility with epoch tags
- Test slide flow with slideshow
- Ensure smooth transitions between topics

---

## Issue 7: Integrate nodejs_server example throughout Day 2

**Priority**: MEDIUM  
**Labels**: enhancement, day-2, exercises, nodejs_server

### Description
The nodejs_server example exists in exercises/ but is not explicitly referenced in slides. Students may not know it exists or how to use it.

### Proposed Changes

1. **Add introduction slide** (after CI/CD basics)
   - "Today's example: nodejs_server"
   - What it is: Simple Express.js server
   - Where to find it: exercises/nodejs_server
   - How to clone/access it
   - Quick overview of its structure

2. **Reference throughout exercises**
   - Exercise 1: "Containerize nodejs_server"
   - Exercise 2: "Add CI to nodejs_server"
   - Exercise 3: "Build nodejs_server container in CI"

3. **Add code walkthrough slides**
   - Show key files: package.json, server.js, server.test.js
   - Explain how tests work
   - Show how to run locally

4. **Add expected directory structure slide**
   - Where students should work
   - What files they'll create
   - Final repository structure

### Additional Notes
- Clone URL should be provided
- Consider if students should fork the repo
- Ensure nodejs_server README is clear and complete

---

## Issue 8: Expand GitHub Actions content with practical topics

**Priority**: MEDIUM  
**Labels**: enhancement, day-2, github-actions

### Description
Current GitHub Actions content covers basics and some advanced topics but misses several practical topics that developers commonly need.

### Proposed Additional Content

1. **Secrets Management** (2 slides)
   - How to add secrets in GitHub
   - How to use secrets in workflows
   - Environment-specific secrets
   - Security best practices

2. **Matrix Builds** (2-3 slides)
   - What are matrix builds
   - Testing multiple Node.js versions
   - Testing on multiple OSes
   - Example configuration

3. **Workflow Status and Badges** (1-2 slides)
   - Adding status badges to README
   - Understanding workflow status
   - Branch protection rules
   - Required status checks

4. **Reusable Workflows** (1-2 slides)
   - Creating reusable workflows
   - Calling workflows from other workflows
   - When to use composite actions vs reusable workflows

5. **Environment Variables and Outputs** (1-2 slides)
   - Setting environment variables
   - Passing data between steps
   - Job outputs
   - Using expressions

### Placement
- Most of this fits in the "Advanced usage" section (d2pm)
- Matrix builds could include a hands-on exercise
- Secrets management should come before container push exercise

### Additional Notes
- Keep examples practical and relevant
- Link to official documentation
- Some topics could be "bonus" if time is limited

---

## Issue 9: Add advanced containerization topics to Day 2

**Priority**: LOW  
**Labels**: enhancement, day-2, docker

### Description
Some important Docker topics are missing and would round out students' understanding.

### Proposed Additional Content

1. **Environment Variables and Configuration** (2 slides)
   - Passing environment variables with `-e` flag
   - Using .env files
   - ENV vs ARG in Dockerfile
   - Best practices for configuration

2. **Health Checks** (1-2 slides)
   - What are health checks
   - HEALTHCHECK instruction
   - Why they matter in production
   - Example for Node.js app

3. **Resource Limits** (1 slide)
   - Memory limits
   - CPU limits
   - Why they matter
   - How to set them

4. **Container Networking** (1-2 slides)
   - Bridge networks
   - Custom networks
   - Port publishing
   - Container-to-container communication

### Placement
- Could be part of containerization section (d2am)
- Or part of "Advanced topics" (d2pm)
- Some could be "bonus" material

### Additional Notes
- Keep concise - Day 3 or 4 may cover these in more depth
- Focus on awareness rather than mastery
- Practical examples preferred

---

## Issue 10: Add complete CI/CD integration example to Day 2

**Priority**: MEDIUM  
**Labels**: enhancement, day-2, integration, github-actions, docker

### Description
Current content teaches Docker and GitHub Actions separately but doesn't show a complete end-to-end pipeline. An integration section will connect the concepts.

### Proposed Content

1. **Integration Overview** (1 slide)
   - The complete picture: code → build → test → containerize → push
   - How Docker and CI work together
   - Benefits of the integration

2. **Complete Pipeline Example** (2-3 slides)
   - Show a complete workflow YAML
   - Checkout code
   - Run tests
   - Build Docker image
   - Push to registry (GHCR)
   - Tag strategy (commit SHA + latest)

3. **Authentication and Permissions** (1-2 slides)
   - GITHUB_TOKEN for GHCR
   - Permissions needed
   - Logging in to registry in CI
   - Security considerations

4. **Caching Strategies** (1-2 slides)
   - npm dependency cache
   - Docker layer cache
   - cache-from / cache-to
   - Impact on build times

5. **Hands-on Exercise** (1 slide)
   - Create complete pipeline for nodejs_server
   - Verify image appears in GHCR
   - Pull and run the image

### Placement
- Afternoon (d2pm), after basic GitHub Actions
- Before or after advanced topics
- Should be a highlight of Day 2

### Additional Notes
- Use real working example from the repository
- Show screenshots of successful builds
- Show the actual container in GHCR
- This ties together everything learned in Day 2

---

## Summary

**Total Issues**: 10  
**Priority Breakdown**:
- CRITICAL: 2 (Issues 1-2: Hands-on exercises)
- HIGH: 2 (Issues 3-4: docker-compose, troubleshooting)
- MEDIUM: 5 (Issues 5-8, 10: Best practices, reorganization, integration)
- LOW: 1 (Issue 9: Advanced Docker topics)

**Estimated Effort**:
- CRITICAL issues: 15-20 slides
- HIGH issues: 10-15 slides
- MEDIUM issues: 15-20 slides
- LOW issues: 5-8 slides
- **Total additional content**: 45-63 slides

This would bring Day 2 from ~30 slides to ~75-93 slides, which is appropriate for a full day with hands-on exercises.
