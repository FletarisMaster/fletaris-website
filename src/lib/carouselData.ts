import type { VerticalKey } from './verticals';

export interface CarouselRow {
  prefix?: string;
  value: string;
  suffix?: string;
  color?: 'amber' | 'red' | 'green' | null;
}

export interface CarouselEntry {
  key: VerticalKey;
  assetId: string;
  rows: [CarouselRow, CarouselRow, CarouselRow];
  illustrative: boolean;
  imageAlt: string;
}

// Verbatim from §5.3.3. Air is real product output (no ILLUSTRATIVE tag); the
// other four are sample data and carry the tag. No column headers — these read
// as plain data rows, §04 names the pattern afterward.
export const CAROUSEL_DATA: Record<VerticalKey, CarouselEntry> = {
  air: {
    key: 'air',
    assetId: 'MSN 6291 · 737-800',
    rows: [
      { prefix: 'Reserve adequacy', value: '96.2%' },
      { prefix: 'Redelivery in', value: '42 days', color: 'amber' },
      { value: '6', suffix: 'open findings' },
    ],
    illustrative: false,
    imageAlt: 'Narrowbody aircraft on maintenance stand',
  },
  drone: {
    key: 'drone',
    assetId: 'M350 fleet · 14 units',
    rows: [
      { prefix: 'Battery cycles', value: '412 / 500' },
      { prefix: 'Operator authorization expires in', value: '60 days', color: 'amber' },
      { value: '3', suffix: 'incident reports' },
    ],
    illustrative: true,
    imageAlt: 'Industrial survey drone in the field',
  },
  land: {
    key: 'land',
    assetId: 'Tractor unit T-114',
    rows: [
      { value: '18,400 km', suffix: 'to service' },
      { prefix: 'RTM inspection due', value: 'Q4' },
      { value: '2', suffix: 'defects open' },
    ],
    illustrative: true,
    imageAlt: 'Commercial vehicle fleet in a depot yard',
  },
  sea: {
    key: 'sea',
    assetId: 'Bulk carrier · 58k DWT',
    rows: [
      { prefix: 'Hull coating', value: '61%', suffix: 'life' },
      { prefix: 'Special survey opens in', value: '7 months' },
      { value: '3', suffix: 'class conditions' },
    ],
    illustrative: true,
    imageAlt: 'Bulk carrier vessel alongside in port',
  },
  space: {
    key: 'space',
    assetId: 'SAT-04',
    rows: [
      { prefix: 'Propellant', value: '31%', suffix: 'remaining' },
      { prefix: 'Licence renewal', value: 'Q2 2027' },
      { value: '4.2 years', suffix: 'to deorbit obligation' },
    ],
    illustrative: true,
    imageAlt: 'Communications satellite in low Earth orbit',
  },
};
