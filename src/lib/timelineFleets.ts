import type { VerticalKey } from '@/lib/verticals';

// Example fleets for the fleet timeline (src/components/site/FleetTimeline.tsx). Aviation is the
// live product's lease & redelivery waterfall (demo portfolio, evaluated 15 Oct 2026; the same
// fictional fleet as the demo video). The other four are illustrative: no product exists for them
// yet, so each says so in its caption. Days are counted from the evaluation date; null means the
// next due date falls after the 24-month window. Identifiers are invented (D2: no real MSNs,
// registrations or hull numbers).

export const EVALUATED = Date.UTC(2026, 9, 15);
export const WINDOW_DAYS = 730;

export type DueState = 'late' | 'notready' | 'marginal' | 'ready';

export interface FleetAsset {
  id: string;
  type: string;
  days: number | null;
  state: DueState;
  detail: string;
}

export interface TimelineFleet {
  key: VerticalKey;
  tab: string;
  /** what the first KPI counts, e.g. "Returns in window" */
  dueLabel: string;
  caption: string;
  assets: FleetAsset[];
}

const ILLUSTRATIVE = (product: string, stage: string) =>
  `Illustrative example fleet. ${product} is ${stage}, so these are not product outputs.`;

export const FLEETS: Record<VerticalKey, TimelineFleet> = {
  air: {
    key: 'air',
    tab: 'Aircraft',
    dueLabel: 'Returns in window',
    caption: 'Example portfolio from the live product, evaluated 15 October 2026. Readiness is Fletaris’s estimate at each return date.',
    assets: [
      { id: 'MSN 19000412', type: 'Embraer E190', days: -15, state: 'late', detail: '15 days past its return date' },
      { id: 'MSN 2391', type: 'Airbus A320', days: 40, state: 'notready', detail: '7 of 29 return conditions failing · est. $518K' },
      { id: 'MSN 36712', type: 'Boeing 737-800', days: 80, state: 'marginal', detail: '' },
      { id: 'MSN 10488', type: 'Airbus A320neo', days: 151, state: 'ready', detail: '' },
      { id: 'MSN 1186', type: 'Airbus A330-300', days: 304, state: 'notready', detail: '15 of 29 return conditions failing' },
      { id: 'MSN 66914', type: 'Boeing 787-9', days: 488, state: 'marginal', detail: '' },
      { id: 'MSN 43991', type: 'Boeing 737 MAX 8', days: 670, state: 'ready', detail: '' },
      { id: 'MSN 233', type: 'Airbus A350-900', days: null, state: 'notready', detail: 'Returns after this 24-month window' },
    ],
  },
  drone: {
    key: 'drone',
    tab: 'Drones',
    dueLabel: 'Due dates in window',
    caption: ILLUSTRATIVE('Fletaris Drone', 'in development'),
    assets: [
      { id: 'SN D-0988', type: 'Fixed-wing VTOL', days: -6, state: 'late', detail: 'Operating authorisation renewal 6 days overdue' },
      { id: 'SN D-1042', type: 'Inspection quadcopter', days: 12, state: 'notready', detail: 'Motor overhaul due, not booked' },
      { id: 'SN D-1107', type: 'Heavy-lift hexacopter', days: 55, state: 'marginal', detail: 'Battery packs at 88% of cycle limit' },
      { id: 'SN D-1210', type: 'Mapping quadcopter', days: 210, state: 'ready', detail: '' },
      { id: 'SN D-1033', type: 'Fixed-wing VTOL', days: 400, state: 'notready', detail: 'Airframe hours run out before the contract ends' },
      { id: 'SN D-1255', type: 'Inspection quadcopter', days: 620, state: 'ready', detail: '' },
    ],
  },
  land: {
    key: 'land',
    tab: 'Trucks',
    dueLabel: 'Due dates in window',
    caption: ILLUSTRATIVE('Fletaris Land', 'in research'),
    assets: [
      { id: 'Unit T-118', type: 'Class 8 tractor', days: -20, state: 'late', detail: 'Emissions service 20 days overdue' },
      { id: 'Unit T-204', type: 'Class 8 tractor', days: 30, state: 'notready', detail: 'Annual inspection; brake wear over limit' },
      { id: 'Unit T-311', type: 'Reefer trailer', days: 95, state: 'marginal', detail: 'Refrigeration unit near its overhaul hours' },
      { id: 'Unit T-402', type: 'Box truck', days: 260, state: 'ready', detail: 'Lease return within mileage allowance' },
      { id: 'Unit T-289', type: 'Class 8 tractor', days: 450, state: 'notready', detail: 'Lease return: projected 14% over mileage allowance' },
      { id: 'Unit T-455', type: 'Box truck', days: 690, state: 'ready', detail: '' },
    ],
  },
  sea: {
    key: 'sea',
    tab: 'Vessels',
    dueLabel: 'Due dates in window',
    caption: ILLUSTRATIVE('Fletaris Sea', 'in research'),
    assets: [
      { id: 'Vessel 03', type: 'Supramax bulk carrier', days: 70, state: 'notready', detail: 'Special survey and dry-dock not yet booked' },
      { id: 'Vessel 07', type: 'Container feeder', days: 160, state: 'marginal', detail: 'Ballast water system upgrade due' },
      { id: 'Vessel 01', type: 'Product tanker', days: 330, state: 'ready', detail: 'Intermediate survey' },
      { id: 'Vessel 05', type: 'Supramax bulk carrier', days: 540, state: 'notready', detail: 'Charter return: hull below redelivery terms' },
      { id: 'Vessel 09', type: 'Container feeder', days: null, state: 'ready', detail: 'Next survey after this 24-month window' },
    ],
  },
  space: {
    key: 'space',
    tab: 'Satellites',
    dueLabel: 'Due dates in window',
    caption: ILLUSTRATIVE('Fletaris Space', 'in research'),
    assets: [
      { id: 'SAT-5', type: 'LEO imaging', days: 45, state: 'notready', detail: 'Reaction wheel past rated life before contract renewal' },
      { id: 'SAT-2', type: 'GEO communications', days: 120, state: 'marginal', detail: 'Insurance renewal; fuel margin under review' },
      { id: 'SAT-1', type: 'GEO communications', days: 380, state: 'ready', detail: 'Spectrum licence renewal' },
      { id: 'SAT-7', type: 'LEO imaging', days: 600, state: 'notready', detail: 'Disposal plan due before end of mission' },
      { id: 'SAT-4', type: 'LEO relay', days: 700, state: 'ready', detail: '' },
    ],
  },
};
