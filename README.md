# CyberFusion All-in-One Cybersecurity Lab

**A single unified web dashboard (one website, one port) for all teams—White, Blue, Red, Black, and Gray—providing access to offensive, defensive, and research tools in a safe, isolated, and fully managed environment.**

---

## 📖 What Is This?

This project lets you run a modern cyber range or security operations lab with all major hacking and defense tools (phishing, C2, scanners, payloads, SIEM, forensics, etc.)  
**All tools are accessible from a single web interface (one port/one domain), with role-based access for different teams, safe isolation, and full job/history management.**

---

## 🏛️ Architecture Overview

- **Frontend (React/MUI SPA):** Modern dashboard, mobile-responsive, customizable, running on a single port (default: 3000).
- **Backend (Node.js/Express):** Unified API server (default: 4000), job runner, reverse proxy for tool UIs, RBAC, logging.
- **Database (PostgreSQL):** Stores users, jobs, tool inventory, logs, artifacts.
- **Job Runner (Docker):** Every tool runs in a Docker container, launched/isolate per job.
- **Reverse Proxy:** Backend proxies internal tool UIs (e.g. CamPhish, GoPhish) to `/tools/job/<jobId>/ui` so users never see direct container ports.
- **RBAC:** Users see only tools and panels for their team (white, blue, red, black, gray).
- **All jobs, logs, and results are managed and downloadable from the dashboard.**

---

## 🚀 How To Set Up

### 1. Prerequisites

- **Docker & Docker Compose** ([Install Guide](https://docs.docker.com/get-docker/))
- **Node.js v18+ & npm**
- **PostgreSQL** (or use Docker Compose service)
- (Optional) **Redis** (for job queueing)

---

### 2. Clone and Configure

```bash
git clone https://github.com/nxsniper-fira/cyberfusion1.1.git
cd cyberfusion1.1
cp .env.example .env         # Edit database, JWT secret, ports, etc.
```

---

### 3. Build and Start Everything

```bash
docker-compose build
docker-compose up -d
# (If backend/frontend are not dockerized, run them separately:)
cd backend
npm install
npm run migrate              # initializes the DB schema
npm run start
cd ../frontend
npm install
npm run dev                  # or `npm run build` and serve static
```

---

### 4. Initialize Database

- Run backend DB migrations (`npm run migrate`).
- Add an admin user (see `backend/seed.js` or via SQL).
- Add tools to the inventory (admin panel or SQL).

---

### 5. Access and Use

- Go to [http://your-lab:3000](http://your-lab:3000)
- Log in (admin or assigned user)
- Choose your team panel (White Hat, Blue Team, Red Team, Black Hat, Gray Hat)
- See tools for your role
- Launch tools (backend creates job, starts Docker container)
- If web UI tool: view in your browser via `/tools/job/<jobId>/ui` (proxied by backend)
- If CLI tool: see live logs/output in dashboard
- Download logs/results/artifacts as needed
- Stop/kill jobs from the UI

---

### 6. How the Proxy Works

- The backend **never exposes Docker ports** to the public/internet.
- For web tools (e.g. CamPhish), the backend reverse proxies the tool’s internal port to a unique dashboard URL (`/tools/job/<jobId>/ui`).
- For CLI tools, backend captures stdout/stderr and streams to frontend (live/polling).
- All network access is via the dashboard; no direct Docker container access.

---

### 7. Adding New Tools

- Add to Docker Compose and build the image (or pull, if public).
- Register the tool in the database (name, Docker image, default port, team, category, UI type).
- It appears immediately in the correct team panel.
- New tools can be CLI or web-based.
- RBAC controls who can see and launch each tool.

---

### 8. Security & Isolation

- **Only the main dashboard port is exposed.**
- Tool containers are accessible ONLY by the backend proxy.
- No direct container-to-internet exposure.
- All actions (who launched what, logs, results) are logged and auditable.
- Lab should be on a private VLAN or VPN.

---

### 9. Directory Structure

```
cyberfusion-lab/
  frontend/         # React dashboard
  backend/          # Node.js/Express API, job runner, proxy
  tools/            # Tool Dockerfiles (optional, can use public images)
  docker-compose.yml
  .env
  README.md
```

---

### 10. Example: Launching a Tool

1. User selects "Nmap" in Blue Team panel.
2. Backend creates a job, starts an Nmap Docker container with user’s params.
3. Job logs are streamed to the dashboard.
4. When done, logs/artifacts are downloadable from UI.

For a web tool, e.g. CamPhish:
- User clicks "Launch CamPhish".
- Backend starts container, assigns a jobId.
- User gets a URL like `/tools/job/abcd1234/ui`—the backend proxies all traffic to CamPhish's internal port.

---

### 11. Troubleshooting

- **Check logs:** `docker-compose logs` for containers, `npm run dev` for backend/frontend.
- **Ports in use:** Change in `.env` or `docker-compose.yml`.
- **Container not responding:** Check if it started (`docker ps`), try `docker-compose restart`.

---

### 12. Lab Safety

- **NEVER** use this lab against unauthorized targets or outside your test environment.
- Restrict dashboard access to trusted users/networks.
- Monitor logs and usage for every action.

---

### 13. Extending

- Add more tools (Dockerfiles/public images) for any team.
- Add more teams/panels if needed.
- Customize panels and dashboard branding/theme.
- Integrate with SIEM, ticketing, or alerting as needed.

---

### 14. Credits

Every tool is the property of its original authors; this project orchestrates them for research and training only.

---

## 🆘 Need help?

- Open an issue on GitHub.
- See each tool’s own documentation for usage and flags.
- For advanced proxying or tool output integration, see the backend’s `toolProxy.ts` and job runner logic.

---
