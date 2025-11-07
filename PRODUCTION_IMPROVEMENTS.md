# Production Program Improvements

This document tracks suggested improvements for the production training program based on the 2-day infrastructure tutorial format.

## Overview

The production program has been restructured to support both:
1. **Full 5-day program**: Comprehensive DevOps training for operators
2. **2-day infrastructure tutorial**: Focused hands-on tutorial for terraform, ansible, and k8s

## Issues to Create

### 1. Missing Slide File: prod-k8s-apps.md

**Issue**: Create missing slide file for Kubernetes application deployment

**Description**: 
The file `slides/pages/prod-k8s-apps.md` is referenced in `slides/formation-prod.md` (line 40) but does not exist. This file should contain content for deploying applications on Kubernetes.

**Suggested Content**:
- Simple application deployment (nginx/nodejs)
- Service creation and types (ClusterIP, NodePort, LoadBalancer)
- Deployment manifests and best practices
- Hands-on exercises for deploying web applications
- Verification and troubleshooting steps

**Priority**: High
**Labels**: slides, kubernetes, missing-file

---

### 2. Enhance Day 3 Slides: Ansible and K8s Integration

**Issue**: Improve prod-ansible-basics.md and prod-ansible-intra.md for 2-day tutorial

**Description**:
Update the Ansible slides to better support the 2-day tutorial format with focus on:
- Terraform-to-Ansible inventory integration
- Using Kubespray for Kubernetes deployment
- Clear progression from simple playbooks to cluster deployment
- More detailed exercises with expected outcomes

**Suggested Improvements**:
1. Add section on Terraform inventory output consumption
2. Include step-by-step Kubespray usage
3. Add troubleshooting guide for common issues
4. Include verification commands and expected outputs
5. Add timing estimates for exercises

**Files to Update**:
- `slides/pages/prod-ansible-basics.md`
- `slides/pages/prod-ansible-intra.md`

**Priority**: Medium
**Labels**: slides, ansible, enhancement

---

### 3. Enhance Day 4 Slides: Application Deployment Focus

**Issue**: Improve application deployment slides for external access patterns

**Description**:
Update `prod-ansible-public.md` and create/enhance `prod-k8s-apps.md` to better address:
- Clear distinction between internal and external application deployment
- Ingress controller setup and configuration
- TLS/SSL certificate management
- DNS configuration for external access
- Load balancing patterns

**Suggested Improvements**:
1. Add ingress controller installation steps (nginx-ingress or traefik)
2. Include cert-manager setup for TLS
3. Add DNS configuration examples
4. Include real-world application examples
5. Add monitoring/observability basics for deployed apps

**Files to Update**:
- `slides/pages/prod-ansible-public.md`
- `slides/pages/prod-k8s-apps.md` (create)

**Priority**: High
**Labels**: slides, kubernetes, ingress, enhancement

---

### 4. Add Load Balancing and Scaling Slides

**Issue**: Create dedicated slides for load balancing, scaling, and DNS

**Description**:
The 2-day tutorial emphasizes "play with load-balancing, scaling, dns" but there are no dedicated slides for these topics. Create new slide content or enhance existing slides.

**Suggested Content**:
1. **Load Balancing Section**:
   - Kubernetes service load balancing
   - Testing load distribution
   - MetalLB for bare-metal load balancing (if applicable)
   - Exercises with multiple replicas

2. **Scaling Section**:
   - Manual scaling with kubectl
   - Horizontal Pod Autoscaler (HPA)
   - Metrics server setup
   - Hands-on scaling exercises

3. **DNS Section**:
   - Kubernetes internal DNS (CoreDNS)
   - Service discovery mechanisms
   - External DNS configuration
   - Testing and troubleshooting

**Files to Create/Update**:
- Create `slides/pages/prod-load-balancing.md` or integrate into `prod-k8s-apps.md`
- Update `slides/pages/prod-avances.md` to reference these topics

**Priority**: Medium
**Labels**: slides, kubernetes, new-content

---

### 5. Create Exercise Files for 2-Day Tutorial

**Issue**: Create hands-on exercise files for the 2-day infrastructure tutorial

**Description**:
Create a dedicated exercises directory with step-by-step guides, starter code, and solutions for the 2-day tutorial.

**Suggested Structure**:
```
exercises/
├── infra-tutorial/
│   ├── day1/
│   │   ├── 01-terraform-setup/
│   │   │   ├── README.md
│   │   │   ├── main.tf (starter)
│   │   │   └── solution/
│   │   ├── 02-ansible-basics/
│   │   │   ├── README.md
│   │   │   ├── playbook.yml (starter)
│   │   │   └── solution/
│   │   └── 03-k8s-setup/
│   │       ├── README.md
│   │       ├── requirements.yml
│   │       └── solution/
│   └── day2/
│       ├── 01-simple-app/
│       │   ├── README.md
│       │   ├── app/
│       │   └── manifests/
│       ├── 02-external-app/
│       │   ├── README.md
│       │   └── manifests/
│       └── 03-scaling-lb/
│           ├── README.md
│           └── manifests/
```

**Priority**: High
**Labels**: exercises, hands-on, terraform, ansible, kubernetes

---

### 6. Update DRAFT File with 2-Day Tutorial Content

**Issue**: Align DRAFT file with new 2-day tutorial structure

**Description**:
The DRAFT file contains early planning notes. Update it to reflect the new 2-day tutorial structure and remove outdated content.

**Files to Update**:
- `DRAFT`

**Priority**: Low
**Labels**: documentation, cleanup

---

### 7. Update Slide Ordering in formation-prod.md

**Issue**: Reorganize slide ordering to support both 5-day and 2-day formats

**Description**:
The current `formation-prod.md` is organized for the 5-day format. Consider:
1. Creating a separate `formation-prod-2day.md` for the condensed tutorial
2. Or adding conditional slide inclusion based on format
3. Ensuring the missing `prod-k8s-apps.md` is created and properly integrated

**Files to Update**:
- `slides/formation-prod.md`
- Potentially create `slides/formation-prod-2day.md`

**Priority**: Medium
**Labels**: slides, structure, enhancement

---

## Recommendations for Day 3 and Day 4 Balance

### Current State Analysis

**Day 3 (Ansible basics + intra app)**:
- ✅ Good: Clear introduction to Ansible concepts
- ✅ Good: Galaxy and Kubespray coverage
- ⚠️ Gap: No clear connection between Ansible basics and K8s deployment
- ⚠️ Gap: "Intranet application" concept is somewhat abstract

**Day 4 (Kubernetes + external app)**:
- ✅ Good: Covers Kubernetes architecture
- ⚠️ Gap: Missing integration between Terraform → Ansible → K8s
- ⚠️ Gap: External app deployment lacks ingress controller details
- ⚠️ Gap: Load balancing and DNS are mentioned but not detailed

### Suggested Balance for 2-Day Format

**Day 1 Focus**: End-to-end infrastructure (Terraform → Ansible → K8s)
- Weight: 60% infrastructure, 40% concepts
- Key deliverable: Working K8s cluster from scratch

**Day 2 Focus**: Application deployment patterns
- Weight: 40% simple apps, 60% external access patterns
- Key deliverable: Web app accessible from outside cluster

### Progression Strategy

1. **Terraform** (Day 1 Morning): 
   - Keep it simple - focus on creating VMs
   - Output must feed into Ansible inventory
   - Time: ~3 hours

2. **Ansible** (Day 1 Afternoon):
   - Quick basics (1 hour)
   - Jump to Kubespray (2 hours)
   - Focus on getting K8s running, not Ansible mastery

3. **Simple Apps** (Day 2 Morning):
   - Very basic deployment (nginx)
   - Service creation
   - Internal access only
   - Time: ~2 hours

4. **External Apps** (Day 2 Afternoon):
   - Ingress controller
   - External service
   - Scaling and load balancing
   - DNS basics
   - Time: ~3 hours

## Implementation Notes

- All slide content should include timing estimates
- Each exercise should have clear objectives and success criteria
- Include troubleshooting sections for common issues
- Add visual diagrams for architecture at each stage
- Ensure exercises build on each other progressively
