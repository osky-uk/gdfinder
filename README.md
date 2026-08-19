# gdfinder
Graphic Design Finder - a directory for finding freelance graphic designers, built on Cloudflare Workers + D1.

## Prerequisites

- [nvm](https://github.com/nvm-sh/nvm) (Node Version Manager)
- A [Cloudflare account](https://dash.cloudflare.com/sign-up) (free tier is fine)
- Wrangler CLI (installed automatically via `npm ci`)

## Setup

This project uses Node.js 24.19.0 LTS and npm 11.17.0. The required versions are pinned in `.nvmrc` and enforced by npm.

From the project root, install and use the pinned Node.js version:

```bash
nvm install
nvm use
```

Confirm that `node --version` reports `v24.19.0`, then install the locked dependencies:

```bash
npm ci
```

Run `nvm use` whenever you open a new shell in the project. After the first setup, it switches to the version specified in `.nvmrc` without reinstalling it.

## Local development

The app uses Cloudflare D1 (SQLite). Wrangler handles a local replica automatically - no extra database setup needed.

**1. Apply migrations to the local database:**

```bash
npm run db:migrate:local
```

**2. Start the local dev server:**

```bash
npm run dev
```

Wrangler will start a local server (usually at `http://localhost:8787`) with hot-reload. The local D1 database is stored in `.wrangler/state/` and is gitignored.

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

## Quality checks

Run the linter before committing changes:

```bash
npm run lint
```
