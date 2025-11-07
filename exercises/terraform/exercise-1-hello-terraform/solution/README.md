# Exercise 1: Hello Terraform - Solution

This directory contains a complete working solution for Exercise 1.

## What's Included

- `main.tf`: Complete Terraform configuration creating a single VM

## Solution Overview

The solution includes:

1. **Provider Configuration**: Sets up the libvirt provider for local QEMU/KVM
2. **Base Image**: Downloads Ubuntu 22.04 cloud image (reused for efficiency)
3. **VM Disk**: Creates a 10 GB disk based on the Ubuntu image
4. **Virtual Machine**: Defines a VM with 2 GB RAM, 1 CPU, and network connectivity

## Key Points

### Resource Dependencies

Notice how resources reference each other:
- `vm_disk` references `ubuntu_base.id` → base image is created first
- `vm` references `vm_disk.id` → disk is created before VM

Terraform automatically determines the correct creation order!

### Network Configuration

The `wait_for_lease = true` setting makes Terraform wait for the VM to get an IP address via DHCP. This is useful for ensuring the VM is fully ready before Terraform completes.

### Console and Graphics

- **Console**: Allows serial console access via `virsh console`
- **Graphics**: Enables VNC access for GUI if needed

These are optional but helpful for debugging.

## How to Use

```bash
# Initialize Terraform (download providers)
terraform init

# Validate the configuration
terraform validate

# Preview the changes
terraform plan

# Create the infrastructure
terraform apply

# After typing 'yes', wait for completion

# Check the VM is running
virsh list

# Get VM IP address
virsh domifaddr terraform-vm-1

# Connect to the VM (wait a minute for cloud-init to complete)
ssh ubuntu@<vm-ip-address>

# When done, destroy the infrastructure
terraform destroy
```

## Understanding the Output

When you run `terraform apply`, you'll see:

```
Plan: 3 to add, 0 to change, 0 to destroy
```

This means:
- **3 resources** will be created: base image, disk, and VM
- **0 changes**: Nothing is being modified
- **0 destroys**: Nothing is being deleted

## Terraform State

After applying, you'll have a `terraform.tfstate` file. This JSON file tracks:
- What resources Terraform created
- Their IDs in libvirt
- Current configuration
- Dependencies between resources

**Important**: Don't edit this file manually! Let Terraform manage it.

## Common Outputs

### Successful Apply

```
libvirt_volume.ubuntu_base: Creating...
libvirt_volume.ubuntu_base: Creation complete after 30s [id=/var/lib/libvirt/images/ubuntu-22.04-base]
libvirt_volume.vm_disk: Creating...
libvirt_volume.vm_disk: Creation complete after 2s [id=/var/lib/libvirt/images/terraform-vm-1-disk]
libvirt_domain.vm: Creating...
libvirt_domain.vm: Creation complete after 10s [id=<uuid>]

Apply complete! Resources: 3 added, 0 changed, 0 destroyed.
```

### Successful Destroy

```
libvirt_domain.vm: Destroying... [id=<uuid>]
libvirt_domain.vm: Destruction complete after 5s
libvirt_volume.vm_disk: Destroying... [id=/var/lib/libvirt/images/terraform-vm-1-disk]
libvirt_volume.vm_disk: Destruction complete after 1s
libvirt_volume.ubuntu_base: Destroying... [id=/var/lib/libvirt/images/ubuntu-22.04-base]
libvirt_volume.ubuntu_base: Destruction complete after 1s

Destroy complete! Resources: 3 destroyed.
```

## Variations to Try

Once you understand the basic solution, try experimenting:

### Change VM Specs

```hcl
resource "libvirt_domain" "vm" {
  name   = "terraform-vm-1"
  memory = "4096"  # Change to 4 GB
  vcpu   = 2       # Change to 2 CPUs
  # ...
}
```

### Change VM Name

```hcl
resource "libvirt_domain" "vm" {
  name = "my-test-vm"  # Change the name
  # ...
}
```

### Use Different Image

```hcl
resource "libvirt_volume" "ubuntu_base" {
  name   = "ubuntu-20.04-base"
  pool   = "default"
  source = "https://cloud-images.ubuntu.com/focal/current/focal-server-cloudimg-amd64.img"
  format = "qcow2"
}
```

## What You Learned

✅ Basic HCL syntax for defining resources  
✅ Terraform provider configuration  
✅ Resource references and dependencies  
✅ The Terraform workflow: init → plan → apply → destroy  
✅ Working with libvirt provider  
✅ Creating VMs with Terraform  

## Next Steps

Now that you understand the basics:

1. ✅ Make sure you can explain what each line does
2. ✅ Try the variations above
3. ✅ Move on to [Exercise 2: Variables and Outputs](../../exercise-2-variables/)

In Exercise 2, you'll refactor this hardcoded configuration to use variables, making it more flexible and reusable!
