---
layout: center
epoch: d2am
---

# Intégration continue (CI) avec GitHub Actions

---

# Bases de la CI

* Automatiser la "post-production" de code
* Tests unitaires
* Tests fonctionnels
* Tests d'Intégration
* Qualité de code
* Génération d'artefacts : exécutables, documentation, conteneurs
* Déploiement

---

# Avantages

* Détection rapide des erreurs
* Gain de temps
* Amélioration de la qualité

---

# GitHub Actions

* Intégré à GitHub
* Déclencheur principal : `git push`
* Déclencheurs : tickets, releases, milestones, autre workflow, ...

---
layout: two-cols-header
---

# Concepts GitHub Actions

::left::

## Workflow

* Processus automatisé qui s'exécute lorsqu'un déclencheur est activé

## Job

* Exécutés sur un *runner*, en parallèle par défaut
* Contient une ou plusieurs étapes (*steps*)
* Les jobs ne partagent pas leurs données

## Steps

* Suite d'instructions (scripts) ou actions
* Les instructions partagent leurs données

::right::

## Déclencheurs

* `git push` ... mais pas seulement
* La plupart des déclencheurs ont des filtres
* [GitHub Actions Events](https://docs.github.com/fr/actions/writing-workflows/choosing-when-your-workflow-runs/events-that-trigger-workflows)

## Conditions

* Filtre des jobs à l'intérieur d'un workflow
* [GitHub Actions conditions](https://docs.github.com/fr/actions/writing-workflows/choosing-when-your-workflow-runs/using-conditions-to-control-job-execution)

---

# Exemple

```sh
git clone https://github.com/jeanparpaillon/tuto_devops_github
```

---

# Création d'un workflow

```sh
mkdir -p .github/workflows
touch .github/workflows/on_push.yml
```

```yaml
name: Check sources
on: push
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Check script
        run: test -e run.sh
```

* [Templates](https://github.com/jeanparpaillon/tuto_devops_github/actions/new)
* [Syntax workflows](https://docs.github.com/fr/actions/writing-workflows/workflow-syntax-for-github-actions)

---

# Activation du workflow

* Push
* Vérifier l'exécution du workflow

---

# Ajout d'un syntax checker

* `shellcheck`

<!--
* [Shellcheck](https://github.com/marketplace/actions/shellcheck)
-->

---

# Ajout des tests

* `make tests`

---

# Construction de la documentation

* `make doc`

---

# Construction des conteneurs

* [Docker build push action](https://github.com/docker/build-push-action)

---

# Parallélisme

* Exécuter en parallèle, en séquence
* Voir le résultat

---

# Interaction avec les pull requests

* Conditionner la fusion d'une pull request à l'exécution d'un workflow

---
layout: section
epoch: d2pm
---

# Utilisation avancée

---

# Utilisation des conditions



* [Syntax des expressions](https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/evaluate-expressions-in-workflows-and-actions)

---

# Création d'actions personnalisées

* [Actions javascript](https://docs.github.com/fr/actions/sharing-automations/creating-actions/creating-a-javascript-action)
* [Action conteneur](https://docs.github.com/fr/actions/sharing-automations/creating-actions/creating-a-docker-container-action)
* [Action composites](https://docs.github.com/fr/actions/sharing-automations/creating-actions/creating-a-docker-container-action)

---

# Caching



---

# Déclencheurs personnalisés

* Ajouter un commentaire automatique dans les tickets

---

# self-hosted runners

* Exécuter le workflow sur un runner local

---