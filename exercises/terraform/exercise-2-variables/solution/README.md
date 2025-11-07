# Exercise 2: Variables and Outputs - Solution

This directory contains a complete working solution for Exercise 2.

## What's Included

- `main.tf`: Resource definitions using variables
- `variables.tf`: Variable declarations with defaults
- `terraform.tfvars`: Variable values (optional, since defaults exist)
- `outputs.tf`: Output definitions

## Solution Overview

### Key Changes from Exercise 1

1. **All hardcoded values replaced with variables**
2. **Variable declarations with types and defaults**
3. **Outputs expose important VM information**
4. **Configuration is now reusable**

### File Structure

```
solution/
├── main.tf           # Resources (using var. references)
├── variables.tf      # Input variable declarations
├── terraform.tfvars  # Variable values (optional)
└── outputs.tf        # Output value definitions
```

## How to Use

```bash
# Initialize
terraform init

# Plan with default values
terraform plan

# Apply with default values
terraform apply

# View outputs
terraform output

# View specific output
terraform output vm_ip

# Override variables via CLI
terraform apply -var="vm_memory=4096" -var="vm_vcpu=2"

# Use a different tfvars file
terraform apply -var-file="custom.tfvars"

# Destroy
terraform destroy
```

## Understanding the Variables

### In variables.tf

Each variable has:
- **Description**: What it's for
- **Type**: Data type (string, number, bool, etc.)
- **Default**: Optional default value

Example:
```hcl
variable "vm_memory" {
  description = "Memory allocation for the VM in MB"
  type        = number
  default     = 2048
}
```

### In main.tf

Variables are referenced with `var.`:
```hcl
resource "libvirt_domain" "vm" {
  memory = var.vm_memory  # References the variable
  # ...
}
```

## Understanding the Outputs

### In outputs.tf

Outputs expose resource attributes:
```hcl
output "vm_ip" {
  description = "IP address of the VM"
  value       = libvirt_domain.vm.network_interface[0].addresses[0]
}
```

### Viewing Outputs

After `terraform apply`:
```bash
$ terraform output

vm_id          = "abc123..."
vm_ip          = "192.168.122.100"
vm_memory      = 2048
vm_name        = "terraform-vm-1"
vm_vcpu        = 1
ssh_connection = "ssh ubuntu@192.168.122.100"
```

## Variable Precedence Example

Create different tfvars files:

**dev.tfvars**
```hcl
vm_name   = "dev-vm"
vm_memory = 2048
vm_vcpu   = 1
```

**prod.tfvars**
```hcl
vm_name   = "prod-vm"
vm_memory = 8192
vm_vcpu   = 4
```

Use them:
```bash
terraform apply -var-file="dev.tfvars"
terraform apply -var-file="prod.tfvars"
```

## Advanced Features Used

### String Interpolation

In `main.tf`, we use string interpolation for dynamic names:
```hcl
name = "${var.vm_name}-disk"
# If vm_name = "my-vm", this becomes "my-vm-disk"
```

### Try Function

In `outputs.tf`, we use `try()` for graceful handling:
```hcl
value = try(
  libvirt_domain.vm.network_interface[0].addresses[0],
  "Waiting for IP..."
)
```

This prevents errors if the IP isn't available yet.

## Common Use Cases

### Override Memory for Testing

```bash
terraform apply -var="vm_memory=4096"
```

### Use Custom Image

```bash
terraform apply -var="ubuntu_image_url=https://cloud-images.ubuntu.com/focal/current/focal-server-cloudimg-amd64.img"
```

### Change VM Name

```bash
terraform apply -var="vm_name=test-vm-123"
```

## Benefits Over Exercise 1

| Aspect | Exercise 1 | Exercise 2 |
|--------|-----------|-----------|
| **Flexibility** | Edit code | Change variables |
| **Reusability** | Copy/paste | Use tfvars |
| **Environment Separation** | Multiple copies | Multiple tfvars |
| **Team Collaboration** | Merge conflicts | Share tfvars |
| **Information Sharing** | Manual lookup | Outputs |

## What You Learned

✅ How to declare input variables  
✅ Different variable types (string, number)  
✅ Default values vs required variables  
✅ Variable precedence (tfvars, CLI, env)  
✅ How to define and use outputs  
✅ String interpolation in HCL  
✅ The `try()` function for error handling  
✅ Separation of code and configuration  

## Next Steps

1. ✅ Create your own tfvars files for different scenarios
2. ✅ Try using environment variables: `export TF_VAR_vm_name="custom-vm"`
3. ✅ Add validation rules to variables (see Terraform docs)
4. ✅ Move on to [Exercise 3: Multiple VMs](../../exercise-3-multiple-vms/)

In Exercise 3, you'll learn how to create multiple VMs using the `count` parameter!
