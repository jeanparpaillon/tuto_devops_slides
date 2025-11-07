# Day 3 Review - Issues for Improvement

This document contains the recommended issues to be created based on the review of Day 3 (Artifactory) content.

## Issue 1: Remove XRAY content from Day 3 slides

**Priority**: High  
**Labels**: enhancement, documentation

### Description
The dev-intro-artifactory.md file currently contains XRAY content, but according to README.md, XRAY should be covered on Day 4. This content is already properly covered in dev-sonarqube-xray.md.

### Tasks
- [ ] Remove XRAY section from dev-intro-artifactory.md (lines 66-79)
- [ ] Verify XRAY coverage in dev-sonarqube-xray.md is sufficient
- [ ] Update any cross-references

### Rationale
Eliminates duplication and aligns with the planned curriculum structure.

---

## Issue 2: Add GitHub Packages/Registry integration to Day 3

**Priority**: High  
**Labels**: enhancement, documentation

### Description
Day 3 program mentions "GitHub repo" integration, but current slides don't cover:
- GitHub Container Registry (GHCR) vs Artifactory
- Configuring GitHub Actions to use Artifactory
- Authentication and security best practices

### Tasks
- [ ] Add slides comparing GitHub Packages vs Artifactory
- [ ] Show how to configure GitHub Actions to push/pull from Artifactory
- [ ] Add examples of configuring npm/Docker to use Artifactory in CI/CD
- [ ] Include authentication examples (.npmrc, docker login)

### Rationale
Connects Day 2's GitHub Actions work with Day 3's artifact management, showing practical integration.

---

## Issue 3: Expand repository types coverage (cache, proxy, virtual)

**Priority**: High  
**Labels**: enhancement, documentation

### Description
README specifies covering "Repositories: cache, proxy, virtual, etc" but current slides only mention NuGet and NPM repositories without explaining repository types.

### Tasks
- [ ] Add section explaining local/hosted repositories
- [ ] Add section on remote/proxy repositories (caching npmjs.org, Docker Hub)
- [ ] Add section on virtual repositories (aggregating multiple repos)
- [ ] Include architecture diagrams showing repository flow
- [ ] Provide practical examples for npm and Docker registries

### Rationale
Core Artifactory concept essential for understanding how to structure artifact management.

---

## Issue 4: Add rules and policies content

**Priority**: Medium  
**Labels**: enhancement, documentation

### Description
README lists "Rules: blacklist, whitelist" but these are not covered in current slides.

### Tasks
- [ ] Add slides about include/exclude patterns
- [ ] Cover blacklist/whitelist for dependencies
- [ ] Explain security policies
- [ ] Cover license compliance scanning
- [ ] Add retention policies
- [ ] Include practical examples

### Rationale
Important for governance and security in enterprise environments.

---

## Issue 5: Improve exercises to focus on Node.js and Docker

**Priority**: High  
**Labels**: enhancement, documentation, exercises

### Description
Current exercises are generic and NuGet-focused. They should build on Day 2's Node.js containerization work for continuity and relevance.

### Tasks
- [ ] Create Exercise 1: Configure npm to use Artifactory as proxy
- [ ] Create Exercise 2: Publish a Node.js package to Artifactory
- [ ] Create Exercise 3: Push Docker image from Day 2 to Artifactory
- [ ] Create Exercise 4: Create and configure virtual npm repository
- [ ] Create Exercise 5: Update GitHub Actions workflow to use Artifactory
- [ ] Remove or update NuGet-focused exercises

### Rationale
Maintains consistency with Days 1-2 Node.js focus and provides hands-on practice with realistic scenarios.

---

## Issue 6: Add actual content to slide placeholders

**Priority**: High  
**Labels**: enhancement, documentation

### Description
Most slides in dev-intro-artifactory.md are just section headers without content, examples, or diagrams.

### Tasks
- [ ] Introduction section: Add why artifact management matters, problems it solves
- [ ] Installation section: Add Docker-based Artifactory setup instructions
- [ ] UI walkthrough: Add screenshots and navigation guide
- [ ] Repository management: Add detailed configuration examples with code blocks
- [ ] Add diagrams where appropriate (architecture, flow, etc.)

### Rationale
Slides need substance to support a full day of training.

---

## Issue 7: Reorganize slides for better pedagogical flow

**Priority**: Medium  
**Labels**: enhancement, documentation

### Description
Current organization doesn't clearly connect to Day 2 work or provide a logical progression through concepts.

### Suggested Structure

**Morning (3 hours):**
- Why artifact management? (30 min)
- Artifactory overview and installation (30 min)
- Repository types and architecture (1 hour)
- UI walkthrough and basic operations (1 hour)

**Afternoon (3 hours):**
- npm/Node.js integration (1 hour)
- Docker registry integration (45 min)
- GitHub Actions integration (45 min)
- Rules and policies (30 min)
- Hands-on exercises

### Tasks
- [ ] Review and adjust slide order
- [ ] Add timing/duration markers
- [ ] Ensure balanced morning/afternoon split
- [ ] Add transition slides between major sections

### Rationale
Creates a coherent learning journey from concepts to practice.

---

## Issue 8: Add explicit connections to Day 2 content

**Priority**: High  
**Labels**: enhancement, documentation

### Description
Day 3 should build on the Docker containerization and GitHub Actions work from Day 2, but this connection is not explicit.

### Tasks
- [ ] Add opening slides referencing Day 2's Docker images
- [ ] Include examples using the Node.js app from Day 2
- [ ] Show how to modify Day 2's CI/CD pipeline to use Artifactory
- [ ] Add comparison: GHCR (used in Day 2) vs Artifactory

### Rationale
Creates narrative continuity and shows practical application of Day 2 concepts.

---

## Summary

These 8 issues address:
1. **Alignment**: Removing XRAY, adding missing topics (GitHub, repo types, rules)
2. **Depth**: Adding actual content to placeholder slides
3. **Continuity**: Building on Day 2's Node.js/Docker work
4. **Practicality**: Improving exercises with relevant, hands-on activities
5. **Organization**: Restructuring for better learning flow

All issues should be created for the repository owner to review and validate before implementation.
