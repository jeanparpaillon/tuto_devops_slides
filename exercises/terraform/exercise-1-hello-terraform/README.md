# Exercise 1: Hello Terraform

**Duration**: 30 minutes  
**Difficulty**: ⭐ Beginner  

## Learning Objectives

By completing this exercise, you will:

- ✅ Understand basic HCL (HashiCorp Configuration Language) syntax
- ✅ Configure a Terraform provider (libvirt)
- ✅ Create your first virtual machine resource
- ✅ Master the core Terraform workflow: init, plan, apply, destroy
- ✅ Connect to a VM via SSH
- ✅ Understand Terraform state basics

## Prerequisites

- Terraform ≥ 1.5.0 installed
- QEMU/KVM and libvirt installed and running
- SSH client available
- Basic understanding of virtualization concepts

## Problem Statement

You need to create a single virtual machine for testing purposes. The VM should:

- Run Ubuntu 22.04
- Have 2 GB of RAM
- Have 1 CPU
- Have a 10 GB disk
- Be accessible via SSH
- Be created using Infrastructure as Code (Terraform)

## Step-by-Step Instructions

### Step 1: Understand the Provider

Terraform uses **providers** to interact with APIs and cloud platforms. For local virtualization with QEMU/KVM, we use the **libvirt provider**.

The provider configuration looks like this:

```hcl
terraform {
  required_providers {
    libvirt = {
      source  = "dmacvicar/libvirt"
      version = "~> 0.7"
    }
  }
}

provider "libvirt" {
  uri = "qemu:///system"
}
```

### Step 2: Create Your Configuration

Navigate to the `starter/` directory and create a file named `main.tf`.

You'll need to define:

1. **Base image**: Ubuntu 22.04 cloud image
2. **Storage pool**: Where disk images are stored
3. **Volume**: The VM's disk
4. **Network**: For VM connectivity
5. **Domain**: The actual virtual machine

### Step 3: Initialize Terraform

Run the initialization command:

```bash
cd starter/
terraform init
```

**What happens?**
- Terraform downloads the libvirt provider plugin
- Creates a `.terraform/` directory
- Creates a lock file (`.terraform.lock.hcl`)

### Step 4: Plan Your Infrastructure

Preview what Terraform will create:

```bash
terraform plan
```

**What to look for:**
- `Plan: X to add, 0 to change, 0 to destroy`
- List of resources that will be created
- No errors or warnings

### Step 5: Apply the Configuration

Create the infrastructure:

```bash
terraform apply
```

**What happens?**
- Terraform shows the plan again
- Prompts for confirmation (type `yes`)
- Creates resources in the order of dependencies
- Stores state in `terraform.tfstate`

### Step 6: Verify the VM

Check that the VM is running:

```bash
# List running VMs
virsh list

# Get VM details
virsh dominfo <vm-name>

# Get IP address
virsh domifaddr <vm-name>
```

### Step 7: Connect via SSH

Once the VM has an IP address:

```bash
ssh ubuntu@<vm-ip-address>
```

**Note**: The cloud image comes with the `ubuntu` user pre-configured. You'll need to set up SSH keys in later exercises.

### Step 8: Destroy the Infrastructure

Clean up when you're done:

```bash
terraform destroy
```

**What happens?**
- Terraform shows what will be destroyed
- Prompts for confirmation (type `yes`)
- Removes all resources
- State file is updated to reflect empty infrastructure

## Expected Outcomes

After completing this exercise:

1. ✅ A VM named `terraform-vm-1` is created
2. ✅ VM has 2 GB RAM and 1 CPU
3. ✅ VM is running Ubuntu 22.04
4. ✅ VM has an IP address on the default libvirt network
5. ✅ You can see the VM with `virsh list`
6. ✅ Terraform state file (`terraform.tfstate`) exists
7. ✅ All resources are successfully destroyed after testing

## Success Criteria

You have successfully completed this exercise when:

- [ ] `terraform init` completes without errors
- [ ] `terraform plan` shows resources to be created
- [ ] `terraform apply` successfully creates the VM
- [ ] `virsh list` shows your running VM
- [ ] VM has an IP address
- [ ] You understand what each resource does
- [ ] `terraform destroy` successfully removes all resources

## Common Issues & Solutions

### Issue: Provider not found

**Error**: `Could not find required providers`

**Solution**: Run `terraform init` first

### Issue: Connection refused

**Error**: `Error connecting to libvirt`

**Solution**: 
```bash
# Check if libvirtd is running
sudo systemctl status libvirtd

# Start if needed
sudo systemctl start libvirtd
```

### Issue: Permission denied

**Error**: `Failed to connect to libvirt`

**Solution**: Add your user to the libvirt group:
```bash
sudo usermod -a -G libvirt $USER
# Log out and back in for changes to take effect
```

### Issue: VM won't start

**Error**: `internal error: process exited while connecting to monitor`

**Solution**: Check if virtualization is enabled:
```bash
egrep -c '(vmx|svm)' /proc/cpuinfo  # Should be > 0
```

## Hints for Starter Code

If you're stuck, here are the main resources you need:

1. **libvirt_volume**: Creates a disk from a cloud image
2. **libvirt_domain**: Creates and configures the VM

Key properties to set:
- `name`: Unique identifier for resources
- `memory`: RAM in MB (2048 for 2 GB)
- `vcpu`: Number of CPUs
- `disk.volume_id`: Reference to the volume
- `network_interface`: Configure networking

## Key Concepts to Understand

### Terraform Workflow

```
terraform init     → Download providers and modules
terraform plan     → Preview changes
terraform apply    → Create/update infrastructure
terraform destroy  → Remove infrastructure
```

### HCL Syntax Basics

```hcl
resource "provider_type" "name" {
  property = "value"
  number   = 123
  
  nested_block {
    key = "value"
  }
}
```

### Resource Dependencies

Terraform automatically determines dependencies:
- If Resource B references Resource A, A is created first
- Use `depends_on` for explicit dependencies if needed

### State File

- `terraform.tfstate`: JSON file tracking real infrastructure
- **Don't edit manually**
- **Don't commit to Git** (contains sensitive data)
- Used to map configuration to real resources

## Next Steps

Once you complete this exercise:

1. ✅ Review your `main.tf` and understand each resource
2. ✅ Compare with the solution in `solution/`
3. ✅ Try modifying values (RAM, CPU) and re-apply
4. ✅ Move on to [Exercise 2: Variables and Outputs](../exercise-2-variables/)

## Additional Resources

- [Terraform Language Basics](https://developer.hashicorp.com/terraform/language)
- [Libvirt Provider Documentation](https://registry.terraform.io/providers/dmacvicar/libvirt/latest/docs)
- [Ubuntu Cloud Images](https://cloud-images.ubuntu.com/)
- [Understanding Terraform State](https://developer.hashicorp.com/terraform/language/state)

---

**Ready?** Head to the `starter/` directory and create your first Terraform configuration!
