# Formation DevOps

* Novembre 2025
* Alger

Available online at:
- Dev training : [HTML](https://jeanparpaillon.github.io/tuto_devops_slides/formation-dev/), [PDF](https://jeanparpaillon.github.io/tuto_devops_slides/formation-dev.pdf)
- Prod training : [HTML](https://jeanparpaillon.github.io/tuto_devops_slides/formation-prod/), [PDF](https://jeanparpaillon.github.io/tuto_devops_slides/formation-prod.pdf)

## GitHub Copilot Agent Architecture

This project uses an AI-powered multi-agent system to manage slide development. See [.github/agents/README.md](.github/agents/README.md) for details.

**Quick Start**: Simply create an issue describing what you need, and our specialized agents will handle it:
- **Designer**: Diagrams, layouts, visual design
- **Coder**: Code examples and implementations
- **Project Manager**: Quality assurance and consistency
- **Trainer**: Slide organization and pedagogical balance

# DevOps for Developers

Duration : 5 Days

Day 1
    - DevOps basics
        - Traditional approach vs DevOps approach (dev and prod)
        - DevOps cycles : infinite loop diagram
        - Software versioning
    - Example of an nodejs application
    - git
        - basics
        - working with branch (merge, rebase)
        - working with tag
        - other commands : git log, git help, ...
    - GitHub
        - repo
        - issue
        - actions

Day 2
    - CI/CD basics
    - Example of nodejs app conteneurization
    - GitHub Actions

Day 3
    - Artifact management
    - GitHub repo
    - Artifactory
    - Repositories : cache, proxy, virtual, etc
    - Rules : blacklist, whitelist
    - Integration
        - with GitHub
        - SonarQube / XRAY (see day 4)

Day 4
    - SonarQube
    - XRAY
  
Day 5
    - Advanced
        - GitHub actions (triggers, on issue, etc)
        - Project management with GitHub

# DevOps for operators

## Full Program (5 Days)

Day 1
    - DevOps basics
        - Traditional approach vs DevOps approach (dev and prod)
        - DevOps cycles : infinite loop diagram
    - Example of an nodejs application
    - git
        - basics
        - working with branch (merge, rebase)
        - working with tag
        - other commands : git log, git help, ...
        - Exercise
    - CI/CD basics
    - Architecture
        - Vmware or qemu for local testing
        - Terraform
        - Ansible
        - k8s
        - Example of a web application (wordpress)

Day 2
    - Terraform basics
        - Syntax
        - init, apply, etc
        - Exercise
    - Terraform
        - Exercises: libvirt based infrastructure, 1 master, 2 nodes

Day 3
    - Ansible basics
        - playbooks
        - role
    - Ansible simple playbook
        - Exercise: ensure packages, write a file, ...
    - Ansible galaxy
        - Basics
        - Exercise: use kubespray collection
    - Testing Ansible

Day 4
    - Kubernetes
        - arch
        - pods
        - containers
        - SDA, flannel, calico
        - storage, ...
    - Deploy simple application
        - Exercise
    - Deploy complex application
        - Web, DB, ...
        - Exercise
        
Day 5
One or several of following topics
    - Monitoring / Observability
        - Exercise: prometheus / grafana / k8s metrics / logging
    - High Availability
        - Exercise with k8s
    - Security
        - RBAC Kubernetes
        - ACL
        - Vulnerability scan

## Infrastructure Tutorial (2 Days)

**Objective**: Deploy a simple web application and an application with external access on tutorial infrastructure

**Technologies**: Terraform (libvirt and vmware), Ansible, Kubernetes

### Day 1 - Infrastructure Setup and Configuration

**Morning: Terraform Basics and Infrastructure Setup**
- Understand Terraform basics
  - Resources, providers, variables, outputs
  - State management (local and remote)
  - Lifecycle: init, plan, apply, destroy
  - Exercise: Setup local environment (libvirt or VMware)
- Setup Terraform infrastructure
  - Create infrastructure code for 1 master + 2 worker nodes
  - Network configuration and cloud-init setup
  - Exercise: Deploy VMs with Terraform
  - Generate Ansible inventory from Terraform outputs

**Afternoon: Ansible Basics and Kubernetes Setup**
- Understand Ansible basics
  - Inventory structure (hosts, groups, variables)
  - Playbooks and roles
  - Modules and idempotency
  - Exercise: Simple playbook (package installation, file management)
- Setup Kubernetes cluster with Ansible
  - Introduction to Kubespray or similar collection
  - Ansible Galaxy and requirements.yml
  - Exercise: Deploy Kubernetes on infrastructure
  - Verify cluster: kubectl get nodes, kubectl get pods -A
  - Install CNI (Calico or Flannel)

### Day 2 - Application Deployment and Advanced Features

**Morning: Deploy Applications**
- Deploy simple web application
  - Understanding Kubernetes manifests (deployments, services)
  - Create deployment for simple web app (nginx or nodejs)
  - Exercise: Deploy and access application internally
  - Verify pods and services
- Deploy application with external access
  - Ingress controllers and load balancers
  - Service types: ClusterIP, NodePort, LoadBalancer
  - Exercise: Configure ingress for external access
  - DNS configuration basics

**Afternoon: Scaling, Load Balancing, and DNS**
- Play with load balancing
  - Service load balancing in Kubernetes
  - Multiple replicas and distribution
  - Exercise: Test load balancing with multiple pods
- Scaling applications
  - Manual scaling: kubectl scale
  - Introduction to Horizontal Pod Autoscaler (HPA)
  - Exercise: Scale deployments and observe behavior
- DNS and service discovery
  - Kubernetes internal DNS
  - External DNS configuration
  - Exercise: Test service discovery and DNS resolution
- Wrap-up and next steps
  - Review of deployed infrastructure
  - Monitoring basics (optional if time permits)
  - Best practices and production considerations
