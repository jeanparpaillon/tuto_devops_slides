# Exercise 1: Hello Terraform - Starter Code

This directory contains the starting point for Exercise 1.

## Your Task

Create a `main.tf` file that defines:

1. Terraform provider configuration for libvirt
2. A base Ubuntu 22.04 cloud image
3. A storage volume (disk) for the VM
4. A virtual machine (domain) with:
   - 2 GB RAM
   - 1 CPU
   - Ubuntu 22.04
   - Network connectivity

## Hints

### 1. Provider Configuration

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
  # TODO: Add the libvirt connection URI
  # Hint: For local QEMU/KVM, use "qemu:///system"
}
```

### 2. Base Image

You'll need to fetch the Ubuntu cloud image. Use `libvirt_volume` with a `source` URL:

```hcl
resource "libvirt_volume" "ubuntu_base" {
  # TODO: Define the base image
  # Hint: name, pool (default), source (Ubuntu cloud image URL)
}
```

Ubuntu 22.04 cloud image URL:
`https://cloud-images.ubuntu.com/jammy/current/jammy-server-cloudimg-amd64.img`

### 3. VM Disk

Create a volume based on the base image:

```hcl
resource "libvirt_volume" "vm_disk" {
  # TODO: Create a disk volume
  # Hint: name, base_volume_id, pool, size (in bytes: 10GB = 10737418240)
}
```

### 4. Virtual Machine

Create the VM itself:

```hcl
resource "libvirt_domain" "vm" {
  # TODO: Define the virtual machine
  # Hint: name, memory (MB), vcpu, disk block, network_interface block
}
```

## Testing Your Work

```bash
# Initialize Terraform
terraform init

# Check your configuration
terraform validate

# Preview what will be created
terraform plan

# Create the infrastructure
terraform apply

# Verify the VM is running
virsh list

# Clean up when done
terraform destroy
```

## Need Help?

- Check the [Exercise README](../README.md) for detailed instructions
- Refer to the [Libvirt Provider Documentation](https://registry.terraform.io/providers/dmacvicar/libvirt/latest/docs)
- Look at the solution in `../solution/` if you're really stuck (but try first!)

Good luck! 🚀
