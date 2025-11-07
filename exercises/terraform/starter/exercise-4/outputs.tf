# outputs.tf - Exercise 4: Outputs and Ansible Inventory

# TODO: Create output for master_ips
# output "master_ips" {
#   description = "IP addresses of master nodes"
#   value = [
#     for domain in libvirt_domain.master :
#     domain.network_interface[0].addresses[0]
#   ]
# }


# TODO: Create output for master_names


# TODO: Create output for worker_ips


# TODO: Create output for worker_names


# TODO: Create output for all_ips (concat masters and workers)


# TODO: Create inventory_summary output with formatted text
# Use <<-EOT ... EOT heredoc syntax
