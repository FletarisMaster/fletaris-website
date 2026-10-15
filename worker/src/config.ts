// Notion column mapping. The names and types MUST match the waitlist database exactly
// (Notion rejects a write that names a missing column). CORE_PROPS are the columns the
// pre-2026-10 dashboard Worker wrote, copied from its source.

export type NotionPropType = 'title' | 'rich_text' | 'email' | 'select' | 'date';

export interface NotionProp {
  name: string;
  type: NotionPropType;
}

/** Columns the live Worker already writes. */
export const CORE_PROPS = {
  /** Every Notion database has exactly one title column: "First Last", or the email if both are blank. */
  name: { name: 'Name', type: 'title' },
  lastName: { name: 'Last Name', type: 'rich_text' },
  email: { name: 'Work Email', type: 'email' },
  company: { name: 'Company', type: 'rich_text' },
  fleetSize: { name: 'Fleet Size', type: 'select' },
  /** Signup date (UTC, date only). With Policy version it is the consent record. */
  submittedAt: { name: 'Submitted At', type: 'date' },
} satisfies Record<string, NotionProp>;

/** Columns added by this version. Written only when NOTION_EXTENDED_FIELDS = "true". */
export const EXTENDED_PROPS = {
  vertical: { name: 'Vertical', type: 'select' },
  source: { name: 'Source page', type: 'rich_text' },
  utm: { name: 'UTM', type: 'rich_text' },
  policyVersion: { name: 'Policy version', type: 'rich_text' },
} satisfies Record<string, NotionProp>;

export interface Env {
  NOTION_TOKEN: string;
  NOTION_DB_ID: string;
  TURNSTILE_SECRET?: string;
  ALLOWED_ORIGINS: string;
  NOTION_EXTENDED_FIELDS?: string;
  RETENTION_DAYS?: string;
}
