---
layout: section
---

# Production Architecture

## Tutorial Infrastructure Overview

### Objectives

- Understand the production environment setup
- Learn about the infrastructure components
- Prepare for hands-on exercises

### Content

- Infrastructure overview: VMware, virtual machines, networking
- Tool stack: Terraform, Ansible, Kubernetes
- Tutorial architecture and environment setup
- Access and credentials

---

# Infrastructure Components

## Virtualization Layer

- **VMware vSphere**: Virtual infrastructure management
  - alternatives: libvirt/qemu, Xen, Amazon AWS
- Virtual machines for Kubernetes nodes
- Network configuration and storage

## Automation Tools

- **Terraform**: Infrastructure provisioning and management
- **Ansible**: Configuration management and deployment
- **Kubernetes**: Container orchestration platform

---
layout: image
image: ./infra.png
backgroundSize: 80%
---

# Tutorial Environment

---

## Lab Infrastructure Stack:

- **Physical Layer**: Bare metal servers providing compute resources
- **Virtualization**: libvirt or VMware vSphere for VM management
- **IaC**: Terraform provisions and manages infrastructure
- **Configuration**: Ansible configures VMs and deploys applications
- **Orchestration**: Kubernetes deployed via Ansible (Kubespray)
- **Applications**: Containerized workloads running in pods
