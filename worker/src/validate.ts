// Server-side validation of the waitlist payload. The browser validates too, but anything
// can POST here, so nothing reaches Notion without passing this.

export const VERTICALS = ['air', 'drone', 'land', 'sea', 'space'] as const;
export type Vertical = (typeof VERTICALS)[number];

/** What the visitor asked for: early access (the waitlist form) or the investor deck. */
export const KINDS = ['waitlist', 'investor'] as const;
export type Kind = (typeof KINDS)[number];

/**
 * Investor deck requests have no fleet size; they are stored with this value in the
 * `Fleet Size` select instead, so they can be filtered in Notion without a new column.
 */
export const INVESTOR_FLEET_SIZE = 'Investor deck';

export interface Signup {
  kind: Kind;
  email: string;
  fleetsize: string;
  firstname: string;
  lastname: string;
  company: string;
  vertical?: Vertical;
  source?: string;
  utm?: { source?: string; medium?: string; campaign?: string };
  policyVersion?: string;
  turnstileToken?: string;
  /** Hidden "website" field: real people never fill it in. */
  isBot: boolean;
}

export type ParseResult = { ok: true; value: Signup } | { ok: false; errors: string[] };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function str(v: unknown, max: number): string | undefined {
  if (typeof v !== 'string') return undefined;
  const s = v.trim();
  return s ? s.slice(0, max) : undefined;
}

export function parseSignup(body: unknown): ParseResult {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return { ok: false, errors: ['body'] };
  }
  const b = body as Record<string, unknown>;
  const errors: string[] = [];

  const email = str(b.email, 254)?.toLowerCase();
  if (!email || !EMAIL_RE.test(email)) errors.push('email');

  const kindRaw = str(b.kind, 20)?.toLowerCase() ?? 'waitlist';
  const kind = (KINDS as readonly string[]).includes(kindRaw) ? (kindRaw as Kind) : undefined;
  if (!kind) errors.push('kind');

  // Investors have no fleet: whatever was sent, they get the marker value.
  const fleetsize = kind === 'investor' ? INVESTOR_FLEET_SIZE : str(b.fleetsize, 60);
  if (kind === 'waitlist' && !fleetsize) errors.push('fleetsize');

  const verticalRaw = str(b.vertical, 20)?.toLowerCase();
  let vertical: Vertical | undefined;
  if (verticalRaw) {
    if ((VERTICALS as readonly string[]).includes(verticalRaw)) vertical = verticalRaw as Vertical;
    else errors.push('vertical');
  }

  if (errors.length) return { ok: false, errors };

  const utmIn = b.utm && typeof b.utm === 'object' ? (b.utm as Record<string, unknown>) : {};
  const utm = {
    source: str(utmIn.source, 100),
    medium: str(utmIn.medium, 100),
    campaign: str(utmIn.campaign, 100),
  };

  return {
    ok: true,
    value: {
      kind: kind!,
      email: email!,
      fleetsize: fleetsize!,
      firstname: str(b.firstname, 100) ?? '',
      lastname: str(b.lastname, 100) ?? '',
      company: str(b.company, 200) ?? '',
      vertical,
      source: str(b.source, 200),
      utm: utm.source || utm.medium || utm.campaign ? utm : undefined,
      policyVersion: str(b.policyVersion, 20),
      turnstileToken: str(b.turnstileToken, 4096),
      isBot: !!str(b.website, 200),
    },
  };
}
