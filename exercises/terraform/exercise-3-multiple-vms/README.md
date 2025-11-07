# Exercise 3: Multiple VMs with Count

**Duration**: 60 minutes  
**Difficulty**: ⭐⭐ Intermediate  

## Learning Objectives

By completing this exercise, you will:

- ✅ Understand the `count` parameter for creating multiple resources
- ✅ Use `count.index` to differentiate resources
- ✅ Work with list variables
- ✅ Create multiple similar VMs with one resource block
- ✅ Reference resources created with count
- ✅ Understand limitations of count vs for_each

## Prerequisites

- Completed Exercise 2: Variables and Outputs
- Understanding of variables and outputs
- Familiarity with lists in programming

## Problem Statement

You need to create 2 identical VMs for load balancing testing. Creating two separate resource blocks would lead to code duplication:

```hcl
resource "libvirt_domain" "vm1" { ... }
resource "libvirt_domain" "vm2" { ... }
```

This is not maintainable! If you need to change something, you have to update multiple places.

Your task: Use the `count` parameter to create multiple VMs with a single resource definition, then use `count.index` to give each VM a unique name and configuration.

## Step-by-Step Instructions

### Step 1: Understand Count

The `count` parameter tells Terraform to create multiple instances of a resource:

```hcl
resource "libvirt_domain" "vm" {
  count = 2  # Creates 2 VMs
  
  name = "vm-${count.index}"  # vm-0, vm-1
  # ...
}
```

**Key Points**:
- `count.index` starts at 0 (first VM is 0, second is 1)
- Resources become arrays: `libvirt_domain.vm[0]`, `libvirt_domain.vm[1]`
- All instances have the same configuration except where you use `count.index`

### Step 2: Add Count Variable

Add a variable to control how many VMs to create:

```hcl
variable "vm_count" {
  description = "Number of VMs to create"
  type        = number
  default     = 2
}
```

### Step 3: Update Resource Definitions

Update your resources to use count:

```hcl
resource "libvirt_volume" "vm_disk" {
  count = var.vm_count
  name  = "vm-${count.index}-disk"
  # ...
}

resource "libvirt_domain" "vm" {
  count = var.vm_count
  name  = "vm-${count.index}"
  
  disk {
    volume_id = libvirt_volume.vm_disk[count.index].id
  }
  # ...
}
```

### Step 4: Update Outputs for Multiple VMs

Outputs need to handle multiple VMs:

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

**Note**: `[*]` is the splat operator - it collects attributes from all instances.

### Step 5: Test with Different Counts

```bash
# Initialize
terraform init

# Create 2 VMs (default)
terraform apply

# View outputs
terraform output

# Destroy and recreate with 3 VMs
terraform destroy
terraform apply -var="vm_count=3"

# Clean up
terraform destroy
```

## Expected Outcomes

After completing this exercise:

1. ✅ Single resource definition creates multiple VMs
2. ✅ Each VM has a unique name (vm-0, vm-1, etc.)
3. ✅ Each VM has its own disk volume
4. ✅ Outputs show information for all VMs
5. ✅ You can change VM count with a variable
6. ✅ `virsh list` shows all VMs running
7. ✅ Code is more maintainable than multiple resource blocks

## Success Criteria

You have successfully completed this exercise when:

- [ ] `count` parameter is used on volume and domain resources
- [ ] Variable `vm_count` controls number of VMs
- [ ] Each VM has a unique name using `count.index`
- [ ] Resources properly reference counted resources (using `[count.index]`)
- [ ] Outputs use splat operator or for expressions
- [ ] `terraform apply` creates 2 VMs by default
- [ ] Changing `vm_count` creates the correct number of VMs
- [ ] All VMs are accessible and running

## Common Issues & Solutions

### Issue: Can't reference counted resources

**Error**: `A reference to a resource type must be followed by at least one attribute`

**Solution**: Use array syntax:
```hcl
# Wrong
volume_id = libvirt_volume.vm_disk.id

# Correct
volume_id = libvirt_volume.vm_disk[count.index].id
```

### Issue: Output shows single value instead of list

**Error**: Output only shows one VM instead of all

**Solution**: Use splat operator or for expression:
```hcl
# For a simple list of values
value = libvirt_domain.vm[*].name

# For more complex transformations
value = [for vm in libvirt_domain.vm : vm.name]
```

### Issue: Inconsistent resource counts

**Error**: `Invalid count argument` or resources out of sync

**Solution**: Make sure all related resources use the same count:
```hcl
resource "libvirt_volume" "vm_disk" {
  count = var.vm_count  # Same count
  # ...
}

resource "libvirt_domain" "vm" {
  count = var.vm_count  # Same count
  disk {
    volume_id = libvirt_volume.vm_disk[count.index].id
  }
}
```

### Issue: Can't destroy individual VMs

**Symptom**: Want to remove VM 1 but keep VM 0

**Solution**: This is a limitation of count. You can:
- Use `terraform destroy -target=libvirt_domain.vm[1]` (not recommended for production)
- Or use `for_each` instead (Exercise 5)

## Count vs For_Each Preview

**Count** is great when:
- Resources are truly identical
- Order doesn't matter
- You might scale up/down

**For_each** is better when:
- Resources have different configurations
- You need stable identifiers
- You might remove items from the middle

You'll learn `for_each` in Exercise 5!

## Advanced Concepts

### List Variables with Count

You can use lists to provide different values:

```hcl
variable "vm_names" {
  type    = list(string)
  default = ["web", "app"]
}

resource "libvirt_domain" "vm" {
  count = length(var.vm_names)
  name  = var.vm_names[count.index]
  # ...
}
```

### Conditional Count

Create resources conditionally:

```hcl
variable "create_backup_vm" {
  type    = bool
  default = false
}

resource "libvirt_domain" "backup" {
  count = var.create_backup_vm ? 1 : 0
  # ...
}
```

## Useful Commands

```bash
# Show all VMs in state
terraform state list

# Show details of specific VM
terraform state show libvirt_domain.vm[0]
terraform state show libvirt_domain.vm[1]

# Get output for all VM names
terraform output vm_names

# Get output for specific VM (if you output individual VMs)
terraform output -json | jq '.vm_ips.value[0]'
```

## Key Concepts

### Count Meta-Argument
- Special argument available on all resources
- Creates multiple instances
- `count.index` gives 0-based position

### Resource Arrays
- When using count, resource becomes array
- Reference with `resource_type.name[index]`
- Use in dependencies: `depends_on = [libvirt_volume.vm_disk]`

### Splat Operator
- Syntax: `resource[*].attribute`
- Collects attribute from all instances
- Returns a list

### For Expressions
- Syntax: `[for item in list : transformation]`
- More flexible than splat
- Can filter and transform

## Practice Challenges

Once you complete the basic exercise, try:

1. **Different VM sizes**: Use a list variable to give each VM different memory
2. **Naming with offset**: Start names from vm-1 instead of vm-0 (hint: `count.index + 1`)
3. **Conditional creation**: Create VMs only if a variable is true
4. **Output formatting**: Create a map output: `{vm-0 = "192.168.1.100", vm-1 = "192.168.1.101"}`

## Next Steps

Once you complete this exercise:

1. ✅ Experiment with different count values
2. ✅ Try using list variables with count
3. ✅ Compare count approach vs manual duplication
4. ✅ Move on to [Exercise 4: Cloud-Init Integration](../exercise-4-cloud-init/)

In Exercise 4, you'll learn how to configure VMs automatically using cloud-init!

## Additional Resources

- [Count Meta-Argument](https://developer.hashicorp.com/terraform/language/meta-arguments/count)
- [Splat Expressions](https://developer.hashicorp.com/terraform/language/expressions/splat)
- [For Expressions](https://developer.hashicorp.com/terraform/language/expressions/for)
- [Resource Addressing](https://developer.hashicorp.com/terraform/cli/state/resource-addressing)

---

**Ready?** Head to the `starter/` directory and create multiple VMs!
