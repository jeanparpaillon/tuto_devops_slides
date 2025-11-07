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
        - Inventory, playbooks, roles
        - Idempotency and modules
        - Exercise: simple playbook (ensure packages, write a file)
    - Terraform to Ansible integration
        - Using Terraform outputs as Ansible inventory
        - Dynamic inventory management
        - Exercise: generate and use inventory from Terraform
    - Kubernetes setup with Ansible
        - Introduction to Kubespray collection
        - Ansible Galaxy and requirements.yml
        - Exercise: deploy Kubernetes cluster on terraform infrastructure
        - Verify cluster: kubectl get nodes, CNI installation (Calico/Flannel)

Day 4
    - Deploy simple application
        - Understanding Kubernetes deployments and services
        - Service types: ClusterIP, NodePort, LoadBalancer
        - Exercise: deploy simple web app (nginx or nodejs)
        - Verify pods and internal access
    - Deploy application with external access
        - Ingress controllers (nginx-ingress or traefik)
        - Ingress resources and path/host-based routing
        - Exercise: configure ingress for external access
    - Load balancing and scaling
        - Service load balancing in Kubernetes
        - Manual scaling: kubectl scale
        - Horizontal Pod Autoscaler (HPA)
        - Exercise: scale deployments and test load distribution
    - DNS and service discovery
        - Kubernetes internal DNS (CoreDNS)
        - Service discovery mechanisms
        - Exercise: test DNS resolution and service discovery
        
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
