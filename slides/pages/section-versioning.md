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
