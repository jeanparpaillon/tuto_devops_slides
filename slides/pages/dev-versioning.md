---
layout: center
epoch: d1am
---

# Versioning

## La gestion de versions logicielles

---
layout: image-right
image: /source_tree.png
backgroundSize: contain
---

# Concepts de base

## Logiciel

* arborescence de fichiers source
* on ne stocke pas les fichiers générés

---
layout: image-right
image: /versions.png
backgroundSize: contain
---

# Concepts de base

## Version

* Un état de l'arborescence

---
layout: image-right
image: /commit.png
backgroundSize: contain
---

# Concepts de base

## Commit

* Changement (diff)
* Metadata
  * auteur
  * Date
  * Message

---
layout: image-right
image: /git_repo.png
backgroundSize: contain
---

# Concepts de base

## Branche

* Point de départ
* Ensemble de commits

* Branche spéciale : main / master

---
layout: image-right
image: /tags.png
backgroundSize: contain
---

# Concepts de base

## Tag

* Label pour un commit
* Tags spéciaux 
  * HEAD
  * \<branch\>

---
layout: image-right
image: /git-merge-example.webp
backgroundSize: contain
---

# Concepts de base

## Fusion (merge)

* Intègre les changements d'une branche externe

---
layout: image-right
image: /git-rebase-example.webp
backgroundSize: contain
---

# Concepts de base

## Rebase

* Intègre les changements de la branche d'origine

---

# Importance du versioning

## Suivi des modifications

* Historique des modifications
* Auteurs des modifications
* Origine des bugs

---

# Importance du versioning

## Collaboration efficace

* Fusion des changements
* Identification des conflits

---

# Importance du versioning

## Branches et expérimentations

* Séparer le code de production du code expérimental

---

# Importance du versioning

## Historique et documentation

* Les commits intègrent une description des changements

---

# Importance du versioning

## Revenir en arrière rapidement

* Reproduire un bug à partir d'une version précise
* Corriger un code erroné (revert / reset)

---

# Importance du versioning

## Travail décentralisé

* Chaque développeur possède une copie complète du code
* Attention aux conflits !

---

# Importance du versioning

## Gestion des versions et des releases

* Utilisation des branches
* Utilisation des tags

---

# Importance du versioning

## Intégration avec d'autre outils

* Gestion des tickets (issues)
* CI/CD
* Hook pre/post commits

---

# Importance du versioning

## Gestion de la qualité du code

  * Validation des commits
  * Pull Requests
  * Code review

---
layout: section
---

# Outils populaires

---
layout: two-cols-header
---

# git

::left::

* Créé par Linus Torvalds en 2005 pour le noyau Linux
* Très rapide et efficace
* Basé sur les checksum SHA-1

::right::

## Concepts clés

* Blob : contenu d'un fichier
* Tree : list de blobs et metadata (nom de fichier, permission)
* Commit : tree + metadata (auteur, message, etc)
* Tag : nom arbitraire pour un commit

---

# GitHub

* Plateforme d'hébergement de dépôts git
* Outils de gestion de projet
* CI/CD
* Copilot (AI)

---
layout: image-right
image: /3rd_party_tools.png
backgroundSize: contain
---

# Autres

* Intégration environnements de développement
* gitk
* Gitlab

---
layout: section
---

# git

---
layout: two-cols-header
---

# Commandes locales

::left::

## git init

Initialise le dépôt git localement:

```sh
mkdir my_project
cd my_project
git init
```

Vérifier la création d'un répertoire `.git`

```sh
find .
```

::right::

## git add

Ajout un changement pour le prochain commit:

```sh
touch README.md
git add README.md
```

Vérifier l'état du dépôt:

```sh
git status
```

---

# Commandes locales

## git commit

Enregistre les changements dans un nouveau commit.

```sh
git commit
```

Vérifie la création du commit dans le journal:

```sh
git log
```

---
layout: two-cols-header
---

# Commandes locales

## git branch

::left::

Créer une nouvelle branche

```sh
git branch new-feature
```

Se placer sur la branche

```sh
git checkout new-feature
```

::right::

Ajouter un commit

```sh
touch new-feature.sh
git add new-feature.sh
git commit -m "Add new feature"
```

Vérifier le journal

```sh
git log
```

---
layout: two-cols-header
---

# Commandes locales

## git rebase

::left::

Ajouter un commit sur la branche master

```sh
git checkout master
touch new-file.md
git add new-file.md
git commit -m "Add new-file.md"
```

Retourner sur la branche `new-feature`

```sh
git checkout new-feature
```

::right::

Rebaser

```sh
git rebase master
```

Observer le journal

```sh
git log
```

---

# Commandes locales

## git merge

Retourner sur la branche master

```sh
git checkout master
```

Intégrer la branche `new-feature`

```sh
git merge new-feature
```

Vérifier le journal

```sh
git log
```

---

# Commandes distantes

## git clone

* Télécharger un dépôt distant

## git push

* Synchroniser le dépôt local avec un dépôt distant

## git pull

* Télécharger les changements depuis un dépôt distant


---
layout: section
epoch: d1pm
---

# GitHub

---

# Github

## Création de dépôt

* Créer un nouveau dépôt sur github
* Cloner le dépôt localement

---

# Github

## Gestion des branches

* Créer une branche locale
* Push sur github

---

# Github

## Pull Requests

* Créer une pull request à partir de la branche
* Merge de la pull request

---

# Github

## Code Review

* Commenter une pull request
* Répondre aux commentaires

---
layout: section
---

# Collaboration avec GitHub

---

# Github collaboration

## Issues

* Créer un ticket
* Assigner le ticket
* Créer une branche pour résoudre le ticket

---

# Github collaboration

## Projects

* Regrouper plusieurs dépôts
* Tableaux de bords
* Adaptés à différentes méthodologies

---

# Github collaboration

## Wikis

* Un wiki...

---
layout: section
---

# Exercices

---

# Création d'un projet collaboratif

---

# Gestion de conflits de fusion

---