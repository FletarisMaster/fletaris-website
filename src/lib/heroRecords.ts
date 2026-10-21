import type { DueState } from '@/lib/timelineFleets';

// The asset records shown over the hero footage (W22). Modelled on the Fletaris Air hangar card
// in the live app: identity, usage, last route or track, status by domain, and the foresight
// (the next event, how far away, and whether the asset will be ready). Every value here is
// synthetic. The aircraft matches the demo's fictional fleet (MSN 2391, the same example as the
// fleet timeline); the other four are illustrative, since those products don't exist yet.
// Order of HUB_RECORDS = order of the clips in public/media/hub-hero.mp4.

export interface HeroRecord {
  /** e.g. "Aircraft record" */
  kind: string;
  id: string;
  type: string;
  /** operator · engine / payload / class */
  line: string;
  stats: Array<[label: string, value: string]>;
  track: { label: string; from: string; to: string; when: string };
  domains: Array<[label: string, state: DueState]>;
  foresight: {
    event: string;
    days: number;
    state: DueState;
    /** 0–1 for the bar */
    progress: number;
    progressLabel: string;
    detail: string;
  };
  note: string;
}

export const AIR_RECORD: HeroRecord = {
  kind: 'Aircraft record',
  id: 'MSN 2391',
  type: 'Airbus A320-214',
  line: 'Liffey Air · 2 × CFM56-5B',
  stats: [
    ['FH', '70,367'],
    ['FC', '46,723'],
    ['Age', '19.1 y'],
  ],
  track: { label: 'Last flight', from: 'EIDW', to: 'LIRF', when: '13 Oct' },
  domains: [
    ['Airframe', 'marginal'],
    ['ARC', 'notready'],
    ['Engines', 'ready'],
    ['Lease', 'notready'],
  ],
  foresight: {
    event: 'Redelivery',
    days: 40,
    state: 'notready',
    progress: 22 / 29,
    progressLabel: '22 of 29 return conditions met',
    detail: 'Est. $518K to close before return',
  },
  note: 'Example data from the live product',
};

export const HUB_RECORDS: HeroRecord[] = [
  { ...AIR_RECORD, note: 'Example data from the live product · Fletaris Air' },
  {
    kind: 'Drone record',
    id: 'SN D-1042',
    type: 'Inspection quadcopter',
    line: 'Andes Survey Ops · 4 × 12S packs',
    stats: [
      ['Flight h', '1,284'],
      ['Sorties', '2,917'],
      ['Packs', '312 cyc'],
    ],
    track: { label: 'Last mission', from: 'Base 2', to: 'Line 7 km 40', when: '18 Oct' },
    domains: [
      ['Airframe', 'ready'],
      ['Motors', 'notready'],
      ['Batteries', 'marginal'],
      ['Permit', 'ready'],
    ],
    foresight: {
      event: 'Motor overhaul',
      days: 12,
      state: 'notready',
      progress: 0.96,
      progressLabel: '96% of motor life used',
      detail: 'Overhaul not booked; 3 missions planned',
    },
    note: 'Illustrative example · Drones',
  },
  {
    kind: 'Vehicle record',
    id: 'Unit T-204',
    type: 'Class 8 tractor',
    line: 'Northline Freight · leased unit',
    stats: [
      ['km', '412,600'],
      ['Engine h', '9,870'],
      ['Age', '4.2 y'],
    ],
    track: { label: 'Last trip', from: 'Depot 3', to: 'Port gate B', when: '20 Oct' },
    domains: [
      ['Chassis', 'ready'],
      ['Brakes', 'notready'],
      ['Emissions', 'marginal'],
      ['Lease', 'ready'],
    ],
    foresight: {
      event: 'Annual inspection',
      days: 30,
      state: 'notready',
      progress: 1,
      progressLabel: 'Brake lining at its wear limit',
      detail: 'Replace before the inspection date',
    },
    note: 'Illustrative example · Trucks',
  },
  {
    kind: 'Vessel record',
    id: 'Vessel 03',
    type: 'Supramax bulk carrier',
    line: 'Meridian Bulk · time charter',
    stats: [
      ['Running h', '61,200'],
      ['DWT', '58,000 t'],
      ['Age', '9.8 y'],
    ],
    track: { label: 'Last voyage', from: 'Santos', to: 'Rotterdam', when: '16 Oct' },
    domains: [
      ['Hull', 'marginal'],
      ['Class', 'notready'],
      ['Engine', 'ready'],
      ['Charter', 'ready'],
    ],
    foresight: {
      event: 'Special survey',
      days: 70,
      state: 'notready',
      progress: 31 / 48,
      progressLabel: '31 of 48 survey items closed',
      detail: 'Dry-dock slot not yet booked',
    },
    note: 'Illustrative example · Vessels',
  },
  {
    kind: 'Satellite record',
    id: 'SAT-2',
    type: 'GEO communications',
    line: 'Orbital slot 75.0° W · 36 transponders',
    stats: [
      ['In orbit', '11.4 y'],
      ['Propellant', '18%'],
      ['Uptime', '99.97%'],
    ],
    track: { label: 'Last manoeuvre', from: 'N–S drift', to: 'Station kept', when: '18 Oct' },
    domains: [
      ['Bus', 'ready'],
      ['Payload', 'ready'],
      ['Fuel', 'marginal'],
      ['Licence', 'ready'],
    ],
    foresight: {
      event: 'Insurance renewal',
      days: 120,
      state: 'marginal',
      progress: 0.18,
      progressLabel: '18% propellant left at renewal',
      detail: 'Fuel margin under review by the insurer',
    },
    note: 'Illustrative example · Satellites',
  },
];
