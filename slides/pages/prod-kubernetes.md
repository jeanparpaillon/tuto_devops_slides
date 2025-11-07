---
layout: section
---

# Kubernetes Overview

## Understanding container orchestration

### What is Kubernetes?

- Container orchestration platform
- Automates deployment, scaling, and management
- Manages containerized applications across clusters
- Self-healing and declarative configuration

---

# Kubernetes Architecture

## Key Components

### Control Plane
- API Server: central management
- Scheduler: pod placement
- Controller Manager: maintains desired state
- etcd: distributed key-value store

### Worker Nodes
- kubelet: node agent
- Container runtime (containerd, CRI-O)
- kube-proxy: network rules

---

# Why Kubernetes for Production?

## Benefits

- **Scalability**: Horizontal scaling of applications
- **High Availability**: Self-healing and redundancy
- **Portability**: Run anywhere (cloud, on-prem, hybrid)
- **Resource Efficiency**: Optimal resource utilization
- **Rolling Updates**: Zero-downtime deployments

---

# Kubernetes Installation Approaches

## Multiple methods available

- **kubeadm**: Manual cluster setup (educational)
- **kubespray**: Ansible-based automation (production-ready)
- **Managed services**: EKS, AKS, GKE (cloud)
- **K3s/MicroK8s**: Lightweight for edge/dev

**Note**: We'll use kubespray with Ansible in Day 3 for reliable, automated cluster deployment

