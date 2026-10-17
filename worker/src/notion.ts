// Minimal Notion REST client: find by email, create an entry, list and trash old entries.
// Notion allows ~3 requests/second per integration; waitlist volume is far below that, and the
// retention job runs its deletes one at a time.

import { CORE_PROPS, EXTENDED_PROPS, type Env, type NotionProp } from './config';
import { INVESTOR_FLEET_SIZE, type Kind, type Signup } from './validate';

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
  set(CORE_PROPS.lastName, s.lastname);
  set(CORE_PROPS.email, s.email);
  set(CORE_PROPS.company, s.company);
  set(CORE_PROPS.fleetSize, s.fleetsize);
  set(CORE_PROPS.submittedAt, now.toISOString().slice(0, 10));

  if (extended) {
    set(EXTENDED_PROPS.vertical, s.vertical);
    set(EXTENDED_PROPS.source, s.source);
    if (s.utm) {
      set(EXTENDED_PROPS.utm, [s.utm.source, s.utm.medium, s.utm.campaign].map((x) => x ?? '-').join(' / '));
    }
    set(EXTENDED_PROPS.policyVersion, s.policyVersion);
  }
  return props;
}

/**
 * Same email and same kind of request. Waitlist entries and investor deck requests share the
 * database, told apart by `Fleet Size`, so someone on the waitlist can still ask for the deck
 * (and the other way round) without being dropped as a duplicate.
 */
function duplicateFilter(email: string, kind: Kind) {
  const e = CORE_PROPS.email as NotionProp;
  const f = CORE_PROPS.fleetSize as NotionProp;
  const fleet = kind === 'investor' ? { equals: INVESTOR_FLEET_SIZE } : { does_not_equal: INVESTOR_FLEET_SIZE };
  return {
    and: [
      { property: e.name, [e.type]: { equals: email } },
      { property: f.name, [f.type]: fleet },
    ],
  };
}

interface QueryResult {
  results: Array<{ id: string }>;
  has_more: boolean;
}

export async function existsByEmail(env: Env, email: string, kind: Kind = 'waitlist'): Promise<boolean> {
  const r = await notion<QueryResult>(env, `/databases/${env.NOTION_DB_ID}/query`, 'POST', {
    filter: duplicateFilter(email, kind),
    page_size: 1,
  });
  return r.results.length > 0;
}

export async function createEntry(env: Env, s: Signup, now = new Date()): Promise<void> {
  await notion(env, '/pages', 'POST', {
    parent: { database_id: env.NOTION_DB_ID },
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
    const r = await notion<QueryResult>(env, `/databases/${env.NOTION_DB_ID}/query`, 'POST', {
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
