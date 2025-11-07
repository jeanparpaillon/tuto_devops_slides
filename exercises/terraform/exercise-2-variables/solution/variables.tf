# VM Configuration
variable "vm_name" {
  description = "Name of the virtual machine"
  type        = string
  default     = "terraform-vm-1"
}

variable "vm_memory" {
  description = "Memory allocation for the VM in MB"
  type        = number
  default     = 2048
}

variable "vm_vcpu" {
  description = "Number of virtual CPUs"
  type        = number
  default     = 1
}

# Disk Configuration
variable "disk_size" {
  description = "Size of the VM disk in bytes"
  type        = number
  default     = 10737418240 # 10 GB
}

# Image Configuration
variable "ubuntu_image_url" {
  description = "URL to the Ubuntu cloud image"
  type        = string
  default     = "https://cloud-images.ubuntu.com/jammy/current/jammy-server-cloudimg-amd64.img"
}

# Network Configuration
variable "network_name" {
  description = "Name of the libvirt network to use"
  type        = string
  default     = "default"
}
