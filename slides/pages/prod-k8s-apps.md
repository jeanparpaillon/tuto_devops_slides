---
layout: section
---

# Kubernetes Application Deployment

## Deploy applications on your cluster

### Topics

- Simple application deployment
- Service types and access patterns
- Hands-on exercises

---

# Deploy a simple web application

## Goal: Get a web app running in the cluster

### Basic deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: webapp
spec:
  replicas: 1
  selector:
    matchLabels:
      app: webapp
  template:
    metadata:
      labels:
        app: webapp
    spec:
      containers:
      - name: nginx
        image: nginx:latest
        ports:
        - containerPort: 80
```

---

# Create a service

## Expose the application

### Service types

- **ClusterIP**: Internal only (default)
- **NodePort**: Expose on node IP + port
- **LoadBalancer**: Cloud load balancer

```yaml
apiVersion: v1
kind: Service
metadata:
  name: webapp-service
spec:
  type: ClusterIP
  selector:
    app: webapp
  ports:
  - port: 80
    targetPort: 80
```

---

# Exercise: Deploy your first app

## Steps

1. Create deployment manifest
2. Apply with `kubectl apply -f deployment.yml`
3. Verify: `kubectl get pods`
4. Create service
5. Test internal access

---

# Next steps

- External access with ingress
- Load balancing
- Scaling applications

<!-- 
  TODO: This is a placeholder file created to prevent build failures.
  See ISSUES_TO_CREATE.md Issue #1 for complete content requirements.
  This file needs substantial expansion with:
  - Detailed deployment examples
  - Service type explanations
  - Ingress configuration
  - Hands-on exercises with solutions
  - Troubleshooting guidance
-->
