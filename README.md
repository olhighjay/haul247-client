# Haul247 Dashboard

A Next.js freight booking dashboard for the Haul247 platform. Connects to the backend REST API for authentication and shipment booking management.

## Prerequisites

- Node.js 20+
- The Haul247 backend API running at `http://localhost:8000`

## Setup

1. Install dependencies:

```bash
npm install
```

2. Copy environment variables:

```bash
cp .env.example .env.local
```

3. Ensure the backend API is running at `http://localhost:8000`.

4. Start the dashboard:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Features

- **Login** — JWT authentication with httpOnly cookies and automatic token refresh
- **Dashboard** — Metrics cards and active bookings table (admin only)
- **New booking** — Create shipment bookings with API validation errors
- **Bookings** — List and create shipment bookings with role-based API access

## Project structure

```
src/
  app/
    login/
    dashboard/
      bookings/new/
    api/auth/
    api/shipment-bookings/
  components/
  lib/
    http-client.ts
    api-client.ts
    authentication.ts
  types/
```

## Environment variables

| Variable                    | Description                          |
| --------------------------- | ------------------------------------ |
| `API_BASE_URL`              | Server-side API base URL             |

## API proxy

If browser CORS blocks direct API calls, the app includes a Next.js rewrite at `/api/proxy/:path*` that forwards to the backend API. Server-side requests connect directly to `API_BASE_URL`.
