# Waitlist Worker (`fletaris-waitlist`)

Receives the waitlist form from fletaris.com (hub `/` and `/air`) and stores the entry in
**Notion**. Live at `https://fletaris-waitlist.uchuva-tech.workers.dev`.

> **Status (2026-10-15):** this folder is a rewrite of the Worker, built and tested locally
> but **not deployed**. The live Worker still runs the older code that only exists in the
> Cloudflare dashboard. Before the first deploy, follow [Rollout](#rollout). Deploying with
> the wrong Notion column names would make every signup fail.

## What it does

| Step | Behaviour |
|---|---|
| CORS | Only origins in `ALLOWED_ORIGINS` (prod: `https://fletaris.com`, `https://www.fletaris.com`). Others get 403. |
| Size / JSON | Body over 8 KB → 413; invalid JSON → 400. |
| Validation | `email` (valid, lower-cased) and `fleetsize` required; `vertical` must be `air·drone·land·sea·space` if sent. Fails → 400 `{error:"invalid", fields:[…]}`. |
| Honeypot | A hidden `website` field. If it's filled in, the Worker answers 200 and stores nothing. |
| Turnstile | If the `TURNSTILE_SECRET` secret is set, a missing or invalid token gets 403. |
| Duplicates | If the email is already in the database, the Worker answers 200 and stores nothing, so it never reveals whether someone is registered. |
| Notion write | Fails → 502 `{error:"storage_failed"}`. The log holds only the status and Notion's error code, never personal data. |
| Retention | Cron `17 3 * * *` (daily, 03:17 UTC) moves entries older than `RETENTION_DAYS` (365) to Notion's trash. Notion empties its trash after 30 days. At most 200 per run. Implements Privacy Policy §7. |

## Request contract

`POST`, `Content-Type: application/json`. Success → `200 {"ok":true}`.

| Field | Required | Notes |
|---|---|---|
| `email` | yes | work email |
| `fleetsize` | yes | free text ≤ 60 chars (currently `1 – 10 aircraft` … `80+ aircraft`) |
| `firstname`, `lastname`, `company` | no | |
| `vertical` | no | `air` on `/air`; not sent from the hub |
| `source` | no | page path the form was sent from |
| `utm` | no | `{source, medium, campaign}`, from the landing URL and kept for the browser session |
| `policyVersion` | no | Privacy Policy version shown at the form (`1.1.0`) |
| `website` | no | honeypot, always empty for real people |
| `turnstileToken` | when Turnstile is on | |

The site already sends every field. The **old** live Worker ignores the extra ones, so
deploying the site first is safe.

## Notion database

Column names and types are set in [`src/config.ts`](src/config.ts) and **must match the
database exactly**:

| Key | Column (default) | Type | When |
|---|---|---|---|
| name | `Name` | title | always ("First Last", or the email if both are blank) |
| email | `Email` | email | always (also used for duplicate checks) |
| company | `Company` | text | always |
| fleetSize | `Fleet size` | select | always |
| vertical | `Vertical` | select | `NOTION_EXTENDED_FIELDS=true` |
| source | `Source page` | text | 〃 |
| utm | `UTM` | text | 〃 (`source / medium / campaign`) |
| consentAt | `Consent at` | date | 〃 |
| policyVersion | `Policy version` | text | 〃 |

Database name: _fill in_.

## Config

| Name | Kind | Notes |
|---|---|---|
| `NOTION_TOKEN` | secret | Notion internal integration token, shared with the waitlist database |
| `NOTION_DATABASE_ID` | secret | |
| `TURNSTILE_SECRET` | secret, optional | unset = no Turnstile check |
| `ALLOWED_ORIGINS` | var (`wrangler.jsonc`) | comma-separated |
| `NOTION_EXTENDED_FIELDS` | var | `"false"` until the extra columns exist |
| `RETENTION_DAYS` | var | `"365"` |

`wrangler deploy` replaces plain vars with the ones in `wrangler.jsonc`. Secrets are kept.

## Local development

```bash
cd worker
npm install
cp .dev.vars.example .dev.vars   # fill in a TEST Notion database, not the live one
npm run dev                      # http://localhost:8787 ; cron: curl "localhost:8787/__scheduled?cron=17+3+*+*+*"
npm test                         # unit tests (fetch stubbed, no network)
```

To point the site at it, create `../.env.development.local` containing
`NEXT_PUBLIC_WAITLIST_URL=http://localhost:8787` and restart `npm run dev`. That file is
gitignored.

## Rollout

Each step keeps signups working.

1. **Capture the live Worker.** In the Cloudflare dashboard, open Workers & Pages →
   `fletaris-waitlist` → *Edit code*. Save a copy of the code (e.g. as `worker/legacy/worker.js`
   for reference), and note:
   - the Notion column names and types it writes → fix `CORE_PROPS` in `src/config.ts`;
   - the names of its secrets (Settings → Variables). If they aren't `NOTION_TOKEN` /
     `NOTION_DATABASE_ID`, either rename them in `src/config.ts` or add the secrets under these names.
2. **Test against a copy.** Duplicate the Notion database, share it with the integration, put it
   in `.dev.vars`, then `npm run dev` and submit from the local site. Check that the row looks right.
3. **Add the new columns** (table above) to the live database.
4. **Deploy:** `npx wrangler login`, then `npx wrangler secret put NOTION_TOKEN` (and the others
   if needed), set `NOTION_EXTENDED_FIELDS` to `"true"` in `wrangler.jsonc`, and run
   `npm run deploy`. Same name → same URL, so the site doesn't change. To undo:
   `npx wrangler rollback`.
5. **Turnstile:** Cloudflare → Turnstile → *Add widget* (hostname `fletaris.com`, Managed). Put
   the site key in the website's `.env.production` (`NEXT_PUBLIC_TURNSTILE_SITE_KEY`), deploy
   Pages, **then** `npx wrangler secret put TURNSTILE_SECRET`. From then on, requests without a
   valid token get 403.
6. **Check the cron:** after the first night, `npx wrangler tail` or the Worker's Logs tab
   should show `retention: trashed N entries…`.
