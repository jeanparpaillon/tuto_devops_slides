# Terraform Exercises - Progressive Learning Path

Welcome to the Terraform hands-on exercises! These exercises are designed to build your Infrastructure as Code skills progressively, from basic concepts to deploying a complete Kubernetes cluster infrastructure.

## Overview

This learning path consists of 5 progressive exercises that take you from zero to deploying a 3-node cluster ready for Kubernetes installation.

### Learning Path

1. **Exercise 1: Hello Terraform** (30 min)
   - Create your first virtual machine
   - Learn basic HCL syntax and Terraform commands
   - Master: `terraform init`, `plan`, `apply`, `destroy`

2. **Exercise 2: Variables and Outputs** (45 min)
   - Make your infrastructure configurable
   - Learn variables, outputs, and tfvars files
   - Understand parameterization and reusability

3. **Exercise 3: Multiple VMs with Count** (60 min)
   - Scale infrastructure with the count parameter
   - Work with list variables and count.index
   - Manage multiple similar resources

4. **Exercise 4: Cloud-Init Integration** (60 min)
   - Automate VM configuration with cloud-init
   - Use templatefile() for dynamic content
   - Configure users, SSH keys, and packages

5. **Exercise 5: 3-Node K8s Cluster Infrastructure** (90 min)
   - Create differentiated infrastructure (master + workers)
   - Use for_each for complex resource management
   - Generate Ansible inventory from Terraform outputs
   - Prepare infrastructure for Day 3 Kubernetes deployment

## Prerequisites

### Required Software

- **Terraform** ≥ 1.5.0
- **QEMU/KVM + libvirt** (for local virtualization)
- **SSH client**
- **Text editor** (VS Code, vim, etc.)
- **Git** (for version control)

### System Requirements

- **RAM**: 8 GB minimum (16 GB recommended)
- **Disk**: 20 GB free space
- **CPU**: Virtualization support (Intel VT-x or AMD-V)

### Verify Your Setup

```bash
# Check Terraform version
terraform version    # Should show ≥ 1.5.0

# Check libvirt
virsh version       # Should show libvirt daemon info

# Check SSH
ssh -V              # Should show OpenSSH version

# Check CPU virtualization support
egrep -c '(vmx|svm)' /proc/cpuinfo  # Should return > 0
```

## How to Use These Exercises

### General Workflow

1. **Read the exercise README** in each exercise directory
2. **Start with the starter code** in the `starter/` directory
3. **Follow the step-by-step instructions**
4. **Test your solution** with Terraform commands
5. **Compare with the solution** in the `solution/` directory if needed
6. **Experiment and explore** - try variations!

### Best Practices

- **Work incrementally**: Run `terraform plan` frequently
- **Read error messages carefully**: Terraform provides helpful feedback
- **Use `terraform console`**: Test expressions interactively
- **Version control**: Commit your work at each step
- **Clean up**: Always run `terraform destroy` after completing an exercise

### Getting Help

- **Troubleshooting Guide**: See [troubleshooting.md](troubleshooting.md)
- **Terraform Documentation**: [developer.hashicorp.com/terraform](https://developer.hashicorp.com/terraform)
- **Libvirt Provider Docs**: [registry.terraform.io/providers/dmacvicar/libvirt](https://registry.terraform.io/providers/dmacvicar/libvirt)
- **Ask your instructor**: Don't hesitate to ask questions!

## Exercise Structure

Each exercise follows the same structure:

```
exercise-N-name/
├── README.md       # Detailed instructions and learning objectives
├── starter/        # Starting point with hints
│   └── ...         # Partial or empty Terraform files
└── solution/       # Complete working solution
    └── ...         # Fully working Terraform configuration
```

## Time Estimates

| Exercise | Estimated Time | Difficulty |
|----------|---------------|------------|
| Exercise 1 | 30 minutes | ⭐ Beginner |
| Exercise 2 | 45 minutes | ⭐ Beginner |
| Exercise 3 | 60 minutes | ⭐⭐ Intermediate |
| Exercise 4 | 60 minutes | ⭐⭐ Intermediate |
| Exercise 5 | 90 minutes | ⭐⭐⭐ Advanced |
| **Total** | **4h 45min** | Progressive |

## Learning Objectives

By completing all exercises, you will be able to:

- ✅ Write Terraform configurations using HCL syntax
- ✅ Manage infrastructure lifecycle (init, plan, apply, destroy)
- ✅ Use variables and outputs for parameterization
- ✅ Create multiple resources with count and for_each
- ✅ Integrate cloud-init for VM configuration
- ✅ Template files dynamically with templatefile()
- ✅ Output structured data for integration with other tools
- ✅ Deploy complex multi-node infrastructure
- ✅ Understand Terraform state and resource dependencies

## What's Next?

After completing these exercises, you'll have a 3-node cluster infrastructure ready for:

- **Day 3**: Kubernetes deployment using Ansible (Kubespray)
- **Day 4**: Application deployment on Kubernetes
- **Day 5**: Advanced topics (monitoring, HA, security)

## Tips for Success

1. **Don't rush**: Understanding is more important than speed
2. **Type the code**: Don't just copy-paste, understand each line
3. **Experiment**: Try changing values and see what happens
4. **Read documentation**: Learn to navigate Terraform docs
5. **Practice cleanup**: Always destroy resources when done
6. **Ask questions**: Your instructor is here to help
7. **Help others**: Teaching reinforces your own learning

## Additional Resources

### Official Documentation
- 📘 [Terraform Core Docs](https://developer.hashicorp.com/terraform)
- 📗 [Provider Registry](https://registry.terraform.io/)
- 📙 [HCL Language Reference](https://developer.hashicorp.com/terraform/language)
- 🔧 [Libvirt Provider](https://registry.terraform.io/providers/dmacvicar/libvirt/)

### Learning Resources
- [HashiCorp Tutorials](https://developer.hashicorp.com/terraform/tutorials)
- [Terraform Best Practices](https://www.terraform-best-practices.com/)
- [Terraform Discuss Forum](https://discuss.hashicorp.com/c/terraform-core)

### Tools
- [Terraform Console](https://developer.hashicorp.com/terraform/cli/commands/console) - Interactive expression testing
- [Terraform Graph](https://developer.hashicorp.com/terraform/cli/commands/graph) - Visualize dependencies
- [tflint](https://github.com/terraform-linters/tflint) - Linter for Terraform

---

Ready to start? Begin with [Exercise 1: Hello Terraform](exercise-1-hello-terraform/)!
