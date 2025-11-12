# Kubernetes Project

- **History**: Originated at Google, open-sourced in 2014
- **Community & Support**: Large, active open-source community; supported by CNCF (Cloud Native Computing Foundation)
- **Adoption**: Widely used by enterprises and cloud providers; de facto standard for container orchestration.
- **Extensibility**: Modular architecture; supports custom controllers, operators, and plugins.
- **Ecosystem**: Rich set of tools for monitoring, networking, storage, and CI/CD integrations.

## Alternatives

- Docker Swarm
- Nomad by HashiCorp

---

# Kubernetes Resources

- [Kubernetes Official Website](https://kubernetes.io/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Kubernetes GitHub Repository](https://github.com/kubernetes/kubernetes)
- [Kubernetes Example Manifests (GitHub)](https://github.com/kubernetes/examples)
- [WordPress + MySQL Kubernetes YAML (Official Docs)](https://kubernetes.io/docs/tutorials/stateful-application/mysql-wordpress-persistent-volume/)
- [Kubernetes Manifest Samples](https://github.com/kubernetes/website/tree/main/content/en/examples)


---
layout: section
---

# Kubernetes Ecosystem Projects

---

# Distributions

- [OpenShift](https://www.openshift.com/)
  - Enterprise Kubernetes by Red Hat
- [Rancher Kubernetes](https://rancher.com/)
  - Multi-cluster management (SuSE)
- [K3s](https://k3s.io/)
  - Lightweight Kubernetes by Rancher Labs
- [MicroK8s](https://microk8s.io/)
  - Lightweight, single-node Kubernetes by Canonical
  - Ideal for local development and edge computing

---

# Package Management

- [Helm](https://helm.sh/)
  - Kubernetes package manager
- [MicroK8s add-ons](https://microk8s.io/docs/addons)
  - Built-in add-ons for easy deployment of common services

---

# Monitoring & Logging

- [Prometheus](https://prometheus.io/)
  - Metrics collection
- [Grafana](https://grafana.com/)
  - Visualization dashboards
- [ELK Stack](https://www.elastic.co/what-is/elk-stack) (Elasticsearch, Logstash, Kibana)
  - Logging
- [Loki](https://grafana.com/oss/loki/)
  - Log aggregation for Kubernetes

---

# CI/CD Tools

- [Argo CD](https://argo-cd.readthedocs.io/en/stable/)
  - GitOps continuous delivery
- [Jenkins X](https://jenkins-x.io/)
  - Kubernetes-native CI/CD
- [Tekton](https://tekton.dev/)
  - Cloud-native CI/CD pipelines

---

# Service Meshes

- [Istio](https://istio.io/)
  - Traffic management, security, observability
- [Linkerd](https://linkerd.io/)
  - Lightweight service mesh
- [Consul](https://www.consul.io/)
  - Service discovery and mesh

---

# Operators & Add-ons

- [Cert-Manager](https://cert-manager.io/)
  - Automated TLS certificates
- [External-DNS](https://github.com/kubernetes-sigs/external-dns)
  - DNS records management
- [Velero](https://velero.io/)
  - Backup and restore
- [KubeVirt](https://kubevirt.io/)
  - Run VMs in Kubernetes

---

# Setup lab with microk8s

## Linux (Ubuntu)

```bash
# Install microk8s
sudo snap install microk8s --classic
# Add current user to microk8s group
sudo adduser $USER microk8s
# Check microk8s status
microk8s status --wait-ready
# Enable DNS and dashboard
microk8s enable dns dashboard
# Check nodes
microk8s kubectl get nodes
```

## Windows / MacOS

See: https://microk8s.io/

---
layout: image
image: /k8s_arch.png
backgroundSize: 70%
---

# Kubernetes Architecture

---

# Kubernetes Components

- **Master Node**: Manages the cluster, runs control plane components
  - API Server: central management point
  - etcd (key-value store): stores cluster state
  - Controller Manager: converge cluster state
  - (Cloud Controller Manager): integrates with cloud providers
  - Scheduler: assigns pods to nodes

- **Worker Nodes**: Run application workloads
  - Kubelet: manages pods on the node
  - Kube-Proxy: network proxy and load balancer
  - Container Runtime (e.g., Docker, containerd)

---

# Kubernetes Commands - kubectl

- List all nodes in the cluster

```bash
kubectl get nodes
```

- List all pods in the cluster

```bash
kubectl get pods
```

- Show detailed information about a specific pod

```bash
kubectl describe pod <pod-name>
```

- Apply a configuration from a YAML file

```bash
kubectl apply -f <file.yaml>
```

- Delete resources defined in a YAML file

```bash
kubectl delete -f <file.yaml>
```

---

# Kubernetes Commands - kubeadm

- Initialize a Kubernetes control-plane node

```bash
kubeadm init --pod-network-cidr=<cidr>
```

- Join a worker node to the cluster

```bash
kubeadm join <master-ip>:<port> --token <token> --discovery-token-ca-cert-hash <hash>
```

---

# Kubernetes Concepts - Networking

- Every pod gets its own IP address
- Pods can communicate with each other across nodes
- Services provide stable endpoints for accessing pods
- Various network plugins (CNI) available for different use cases

---

# Kubernetes Concepts - Network Implementations

<div class="text-xs">

| Feature                | Flannel                          | Calico                                   | Weave                          |
|------------------------|----------------------------------|------------------------------------------|--------------------------------|
| **Type**               | Overlay network (L3)             | Native routing (L3), network policy      | Overlay network (L2/L3)        |
| **Network Model**      | VXLAN, host-gw, UDP              | BGP, IP-in-IP, VXLAN                     | FastDP, sleeve (UDP)           |
| **Network Policy**     | No                               | Yes (Kubernetes NetworkPolicy support)   | Basic (limited)                |
| **Performance**        | Moderate                         | High                                     | Moderate                       |
| **Simplicity**         | Very simple to set up            | More complex, flexible                   | Simple, automatic mesh         |
| **Use Cases**          | Small/medium clusters            | Large clusters, security-focused         | Small clusters, ease of use    |
| **Documentation**      | Good                             | Excellent                                | Good                           |
| **Persistent IPs**     | No                               | Yes                                      | Yes                            |
| **Encryption**         | No (VXLAN only)                  | Optional (WireGuard/IPsec)               | Yes (optional)                 |

</div>

---

# Kubernetes Concepts - Network Implementations

- Flannel: Best for simple setups, easy to deploy.
- Calico: Advanced features, network policies, high performance.
- Weave: Easiest mesh networking, good for small clusters.

---

# Kubernetes Concepts - Container

- Containers are the standard unit of software packaging
- Kubernetes supports multiple container runtimes (Docker, containerd, CRI-O)
- Containers run within pods, sharing resources and network

## Running container with Docker

```bash
docker run -d --name mynginx -p 8080:80 nginx
```

Visit `http://localhost:8080` to see the Nginx welcome page.

---
layout: two-cols-header
---

# Kubernetes Concepts - Pods


- The smallest deployable unit in Kubernetes
- Encapsulates one or more containers sharing storage and network
- Containers in a pod run on the same node and can communicate easily

::left::

## Running container with Kubernetes


```yaml
apiVersion: v1
kind: Pod
metadata:
  name: mynginx
spec:
  containers:
  - name: nginx
    image: nginx
    ports:
    - containerPort: 80
```
::right::

Apply the manifest:

```bash
kubectl apply -f mynginx-pod.yaml
```

---
layout: image-right
image: /k8s_rs.png
backgroundSize: 90%
---

# Kubernetes Concepts - ReplicaSets

- Ensures a specified number of pod replicas are running at all times
- Automatically replaces failed pods
- Used by Deployments to maintain pod availability

---
layout: image-right
image: /k8s_depl.png
backgroundSize: 90%
---

# Kubernetes Concepts - Deployments

- Declarative way to manage stateless applications
- Handles rolling updates, rollbacks, and scaling
- Ensures the desired number of pod replicas are running

---
layout: image-right
image: /k8s_service.png
backgroundSize: 90%
---

# Kubernetes Concepts - Service

- Abstraction that exposes a set of pods as a network service
- Enables stable networking and load balancing for pods
- Types: ClusterIP, NodePort, LoadBalancer

---
layout: image-right
image: /kubernetes-namespaces.png
backgroundSize: 90%
---

# Kubernetes Concepts - Namespaces

- Logical partitions within a Kubernetes cluster
- Isolate resources and workloads for multi-tenancy
- Useful for organizing environments (dev, test, prod)

---
layout: two-cols-header
---

# Kubernetes Concepts - ConfigMaps and Secrets

- ConfigMaps: Store non-sensitive configuration data as key-value pairs
- Secrets: Store sensitive information (passwords, tokens) securely
- Both can be injected into pods as environment variables or files

::left::

<div class="text-xs">

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: myconfigmap
data:
  username: k8s-admin
  access_level: "1"
```

</div>

::right::

<div class="text-xs">

```yaml
apiVersion: v1
kind: Pod
...
spec:
    containers:
      ...
      envFrom:
        - configMapRef:
            name: myconfigmap
    volumeMounts:
        - name: foo
        mountPath: "/etc/foo"
        readOnly: true
    volumes:
    - name: foo
        configMap:
        name: myconfigmap
```

</div>

---

# Kubernetes Concepts - Volumes and Persistent Storage

- Volumes provide persistent storage for pods
- Support for various backends: local disk, NFS, cloud storage
- PersistentVolume (PV) and PersistentVolumeClaim (PVC) manage storage lifecycle

---

# Lab - Deploying a Simple Application

## Exercise: Deploy WordPress with MySQL on Kubernetes

**Objective:**  
Deploy a WordPress application with a MySQL backend using `kubectl` commands and Kubernetes manifests.


---

# Lab - Deploy MySQL

- Create a `mysql-deployment.yaml` manifest with environment variables for root password, database name, user, and password.
- Apply the manifest:
  ```bash
  kubectl apply -f mysql-deployment.yaml -n wordpress-demo
  ```

---

# Lab - Deploy WordPress

  - Create a `wordpress-deployment.yaml` manifest referencing the MySQL service.
  - Apply the manifest:
    ```bash
    kubectl apply -f wordpress-deployment.yaml -n wordpress-demo
    ```
---

# Lab - Expose WordPress Service

  - Create a `wordpress-service.yaml` to expose WordPress via `NodePort`.
  - Apply the manifest:
    ```bash
    kubectl apply -f wordpress-service.yaml -n wordpress-demo
    ```

---

# Lab - Verify Deployment

  - Check pods and services:
    ```bash
    kubectl get pods -n wordpress-demo
    kubectl get svc -n wordpress-demo
    ```
  - Access WordPress using the exposed service URL.

---
layout: two-cols-header
---

# Lab - Secrets


## Objective

Securely store MySQL root password using Kubernetes Secrets.

::left::

## Steps

- Create a `mysql-secret.yaml` manifest to store the MySQL root password.
- Apply the manifest:
  ```bash
  kubectl create secret generic lab-secrets \
    --from-literal=mysql-root-password=password
  ```

::right::

- Update `mysql-deployment.yaml` to reference the secret for the root password.

```yaml
    - name: MYSQL_ROOT_PASSWORD
      valueFrom:
        secretKeyRef:
          name: lab-secrets
          key: mysql-root-password
```

- Reapply the updated MySQL deployment:
  ```bash
  kubectl apply -f mysql-deployment.yaml
  ```

---

# Kubernetes Concepts - Persistent Storage

- PersistentVolumes (PV): Cluster-wide storage resources
- PersistentVolumeClaims (PVC): Requests for storage by users
- StorageClasses: Define different types of storage (e.g., SSD, HDD)

---
layout: two-cols-header
---

# Kubernetes Concepts - PV vs PVC

::left::

- **PersistentVolume (PV)**:
  - A piece of storage in the cluster that has been provisioned by an administrator or dynamically provisioned using Storage Classes.
  - It is a resource in the cluster just like a node is a cluster resource.

- **PersistentVolumeClaim (PVC)**:
  - A request for storage by a user. It is similar to a pod.
  - Pods can request specific levels of resources (CPU and Memory).
  - PVCs can request specific size and access modes (e.g., ReadWriteOnce, ReadOnlyMany).

::right::

When to use PV and PVC:
- Use PVs when you need to manage storage resources in your cluster.
- Use PVCs when you want to request storage for your applications without needing to know the details

---

# Lab - Persistent Storage

## Objective

Persist MySQL data using PersistentVolumes and PersistentVolumeClaims.

## Steps

- Create a `mysql-pv.yaml` manifest defining a PersistentVolume.
- Create a `mysql-pvc.yaml` manifest defining a PersistentVolumeClaim.
- Update `mysql-deployment.yaml` to use the PVC for data storage.

- Apply the manifests:
  ```bash
  kubectl apply -f mysql-pv.yaml
  kubectl apply -f mysql-pvc.yaml
  kubectl apply -f mysql-deployment.yaml
  ``` 


---

# Discussion

- What challenges did you face during deployment?
- How does Kubernetes handle service discovery between WordPress and MySQL?
- How would you persist data for MySQL using PersistentVolumes?

**Bonus:**  
Try scaling the WordPress deployment and observe the changes.
