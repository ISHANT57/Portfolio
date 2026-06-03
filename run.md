# Run Instructions for Portfolio App

## 1. Install dependencies

From the workspace root:
```bash
cd /home/ishant57/Downloads/portfolio/Portfolio
corepack pnpm install
```

> `pnpm` is not installed globally on this machine, so use `corepack pnpm`.

## 2. Backend setup

1. Change to the backend folder:
```bash
cd artifacts/api-server
```

2. Run the backend in development mode:
```bash
corepack pnpm run dev
```

3. Backend default port:
- `http://localhost:5000`
- API base path: `http://localhost:5000/api`
- Contact endpoint: `http://localhost:5000/api/contact`

## 3. Frontend setup

1. Open a second terminal and change to the frontend folder:
```bash
cd /home/ishant57/Downloads/portfolio/Portfolio/artifacts/portfolio
```

2. Run the frontend app:
```bash
corepack pnpm run dev
```

3. Frontend default port:
- Vite preview usually runs on `http://localhost:5173`
- The contact form sends to `http://localhost:5000/api/contact` by default.

## 4. MySQL database setup

1. Install MySQL package in `api-server`:
```bash
cd /home/ishant57/Downloads/portfolio/Portfolio/artifacts/api-server
corepack pnpm install mysql2
```

2. Create the contacts table in MySQL:
```sql
USE portfolio;

CREATE TABLE contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 5. Test the contact form

Use the frontend form or send a request directly:
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Ishant","email":"test@gmail.com","message":"Hello"}'
```

## 6. Verify data in database

Run:
```sql
SELECT * FROM contacts;
```

Expected row example:
- `id`: 1
- `name`: Ishant
- `email`: test@gmail.com
- `message`: Hello

## 7. Backend package.json info

The backend is configured to use port `5000` by default, and the startup script is in:
- `Portfolio/artifacts/api-server/package.json`

If you want to change the backend port, set `PORT` before starting the server.
