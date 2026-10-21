import Link from 'next/link';
import {
  Plane,
  Truck,
  Ship,
  Satellite,
  Droplets,
  Activity,
  MapPin,
  DoorOpen,
  Hourglass,
  Smartphone,
  type LucideIcon,
} from 'lucide-react';
import DroneIcon from '@/components/icons/DroneIcon';
import { VERTICALS, type VerticalKey } from '@/lib/verticals';
import { PERSONAS } from '@/lib/personas';

// Hub-only blocks for direction D. Statuses are stated plainly: aviation is live, drones are
// in development, the rest are research. To an investor that reads as a focused start with a
// roadmap, not five products at once.

const PHOTOS: Record<string, { src: string; alt: string }> = {
  air: { src: '/images/hub/air-tile.webp', alt: 'A narrowbody airliner on a maintenance stand' },
  drone: { src: '/images/hub/drone-tile.webp', alt: 'An industrial survey drone in the field' },
  land: { src: '/images/hub/land-tile.webp', alt: 'A commercial truck fleet in a depot yard' },
  sea: { src: '/images/hub/sea-tile.webp', alt: 'Cargo vessels at sea' },
  space: { src: '/images/hub/space-tile.webp', alt: 'A communications satellite in orbit' },
};

const ICONS: Record<VerticalKey, LucideIcon | typeof DroneIcon> = {
  air: Plane,
  drone: DroneIcon,
  land: Truck,
  sea: Ship,
  space: Satellite,
};

/**
 * The hub's hero picture (so it no longer repeats /air's A320): aviation large and in colour,
 * the four verticals still to come smaller and in black and white, the same live/not-yet
 * rule as the verticals row below. Fills PhotoWithScreen's 16:11 frame. The tiles are the
 * row's own files, so they cost nothing extra further down the page.
 */
export function VerticalsMosaic() {
  const rest = ['drone', 'land', 'sea', 'space'];
  return (
    <div
      role="img"
      aria-label={`Five kinds of fleet: ${['air', ...rest].map((k) => PHOTOS[k].alt.charAt(0).toLowerCase() + PHOTOS[k].alt.slice(1)).join('; ')}`}
      className="w-full aspect-[16/11] grid grid-cols-[minmax(0,11fr)_minmax(0,5fr)_minmax(0,5fr)] grid-rows-2 gap-1 bg-white"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={PHOTOS.air.src} alt="" fetchPriority="high" className="row-span-2 w-full h-full object-cover object-[50%_40%] block" />
      {rest.map((k) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img key={k} src={PHOTOS[k].src} alt="" className="w-full h-full object-cover block grayscale" />
      ))}
    </div>
  );
}

const STATUS: Record<string, string> = {
  'BUILT · V1': 'Live',
  'IN DEVELOPMENT': 'In development',
  RESEARCH: 'Research',
};

export function VerticalsRow() {
  return (
    <ul className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-x-6 gap-y-10">
      {VERTICALS.map((v) => {
        const p = PERSONAS.find((x) => x.key === v.key);
        const photo = PHOTOS[v.key];
        const Icon = ICONS[v.key];
        const body = (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              className={`w-full aspect-[4/5] object-cover block ${v.live ? '' : 'grayscale opacity-80'}`}
            />
            <div className="mt-4 flex items-center justify-between gap-3">
              <Icon size={26} strokeWidth={1.5} className={`shrink-0 ${v.live ? 'text-brand-teal' : 'text-text-secondary'}`} />
              <span className={`font-sans text-[13px] font-medium ${v.live ? 'text-brand-navy underline decoration-brand-teal decoration-2 underline-offset-4' : 'text-text-secondary'}`}>
                {STATUS[v.status]}
              </span>
            </div>
            <span className="mt-2 block font-body font-semibold text-[20px] leading-[1.25] text-brand-navy">{v.assetCategory}</span>
            {p && (
              <p className="mt-2 font-body text-[15px] leading-[1.5] text-text-body">
                For the {p.title.toLowerCase()}: {p.body.charAt(0).toLowerCase() + p.body.slice(1)}.
              </p>
            )}
          </>
        );
        return (
          <li key={v.key}>
            {v.live ? (
              <Link href={v.href} className="block group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal" aria-label={`${v.assetCategory}: live, open Fletaris Air`}>
                {body}
                <span className="mt-3 inline-block font-sans text-[14px] font-semibold text-brand-navy group-hover:underline">Open Fletaris Air →</span>
              </Link>
            ) : (
              body
            )}
          </li>
        );
      })}
    </ul>
  );
}

const PATTERNS = [
  { title: 'Life limits', body: 'Everything has a clock: hours, cycles, kilometres, propellant. Something is always running out.' },
  { title: 'Compliance', body: 'Everything answers to an authority, on a schedule it does not control.' },
  { title: 'History', body: 'Everything builds up a record, and the record decides what happens next.' },
];

// The monitor (concept in Fletaris_Air_Storage_Monitor_Concept). Kept generic across asset
// types on purpose, and passive: it measures and reports, people only check in. It never
// tracks maintenance tasks, so nothing here should promise that.
const MEASURES: Array<{ icon: LucideIcon; title: string; body: string }> = [
  { icon: Droplets, title: 'Humidity and temperature', body: 'Moisture and condensation are what turn storage into corrosion.' },
  { icon: Activity, title: 'Shock and tilt', body: 'Drops, impacts and rough handling, with the force and the time.' },
  { icon: MapPin, title: 'Location and movement', body: 'Where the asset is, and when it was moved.' },
  { icon: DoorOpen, title: 'Access', body: 'When a cover, container or hatch was opened.' },
  { icon: Hourglass, title: 'Time in condition', body: 'How long it has been stored or parked, against its limits.' },
  { icon: Smartphone, title: 'Check-ins', body: 'A phone tap on the device logs a visit and shows the asset’s status. Nothing to type.' },
];

const FITS: Array<{ icon: LucideIcon; title: string; body: string }> = [
  { icon: Plane, title: 'Aircraft & engines', body: 'In storage: engines in containers or bags, and parked aircraft. This is where we start.' },
  { icon: Truck, title: 'Trucks & land vehicles', body: 'In operation and parked.' },
  { icon: Ship, title: 'Vessels & yachts', body: 'At sea and laid up.' },
];

export function PhysicalWorld() {
  return (
    <div className="mt-12 grid grid-cols-1 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] gap-12 md:gap-16 items-start">
      <div>
        <h3 className="font-sans text-[15px] font-semibold text-brand-navy">What it measures</h3>
        <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-10 border-t-[3px] border-brand-teal">
          {MEASURES.map(({ icon: Icon, title, body }) => (
            <li key={title} className="flex gap-4 py-5 border-b border-surface-border">
              <Icon size={24} strokeWidth={1.5} className="shrink-0 mt-0.5 text-brand-navy" aria-hidden="true" />
              <div>
                <span className="block font-body font-semibold text-[18px] leading-[1.3] text-brand-navy">{title}</span>
                <p className="mt-1 font-body text-[15px] leading-[1.5] text-text-body">{body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="font-sans text-[15px] font-semibold text-brand-navy">Where it goes</h3>
        <ul className="mt-4 border-t-[3px] border-brand-teal">
          {FITS.map(({ icon: Icon, title, body }) => (
            <li key={title} className="flex gap-4 py-5 border-b border-surface-border">
              <Icon size={24} strokeWidth={1.5} className="shrink-0 mt-0.5 text-brand-navy" aria-hidden="true" />
              <div>
                <span className="block font-body font-semibold text-[18px] leading-[1.3] text-brand-navy">{title}</span>
                <p className="mt-1 font-body text-[15px] leading-[1.5] text-text-body">{body}</p>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-6 font-body text-[15px] leading-[1.6] text-text-body">
          Every reading goes into the same forecast as the records: what the asset will need, cost and owe when it goes
          back to work.
        </p>
      </div>
    </div>
  );
}

export function ThreePatterns() {
  return (
    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10">
      {PATTERNS.map((p) => (
        <div key={p.title} className="border-t-[3px] border-brand-teal pt-6">
          <h3 className="font-body font-semibold text-[24px] text-brand-navy">{p.title}</h3>
          <p className="mt-3 font-body text-[17px] leading-[1.6] text-text-body">{p.body}</p>
        </div>
      ))}
    </div>
  );
}
