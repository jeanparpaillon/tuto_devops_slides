---
layout: section
epoch: d2am
---

# Day 2 — Containerizing a Node.js app

## Objectives

- Learn containerization basics
- Build and run a Node.js app in Docker
- Push images to a registry

---

# Docker fundamentals

- Image vs container
- Layers and caching
- Multi-stage builds
- .dockerignore

---

# Example: Node.js Dockerfile

```dockerfile
# syntax=docker/dockerfile:1
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
EXPOSE 3000
CMD ["node", "src/index.js"]
```

---

# Local workflow

```sh
# build
docker build -t ghcr.io/org/app:dev .

# run
docker run --rm -p 3000:3000 ghcr.io/org/app:dev
```

---

# Pushing to a registry

- GitHub Container Registry (GHCR)
- Docker Hub
- Private Artifactory registry

```sh
# login to ghcr
export CR_PAT=...
echo $CR_PAT | docker login ghcr.io -u USERNAME --password-stdin

docker tag ghcr.io/org/app:dev ghcr.io/org/app:1.0.0
docker push ghcr.io/org/app:1.0.0
```

---

# CI tip: BuildKit + cache

- Use buildx + cache-from/cache-to
- Immutable tags + moving tags (latest)
