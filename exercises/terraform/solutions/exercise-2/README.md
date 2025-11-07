# Exercise 2 Solution - README

## Running This Solution

**Prerequisites:**
- libvirt/KVM installed and running
- Default storage pool configured

```bash
cd exercises/terraform/solutions/exercise-2

# Initialize Terraform
terraform init

# Preview with custom variables
terraform plan -var 'masters=1' -var 'workers=2'

# Apply configuration
terraform apply -var 'masters=1' -var 'workers=2'

# Verify VMs
virsh list --all
virsh dominfo k8s-master-1

# Clean up
terraform destroy
```

## Expected Results

- 1 master VM created: k8s-master-1
- 2 worker VMs created: k8s-worker-1, k8s-worker-2
- All VMs running with assigned IP addresses
- Base image downloaded once and reused

## Key Concepts Demonstrated

- Provider configuration (libvirt)
- Variables with defaults
- Resource dependencies
- Count meta-argument for creating multiple resources
- Base volumes and derived volumes
- Network configuration with DHCP
