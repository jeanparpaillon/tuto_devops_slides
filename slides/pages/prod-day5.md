---
layout: section
---

# Day 5 — Advanced topics

---

# Day 4 recap — Kubernetes

- Learned Kubernetes architecture and components
- Deployed and managed containerized applications using Kubernetes
- Lab : Deployed wordpress application on a Kubernetes cluster

---

# Day 5 agenda

- Once upon a time... virtualization
- Real-life use case: migrating legacy application to K8S
- Collaboration with git and github

---
layout: image
image: /once-upon-a-time-in-the-cloud.png
---

---

# Virtualization for Kerrighed

By Erich Focht (NEC), at Kerrighed Summit, February 1st, 2008

---

# Docker - History

---

# Docker - Fundamentals

- layered filesystem (UnionFS)
- containerization (namespaces, cgroups)
- images (Dockerfile)
- registries (Docker Hub, private registries)
- networking (bridge, host, overlay)
- volumes (data persistence)

---

# Docker - Building an image

In a directory, create a file named `Dockerfile` with the following content:

```docker
FROM ubuntu:20.04
RUN apt-get update && apt-get install -y nginx
COPY index.html /var/www/html/index.html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```bash
docker build -t my-nginx-image .
```

---

# Lab - Migrating a legacy application to Kubernetes

## Method

- Identify processes and dependencies
- Identify data storage needs
- Identify connections to other services
- Identify configuration needs
- Containerize the application

---