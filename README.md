# portal-vagas

Portal de vagas de Paraisópolis e região (VagaSul).

## Estrutura

- `frontend/` — React + Vite
- `backend/` — NestJS + MongoDB
- `docker-compose.yml` — Mongo local para o time

## Backend (rápido)

```bash
docker compose up -d
cd backend
cp .env.example .env
npm install
npm run start:dev
```

Detalhes em [`backend/README.md`](./backend/README.md).

## Frontend

```bash
cd frontend
npm install
npm run dev
```
