# Dice Roller

Simple RPG dice rolling app. Vue + Node/Express.

## Setup

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

```bash
cd frontend
npm install
npm run dev
```

Frontend: http://localhost:5173  
Backend: http://localhost:3001

## Endpoints

- `POST /api/auth/session` - get a JWT token
- `POST /api/roll` - roll a die (body: `{ "sides": 20 }`)
- `GET /api/history` - last 5 rolls
- `DELETE /api/history` - clear history

Roll and history routes require `Authorization: Bearer <token>` header.
