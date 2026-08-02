import type { VerticalKey, NodeKey } from './verticals';

export interface AtomNodeGeometry {
  key: VerticalKey;
  short: string;
  cx: number;
  cy: number;
  r: number;
  solid: boolean; // solid sphere (Air, Drone) vs hollow ring (Land, Sea, Space)
  code: string;
  statusLabel: string;
  built: boolean;
}

// Exact values from §5.2.3 — encode meaning (size/distance = maturity). Do not
// "improve" these: spokes are core-to-node only, angles are deliberately
// asymmetric, and Land/Sea/Space must stay visually equal to each other.
export const CORE_GEOMETRY = { cx: 510, cy: 330, r: 26 } as const;

export const ATOM_NODES: AtomNodeGeometry[] = [
  { key: 'air', short: 'Air', cx: 296, cy: 250, r: 60, solid: true, code: '01', statusLabel: 'BUILT · V1', built: true },
  { key: 'drone', short: 'Drone', cx: 762, cy: 196, r: 34, solid: true, code: '02', statusLabel: 'IN DEVELOPMENT', built: false },
  { key: 'land', short: 'Land', cx: 828, cy: 436, r: 23, solid: false, code: '03', statusLabel: 'RESEARCH', built: false },
  { key: 'sea', short: 'Sea', cx: 556, cy: 596, r: 21, solid: false, code: '04', statusLabel: 'RESEARCH', built: false },
  { key: 'space', short: 'Space', cx: 252, cy: 540, r: 20, solid: false, code: '05', statusLabel: 'RESEARCH', built: false },
];

export interface ReadoutEntry {
  code: string;
  name: string;
  status: string;
  built: boolean;
  line: string;
  meta: string[];
  ctaLabel: string;
  ctaHref: string | null; // null = plain text, not a link (per §5.2.7 routing rule)
}

// Verbatim from the §5.2.7 table — the core is the fleet intelligence layer
// itself, not "the thing that connects the verticals". Only Air routes
// anywhere; a node that routes to a stub page is worse than one that doesn't.
export const READOUT: Record<NodeKey, ReadoutEntry> = {
  core: {
    code: '00',
    name: 'Fleet intelligence layer',
    status: 'Shared infrastructure',
    built: false,
    line: 'Technical data in. Foresight out.',
    meta: ['Life limits · Compliance · History'],
    ctaLabel: 'About Uchuva Tech',
    ctaHref: null, // no /about page in this build — see checkpoint note
  },
  air: {
    code: '01',
    name: 'Fletaris Air',
    status: 'Built · V1',
    built: true,
    line: 'Know your redelivery before it knows you.',
    meta: ['80–120 lessors · 10–80 aircraft', '29-model schema · live demo'],
    ctaLabel: 'Enter Fletaris Air',
    ctaHref: '/air',
  },
  drone: {
    code: '02',
    name: 'Fletaris Drone',
    status: 'In development',
    built: false,
    line: 'Compliance you can prove on demand.',
    meta: ['Colombian commercial operators'],
    ctaLabel: 'In development',
    ctaHref: null,
  },
  land: {
    code: '03',
    name: 'Fletaris Land',
    status: 'Research',
    built: false,
    line: 'Every kilometre accounted for.',
    meta: ['Cargo and logistics fleets'],
    ctaLabel: 'In research',
    ctaHref: null,
  },
  sea: {
    code: '04',
    name: 'Fletaris Sea',
    status: 'Research',
    built: false,
    line: 'Survey windows, seen coming.',
    meta: ['Technical superintendents'],
    ctaLabel: 'In research',
    ctaHref: null,
  },
  space: {
    code: '05',
    name: 'Fletaris Space',
    status: 'Research',
    built: false,
    line: 'Life, licence, and propellant.',
    meta: ['Constellation operators'],
    ctaLabel: 'In research',
    ctaHref: null,
  },
};
