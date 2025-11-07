# Suggested GitHub Issues for Production Day 2 Improvements

This file contains suggested GitHub issues based on the review of the Production Day 2 Terraform program. These issues are ready to be created in the GitHub repository for tracking and implementation.

---

## Issue 1: Fix cluster terminology inconsistency in README

**Labels**: `documentation`, `good first issue`  
**Priority**: Low  
**Effort**: 5 minutes  
**Assignee**: (to be assigned)

### Description
The README.md has inconsistent terminology when describing the cluster size for Production Day 2.

**Current state:**
- README.md says "Exercises: libvirt based infrastructure, 1 master, 2 nodes"
- prod-terraform.md slides say "Create 3 VMs: 1 master, 2 worker nodes"

**Problem:**
The term "2 nodes" is ambiguous - it's unclear if this means 2 total nodes (confusing) or 2 worker nodes (clear).

### Proposed Solution
Update README.md Day 2 section to use clearer terminology:
- Change: "Exercises: libvirt based infrastructure, 1 master, 2 nodes"
- To: "Exercises: libvirt based infrastructure, 3 nodes (1 master, 2 workers)"

### Acceptance Criteria
- [ ] README.md updated with clarified cluster size
- [ ] Terminology matches prod-terraform.md slides
- [ ] No ambiguity about total number of nodes

---

## Issue 2: Clarify provider strategy (libvirt vs vSphere)

**Labels**: `documentation`, `enhancement`, `needs discussion`  
**Priority**: High  
**Effort**: 1-2 hours  
**Assignee**: (to be assigned)

### Description
There's inconsistency across documentation about which Terraform provider is being used for Production Day 2 training.

**Current state:**
- README.md: Only mentions "libvirt based infrastructure"
- prod-terraform.md: Primary focus on libvirt, vSphere as "Optional"
- DRAFT file: Heavy focus on vSphere provider with VMware infrastructure

### Problem
Students and instructors may be confused about:
- Which provider to prepare for
- What infrastructure will actually be available
- Whether examples will work in their environment

### Proposed Solution
**Option A (Recommended):** Use libvirt as primary for hands-on labs, mention vSphere as production alternative
- Pros: Everyone can run locally, reproducible environment, no VMware license needed
- Cons: Different from production environments

**Option B:** Use vSphere as primary, libvirt as fallback
- Pros: Closer to production reality
- Cons: Requires VMware infrastructure, not all students can practice at home

**Option C:** Teach both in parallel
- Pros: Most comprehensive
- Cons: Too much content for 1 day, confusing for beginners

### Tasks
- [ ] Decide on primary provider strategy
- [ ] Update README.md to reflect choice
- [ ] Update prod-terraform.md slides consistently
- [ ] Update DRAFT file if needed
- [ ] Ensure exercises are written for chosen provider
- [ ] Document the "why" behind the choice

### Acceptance Criteria
- [ ] All documentation uses consistent provider terminology
- [ ] Clear explanation of primary vs alternative providers
- [ ] Exercise instructions match the chosen provider

---

## Issue 3: Remove Kubernetes installation from Day 2 scope

**Labels**: `documentation`, `enhancement`, `scope`  
**Priority**: High  
**Effort**: 2 hours  
**Assignee**: (to be assigned)

### Description
The DRAFT file for Production Day 2 includes Kubernetes installation (Kubeadm, CNI, cluster validation) in addition to Terraform content. This is too ambitious for a single day focused on learning Terraform.

**Current DRAFT Day 2 content:**
- Terraform basics and provider setup
- Infrastructure creation with Terraform
- **Kubernetes installation with Kubeadm**
- **CNI installation (Calico/Flannel)**
- **Cluster validation**

### Problem
- Day 2 is supposed to focus on "Terraform basics"
- Learning Terraform + Installing K8s in one day is too much
- Doesn't align with README which only mentions Terraform
- Leaves no time for proper Terraform exercises and troubleshooting

### Proposed Solution
**Keep in Day 2:**
- Terraform fundamentals and syntax
- Provider configuration (libvirt or vSphere)
- Creating VMs with Terraform
- Cloud-init for basic VM setup
- Preparing infrastructure for K8s (but not installing it)

**Move to later day:**
- Kubernetes installation → Day 3 or Day 4
- Can be combined with Ansible (using kubespray)
- Or create a dedicated half-day for K8s setup

### Tasks
- [ ] Review DRAFT file Day 2 content
- [ ] Remove K8s installation steps from Day 2
- [ ] Determine appropriate day for K8s installation (suggest Day 3)
- [ ] Update Day 2 to end with "VMs ready for K8s installation"
- [ ] Update subsequent day to start with K8s installation
- [ ] Ensure logical flow between days

### Acceptance Criteria
- [ ] Day 2 focuses solely on Terraform
- [ ] K8s installation moved to appropriate later day
- [ ] Clear transition point between days
- [ ] Total content still fits training schedule

---

## Issue 4: Create progressive Terraform exercises

**Labels**: `enhancement`, `exercises`, `content creation`  
**Priority**: High  
**Effort**: 6-8 hours  
**Assignee**: (to be assigned)

### Description
Currently, Day 2 has one large exercise: "Create 3-node cluster with libvirt". This is too complex for students learning Terraform for the first time. We need progressive exercises that build skills incrementally.

### Problem
- Single complex exercise is overwhelming for beginners
- No intermediate practice between theory and final project
- Difficult to identify where students struggle
- Hard to provide targeted help

### Proposed Solution
Create 5 progressive exercises in `exercises/terraform/`:

#### Exercise 1: Hello Terraform (30 min)
- Create a single VM with hardcoded values
- Learn: Basic HCL syntax, provider configuration
- Commands: terraform init, plan, apply, destroy
- Success criteria: VM created and accessible via SSH

#### Exercise 2: Variables and Outputs (45 min)
- Refactor Exercise 1 to use variables
- Add outputs for VM IP address
- Learn: variables.tf, terraform.tfvars, outputs.tf
- Success criteria: Same result, configurable parameters

#### Exercise 3: Multiple VMs with Count (60 min)
- Create 2 identical VMs using count
- Learn: count parameter, count.index, list variables
- Success criteria: 2 VMs created with similar config

#### Exercise 4: Cloud-Init Integration (60 min)
- Add cloud-init configuration to VMs
- Create users, set SSH keys, install packages
- Learn: templatefile(), cloud-init, user-data
- Success criteria: VMs accessible with custom user, packages installed

#### Exercise 5: 3-Node K8s Cluster Infrastructure (90 min)
- Create 1 master + 2 worker VMs with different specs
- Generate Ansible inventory as output
- Use cloud-init for basic setup
- Learn: for_each, different resource configurations, outputs
- Success criteria: 3 VMs ready for K8s installation (Day 3), inventory generated

### Tasks
- [ ] Create `exercises/terraform/` directory structure
- [ ] Write Exercise 1 with starter code and solution
- [ ] Write Exercise 2 with starter code and solution
- [ ] Write Exercise 3 with starter code and solution
- [ ] Write Exercise 4 with starter code and solution
- [ ] Write Exercise 5 with starter code and solution
- [ ] Create main README.md with exercise overview
- [ ] Add troubleshooting section for common issues
- [ ] Test all exercises on clean environment
- [ ] Update slides to reference exercises at appropriate points

### File Structure
```
exercises/terraform/
├── README.md                    # Overview and instructions
├── exercise-1-hello-terraform/
│   ├── README.md               # Exercise instructions
│   ├── starter/                # Starter code
│   └── solution/               # Solution code
├── exercise-2-variables/
│   ├── README.md
│   ├── starter/
│   └── solution/
├── exercise-3-multiple-vms/
│   ├── README.md
│   ├── starter/
│   └── solution/
├── exercise-4-cloud-init/
│   ├── README.md
│   ├── starter/
│   └── solution/
├── exercise-5-k8s-cluster/
│   ├── README.md
│   ├── starter/
│   └── solution/
└── troubleshooting.md          # Common issues and solutions
```

### Acceptance Criteria
- [ ] 5 exercises created with clear progression
- [ ] Each exercise has starter and solution code
- [ ] Each exercise has detailed README with:
  - Learning objectives
  - Prerequisites
  - Step-by-step instructions
  - Expected outcomes
  - Success criteria
- [ ] Troubleshooting guide covers common errors
- [ ] All exercises tested and working
- [ ] Slides updated to reference exercises

---

## Issue 5: Add prerequisites and setup slide to prod-terraform.md

**Labels**: `enhancement`, `slides`, `documentation`  
**Priority**: High  
**Effort**: 1 hour  
**Assignee**: (to be assigned)

### Description
The prod-terraform.md slides jump directly into content without covering prerequisites or setup requirements. Students need to know what to prepare before the training day.

### Problem
- No information about required software
- No system requirements specified
- No verification steps before starting
- Students may waste time during training day with setup issues

### Proposed Solution
Add a prerequisites slide at the beginning of prod-terraform.md (after the title slide, before "Topics").

### Content to Include

#### Slide: Prerequisites & Setup

**Required Software:**
- Terraform >= 1.5.0
- QEMU/KVM (for libvirt provider)
- libvirt daemon
- SSH client
- Git
- Text editor (VS Code, vim, etc.)

**For Linux (Ubuntu/Debian):**
```bash
sudo apt-get update
sudo apt-get install -y qemu-kvm libvirt-daemon-system \
    libvirt-clients bridge-utils terraform
```

**For macOS:**
```bash
brew install qemu libvirt terraform
```

**System Requirements:**
- 8 GB RAM minimum (16 GB recommended)
- 20 GB free disk space
- CPU with virtualization support (Intel VT-x or AMD-V)

**Verification:**
```bash
terraform version          # Should show >= 1.5.0
virsh version             # Should show libvirt version
ssh -V                    # Should show OpenSSH version
```

**Access Requirements:**
- GitHub account (for accessing exercise repos)
- SSH key generated (for VM access)

### Tasks
- [ ] Create prerequisites slide in prod-terraform.md
- [ ] Add after title slide, before topics
- [ ] Include software versions
- [ ] Add installation commands for common OS
- [ ] Add verification commands
- [ ] Link to detailed setup guide if needed
- [ ] Test commands on clean systems

### Acceptance Criteria
- [ ] Prerequisites slide added to prod-terraform.md
- [ ] All required software listed with versions
- [ ] Installation commands provided and tested
- [ ] Verification steps clear and working
- [ ] Positioned appropriately in slide deck

---

## Issue 6: Create detailed Terraform exercise guide

**Labels**: `documentation`, `exercises`, `enhancement`  
**Priority**: Medium  
**Effort**: 6-8 hours  
**Assignee**: (to be assigned)

### Description
Create comprehensive exercise guide in `exercises/terraform/README.md` with step-by-step instructions, expected outcomes, and troubleshooting tips.

### Content to Include

1. **Overview**
   - Purpose of exercises
   - Learning path
   - Time estimates
   - Prerequisites

2. **Exercise Instructions** (for each)
   - Learning objectives
   - Background/context
   - Step-by-step tasks
   - Expected outcomes
   - Success criteria
   - Common pitfalls

3. **Code Examples**
   - Starter code templates
   - Solution code (in separate directory)
   - Annotated examples

4. **Troubleshooting Section**
   - Common error messages
   - How to debug
   - Where to get help

5. **Reference Materials**
   - Terraform CLI cheat sheet
   - HCL syntax reference
   - Provider documentation links

### Tasks
- [ ] Create exercises/terraform/README.md
- [ ] Write overview and learning path
- [ ] Document each exercise with detailed instructions
- [ ] Create starter code for each exercise
- [ ] Create solution code for each exercise
- [ ] Write troubleshooting section
- [ ] Add reference materials and links
- [ ] Test instructions with fresh user
- [ ] Get feedback and iterate

### Acceptance Criteria
- [ ] Complete README.md exists
- [ ] Each exercise has clear instructions
- [ ] Starter and solution code provided
- [ ] Troubleshooting covers common issues
- [ ] Tested with actual students/users
- [ ] Documentation is clear and accurate

---

## Issue 7: Enhance slides with practical code examples

**Labels**: `enhancement`, `slides`, `content creation`  
**Priority**: Medium  
**Effort**: 3-4 hours  
**Assignee**: (to be assigned)

### Description
Current prod-terraform.md slides are heavy on concepts but light on code examples. Add practical, executable code snippets to illustrate each major concept.

### Areas Needing Code Examples

1. **Resource Definition**
   ```hcl
   resource "libvirt_domain" "web" {
     name   = "web-server"
     memory = "1024"
     vcpu   = 1
     # ... more config
   }
   ```

2. **Variables**
   ```hcl
   variable "vm_count" {
     type        = number
     description = "Number of VMs to create"
     default     = 2
   }
   ```

3. **Outputs**
   ```hcl
   output "vm_ips" {
     value = libvirt_domain.web[*].network_interface[0].addresses[0]
   }
   ```

4. **State Management**
   ```bash
   terraform state list
   terraform state show libvirt_domain.web
   ```

5. **Provider Configuration**
   ```hcl
   provider "libvirt" {
     uri = "qemu:///system"
   }
   ```

6. **Module Usage**
   ```hcl
   module "network" {
     source = "./modules/network"
     cidr   = "10.0.0.0/24"
   }
   ```

### Tasks
- [ ] Add resource definition example to "Topics" section
- [ ] Add variables example with different types
- [ ] Add outputs example showing useful data
- [ ] Add state command examples
- [ ] Add provider configuration examples (libvirt & vSphere)
- [ ] Add module structure example
- [ ] Add cloud-init template example
- [ ] Ensure examples are consistent with exercises
- [ ] Test all code examples

### Acceptance Criteria
- [ ] Each major concept has code example
- [ ] Examples are practical and relevant
- [ ] Code is tested and working
- [ ] Examples match exercise progression
- [ ] Syntax highlighting works in slides

---

## Issue 8: Add documentation resources slide

**Labels**: `enhancement`, `slides`, `documentation`  
**Priority**: Medium  
**Effort**: 30 minutes  
**Assignee**: (to be assigned)

### Description
Students need to know where to find help when they encounter issues or want to learn more. Add a "Documentation & Resources" slide to prod-terraform.md.

### Proposed Content

#### Slide: Where to Find Help

**Official Documentation:**
- 📘 [Terraform Docs](https://developer.hashicorp.com/terraform) - Core concepts, CLI reference
- 📙 [HCL Syntax](https://developer.hashicorp.com/terraform/language) - Language reference
- 📗 [Provider Registry](https://registry.terraform.io/) - All providers and modules

**Libvirt Provider:**
- [Libvirt Provider Docs](https://registry.terraform.io/providers/dmacvicar/libvirt/)
- Resource reference, examples, changelog

**vSphere Provider (Optional):**
- [vSphere Provider Docs](https://registry.terraform.io/providers/hashicorp/vsphere/)

**Learning Resources:**
- [Terraform Tutorials](https://developer.hashicorp.com/terraform/tutorials) - Official tutorials
- [Terraform Best Practices](https://www.terraform-best-practices.com/)

**Community:**
- [Terraform Discuss](https://discuss.hashicorp.com/c/terraform-core) - Forums
- [Terraform GitHub](https://github.com/hashicorp/terraform) - Issues, discussions

**Quick Reference:**
- Keep `terraform --help` handy
- Use `terraform <command> --help` for specific commands
- Try `terraform console` for testing expressions

### Tasks
- [ ] Create "Documentation & Resources" slide
- [ ] Add official documentation links
- [ ] Add provider-specific documentation
- [ ] Add learning resources
- [ ] Add community links
- [ ] Add quick reference tips
- [ ] Position slide appropriately (suggest before "Good practices")
- [ ] Verify all links are current and working

### Acceptance Criteria
- [ ] Slide added to prod-terraform.md
- [ ] All critical resources covered
- [ ] Links tested and working
- [ ] Organized by category (official, learning, community)
- [ ] Positioned logically in deck

---

## Issue 9: Add debugging and troubleshooting section to slides

**Labels**: `enhancement`, `slides`, `content creation`  
**Priority**: Medium  
**Effort**: 2 hours  
**Assignee**: (to be assigned)

### Description
Students will encounter errors during exercises. Add a dedicated section in prod-terraform.md covering common errors, debugging techniques, and troubleshooting approaches.

### Proposed Content

#### Slide: Debugging & Troubleshooting

**Common Error Patterns:**

1. **Provider initialization failed**
   ```
   Error: Failed to instantiate provider
   ```
   → Check provider configuration, run `terraform init`

2. **Resource already exists**
   ```
   Error: resource already exists
   ```
   → Check state file, use `terraform import` if needed

3. **Variable not defined**
   ```
   Error: Reference to undeclared input variable
   ```
   → Define in variables.tf or pass via -var flag

4. **State lock timeout**
   ```
   Error: acquiring state lock timeout
   ```
   → Check for orphaned locks, use `terraform force-unlock`

**Debugging Tools:**

```bash
# Detailed logs
export TF_LOG=DEBUG
terraform apply

# Validate configuration
terraform validate

# Format and check syntax
terraform fmt -check

# Test expressions interactively
terraform console

# Inspect state
terraform state list
terraform state show <resource>

# Plan with detailed output
terraform plan -out=plan.tfplan
terraform show plan.tfplan
```

**Troubleshooting Process:**

1. Read error message carefully
2. Check syntax with `terraform validate`
3. Review state with `terraform state list`
4. Enable debug logging if needed
5. Check provider documentation
6. Search error message online
7. Ask instructor/community

### Tasks
- [ ] Create "Debugging & Troubleshooting" slide
- [ ] Document 5-7 common error patterns
- [ ] Add debugging commands and flags
- [ ] Add troubleshooting process workflow
- [ ] Include tips for reading error messages
- [ ] Position slide appropriately (suggest before final hands-on)
- [ ] Test examples to ensure accuracy

### Acceptance Criteria
- [ ] Slide covers most common errors students will encounter
- [ ] Debugging commands are accurate and tested
- [ ] Troubleshooting process is clear and actionable
- [ ] Examples match actual error messages
- [ ] Positioned to be helpful during exercises

---

## Issue 10: Reorganize slide flow for better pedagogy

**Labels**: `enhancement`, `slides`, `restructuring`  
**Priority**: Medium  
**Effort**: 2-3 hours  
**Assignee**: (to be assigned)

### Description
Reorganize prod-terraform.md slides to follow a more pedagogical flow that alternates between theory and practice, building knowledge incrementally.

### Current Flow
1. Day 2 — Terraform basics (section title)
2. Topics (dense list of concepts)
3. Hands-on (single complex exercise)
4. Optional vSphere
5. Good practices

### Problems with Current Flow
- All theory upfront, practice at end (not interactive)
- Topics are listed but not explained
- Jump from zero to complex exercise
- No intermediate checkpoints
- Optional content placement breaks flow

### Proposed New Flow

```
1. Introduction (1 slide)
   - Day objectives
   - What we'll build today
   - Prerequisites check

2. What is Infrastructure as Code? (2-3 slides)
   - Manual vs automated infrastructure
   - Benefits: version control, reproducibility, collaboration
   - Terraform's role in IaC

3. Terraform Fundamentals (4-5 slides)
   - Architecture: providers, resources, state
   - HCL syntax basics
   - Workflow: init → plan → apply → destroy
   - **→ Exercise 1: Hello Terraform**

4. Core Concepts: Resources & Variables (4-5 slides)
   - Resource blocks with examples
   - Variables: types, defaults, validation
   - Outputs: extracting information
   - **→ Exercise 2: Variables and Outputs**

--- BREAK ---

5. State Management (3-4 slides)
   - What is state and why it matters
   - Local vs remote state
   - State commands for inspection
   - Locking and collaboration

6. Providers Deep-Dive (3-4 slides)
   - Provider concept and configuration
   - Libvirt provider for local dev
   - (Optional note: vSphere for production)
   - **→ Exercise 3: Multiple VMs**

7. Advanced Terraform (4-5 slides)
   - Count and for_each
   - Modules: structure and usage
   - Templating with templatefile()
   - Cloud-init integration
   - **→ Exercise 4: Cloud-init**

8. Documentation & Resources (1 slide)
   - Where to find help
   - Official docs, tutorials, community

9. Debugging & Troubleshooting (2 slides)
   - Common errors and solutions
   - Debugging tools and techniques

10. Final Hands-On Lab (1 slide)
    - **→ Exercise 5: 3-Node K8s Cluster Infrastructure**

11. Production Best Practices (2-3 slides)
    - Remote state and locking
    - Workspace management
    - Module versioning
    - CI/CD integration preview

12. Wrap-Up (1 slide)
    - What we learned
    - Next steps (Day 3: Ansible)
    - Q&A
```

### Tasks
- [ ] Create new slide structure following proposed flow
- [ ] Move existing content to appropriate sections
- [ ] Expand topic list items into actual slides with explanations
- [ ] Insert exercise callouts at appropriate points
- [ ] Position break logically (suggest after slide ~12-15)
- [ ] Move optional content (vSphere) to appendix or footnote
- [ ] Add introduction and wrap-up slides
- [ ] Ensure smooth transitions between sections
- [ ] Update any cross-references
- [ ] Review total slide count (target: 25-35 slides for 1 day)

### Acceptance Criteria
- [ ] Slides follow theory → practice → theory → practice pattern
- [ ] Each major concept followed by relevant exercise
- [ ] Logical progression from simple to complex
- [ ] Clear section breaks and transitions
- [ ] Introduction and conclusion slides present
- [ ] Total deck fits 1-day training timeline
- [ ] No jarring jumps in complexity

---

## Summary

**Total Issues: 10**

**Priority Breakdown:**
- High Priority: 5 issues (1, 2, 3, 4, 5)
- Medium Priority: 5 issues (6, 7, 8, 9, 10)
- Low Priority: 0 issues

**Effort Estimate:**
- Quick wins (< 1 hour): 3 issues
- Medium effort (1-4 hours): 4 issues
- Large effort (6-8 hours): 3 issues
- **Total: ~30-40 hours of work**

**Recommended Implementation Order:**
1. Issue 1 (Fix terminology) - Quick win
2. Issue 2 (Clarify provider) - Needed for all other work
3. Issue 3 (Remove K8s) - Scope definition
4. Issue 5 (Prerequisites) - Quick win, helps students
5. Issue 4 (Progressive exercises) - Core learning experience
6. Issue 7 (Code examples) - Enhances learning
7. Issue 8 (Documentation) - Quick win
8. Issue 9 (Troubleshooting) - Student support
9. Issue 6 (Exercise guide) - Comprehensive documentation
10. Issue 10 (Reorganize flow) - Final polish

These issues can be validated and created in the GitHub repository for tracking and collaborative implementation.
