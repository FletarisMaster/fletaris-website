# Waitlist Worker (`fletaris-waitlist`)

Receives the waitlist form from fletaris.com (hub `/` and `/air`) and stores the entry in
**Notion**. Deployed on Cloudflare Workers at `https://fletaris-waitlist.uchuva-tech.workers.dev`.

> **Status (2026-10-02): source not yet in this folder.** The deployed code only exists in the
> Cloudflare dashboard. To bring it in: Cloudflare dashboard → Workers & Pages →
> `fletaris-waitlist` → **Edit code** → copy `worker.js` (or every file shown) into
> `worker/src/`, and record the Notion database name + the names (not values) of its secrets
> below. Never commit secret values.

## Contract (what the website sends)

`POST` with `Content-Type: application/json` from origin `https://fletaris.com`
(the live Worker answers CORS for that origin only; `GET` → 405):

| Field | Required | Notes |
|---|---|---|
| `email` | yes | work email |
| `fleetsize` | yes | `1 – 10 aircraft` · `11 – 30 aircraft` · `31 – 80 aircraft` · `80+ aircraft` |
| `firstname`, `lastname`, `company` | no | may be empty strings |
| `turnstileToken` | once Turnstile is on | Cloudflare Turnstile response token (absent while the site key is unset) |

Any non-2xx response shows the error banner; the site expects a JSON body on success.

## Where the data goes

- **Notion**: the waitlist database (name: _fill in_). Retention rule: delete entries 12 months
  after signup (Privacy Policy §7, v1.1.0). Nothing deletes them automatically yet; review
  the database monthly.
- **Cloudflare**: the Worker itself keeps nothing, but Cloudflare processes request metadata (IP,
  user agent) as the host.

## Turnstile (spam protection), to add to the Worker

Add a secret `TURNSTILE_SECRET` (Cloudflare dashboard → Worker → Settings → Variables, type
*Secret*), then verify the token before writing to Notion:

```js
async function verifyTurnstile(token, ip, secret) {
  if (!token) return false;
  const form = new FormData();
  form.append('secret', secret);
  form.append('response', token);
  if (ip) form.append('remoteip', ip);
  const r = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: form });
  const data = await r.json();
  return data.success === true;
}

// in the POST handler, after parsing `body` and before the Notion call:
if (env.TURNSTILE_SECRET) {
  const ok = await verifyTurnstile(body.turnstileToken, request.headers.get('CF-Connecting-IP'), env.TURNSTILE_SECRET);
  if (!ok) return new Response(JSON.stringify({ error: 'verification_failed' }), { status: 403, headers: corsHeaders });
}
```

## Rollout order (so no signup is rejected in between)

1. Cloudflare dashboard → **Turnstile** → *Add widget*: hostname `fletaris.com`, mode *Managed*.
   You get a **site key** (public) and a **secret key**.
2. Website: put the site key in `.env.production` as `NEXT_PUBLIC_TURNSTILE_SITE_KEY=...`
   (it is public by design, safe to commit), rebuild, deploy Pages. The form now sends
   `turnstileToken`; the current Worker ignores the extra field.
3. Worker: add the `TURNSTILE_SECRET` secret + the check above, deploy. From now on requests
   without a valid token get 403.
