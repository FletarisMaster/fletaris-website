// Notion column mapping. The names and types MUST match the waitlist database exactly
// (Notion rejects a write that names a missing column). The CORE names below are a best
// guess until the live Worker's code is copied in. Check them against the database before
// the first deploy (README "Notion database").

export type NotionPropType = 'title' | 'rich_text' | 'email' | 'select' | 'date';

export interface NotionProp {
  name: string;
  type: NotionPropType;
}

/** Columns the live Worker already writes. */
export const CORE_PROPS = {
  /** Every Notion database has exactly one title column: "First Last", or the email if both are blank. */
  name: { name: 'Name', type: 'title' },
  email: { name: 'Email', type: 'email' },
  company: { name: 'Company', type: 'rich_text' },
  fleetSize: { name: 'Fleet size', type: 'select' },
} satisfies Record<string, NotionProp>;

/** Columns added by this version. Written only when NOTION_EXTENDED_FIELDS = "true". */
export const EXTENDED_PROPS = {
  vertical: { name: 'Vertical', type: 'select' },
  source: { name: 'Source page', type: 'rich_text' },
  utm: { name: 'UTM', type: 'rich_text' },
  consentAt: { name: 'Consent at', type: 'date' },
  policyVersion: { name: 'Policy version', type: 'rich_text' },
} satisfies Record<string, NotionProp>;

export interface Env {
  NOTION_TOKEN: string;
  NOTION_DATABASE_ID: string;
  TURNSTILE_SECRET?: string;
  ALLOWED_ORIGINS: string;
  NOTION_EXTENDED_FIELDS?: string;
  RETENTION_DAYS?: string;
}
