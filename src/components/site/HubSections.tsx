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

// Hub-only blocks. Statuses are stated plainly: aviation is live, drones are in development,
// the rest are research. To an investor that reads as a focused start with a roadmap, not five
// products at once. Photo rule: the live vertical in colour, the ones still to come in black
// and white.

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

const STATUS: Record<string, string> = {
  'BUILT · V1': 'Live',
  'IN DEVELOPMENT': 'In development',
  RESEARCH: 'Research',
};

/** The five fleets as one compact list (replaces the row of five identical photo cards). */
export function FleetsList() {
  return (
    <ul className="mt-12 grid gap-3">
      {VERTICALS.map((v) => {
        const p = PERSONAS.find((x) => x.key === v.key);
        const photo = PHOTOS[v.key];
        const Icon = ICONS[v.key];
        const row = (
          <div
            className={`grid grid-cols-[72px_minmax(0,1fr)] sm:grid-cols-[120px_minmax(0,1fr)] md:grid-cols-[120px_minmax(0,4fr)_minmax(0,6fr)_210px] gap-x-5 md:gap-x-8 gap-y-1 items-center p-3 rounded-[3px] ${
              v.live ? 'bg-surface-band' : ''
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo.src}
              alt={photo.alt}
              width={560}
              height={700}
              loading="lazy"
              className={`row-span-3 md:row-span-1 w-full h-auto aspect-[4/3] object-cover block rounded-sm ${v.live ? '' : 'grayscale'}`}
            />
            <div className="flex items-center gap-3 min-w-0">
              <Icon size={22} strokeWidth={1.5} className={`shrink-0 ${v.live ? 'text-brand-navy' : 'text-text-secondary'}`} aria-hidden="true" />
              <span className="font-body font-semibold text-[20px] leading-[1.25] text-brand-navy">{v.assetCategory}</span>
            </div>
            {p && (
              <p className="col-start-2 md:col-start-auto font-body text-[15px] leading-[1.5] text-text-body">
                For the {p.title.toLowerCase()}: {p.body.charAt(0).toLowerCase() + p.body.slice(1)}.
              </p>
            )}
            <span className="col-start-2 md:col-start-auto md:justify-self-end whitespace-nowrap font-sans text-[14px] font-medium text-text-secondary">
              {v.live ? <span className="font-semibold text-brand-navy group-hover:underline">Live · Open Fletaris Air →</span> : STATUS[v.status]}
            </span>
          </div>
        );
        return (
          <li key={v.key}>
            {v.live ? (
              <Link href={v.href} className="block group rounded-[3px] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal">
                {row}
              </Link>
            ) : (
              row
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

const FITS = [
  { icon: Plane, title: 'Aircraft & engines', body: 'In storage: engines in containers or bags, and parked aircraft. This is where we start.' },
  { icon: Truck, title: 'Trucks & land vehicles', body: 'In operation and parked.' },
  { icon: Ship, title: 'Vessels & yachts', body: 'At sea and laid up.' },
];

export function PhysicalWorld() {
  return (
    <div className="mt-12 grid grid-cols-1 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] gap-12 md:gap-16 items-start">
      <div>
        <h3 className="font-sans text-[15px] font-semibold text-brand-navy">What it measures</h3>
        <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-7">
          {MEASURES.map(({ icon: Icon, title, body }) => (
            <li key={title} className="flex gap-4">
              <Icon size={24} strokeWidth={1.5} className="shrink-0 mt-0.5 text-brand-navy" aria-hidden="true" />
              <div>
                <span className="block font-body font-semibold text-[18px] leading-[1.3] text-brand-navy">{title}</span>
                <p className="mt-1 font-body text-[15px] leading-[1.5] text-text-body">{body}</p>
              </div>
            </li>
          ))}
        </ul>
        <h3 className="mt-12 font-sans text-[15px] font-semibold text-brand-navy">Where it goes</h3>
        <ul className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-x-10 gap-y-6">
          {FITS.map(({ icon: Icon, title, body }) => (
            <li key={title}>
              <Icon size={24} strokeWidth={1.5} className="text-brand-navy" aria-hidden="true" />
              <span className="mt-2 block font-body font-semibold text-[18px] leading-[1.3] text-brand-navy">{title}</span>
              <p className="mt-1 font-body text-[15px] leading-[1.5] text-text-body">{body}</p>
            </li>
          ))}
        </ul>
      </div>
      <figure className="m-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hub/air.webp"
          alt="An A320 parked on a wet apron, maintenance stairs at the forward door"
          width={1600}
          height={1200}
          loading="lazy"
          className="w-full h-auto aspect-[4/3] object-cover object-[50%_40%] block rounded-sm"
        />
        <figcaption className="mt-3 font-body text-[14px] leading-[1.5] text-text-secondary">
          Parked or in storage, an aircraft keeps ageing. The monitor records how, every day, and every reading feeds what it
          will need, cost and owe when it goes back to work.
        </figcaption>
      </figure>
    </div>
  );
}

export function ThreePatterns() {
  return (
    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10">
      {PATTERNS.map((p) => (
        <div key={p.title}>
          <h3 className="font-body font-semibold text-[24px] text-brand-navy">{p.title}</h3>
          <p className="mt-3 font-body text-[17px] leading-[1.6] text-text-body">{p.body}</p>
        </div>
      ))}
    </div>
  );
}
