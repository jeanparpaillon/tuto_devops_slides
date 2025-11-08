---
layout: center
epoch: d2am
---

# Continuous Integration (CI) with GitHub Actions

---

# CI basics

* Automate the "post-production" of code
* Unit tests
* Functional tests
* Integration tests
* Code quality
* Artifact generation: binaries, docs, containers
* Deployment

---

# Benefits

* Faster error detection
* Time savings
* Better quality

---

# GitHub Actions

* Built into GitHub
* Main trigger: `git push`
* Other triggers: issues, releases, milestones, other workflows, ...

---
layout: two-cols-header
---

# GitHub Actions concepts

::left::

## Workflow

* Automated process that runs when a trigger fires

## Job

* Runs on a runner, parallel by default
* Contains one or more steps
* Jobs do not share state by default

## Steps

* Sequence of scripts or actions
* Steps within a job share state

::right::

## Triggers

* `git push` ... and more
* Most triggers support filters
* [GitHub Actions Events](https://docs.github.com/actions/writing-workflows/choosing-when-your-workflow-runs/events-that-trigger-workflows)

## Conditions

* Filter jobs within a workflow
* [GitHub Actions conditions](https://docs.github.com/actions/writing-workflows/choosing-when-your-workflow-runs/using-conditions-to-control-job-execution)

---

# Example

```sh
git clone https://github.com/jeanparpaillon/tuto_devops_github
```

---

# Create a workflow

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
      - uses: actions/checkout@v4
      - name: Check script
        run: test -e run.sh
```

* [Templates](https://github.com/jeanparpaillon/tuto_devops_github/actions/new)
* [Workflow syntax](https://docs.github.com/actions/writing-workflows/workflow-syntax-for-github-actions)

---

# Enable the workflow

* Push
* Check the workflow run

---

# Add a syntax checker

* `shellcheck`

---

# Add tests

* `make tests`

---

# Build documentation

* `make doc`

---

# Build and push containers

* [Docker build-push action](https://github.com/docker/build-push-action)

---

# Parallelism

* Run in parallel, then sequence when needed
* Inspect results

---

# Pull request integration

* Require successful workflows before merging PRs

---
layout: section
epoch: d2pm
---

# Advanced usage

---

# Using conditions

* [Expression syntax](https://docs.github.com/actions/writing-workflows/choosing-what-your-workflow-does/evaluate-expressions-in-workflows-and-actions)

---

# Creating custom actions

* [JavaScript actions](https://docs.github.com/actions/sharing-automations/creating-actions/creating-a-javascript-action)
* [Container action](https://docs.github.com/actions/sharing-automations/creating-actions/creating-a-docker-container-action)
* [Composite action](https://docs.github.com/actions/sharing-automations/creating-actions/creating-a-docker-container-action)

---

# Caching

* Speed up builds with dependency caches

---

# Custom triggers

* Automatically add comments to issues

---

# Self-hosted runners

* Run workflows on local or on-prem runners
