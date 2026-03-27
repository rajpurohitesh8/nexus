# NEXUS — Deployment Guide

## Project Structure

| Package | Description |
|---|---|
| `frontend/` | React + Vite portfolio site (`@workspace/portfolio`) |
| `backend/` | Express API server (`@workspace/api-server`) |
| `shared/db/` | Drizzle ORM + PostgreSQL schema |
| `shared/api-zod/` | Zod validation schemas |
| `shared/api-client-react/` | React Query API client |

---

## Deploy Frontend → Vercel

### One-click deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Manual setup
1. Import the repo in [Vercel dashboard](https://vercel.com/new)
2. Vercel auto-detects `vercel.json` — no extra config needed
3. Add environment variable in Vercel project settings:
   - `VITE_API_URL` → your backend URL (e.g. `https://api.yourdomain.com`)

### GitHub Actions (auto-deploy on push to `main`)
Add these secrets to your GitHub repo (`Settings → Secrets → Actions`):

| Secret | Where to find |
|---|---|
| `VERCEL_TOKEN` | [vercel.com/account/tokens](https://vercel.com/account/tokens) |
| `VERCEL_ORG_ID` | `vercel env pull` or project settings |
| `VERCEL_PROJECT_ID` | `vercel env pull` or project settings |

---

## Deploy Backend → AWS ECS (Fargate)

### Prerequisites
- AWS account with ECR, ECS, and SSM Parameter Store access
- PostgreSQL database (RDS recommended)

### One-time AWS setup
```bash
# 1. Create ECR repository
aws ecr create-repository --repository-name nexus-backend --region YOUR_REGION

# 2. Create ECS cluster
aws ecs create-cluster --cluster-name nexus --region YOUR_REGION

# 3. Store secrets in SSM Parameter Store
aws ssm put-parameter --name /nexus/DATABASE_URL --value "postgres://..." --type SecureString
aws ssm put-parameter --name /nexus/ALLOWED_ORIGINS --value "https://yourdomain.vercel.app" --type SecureString

# 4. Create CloudWatch log group
aws logs create-log-group --log-group-name /ecs/nexus-backend

# 5. Update .aws/task-definition.json — replace ACCOUNT_ID and REGION with real values

# 6. Register task definition
aws ecs register-task-definition --cli-input-json file://.aws/task-definition.json

# 7. Create ECS service
aws ecs create-service \
  --cluster nexus \
  --service-name nexus-backend \
  --task-definition nexus-backend \
  --desired-count 1 \
  --launch-type FARGATE \
  --network-configuration "awsvpcConfiguration={subnets=[subnet-xxx],securityGroups=[sg-xxx],assignPublicIp=ENABLED}"
```

### GitHub Actions (auto-deploy on push to `main`)
Add these secrets to your GitHub repo:

| Secret | Value |
|---|---|
| `AWS_ACCESS_KEY_ID` | IAM user access key |
| `AWS_SECRET_ACCESS_KEY` | IAM user secret key |
| `AWS_REGION` | e.g. `us-east-1` |
| `ECS_CLUSTER` | `nexus` |
| `ECS_SERVICE` | `nexus-backend` |

---

## Local Development

```bash
# Start PostgreSQL
docker-compose up db -d

# Push DB schema
npm run push --workspace=@workspace/db

# Start everything
npm run dev
```

Copy env files:
```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local
```
