# main.tf - Exercise 2: VM Infrastructure with Libvirt
# Complete this file following the instructions in the README

terraform {
  required_version = ">= 1.5.0"
  required_providers {
    libvirt = {
      source  = "dmacvicar/libvirt"
      version = "~> 0.7"
    }
  }
}

# TODO: Configure the libvirt provider
# uri = "qemu:///system"


# TODO: Create base Ubuntu image volume
# resource "libvirt_volume" "base"
# - name: "ubuntu-22.04-base.qcow2"
# - pool: "default"
# - source: "https://cloud-images.ubuntu.com/releases/22.04/release/ubuntu-22.04-server-cloudimg-amd64.img"
# - format: "qcow2"


# TODO: Create master node volumes
# Use count = var.masters
# - name: "master-${count.index + 1}.qcow2"
# - base_volume_id: libvirt_volume.base.id
# - pool: "default"
# - size: var.disk_size


# TODO: Create master node domains (VMs)
# Use count = var.masters
# - name: "k8s-master-${count.index + 1}"
# - memory: var.vm_memory
# - vcpu: var.vm_vcpu
# - Add disk block with volume_id
# - Add network_interface with network_name = "default" and wait_for_lease = true
# - Add console and graphics blocks (see README for examples)


# TODO: Repeat for worker nodes
# Create libvirt_volume "worker" and libvirt_domain "worker"
# Use count = var.workers
# - name: "k8s-worker-${count.index + 1}"
