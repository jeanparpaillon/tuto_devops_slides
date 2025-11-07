# main.tf - Exercise 1 Solution: Terraform Basics

terraform {
  required_version = ">= 1.5.0"
  required_providers {
    local = {
      source  = "hashicorp/local"
      version = "~> 2.4"
    }
  }
}

# A simple resource that creates a local file
resource "local_file" "hello" {
  content  = "Hello from Terraform!\nCreated at: ${timestamp()}"
  filename = "${path.module}/hello.txt"
}

# Output to display information
output "file_path" {
  description = "Path to the created file"
  value       = local_file.hello.filename
}
