
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
layout: two-cols-header
---

# Ansible - History

::left::

## Key Dates

- **2012**: Ansible project founded by Michael DeHaan
- **2013**: First public release
- **2015**: Acquired by Red Hat
- **2017+**: Rapid adoption in enterprise automation and cloud-native workflows

## Adoption

- Widely used for IT automation, configuration management, and orchestration
- Popular in DevOps, cloud, and hybrid environments
- Large ecosystem of modules and integrations

::right::

## Community

- Active open-source community
- Extensive documentation and resources
- Thousands of contributors and roles on [Ansible Galaxy](https://galaxy.ansible.com/)
- Regular conferences, meetups, and webinars

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

# Lab Presentation

**Objective**
- Use Docker containers as lab machines

**Do**
- Set up 3 Ubuntu Noble containers for Ansible

**Observe**
- Containers running and accessible

---

# Step 1: Prepare Lab Environment

**Objective**
- Create 3 containers ready for Ansible

**Do**

```sh
docker run -d --name master geerlingguy/docker-ubuntu2404-ansible sleep infinity
docker run -d --name worker1 geerlingguy/docker-ubuntu2404-ansible sleep infinity
docker run -d --name worker2 geerlingguy/docker-ubuntu2404-ansible sleep infinity
```

- Install Python in containers

**Observe**

- 3 running containers (docker ps)
- Ansible can connect (ansible_connection=docker)

---

## Docker Connection Plugin

**Objective**: Enable Ansible to connect to Docker containers

**Do**: Install the Docker connection plugin

```sh
pip install ansible-pylibssh
pip install docker
ansible-galaxy collection install community.docker
```

- Ensure `community.docker` is listed in `collections` in your playbook if needed

**Observe**

- Ansible can connect to containers using `ansible_connection: docker`

---
layout: two-cols-header
---

# Step 2: Inventory — Hosts & Groups

::left::

**Objective**: Define inventory in YAML

**Do**: `inventory.yml`

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
  vars:
    ansible_python_interpreter: /usr/bin/python3
```

::right::

- Test with ping:

```sh
ansible all -i inventory.yml -m ping
```

**Observe**

- All containers respond to ping

---
layout: two-cols-header
---

# Step 3: Variables — Sources & Groups

::left::

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

::right::

**Observe**

- Correct role displayed for each group
- `ansible-inventory --list -i inventory.yml`

---
layout: two-cols-header
---

# Step 4: Expand Inventory Groups

::left::

**Objective**

- Add masters and nodes groups

**Do**

- Update inventory.yml as above

::right::

**Observe**

- Group targeting works:

```sh
ansible -i inventory.yml masters -m ping
ansible -i inventory.yml nodes -m ping
```

---
layout: two-cols-header
---

# Step 5: Simple Playbook with Tasks

::left::

**Objective**

- Write and run a basic playbook

**Do**

site.yml:

```yaml
- hosts: all
  tasks:
    - name: Ensure Python is installed
      apt:
        name: python3
        state: present
      become: yes
```

```sh
ansible-playbook -i inventory.yml site.yml
```

::right::

**Observe**

- Python installed, playbook output shows changed/ok

---

# Ansible Roles - Overview

- Reusable, modular units of Ansible content
- Role structure:

```sh
roles/
    common/               # this hierarchy represents a "role"
        tasks/            #
            main.yml      #  <-- tasks file can include smaller files if warranted
        handlers/         #
            main.yml      #  <-- handlers file
        templates/        #  <-- files for use with the template resource
            ntp.conf.j2   #  <------- templates end in .j2
        files/            #
            bar.txt       #  <-- files for use with the copy resource
            foo.sh        #  <-- script files for use with the script resource
        vars/             #
            main.yml      #  <-- variables associated with this role
        defaults/         #
            main.yml      #  <-- default lower priority variables for this role
        meta/             #
            main.yml      #  <-- role dependencies
        library/          # roles can also include custom modules
        module_utils/     # roles can also include custom module_utils
        lookup_plugins/   # or other types of plugins, like lookup in this case
```

---

# Ansible Roles - Prepare project

In `ansible.cfg`:

```ini
[[defaults]]
roles_path = roles:~/.ansible/roles:/usr/share/ansible/roles
inventory = ./inventory.yml
```

---
layout: two-cols-header
---

# Step 6: Create a Role

::left::

## Objective

- Create a role to add README.md in HOME

## Do

```sh
ansible-galaxy init readme
```

Place your `README.md` file in `roles/readme/files/README.md`.

`roles/readme/tasks/main.yml`:

```yaml
- name: Copy README.md from role files to HOME
  copy:
    src: README.md
    dest: "{{ ansible_env.HOME }}/README.md"
```

::right::

`site.yml`:

```yaml
- hosts: all
  roles:
    - readme
```

## Observe

README.md created in each container's home

---
layout: two-cols-header
---

# Step 7: Add handler to Role

::left::

## Objective

- Add a handler to notify on README.md copy

## Do 

`roles/readme/tasks/main.yml`

```yaml
- name: Copy README.md from role files to HOME
  ...
  notify: README copied
```

::right::

`roles/readme/handlers/main.yml`

```yaml
- name: README copied
  debug:
    msg: "README.md has been copied successfully!"
```

- Execute playbook

## Observe

- Handler triggered only if README.md is copied (changed)

---
layout: two-cols-header
---

# Step 8: Idempotence - Bad Example

::left::

## Objective

- Demonstrate idempotence with directory creation

## Do `roles/readme/tasks/main.yml`

```yaml
- name: Create directory
  shell: mkdir ~/demo_dir
```

- Run playbook multiple times

::right::

## Observe

- First run: directory created (changed)
- Subsequent runs: fails with "File exists" error

---
layout: two-cols-header
---

# Step 9: Idempotence - Good Example

::left::

## Objective

- Demonstrate idempotence with directory creation

## Do `roles/readme/tasks/main.yml`

```yaml
- name: Create directory
  file:
    path: ~/demo_dir
    state: directory
```

- Run playbook multiple times

::right::

## Observe

- First run: directory created (changed)
- Subsequent runs: no changes (ok)

---

# Roles vs Collections

- Role: reusable tasks, vars, files, templates
- Collection: package of roles, modules, plugins

---
layout: two-cols-header
---

# Step 10: Use ansible-galaxy to Install Roles

::left::

## Objective

- Install and use a role from Ansible Galaxy
- Example: [Zabbix role](https://galaxy.ansible.com/ui/standalone/roles/oxlorg/zabbix/)

## Do

```sh
ansible-galaxy role install oxlorg.zabbix
```

`site.yml`:

```yaml
- hosts: all
  roles:
    - role: oxlorg.zabbix
  vars: 
    zabbix_agent_server: "192.168.100.10"
```

::right::

## Observe

- Zabbix agent installed and running in containers

---
layout: two-cols-header
---

# Step 10: Use ansible-galaxy to Install Collections

::left::

## Objective

- Install and use a collection from Ansible Galaxy
- Example: `community.general` collection

## Do

```sh
ansible-galaxy collection install community.general
```

::right::

## Note

- Use `requirements.yml` for managing multiple roles/collections
- Example `requirements.yml`:

```yaml
collections:
  - name: community.general
roles:
  - name: oxlorg.zabbix
```

- Use with:

```sh
ansible-galaxy install -r requirements.yml
```

---
layout: section
---

# Test with Molecule

---

# Molecule Overview

- **Purpose**: Test Ansible roles in isolated environments
- **Scope**:
    - Automates role testing (syntax, idempotence, functional)
    - Supports multiple drivers (Docker, Vagrant, cloud, etc.)
    - Integrates with Ansible Galaxy and CI pipelines
- **Why use Molecule?**
    - Ensures roles work as expected before production use
    - Standardizes testing workflow for Ansible roles

---

# Molecule - Architecture

- **Per role**
    - Each role has its own molecule/ directory
    - Custom scenarios for different environments
- **Test Steps**
    - `create`: Provision test environment (e.g., Docker containers)
    - `converge`: Apply the role/playbook
    - `verify`: Check results (assertions, tests)
    - `destroy`: Clean up environment
- **Config**
    - `molecule.yml` defines driver, provisioner, verifier, inventory, environment

---
layout: two-cols-header
---

# Step 11: Molecule - Add testing to readme role

::left::

## Objective

- Test that the README.md file is present in the home directory after running the role.

## Do

```sh
cd roles/readme
molecule init scenario --driver-name docker
```

Edit `molecule/default/converge.yml` to include the role:

```yaml
- hosts: all
  roles:
    - readme
```

::right::

Edit `molecule/default/verify.yml` to check for the file:

```yaml
- name: Verify README.md exists
  hosts: all
  tasks:
    - name: Check README.md presence
      stat:
        path: "{{ ansible_env.HOME }}/README.md"
      register: readme_file
    - name: Assert README.md exists
      assert:
        that:
          - readme_file.stat.exists
```

- Run the test: 

```sh
molecule test
```

---

# Step 12: Install k8s

## Objective

- Wrap-up day by installing Kubernetes components
- Hint: use kubespray collection
