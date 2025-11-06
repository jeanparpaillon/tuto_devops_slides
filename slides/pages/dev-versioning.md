---
layout: center
epoch: d1am
---

# Versioning

## Software version management

---
layout: image-right
image: /source_tree.png
backgroundSize: contain
---

# Basic concepts

## Software

* source tree
* do not store generated files

---
layout: image-right
image: /versions.png
backgroundSize: contain
---

# Basic concepts

## Version

* A snapshot of the tree

---
layout: image-right
image: /commit.png
backgroundSize: contain
---

# Basic concepts

## Commit

* Change (diff)
* Metadata
  * Author
  * Date
  * Message

---
layout: image-right
image: /git_repo.png
backgroundSize: contain
---

# Basic concepts

## Branch

* Starting point
* Set of commits

* Special branch: main / master

---
layout: image-right
image: /tags.png
backgroundSize: contain
---

# Basic concepts

## Tag

* Label for a commit
* Special tags
  * HEAD
  * \<branch\>

---
layout: image-right
image: /git-merge-example.webp
backgroundSize: contain
---

# Basic concepts

## Merge

* Integrates changes from another branch

---
layout: image-right
image: /git-rebase-example.webp
backgroundSize: contain
---

# Basic concepts

## Rebase

* Integrates changes from the upstream branch

---

# Why versioning matters

## Track changes

* Change history
* Author attribution
* Bug origin

---

# Why versioning matters

## Effective collaboration

* Merge changes
* Identify conflicts

---

# Why versioning matters

## Branches and experiments

* Separate production code from experimental code

---

# Why versioning matters

## History and documentation

* Commits include a change description

---

# Why versioning matters

## Roll back quickly

* Reproduce a bug from a specific version
* Fix broken code (revert / reset)

---

# Why versioning matters

## Decentralized work

* Every developer has a full copy of the code
* Beware of conflicts!

---

# Why versioning matters

## Releases and versioning

* Use branches
* Use tags

---

# Why versioning matters

## Integration with other tools

* Issue tracking
* CI/CD
* Pre/post commit hooks

---

# Why versioning matters

## Code quality management

  * Commit validation
  * Pull Requests
  * Code review

---
layout: section
---

# Popular tools

---
layout: two-cols-header
---

# git

::left::

* Created by Linus Torvalds in 2005 for the Linux kernel
* Very fast and efficient
* Based on SHA-1 checksums

::right::

## Key concepts

* Blob: file contents
* Tree: list of blobs and metadata (filename, permissions)
* Commit: tree + metadata (author, message, etc.)
* Tag: arbitrary name for a commit

---

# GitHub

* Git repository hosting platform
* Project management tools
* CI/CD
* Copilot (AI)

---
layout: image-right
image: /3rd_party_tools.png
backgroundSize: contain
---

# Others

* IDE integrations
* gitk
* GitLab

---
layout: section
---

# git

---
layout: two-cols-header
---

# Local commands

::left::

## git init

Initialize a local repo:

```sh
mkdir my_project
cd my_project
git init
```

Verify `.git` directory:

```sh
find .
```

::right::

## git add

Stage a change for next commit:

```sh
touch README.md
git add README.md
```

Check repo status:

```sh
git status
```

---

# Local commands

## git commit

Record changes into a new commit.

```sh
git commit
```

Check commit in the log:

```sh
git log
```

---
layout: two-cols-header
---

# Local commands

## git branch

::left::

Create a new branch

```sh
git branch new-feature
```

Switch to the branch

```sh
git checkout new-feature
```

::right::

Add a commit

```sh
touch new-feature.sh
git add new-feature.sh
git commit -m "Add new feature"
```

Check the log

```sh
git log
```

---
layout: two-cols-header
---

# Local commands

## git rebase

::left::

Add a commit on master

```sh
git checkout master
touch new-file.md
git add new-file.md
git commit -m "Add new-file.md"
```

Go back to `new-feature`

```sh
git checkout new-feature
```

::right::

Rebase

```sh
git rebase master
```

Check the log

```sh
git log
```

---

# Local commands

## git merge

Go back to master

```sh
git checkout master
```

Merge `new-feature`

```sh
git merge new-feature
```

Check the log

```sh
git log
```

---

# Remote commands

## git clone

* Download a remote repo

## git push

* Sync the local repo with a remote

## git pull

* Download changes from a remote


---
layout: section
epoch: d1pm
---

# GitHub

---

# GitHub

## Create a repository

* Create a new repository on GitHub
* Clone it locally

---

# GitHub

## Branch management

* Create a local branch
* Push to GitHub

---

# GitHub

## Pull Requests

* Create a pull request from the branch
* Merge the pull request

---

# GitHub

## Code Review

* Comment a pull request
* Address comments

---
layout: section
---

# Collaborating with GitHub

---

# GitHub collaboration

## Issues

* Create an issue
* Assign the issue
* Create a branch to fix the issue

---

# GitHub collaboration

## Projects

* Group multiple repositories
* Dashboards
* Adapted to different methodologies

---

# GitHub collaboration

## Wikis

* A wiki…

---
layout: section
---

# Exercises

---

# Create a collaborative project

---

# Solve merge conflicts
