# VM Identification
output "vm_id" {
  description = "The unique ID of the VM"
  value       = libvirt_domain.vm.id
}

output "vm_name" {
  description = "Name of the created VM"
  value       = libvirt_domain.vm.name
}

# Network Information
output "vm_ip" {
  description = "IP address of the VM"
  value       = try(libvirt_domain.vm.network_interface[0].addresses[0], "Waiting for IP...")
}

# Resource Allocation
output "vm_memory" {
  description = "Memory allocated to the VM (MB)"
  value       = libvirt_domain.vm.memory
}

output "vm_vcpu" {
  description = "Number of vCPUs allocated"
  value       = libvirt_domain.vm.vcpu
}

# Connection Information
output "ssh_connection" {
  description = "SSH connection string"
  value       = try("ssh ubuntu@${libvirt_domain.vm.network_interface[0].addresses[0]}", "Waiting for IP...")
}
