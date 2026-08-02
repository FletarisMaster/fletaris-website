import { Plane, Truck, Ship, Satellite, type LucideIcon } from 'lucide-react';
import DroneIcon from '@/components/icons/DroneIcon';
import { VERTICALS, type VerticalKey } from '@/lib/verticals';

// §05's visual — full width, light ground to match the section. RAG status
// colors carry the contrast instead of a dark panel. Reuses §03's
// already-established metrics rather than a repeated "monitoring"
// placeholder, and each metric/event gets its own meaningful status color —
// five identical amber bars would read as "everything is equally urgent,"
// which isn't true and isn't useful.
type Status = 'green' | 'amber' | 'red';

interface TrackRow {
  key: VerticalKey;
  noun: string;
  metricLabel: string;
  metricValue: string;
  metricStatus: Status;
  eventLabel: string;
  eventWhen: string;
  eventMonths: number; // position on the 0–12 forward axis
  eventStatus: Status;
}

const ICONS: Record<VerticalKey, LucideIcon | typeof DroneIcon> = {
  air: Plane,
  drone: DroneIcon,
  land: Truck,
  sea: Ship,
  space: Satellite,
};

const TRACKS: TrackRow[] = [
  {
    key: 'air',
    noun: 'Aircraft',
    metricLabel: 'Reserve adequacy',
    metricValue: '96.2%',
    metricStatus: 'green',
    eventLabel: 'Redelivery',
    eventWhen: '42 days',
    eventMonths: 1.4,
    eventStatus: 'red',
  },
  {
    key: 'drone',
    noun: 'Drone',
    metricLabel: 'Battery cycles',
    metricValue: '412 / 500',
    metricStatus: 'amber',
    eventLabel: 'Authorization',
    eventWhen: '60 days',
    eventMonths: 2,
    eventStatus: 'amber',
  },
  {
    key: 'land',
    noun: 'Truck',
    metricLabel: 'To next service',
    metricValue: '18,400 km',
    metricStatus: 'green',
    eventLabel: 'RTM inspection',
    eventWhen: 'Q4',
    eventMonths: 4,
    eventStatus: 'green',
  },
  {
    key: 'sea',
    noun: 'Vessel',
    metricLabel: 'Hull coating life',
    metricValue: '61%',
    metricStatus: 'green',
    eventLabel: 'Special survey',
    eventWhen: '7 months',
    eventMonths: 7,
    eventStatus: 'green',
  },
  {
    key: 'space',
    noun: 'Satellite',
    metricLabel: 'Propellant remaining',
    metricValue: '31%',
    metricStatus: 'red',
    eventLabel: 'Licence renewal',
    eventWhen: 'Q2 2027',
    eventMonths: 10,
    eventStatus: 'green',
  },
];

const AXIS_MONTHS = [0, 3, 6, 9, 12];
const STATUS_BAR: Record<Status, string> = {
  green: 'bg-status-green/25 border-status-green',
  amber: 'bg-status-amber/25 border-status-amber',
  red: 'bg-status-red/25 border-status-red',
};
const STATUS_DOT: Record<Status, string> = {
  green: 'bg-status-green',
  amber: 'bg-status-amber',
  red: 'bg-status-red',
};
const STATUS_TEXT: Record<Status, string> = {
  green: 'text-status-green',
  amber: 'text-status-amber',
  red: 'text-status-red',
};

export default function ForwardCalendarSnapshot() {
  return (
    <div className="relative bg-surface-card border-2 border-brand-navy/15 rounded-lg overflow-hidden shadow-[0_16px_48px_-24px_rgba(30,45,74,0.35)]">
      <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-brand-teal to-transparent" />

      {/* header */}
      <div className="flex items-center justify-between gap-4 px-5 sm:px-8 py-5 border-b border-surface-border">
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-12 h-12 rounded bg-brand-teal/10 border border-brand-teal/25 flex items-center justify-center shrink-0">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00C4CC" strokeWidth="1.5">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 3v18M3 12h18" />
            </svg>
          </div>
          <div className="min-w-0">
            <div className="font-body font-bold text-text-primary text-lg leading-tight">Fleet forward view</div>
            <div className="font-mono text-[10.5px] text-text-secondary mt-1 tracking-[0.02em]">
              5 verticals · one method · fleet software solutions
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1.5 shrink-0">
          <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-surface-muted border border-surface-border rounded-sm px-2 py-1">
            Illustrative
          </span>
          <span className="font-mono text-[9.5px] text-surface-muted">SYNC 14:32 UTC</span>
        </div>
      </div>

      {/* month axis — hidden below sm: too little width for 5 tick labels
          to stay legible, and each track row gets its own NOW marker anyway */}
      <div className="hidden sm:block px-5 sm:px-8 pt-5">
        <div className="grid grid-cols-[188px_1fr] gap-0">
          <div />
          <div className="relative h-4">
            <div className="absolute left-0 top-[-4px] bottom-0 border-l-2 border-dotted border-brand-teal" />
            <span className="absolute left-0 -top-px -translate-x-1/2 font-mono text-[8px] font-bold tracking-[0.1em] text-brand-teal bg-surface-card px-1">
              NOW
            </span>
            {AXIS_MONTHS.map((m) => (
              <span
                key={m}
                className="absolute font-mono text-[9px] text-text-secondary uppercase tracking-[0.06em]"
                style={{ left: `${(m / 12) * 100}%`, transform: m === 0 ? 'translateX(8px)' : 'translateX(-50%)' }}
              >
                {m === 0 ? '' : `+${m}MO`}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* tracks: [icon+name] [status bar spanning to the event, event marker at the end] */}
      <div className="px-5 sm:px-8 pb-2 mt-3">
        {TRACKS.map((t) => {
          const Icon = ICONS[t.key];
          const widthPct = (t.eventMonths / 12) * 100;
          return (
            <div
              key={t.key}
              className="grid grid-cols-1 sm:grid-cols-[188px_1fr] gap-0 items-center py-3.5 border-t border-surface-border first:border-t-0"
            >
              <div className="flex items-center gap-2.5 min-w-0 pr-3">
                <Icon size={15} strokeWidth={1.5} className="text-brand-teal shrink-0" />
                <div className="min-w-0">
                  <div className="font-sans text-[12px] font-semibold text-text-primary truncate">{t.noun}</div>
                  <div className="font-body text-[9.5px] text-text-secondary truncate">{t.metricLabel}</div>
                </div>
              </div>

              <div className="relative h-9 mt-6 sm:mt-0">
                <div
                  className={`absolute inset-y-0 left-0 rounded-sm border-2 flex items-center px-3 min-w-[64px] ${STATUS_BAR[t.metricStatus]}`}
                  style={{ width: `${widthPct}%` }}
                >
                  <span className="font-mono text-[12px] font-bold tabular-nums text-text-primary whitespace-nowrap">
                    {t.metricValue}
                  </span>
                </div>
                <div
                  className="absolute top-0 bottom-0 flex flex-col items-center justify-center gap-1"
                  style={{ left: `${widthPct}%`, transform: 'translateX(-2px)' }}
                >
                  <span className={`w-3 h-9 rounded-sm border-l-2 ${STATUS_TEXT[t.eventStatus]}`} style={{ borderLeftColor: 'currentColor' }} />
                </div>
                {(() => {
                  const late = widthPct > 55;
                  return (
                    <div
                      className={`absolute -top-[15px] flex items-center gap-1 ${late ? 'flex-row-reverse' : ''}`}
                      style={late ? { right: `${100 - widthPct}%`, transform: 'translateX(-4px)' } : { left: `${widthPct}%`, transform: 'translateX(4px)' }}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[t.eventStatus]}`} />
                      <span className={`font-mono text-[8.5px] font-bold uppercase tracking-[0.03em] whitespace-nowrap ${STATUS_TEXT[t.eventStatus]}`}>
                        {t.eventLabel} · {t.eventWhen}
                      </span>
                    </div>
                  );
                })()}
              </div>
            </div>
          );
        })}
      </div>

      {/* alert footer */}
      <div className="grid grid-cols-1 sm:grid-cols-5 border-t border-surface-border">
        {TRACKS.map((t, i) => (
          <div
            key={t.key}
            className={`px-5 py-5 flex gap-3 items-start ${i > 0 ? 'sm:border-l border-t sm:border-t-0 border-surface-border' : ''}`}
          >
            <span className={`w-2 h-2 rounded-full mt-1 shrink-0 ${STATUS_DOT[t.eventStatus]}`} />
            <div className="min-w-0">
              <div className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-text-primary">
                {t.noun}
              </div>
              <div className="font-body text-[13px] text-text-secondary leading-[1.4] mt-1">{t.eventLabel}</div>
              <div className={`font-mono text-[12px] mt-1.5 tabular-nums font-semibold ${STATUS_TEXT[t.eventStatus]}`}>
                {t.eventWhen}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* legend + stats */}
      <div className="px-5 sm:px-8 py-3.5 border-t border-surface-border flex items-center justify-between flex-wrap gap-x-5 gap-y-2 bg-surface-page">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 font-mono text-[8.5px] uppercase tracking-[0.06em] text-text-secondary">
            <span className="w-2 h-2 rounded-full bg-status-green" />
            Healthy
          </span>
          <span className="flex items-center gap-1.5 font-mono text-[8.5px] uppercase tracking-[0.06em] text-text-secondary">
            <span className="w-2 h-2 rounded-full bg-status-amber" />
            Watch
          </span>
          <span className="flex items-center gap-1.5 font-mono text-[8.5px] uppercase tracking-[0.06em] text-text-secondary">
            <span className="w-2 h-2 rounded-full bg-status-red" />
            Action required
          </span>
        </div>
        <span className="font-mono text-[9.5px] text-text-secondary uppercase tracking-[0.04em]">
          5 verticals · 5 forward events
        </span>
      </div>
    </div>
  );
}
