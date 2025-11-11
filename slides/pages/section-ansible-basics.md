
# Ansible - Scope

## What Ansible Does

  - Automates configuration, deployment, and orchestration of systems
  - Manages packages, files, services, users, and application setup
  - Executes tasks over SSH (agentless)
  - Idempotent: ensures desired state

---

# Ansible - Scope

## What Ansible Does Not

- Does not provision or manage infrastructure resources directly (VMs, networks, cloud resources)

- Not designed for low-level resource creation (use Terraform for that)

---

# Ansible vs Terraform

## Terraform

> Focuses on infrastructure provisioning (VMs, networks, cloud services)

## Ansible

> Focuses on configuration and application management after resources exist

## Overlap

> Both can manage cloud resources, but Terraform is declarative for infra, Ansible is procedural for config

---

# Ansible - History

- key dates
- adoption
- community

---

# Ansible - CLI

- ansible-galaxy, ansible-playbook, ansible-inventory, ansible-doc (TBD)

---

# Ansible - Core concepts

- Inventory: hosts, groups, variables
- Playbook: YAML tasks executed against inventory
- Role: reusable collection of tasks, vars, templates, handlers

---

# Ansible - Scope

## What Ansible Does

  - Automates configuration, deployment, and orchestration of systems
  - Manages packages, files, services, users, and application setup
  - Executes tasks over SSH (agentless)
  - Idempotent: ensures desired state

---

# Ansible - Scope

## What Ansible Does Not

- Does not provision or manage infrastructure resources directly (VMs, networks, cloud resources)
- Not designed for low-level resource creation (use Terraform for that)

---

# Ansible vs Terraform

## Terraform

> Focuses on infrastructure provisioning (VMs, networks, cloud services)

## Ansible

> Focuses on configuration and application management after resources exist

## Overlap

> Both can manage cloud resources, but Terraform is declarative for infra, Ansible is procedural for config

---

# Ansible - History

- key dates
- adoption
- community

---

# Ansible - CLI

- ansible-galaxy, ansible-playbook, ansible-inventory, ansible-doc (TBD)

---

# Ansible - Core concepts

- Inventory: hosts, groups, variables
- Playbook: YAML tasks executed against inventory
- Role: reusable collection of tasks, vars, templates, handlers

---

# Ansible Lab — Full Day

---

## Caveats & Requirements

**Objective**
- Understand syntax, requirements, and architecture

**Do**
- Use YAML for playbooks/inventory, INI for config
- Ensure Python, pip, Docker, and Ansible are installed

**Observe**
- Correct file formats, working Ansible CLI

---

## Lab Presentation

**Objective**
- Use Docker containers as lab machines

**Do**
- Set up 3 Ubuntu Noble containers for Ansible

**Observe**
- Containers running and accessible

---

## Step 1: Prepare Lab Environment

**Objective**
- Create 3 containers ready for Ansible

**Do**
```sh
docker run -d --name master ubuntu:noble sleep infinity
docker run -d --name worker1 ubuntu:noble sleep infinity
docker run -d --name worker2 ubuntu:noble sleep infinity
```

- Install Python in containers

*Observe**

- 3 running containers (docker ps)
- Ansible can connect (ansible_connection=docker)

---

# Step 2: Inventory — Hosts & Groups

**Objective**

- Define inventory in YAML

**Do**

- inventory.yml:

```yaml
all:
  hosts:
    master:
      ansible_connection: docker
    worker1:
      ansible_connection: docker
    worker2:
      ansible_connection: docker
  children:
    masters:
      hosts:
        master:
    nodes:
      hosts:
        worker1:
        worker2:
```

- Test with ping:

```sh
ansible all -i inventory.yml -m ping
```

**Observe**

- All containers respond to ping

---

# Step 3: Variables — Sources & Groups

**Objective**

- Use variables from inventory and group_vars

**Do**

- Create `group_vars/masters.yml`:

```yaml
k8s_role: master
```

- Create `group_vars/nodes.yml`:

```yaml
k8s_role: worker
```

- Use debug in playbook:

```yaml
- name: Show role
  debug:
    var: k8s_role
```

**Observe**

- Correct role displayed for each group

---

# Step 4: Expand Inventory Groups

**Objective**

- Add masters and nodes groups

**Do**

- Update inventory.yml as above

**Observe**

- Group targeting works:

```sh
ansible -i inventory.yml masters -m ping
ansible -i inventory.yml nodes -m ping
```

