# Backend — VagaSul

API NestJS do portal de vagas (auth JWT + MongoDB).

## Pré-requisitos

- Node 20+
- Docker Desktop (só para o Mongo)

## Setup

Na raiz do monorepo, sobe o banco:

```bash
docker compose up -d
```

No `backend`:

```bash
cp .env.example .env
npm install
npm run start:dev
```

API em `http://localhost:3001`.

## Auth (MVP)

| Método | Rota | Auth |
|--------|------|------|
| POST | `/auth/register` | não |
| POST | `/auth/login` | não |
| GET | `/auth/me` | Bearer JWT |

Exemplo:

```bash
# register / login
curl -X POST http://localhost:3001/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Rhuan\",\"email\":\"rhuan@teste.com\",\"password\":\"senha123\"}"
```

## Variáveis (`.env`)

Veja `.env.example`. Nunca commit o `.env` real.
