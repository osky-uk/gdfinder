# gdfinder
Graphic Design Finder — a directory for finding freelance graphic designers, built on Cloudflare Workers + D1.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- A [Cloudflare account](https://dash.cloudflare.com/sign-up) (free tier is fine)
- Wrangler CLI (installed automatically via `npm install`)

## Setup

```bash
npm install
```

## Local development

The app uses Cloudflare D1 (SQLite). Wrangler handles a local replica automatically — no extra database setup needed.

**1. Apply migrations to the local database:**

```bash
npm run db:migrate:local
```

**2. Start the local dev server:**

```bash
npm run dev
```

Wrangler will start a local server (usually at `http://localhost:8787`) with hot-reload. The local D1 database is stored in `.wrangler/state/` and is gitignored.

## Secrets

Any environment secrets (e.g. `RESEND_API_KEY`) must be set separately from `wrangler.toml`. For local dev, create a `.dev.vars` file in the project root:

```ini
# .dev.vars  — local only, do NOT commit
RESEND_API_KEY=your_key_here
```

For production, use:

```bash
wrangler secret put RESEND_API_KEY
```

## Database

| Command | Description |
|---|---|
| `npm run db:migrate:local` | Apply migrations to the **local** D1 replica |
| `npm run db:migrate` | Apply migrations to the **production** D1 database |
| `npm run db:create` | Create the D1 database on Cloudflare (first-time setup only) |

> After running `npm run db:create` for the first time, copy the `database_id` it outputs into `wrangler.toml`.

## Deployment

```bash
npm run deploy
```

This builds and publishes the Worker to Cloudflare. Make sure production migrations have been applied first (`npm run db:migrate`).
