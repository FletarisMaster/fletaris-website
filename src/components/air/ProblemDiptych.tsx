import SectionHeading from '@/components/air/SectionHeading';

// /air §02: before / after. The page's one light section (Sam, 2026-10-15), which also shows
// the app in light mode, as in the demo video. "Before" sits on photo A (records on a desk,
// Wesley Tingey / Unsplash, see public/images/air/CREDITS.txt) under a flat navy tint.

const EVIDENCE = [
  { icon: 'warn', label: 'Fleet_tracking_v3_FINAL_v2.xlsx: version unknown', tag: '4 sheets' },
  { icon: 'clock', label: '“Return in 47 days?” on a sticky note, not in a system', tag: '47d ?' },
  { icon: 'cross', label: 'URGENT · OVERDUE · TBC stamped on records, not tracked', tag: '3 gaps' },
] as const;

function EvidenceIcon({ kind }: { kind: (typeof EVIDENCE)[number]['icon'] }) {
  const s = { stroke: '#FCA5A5', strokeWidth: 1.4, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      {kind === 'warn' && (
        <>
          <path d="M7 1.5L12.5 11.5H1.5L7 1.5Z" {...s} />
          <path d="M7 5.5V8.5" {...s} />
          <circle cx="7" cy="10.2" r="0.7" fill="#FCA5A5" />
        </>
      )}
      {kind === 'clock' && (
        <>
          <circle cx="7" cy="7" r="5.5" {...s} />
          <path d="M7 4V7L9 9" {...s} />
        </>
      )}
      {kind === 'cross' && <path d="M2 2L12 12M12 2L2 12" {...s} />}
    </svg>
  );
}

export default function ProblemDiptych() {
  return (
    <section className="bg-surface-page" id="problem">
      <div className="max-w-content mx-auto px-5 sm:px-7 py-[clamp(48px,7vw,104px)]">
        <SectionHeading
          tone="light"
          index="02"
          label="THE GAP NO TOOL ADDRESSES"
          title="Three problems,"
          accent="one forward view."
          lede="Your records tell you what happened. Your spreadsheets tell you what’s open. Nothing tells you what’s coming, until Fletaris."
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 border border-surface-border rounded overflow-hidden">
          {/* Before */}
          <div className="relative min-w-0 p-7 sm:p-10 text-text-on-dark bg-hub-base">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: 'url(/images/air/air-records.webp)' }}
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-hub-base/80" aria-hidden="true" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#FCA5A5] border border-[#FCA5A5]/40 rounded-sm px-2.5 py-1">
                <span className="w-1.5 h-1.5 rounded-full bg-status-red" />
                Before · what you see today
              </div>
              <h3 className="mt-6 font-sans font-semibold text-[22px] leading-[1.3] max-w-[440px]">
                A desk of overdue spreadsheets, sticky notes, and a deadline you can’t see clearly.
              </h3>
              <p className="mt-4 font-body text-[15px] leading-[1.6] text-text-on-dark-dim max-w-[440px]">
                Four spreadsheets, three formats, two people who know which file is current. Redelivery does not postpone
                for reconciliation.
              </p>
              <ul className="mt-8 flex flex-col gap-2.5">
                {EVIDENCE.map((e) => (
                  <li
                    key={e.label}
                    className="flex items-center gap-3 bg-hub-base/85 border border-hub-line rounded px-3.5 py-3 font-mono text-[12px] text-text-on-dark"
                  >
                    <span className="flex items-center justify-center w-7 h-7 rounded-sm bg-status-red/15 shrink-0">
                      <EvidenceIcon kind={e.icon} />
                    </span>
                    <span className="min-w-0 flex-1">{e.label}</span>
                    <span className="font-semibold uppercase tracking-[0.06em] text-[#FCA5A5] whitespace-nowrap">{e.tag}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* After */}
          <div className="min-w-0 p-7 sm:p-10 bg-surface-card">
            <div className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-navy border border-brand-teal rounded-sm px-2.5 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-teal" />
              After · what Fletaris shows
            </div>
            <h3 className="mt-6 font-sans font-semibold text-[22px] leading-[1.3] text-brand-navy max-w-[440px]">
              One structured aircraft view, updated from your records and projected forward.
            </h3>
            <p className="mt-4 font-body text-[15px] leading-[1.6] text-text-secondary max-w-[440px]">
              Every aircraft, every component, every milestone: current as of your last import, projected forward.
            </p>

            <div className="mt-8 border border-surface-border border-t-2 border-t-brand-teal rounded bg-surface-card p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-sans font-bold text-[26px] text-brand-navy leading-none">MSN 6291</div>
                  <div className="mt-1.5 font-mono text-[12px] text-text-secondary">Boeing 737-800</div>
                </div>
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-brand-navy bg-surface-page border border-surface-border rounded-sm px-2 py-1">
                  Example data
                </span>
              </div>
              <div className="mt-3 font-mono text-[12px] text-text-secondary tabular-nums">
                FH <b className="text-brand-navy">31,047</b> · FC <b className="text-brand-navy">8,204</b> · On lease
              </div>
              <div className="mt-5 pt-5 border-t border-surface-border grid grid-cols-2 gap-4">
                <div>
                  <div className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-text-secondary">Engines</div>
                  <div className="mt-1 font-body font-semibold text-brand-navy">2 × CFM56-7B</div>
                </div>
                <div>
                  <div className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-text-secondary">Reserve adequacy</div>
                  <div className="mt-1 font-body font-semibold text-brand-navy tabular-nums">96.2%</div>
                </div>
              </div>
              <div className="mt-5 pt-5 border-t border-surface-border flex items-end justify-between gap-4">
                <div>
                  <div className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-text-secondary">Redelivery in</div>
                  <div className="mt-1 flex items-baseline gap-1.5">
                    <span className="font-body font-bold text-[44px] leading-none text-status-red tabular-nums">42</span>
                    <span className="font-body text-text-secondary">days</span>
                  </div>
                </div>
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-[#B91C1C] bg-[#FEF2F2] border border-[#FECACA] rounded-sm px-2 py-1">
                  Action required
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
