# Sirhan Center for Well-Being

Public website + MongoDB-backed CMS admin portal.

## Prerequisites

- Node.js 20+
- MongoDB running locally (`mongodb://127.0.0.1:27017/sirhan`)

## Setup

```bash
cp .env.local.example .env.local
npm install
npm --prefix admin install
```

## Run

Terminal 1 — public site + shared API (port 3000):

```bash
npm run dev
```

Terminal 2 — admin portal (port 3001):

```bash
npm run dev:admin
```

- Website: http://localhost:3000
- Admin: http://localhost:3001/login

Default admin login (change in `.env.local`):

- Email: `admin@sirhan.care`
- Password: `admin123`

On first API request the database is seeded automatically.

## Admin controls

| Area | What you can edit |
|------|-------------------|
| Branding | Colors, fonts, logo/hero images |
| Page Content | Homepage and page section copy |
| Blogs | Create/publish/delete posts |
| Media | Upload images to `/public/uploads` |
| Navigation | Menu labels, links, visibility |
| Site Settings | Brand name, SEO, contact, social |

Admin talks to the same Next.js API/MongoDB backend as the website.
