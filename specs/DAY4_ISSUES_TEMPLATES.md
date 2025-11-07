# Suggested GitHub Issues for Day 4 Improvements

This file contains templates for GitHub issues that should be created to track the improvements identified in the Day 4 review.

## Issue Templates

---

### Issue #1: Expand Day 4 slide content for full-day training

**Title:** Expand Day 4 slide content for full-day training

**Labels:** enhancement, day-4, priority-high

**Description:**
The current Day 4 content (dev-sonarqube-xray.md) contains only 9 slides, which is insufficient for a full day of training (6-8 hours). This needs to be expanded to 35-40 slides to properly cover the topics and include adequate hands-on time.

**Current State:**
- 9 slides total
- No clear AM/PM structure
- Minimal depth on key topics
- Estimated delivery time: 45-90 minutes

**Target State:**
- 35-40 slides
- Clear AM/PM session structure
- Detailed coverage of SonarQube and Xray
- Sufficient content for 6-8 hours of training

**Tasks:**
- [ ] Add introduction section (3-4 slides)
- [ ] Expand SonarQube section (15-18 slides)
- [ ] Add Artifactory integration section (2-3 slides)
- [ ] Expand Xray section (12-15 slides)
- [ ] Add best practices and troubleshooting (4-5 slides)
- [ ] Add session markers for AM/PM
- [ ] Add prerequisites slide

**Reference:**
See DAY4_IMPROVEMENT_RECOMMENDATIONS.md for detailed slide structure proposal.

---

### Issue #2: Add hands-on exercises to Day 4

**Title:** Add hands-on exercises to Day 4

**Labels:** enhancement, day-4, priority-high, exercises

**Description:**
Day 4 currently has no dedicated hands-on exercises. Training needs practical exercises to reinforce learning and provide students with real experience using SonarQube and Xray.

**Required Exercises:**
1. **Exercise 1:** SonarQube local setup and first scan (45 min)
2. **Exercise 2:** Quality gates configuration (45 min)
3. **Exercise 3:** GitHub Actions integration (45 min)
4. **Exercise 4:** Xray container scanning (30 min)
5. **Exercise 5:** Xray policy configuration (30 min)

**Tasks:**
- [ ] Create Exercise 1 slide with instructions
- [ ] Create Exercise 2 slide with instructions
- [ ] Create Exercise 3 slide with instructions
- [ ] Create Exercise 4 slide with instructions
- [ ] Create Exercise 5 slide with instructions
- [ ] Create support materials (Docker compose, config templates)
- [ ] Create instructor guide with solutions
- [ ] Test exercises with sample project (nodejs_server)

**Reference:**
See DAY4_IMPROVEMENT_RECOMMENDATIONS.md section 2 for detailed exercise specifications.

---

### Issue #3: Add Artifactory + Xray integration content

**Title:** Add Artifactory + Xray integration to Day 4

**Labels:** enhancement, day-4, priority-medium, integration

**Description:**
README.md Day 3 mentions "Integration with GitHub, SonarQube / XRAY (see day 4)" but the current Day 4 slides don't cover how Artifactory integrates with these tools. This creates a gap in the training continuity.

**Missing Content:**
- How Xray integrates with Artifactory
- Scanning artifacts in Artifactory repositories
- Policy enforcement in Artifactory
- Integration patterns

**Tasks:**
- [ ] Add 2-3 slides on Artifactory + Xray integration
- [ ] Show how Xray scans Artifactory repositories
- [ ] Demonstrate policy enforcement examples
- [ ] Add integration architecture diagram
- [ ] Update exercises to use Artifactory (Exercise 4 & 5)

**Reference:**
See DAY4_IMPROVEMENT_RECOMMENDATIONS.md section 3 for content examples.

---

### Issue #4: Add architecture diagrams to Day 4

**Title:** Add architecture diagrams to Day 4

**Labels:** enhancement, day-4, priority-medium, documentation

**Description:**
Current slides are text-heavy with no architecture diagrams. Adding visual diagrams will help students understand system architecture and integration patterns better.

**Required Diagrams:**
1. SonarQube architecture (Scanner, Server, Database)
2. Xray architecture (components and data flow)
3. CI/CD integration flow
4. Artifactory + Xray integration
5. Watches and policies relationship

**Tasks:**
- [ ] Create SonarQube architecture diagram (Mermaid)
- [ ] Create Xray architecture diagram (Mermaid)
- [ ] Create CI/CD integration flow diagram
- [ ] Create Artifactory integration diagram
- [ ] Create watches/policies diagram
- [ ] Add diagrams to appropriate slides

**Technical Notes:**
- Use Mermaid diagrams (already supported in the project)
- Keep diagrams simple and clear
- Use consistent colors and styling

**Reference:**
See DAY4_IMPROVEMENT_RECOMMENDATIONS.md section 3 for diagram examples.

---

### Issue #5: Add SonarQube deep dive content

**Title:** Add SonarQube deep dive content to Day 4

**Labels:** enhancement, day-4, priority-medium, sonarqube

**Description:**
Current SonarQube coverage is superficial. Need to add in-depth content on key topics to give students proper understanding and configuration skills.

**Missing Topics:**
- Quality profiles and custom rules
- Quality gates configuration details
- Project settings and parameters
- Branch analysis and PR decoration
- Technical debt management
- New code vs overall code strategy
- Detailed metrics explanation

**Tasks:**
- [ ] Add quality metrics deep dive slide
- [ ] Add quality profiles configuration slides
- [ ] Add quality gates details (configuration, new code focus)
- [ ] Add project settings and parameters slide
- [ ] Add branch analysis slide
- [ ] Add technical debt management slide
- [ ] Add UI navigation guide

**Reference:**
See DAY4_IMPROVEMENT_RECOMMENDATIONS.md section 3 for slide content examples.

---

### Issue #6: Add Xray deep dive content

**Title:** Add Xray deep dive content to Day 4

**Labels:** enhancement, day-4, priority-medium, xray

**Description:**
Current Xray coverage lacks depth on configuration and advanced features. Need detailed content on watches, policies, vulnerability management, and license compliance.

**Missing Topics:**
- SCA (Software Composition Analysis) explanation
- CVE and vulnerability scoring (CVSS)
- Watches configuration
- Policies and rules setup
- License compliance scanning
- Vulnerability remediation strategies
- SBOM (Software Bill of Materials)

**Tasks:**
- [ ] Add SCA explanation slide
- [ ] Add CVE severity levels slide
- [ ] Add watches and policies deep dive
- [ ] Add license compliance slide
- [ ] Add vulnerability remediation strategies
- [ ] Add SBOM explanation
- [ ] Add policy rule examples

**Reference:**
See DAY4_IMPROVEMENT_RECOMMENDATIONS.md section 3 for slide content examples.

---

### Issue #7: Add troubleshooting section to Day 4

**Title:** Add troubleshooting section to Day 4

**Labels:** enhancement, day-4, priority-low, documentation

**Description:**
Students need guidance on debugging common issues they'll encounter when using SonarQube and Xray. Add a troubleshooting section covering common problems and solutions.

**Common Issues to Cover:**

**SonarQube:**
- Scanner connection failures
- Quality gate failures interpretation
- Zero coverage reports
- Authentication/token issues
- Analysis timeout issues

**Xray:**
- Missing vulnerabilities in reports
- Policy not enforcing
- False positive handling
- Scanning failures

**Tasks:**
- [ ] Add troubleshooting slide for SonarQube
- [ ] Add troubleshooting slide for Xray
- [ ] Include common error messages
- [ ] Provide step-by-step solutions
- [ ] Add tips for debugging

**Reference:**
See DAY4_IMPROVEMENT_RECOMMENDATIONS.md section 3 for troubleshooting content.

---

### Issue #8: Add prerequisites slide to Day 4

**Title:** Add prerequisites slide to Day 4

**Labels:** enhancement, day-4, priority-low, documentation

**Description:**
Day 4 should start by verifying that students have the necessary setup from previous days and have the required tools installed.

**Prerequisites to Check:**
- Docker installed and running
- Git configured
- GitHub account set up
- Node.js environment (from Day 1)
- Access to Artifactory (from Day 3)
- Basic understanding of CI/CD (from Day 2)

**Tasks:**
- [ ] Add prerequisites check slide at beginning
- [ ] List required tools and versions
- [ ] Include quick verification commands
- [ ] Provide setup links if missing
- [ ] Add estimated setup time

---

### Issue #9: Reorganize Day 4 with clear AM/PM structure

**Title:** Reorganize Day 4 with clear AM/PM structure

**Labels:** enhancement, day-4, priority-medium, organization

**Description:**
Current slides have no clear time structure. Need to organize content into morning and afternoon sessions with suggested timing to help instructors plan the day.

**Proposed Structure:**

**Morning (3-4 hours):**
- Introduction and prerequisites (30 min)
- SonarQube deep dive (90 min)
- Exercise 1: Local setup (45 min)
- Exercise 2: Quality gates (45 min)

**Afternoon (3-4 hours):**
- SonarQube CI/CD + Exercise 3 (90 min)
- Xray deep dive (60 min)
- Exercise 4 & 5: Xray (75 min)
- Best practices and wrap-up (30 min)

**Tasks:**
- [ ] Add section slides marking AM/PM
- [ ] Add estimated timing to each section
- [ ] Reorganize content flow for better pacing
- [ ] Include break suggestions
- [ ] Update README.md with detailed schedule

**Reference:**
See DAY4_IMPROVEMENT_RECOMMENDATIONS.md section 4 for detailed schedule.

---

### Issue #10: Update README.md Day 4 structure

**Title:** Update README.md Day 4 structure to reflect expanded content

**Labels:** enhancement, day-4, priority-medium, documentation

**Description:**
README.md currently lists Day 4 as just "SonarQube" and "XRAY" with no detail. This should be expanded to show the actual topics and structure.

**Current:**
```
Day 4
    - SonarQube
    - XRAY
```

**Proposed:**
```
Day 4 - Code Quality and Security Scanning
    Morning
        - Introduction to code quality and security
        - SonarQube
            - Architecture and concepts
            - Quality profiles and gates
            - Local setup and analysis
            - Exercise: Local SonarQube setup
            - Exercise: Quality gates configuration
        - CI/CD integration
            - GitHub Actions
            - Exercise: SonarQube in CI/CD
    Afternoon
        - Xray
            - Overview and architecture
            - Vulnerability scanning (SCA, containers)
            - Policies and watches
            - Integration with Artifactory
            - Exercise: Container scanning
            - Exercise: Policy configuration
        - Best practices and troubleshooting
        - Wrap-up and Q&A
```

**Tasks:**
- [ ] Update README.md Day 4 section
- [ ] Add sub-topics and exercises
- [ ] Add AM/PM structure
- [ ] Ensure consistency with slide content

---

### Issue #11: Create exercise support materials for Day 4

**Title:** Create exercise support materials for Day 4

**Labels:** enhancement, day-4, priority-medium, exercises

**Description:**
To ensure exercises run smoothly, we need to prepare support materials like Docker Compose files, configuration templates, scripts, and instructor guides.

**Required Materials:**

1. **Docker Compose setup**
   - SonarQube with configured settings
   - Quick start for students

2. **Configuration templates**
   - sonar-project.properties
   - GitHub Actions workflow examples
   - Xray policy JSON examples

3. **Dockerfiles**
   - Sample Dockerfile for nodejs_server
   - Multi-stage build example

4. **Quick setup scripts**
   - Troubleshooting automation
   - Environment check script

5. **Instructor guide**
   - Exercise solutions
   - Common issues and fixes
   - Timing guidelines

**Tasks:**
- [ ] Create docker-compose.yml for SonarQube
- [ ] Create sonar-project.properties template
- [ ] Create sample GitHub Actions workflows
- [ ] Create Dockerfile for nodejs_server
- [ ] Create environment check script
- [ ] Create instructor guide document
- [ ] Test all materials with nodejs_server exercise
- [ ] Add materials to exercises/ directory

**Reference:**
See DAY4_IMPROVEMENT_RECOMMENDATIONS.md section 6 for material examples.

---

### Issue #12: Add pedagogical notes for Day 4 instructors

**Title:** Add pedagogical notes for Day 4 instructors

**Labels:** enhancement, day-4, priority-low, documentation

**Description:**
Create a guide for instructors with teaching tips, common student questions, and learning objectives to ensure consistent and effective delivery.

**Content Needed:**
- Key learning objectives
- Teaching tips for each section
- Common student questions and answers
- Troubleshooting classroom issues
- Time management suggestions
- Assessment criteria

**Tasks:**
- [ ] Document learning objectives
- [ ] Compile teaching tips
- [ ] Create FAQ for common student questions
- [ ] Add real-world examples and anecdotes
- [ ] Create instructor notes document
- [ ] Add notes to slides as speaker notes

**Reference:**
See DAY4_IMPROVEMENT_RECOMMENDATIONS.md section 7 for pedagogical guidance.

---

## Implementation Priority

**Phase 1 (Critical - Week 1):**
- Issue #1: Expand slide content
- Issue #2: Add exercises
- Issue #10: Update README.md

**Phase 2 (High Priority - Week 2):**
- Issue #3: Artifactory integration
- Issue #5: SonarQube deep dive
- Issue #6: Xray deep dive
- Issue #9: AM/PM structure

**Phase 3 (Medium Priority - Week 3):**
- Issue #4: Architecture diagrams
- Issue #11: Exercise support materials

**Phase 4 (Lower Priority - Week 4):**
- Issue #7: Troubleshooting
- Issue #8: Prerequisites
- Issue #12: Pedagogical notes

## Notes for Issue Creation

When creating these issues in GitHub:
1. Copy the template content
2. Add appropriate labels
3. Assign to relevant team members
4. Link related issues
5. Set milestone if applicable
6. Reference DAY4_REVIEW_ANALYSIS.md and DAY4_IMPROVEMENT_RECOMMENDATIONS.md in each issue

## Tracking Progress

Create a tracking issue or project board with these issues to monitor overall Day 4 improvement progress.
