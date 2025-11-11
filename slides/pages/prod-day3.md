
---
layout: section
---

# Day 3 — Ansible

---

# Day 2 recap — Terraform Foundations

- Learned Terraform syntax and workflow (init, plan, apply)
- Understood infrastructure-as-code principles for repeatable environments
- Hands-on exercise:  
  - Built a mini-cluster of virtual machines (1 master, 2 workers) using Terraform

## Caveats

- Differences between stored state (`.tfstate`) and real state (libvirt)
  - E.g., pool created outside Terraform
- VMs are created but not configured

---
layout: section
---

# Day 3 - Objectives

- Understand inventories, playbooks, roles
- Write simple idempotent playbooks
- Use Galaxy roles (e.g., Kubespray collection)
- Test Ansible locally

---
src: ./section-ansible-basics.md
---

---

# Day 3 - Day Wrap-Up

## What We Achieved

- Explored Ansible concepts, CLI, and architecture
- Built and managed inventories, groups, and variables
- Created and ran playbooks and roles
- Practiced idempotence and best practices
- Used Ansible Galaxy for roles and collections
- Automated configuration on Docker-based lab machines
