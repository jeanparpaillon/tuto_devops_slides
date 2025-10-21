---
theme: the-unnamed
title: DevOps en Production
mdc: true
---

# Formation **DevOps en Production**

## Jean Parpaillon — Consultant Informatique

> Automatiser du hardware à l'application, maîtriser l'ensemble de la chaîne de production.

---
layout: center
background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1526378722484-cccb8e8e3b70') center/cover
---

# Objectifs de la formation

- Comprendre les fondations du DevOps en production
- Déployer et orchestrer une infrastructure complète VMware → Kubernetes
- Automatiser le déploiement d’applications internes et externes avec Ansible
- Explorer les bonnes pratiques de sécurité, supervision et haute disponibilité

---
layout: section
background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1526378722484-cccb8e8e3b70') center/cover
---

# Programme général

## 5 jours intensifs

1. Concepts de base & automatisation complète
2. Cluster Kubernetes sur VMware (Terraform)
3. Déploiement Intranet avec Ansible
4. Déploiement API externe avec Ansible
5. Monitoring, haute dispo, sécurité & scaling

---
layout: section
background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1526378722484-cccb8e8e3b70') center/cover
---

# Jour 1 — Concepts de base

## Automatiser du hardware à l’application

### Objectifs :

- Comprendre la culture DevOps et ses piliers
- Découvrir la stack technique : VMware, Terraform, Kubernetes, Ansible

### Contenu :

- Introduction à DevOps : culture, CI/CD, IaC
- Architecture de production : virtualisation, conteneurs, orchestration
- Présentation des outils :
  - VMware vSphere : gestion d’infrastructure virtuelle
  - Terraform : infrastructure as code
  - Kubernetes : orchestration de conteneurs
  - Ansible : déploiement et configuration
- Mise en place de l’environnement de travail : outils, dépôt Git, SSH

---
layout: section
background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1581092795361-83a380e3c11b') center/cover
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

---
layout: section
background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1593642532400-2682810df593') center/cover
---

# Jour 3 — Application intranet avec Ansible

## Objectif : Déployer une application interne (type wiki ou portail RH)

### Contenu :

- Introduction à Ansible : inventaire, playbooks, rôles, variables
- Architecture de l’application intranet
- Création des rôles :
  - Base système (utilisateurs, SSH, sécurité)
  - Application (services, config, templates)
- Exécution et déploiement automatisé
- Tests fonctionnels et validation dans Kubernetes ou sur VMs

---
layout: section
background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1519389950473-47ba0277781c') center/cover
---

# Jour 4 — Application externe / API

## Objectif : Déployer une application exposée publiquement

### Contenu :

- Enjeux : sécurité, DNS, certificats, observabilité
- Préparation : ingress controller, TLS, firewall
- Atelier pratique :
  - Déploiement d’une API REST (Flask, FastAPI…)
  - Configuration du load balancer / ingress
  - Gestion des secrets (Ansible Vault)
- Intégration dans pipeline CI/CD

---
layout: section
background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d') center/cover
---

# Jour 5 — Usages avancés

## Monitoring • Haute disponibilité • Sécurité • Scaling

### Contenu :

- **Monitoring & observabilité**
  - Prometheus, Grafana, Loki, Alertmanager
- **Haute disponibilité**
  - Réplication, StatefulSets, anti-affinités, PDB
- **Sécurité**
  - RBAC, scans (Trivy, kube-bench), Vault
- **Scaling**
  - Horizontal Pod Autoscaler, Cluster Autoscaler
  - Tests de charge (k6, Artillery)

---
layout: section
background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d') center/cover
---

# Conclusion & perspectives

- Revue des acquis : IaC, orchestration, automatisation applicative
- Bonnes pratiques de production
- Ouverture : GitOps, ArgoCD, CI/CD avancée
- Questions, retours d’expérience, échanges
