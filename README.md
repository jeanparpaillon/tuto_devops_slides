# Formation DevOps

* Novembre 2025
* Alger

```sh
pnpm dev:dev
pnpm dev:prod
```

## Formation dev

1. Versioning et GitHub
    1. Introduction
        1. Concepts de base
        2. Importance du Versioning
        3. Outils populaires
    2. git
        1. Commandes de base locales
            1. git init
            2. git add
            3. git commit
        2. Commandes distantes
            1. git push
            2. git pull
            3. git clone
    3. GitHub
        1. Création de dépôt
        2. Gestion des branches
        3. Pull Requests
        4. Code Review
    4. Collaboration avec GitHub
        1. Issues
        2. Projects
        3. Wikis
    5. Exercices
        1. Création d'un projet collaboratif
        2. Gestion de conflits de fusion
2. Intégration continue (CI) avec GitHub Actions
    1. Introduction CI
        1. Concepts de base
        2. Avantages
    2. Configuration GitHub Actions
        1. Création d'un workflow
        2. Déclencheurs
        3. Actions
    3. Automatisation des tests
    4. Personnalisation des workflows
        1. Utilisation des conditions
        2. Personnalisation des conteneurs
        3. Création d'actions personnalisées
    5. Déploiement continu (CD)
        1. Configuration des pipelines de déploiement
        2. Tests en environnement de production
    6. Exercices
        1. Mise en place d'un pipeline CI/CD complet
        2. Tests et déploiements automatiques
3. Artifactory, prise en main
    1. Introduction
        1. Présentation du production
        2. Gestion des artefacts et dépendances
    2. Installation et configuration
        1. Installation
        2. Configuration initiale
        3. Accès à l'interface utilisateur
    3. Interface utilisateur
        1. Exploration de l'UI
        2. Recherche des artefacts
        3. Gestion des artefacts
    4. Gestion des dépôts
        1. Dépôt NuGet
        2. Dépôt NPM
    5. Utilisation de XRAY
        1. Accès aux artefacts via XRAY
        2. Téléchargement des artefacts
    6. Exercices
        1. Création d'un dépôt NuGet
        2. Ajout des artefacts
        3. Gestion des artefacts
4. Configuration et Automatisation
    1. Configuration avancée
        1. Paramètres base de données
        2. Stockage basé sur des checksums
        3. Configuration des serveurs de fichiers
    2. Gestion des utilisateurs et permissions
        1. Création d'utilisateurs
        2. Attribution des permissions
        3. Gestion des groupes
    3. Intégration CI/CD
        1. Configuration des pipelines
        2. Intégration GitHub Actions
    4. Automatisation des flux de travail
        1. Création de workflows
        2. Automatisation des tests
        3. Automatisation des déploiements
    5. Exercices
        1. Création d'un pipeline CI/CD complet
        2. Tests automatiques
        3. Déploiements automatiques
    6. Sécurisation de l'infrastructure
        1. Configuration des règles de sécurité
        2. Gestion des secrets
        3. Durcissement des configurations
5. Configuration avancée
    1. Optimisation des performances
        1. Techniques d'optimisation
        2. Amélioration des performances
    2. Analyse et reporting
        1. Outils de reporting
        2. Analyse des performances
        3. Analyse des utilisations
    3. Mises à jour et maintenance
        1. Processus de mises à jour
        2. Gestion des correctifs
        3. Gestion des versions
    4. Cas d'utilisation avancés
        1. Études de cas
        2. Scénarios avancés
        3. Mise en œuvre

## Formation prod

### Jour 1 — Concepts de base & chaîne d'automatisation DevOps

_Objectif_ : Comprendre les fondations DevOps, les enjeux de l'automatisation de l'infrastructure à l'application, et les outils clés de la stack (VMware, Terraform, Kubernetes, Ansible).

_Contenu_

* Introduction à DevOps en production
    * Définition, objectifs (collaboration, vitesse, fiabilité)
    * Culture DevOps : CI/CD, infrastructure as code, observabilité
    * Rappels sur les environnements de production (exigences, contraintes)
* Chaîne d’automatisation complète : du hardware à l’application
    * Pourquoi automatiser ? Temps, fiabilité, traçabilité
    * Comparaison des approches traditionnelles vs DevOps
* Panorama des outils utilisés
    * VMware vSphere : virtualisation en environnement pro
    * Terraform : infrastructure as code
    * Kubernetes : orchestration de conteneurs
    * Ansible : configuration et déploiement applicatif
* Mise en place des prérequis
    * Présentation de l’environnement de lab (VMs, vSphere, K8s, etc.)
    * Installation des outils : Terraform, Ansible, kubectl, Helm
    * Préparation du projet Git (structure, branches, README)

### Jour 2 — Mise en place d’un cluster Kubernetes sur VMware avec Terraform

_Objectif_ : Automatiser la création d’un cluster Kubernetes (VMs, réseau, stockage) avec Terraform sur une infra VMware.

_Contenu_ :

* Rappels sur Terraform
    * Fichiers .tf, providers, état
    * Provider vSphere : connexion, ressources, variables
* Infrastructure cible
    * Schéma d’architecture cible (master, workers, etc.)
    * Réseau, stockage, DNS (selon le lab)
* Atelier pratique :
    * Écriture des fichiers Terraform pour créer les VMs
    * Provisionnement des nœuds Kubernetes
    * Configuration réseau & DNS
    * Lancement, debug, validation
* Installation de Kubernetes (Kubeadm)
    * Initialisation du cluster, kubeconfig
    * Ajout des nœuds workers
    * Installation de CNI (e.g. Calico, Flannel)
* Validation du cluster
    * kubectl get nodes, kubectl get pods -A

### Jour 3 — Déploiement d’une application intranet avec Ansible

_Objectif_ : Déployer une application interne (non exposée publiquement) en utilisant Ansible.

_Contenu_ :

* Introduction à Ansible
    * Inventaire, modules, rôles
    * Playbooks, variables, templates
* Architecture de l'application intranet
    * Exemple : wiki, CRM interne, ou portail RH
    * Composants : base de données, backend, front
    * Déploiement sur K8s ou directement sur VMs selon scénario
* Création des rôles Ansible
    * Base système : utilisateurs, SSH, sécurité
    * Application : installation, configuration, services
* Déploiement automatisé
    * Exécution des playbooks
    * Gestion des secrets (vault)
    * Logs et vérifications post-déploiement
* Tests et validation fonctionnelle
    * Vérification des services
    * Connexion à l’application depuis le réseau interne

### Jour 4 — Déploiement d’une API/externe avec Ansible

_Objectif_ : Déployer une application accessible depuis l’extérieur, avec les enjeux de sécurité, exposition, scalabilité.

_Contenu_ :

* Spécificités d’une application externe
    * Authentification, certificats TLS, firewall, DNS
    * Observabilité, logs, alertes
* Préparation du déploiement
    * Configuration des ingress / load balancers
    * Gestion des certificats (cert-manager ou Ansible + Let’s Encrypt)
    * Variables d’environnement, secrets, vault
* Atelier : Déploiement d’une API REST
    * Stack type : NGINX + Flask/Django/FastAPI
    * Déploiement base de données + app + ingress
    * Tests d’accès extérieur (curl, navigateur)
* Intégration dans le pipeline
    * Déploiement automatique via GitOps ou hook CI/CD

### Jour 5 — Usages avancés : Monitoring, HA, sécurité, scaling

_Objectif_ : Consolider l’infrastructure pour la production avec des outils de supervision, de sécurité et de résilience.

_Contenu_ :

* Monitoring & Observabilité
    * Stack Prometheus + Grafana + Alertmanager
    * Collecte des logs (Loki, EFK, etc.)
    * Healthchecks & métriques Kubernetes
* Haute disponibilité
    * ÉtatfulSet, déploiement redondé
    * Anti-affinités, pod disruption budget
    * Architecture HA sur plusieurs zones/fournisseurs (conceptuellement)
* Sécurité
    * RBAC Kubernetes, gestion des droits d’accès
    * Scan de vulnérabilités (Trivy, kube-bench)
    * Chiffrement des secrets (Vault, Sealed Secrets)
* Scaling
    * HPA (Horizontal Pod Autoscaler)
    * Cluster autoscaler (si supporté par VMware)
    * Load balancers & tests de montée en charge (k6, Artillery)
* Conclusion de la formation
    * Debrief, retour sur les objectifs atteints
    * Pistes pour aller plus loin : GitOps, ArgoCD, CI/CD avancée