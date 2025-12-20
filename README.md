# Learn Prompting (Uzbek Edition)

👋 **Welcome to the Learn Prompting Uzbek Edition!**
This is a collaborative open-source project between [Learn Prompting](https://learnprompting.org) and [HumblebeeAI](https://humblebee.ai) to bring high-quality AI education to Uzbekistan.

---

## 📋 Overview

This project uses [Docusaurus 2](https://docusaurus.io/), a modern static website generator, to host the curriculum. It includes custom localization, a dedicated "About Collaboration" page, and alignment with national AI initiatives.

## 🚀 Installation & Setup

### Prerequisites

- Node.js version 18.0 or above
- Docker (optional, for containerized deployment)

### Local Development

1. **Clone the repository:**

    ```bash
    git clone https://github.com/humblebeeai/Learn_Prompting.git
    cd Learn_Prompting
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Start the development server:**

    ```bash
    npm start
    ```

    The site will open at `http://localhost:3000`.

## ⚙️ Configuration

Copy the example environment file to `.env` to configure the application:

```bash
cp .env.example .env
```

| Variable | Description | Default |
| :--- | :--- | :--- |
| `LP_PORT` | Port inside the container | `80` |
| `LP_EXTERNAL_PORT` | Port exposed to host | `3000` |

## 🐳 Deployment (Docker)

To run the application in a Docker container (recommended for production):

1. **Build and run:**

    ```bash
    docker compose up --build -d
    ```

2. **Verify:**
    Access the site at `http://localhost:3000`.
    Health Check: `http://localhost:3000/health.json`

## 🩺 Health Check

The application exposes a health check endpoint at `/health.json`.

- **URL:** `http://localhost:3000/health.json`
- **Response:** `{"status": "ok", "service": "learn-prompting", ...}`

This is actively monitored by the Docker container's `HEALTHCHECK` instruction.

## 🛠 Troubleshooting

**Docker Connection Failed:**
> `Cannot connect to the Docker daemon...`
Ensure Docker Desktop is running.

**Port Conflicts:**
If port 3000 is in use, modify `LP_EXTERNAL_PORT` in your `.env` file.

---

## ✅ Pre-Deployment Checklist

Ensure all items are checked before deploying to production:

### Project Structure & Organization

- [x] Source code inside `src/`.
- [x] Root contains `Dockerfile`, `docker-compose.yml`, `.gitignore`, `.dockerignore`.
- [x] No hardcoded secrets.

### Git Management

- [x] `.gitignore` properly configured.
- [x] No unnecessary files (build outputs, etc.) committed.

### Dockerization

- [x] `Dockerfile` uses multi-stage builds.
- [x] `docker-compose.yml` configured.
- [x] Image size optimized (using `nginx:alpine`).
- [x] `HEALTHCHECK` implemented in Dockerfile.

### Configuration

- [x] No hardcoded configs.
- [x] `.env.example` included with `LP_` prefix.

### Health Checks

- [x] `/health.json` endpoint implemented.
- [x] Docker container monitors health status.

### Documentation

- [x] `README.md` is comprehensive (this file).
- [x] API/Service documentation included.
