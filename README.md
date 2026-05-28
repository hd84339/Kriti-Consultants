# Kriti Business Consultants — Full Stack Website

> "Freedom Through Frameworks"

## Tech Stack

**Frontend:** React 18, Vite, Tailwind CSS, Framer Motion, Lucide React, React Router, Axios

**Backend:** Node.js, Express, MongoDB, Mongoose, Nodemailer, Helmet, express-validator

## Quick Start

### 1. Install dependencies
```bash
cd frontend && npm install
cd ../backend && npm install
```

### 2. Configure backend
```bash
cd backend
cp .env.example .env
# Fill in your MongoDB URI and email credentials
```

### 3. Run both servers
```bash
# Terminal 1 — Backend (port 5000)
cd backend && npm run dev

# Terminal 2 — Frontend (port 3000)
cd frontend && npm run dev
```

## API Endpoints

| Method | Route | Description |
|---|---|---|
| GET | /api/health | Health check |
| POST | /api/contact | Submit contact form |
| GET | /api/contact/leads | Get all leads |

### POST /api/contact body
```json
{ "name": "Rajesh Kumar", "email": "r@example.com", "phone": "+91 98000 00000", "businessType": "Manufacturing", "message": "We need SOP help." }
```

## Pages
- `/` — Home (all 12 sections)
- `/about` — About + Founder
- `/services` — All Services
- `/contact` — Contact Form
- `*` — 404 Not Found

## Features
- Premium dark + gold luxury design
- Framer Motion animations throughout
- Animated counters, scroll progress, custom cursor
- Loading screen, floating WhatsApp button
- Mobile-first responsive design
- MongoDB lead storage
- Branded email notifications + auto-reply
- Rate limiting, validation, security headers

## MongoDB Lead Schema
```js
{ name, email, phone, businessType, message, status, source, createdAt, updatedAt }
```

## Production Build
```bash
cd frontend && npm run build
cd backend && NODE_ENV=production node server.js
```

*Kriti Business Consultants — Virar & Hyderabad*
