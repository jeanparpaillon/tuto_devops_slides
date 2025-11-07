# Exercise 1 Solution - README

## Running This Solution

```bash
cd exercises/terraform/solutions/exercise-1

# Initialize Terraform
terraform init

# Preview changes
terraform plan

# Apply configuration
terraform apply

# Verify the file
cat hello.txt

# Clean up
terraform destroy
```

## Expected Results

- File `hello.txt` is created with the message
- Output shows the file path
- State file `terraform.tfstate` is created

## Key Concepts Demonstrated

- Terraform block with required providers
- Basic resource definition (local_file)
- Using functions (timestamp())
- Defining outputs
- Complete workflow: init → plan → apply → destroy
