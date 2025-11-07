# variables.tf - Exercise 3 Solution

variable "masters" {
  description = "Number of master nodes"
  type        = number
  default     = 1
}

variable "workers" {
  description = "Number of worker nodes"
  type        = number
  default     = 2
}

variable "vm_memory" {
  description = "Memory for each VM in MB"
  type        = number
  default     = 2048
}

variable "vm_vcpu" {
  description = "Number of vCPUs for each VM"
  type        = number
  default     = 2
}

variable "disk_size" {
  description = "Disk size for each VM in bytes"
  type        = number
  default     = 10737418240  # 10 GB
}

variable "ssh_public_key" {
  description = "SSH public key for VM access"
  type        = string
}
