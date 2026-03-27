# NEXUS — Premium Digital Agency

A full-stack portfolio website built with React + Vite (frontend) and Express + PostgreSQL (backend).

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Vite, Tailwind CSS v4, Framer Motion |
| Backend | Node.js, Express 5, Pino |
| Database | PostgreSQL via Drizzle ORM |
| Validation | Zod |
| API Client | TanStack Query (React Query) |

---

## Local Development

### Prerequisites
- Node.js 20+
- PostgreSQL 14+ (or Docker)

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment variables
```bash
# Backend
cp backend/.env.example backend/.env
# Edit backend/.env and set DATABASE_URL

# Frontend (optional — Vite proxy handles /api in dev)
cp frontend/.env.example frontend/.env.local
```

### 3. Push database schema
```bash
cd shared/db
DATABASE_URL=your_db_url npm run push
```

### 4. Start development servers
```bash
# Both frontend + backend
npm run dev

# Or individually
npm run dev:frontend
npm run dev:backend
```

Frontend → http://localhost:5173  
Backend API → http://localhost:5000

---

## Docker (Full Stack)

```bash
docker-compose up --build
```

Frontend → http://localhost:5173  
Backend → http://localhost:5000  
PostgreSQL → localhost:5432

---

## Deployment

### Option A — Vercel (Frontend) + AWS ECS (Backend)

#### Frontend → Vercel

1. Push to GitHub (already connected via `vercel.json`)
2. In Vercel dashboard, import the repo
3. Set **Root Directory** to `.` (project root)
4. Vercel auto-detects `vercel.json` — no extra config needed
5. Add environment variables in Vercel dashboard if needed

Or deploy via CLI:
```bash
npm install -g vercel
vercel --prod
```

#### Backend → AWS ECS

1. Create an ECR repository named `nexus-backend`
2. Create an ECS cluster and service
3. Add these GitHub Secrets to your repo:

| Secret | Description |
|--------|-------------|
| `AWS_ACCESS_KEY_ID` | IAM user access key |
| `AWS_SECRET_ACCESS_KEY` | IAM user secret key |
| `AWS_REGION` | e.g. `us-east-1` |
| `ECS_CLUSTER` | ECS cluster name |
| `ECS_SERVICE` | ECS service name |
| `VERCEL_TOKEN` | Vercel deploy token |
| `VERCEL_ORG_ID` | Vercel org ID |
| `VERCEL_PROJECT_ID` | Vercel project ID |

4. Push to `main` — GitHub Actions handles the rest

#### ECS Task Environment Variables
Set these in your ECS task definition:
```
NODE_ENV=production
PORT=5000
DATABASE_URL=postgres://...
ALLOWED_ORIGINS=https://your-vercel-domain.vercel.app
LOG_LEVEL=info
```

### Option B — Vercel (Frontend Only, static)

The frontend works as a fully static SPA — no backend required for the UI.  
The contact form will show an error if the backend is unreachable, but everything else works.

```bash
vercel --prod
```

---

## Project Structure

```
nexus/
├── frontend/          # React + Vite SPA
├── backend/           # Express API server
├── shared/
│   ├── api-client-react/  # Generated TanStack Query hooks
│   ├── api-zod/           # Zod validation schemas
│   └── db/                # Drizzle ORM schema + client
├── vercel.json        # Vercel deployment config
├── Dockerfile         # Backend Docker image
├── docker-compose.yml # Local full-stack dev
└── .github/workflows/ # CI/CD pipelines
```

---

## Database Migrations

```bash
# Push schema changes to database
cd shared/db
DATABASE_URL=your_db_url npm run push

# Force push (destructive — use with caution)
DATABASE_URL=your_db_url npm run push-force
```
