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
RUN npm ci --omit=dev

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

---
layout: section
---

# Hands-on Exercises

**Duration**: Approximately 1.5 hours

**Objectives**:
- Build practical Docker skills
- Containerize a real Node.js application
- Learn optimization techniques
- Debug common issues

---

# Exercise 1: Write your first Dockerfile

## Objective
Containerize the nodejs_server application

## Steps

1. Navigate to `exercises/nodejs_server` directory
2. Create a `Dockerfile` in the project root
3. Choose the appropriate base image: `node:20-alpine`
4. Set up the working directory to `/app`
5. Copy `package*.json` files
6. Install dependencies with `npm ci --omit=dev`
7. Copy the application source code
8. Expose port 3000
9. Define the startup command: `node server.js`

---

# Exercise 1: Validation

## Build your image

```sh
cd exercises/nodejs_server
docker build -t my-node-app .
```

## Expected outcome
- ✅ Build completes successfully
- ✅ No errors in the build output
- ✅ Image appears in `docker images` list

## Time: 15 minutes

---

# Exercise 2: Optimize with multi-stage builds

## Objective
Reduce image size using multi-stage builds

## Steps
1. Modify your existing `Dockerfile`
2. Create a `deps` stage for installing dependencies
3. Create a `runner` stage for the final application
4. Copy only `node_modules` from the deps stage
5. Compare image sizes before and after

---

# Exercise 2: Validation

## Check image size

```sh
# Before optimization
docker images my-node-app

# After multi-stage build
docker build -t my-node-app:optimized .
docker images my-node-app:optimized
```

## Expected outcome
- ✅ Smaller image size with multi-stage build
- ✅ Application still works correctly
- ✅ Only production dependencies included

## Time: 10 minutes

---

# Exercise 3: Run and test the container

## Objective
Run the container locally and verify functionality

## Steps

1. Run the container with proper port mapping (in detached mode)

   ```sh
   docker run -d --name my-node-app -p 3000:3000 my-node-app:optimized
   ```

2. Test the application endpoint

   ```sh
   curl http://localhost:3000
   ```

3. View container logs

   ```sh
   docker logs my-node-app
   ```

4. Stop and remove the container

   ```sh
   docker stop my-node-app
   docker rm my-node-app
   ```

---

# Exercise 3: Validation

## Expected outcome
- ✅ Container starts without errors
- ✅ Application responds at `http://localhost:3000`
- ✅ You see "Hello World, it is [current date and time]"
- ✅ Logs show "Server is running on http://localhost:3000"

## Bonus
- Try running with `--rm` flag to auto-remove container on stop
- List running containers with `docker ps`
- Check container resource usage with `docker stats my-node-app`

## Time: 10 minutes

---

# Exercise 4: Debug common issues

## Objective
Practice debugging Docker containers

## Common issues to troubleshoot

1. **Missing dependencies**
   - Symptom: `Error: Cannot find module 'express'`
   - Debug: Check if `npm ci` ran in the build
   - Fix: Verify `package.json` was copied before install

2. **Port conflicts**
   - Symptom: `Error: bind: address already in use`
   - Debug: Check what's using port 3000
   - Fix: Use a different host port: `-p 8080:3000`

---

# Exercise 4: Useful debugging commands

## Inspect running containers

```sh
# View detailed container info
docker inspect <container-id>

# Execute commands inside running container
docker exec -it <container-id> sh

# View real-time logs
docker logs -f <container-id>

# Check container resource usage
docker stats <container-id>
```

## Time: 15 minutes

---

# Exercise 4: Practice scenarios

## Try these debugging exercises

1. **Intentionally break the build**
   - Remove `COPY package*.json` from Dockerfile
   - Rebuild and observe the error
   - Fix it

2. **Check container internals**
   - Run container in detached mode
   - Use `docker exec -it <container-id> sh`
   - Explore the file system inside the container
   - Verify files are in `/app` directory

3. **View environment variables**
   - Use `docker inspect` to see container config
   - Check exposed ports and environment variables
