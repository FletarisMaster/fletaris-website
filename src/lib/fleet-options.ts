// What the signup form asks per vertical (Sam, 2026-10-16). `value` is what the Worker
// receives as `vertical`; each size string is stored as-is in Notion's "Fleet Size" select,
// so it carries its unit and reads on its own.

export type Vertical = 'air' | 'drone' | 'land' | 'sea' | 'space';

export const FLEET_VERTICALS: { value: Vertical; label: string; sizes: string[] }[] = [
  {
    value: 'air',
    label: 'Aircraft',
    sizes: ['1 – 10 aircraft', '11 – 30 aircraft', '31 – 80 aircraft', '80+ aircraft'],
  },
  {
    value: 'drone',
    label: 'Drones',
    sizes: ['1 – 10 drones', '11 – 50 drones', '51 – 200 drones', '200+ drones'],
  },
  {
    value: 'land',
    label: 'Trucks and land vehicles',
    sizes: ['1 – 25 vehicles', '26 – 100 vehicles', '101 – 500 vehicles', '500+ vehicles'],
  },
  {
    value: 'sea',
    label: 'Vessels',
    sizes: ['1 – 5 vessels', '6 – 20 vessels', '21 – 50 vessels', '50+ vessels'],
  },
  {
    value: 'space',
    label: 'Satellites',
    sizes: ['1 – 3 satellites', '4 – 10 satellites', '11 – 50 satellites', '50+ satellites'],
  },
];

export function sizesFor(v: Vertical | ''): string[] {
  return FLEET_VERTICALS.find((x) => x.value === v)?.sizes ?? [];
}
