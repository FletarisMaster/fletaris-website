// fletaris-waitlist: receives the waitlist form from fletaris.com and stores it in Notion.
// See ../README.md for the request contract, the Notion columns and the rollout order.

import type { Env } from './config';
import { createEntry, existsByEmail, NotionError, trashOlderThan } from './notion';
import { verifyTurnstile } from './turnstile';
import { parseSignup } from './validate';

const MAX_BODY_BYTES = 8 * 1024;

function allowedOrigin(request: Request, env: Env): string | null {
  const origin = request.headers.get('Origin');
  if (!origin) return null;
  const allowed = env.ALLOWED_ORIGINS.split(',').map((o) => o.trim()).filter(Boolean);
  return allowed.includes(origin) ? origin : null;
}

function json(body: unknown, status: number, origin: string | null): Response {
  const headers: Record<string, string> = { 'Content-Type': 'application/json', Vary: 'Origin' };
  if (origin) headers['Access-Control-Allow-Origin'] = origin;
  return new Response(JSON.stringify(body), { status, headers });
}

async function handlePost(request: Request, env: Env, origin: string): Promise<Response> {
  const length = Number(request.headers.get('Content-Length') ?? 0);
  if (length > MAX_BODY_BYTES) return json({ error: 'too_large' }, 413, origin);
  const text = await request.text();
  if (text.length > MAX_BODY_BYTES) return json({ error: 'too_large' }, 413, origin);

  let body: unknown;
  try {
    body = JSON.parse(text);
  } catch {
    return json({ error: 'invalid_json' }, 400, origin);
  }

  const parsed = parseSignup(body);
  if (!parsed.ok) return json({ error: 'invalid', fields: parsed.errors }, 400, origin);
  const signup = parsed.value;

  // Bots get the same answer as people, so they can't tell the honeypot caught them.
  if (signup.isBot) return json({ ok: true }, 200, origin);

  if (env.TURNSTILE_SECRET) {
    const ok = await verifyTurnstile(signup.turnstileToken, request.headers.get('CF-Connecting-IP'), env.TURNSTILE_SECRET);
    if (!ok) return json({ error: 'verification_failed' }, 403, origin);
  }

  // A repeat signup is answered like a new one (no "already registered" leak) and not stored
  // twice. The check needs the integration's "Read content" capability; if it fails, store the
  // entry anyway: a duplicate row beats a lost signup.
  let duplicate = false;
  try {
    duplicate = await existsByEmail(env, signup.email, signup.kind);
  } catch (e) {
    console.error('duplicate check failed', e instanceof NotionError ? `${e.status} ${e.code}` : String(e));
  }

  try {
    if (!duplicate) await createEntry(env, signup);
  } catch (e) {
    // Status and Notion error code only: never log the submitted personal data.
    console.error('notion write failed', e instanceof NotionError ? `${e.status} ${e.code}` : String(e));
    return json({ error: 'storage_failed' }, 502, origin);
  }
  return json({ ok: true }, 200, origin);
}

export default {
  async fetch(request, env): Promise<Response> {
    const origin = allowedOrigin(request, env);

    if (request.method === 'OPTIONS') {
      if (!origin) return new Response(null, { status: 403 });
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': origin,
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Max-Age': '86400',
          Vary: 'Origin',
        },
      });
    }
    if (request.method !== 'POST') return json({ error: 'method_not_allowed' }, 405, origin);
    if (!origin) return json({ error: 'forbidden_origin' }, 403, null);
    return handlePost(request, env, origin);
  },

  async scheduled(_controller, env, ctx): Promise<void> {
    const days = Number(env.RETENTION_DAYS) || 365;
    const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
    ctx.waitUntil(
      trashOlderThan(env, cutoff).then(
        (n) => console.log(`retention: trashed ${n} entries created before ${cutoff.toISOString()}`),
        (e) => console.error('retention failed', e instanceof NotionError ? `${e.status} ${e.code}` : String(e)),
      ),
    );
  },
} satisfies ExportedHandler<Env>;
