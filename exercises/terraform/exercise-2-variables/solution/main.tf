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

# Fetch the Ubuntu cloud image
resource "libvirt_volume" "ubuntu_base" {
  name   = "${var.vm_name}-base"
  pool   = "default"
  source = var.ubuntu_image_url
  format = "qcow2"
}

# Create a disk volume for the VM
resource "libvirt_volume" "vm_disk" {
  name           = "${var.vm_name}-disk"
  base_volume_id = libvirt_volume.ubuntu_base.id
  pool           = "default"
  size           = var.disk_size
}

# Create the virtual machine
resource "libvirt_domain" "vm" {
  name   = var.vm_name
  memory = var.vm_memory
  vcpu   = var.vm_vcpu

  # Attach the disk
  disk {
    volume_id = libvirt_volume.vm_disk.id
  }

  # Configure network interface
  network_interface {
    network_name   = var.network_name
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
