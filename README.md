
# NestJS Monorepo Backend

A modular monorepo backend built with [NestJS](https://nestjs.com/) using microservices architecture. This project includes:

- **Gateway App**: Public-facing REST API
- **Authentication Microservice**: User management over TCP
- **Prisma + PostgreSQL** integration
- **JWT Authentication**
- **Swagger API Docs**
- **Docker & Docker Compose**
- **Unit & E2E Testing**

---

## 📦 Project Structure

```
nestjs-monorepo/
├── apps/
│   ├── gateway/              # REST API entry point
│   └── authentication/       # Auth microservice (TCP)
├── libs/
│   ├── networking/           # Shared microservice client
│   └── logger/               # (Optional) Centralized logger
├── prisma/                   # Prisma schema and migrations
├── .github/workflows/ci.yml # GitHub Actions CI
├── .env                      # Database environment config
├── docker-compose.yml
├── Dockerfile
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd nestjs-monorepo
npm install --legacy-peer-deps
```

### 2. Setup Database

Make sure PostgreSQL is running locally or use Docker:

```bash
docker-compose up -d db
```

### 3. Migrate and Seed

```bash
npx prisma migrate dev --name init
npm run seed
```

### 4. Run Services

```bash
# In separate terminals or use docker-compose
npm run start:dev:authentication
npm run start:dev:gateway
```

Or via Docker:

```bash
docker-compose up --build
```

---

## 🔐 Authentication

### Register

```http
POST /auth/register
{
  "email": "user@example.com",
  "password": "securepass",
  "name": "User"
}
```

### Login

```http
POST /auth/login
{
  "email": "user@example.com",
  "password": "securepass"
}
```

Returns a `JWT` token.

### Get User(s)

```http
GET /auth/me
Authorization: Bearer <JWT>
```

```http
GET /auth/users
Authorization: Bearer <JWT>
```

---

## 🧪 Testing

- Run unit tests: `npm run test`
- Run e2e tests: `npm run test:e2e`

---

## 📄 License

MIT
