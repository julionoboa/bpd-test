# BPD Microservices System (CRUD & GET)

A full microservice-based system using Node.js, Express, MongoDB, Docker, and Kubernetes. This system allows users to create, read, update, and delete their profiles securely via JWT and internal API Key authentication.

## Stack

- Node.js + Express
- MongoDB + Mongoose
- Docker
- Kubernetes (Minikube)
- JWT Authentication
- Internal API Key/Secret validation
- Swagger (OpenAPI v3)

---

## Prerequisites

Before running this project, ensure you have the following installed:

| Tool       | Purpose                         |
|------------|---------------------------------|
| Docker     | Build container images          |
| Minikube   | Run Kubernetes locally          |
| kubectl    | Interact with Minikube cluster  |
| Node.js    | (Optional) Run services locally |
| MongoDB    | MongoDB instance (local/cloud)  |
| Postman / Swagger UI | Test the API         |

---

## Running the Project with Kubernetes

### 1. Start Minikube
```bash
minikube start
```

### 2. Configure Docker to use Minikube's daemon
```powershell
& minikube -p minikube docker-env | Invoke-Expression
```

### 3. Build Docker images inside Minikube
```bash
# For bpd-crud-ms
cd bpd-crud-ms
docker build -t bpd-crud-ms .

# For bpd-get-ms
cd ../bpd-get-ms
docker build -t bpd-get-ms .
```

### 4. Apply Kubernetes manifests
```bash
cd ../k8s
kubectl apply -f bpd-crud-deployment.yaml
kubectl apply -f bpd-get-deployment.yaml
```

### 5. Forward Ports to Access Services
```bash
kubectl port-forward service/bpd-crud-ms 3000:3000
kubectl port-forward service/bpd-get-ms 3001:3001
```

### 6. Test in Browser / Postman
- CRUD Swagger: http://localhost:3000/api-docs
- GET Swagger: http://localhost:3001/api-docs

---

## Environment Variables

Each microservice requires environment variables. See `.env.example` files in both:

### bpd-crud-ms
```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/bpd-crud-db
JWT_SECRET=your-jwt-secret
INTERNAL_API_KEY=my-internal-api-key
INTERNAL_API_SECRET=my-internal-api-secret
GET_MS_URL=http://bpd-get-ms:3001
```

### bpd-get-ms
```env
PORT=3001
MONGO_URI=mongodb://localhost:27017/bpd-get-db
JWT_SECRET=your-jwt-secret
INTERNAL_API_KEY=my-internal-api-key
INTERNAL_API_SECRET=my-internal-api-secret
CRUD_MS_URL=http://bpd-crud-ms:3000
```

---

## Swagger Documentation
Each microservice hosts Swagger UI with full OpenAPI 3.0 documentation.

- Access via `/api-docs` on each service.
- Includes authentication requirements and sample requests.

---

## Features

- Secure profile creation, reading, updating, and deletion
- Logs are created for each action (only viewable by the profile owner)
- Deleted profiles return a special message if queried
- Strong validations with Zod

---

## 📂 Project Structure (simplified)
```
├── bpd-crud-ms
│   ├── src
│   │   ├── controllers
│   │   ├── models
│   │   ├── routes
│   │   ├── utils
│   │   └── app.ts
│   ├── swagger.yaml
│   └── Dockerfile
├── bpd-get-ms
│   ├── src
│   │   ├── controllers
│   │   ├── models
│   │   ├── routes
│   │   └── app.ts
│   ├── swagger.yaml
│   └── Dockerfile
├── k8s
│   ├── bpd-crud-deployment.yaml
│   └── bpd-get-deployment.yaml
└── README.md
```

---

## Contact and Testing
This project was completed as part of a technical challenge. Feel free to reach out if you have any questions or feedback.

---

Julio Noboa
