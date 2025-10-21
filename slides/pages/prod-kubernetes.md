---
layout: section
---

# Jour 2 — Cluster Kubernetes sur VMware

## Objectif : Automatiser le déploiement d’un cluster K8s complet avec Terraform

### Contenu :

- Rappels sur Terraform : provider vSphere, variables, état distant
- Conception de l’architecture : masters, workers, réseau, stockage
- Atelier pratique :
  - Fichiers `.tf` pour VMs Kubernetes
  - Provisionnement des nœuds via Terraform
  - Initialisation du cluster (kubeadm)
- Validation et tests : `kubectl get nodes`, CNI (Calico/Flannel)
