---
layout: section
---

# Day 2 — Terraform basics

## Goal: Build infra as code and prepare K8s nodes

### Topics

- Syntax: resources, data sources, variables, outputs
- Lifecycle: init, plan, apply, destroy
- State: local vs remote, locking, drift
- Providers: vSphere, libvirt (qemu), cloud
- Modules and composition
- Templating inventories and cloud-init

---

# Hands-on — libvirt-based lab

- Set up local lab with qemu/libvirt
- Create 3 VMs: 1 master, 2 worker nodes
- Cloud-init user-data for users/SSH
- Output inventory for Ansible (masters/workers)

```sh
terraform init
terraform plan -var 'masters=1' -var 'workers=2'
terraform apply
```

- Validate connectivity: SSH, IPs, inventory

---

# Optional — vSphere provider

- Map resources: datacenter, cluster, datastore, network
- Templates and customization specs
- Tagging and naming conventions

---

# Good practices

- Keep state remote (S3/Consul/TF Cloud) with locking
- Separate workspaces (dev/stage/prod)
- Module version pinning
- CI validate/plan/apply with approvals
