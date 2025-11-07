# Configure Terraform and required providers
terraform {
  required_providers {
    libvirt = {
      source  = "dmacvicar/libvirt"
      version = "~> 0.7"
    }
  }
}

# Configure the libvirt provider
provider "libvirt" {
  uri = "qemu:///system"
}

# Fetch the Ubuntu 22.04 cloud image
resource "libvirt_volume" "ubuntu_base" {
  name   = "ubuntu-22.04-base"
  pool   = "default"
  source = "https://cloud-images.ubuntu.com/jammy/current/jammy-server-cloudimg-amd64.img"
  format = "qcow2"
}

# Create a disk volume for the VM
resource "libvirt_volume" "vm_disk" {
  name           = "terraform-vm-1-disk"
  base_volume_id = libvirt_volume.ubuntu_base.id
  pool           = "default"
  size           = 10737418240 # 10 GB in bytes
}

# Create the virtual machine
resource "libvirt_domain" "vm" {
  name   = "terraform-vm-1"
  memory = "2048" # 2 GB in MB
  vcpu   = 1

  # Attach the disk
  disk {
    volume_id = libvirt_volume.vm_disk.id
  }

  # Configure network interface
  network_interface {
    network_name   = "default"
    wait_for_lease = true
  }

  # Enable console for debugging
  console {
    type        = "pty"
    target_type = "serial"
    target_port = "0"
  }

  # VNC graphics for GUI access if needed
  graphics {
    type        = "vnc"
    listen_type = "address"
    autoport    = true
  }
}
