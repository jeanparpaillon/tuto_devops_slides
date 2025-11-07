# main.tf - Exercise 2 Solution: VM Infrastructure with Libvirt

terraform {
  required_version = ">= 1.5.0"
  required_providers {
    libvirt = {
      source  = "dmacvicar/libvirt"
      version = "~> 0.7"
    }
  }
}

# Configure the Libvirt provider
provider "libvirt" {
  uri = "qemu:///system"
}

# Base OS image - Ubuntu 22.04
resource "libvirt_volume" "base" {
  name   = "ubuntu-22.04-base.qcow2"
  pool   = "default"
  source = "https://cloud-images.ubuntu.com/releases/22.04/release/ubuntu-22.04-server-cloudimg-amd64.img"
  format = "qcow2"
}

# Master node volumes
resource "libvirt_volume" "master" {
  count          = var.masters
  name           = "master-${count.index + 1}.qcow2"
  base_volume_id = libvirt_volume.base.id
  pool           = "default"
  size           = var.disk_size
  format         = "qcow2"
}

# Master node domains
resource "libvirt_domain" "master" {
  count  = var.masters
  name   = "k8s-master-${count.index + 1}"
  memory = var.vm_memory
  vcpu   = var.vm_vcpu

  disk {
    volume_id = libvirt_volume.master[count.index].id
  }

  network_interface {
    network_name   = "default"
    wait_for_lease = true
  }

  console {
    type        = "pty"
    target_type = "serial"
    target_port = "0"
  }

  graphics {
    type        = "vnc"
    listen_type = "address"
    autoport    = true
  }
}

# Worker node volumes
resource "libvirt_volume" "worker" {
  count          = var.workers
  name           = "worker-${count.index + 1}.qcow2"
  base_volume_id = libvirt_volume.base.id
  pool           = "default"
  size           = var.disk_size
  format         = "qcow2"
}

# Worker node domains
resource "libvirt_domain" "worker" {
  count  = var.workers
  name   = "k8s-worker-${count.index + 1}"
  memory = var.vm_memory
  vcpu   = var.vm_vcpu

  disk {
    volume_id = libvirt_volume.worker[count.index].id
  }

  network_interface {
    network_name   = "default"
    wait_for_lease = true
  }

  console {
    type        = "pty"
    target_type = "serial"
    target_port = "0"
  }

  graphics {
    type        = "vnc"
    listen_type = "address"
    autoport    = true
  }
}
