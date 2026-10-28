# Campus Events Hub

A MERN-stack platform for college events: **Academic · Cultural · Technical · Symposium** columns, registrations, schedules, volunteer assignments, QR attendance, certificate generation and event analytics.

**Stack:** MongoDB + Mongoose · Express.js · React (Vite) · Node.js · JWT (+ bcrypt) · Axios · three.js shader background · Postman for API testing · Git & GitHub · deployed on Vercel.

## Folder structure
```
campus-events-hub/
├── api/index.js                 Express + Mongoose API (Vercel serverless function at /api)
├── server.js                    Local dev server for the same API (port 5000)
├── index.html                   Vite entry
├── vite.config.mjs              Vite config (proxies /api to localhost:5000 in dev)
├── vercel.json                  Rewrites: /api/* -> API, everything else -> SPA
├── package.json
├── .env.example                 MONGODB_URI and JWT_SECRET
└── src/
    ├── main.jsx                 Root: shader background + landing page + app
    ├── Hero.jsx                 Landing page
    ├── App.jsx                  Events board, My registrations, Manage, Analytics, QR check-in
    ├── local.js                 Demo mode: stores data in the browser when MONGODB_URI is not set
    ├── scan.js                  jsQR-based QR detector (works in every browser)
    ├── styles.css · shader.css
    └── components/ui/shader-animation.jsx   Heartbeat 3D shader (three.js)
```

## Run locally
```bash
npm install
npm run dev            # frontend on http://localhost:5173 (works alone in demo mode)
```
With a real database (optional): copy `.env.example` to `.env`, fill in the values, then in a second terminal:
```bash
npm run server         # API on http://localhost:5000 (needs Node 20+)
```
Without `MONGODB_URI` the API answers 503 and the app automatically switches to demo mode (data kept in the browser).

## Deploy to Vercel
Push to GitHub, import the repo in Vercel (framework: Vite), add `MONGODB_URI` and `JWT_SECRET` under Environment Variables, deploy.

## API (test in Postman)
Send `Authorization: Bearer <token>` on everything except `auth/enter`.

| Method | Route | Who | Purpose |
|---|---|---|---|
| POST | /api/auth/enter `{name, role: "student"\|"admin", device}` | anyone | Passwordless entry, returns JWT |
| GET | /api/events | any | List events with counts |
| POST | /api/events | organizer | Create event `{title, category, date, venue, description, capacity}` |
| DELETE | /api/events/:id | organizer | Delete event |
| POST | /api/events/:id/register | any | Register |
| POST | /api/events/:id/volunteer | any | Sign up to volunteer |
| GET | /api/events/:id/participants | organizer | Registrations + volunteers |
| PUT | /api/events/:id/attendance `{userId, attended}` | organizer | Mark attendance |
| PUT | /api/events/:id/volunteers `{userId, task}` | organizer | Assign volunteer task |
| POST | /api/checkin `{code: "CEH\|eventId\|userId"}` | organizer | QR check-in |
| GET | /api/me/events | any | My registrations |
| GET | /api/events/:id/certificate | any | Certificate data (after attendance is marked) |
| GET | /api/analytics | organizer | Totals and per-event numbers |

Note: organizer access is open (anyone can choose "Organizer") — add a PIN or real login before real use.
