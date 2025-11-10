
---
layout: section
---

# Terraform: Infrastructure as Code (IaC) Introduction

---

# What is Infrastructure as Code (IaC)?

- Define and manage infrastructure using code
- Enables automation, repeatability, and version control
- Replaces manual configuration with declarative files
- Key benefits:
  - Consistency
  - Auditability
  - Collaboration

---

# Why Terraform?

- Open-source tool for IaC
- Supports many providers (cloud, virtualization, etc.)
- Declarative language (HCL)
- Manages dependencies and state

---

# Anatomy of a Terraform Project

- Typical files:
  - `main.tf`: resources and configuration
  - `variables.tf`: input variables
  - `outputs.tf`: output values
  - `terraform.tfstate`: state file
- Folder structure:
  - Modules for reusable code
  - Providers for target platforms

---

# Terraform Base Concepts

- **Providers**: Connect to infrastructure platforms
- **Resources**: Define infrastructure objects (VMs, networks, etc.)
- **Variables**: Parameterize configurations
- **State**: Tracks real infrastructure
- **Outputs**: Export values for other tools

---

# Terraform Workflow

1. `terraform init` — Initialize project and download providers
2. `terraform plan` — Preview changes
3. `terraform apply` — Create/update infrastructure
4. `terraform destroy` — Remove resources

---

# Good Practices

- Store state remotely (S3, Consul, Terraform Cloud)
- Use modules for reuse
- Pin provider and module versions
- Separate environments (dev, stage, prod)
- Integrate with CI/CD for validation and approval

---

# Documentation & Resources

- [Terraform Docs](https://developer.hashicorp.com/terraform)
- [Provider Registry](https://registry.terraform.io/)
- [HCL Reference](https://developer.hashicorp.com/terraform/language)
- [Best Practices](https://www.terraform-best-practices.com/)
- [HashiCorp Tutorials](https://developer.hashicorp.com/terraform/tutorials)

---

# Q&A / Wrap-up

- Questions?
- Next steps: Explore hands-on labs and real-world scenarios

---
layout: section
---

# Lab: Build a 3-Node Cluster with Terraform & Libvirt

---

# Lab Overview & Goals

- Provision 3 VMs (1 master, 2 workers) using Terraform and libvirt
- Use cloud-init for SSH access and initial config
- Output VM details for future use

---

# 1. Environment Setup

- Install prerequisites:
  - Terraform
  - libvirt, qemu, virt-manager
  - Download cloud images (e.g., Ubuntu)
- Validate virtualization works locally

---

# 2. Project Initialization

- Create and structure your Terraform project directory
- Initialize Terraform:
  ```sh
  terraform init
  ```
- Configure the libvirt provider in main.tf

---

# 3. Define a Base VM Resource

- Write a minimal resource block for a single VM
- Set VM parameters: name, image, CPU, RAM
- Add cloud-init for SSH key/user setup
- Apply and verify VM creation

---

# 4. Parameterize and Scale to Multiple VMs

- Use variables for VM count, names, resources
- Refactor code to create 3 VMs (1 master, 2 workers)
- Output IP addresses and SSH details
- Validate connectivity to all VMs

---

# 5. Networking & Storage

- Define and attach a virtual network (NAT/bridge)
- Configure storage volumes if needed
- Ensure VMs are networked for future cluster use

---

# 6. Cloud-Init Customization

- Customize user-data for users, SSH keys, hostnames
- Automate initial configuration for all VMs
- Validate user access and VM identity

---

# 7. Outputs & Documentation

- Use Terraform outputs for IPs, hostnames, SSH info
- Document project structure and usage
- Clean up resources:
    ```sh
    terraform destroy
    ```
---

# 8. Troubleshooting & Q&A

- Common issues: image, network, permissions
- Debugging tips: logs, state, console
- Open Q&A and wrap-up

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
