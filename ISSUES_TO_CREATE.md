# GitHub Issues to Create

This file contains templates for the GitHub issues that should be created based on the Day 3 and Day 4 reorganization of the production program.

## ⚠️ File Dependency Warnings

**IMPORTANT**: Some issues modify the same files. Review dependencies before assigning multiple issues simultaneously to avoid merge conflicts.

### Critical File Conflicts:
- **`slides/pages/prod-k8s-apps.md`**: Issues #1, #3, #4
- **`README.md`**: Issue #7

### Recommended Assignment Order:
1. **First**: Issue #1 (creates prod-k8s-apps.md) 
2. **After Issue #1**: Issues #3 and #4 (modify prod-k8s-apps.md)
3. **Independent**: Issues #2, #5, #6 (no conflicts)
4. **Last**: Issue #7 (modifies README.md and build config)

See detailed dependency matrix at the end of this document.

---

## Issue 1: Create missing slide file prod-k8s-apps.md

**Title**: Create missing slide file for Kubernetes application deployment

**Labels**: `slides`, `kubernetes`, `bug`, `high-priority`

**⚠️ File Dependencies**: 
- **Creates**: `slides/pages/prod-k8s-apps.md`
- **References**: `slides/formation-prod.md`
- **⚠️ BLOCKS**: Issue #3, Issue #4 (both modify prod-k8s-apps.md - complete this first)

**Body**:
```markdown
## Description

The file `slides/pages/prod-k8s-apps.md` is referenced in `slides/formation-prod.md` (line 40) but does not exist. This causes a broken reference in the production training slides.

## Current State

- ❌ File `slides/pages/prod-k8s-apps.md` does not exist
- ❌ Referenced in `slides/formation-prod.md` line 40
- ✅ Other related files exist: `prod-ansible-intra.md`, `prod-ansible-public.md`

## Expected Content

The slide file should cover:

1. **Simple Application Deployment**
   - Understanding Kubernetes manifests (deployments, services)
   - Deploy simple web app (nginx or nodejs example)
   - Exercise: Deploy and access application internally
   - Verification commands and troubleshooting

2. **Service Types and Access**
   - ClusterIP vs NodePort vs LoadBalancer
   - When to use each type
   - Hands-on examples for each

3. **Hands-on Exercises**
   - Deploy a simple web server
   - Create services for access
   - Verify pods and services with kubectl
   - Test internal connectivity

4. **Best Practices**
   - Resource limits and requests
   - Health checks (liveness/readiness probes)
   - Labels and selectors
   - Common troubleshooting commands

## Acceptance Criteria

- [ ] File `slides/pages/prod-k8s-apps.md` is created
- [ ] Content follows the theme structure (uses `---` separators)
- [ ] Includes code examples and exercises
- [ ] Aligns with Day 2 content in the 2-day tutorial format
- [ ] Slides build successfully without errors
- [ ] Content is consistent with other prod-* slide files

## Related Files

- `slides/formation-prod.md` - references the missing file
- `slides/pages/prod-kubernetes.md` - contains K8s architecture content
- `slides/pages/prod-ansible-intra.md` - intranet app deployment
- `README.md` - updated with 2-day tutorial structure
```

---

## Issue 2: Enhance Day 3 slides for Ansible and K8s integration

**Title**: Enhance Day 3 slides for Ansible and K8s integration

**Labels**: `slides`, `ansible`, `enhancement`, `day3`

**⚠️ File Dependencies**: 
- **Modifies**: `slides/pages/prod-ansible-basics.md`
- **Creates**: `slides/pages/prod-terraform-ansible-integration.md`, `slides/pages/prod-k8s-kubespray.md`
- **⚠️ NO CONFLICTS**: Can be worked on independently

**Body**:
```markdown
## Description

Update the Ansible slides (`prod-ansible-basics.md` and related files) to support the reorganized Day 3 content with better progression from Ansible basics to Kubernetes deployment.

## Current Gaps

- ⚠️ Missing connection between Terraform inventory output and Ansible consumption
- ⚠️ Kubespray usage is mentioned but not detailed
- ⚠️ No clear progression from simple playbooks to cluster deployment
- ⚠️ Exercises lack expected outcomes and troubleshooting guidance

## Proposed Improvements

### Day 3 Content Updates

1. **Morning: Ansible Basics Section**
   - Core concepts: inventory, playbooks, roles
   - Idempotency and modules
   - Exercise: simple playbook (ensure packages, write a file)

2. **Terraform Integration Section**
   - How to consume Terraform inventory outputs
   - Dynamic inventory management
   - Example inventory file structure from Terraform
   - Variables and group_vars setup

3. **Afternoon: Kubernetes Setup with Ansible**
   - Step-by-step Kubespray installation
   - Requirements.yml configuration
   - Running the cluster.yml playbook
   - Cluster verification (kubectl get nodes, CNI installation)

4. **Exercise Enhancements**
   - Add expected output examples
   - Include timing estimates (~15-30 minutes per exercise)
   - Add troubleshooting section for common errors
   - Success criteria for each exercise

## Acceptance Criteria

- [ ] Day 3 morning covers Ansible basics with practical exercises
- [ ] Terraform-to-Ansible inventory integration is documented
- [ ] Day 3 afternoon focuses on K8s deployment with Kubespray
- [ ] All exercises have expected outcomes
- [ ] Troubleshooting section added for common issues
- [ ] Timing estimates included for exercises
- [ ] Content aligns with reorganized Day 3 structure
- [ ] Slides build successfully

## Files to Update

- `slides/pages/prod-ansible-basics.md`
- Consider creating `slides/pages/prod-terraform-ansible-integration.md`
- Consider creating `slides/pages/prod-k8s-kubespray.md`

## Reference

- See `README.md` Day 3 section for updated structure
- See `PRODUCTION_IMPROVEMENTS.md` for detailed recommendations
```

---

## Issue 3: Enhance application deployment slides for external access

**Title**: Improve Day 4 slides for external application deployment patterns

**Labels**: `slides`, `kubernetes`, `ingress`, `enhancement`, `high-priority`

**⚠️ File Dependencies**: 
- **Modifies**: `slides/pages/prod-ansible-public.md`, `slides/pages/prod-k8s-apps.md`
- **⚠️ DEPENDS ON**: Issue #1 (prod-k8s-apps.md must exist first)
- **⚠️ CONFLICTS WITH**: Issue #4 (both modify prod-k8s-apps.md - coordinate or sequence)

**Body**:
```markdown
## Description

Update `prod-ansible-public.md` and `prod-k8s-apps.md` to provide comprehensive coverage of deploying applications with external access, including ingress controllers, TLS, and DNS configuration.

## Current Gaps

- ⚠️ Ingress controller setup is not detailed
- ⚠️ TLS/SSL certificate management is mentioned but not explained
- ⚠️ DNS configuration examples are missing
- ⚠️ Load balancing patterns need more detail
- ⚠️ No clear distinction between internal and external deployment

## Proposed Content

### 1. Ingress Controller Section

- Installation options (nginx-ingress, traefik)
- Configuration examples
- Ingress resource creation
- Path-based and host-based routing
- Hands-on exercise: Deploy ingress controller

### 2. TLS/SSL Management

- cert-manager installation and setup
- Let's Encrypt integration (if applicable)
- Self-signed certificates for testing
- Certificate troubleshooting
- Exercise: Add TLS to application

### 3. External Access Patterns

- Service type: LoadBalancer
- NodePort for testing
- MetalLB for bare-metal (if applicable)
- Cloud load balancers (conceptual)

### 4. DNS Configuration

- DNS record types (A, CNAME)
- External DNS operator (optional)
- Manual DNS configuration
- Testing with curl and browsers

### 5. Real-World Example Application

Replace abstract examples with concrete, tested application:
- Simple REST API or web application
- Database backend (optional)
- Complete manifests provided
- Step-by-step deployment guide

## Acceptance Criteria

- [ ] Ingress controller installation is documented
- [ ] TLS setup includes practical examples
- [ ] DNS configuration has clear steps
- [ ] Real-world application example included
- [ ] All examples tested and verified
- [ ] Content aligns with Day 2 of 2-day tutorial
- [ ] Exercises have clear success criteria
- [ ] Slides build successfully

## Files to Update

- `slides/pages/prod-ansible-public.md`
- `slides/pages/prod-k8s-apps.md` (see Issue #1)

## Reference

- See `README.md` Day 2 Morning section
- See `PRODUCTION_IMPROVEMENTS.md` recommendations
```

---

## Issue 4: Add load balancing, scaling, and DNS slides

**Title**: Create dedicated slides for load balancing, scaling, and DNS

**Labels**: `slides`, `kubernetes`, `enhancement`, `new-content`

**⚠️ File Dependencies**: 
- **Option 1 - Modifies**: `slides/pages/prod-k8s-apps.md`
- **Option 2 - Creates**: `slides/pages/prod-scaling-lb.md`
- **⚠️ DEPENDS ON**: Issue #1 (prod-k8s-apps.md must exist first)
- **⚠️ CONFLICTS WITH**: Issue #3 (both modify prod-k8s-apps.md - coordinate or sequence)

**Body**:
```markdown
## Description

The 2-day tutorial emphasizes "play with load-balancing, scaling, dns" but dedicated slide content for these topics is missing or sparse. Create comprehensive coverage for Day 2 afternoon session.

## Current State

- ⚠️ Load balancing mentioned in `prod-avances.md` but not detailed for beginners
- ⚠️ Scaling (HPA) mentioned briefly but lacks hands-on guide
- ⚠️ DNS is mentioned but internal DNS and service discovery not explained
- ✅ Some advanced topics in `prod-avances.md` but not suitable for 2-day tutorial

## Proposed Content Structure

### Option 1: Integrate into prod-k8s-apps.md

Add sections to the main K8s apps slide file:
- Load Balancing (15 minutes)
- Scaling (20 minutes)  
- DNS and Service Discovery (15 minutes)

### Option 2: Create separate slide file

Create `slides/pages/prod-scaling-lb.md` with dedicated content

## Recommended Approach: Option 1 (Integration)

Add to `prod-k8s-apps.md`:

### 1. Load Balancing Section

- **Service Load Balancing Basics**
  - How Kubernetes distributes traffic
  - Service endpoints and kube-proxy
  - iptables vs ipvs modes

- **Testing Load Distribution**
  - Deploy app with multiple replicas
  - Exercise: Send requests and observe distribution
  - Tools: curl loops, watch commands
  - Verify pod logs for request distribution

- **Advanced: MetalLB** (optional)
  - Concept of bare-metal load balancing
  - Configuration example
  - When to use MetalLB vs cloud LB

### 2. Scaling Section

- **Manual Scaling**
  - kubectl scale command
  - Declarative scaling in YAML
  - Exercise: Scale deployment up and down
  - Observe pod creation and termination

- **Horizontal Pod Autoscaler (HPA)**
  - Prerequisites: metrics-server
  - Creating HPA resources
  - CPU and memory-based scaling
  - Exercise: Generate load and watch autoscaling
  - Troubleshooting HPA

### 3. DNS and Service Discovery

- **Kubernetes Internal DNS**
  - CoreDNS architecture
  - Service DNS names (service.namespace.svc.cluster.local)
  - Pod DNS entries
  - Exercise: Test DNS resolution from pods

- **Service Discovery**
  - Environment variables vs DNS
  - Headless services
  - Exercise: Connect apps using service names

- **External DNS** (conceptual)
  - ExternalDNS operator overview
  - DNS providers integration
  - Automatic DNS record creation

## Hands-on Exercises

1. **Load Balancing Exercise** (~20 min)
   - Deploy nginx with 3 replicas
   - Create service
   - Send 100 requests, observe distribution
   - Check logs in all pods

2. **Scaling Exercise** (~25 min)
   - Deploy CPU-intensive app
   - Create HPA (min: 2, max: 5)
   - Generate load (e.g., with Apache Bench)
   - Watch scaling happen
   - Stop load, watch scale down

3. **DNS Exercise** (~15 min)
   - Deploy 2 apps (frontend, backend)
   - Configure frontend to call backend by service name
   - Test connectivity
   - Examine DNS from debug pod

## Acceptance Criteria

- [ ] Load balancing concepts explained clearly
- [ ] Scaling includes both manual and HPA
- [ ] DNS covers internal service discovery
- [ ] All exercises tested and verified
- [ ] Success criteria for each exercise
- [ ] Timing estimates provided
- [ ] Content suitable for Day 2 afternoon (2-day tutorial)
- [ ] Slides build successfully

## Implementation Notes

- Use simple, reproducible examples
- Provide all YAML manifests
- Include expected output examples
- Add troubleshooting tips for common issues

## Files to Update/Create

- Integrate into `slides/pages/prod-k8s-apps.md` (recommended)
- OR create `slides/pages/prod-scaling-lb.md`
- Update `slides/formation-prod.md` if creating new file

## Reference

- `README.md` Day 2 Afternoon section
- `PRODUCTION_IMPROVEMENTS.md` progression strategy
```

---

## Issue 5: Create exercise files for 2-day infrastructure tutorial

**Title**: Create hands-on exercise files with starter code and solutions

**Labels**: `exercises`, `terraform`, `ansible`, `kubernetes`, `enhancement`

**⚠️ File Dependencies**: 
- **Creates**: Multiple files in `exercises/infra-tutorial/` directory
- **⚠️ NO CONFLICTS**: Can be worked on independently (new directory)

**Body**:
```markdown
## Description

Create a comprehensive set of exercise files with starter code, step-by-step guides, and solutions for the 2-day infrastructure tutorial.

## Current State

- ✅ Exercises directory exists with nodejs_server example
- ❌ No terraform exercises
- ❌ No ansible exercises (except in slides)
- ❌ No k8s manifest examples for the tutorial

## Proposed Directory Structure

```
exercises/
├── infra-tutorial/
│   ├── README.md                          # Overview and prerequisites
│   ├── day1/
│   │   ├── 01-terraform-setup/
│   │   │   ├── README.md                  # Exercise guide
│   │   │   ├── main.tf                    # Starter template
│   │   │   ├── variables.tf               # Variable definitions
│   │   │   ├── outputs.tf                 # Output definitions
│   │   │   └── solution/                  # Complete solution
│   │   │       ├── main.tf
│   │   │       ├── variables.tf
│   │   │       ├── outputs.tf
│   │   │       └── cloud-init.yml
│   │   ├── 02-ansible-basics/
│   │   │   ├── README.md
│   │   │   ├── inventory.ini.example      # Inventory template
│   │   │   ├── simple-playbook.yml        # Starter playbook
│   │   │   └── solution/
│   │   │       ├── inventory.ini
│   │   │       ├── playbook.yml
│   │   │       └── group_vars/
│   │   └── 03-k8s-setup/
│   │       ├── README.md
│   │       ├── requirements.yml           # Ansible galaxy requirements
│   │       ├── inventory.ini.example
│   │       └── solution/
│   │           ├── cluster.yml            # Kubespray playbook
│   │           ├── inventory/
│   │           └── group_vars/
│   └── day2/
│       ├── 01-simple-app/
│       │   ├── README.md
│       │   ├── app/
│       │   │   ├── Dockerfile             # Simple web app
│       │   │   └── index.html
│       │   ├── deployment.yml.template    # Starter manifest
│       │   └── solution/
│       │       ├── deployment.yml
│       │       └── service.yml
│       ├── 02-external-app/
│       │   ├── README.md
│       │   ├── app/
│       │   │   └── ...                    # API application code
│       │   ├── ingress.yml.template
│       │   └── solution/
│       │       ├── deployment.yml
│       │       ├── service.yml
│       │       ├── ingress.yml
│       │       └── tls-cert.yml (optional)
│       └── 03-scaling-lb/
│           ├── README.md
│           ├── hpa.yml.template
│           ├── load-test.sh              # Simple load testing script
│           └── solution/
│               ├── deployment-scaled.yml
│               ├── hpa.yml
│               └── service-lb.yml
```

## Key Exercise Requirements

### Day 1, Exercise 1: Terraform Setup

**README.md should include**:
- Prerequisites (terraform, libvirt/vmware access)
- Learning objectives
- Step-by-step instructions
- Expected outcomes
- Verification commands
- Troubleshooting tips

**Starter files**:
- Commented templates with TODOs
- Variable placeholders
- Output structure

**Solution**:
- Complete, tested terraform code
- Works on both libvirt and vmware (via variables)
- Generates ansible inventory

### Day 1, Exercise 2: Ansible Basics

**Content**:
- Simple playbook examples
- Package installation
- File management
- User creation
- Service management

### Day 1, Exercise 3: K8s Setup

**Content**:
- Kubespray configuration
- Inventory from Terraform
- Cluster deployment
- Verification steps

### Day 2, Exercise 1: Simple App

**Content**:
- Basic nginx or nodejs app
- Deployment manifest
- ClusterIP service
- Internal access verification

### Day 2, Exercise 2: External App

**Content**:
- REST API application
- Ingress configuration
- TLS setup (optional)
- External access testing

### Day 2, Exercise 3: Scaling and LB

**Content**:
- Load balancing verification
- Manual scaling
- HPA configuration
- Load testing

## Acceptance Criteria

- [ ] Directory structure created as specified
- [ ] Each exercise has detailed README
- [ ] Starter templates have helpful comments and TODOs
- [ ] Solutions are tested and working
- [ ] Main README includes prerequisites and setup
- [ ] Examples work on libvirt (minimum requirement)
- [ ] VMware compatibility documented (even if not fully tested)
- [ ] All exercises align with slide content
- [ ] Timing estimates included
- [ ] Common troubleshooting documented

## Testing Requirements

- All terraform code tested on libvirt
- All ansible playbooks tested against created infrastructure
- All kubernetes manifests tested on deployed cluster
- Solutions verified end-to-end

## Documentation Standards

Each README.md should include:
- Title and objectives
- Prerequisites
- Estimated time
- Step-by-step instructions
- Expected outputs
- Success criteria
- Troubleshooting section
- Next steps/hints for next exercise

## Reference

- `README.md` 2-day tutorial structure
- `PRODUCTION_IMPROVEMENTS.md` exercise recommendations
```

---

## Issue 6: Update DRAFT file with 2-day tutorial content

**Title**: Clean up and align DRAFT file with new structure

**Labels**: `documentation`, `cleanup`, `low-priority`

**⚠️ File Dependencies**: 
- **Modifies**: `DRAFT`
- **⚠️ NO CONFLICTS**: Can be worked on independently

**Body**:
```markdown
## Description

The DRAFT file contains early planning notes that are now outdated. Update it to reflect the new 2-day tutorial structure or remove obsolete content.

## Current State

The DRAFT file contains:
- ✅ Useful concepts (Traditional vs DevOps approach)
- ✅ Exercise outlines for git
- ✅ GitHub Actions structure
- ⚠️ Outdated planning notes
- ⚠️ Incomplete sections

## Proposed Actions

### Option 1: Archive

Rename to `DRAFT.old` and create new DRAFT focused on:
- 2-day tutorial outline
- Detailed timing for each section
- Instructor notes
- Setup requirements

### Option 2: Update

Keep existing content but:
- Add section for 2-day tutorial
- Mark outdated sections clearly
- Add references to new structure in README

### Option 3: Remove

If content is fully integrated into slides and README:
- Move useful content to appropriate files
- Delete DRAFT
- Document decision in commit message

## Recommended Approach: Option 2 (Update)

1. Add header explaining purpose of file
2. Separate content into sections:
   - 5-day program planning
   - 2-day tutorial planning
   - Exercise ideas
   - Concepts to cover
3. Add dates and context for historical reference

## Files to Update

- `DRAFT`

## Acceptance Criteria

- [ ] DRAFT file purpose is clear
- [ ] No conflicting information with README
- [ ] Useful planning notes preserved
- [ ] Outdated content marked or removed
- [ ] 2-day tutorial planning added if keeping file

## Reference

- `PRODUCTION_IMPROVEMENTS.md`
```

---

## Issue 7: Consider creating separate slide deck for 2-day tutorial

**Title**: Create formation-prod-2day.md for condensed tutorial format

**Labels**: `slides`, `structure`, `enhancement`, `2-day-tutorial`

**⚠️ File Dependencies**: 
- **Creates**: `slides/formation-prod-2day.md`
- **Modifies**: `README.md`, potentially `netlify.toml`, `Makefile`
- **⚠️ MAY CONFLICT WITH**: Build configuration changes
- **⚠️ RECOMMENDATION**: Complete all content issues (#1-4) before this structural change

**Body**:
```markdown
## Description

Consider creating a separate slide deck specifically for the 2-day infrastructure tutorial, or add conditional slide inclusion to support both 5-day and 2-day formats from a single source.

## Current State

- ✅ `slides/formation-prod.md` exists for 5-day program
- ✅ README documents both 5-day and 2-day formats
- ⚠️ Only one slide deck exists
- ⚠️ Some slides may be too detailed for 2-day format
- ⚠️ Some slides needed for 2-day may not exist yet

## Options

### Option 1: Separate Slide Deck

Create `slides/formation-prod-2day.md` with:
- Only slides needed for 2-day tutorial
- Condensed content where appropriate
- Focus on hands-on exercises
- Less theory, more practice

**Pros**:
- Clear separation
- Easier to maintain focused content
- Can optimize for different audiences

**Cons**:
- Content duplication
- Need to maintain two decks
- Risk of divergence

### Option 2: Conditional Inclusion

Use slidev features to conditionally include slides:
- Tags or metadata for 5-day vs 2-day
- Build different outputs from same source
- Shared slide files

**Pros**:
- Single source of truth
- No duplication
- Updates apply to both

**Cons**:
- More complex build process
- May require custom slidev configuration
- Need to research slidev capabilities

### Option 3: Keep Current Approach

Use single deck with clear sections:
- Mark slides as "5-day only" or "2-day only"
- Instructors choose which to present
- Keep all content in one place

**Pros**:
- Simple
- No build changes
- Flexible for instructors

**Cons**:
- Deck may become unwieldy
- Harder to navigate for specific format
- No automated filtering

## Recommended Approach: Option 1 (Separate Deck)

Create `slides/formation-prod-2day.md` with structure:

```markdown
---
theme: the-unnamed
title: DevOps Infrastructure Tutorial (2 Days)
mdc: true
---

# Infrastructure Tutorial
## Terraform, Ansible, Kubernetes

### 2-Day Hands-on Workshop

---
src: ./pages/about-me.md
---

# Day 1

---
src: ./pages/prod-terraform.md
---

---
src: ./pages/prod-ansible-basics.md
---

---
src: ./pages/prod-k8s-setup.md  # May need new condensed version
---

# Day 2

---
src: ./pages/prod-k8s-apps.md
---

---
src: ./pages/prod-scaling-lb.md  # Or integrated in k8s-apps
---

---
src: ./pages/prod-conclusion-2day.md  # Custom conclusion
---
```

## Implementation Plan

1. Create `slides/formation-prod-2day.md`
2. Identify which existing slide files work as-is
3. Identify which need condensed versions
4. Create new slide files for gaps:
   - `prod-k8s-setup.md` (Day 1 focus)
   - `prod-conclusion-2day.md` (specific to 2-day)
   - Any others needed
5. Update build configuration to generate both decks
6. Update README with links to both slide decks

## Acceptance Criteria

- [ ] Decision made on approach
- [ ] If creating separate deck: `formation-prod-2day.md` created
- [ ] All referenced slide files exist
- [ ] Slides build successfully for both formats (if separate)
- [ ] README updated with links to appropriate slide decks
- [ ] Documentation explains when to use each deck
- [ ] No broken references

## Questions to Resolve

1. Will 2-day tutorial have different audience than 5-day?
2. Should 2-day slides be more hands-on focused?
3. Is there value in maintaining both, or should we pick one?
4. What does Slidev support for conditional inclusion?

## Files to Create/Update

- Potentially create `slides/formation-prod-2day.md`
- Update `README.md` with slide deck links
- Update `netlify.toml` or build config if needed

## Reference

- `README.md` 2-day tutorial structure
- `PRODUCTION_IMPROVEMENTS.md` recommendations
- Current `slides/formation-prod.md`
```

---

## Summary

Total issues to create: **7**

Priority breakdown:
- High Priority: 3 issues (#1, #3, #5)
- Medium Priority: 3 issues (#2, #4, #7)
- Low Priority: 1 issue (#6)

These issues address all aspects mentioned in the original request:
1. ✅ Review README for prod program
2. ✅ Suggest improvements on prod days 3 and 4
3. ✅ Balance sections on 2 days
4. ✅ Update README
5. ✅ Create issues for other files

---

## 📊 File Dependency Matrix

This matrix shows which files each issue will modify to help coordinate work and avoid merge conflicts.

| Issue # | Title | Files Modified/Created | Dependency Notes |
|---------|-------|------------------------|------------------|
| **1** | Create prod-k8s-apps.md | **Creates**: `slides/pages/prod-k8s-apps.md`<br>**References**: `slides/formation-prod.md` | ⚠️ **BLOCKS** Issues #3 & #4 |
| **2** | Enhance Ansible/K8s integration | **Modifies**: `slides/pages/prod-ansible-basics.md`<br>**Creates**: `slides/pages/prod-terraform-ansible-integration.md`, `slides/pages/prod-k8s-kubespray.md` | ✅ Independent |
| **3** | External access deployment | **Modifies**: `slides/pages/prod-ansible-public.md`, `slides/pages/prod-k8s-apps.md` | ⚠️ **DEPENDS ON** Issue #1<br>⚠️ **CONFLICTS** with Issue #4 |
| **4** | Load balancing, scaling, DNS | **Modifies**: `slides/pages/prod-k8s-apps.md`<br>**OR Creates**: `slides/pages/prod-scaling-lb.md` | ⚠️ **DEPENDS ON** Issue #1<br>⚠️ **CONFLICTS** with Issue #3 |
| **5** | Exercise files for 2-day tutorial | **Creates**: Many files in `exercises/infra-tutorial/*` | ✅ Independent |
| **6** | Update DRAFT file | **Modifies**: `DRAFT` | ✅ Independent |
| **7** | Separate 2-day slide deck | **Creates**: `slides/formation-prod-2day.md`<br>**Modifies**: `README.md`, `netlify.toml`, `Makefile` | ⚠️ Best done AFTER #1-#4 |

### 🔴 Critical File Conflicts

**`slides/pages/prod-k8s-apps.md`**:
- Issue #1: Creates this file
- Issue #3: Modifies this file (depends on #1)
- Issue #4: Modifies this file (depends on #1)

**Resolution Strategy**: 
1. Complete Issue #1 first
2. Then complete Issues #3 and #4 sequentially, OR
3. Coordinate to have #3 work on external access sections and #4 work on scaling sections

### 📋 Recommended Assignment Strategies

#### Strategy 1: Sequential (Safest)
1. Assign Issue #1 → Wait for completion
2. Assign Issue #3 → Wait for completion
3. Assign Issue #4
4. Parallel: Issues #2, #5, #6 (no conflicts)
5. Finally: Issue #7

#### Strategy 2: Parallel with Coordination
- **Team A**: Issue #1
- **Team B**: Issues #2, #5, #6 (parallel, independent)
- **Team C**: Wait for #1, then #3 (external access focus)
- **Team D**: Wait for #3, then #4 (scaling focus)
- **Team E**: Issue #7 (after content issues complete)

#### Strategy 3: Modified Approach for Issue #4
To avoid conflict with Issue #3:
- Issue #4 creates a **separate file** `slides/pages/prod-scaling-lb.md` instead of modifying prod-k8s-apps.md
- This allows Issues #3 and #4 to work in parallel after Issue #1

### 🛡️ Conflict Prevention Checklist

Before assigning multiple issues:
- [ ] Check if issues modify the same files (see matrix above)
- [ ] Ensure dependent issues are completed first (Issue #1 before #3 & #4)
- [ ] Consider using separate files for parallel work (e.g., Issue #4 option 2)
- [ ] Communicate with assignees about file ownership
- [ ] Use git branches per issue
- [ ] Coordinate merge order to minimize conflicts

### 📝 Additional Notes

**For Issue Assignees**:
- Always check this matrix before starting work
- Communicate with others working on related files
- Pull latest changes before starting if dependencies exist
- Consider breaking large changes into smaller, focused commits
- Test that slides build successfully after changes

**For Project Coordinators**:
- Monitor which issues are in progress
- Sequence dependent issues appropriately
- Consider splitting Issue #4 to use separate file for true parallelism
- Update this matrix if new file dependencies are discovered
