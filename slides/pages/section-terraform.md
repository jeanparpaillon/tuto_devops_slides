
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
layout: two-cols-header
---

## Step 1: Environment Setup

::left::

**Objectives**
- Prepare local virtualization environment for Terraform and libvirt

**Do**
- Install Terraform, libvirt, qemu, virt-manager
  - On Ubuntu:
    ```sh
    sudo apt update
    sudo apt install -y libvirt-daemon-system libvirt-clients qemu-kvm virt-manager
    ```
- Download cloud images
    - Download Ubuntu latest LTS cloud image:
        ```sh
        wget https://cloud-images.ubuntu.com/noble/current/noble-server-cloudimg-amd64.img
        ```
        - For other versions, see [Ubuntu Cloud Images](https://cloud-images.ubuntu.com/)
- Validate virtualization works locally:
    ```sh
    virsh list --all
    ```

::right::

**Observe**
- Confirm all tools are installed (`terraform -v`, `virsh --version`)
- Cloud images are available
- `virsh` command works

---

## Step 2: Project Initialization

**Objectives**
- Set up a new Terraform project

**Do**
- Create project directory and files (`main.tf`, etc.)
- Run `terraform init` to initialize

**Observe**
- Terraform downloads provider plugins
- `.terraform` directory is created

---

## Step 3: Configure the libvirt Provider

**Objectives**
- Connect Terraform to local libvirt

**Do**
- Add libvirt provider block to `main.tf`
  - Tip: [libvirt provider doc](https://registry.terraform.io/providers/dmacvicar/libvirt/latest/docs)
- Set up connection parameters

**Observe**
- No errors on `terraform init`
- Provider is listed in output

---

## Step 4: Define a Base VM Resource

**Objectives**
- Provision a single VM with Terraform

**Do**
- Write resource block for one VM (name, image, CPU, RAM)
- Add cloud-init for SSH key/user setup
  - Tip: [libvirt provider cloud-init example](https://registry.terraform.io/providers/dmacvicar/libvirt/latest/docs/resources/domain#cloudinit)
- Run `terraform apply`

**Observe**
- VM appears in virt-manager
- SSH access is possible with configured key

---
layout: two-cols-header
---

## Step 5: Parameterize and Scale to Multiple VMs

::left::

**Objectives**
- Create 3 VMs (1 master, 2 workers) using variables

**Do**
- Add variables:
  - Declare variables:
    ```hcl
    variable "var_name" {
        decription = "Description of the variable"
        type = string
        default = "default_value"
    }
    ```
- Set values:
    - Via `terraform.tfvars` file:
      ```hcl
      var_name = "value"
      ```
    - Or via CLI:
      ```sh
      terraform apply -var="var_name=value"
      ```

::right::

- Refactor code to use variables for count, names, resources
- Output IP addresses and SSH details

**Observe**
- All VMs are created and accessible
- Output shows IPs and hostnames

---

## Step 6: Networking & Storage

**Objectives**
- Ensure VMs are networked and have storage

**Do**
- Define and attach virtual network (NAT/bridge)
- Configure storage volumes if needed

**Observe**
- VMs can ping each other
- Storage is correctly attached

---

## Step 7: Cloud-Init Customization

**Objectives**
- Automate initial VM configuration

**Do**
- Customize cloud-init user-data for users, SSH keys, hostnames
- Apply changes and verify

**Observe**
- Each VM has correct hostname and user access
- SSH login works as expected

---

## Step 8: Outputs & Documentation

**Objectives**
- Document and clean up the project

**Do**
- Use Terraform outputs for IPs, hostnames, SSH info
- Document project structure and usage
- Run `terraform destroy` to clean up

**Observe**
- Outputs are clear and useful
- All resources are destroyed successfully

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
