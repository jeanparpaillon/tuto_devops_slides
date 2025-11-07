#!/bin/bash
# Script to create GitHub issues for Day 3 improvements
# Run this script to create all recommended issues
# Usage: ./create_day3_issues.sh

set -e

REPO="jeanparpaillon/tuto_devops_slides"

echo "Creating GitHub issues for Day 3 (Artifactory) improvements..."
echo "Repository: $REPO"
echo ""

# Issue 1: Remove XRAY content
echo "Creating Issue 1: Remove XRAY content from Day 3..."
gh issue create \
  --repo "$REPO" \
  --title "Day 3: Remove XRAY content (belongs in Day 4)" \
  --label "enhancement,documentation,day-3" \
  --body "## Priority
High

## Description
The \`dev-intro-artifactory.md\` file currently contains XRAY content, but according to README.md, XRAY should be covered on Day 4. This content is already properly covered in \`dev-sonarqube-xray.md\`.

## Tasks
- [ ] Remove XRAY section from \`dev-intro-artifactory.md\` (lines 66-79)
- [ ] Verify XRAY coverage in \`dev-sonarqube-xray.md\` is sufficient
- [ ] Update any cross-references

## Rationale
Eliminates duplication and aligns with the planned curriculum structure.

## Files Affected
- \`slides/pages/dev-intro-artifactory.md\`

## Related
Part of Day 3 review - see review documentation for details."

# Issue 2: GitHub integration
echo "Creating Issue 2: Add GitHub integration..."
gh issue create \
  --repo "$REPO" \
  --title "Day 3: Add GitHub Packages/Registry integration content" \
  --label "enhancement,documentation,day-3" \
  --body "## Priority
High

## Description
Day 3 program mentions \"GitHub repo\" integration, but current slides don't cover:
- GitHub Container Registry (GHCR) vs Artifactory
- Configuring GitHub Actions to use Artifactory
- Authentication and security best practices

## Tasks
- [ ] Add slides comparing GitHub Packages vs Artifactory
- [ ] Show how to configure GitHub Actions to push/pull from Artifactory
- [ ] Add examples of configuring npm/Docker to use Artifactory in CI/CD
- [ ] Include authentication examples (.npmrc, docker login)
- [ ] Add code examples for workflow modifications

## Rationale
Connects Day 2's GitHub Actions work with Day 3's artifact management, showing practical integration.

## Files Affected
- \`slides/pages/dev-intro-artifactory.md\`

## Related
Part of Day 3 review - see review documentation for details."

# Issue 3: Repository types
echo "Creating Issue 3: Expand repository types coverage..."
gh issue create \
  --repo "$REPO" \
  --title "Day 3: Expand repository types coverage (cache, proxy, virtual)" \
  --label "enhancement,documentation,day-3" \
  --body "## Priority
High

## Description
README specifies covering \"Repositories: cache, proxy, virtual, etc\" but current slides only mention NuGet and NPM repositories without explaining repository types.

## Tasks
- [ ] Add section explaining local/hosted repositories
- [ ] Add section on remote/proxy repositories (caching npmjs.org, Docker Hub)
- [ ] Add section on virtual repositories (aggregating multiple repos)
- [ ] Include architecture diagrams showing repository flow
- [ ] Provide practical examples for npm and Docker registries
- [ ] Explain when to use each type

## Rationale
Core Artifactory concept essential for understanding how to structure artifact management.

## Files Affected
- \`slides/pages/dev-intro-artifactory.md\`

## Related
Part of Day 3 review - see review documentation for details."

# Issue 4: Rules and policies
echo "Creating Issue 4: Add rules and policies content..."
gh issue create \
  --repo "$REPO" \
  --title "Day 3: Add rules and policies content (blacklist, whitelist)" \
  --label "enhancement,documentation,day-3" \
  --body "## Priority
Medium

## Description
README lists \"Rules: blacklist, whitelist\" but these are not covered in current slides.

## Tasks
- [ ] Add slides about include/exclude patterns
- [ ] Cover blacklist/whitelist for dependencies
- [ ] Explain security policies
- [ ] Cover license compliance scanning
- [ ] Add retention policies
- [ ] Include practical examples

## Rationale
Important for governance and security in enterprise environments.

## Files Affected
- \`slides/pages/dev-intro-artifactory.md\`

## Related
Part of Day 3 review - see review documentation for details."

# Issue 5: Exercises
echo "Creating Issue 5: Improve exercises..."
gh issue create \
  --repo "$REPO" \
  --title "Day 3: Redesign exercises to focus on Node.js and Docker" \
  --label "enhancement,documentation,exercises,day-3" \
  --body "## Priority
High

## Description
Current exercises are generic and NuGet-focused. They should build on Day 2's Node.js containerization work for continuity and relevance.

## Tasks
- [ ] Create Exercise 1: Configure npm to use Artifactory as proxy
- [ ] Create Exercise 2: Publish a Node.js package to Artifactory
- [ ] Create Exercise 3: Push Docker image from Day 2 to Artifactory
- [ ] Create Exercise 4: Create and configure virtual npm repository
- [ ] Create Exercise 5: Update GitHub Actions workflow to use Artifactory
- [ ] Remove or update NuGet-focused exercises
- [ ] Add step-by-step instructions for each exercise
- [ ] Include expected outputs and troubleshooting tips

## Rationale
Maintains consistency with Days 1-2 Node.js focus and provides hands-on practice with realistic scenarios.

## Files Affected
- \`slides/pages/dev-intro-artifactory.md\`
- Possibly \`exercises/\` directory

## Related
Part of Day 3 review - see review documentation for details."

# Issue 6: Content expansion
echo "Creating Issue 6: Add content to placeholders..."
gh issue create \
  --repo "$REPO" \
  --title "Day 3: Add actual content to slide placeholders" \
  --label "enhancement,documentation,day-3" \
  --body "## Priority
High

## Description
Most slides in \`dev-intro-artifactory.md\` are just section headers without content, examples, or diagrams.

## Tasks
- [ ] Introduction section: Add why artifact management matters, problems it solves
- [ ] Installation section: Add Docker-based Artifactory setup instructions
- [ ] UI walkthrough: Add screenshots and navigation guide
- [ ] Repository management: Add detailed configuration examples with code blocks
- [ ] Add diagrams where appropriate (architecture, flow, etc.)
- [ ] Include code examples for npm and Docker configuration

## Rationale
Slides need substance to support a full day of training.

## Files Affected
- \`slides/pages/dev-intro-artifactory.md\`

## Related
Part of Day 3 review - see review documentation for details."

# Issue 7: Reorganization
echo "Creating Issue 7: Reorganize slides..."
gh issue create \
  --repo "$REPO" \
  --title "Day 3: Reorganize slides for better pedagogical flow" \
  --label "enhancement,documentation,day-3" \
  --body "## Priority
Medium

## Description
Current organization doesn't clearly connect to Day 2 work or provide a logical progression through concepts.

## Suggested Structure

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

## Tasks
- [ ] Review and adjust slide order
- [ ] Add timing/duration markers
- [ ] Ensure balanced morning/afternoon split
- [ ] Add transition slides between major sections
- [ ] Verify total duration fits 1 full day

## Rationale
Creates a coherent learning journey from concepts to practice.

## Files Affected
- \`slides/pages/dev-intro-artifactory.md\`

## Related
Part of Day 3 review - see review documentation for details."

# Issue 8: Day 2 connection
echo "Creating Issue 8: Add connections to Day 2..."
gh issue create \
  --repo "$REPO" \
  --title "Day 3: Add explicit connections to Day 2 content" \
  --label "enhancement,documentation,day-3" \
  --body "## Priority
High

## Description
Day 3 should build on the Docker containerization and GitHub Actions work from Day 2, but this connection is not explicit.

## Tasks
- [ ] Add opening slides referencing Day 2's Docker images
- [ ] Include examples using the Node.js app from Day 2
- [ ] Show how to modify Day 2's CI/CD pipeline to use Artifactory
- [ ] Add comparison: GHCR (used in Day 2) vs Artifactory
- [ ] Create narrative continuity between days

## Rationale
Creates narrative continuity and shows practical application of Day 2 concepts.

## Files Affected
- \`slides/pages/dev-intro-artifactory.md\`

## Related
Part of Day 3 review - see review documentation for details."

echo ""
echo "✅ All 8 issues created successfully!"
echo ""
echo "Review the issues at: https://github.com/$REPO/issues"
echo ""
echo "Next steps:"
echo "1. Review each issue"
echo "2. Validate or modify the recommendations"
echo "3. Assign priorities and milestones"
echo "4. Start implementation"
