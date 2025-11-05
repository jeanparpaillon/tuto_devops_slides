---
layout: section
---

# Day 2 — Kubernetes cluster on VMware

## Goal: Automate the deployment of a full K8s cluster with Terraform

### Content

- Terraform refresher: vSphere provider, variables, remote state
- Architecture design: masters, workers, networking, storage
- Hands-on workshop:
  - `.tf` files for Kubernetes VMs
  - Node provisioning via Terraform
  - Cluster initialization (kubeadm)
- Validation and tests: `kubectl get nodes`, CNI (Calico/Flannel)

---
layout: section
---

# Terraform

## Initialize repo

* Run

```sh
terraform init
```

* Output

```sh
find .terraform
```

Stores plugins, system state, etc.

## Plan

* Run

```sh
terraform plan
```

* Output

List of resources to be created

