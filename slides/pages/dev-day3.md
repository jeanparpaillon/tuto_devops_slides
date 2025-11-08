---
layout: section
---

# Recap: What We Built on Day 2

## Building on Our Foundation

---

# Day 2 Achievements

## What we accomplished together

✅ **Containerized a Node.js application**
- Created a multi-stage Dockerfile
- Optimized image size with Alpine Linux
- Built the `nodejs_server` application

✅ **Set up GitHub Actions CI/CD**
- Automated testing on every push
- Built Docker images automatically
- Pushed images to **GitHub Container Registry (GHCR)**

✅ **Published our first container image**
- Tagged with commit SHA and `latest`
- Made it available via `ghcr.io`

---

# Today's Challenge

## From Development to Production-Ready Artifact Management

**Day 2 got us started**, but in enterprise environments we need:

- 🏢 **Centralized control** over all artifacts (not just Docker images)
- 🔒 **Security scanning** and vulnerability management
- 📦 **Multiple artifact types**: npm packages, Docker images, JARs, etc.
- 🌐 **Offline capability** - not dependent on external services
- 📊 **Governance and compliance** - track what goes to production
- ⚡ **Performance** - caching and faster builds

**Today**: We'll learn how **JFrog Artifactory** solves these challenges and integrate it with our Day 2 workflow.

---
src: ./section-intro-artifactory.md
---
