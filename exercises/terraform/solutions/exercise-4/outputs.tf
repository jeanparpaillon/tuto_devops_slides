# outputs.tf - Exercise 4 Solution: Outputs and Ansible Inventory

# Master node information
output "master_ips" {
  description = "IP addresses of master nodes"
  value = [
    for domain in libvirt_domain.master :
    domain.network_interface[0].addresses[0]
  ]
}

output "master_names" {
  description = "Hostnames of master nodes"
  value = [
    for domain in libvirt_domain.master :
    domain.name
  ]
}

# Worker node information
output "worker_ips" {
  description = "IP addresses of worker nodes"
  value = [
    for domain in libvirt_domain.worker :
    domain.network_interface[0].addresses[0]
  ]
}

output "worker_names" {
  description = "Hostnames of worker nodes"
  value = [
    for domain in libvirt_domain.worker :
    domain.name
  ]
}

# All node IPs for convenience
output "all_ips" {
  description = "All VM IP addresses"
  value = concat(
    [for domain in libvirt_domain.master : domain.network_interface[0].addresses[0]],
    [for domain in libvirt_domain.worker : domain.network_interface[0].addresses[0]]
  )
}

# Inventory summary
output "inventory_summary" {
  description = "Quick inventory summary"
  value = <<-EOT
  
  Kubernetes Cluster Inventory:
  =============================
  
  Masters (${var.masters}):
  ${join("\n  ", [for i, domain in libvirt_domain.master : "${domain.name}: ${domain.network_interface[0].addresses[0]}"])}
  
  Workers (${var.workers}):
  ${join("\n  ", [for i, domain in libvirt_domain.worker : "${domain.name}: ${domain.network_interface[0].addresses[0]}"])}
  
  EOT
}

output "inventory_file" {
  description = "Path to generated Ansible inventory"
  value       = local_file.ansible_inventory.filename
}
