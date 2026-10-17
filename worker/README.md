# Waitlist Worker (`fletaris-waitlist`)

Receives the waitlist form from fletaris.com (hub `/` and `/air`) and stores the entry in
**Notion**. Live at `https://fletaris-waitlist.uchuva-tech.workers.dev`.

> **Status (2026-10-15):** this folder is a rewrite of the Worker, built and tested locally
> but **not deployed**. The live Worker still runs the older code from the Cloudflare
> dashboard. This rewrite writes the same Notion columns and reads the same secrets
> (`NOTION_TOKEN`, `NOTION_DB_ID`), so it can replace it directly. See [Rollout](#rollout).

## What it does

| Step | Behaviour |
|---|---|
| CORS | Only origins in `ALLOWED_ORIGINS` (prod: `https://fletaris.com`, `https://www.fletaris.com`, `https://fletaris-site.pages.dev`). Others get 403. |
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
| `kind` | no | `waitlist` (default) or `investor` (the "Request the investor deck" form); anything else → 400 |
| `email` | yes | work email |
| `fleetsize` | yes, for `waitlist` | free text ≤ 60 chars, unit included (`1 – 10 aircraft` … `80+ aircraft`, `1 – 10 drones` …; full list in `src/lib/fleet-options.ts`). For `investor` it is ignored and stored as `Investor deck` |
| `firstname`, `lastname`, `company` | no | the investor form sends the whole name as `firstname` and the fund or firm as `company` |
| `vertical` | no | `air` on `/air`; on the hub, the visitor's "What do you manage?" choice |
| `source` | no | page path the form was sent from |
| `utm` | no | `{source, medium, campaign}`, from the landing URL and kept for the browser session |
| `policyVersion` | no | Privacy Policy version shown at the form (`1.1.0`) |
| `website` | no | honeypot, always empty for real people |
| `turnstileToken` | when Turnstile is on | |

The site already sends every field. The **old** live Worker ignores the extra ones, so
deploying the site first is safe. The investor form also sends `fleetsize: "Investor deck"`,
so the old Worker stores those requests with the same marker.

### Investor deck requests

They go to the same Notion database, with `Fleet Size` = `Investor deck` (no new column).
Filter on that value to see them; the Name column holds the full name and Company the fund.
The duplicate check is per kind (email **and** `Fleet Size` = / ≠ `Investor deck`), so someone
on the waitlist can still request the deck, and the other way round. Retention is the same
365 days.

## Notion database

Column names and types are set in [`src/config.ts`](src/config.ts) and **must match the
database exactly**:

| Key | Column | Type | When |
|---|---|---|---|
| name | `Name` | title | always ("First Last", or the email if both are blank; the old Worker wrote "Unknown") |
| lastName | `Last Name` | text | always (when given) |
| email | `Work Email` | email | always (also used for duplicate checks) |
| company | `Company` | text | always (when given) |
| fleetSize | `Fleet Size` | select | always |
| submittedAt | `Submitted At` | date | always (UTC date) |
| vertical | `Vertical` | select | `NOTION_EXTENDED_FIELDS=true` |
| source | `Source page` | text | 〃 |
| utm | `UTM` | text | 〃 (`source / medium / campaign`) |
| policyVersion | `Policy version` | text | 〃 |

The six columns above `Vertical` are the ones the old dashboard Worker wrote (copied from its
source, 2026-10-15). `Submitted At` plus `Policy version` form the consent record.

Database: **Fletaris early acces list** (Notion). Existing `Fleet Size` options are `1 - 10` etc.; the form sends `1 – 10 aircraft` etc., so Notion adds those as new options on first use (no error). Tidy the options when the form is redesigned for all verticals.

## Config

| Name | Kind | Notes |
|---|---|---|
| `NOTION_TOKEN` | secret | Notion internal integration token, shared with the waitlist database |
| `NOTION_DB_ID` | dashboard **variable** (plain, not secret) | not in `wrangler.jsonc` because the repo is public |
| `TURNSTILE_SECRET` | secret, optional | unset = no Turnstile check |
| `ALLOWED_ORIGINS` | var (`wrangler.jsonc`) | comma-separated |
| `NOTION_EXTENDED_FIELDS` | var | `"true"` (columns added 2026-10-15); `"false"` writes only the original six |
| `RETENTION_DAYS` | var | `"365"` |

Plain `wrangler deploy` **deletes** dashboard variables not in `wrangler.jsonc`, which would remove `NOTION_DB_ID` and break every signup. `npm run deploy` passes `--keep-vars` to prevent that. Always deploy with `npm run deploy`, or convert `NOTION_DB_ID` to a secret (`npx wrangler secret put NOTION_DB_ID`, then delete the variable).

The Notion integration needs **Read**, **Update** and **Insert content** capabilities (notion.so/my-integrations → the integration → Capabilities). The old Worker only inserted. Without Read, the duplicate check is skipped (signups still save); without Update, the retention job fails.

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

1. ~~**Capture the live Worker.**~~ Done 2026-10-15: column names and secret names
   (`NOTION_TOKEN`, `NOTION_DB_ID`) are mirrored in `src/config.ts`. The old Worker also
   allowed `https://fletaris-site.pages.dev`, which is kept in `ALLOWED_ORIGINS`.
2. **Test against a copy.** Duplicate the Notion database, share it with the integration, put it
   in `.dev.vars`, then `npm run dev` and submit from the local site. Check that the row looks right.
3. ~~**Add the new columns**~~ Done 2026-10-15 (Vertical: select; Source page, UTM, Policy version: text). Integration "Fletaris Waitlist Form" already has Read/Update/Insert content.
4. **Deploy:** `cd worker`, `npx wrangler login`, then `npm run deploy` (`NOTION_EXTENDED_FIELDS` is
   already `"true"`).
   The existing `NOTION_TOKEN` secret and `NOTION_DB_ID` variable stay in place, and the Worker keeps
   its name and URL, so the site doesn't change. To undo: `npx wrangler rollback`.
5. **Turnstile:** Cloudflare → Turnstile → *Add widget* (hostname `fletaris.com`, Managed). Put
   the site key in the website's `.env.production` (`NEXT_PUBLIC_TURNSTILE_SITE_KEY`), deploy
   Pages, **then** `npx wrangler secret put TURNSTILE_SECRET`. From then on, requests without a
   valid token get 403.
6. **Check the cron:** after the first night, `npx wrangler tail` or the Worker's Logs tab
   should show `retention: trashed N entries…`.
