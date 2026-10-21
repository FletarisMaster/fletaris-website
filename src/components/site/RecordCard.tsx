import type { DueState } from '@/lib/timelineFleets';
import type { HeroRecord } from '@/lib/heroRecords';

// One asset's record, set in HTML over the hero footage (W22: product over footage, never a
// baked-in screenshot, always labelled as example data). Same structure as the Fletaris Air
// hangar card in the app (identity, usage, last route, status by domain, foresight), drawn as a
// dark product panel: monospace data (W6 allows mono inside product data), RAG colours only for
// states (W20), thin inner rules, no glow or blur (W9).

const TONE: Record<DueState, { label: string; text: string; dot: string; bar: string; tag: string }> = {
  late: { label: 'Overdue', text: 'text-[#FCA5A5]', dot: 'bg-status-red', bar: 'bg-status-red', tag: 'bg-status-red/15 text-[#FCA5A5]' },
  notready: { label: 'Not ready', text: 'text-[#FCA5A5]', dot: 'bg-status-red', bar: 'bg-status-red', tag: 'bg-status-red/15 text-[#FCA5A5]' },
  marginal: { label: 'Marginal', text: 'text-[#FCD34D]', dot: 'bg-status-amber', bar: 'bg-status-amber', tag: 'bg-status-amber/15 text-[#FCD34D]' },
  ready: { label: 'Ready', text: 'text-[#86EFAC]', dot: 'bg-status-green', bar: 'bg-status-green', tag: 'bg-status-green/15 text-[#86EFAC]' },
};

const LABEL = 'font-sans text-[11px] font-medium uppercase tracking-[0.06em] text-[#94A3B8]';

export default function RecordCard({ record: r }: { record: HeroRecord }) {
  const f = TONE[r.foresight.state];
  return (
    <div className="w-full md:w-[440px] max-w-full bg-[#0B1120]/[0.92] border border-white/15 rounded-[4px] text-white" aria-label={`${r.kind}: ${r.id}`}>
      <div className="flex items-center justify-between gap-4 px-5 py-2.5 border-b border-white/10">
        <span className="flex items-center gap-2 font-sans text-[12px] font-medium text-[#CBD5E1]">
          <span className="h-1.5 w-1.5 bg-brand-teal" aria-hidden="true" />
          {r.kind}
        </span>
        <span className="font-sans text-[12px] text-[#94A3B8]">Updated today</span>
      </div>

      <div className="px-5 pt-4 pb-5">
        <div className="flex items-baseline justify-between gap-4">
          <span className="font-mono text-[19px] font-semibold text-brand-teal tracking-[-0.01em]">{r.id}</span>
          <span className="font-body text-[14px] text-[#CBD5E1] text-right truncate">{r.type}</span>
        </div>
        <p className="mt-1 font-body text-[13px] text-[#94A3B8] truncate">{r.line}</p>

        <dl className="mt-4 grid grid-cols-3 gap-3">
          {r.stats.map(([k, v]) => (
            <div key={k} className="min-w-0">
              <dt className={LABEL}>{k}</dt>
              <dd className="m-0 mt-1 font-mono text-[14px] text-white tabular-nums truncate">{v}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-4">
          <div className="flex items-baseline justify-between">
            <span className={LABEL}>{r.track.label}</span>
            <span className="font-mono text-[12px] text-[#94A3B8]">{r.track.when}</span>
          </div>
          <div className="mt-1.5 flex items-center gap-2 font-mono text-[14px] text-white">
            <span className="shrink-0">{r.track.from}</span>
            <span className="relative flex-1 h-px bg-white/30" aria-hidden="true">
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-white" />
              <span className="absolute right-0 top-1/2 -translate-y-1/2 border-y-[4px] border-y-transparent border-l-[6px] border-l-white/60" />
            </span>
            <span className="shrink-0">{r.track.to}</span>
          </div>
        </div>

        <ul className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-1.5">
          {r.domains.map(([k, s]) => (
            <li key={k} className="flex items-center gap-1.5 rounded-[2px] border border-white/10 px-2 py-1.5 min-w-0">
              <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${TONE[s].dot}`} aria-hidden="true" />
              <span className="font-sans text-[11px] font-medium uppercase tracking-[0.04em] text-[#E2E8F0] truncate">{k}</span>
              <span className="sr-only">: {TONE[s].label}</span>
            </li>
          ))}
        </ul>

        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="flex items-center justify-between gap-3">
            <span className={LABEL}>Foresight</span>
            <b className={`rounded-sm px-1.5 py-1 font-sans text-[11px] font-semibold uppercase tracking-[0.04em] leading-none ${f.tag}`}>{f.label}</b>
          </div>
          <p className="mt-2 flex items-baseline gap-2 font-body">
            <span className="text-[15px] text-[#E2E8F0]">{r.foresight.event} in</span>
            <span className="font-mono text-[30px] font-semibold leading-none tabular-nums text-white">{r.foresight.days}</span>
            <span className="text-[15px] text-[#E2E8F0]">days</span>
          </p>
          <div className="mt-3 h-1.5 bg-white/10 rounded-full overflow-hidden" aria-hidden="true">
            <div className={`h-full ${f.bar}`} style={{ width: `${Math.round(Math.min(1, r.foresight.progress) * 100)}%` }} />
          </div>
          <p className="mt-2 font-body text-[13px] text-[#CBD5E1]">{r.foresight.progressLabel}</p>
          <p className={`mt-1 font-body text-[13px] ${f.text}`}>{r.foresight.detail}</p>
        </div>

        <p className="mt-4 font-body text-[12px] text-[#94A3B8]">{r.note}</p>
      </div>
    </div>
  );
}
