# Exercise 2: Variables and Outputs

**Duration**: 45 minutes  
**Difficulty**: ⭐ Beginner  

## Learning Objectives

By completing this exercise, you will:

- ✅ Understand Terraform variables and their types
- ✅ Create and use `variables.tf` for input declarations
- ✅ Create and use `terraform.tfvars` for variable values
- ✅ Define outputs to expose infrastructure information
- ✅ Reference variables in your configuration
- ✅ Understand variable precedence and overrides

## Prerequisites

- Completed Exercise 1: Hello Terraform
- Understanding of basic HCL syntax
- Terraform initialized and working

## Problem Statement

Your Exercise 1 configuration works, but it has hardcoded values. Every time you want to change the VM specs or name, you have to edit `main.tf` directly. This isn't ideal for:

- **Reusability**: Can't easily use the same config for different scenarios
- **Collaboration**: Different team members might need different values
- **Environment separation**: Dev vs Prod configurations

Your task: Refactor Exercise 1 to use **variables** for all configurable values and **outputs** to display important information like the VM's IP address.

## Step-by-Step Instructions

### Step 1: Identify Configurable Values

Look at your Exercise 1 solution and identify hardcoded values:
- VM name
- Memory size
- CPU count
- Disk size
- Ubuntu image version
- Network name

These should all be variables!

### Step 2: Create variables.tf

Create a `variables.tf` file to declare your input variables:

```hcl
variable "vm_name" {
  description = "Name of the virtual machine"
  type        = string
  default     = "terraform-vm-1"
}

# Add more variables here...
```

**Variable Components**:
- `description`: What the variable is for
- `type`: Data type (string, number, bool, list, map, etc.)
- `default`: Optional default value (no prompt if provided)

### Step 3: Create terraform.tfvars

Create a `terraform.tfvars` file with actual values:

```hcl
vm_name    = "my-custom-vm"
vm_memory  = 2048
vm_vcpu    = 1
disk_size  = 10737418240
```

This file provides values without editing the configuration.

### Step 4: Update main.tf

Replace hardcoded values with variable references:

```hcl
resource "libvirt_domain" "vm" {
  name   = var.vm_name     # Instead of "terraform-vm-1"
  memory = var.vm_memory   # Instead of "2048"
  vcpu   = var.vm_vcpu     # Instead of 1
  # ...
}
```

### Step 5: Create outputs.tf

Create an `outputs.tf` file to expose useful information:

```hcl
output "vm_name" {
  description = "Name of the created VM"
  value       = libvirt_domain.vm.name
}

output "vm_ip" {
  description = "IP address of the VM"
  value       = libvirt_domain.vm.network_interface[0].addresses[0]
}

# Add more outputs...
```

### Step 6: Test the Configuration

```bash
# Initialize (if needed)
terraform init

# Plan with default values
terraform plan

# Apply with default values
terraform apply

# View outputs
terraform output

# Apply with custom values
terraform apply -var="vm_memory=4096"

# Destroy
terraform destroy
```

## Expected Outcomes

After completing this exercise:

1. ✅ Configuration uses variables instead of hardcoded values
2. ✅ `variables.tf` declares all input variables
3. ✅ `terraform.tfvars` provides default values
4. ✅ `outputs.tf` exposes VM information
5. ✅ Running `terraform output` shows VM name and IP
6. ✅ You can change values without editing main.tf
7. ✅ Same functionality as Exercise 1, but more flexible

## Success Criteria

You have successfully completed this exercise when:

- [ ] `variables.tf` exists with at least 5 variables declared
- [ ] `terraform.tfvars` exists with values for those variables
- [ ] `main.tf` uses `var.` references instead of hardcoded values
- [ ] `outputs.tf` exists with at least 2 outputs
- [ ] `terraform apply` works the same as Exercise 1
- [ ] `terraform output` shows the VM IP address
- [ ] You can override variables with `-var` flag
- [ ] You understand variable precedence

## Common Issues & Solutions

### Issue: Variable not defined

**Error**: `Reference to undeclared input variable`

**Solution**: Make sure the variable is declared in `variables.tf`

### Issue: Wrong variable type

**Error**: `The given value is not suitable for...`

**Solution**: Check that your value matches the declared type:
```hcl
variable "vm_memory" {
  type = number  # Use 2048, not "2048"
}
```

### Issue: Output shows null

**Error**: Output value is null or empty

**Solution**: The resource might not be created yet, or the attribute path is wrong. Check:
```bash
terraform state show libvirt_domain.vm
```

### Issue: terraform.tfvars not found

**Symptom**: Terraform prompts for variables even though tfvars file exists

**Solution**: Terraform auto-loads files named exactly `terraform.tfvars` or `*.auto.tfvars`. Check filename spelling.

## Variable Types Reference

### String
```hcl
variable "vm_name" {
  type    = string
  default = "my-vm"
}
```

### Number
```hcl
variable "vm_memory" {
  type    = number
  default = 2048
}
```

### Bool
```hcl
variable "enable_graphics" {
  type    = bool
  default = true
}
```

### List
```hcl
variable "tags" {
  type    = list(string)
  default = ["terraform", "ubuntu"]
}
```

### Map
```hcl
variable "vm_specs" {
  type = map(number)
  default = {
    memory = 2048
    vcpu   = 1
  }
}
```

## Variable Precedence

Terraform loads variables in this order (last wins):

1. Environment variables (`TF_VAR_vm_name`)
2. `terraform.tfvars` file
3. `*.auto.tfvars` files (alphabetical order)
4. `-var` or `-var-file` command-line flags

## Useful Commands

```bash
# Show all input variables
terraform console
> var.vm_name

# Show all outputs
terraform output

# Show specific output
terraform output vm_ip

# Show output in JSON format
terraform output -json

# Override a variable
terraform apply -var="vm_memory=4096"

# Use a different tfvars file
terraform apply -var-file="production.tfvars"
```

## Key Concepts

### Input Variables
- **Purpose**: Make configuration flexible and reusable
- **Declaration**: `variables.tf`
- **Values**: `terraform.tfvars`, CLI flags, environment variables
- **Reference**: `var.variable_name`

### Outputs
- **Purpose**: Expose information after apply
- **Declaration**: `outputs.tf`
- **Use cases**: Show IPs, IDs, connection strings
- **Chaining**: Output from one config can be input to another

### Separation of Concerns
- `main.tf`: Resource definitions
- `variables.tf`: Input declarations
- `terraform.tfvars`: Default values
- `outputs.tf`: Output declarations

## Next Steps

Once you complete this exercise:

1. ✅ Try creating a `dev.tfvars` and `prod.tfvars` with different values
2. ✅ Experiment with different variable types
3. ✅ Add validation rules to variables
4. ✅ Move on to [Exercise 3: Multiple VMs](../exercise-3-multiple-vms/)

In Exercise 3, you'll use what you learned here to create multiple VMs with the `count` parameter!

## Additional Resources

- [Input Variables](https://developer.hashicorp.com/terraform/language/values/variables)
- [Output Values](https://developer.hashicorp.com/terraform/language/values/outputs)
- [Variable Precedence](https://developer.hashicorp.com/terraform/language/values/variables#variable-definition-precedence)
- [Type Constraints](https://developer.hashicorp.com/terraform/language/expressions/type-constraints)

---

**Ready?** Head to the `starter/` directory and refactor your configuration!
