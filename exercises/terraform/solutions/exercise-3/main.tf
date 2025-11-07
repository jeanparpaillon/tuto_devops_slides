# main.tf - Exercise 3 Solution: Cloud-init Configuration

terraform {
  required_version = ">= 1.5.0"
  required_providers {
    libvirt = {
      source  = "dmacvicar/libvirt"
      version = "~> 0.7"
    }
  }
}

provider "libvirt" {
  uri = "qemu:///system"
}

# Base OS image
resource "libvirt_volume" "base" {
  name   = "ubuntu-22.04-base.qcow2"
  pool   = "default"
  source = "https://cloud-images.ubuntu.com/releases/22.04/release/ubuntu-22.04-server-cloudimg-amd64.img"
  format = "qcow2"
}

# Cloud-init configuration for master nodes
data "template_file" "master_cloud_init" {
  count    = var.masters
  template = file("${path.module}/cloud-init.yaml")
  
  vars = {
    hostname       = "k8s-master-${count.index + 1}"
    ssh_public_key = var.ssh_public_key
  }
}

# Cloud-init configuration for worker nodes
data "template_file" "worker_cloud_init" {
  count    = var.workers
  template = file("${path.module}/cloud-init.yaml")
  
  vars = {
    hostname       = "k8s-worker-${count.index + 1}"
    ssh_public_key = var.ssh_public_key
  }
}

# Cloud-init disk for master nodes
resource "libvirt_cloudinit_disk" "master" {
  count     = var.masters
  name      = "master-${count.index + 1}-cloudinit.iso"
  user_data = data.template_file.master_cloud_init[count.index].rendered
  pool      = "default"
}

# Cloud-init disk for worker nodes
resource "libvirt_cloudinit_disk" "worker" {
  count     = var.workers
  name      = "worker-${count.index + 1}-cloudinit.iso"
  user_data = data.template_file.worker_cloud_init[count.index].rendered
  pool      = "default"
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

  cloudinit = libvirt_cloudinit_disk.master[count.index].id

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

  cloudinit = libvirt_cloudinit_disk.worker[count.index].id

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
