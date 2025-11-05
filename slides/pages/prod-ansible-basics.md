---
layout: section
---

# Day 3 — Ansible basics

## Objectives

- Understand inventories, playbooks, roles
- Write simple idempotent playbooks
- Use Galaxy roles (e.g., Kubespray collection)
- Test Ansible locally

---

# Core concepts

- Inventory: hosts, groups, variables
- Playbook: YAML tasks executed against inventory
- Role: reusable collection of tasks, vars, templates, handlers

---

# Simple playbook example

```yaml
---
- name: Ensure packages and a file
  hosts: all
  become: true
  tasks:
    - name: Ensure packages
      package:
        name: [ 'curl', 'vim' ]
        state: present
    - name: Write a file
      copy:
        dest: /etc/example.conf
        content: |
          key=value
```

---

# Galaxy and collections

- Install roles/collections with requirements.yml
- Example: use kubespray collection to provision K8s

```yaml
# requirements.yml
collections:
  - name: kubernetes.core
  - name: kubespray.kubespray
```

```sh
ansible-galaxy install -r requirements.yml
```

---

# Testing Ansible

- ansible -m ping all
- Molecule for role testing
- CI lint and syntax-check
