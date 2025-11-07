# Day 4: SonarQube and Xray - Instructor Guide

## Overview

This guide helps instructors deliver Day 4 training on code quality and security scanning. The day covers SonarQube for static code analysis and JFrog Xray for dependency and container security.

**Duration:** Full day (7-8 hours)
**Format:** Theory + Hands-on exercises
**Difficulty:** Intermediate

## Learning Objectives

By the end of Day 4, students will be able to:

1. **Understand** the importance of automated quality and security checks in DevOps
2. **Configure and run** SonarQube scans locally and in CI/CD pipelines
3. **Interpret** quality reports and take appropriate action on findings
4. **Configure** Xray for vulnerability scanning of dependencies and containers
5. **Create and enforce** security policies using Xray watches and rules
6. **Integrate** quality and security scanning into the development workflow
7. **Apply** the "shift-left" security principle in practice

## Time Allocation

### Morning Session: SonarQube (3.5-4 hours)

- **Introduction** (30 min): Why code quality matters, DevSecOps approach
- **SonarQube Basics** (45 min): Architecture, metrics, profiles, gates
- **Local Setup** (15 min): Demo + guided setup
- **Exercise 1** (45 min): Local SonarQube setup and first scan
- **Break** (15 min)
- **Quality Gates Deep Dive** (30 min): Configuration strategies, new code focus
- **Exercise 2** (45 min): Quality gates configuration
- **CI/CD Integration** (30 min): GitHub Actions, PR decoration
- **Exercise 3** (45 min): GitHub Actions integration
- **Lunch Break** (60 min)

### Afternoon Session: Xray (3-4 hours)

- **Xray Overview** (30 min): SCA, architecture, integration with Artifactory
- **Vulnerability Management** (45 min): CVE severity, remediation strategies
- **Watches and Policies** (30 min): Configuration and enforcement
- **Exercise 4** (30 min): Container image scanning
- **Break** (15 min)
- **License Compliance** (20 min): License types, compliance requirements
- **Exercise 5** (30 min): Policy configuration
- **Best Practices** (30 min): Organizational adoption, troubleshooting
- **Wrap-up and Q&A** (20 min): Summary, resources, next steps

## Pre-class Preparation

### For Instructors

1. **Test Environment**
   - Docker installed and running
   - SonarQube LTS image pulled: `docker pull sonarqube:lts`
   - Access to Artifactory/Xray instance (or JFrog Cloud trial)
   - Sample vulnerable application ready (nodejs_server in exercises)

2. **Accounts and Access**
   - SonarCloud account (free for public repos)
   - JFrog Cloud account or self-hosted Artifactory/Xray
   - GitHub account with Actions enabled
   - Pre-configured demo repositories

3. **Prepare Demo Materials**
   - Working SonarQube instance with sample scans
   - Xray with pre-configured watches and policies
   - Examples of quality gate failures
   - Examples of policy violations
   - Real-world CVE examples (Log4Shell, etc.)

4. **Review Content**
   - Section 7 of DAY4_IMPROVEMENT_RECOMMENDATIONS.md
   - Latest CVE trends and notable vulnerabilities
   - Recent updates to SonarQube and Xray features

### For Students

Send these prerequisites before class:

1. **Software Requirements**
   - Docker installed and running (Docker Desktop or Docker Engine)
   - Git client installed
   - Node.js 20+ (for exercises)
   - Text editor or IDE

2. **Accounts**
   - GitHub account with Actions enabled
   - Access to provided Artifactory/Xray instance (credentials will be shared)
   - SonarCloud account (optional, can create during class)

3. **Knowledge Prerequisites**
   - Completed Day 3 (CI/CD pipelines)
   - Basic understanding of GitHub Actions
   - Familiarity with Docker commands
   - Understanding of software development lifecycle

4. **Repository Setup**
   - Fork the tuto_devops_slides repository
   - Clone locally: `git clone https://github.com/[username]/tuto_devops_slides`
   - Verify nodejs_server exercises exist: `cd exercises/nodejs_server`

## Teaching Tips

### Start with "Why" Before "How"

**Common Mistake:** Jumping straight into tool configuration without context.

**Better Approach:**
- Begin with real-world examples of security breaches (Equifax, SolarWinds)
- Show the cost of technical debt ($2.08 trillion annually)
- Discuss the "shift-left" security principle
- Use analogies: "Quality gates are like airport security - catch issues before they board"

**Recommended Opening:**
> "Imagine you're building a house. Would you wait until it's complete to check if the foundation is solid? Or would you verify at each step? DevSecOps applies the same principle to software."

### Use Real-World Examples

**Throughout the day, reference actual incidents:**

1. **Log4Shell (CVE-2021-44228)**: Critical RCE in Log4j
   - CVSS 10.0 - explain why it was critical
   - Show how Xray would have detected it
   - Discuss the remediation challenge

2. **Equifax Breach (2017)**: Unpatched Apache Struts vulnerability
   - Cost: $700+ million
   - 147 million people affected
   - Could have been prevented with automated scanning

3. **Technical Debt at Scale**: Reference studies showing:
   - 20-40% slowdown in development due to poor code quality
   - Average cost to fix a bug in production: 100x more than during development

### Make It Interactive

**Instead of lecture-only:**
- Ask students to predict: "What severity would you assign to an SQL injection vulnerability?"
- Live polls: "How many of you have accidentally committed secrets to Git?"
- Group discussions: "When should we block deployments vs. just warn?"
- Code reviews: Show problematic code, ask what's wrong

**Demonstration Ideas:**
1. Intentionally introduce a bug, scan with SonarQube, show the detection
2. Create a quality gate, make it fail, then fix and pass
3. Push vulnerable code to Artifactory, show Xray blocking the download
4. Live scan of a popular open-source project

### Common Student Questions and Answers

#### SonarQube Questions

**Q: Should we fix all issues at once?**
A: No! This is the #1 mistake teams make. Use the "water leak" principle:
- Stop new leaks (focus on new code)
- Fix critical issues in existing code gradually
- Don't block development on legacy debt
- Set realistic quality gates that tighten over time

**Q: How strict should quality gates be?**
A: It depends on context:
- **New project**: Start with recommended defaults, can be stricter
- **Legacy project**: Start lenient, tighten gradually with team agreement
- **Critical systems**: Stricter gates (financial, healthcare, security)
- **Prototypes**: More lenient, focus on major issues

Rule of thumb: Gates should catch real problems without creating frustration.

**Q: What about false positives?**
A: They happen. Best practices:
- Mark as false positive in SonarQube (with written justification)
- Don't disable rules globally - fix specific instances
- Review false positives periodically
- Engage with the SonarQube community if a rule seems wrong

**Q: Our code coverage is only 30%. Should we stop development until we reach 80%?**
A: No. Focus on:
- **New code coverage**: Require 80% on new code
- **Critical paths**: Ensure important features are tested
- **Gradual improvement**: Add tests incrementally
- **Don't chase 100%**: Some code (getters/setters) doesn't need tests

**Q: SonarQube vs SonarCloud - which should we use?**
A: 
- **SonarCloud**: Public repos, managed service, easier setup, free for open source
- **SonarQube**: Private repos, self-hosted, more control, enterprise features
- Recommendation: Start with SonarCloud for learning, migrate to SonarQube for production

#### Xray Questions

**Q: Which vulnerabilities should we fix first?**
A: Prioritize based on:
1. **Severity + Exploitability**: Critical/High CVEs with known exploits
2. **Environment**: Production > Staging > Development
3. **Exposure**: Network-accessible services > internal libraries
4. **Fix Availability**: Has a patch been released?

Example priority:
- Critical CVE in production web server → Fix immediately (hours)
- High CVE in development dependency → Next sprint
- Low CVE in test-only package → Backlog

**Q: We have hundreds of vulnerabilities. Where do we start?**
A: Don't panic! Common in legacy projects. Strategy:
1. **Policy Approach**: Create policies that block new vulnerabilities
2. **Focus on Production**: Fix production systems first
3. **Critical First**: Address CVSS 9.0+ immediately
4. **Group by Package**: Often one package upgrade fixes multiple CVEs
5. **Track Progress**: Reduce count by 10% each sprint

**Q: Can we ignore vulnerabilities if we don't use the affected feature?**
A: Yes, with caution:
- Document WHY it's not exploitable in your context
- Set a review date (quarterly)
- Monitor for changes (exploit code released?)
- Better: Remove the dependency entirely if possible

**Q: What about license compliance? Why does it matter?**
A: Legal and business reasons:
- **GPL/AGPL**: May require you to open-source your code
- **Commercial licenses**: May require payment or attribution
- **Regulatory**: Some industries ban certain licenses
- **Customer requirements**: Contracts may restrict licenses

Real example: Company had to rewrite major component because GPL library discovered in production code.

**Q: Xray vs Snyk vs other tools?**
A:
- **Xray**: Best if already using Artifactory, excellent container scanning
- **Snyk**: Developer-friendly, good IDE integration, popular for open source
- **Others**: Trivy (free, containers), OWASP Dependency-Check (free, basic)
- Recommendation: Xray for enterprise, Snyk for developer experience, Trivy for budget-conscious

### Troubleshooting Classroom Issues

#### Issue: Docker won't start on student laptop

**Symptoms:** SonarQube container fails to run

**Solutions:**
1. Check Docker Desktop is running (look for whale icon)
2. Verify Docker daemon: `docker ps`
3. Resource constraints: Increase Docker memory to 4GB
4. Fallback: Use SonarCloud instead of local instance
5. Pair students: Share working instances

#### Issue: SonarQube shows "Elasticsearch failed to start"

**Symptoms:** SonarQube container exits immediately

**Solutions:**
1. Add environment variable: `-e SONAR_ES_BOOTSTRAP_CHECKS_DISABLE=true`
2. Check system limits: `sysctl vm.max_map_count` (Linux/Mac)
3. Increase Docker memory allocation
4. Use Docker Compose with proper configuration
5. Show correct command:
   ```bash
   docker run -d --name sonarqube \
     -p 9000:9000 \
     -e SONAR_ES_BOOTSTRAP_CHECKS_DISABLE=true \
     sonarqube:lts
   ```

#### Issue: Scanner can't connect to SonarQube

**Symptoms:** "Connection refused" or timeout errors

**Solutions:**
1. Wait longer - SonarQube takes 2-3 minutes to start
2. Check logs: `docker logs sonarqube`
3. Verify URL: `http://localhost:9000` (not https, not 0.0.0.0)
4. Test in browser first
5. Check firewall/antivirus blocking port 9000
6. Verify SONAR_TOKEN is correct (no spaces, quotes)

#### Issue: GitHub Actions workflow fails with permission error

**Symptoms:** "403 Forbidden" when pushing to GHCR

**Solutions:**
1. Add `permissions:` block to workflow:
   ```yaml
   permissions:
     contents: read
     packages: write
   ```
2. Verify repository settings allow Actions
3. Check if using GITHUB_TOKEN (automatic) or personal token
4. For private repos, verify package permissions

#### Issue: Xray shows no vulnerabilities for scanned image

**Symptoms:** Scan completes but results are empty

**Solutions:**
1. Wait - indexing can take 5-10 minutes
2. Verify Xray license is valid
3. Check repository has Xray indexing enabled
4. Verify watch includes the repository
5. Check artifact actually uploaded to Artifactory
6. Review Xray system logs (admin access needed)

#### Issue: Students falling behind during exercises

**Strategies:**
1. **Buddy System**: Pair faster students with slower ones
2. **Checkpoints**: Have students raise hands when complete
3. **Provide Complete Files**: For those struggling, share working configs
4. **Extend Time**: Be flexible with timing
5. **Homework Option**: Encourage completion after class
6. **Skip Ahead**: Jump to demo if most are struggling

#### Issue: Exercise requires Artifactory but no access

**Fallback Options:**
1. Use JFrog Cloud free tier (sign up takes 5 min)
2. Docker Hub with Trivy for container scanning demo
3. Snyk free tier as Xray alternative
4. Pre-recorded demo video if infrastructure unavailable
5. Focus more time on SonarQube exercises

## Exercise Delivery Notes

### Exercise 1: Local SonarQube Setup (45 minutes)

**Objective:** Students gain hands-on experience setting up SonarQube and running their first code scan.

**Instructor Actions:**
1. **Live Demo First** (10 min):
   - Start SonarQube container
   - Access UI, login, change password
   - Create project manually
   - Generate token (emphasize security)
   - Run scanner on nodejs_server
   - Navigate results together

2. **Guided Exercise** (30 min):
   - Students repeat the process
   - Circulate to help with issues
   - Point out interesting findings in their scans

3. **Group Review** (5 min):
   - Ask volunteers to share: "What did SonarQube find?"
   - Discuss common issues discovered
   - Explain why certain issues are flagged

**Common Issues:**
- Container exits immediately → Check SONAR_ES_BOOTSTRAP_CHECKS_DISABLE
- Can't access UI → Wait longer, check logs
- Token not working → Copy without quotes/spaces
- Scanner fails → Check sonar-project.properties path

**Success Criteria:**
- SonarQube UI accessible
- Project visible with analysis results
- Students can navigate to issues view
- Basic understanding of bug vs code smell vs vulnerability

**Extension for Fast Finishers:**
- Explore different issue types
- Try fixing a bug and re-scanning
- Set up quality profile customization
- Review technical debt calculation

### Exercise 2: Quality Gates Configuration (45 minutes)

**Objective:** Configure custom quality gates and experience pass/fail enforcement.

**Instructor Actions:**
1. **Explain Quality Gates** (10 min):
   - Show existing gates in UI
   - Explain conditions and thresholds
   - Discuss "new code" vs "overall code" strategy
   - Live demo: Create custom gate

2. **Guided Exercise** (25 min):
   - Students create "Strict Quality" gate
   - Add conditions (coverage, bugs, code smells)
   - Assign to their project
   - Introduce bugs intentionally
   - Re-scan and observe failure
   - Fix bugs and see gate pass

3. **Discussion** (10 min):
   - "What threshold is appropriate for your team?"
   - "When should gates be blocking vs warning?"
   - Share experiences

**Teaching Strategy:**
- Make it tangible: "This gate would have blocked that production bug"
- Show the gate in action: Push to GitHub, show PR blocked
- Discuss trade-offs: Strictness vs velocity

**Common Issues:**
- Gate doesn't apply → Check it's assigned to project
- Always passes → Check "new code" period setting
- Can't create gate → Need admin permissions
- Unclear on conditions → Explain each metric

**Success Criteria:**
- Custom quality gate created
- Gate fails with intentional bugs
- Gate passes after fixes
- Understanding of when to use strict vs lenient gates

**Real-world Connection:**
Share story: "At Company X, we started with 50% coverage requirement. After 6 months, team voted to increase to 80%. They saw the value."

### Exercise 3: GitHub Actions Integration (45 minutes)

**Objective:** Integrate SonarQube into CI/CD pipeline with PR decoration.

**Instructor Actions:**
1. **Demo GitHub Actions Integration** (15 min):
   - Show complete workflow file
   - Explain each step (checkout, setup, test, scan)
   - Emphasize fetch-depth: 0 for better analysis
   - Show how secrets are configured
   - Demonstrate PR decoration in action

2. **Guided Exercise** (25 min):
   - Students create workflow file
   - Configure repository secrets
   - Push workflow to GitHub
   - Create PR to test decoration
   - Observe quality gate status in PR

3. **Troubleshooting Session** (5 min):
   - Address common workflow failures
   - Show how to read Actions logs

**Advanced Topic (if time permits):**
- Branch protection rules requiring quality gate
- Quality gate as a status check
- Preventing merge on failed gate

**Common Issues:**
- Workflow doesn't trigger → Check file location, branch names
- Scanner fails → Missing SONAR_TOKEN or SONAR_HOST_URL
- No PR decoration → GitHub integration not configured in SonarQube
- Coverage not showing → Tests didn't generate coverage report

**Success Criteria:**
- Workflow runs successfully on push
- PR shows quality gate status
- Students can navigate workflow logs
- Understanding of CI integration benefits

**Discussion Points:**
- "How does this change code review process?"
- "Would you make quality gate blocking in production?"
- "What happens if SonarQube server is down?"

### Exercise 4: Container Image Scanning with Xray (30 minutes)

**Objective:** Scan Docker images for vulnerabilities and understand SBOM.

**Instructor Actions:**
1. **Demo Container Scanning** (10 min):
   - Build nodejs_server Docker image
   - Tag and push to Artifactory
   - Show Xray automatic scan
   - Navigate scan results
   - Explain SBOM (Software Bill of Materials)
   - Show vulnerability details

2. **Guided Exercise** (15 min):
   - Students build their own image
   - Push to shared Artifactory instance
   - Wait for scan completion
   - Review their results
   - Identify top 3 vulnerabilities

3. **Group Analysis** (5 min):
   - Compare results across class
   - Discuss common vulnerabilities found
   - Explain why base image matters

**Teaching Moment:**
Show how changing base image (e.g., node:20-alpine vs node:20) affects vulnerability count.

**Common Issues:**
- Can't push to Artifactory → Check credentials, repository permissions
- Scan shows nothing → Wait longer (indexing delay)
- Build fails → Dockerfile syntax, missing files
- Don't understand SBOM → Explain as "ingredient list"

**Success Criteria:**
- Docker image built and pushed
- Scan results visible in Xray
- SBOM reviewed
- Understanding of base image vulnerabilities

**Real-world Example:**
"The Log4j vulnerability affected millions of containers. Xray scanned all artifacts in Artifactory automatically and identified affected images within hours."

### Exercise 5: Xray Policy Configuration (30 minutes)

**Objective:** Create security policies with enforcement actions.

**Instructor Actions:**
1. **Explain Watches and Policies** (10 min):
   - Draw diagram: Watch → Policy → Rules → Actions
   - Show existing policy in UI
   - Explain rule conditions and actions
   - Demonstrate policy violation

2. **Guided Exercise** (15 min):
   - Create watch for docker-local repository
   - Create "Production Security" policy
   - Add rules (critical CVE block, high CVE warn)
   - Add license compliance rules
   - Assign policy to watch
   - Test by pushing vulnerable image
   - Observe download block

3. **Discussion** (5 min):
   - "What policies would your organization need?"
   - "When to block vs warn?"
   - "How to handle legacy systems?"

**Advanced Scenario (if time):**
Show policy with grace period: "Warn for 7 days, then block"

**Common Issues:**
- Policy not enforced → Watch not active or repository not in scope
- Can still download → Action is "warn" not "block"
- Confused about watches vs policies → Use analogy: "Watch is what to monitor, policy is what to do"
- Don't see violation → Artifact not actually violating rules

**Success Criteria:**
- Watch created and active
- Policy with multiple rules configured
- Successful blocking of vulnerable artifact
- Understanding of policy enforcement workflow

**Business Context:**
"Imagine explaining to your CEO why you deployed a container with a critical vulnerability. Policies automate the 'should we deploy this?' decision."

## Assessment Criteria

### Knowledge Check Questions

**Throughout the day, ask:**

1. "Explain the difference between a bug, vulnerability, and code smell in SonarQube."
   - *Looking for:* Understanding of reliability vs security vs maintainability

2. "Why focus on new code quality rather than fixing all legacy issues?"
   - *Looking for:* Water leak principle, pragmatic approach

3. "What factors determine CVE severity?"
   - *Looking for:* Exploitability, impact, attack vector, privileges required

4. "Describe the flow from code commit to blocked deployment due to vulnerability."
   - *Looking for:* Understanding of integrated workflow

5. "When would you use 'warn' vs 'block' in an Xray policy?"
   - *Looking for:* Risk assessment, environment considerations

### Practical Assessment

**By end of day, students should demonstrate:**

✅ **SonarQube Competency:**
- [ ] Start SonarQube locally
- [ ] Create project and scan code
- [ ] Interpret scan results
- [ ] Configure quality gate
- [ ] Integrate with GitHub Actions
- [ ] Understand quality metrics

✅ **Xray Competency:**
- [ ] Scan container image
- [ ] Interpret vulnerability report
- [ ] Understand CVSS scores
- [ ] Create watch and policy
- [ ] Configure enforcement rules
- [ ] Understand license compliance

✅ **Integration Understanding:**
- [ ] Explain shift-left security
- [ ] Describe CI/CD quality checks
- [ ] Configure PR decoration
- [ ] Understand automated enforcement

### Signs of Success

**During exercises, look for:**
- Students helping each other (peer learning)
- "Aha!" moments when seeing gate enforcement
- Questions about real-world application
- Discussion of how to implement in their projects
- Experimentation beyond exercise requirements

**Red flags:**
- Silent confusion (check in individually)
- Skipping steps without understanding
- Copy-pasting without reading
- Rushing to finish without learning

## Real-World Examples and Anecdotes

### Story 1: The $700 Million Bug (Equifax)

**When to use:** During "Why Code Quality Matters" introduction

**The story:**
In 2017, Equifax suffered a massive data breach affecting 147 million people. The root cause? A known vulnerability (CVE-2017-5638) in Apache Struts framework. A patch was available for months, but wasn't applied.

**The lesson:**
- Automated scanning would have detected this
- Security policies could have blocked deployment
- Cost of prevention: ~$1,000 in scanning tools
- Cost of breach: $700+ million in settlements
- ROI: 700,000x return on security investment

**Discussion prompt:**
"How would Xray have helped Equifax?"

### Story 2: Log4Shell - The Internet's Worst Week (2021)

**When to use:** During Xray CVE severity discussion

**The story:**
CVE-2021-44228 (Log4Shell) was a 10.0 CVSS vulnerability in Log4j, used by millions of applications. Remote code execution with a simple string. Every security team worked through Christmas 2021.

**The impact:**
- Affected Apple, Tesla, Amazon, Microsoft, and millions of smaller companies
- Scanning billions of artifacts took days
- Companies with Xray identified all affected artifacts in hours
- Manual tracking: weeks or months

**The lesson:**
This is why we automate. Manual inventory is impossible at scale.

**Show in class:**
- Pull up the CVE details
- Show CVSS score breakdown
- Demonstrate Xray detecting it

### Story 3: The Quality Gate that Saved Production

**When to use:** During quality gate configuration

**The story:**
A team at a financial company set up a quality gate requiring 80% test coverage on new code. One day, a junior developer rushed a critical bug fix before market close. Quality gate failed: coverage only 50%.

Senior developer reviewed. The "fix" would have caused a different bug affecting millions in transactions. Gate forced proper testing, bug was found, correct fix deployed.

**The lesson:**
Quality gates aren't bureaucracy - they're safety nets. Even experienced developers make mistakes under pressure.

**Discussion:**
"Have you ever been saved by automated checks?"

### Story 4: The GPL License Surprise

**When to use:** During license compliance discussion

**The story:**
A startup was about to be acquired for $50 million. During due diligence, lawyers found GPL-licensed code in their proprietary product. GPL requires source code disclosure. Deal almost fell through. Settled for $30 million after lawyers spent months untangling dependencies.

**The cost:**
- $20 million lost deal value
- $500k in legal fees
- 6-month delay
- All from one npm package with wrong license

**The lesson:**
License compliance isn't just legal paranoia. It has real business impact.

**Xray solution:**
Block GPL licenses in production repositories. Simple rule, millions saved.

### Story 5: The Coverage Metric that Lied

**When to use:** When discussing coverage metrics

**The story:**
A team boasted 95% code coverage. Management was happy. Then production bug caused a 3-hour outage. The critical function? Covered by tests, but tests didn't actually verify behavior - they just executed the code.

**The lesson:**
Coverage percentage is a starting point, not a goal. Quality of tests matters more than quantity.

**Teaching point:**
"Coverage tells you what's NOT tested. It doesn't tell you what IS well-tested."

## Post-Class Follow-up

### Homework Assignments (Optional)

1. **Integration Challenge:**
   - Set up quality gates that block PRs
   - Configure branch protection requiring passing checks
   - Document your quality standards

2. **Security Audit:**
   - Scan your personal projects with SonarQube
   - Identify and fix top 3 critical issues
   - Write brief report on findings

3. **Policy Design:**
   - Design security policies for 3 environments (dev, staging, prod)
   - Justify different rules for each
   - Present trade-offs

### Additional Resources

**For SonarQube:**
- Official Docs: https://docs.sonarqube.org
- SonarCloud: https://sonarcloud.io
- Community Forum: https://community.sonarsource.com
- Video: "SonarQube in 100 Seconds"

**For Xray:**
- JFrog Security Docs: https://jfrog.com/help/r/jfrog-security-documentation
- JFrog Academy: Free courses on Xray
- CVSS Calculator: https://www.first.org/cvss/calculator
- CVE Database: https://cve.mitre.org

**General Security:**
- OWASP Top 10: https://owasp.org/www-project-top-ten/
- National Vulnerability Database: https://nvd.nist.gov
- Snyk Vulnerability DB: https://security.snyk.io

### Feedback Collection

**End of day survey (2 minutes):**

1. Rate your understanding of SonarQube (1-5)
2. Rate your understanding of Xray (1-5)
3. Most valuable exercise?
4. Most challenging concept?
5. What would you like more practice with?
6. Will you implement this in your projects? Why/why not?
7. One thing we should change for next class?

**Use feedback to:**
- Adjust timing for future sessions
- Identify confusing topics
- Improve exercises
- Measure practical impact

## Troubleshooting Quick Reference

### SonarQube

| Problem | Quick Fix |
|---------|-----------|
| Container won't start | Add `-e SONAR_ES_BOOTSTRAP_CHECKS_DISABLE=true` |
| Can't access UI | Wait 2-3 min, check `docker logs sonarqube` |
| Scanner fails | Verify token, check URL format |
| Coverage shows 0% | Ensure coverage report generated and path correct |
| Quality gate always passes | Check "new code" period setting |

### Xray

| Problem | Quick Fix |
|---------|-----------|
| No vulnerabilities found | Wait for indexing (5-10 min) |
| Policy not enforcing | Check watch is active and policy assigned |
| Can't push to Artifactory | Verify credentials and repository permissions |
| Scan takes forever | Large images take time, check Xray system status |
| False positives | Mark as ignored with justification |

### GitHub Actions

| Problem | Quick Fix |
|---------|-----------|
| Workflow doesn't run | Check file in `.github/workflows/`, verify branch |
| Permission denied | Add `permissions:` block |
| Scanner can't connect | Check secrets are set correctly |
| PR decoration missing | Configure GitHub integration in SonarQube |

## Conclusion

Day 4 is critical for instilling a quality-first and security-first mindset. The goal isn't just teaching tools, but changing how developers think about code quality and security.

**Success looks like:**
- Students who will scan their code before pushing
- Teams that will implement quality gates
- Organizations that will enforce security policies
- Developers who see quality as part of their job, not QA's job

**Remember:**
- Be patient - security concepts take time
- Use real stories - they make it memorable
- Encourage questions - security is complex
- Celebrate improvements - any progress is good
- Make it practical - show ROI, not just features

**Final thought for students:**
> "The best time to find a bug is before you write it. The second best time is now."

---

*This guide is a living document. Please share feedback and improvements with the training team.*
