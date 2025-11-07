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

# Prerequisites

**Required Software:**
- Terraform ≥ 1.5.0
- QEMU/KVM + libvirt
- SSH client
- Git & text editor

**System Requirements:**
- 8 GB RAM minimum (16 GB recommended)
- 20 GB free disk space
- CPU virtualization support

**Verify Setup:**
```sh
terraform version    # ≥ 1.5.0
virsh version       # libvirt daemon
ssh -V              # SSH client
```

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

# Documentation & Resources

**Official Documentation:**
- 📘 [Terraform Docs](https://developer.hashicorp.com/terraform) - Core concepts & CLI
- 📗 [Provider Registry](https://registry.terraform.io/) - All providers & modules
- 📙 [HCL Reference](https://developer.hashicorp.com/terraform/language) - Language syntax
- 🔧 [Libvirt Provider](https://registry.terraform.io/providers/dmacvicar/libvirt/) - Provider docs

**Learning:**
- [HashiCorp Tutorials](https://developer.hashicorp.com/terraform/tutorials)
- [Terraform Best Practices](https://www.terraform-best-practices.com/)

**Community:**
- [Terraform Discuss](https://discuss.hashicorp.com/c/terraform-core)
- [GitHub Issues](https://github.com/hashicorp/terraform)

**Quick Tips:**
- Use `terraform --help` and `terraform <command> --help`
- Try `terraform console` for testing expressions
- Enable debug logs: `export TF_LOG=DEBUG`

---

# Good practices

- Keep state remote (S3/Consul/TF Cloud) with locking
- Separate workspaces (dev/stage/prod)
- Module version pinning
- CI validate/plan/apply with approvals
