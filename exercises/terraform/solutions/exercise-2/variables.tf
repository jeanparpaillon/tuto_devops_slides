# variables.tf - Exercise 2 Solution

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

variable "network_cidr" {
  description = "CIDR for the VM network"
  type        = string
  default     = "192.168.100.0/24"
}
