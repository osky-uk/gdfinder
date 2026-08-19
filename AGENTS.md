# gdfinder: Agent instructions

gdfinder is a directory for finding freelance graphic designers. It is built as a Cloudflare Worker (JavaScript) with a D1 (SQLite) database. The frontend is server-rendered HTML returned directly from the Worker - there is no build step or bundler. Designers are listed with details such as their specialisms, location, turnaround time, and AI usage level. The primary goals are fast search and filtering, a clean UI, and straightforward moderation.

## Coding conventions

### Language & style
- British English spelling (e.g. "colour")
- Never use em dashes, use a hyphen "-" instead
- Use the Oxford comma in lists of three or more items

### Code
- JavaScript (no TypeScript); no type annotations
- 4-space indentation
- Single quotes for strings
- `const` by default, `let` only when reassignment is needed
- No unused variables or dead code
- UUIDs generated with `crypto.randomUUID()`
- Prioritise security, performance, and simplicity (in that order)
- Ensure linting is configured and used

### Cloudflare Workers / D1
- All DB access via the `DB` binding defined in `wrangler.toml`
- Secrets via `wrangler secret put` (never hardcoded); local secrets in `.dev.vars`
- Migrations live in `migrations/` and are applied with `npm run db:migrate:local` (dev) or `npm run db:migrate` (prod)

### SQL
- Table and column names in `snake_case`
- Always use `IF NOT EXISTS` on `CREATE TABLE`
- Booleans stored as `INTEGER` (0/1)

### Git
- Commit messages in imperative mood, sentence case (e.g. "Add search filter")
- No generated or build artefacts committed; `.wrangler/` is gitignored
