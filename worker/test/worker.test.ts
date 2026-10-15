import { afterEach, describe, expect, it, vi } from 'vitest';
import worker from '../src/index';
import type { Env } from '../src/config';
import { buildProperties } from '../src/notion';
import { parseSignup } from '../src/validate';

const ORIGIN = 'https://fletaris.com';
const baseEnv: Env = {
  NOTION_TOKEN: 'test-token',
  NOTION_DB_ID: 'db123',
  ALLOWED_ORIGINS: 'https://fletaris.com,https://www.fletaris.com',
  NOTION_EXTENDED_FIELDS: 'false',
};

function post(body: unknown, origin: string | null = ORIGIN): Request {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (origin) headers.Origin = origin;
  return new Request('https://worker.test/', { method: 'POST', headers, body: JSON.stringify(body) });
}

const valid = { email: 'M.Rodriguez@AvCap.com ', fleetsize: '11 – 30 aircraft', firstname: 'Maria', lastname: '', company: 'AvCap' };

/** Stubs fetch: Notion query returns `existing` results; records every call. */
function stubFetch(existing = 0, turnstileOk = true) {
  const calls: Array<{ url: string; body: any }> = [];
  vi.stubGlobal('fetch', async (url: string, init: RequestInit) => {
    const body = typeof init?.body === 'string' ? JSON.parse(init.body) : init?.body;
    calls.push({ url, body });
    if (url.includes('turnstile')) return Response.json({ success: turnstileOk });
    if (url.endsWith('/query')) return Response.json({ results: Array.from({ length: existing }, (_, i) => ({ id: `p${i}` })), has_more: false });
    return Response.json({ id: 'new' });
  });
  return calls;
}

afterEach(() => vi.unstubAllGlobals());

describe('parseSignup', () => {
  it('normalises email and requires email + fleet size', () => {
    const r = parseSignup(valid);
    expect(r.ok && r.value.email).toBe('m.rodriguez@avcap.com');
    expect(parseSignup({ email: 'nope', fleetsize: '' })).toEqual({ ok: false, errors: ['email', 'fleetsize'] });
  });

  it('rejects unknown verticals and flags the honeypot', () => {
    expect(parseSignup({ ...valid, vertical: 'rail' })).toEqual({ ok: false, errors: ['vertical'] });
    const r = parseSignup({ ...valid, website: 'http://spam' });
    expect(r.ok && r.value.isBot).toBe(true);
  });
});

describe('buildProperties', () => {
  it('writes only core columns unless extended fields are on', () => {
    const s = { ...(parseSignup({ ...valid, vertical: 'air', source: '/air' }) as any).value };
    expect(Object.keys(buildProperties(s, false, new Date()))).toEqual(['Name', 'Work Email', 'Company', 'Fleet Size', 'Submitted At']);
    const ext = buildProperties(s, true, new Date('2026-10-15T00:00:00Z'));
    expect(ext['Vertical']).toEqual({ select: { name: 'air' } });
    expect(ext['Submitted At']).toEqual({ date: { start: '2026-10-15' } });
  });
});

describe('fetch handler', () => {
  it('stores a new signup', async () => {
    const calls = stubFetch(0);
    const res = await worker.fetch!(post(valid) as any, baseEnv);
    expect(res.status).toBe(200);
    expect(res.headers.get('Access-Control-Allow-Origin')).toBe(ORIGIN);
    expect(calls.map((c) => c.url)).toEqual(['https://api.notion.com/v1/databases/db123/query', 'https://api.notion.com/v1/pages']);
  });

  it('does not store a duplicate email but still answers 200', async () => {
    const calls = stubFetch(1);
    const res = await worker.fetch!(post(valid) as any, baseEnv);
    expect(res.status).toBe(200);
    expect(calls).toHaveLength(1);
  });

  it('drops honeypot submissions silently', async () => {
    const calls = stubFetch(0);
    const res = await worker.fetch!(post({ ...valid, website: 'x' }) as any, baseEnv);
    expect(res.status).toBe(200);
    expect(calls).toHaveLength(0);
  });

  it('rejects other origins, bad input and failed Turnstile', async () => {
    stubFetch(0, false);
    expect((await worker.fetch!(post(valid, 'https://evil.example') as any, baseEnv)).status).toBe(403);
    expect((await worker.fetch!(post({ email: 'x' }) as any, baseEnv)).status).toBe(400);
    const env = { ...baseEnv, TURNSTILE_SECRET: 's' };
    expect((await worker.fetch!(post({ ...valid, turnstileToken: 't' }) as any, env)).status).toBe(403);
    expect((await worker.fetch!(post(valid) as any, env)).status).toBe(403);
  });

  it('answers CORS preflight only for allowed origins; GET is 405', async () => {
    const pre = (o: string) => new Request('https://worker.test/', { method: 'OPTIONS', headers: { Origin: o } });
    expect((await worker.fetch!(pre(ORIGIN) as any, baseEnv)).status).toBe(204);
    expect((await worker.fetch!(pre('https://evil.example') as any, baseEnv)).status).toBe(403);
    expect((await worker.fetch!(new Request('https://worker.test/') as any, baseEnv)).status).toBe(405);
  });

  it('returns 502 when Notion fails', async () => {
    vi.stubGlobal('fetch', async () => Response.json({ code: 'validation_error' }, { status: 400 }));
    const res = await worker.fetch!(post(valid) as any, baseEnv);
    expect(res.status).toBe(502);
  });
});
