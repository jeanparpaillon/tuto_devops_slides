# Exercise 3: Multiple VMs with Count - Starter Code

This directory contains the starting point for Exercise 3.

## Your Task

Modify the Exercise 2 solution to create multiple VMs using the `count` parameter.

You should update these files:
1. `variables.tf` - Add `vm_count` variable
2. `main.tf` - Add count to resources, use count.index
3. `outputs.tf` - Update to handle multiple VMs

## Starting Point

Start by copying Exercise 2 solution files:

```bash
cp ../../exercise-2-variables/solution/*.tf .
```

Now modify them to use count!

## Changes to Make

### 1. Add to variables.tf

```hcl
variable "vm_count" {
  description = "Number of VMs to create"
  type        = number
  default     = 2
}
```

### 2. Update main.tf

Add `count` to resources and use `count.index` for unique names:

```hcl
resource "libvirt_volume" "vm_disk" {
  count = var.vm_count
  name  = "${var.vm_name}-${count.index}-disk"
  # ... rest of the configuration
  # Remember to reference ubuntu_base properly!
}

resource "libvirt_domain" "vm" {
  count = var.vm_count
  name  = "${var.vm_name}-${count.index}"
  
  disk {
    volume_id = libvirt_volume.vm_disk[count.index].id
  }
  # ... rest of the configuration
}
```

### 3. Update outputs.tf

Change outputs to handle multiple VMs:

```hcl
output "vm_names" {
  description = "Names of all VMs"
  value       = libvirt_domain.vm[*].name
}

output "vm_ips" {
  description = "IP addresses of all VMs"
  value       = [
    for vm in libvirt_domain.vm :
    try(vm.network_interface[0].addresses[0], "Waiting...")
  ]
}
```

## What About the Base Image?

The base Ubuntu image should NOT use count (you only need one):

```hcl
resource "libvirt_volume" "ubuntu_base" {
  # NO count here - we only need one base image
  name   = "${var.vm_name}-base"
  # ...
}
```

Then each VM disk references it:

```hcl
resource "libvirt_volume" "vm_disk" {
  count          = var.vm_count
  base_volume_id = libvirt_volume.ubuntu_base.id  # No array syntax!
  # ...
}
```

## Testing Your Work

```bash
# Initialize
terraform init

# Validate
terraform validate

# Plan (should show 2 VMs + 2 disks + 1 base image = 5 resources)
terraform plan

# Apply
terraform apply

# Check outputs
terraform output vm_names
terraform output vm_ips

# Verify all VMs are running
virsh list

# Try changing count
terraform apply -var="vm_count=3"

# Clean up
terraform destroy
```

## Hints

### Count.index in Strings

Use `${}` interpolation:
```hcl
name = "${var.vm_name}-${count.index}"
# With vm_name="terraform-vm" produces: "terraform-vm-0", "terraform-vm-1"
```

### Referencing Counted Resources

```hcl
# In the same resource using count
volume_id = libvirt_volume.vm_disk[count.index].id

# From another resource
depends_on = [libvirt_volume.vm_disk]  # All instances
```

### Splat Operator

```hcl
# Get all names
libvirt_domain.vm[*].name

# Equivalent to:
[for vm in libvirt_domain.vm : vm.name]
```

## Expected Result

After `terraform apply`, you should have:
- 2 VMs running (vm-0 and vm-1)
- Each with its own disk
- All sharing the same base image
- Outputs showing both VM names and IPs

## Common Mistakes to Avoid

1. ❌ Adding count to the base image (you only need one)
2. ❌ Forgetting `[count.index]` when referencing counted resources
3. ❌ Not updating outputs to handle multiple resources
4. ❌ Using count.index in resources that don't have count

## Need Help?

- Check the [Exercise README](../README.md) for detailed instructions
- Review [Terraform Count Documentation](https://developer.hashicorp.com/terraform/language/meta-arguments/count)
- Look at the solution in `../solution/` if needed

Good luck! 🚀
