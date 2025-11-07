# Exercise 2: Variables and Outputs - Starter Code

This directory contains the starting point for Exercise 2.

## Your Task

Refactor the Exercise 1 solution to use variables and outputs.

You should create these files:
1. `main.tf` - Resource definitions (copy from Exercise 1, then refactor)
2. `variables.tf` - Variable declarations
3. `terraform.tfvars` - Variable values
4. `outputs.tf` - Output definitions

## Starting Point

Start by copying your Exercise 1 `main.tf` here:

```bash
cp ../../exercise-1-hello-terraform/solution/main.tf .
```

Now refactor it to use variables!

## Variables to Create

Create these variables in `variables.tf`:

1. `vm_name` - VM name (string)
2. `vm_memory` - RAM in MB (number)
3. `vm_vcpu` - Number of CPUs (number)
4. `disk_size` - Disk size in bytes (number)
5. `ubuntu_image_url` - Cloud image URL (string)
6. `network_name` - Network name (string, default "default")

## Outputs to Create

Create these outputs in `outputs.tf`:

1. `vm_id` - The VM's unique ID
2. `vm_name` - The VM's name
3. `vm_ip` - The VM's IP address
4. `vm_memory` - The VM's memory allocation

## Example Variable Declaration

```hcl
variable "vm_name" {
  description = "Name of the virtual machine"
  type        = string
  default     = "terraform-vm-1"
}
```

## Example Output Declaration

```hcl
output "vm_name" {
  description = "Name of the created VM"
  value       = libvirt_domain.vm.name
}
```

## Testing Your Work

```bash
# Initialize (if needed)
terraform init

# Validate the configuration
terraform validate

# Plan with variables
terraform plan

# Apply
terraform apply

# Check outputs
terraform output

# Try overriding a variable
terraform apply -var="vm_memory=4096"

# Clean up
terraform destroy
```

## Hints

- Use `var.variable_name` to reference a variable
- Variable names should be lowercase with underscores
- Output values can reference resource attributes
- For IP address, use: `libvirt_domain.vm.network_interface[0].addresses[0]`

## Need Help?

- Check the [Exercise README](../README.md) for detailed instructions
- Refer to the [Terraform Variables Documentation](https://developer.hashicorp.com/terraform/language/values/variables)
- Look at the solution in `../solution/` if needed

Good luck! 🚀
