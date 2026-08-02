export type VerticalKey = 'air' | 'drone' | 'land' | 'sea' | 'space';
export type NodeKey = 'core' | VerticalKey;

export interface VerticalMeta {
  key: VerticalKey;
  label: string;
  enumerationWord: string;
  assetCategory: string; // broader than enumerationWord — the full range each vertical covers
  code: string;
  status: 'BUILT · V1' | 'IN DEVELOPMENT' | 'RESEARCH';
  statusTone: 'teal' | 'dim';
  solid: boolean;
  href: string;
  live: boolean;
}

export const VERTICALS: VerticalMeta[] = [
  {
    key: 'air',
    label: 'Air',
    enumerationWord: 'Aircraft.',
    assetCategory: 'Aircraft & engines',
    code: '01',
    status: 'BUILT · V1',
    statusTone: 'teal',
    solid: true,
    href: '/air',
    live: true,
  },
  {
    key: 'drone',
    label: 'Drone',
    enumerationWord: 'Drone.',
    assetCategory: 'Drones',
    code: '02',
    status: 'IN DEVELOPMENT',
    statusTone: 'dim',
    solid: true,
    href: '/drone',
    live: false,
  },
  {
    key: 'land',
    label: 'Land',
    enumerationWord: 'Truck.',
    assetCategory: 'Trucks & land vehicles',
    code: '03',
    status: 'RESEARCH',
    statusTone: 'dim',
    solid: false,
    href: '/land',
    live: false,
  },
  {
    key: 'sea',
    label: 'Sea',
    enumerationWord: 'Vessel.',
    assetCategory: 'Vessels & yachts',
    code: '04',
    status: 'RESEARCH',
    statusTone: 'dim',
    solid: false,
    href: '/sea',
    live: false,
  },
  {
    key: 'space',
    label: 'Space',
    enumerationWord: 'Satellite.',
    assetCategory: 'Satellites & rockets',
    code: '05',
    status: 'RESEARCH',
    statusTone: 'dim',
    solid: false,
    href: '/space',
    live: false,
  },
];

// §5.1.1's locked copy order — "An aircraft. A truck. A vessel. A drone. A satellite." —
// deliberately not the maturity order used by the atom/nav elsewhere on the page.
export const HERO_ENUMERATION_ORDER: VerticalKey[] = ['air', 'land', 'sea', 'drone', 'space'];

export function getVertical(key: VerticalKey): VerticalMeta {
  const v = VERTICALS.find((x) => x.key === key);
  if (!v) throw new Error(`Unknown vertical: ${key}`);
  return v;
}
