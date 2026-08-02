import type { VerticalKey } from './verticals';

export interface Persona {
  key: VerticalKey;
  title: string;
  body: string;
}

// §06 table — Air and Sea are VALIDATED from research; Land/Drone/Space are
// UNVALIDATED working titles, shipped per Sam's call rather than holding the
// section (no on-page disclaimer, per the spec's own instruction).
export const PERSONAS: Persona[] = [
  { key: 'air', title: 'Technical Asset Manager', body: 'Portfolio airworthiness through lease transitions' },
  { key: 'drone', title: 'Operations Manager', body: 'Authorizations, pilot currency, fleet availability' },
  { key: 'land', title: 'Fleet Manager', body: 'Uptime against service intervals and inspections' },
  { key: 'sea', title: 'Technical Superintendent', body: 'Class and survey status across a managed fleet' },
  { key: 'space', title: 'Constellation Operations Lead', body: 'Orbit life, propellant budget, licence conditions' },
];
