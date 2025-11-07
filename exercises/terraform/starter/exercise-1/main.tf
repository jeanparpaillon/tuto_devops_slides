# main.tf - Exercise 1: Terraform Basics
# Complete this file following the instructions in the README

terraform {
  required_version = ">= 1.5.0"
  required_providers {
    local = {
      source  = "hashicorp/local"
      version = "~> 2.4"
    }
  }
}

# TODO: Create a local_file resource named "hello"
# - content: "Hello from Terraform!\nCreated at: ${timestamp()}"
# - filename: "${path.module}/hello.txt"


# TODO: Create an output named "file_path"
# - description: "Path to the created file"
# - value: the filename of the local_file.hello resource
