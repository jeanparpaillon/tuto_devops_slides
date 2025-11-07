# Exercise 3 Solution - README

## Running This Solution

**Prerequisites:**
- SSH key pair generated
- libvirt/KVM installed and running

```bash
cd exercises/terraform/solutions/exercise-3

# Generate SSH key if needed
ssh-keygen -t ed25519 -C "terraform-lab" -f ~/.ssh/terraform_lab

# Create terraform.tfvars from example
cp terraform.tfvars.example terraform.tfvars

# Edit terraform.tfvars and add your SSH public key
# Get your key with: cat ~/.ssh/terraform_lab.pub
nano terraform.tfvars

# Initialize and apply
terraform init
terraform apply

# Wait 2-3 minutes for cloud-init to complete

# Test SSH access
MASTER_IP=$(virsh domifaddr k8s-master-1 | grep ipv4 | awk '{print $4}' | cut -d'/' -f1)
ssh -i ~/.ssh/terraform_lab devops@$MASTER_IP

# Clean up
terraform destroy
```

## Expected Results

- VMs boot with configured hostnames
- User `devops` is created with sudo access
- SSH key authentication works
- Required packages are installed
- Can SSH without password

## Key Concepts Demonstrated

- Cloud-init template rendering
- Variable interpolation in templates
- Template data sources
- Cloud-init disk resources
- User and package configuration
- SSH key deployment
