// Minimal Notion REST client: find by email, create an entry, list and trash old entries.
// Notion allows ~3 requests/second per integration; waitlist volume is far below that, and the
// retention job runs its deletes one at a time.

import { CORE_PROPS, EXTENDED_PROPS, type Env, type NotionProp } from './config';
import type { Signup } from './validate';

const API = 'https://api.notion.com/v1';
const NOTION_VERSION = '2022-06-28';

export class NotionError extends Error {
  constructor(
    readonly status: number,
    readonly code: string,
  ) {
    super(`Notion ${status} ${code}`);
  }
}

async function notion<T>(env: Env, path: string, method: string, body?: unknown): Promise<T> {
  for (let attempt = 0; ; attempt++) {
    const res = await fetch(`${API}${path}`, {
      method,
      headers: {
        Authorization: `Bearer ${env.NOTION_TOKEN}`,
        'Notion-Version': NOTION_VERSION,
        'Content-Type': 'application/json',
      },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    if (res.status === 429 && attempt === 0) {
      const wait = Math.min(Number(res.headers.get('Retry-After')) || 1, 5);
      await new Promise((r) => setTimeout(r, wait * 1000));
      continue;
    }
    if (!res.ok) {
      const err = (await res.json().catch(() => ({}))) as { code?: string };
      throw new NotionError(res.status, err.code ?? 'unknown');
    }
    return (await res.json()) as T;
  }
}

function value(prop: NotionProp, v: string): unknown {
  switch (prop.type) {
    case 'title':
      return { title: [{ text: { content: v } }] };
    case 'rich_text':
      return { rich_text: [{ text: { content: v } }] };
    case 'email':
      return { email: v };
    case 'select':
      // Notion rejects commas in select option names.
      return { select: { name: v.replace(/,/g, ' ').slice(0, 100) } };
    case 'date':
      return { date: { start: v } };
  }
}

export function buildProperties(s: Signup, extended: boolean, now: Date): Record<string, unknown> {
  const props: Record<string, unknown> = {};
  const set = (p: NotionProp, v: string | undefined) => {
    if (v) props[p.name] = value(p, v);
  };

  const fullName = [s.firstname, s.lastname].filter(Boolean).join(' ');
  set(CORE_PROPS.name, fullName || s.email);
  set(CORE_PROPS.email, s.email);
  set(CORE_PROPS.company, s.company);
  set(CORE_PROPS.fleetSize, s.fleetsize);

  if (extended) {
    set(EXTENDED_PROPS.vertical, s.vertical);
    set(EXTENDED_PROPS.source, s.source);
    if (s.utm) {
      set(EXTENDED_PROPS.utm, [s.utm.source, s.utm.medium, s.utm.campaign].map((x) => x ?? '-').join(' / '));
    }
    set(EXTENDED_PROPS.consentAt, now.toISOString());
    set(EXTENDED_PROPS.policyVersion, s.policyVersion);
  }
  return props;
}

function emailFilter(email: string) {
  const p = CORE_PROPS.email as NotionProp;
  return { property: p.name, [p.type]: { equals: email } };
}

interface QueryResult {
  results: Array<{ id: string }>;
  has_more: boolean;
}

export async function existsByEmail(env: Env, email: string): Promise<boolean> {
  const r = await notion<QueryResult>(env, `/databases/${env.NOTION_DATABASE_ID}/query`, 'POST', {
    filter: emailFilter(email),
    page_size: 1,
  });
  return r.results.length > 0;
}

export async function createEntry(env: Env, s: Signup, now = new Date()): Promise<void> {
  await notion(env, '/pages', 'POST', {
    parent: { database_id: env.NOTION_DATABASE_ID },
    properties: buildProperties(s, env.NOTION_EXTENDED_FIELDS === 'true', now),
  });
}

/**
 * Moves entries created before `cutoff` to Notion's trash (Notion empties its trash after 30
 * days). Stops after `max` pages so one run stays inside the Worker's time limits; the next
 * daily run picks up the rest.
 */
export async function trashOlderThan(env: Env, cutoff: Date, max = 200): Promise<number> {
  let trashed = 0;
  while (trashed < max) {
    const r = await notion<QueryResult>(env, `/databases/${env.NOTION_DATABASE_ID}/query`, 'POST', {
      filter: { timestamp: 'created_time', created_time: { before: cutoff.toISOString() } },
      page_size: Math.min(100, max - trashed),
    });
    for (const page of r.results) {
      await notion(env, `/pages/${page.id}`, 'PATCH', { archived: true });
      trashed++;
    }
    // Trashed pages drop out of the query, so each pass re-queries from the top (no cursor).
    if (!r.has_more || r.results.length === 0) break;
  }
  return trashed;
}
