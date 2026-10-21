import { EVALUATED, type DueState } from '@/lib/timelineFleets';
import type { HeroRecord } from '@/lib/heroRecords';

// One asset's record, set in HTML over the hero footage (W22: product over footage, never a
// baked-in screenshot, always labelled as example data). Same structure as the Fletaris Air
// hangar card in the app (identity, usage, last route, status by domain, foresight), on the
// brand's dark surfaces (card #111827, header #152032, border #2D3F5C). Follows the product-screen
// rules of the design references: sentence-case grey labels (no tracked caps), tabular figures
// in Outfit (brand data rule), one right edge for figures, one status pill, pale-tint pills
// (brand dark-mode Option A), flat surfaces, and one finding stated in words.

const STATE: Record<DueState, { label: string; word: string; text: string; dot: string; bar: string; pill: string }> = {
  late: { label: 'Overdue', word: 'Overdue', text: 'text-[#F87171]', dot: 'bg-status-red', bar: 'bg-status-red', pill: 'bg-status-red/15 text-[#F87171]' },
  notready: { label: 'Not ready', word: 'Action', text: 'text-[#F87171]', dot: 'bg-status-red', bar: 'bg-status-red', pill: 'bg-status-red/15 text-[#F87171]' },
  marginal: { label: 'Marginal', word: 'Watch', text: 'text-[#FCD34D]', dot: 'bg-status-amber', bar: 'bg-status-amber', pill: 'bg-status-amber/15 text-[#FCD34D]' },
  ready: { label: 'Ready', word: 'OK', text: 'text-[#4ADE80]', dot: 'bg-status-green', bar: 'bg-status-green', pill: 'bg-status-green/15 text-[#4ADE80]' },
};

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
function onDate(days: number) {
  const d = new Date(EVALUATED + days * 86400000);
  return `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

const LABEL = 'font-body text-[12px] text-[#94A3B8]';

export default function RecordCard({ record: r }: { record: HeroRecord }) {
  const f = STATE[r.foresight.state];
  return (
    <div className="record-card w-full md:w-[440px] max-w-full bg-[#111827] border border-[#2D3F5C] rounded-[4px] text-white overflow-hidden" aria-label={`${r.kind}: ${r.id}`}>
      <div className="flex items-center justify-between gap-4 px-5 py-2.5 bg-[#152032] border-b border-[#2D3F5C]">
        <span className="flex items-center gap-2 font-sans text-[13px] font-medium text-[#CBD5E1]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo-mark.png" alt="" width={96} height={96} className="h-4 w-4" />
          {r.kind}
        </span>
        <span className="font-body text-[12px] text-[#94A3B8]">Updated today</span>
      </div>

      <div className="px-5 pt-4 pb-5">
        <div className="flex items-baseline justify-between gap-4">
          <span className="font-mono text-[18px] font-semibold text-brand-teal">{r.id}</span>
          <span className="font-body text-[14px] text-[#E2E8F0] text-right truncate">{r.type}</span>
        </div>
        <p className="mt-0.5 font-body text-[13px] text-[#94A3B8] truncate">{r.line}</p>

        <dl className="mt-4 grid grid-cols-3 gap-4">
          {r.stats.map(([k, v]) => (
            <div key={k} className="min-w-0">
              <dt className={`${LABEL} truncate`}>{k}</dt>
              <dd className="m-0 mt-0.5 font-body text-[16px] font-medium text-white tabular-nums truncate">{v}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-4">
          <div className="flex items-baseline justify-between gap-3">
            <span className={LABEL}>{r.track.label}</span>
            <span className="font-body text-[12px] text-[#94A3B8] tabular-nums">{r.track.when}</span>
          </div>
          <div className="mt-1 flex items-center gap-3">
            <span className="font-body text-[15px] font-medium text-white whitespace-nowrap">{r.track.from}</span>
            <span className="relative flex-1 h-px bg-[#475569]" aria-hidden="true">
              <span className="absolute right-0 top-1/2 -translate-y-1/2 border-y-[4px] border-y-transparent border-l-[6px] border-l-[#94A3B8]" />
            </span>
            <span className="font-body text-[15px] font-medium text-white whitespace-nowrap">{r.track.to}</span>
          </div>
        </div>

        <ul className="mt-4 grid grid-cols-2 gap-x-5 gap-y-1.5">
          {r.domains.map(([k, s]) => (
            <li key={k} className="flex items-center gap-2 min-w-0 font-body text-[14px]">
              <span className={`h-2 w-2 shrink-0 rounded-full ${STATE[s].dot}`} aria-hidden="true" />
              <span className="text-[#E2E8F0] truncate">{k}</span>
              <span className={`ml-auto ${STATE[s].text} whitespace-nowrap`}>{STATE[s].word}</span>
            </li>
          ))}
        </ul>

        <div className="mt-4 rounded-[3px] bg-[#152032] px-4 py-3.5">
          <div className="flex items-center justify-between gap-3">
            <span className="font-body text-[13px] text-[#CBD5E1]">
              {r.foresight.event} · <span className="tabular-nums">{onDate(r.foresight.days)}</span>
            </span>
            <span className={`flex-none whitespace-nowrap rounded-[3px] px-2 py-0.5 font-sans text-[12px] font-medium ${f.pill}`}>{f.label}</span>
          </div>
          <p className="mt-1 font-body text-white">
            <span className="text-[30px] font-semibold leading-tight tabular-nums">{r.foresight.days}</span>
            <span className="ml-1.5 text-[16px] text-[#E2E8F0]">days ahead</span>
          </p>
          <div className="mt-2 flex items-baseline justify-between gap-3 font-body text-[13px]">
            <span className="text-[#CBD5E1]">{r.foresight.measure[0]}</span>
            <span className="text-white tabular-nums">{r.foresight.measure[1]}</span>
          </div>
          <div className="mt-1.5 h-1.5 bg-[#2D3F5C] rounded-full overflow-hidden" aria-hidden="true">
            <div className={`h-full rounded-full ${f.bar}`} style={{ width: `${Math.round(Math.min(1, r.foresight.progress) * 100)}%` }} />
          </div>
          <p className={`mt-2.5 font-body text-[14px] ${f.text}`}>{r.foresight.detail}</p>
        </div>

        <p className="mt-3 font-body text-[12px] text-[#94A3B8]">{r.note}</p>
      </div>
    </div>
  );
}
