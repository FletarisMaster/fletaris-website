'use client';

import { useEffect, useRef, useState } from 'react';
import { EVALUATED, WINDOW_DAYS, type DueState, type TimelineFleet } from '@/lib/timelineFleets';

// The fleet timeline (F36, direction D; option A of the 17 Oct 2026 motion review): a lease
// calendar with one "now" line, the playhead, that the visitor drags across every asset at once.
// It is the product's own waterfall view in miniature. Plays once from today to 12 months when it
// first comes into view (not under reduced motion); after that it only moves when the visitor
// moves it. With more than one fleet (the hub), a tab per vertical switches the example fleet.

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const QUARTERS = [91, 182, 274, 365, 456, 547, 639];
const AXIS = [0, 182, 365, 547, 730];

const STATE: Record<DueState, { label: string; tag: string; tick: string }> = {
  late: { label: 'Overdue', tag: 'bg-status-red/15 text-[#FCA5A5]', tick: 'bg-status-red' },
  notready: { label: 'Not ready', tag: 'bg-status-red/15 text-[#FCA5A5]', tick: 'bg-status-red' },
  marginal: { label: 'Marginal', tag: 'bg-status-amber/15 text-[#FCD34D]', tick: 'bg-status-amber' },
  ready: { label: 'Ready', tag: 'bg-status-green/15 text-[#86EFAC]', tick: 'bg-status-green' },
};
const WAIT_TAG = 'bg-white/10 text-[#94A3B8]';

// Row grid and the overlay's inset share these numbers, so the playhead, the month grid and each
// row's due tick sit on one scale: 112px label + 16px gap below md, 220px + 24px label and
// 260px + 24px status column from md up.
const ROW = 'grid grid-cols-[112px_minmax(0,1fr)] md:grid-cols-[220px_minmax(0,1fr)_260px] gap-x-4 md:gap-x-6';
const OVERLAY = 'absolute top-0 bottom-0 left-[128px] right-0 md:left-[244px] md:right-[284px]';

function monthLabel(days: number) {
  const d = new Date(EVALUATED + days * 86400000);
  return `${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}
const pct = (days: number) => Math.max(0, Math.min(100, (days / WINDOW_DAYS) * 100));
const months = (t: number) => Math.round(t / 30.4);

export default function FleetTimeline({ heading, lede, fleets }: { heading: string; lede: string; fleets: TimelineFleet[] }) {
  const [active, setActive] = useState(0);
  const [t, setT] = useState(365); // static HTML shows the 12-month picture
  const [focused, setFocused] = useState(false);
  const touched = useRef(false);
  const dragging = useRef(false);
  const ref = useRef<HTMLDivElement>(null);
  const overlay = useRef<HTMLDivElement>(null);
  const fleet = fleets[active];

  // Play once from today to 12 months the first time the section is on screen.
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches || typeof IntersectionObserver === 'undefined') return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    setT(0);
    let raf = 0;
    const io = new IntersectionObserver((entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      io.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        if (touched.current) return;
        const p = Math.min(1, (now - start) / 2400);
        setT(Math.round(365 * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { rootMargin: '0px 0px -30% 0px' });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  const move = (v: number) => {
    touched.current = true;
    setT(Math.max(0, Math.min(WINDOW_DAYS, Math.round(v))));
  };
  const fromPointer = (clientX: number) => {
    const r = overlay.current?.getBoundingClientRect();
    if (r && r.width > 0) move(((clientX - r.left) / r.width) * WINDOW_DAYS);
  };

  const due = fleet.assets.filter((a) => a.days !== null && a.days >= 0 && a.days <= t);
  const kpis = [
    { n: due.length, label: fleet.dueLabel, tone: 'text-brand-teal' },
    { n: due.filter((a) => a.state === 'notready').length, label: 'Not ready on the date', tone: 'text-[#FCA5A5]' },
    { n: due.filter((a) => a.state === 'marginal').length, label: 'Marginal', tone: 'text-[#FCD34D]' },
    { n: fleet.assets.filter((a) => a.state === 'late').length, label: 'Already overdue', tone: 'text-[#FCA5A5]' },
  ];

  return (
    <section className="bg-brand-navy text-white" id="fleet-timeline">
      <div ref={ref} className="max-w-content mx-auto px-5 sm:px-10 py-[clamp(64px,8vw,120px)]">
        <h2 className="font-body font-semibold text-[clamp(30px,3.6vw,48px)] leading-[1.1] tracking-[-0.02em] max-w-[820px]" style={{ textWrap: 'balance' }}>
          {heading}
        </h2>
        <p className="mt-5 font-body text-[18px] leading-[1.6] text-[#CBD5E1] max-w-[640px]">{lede}</p>

        {fleets.length > 1 && (
          <div role="tablist" aria-label="Example fleet" className="mt-10 flex flex-wrap gap-2">
            {fleets.map((f, i) => (
              <button
                key={f.key}
                type="button"
                role="tab"
                id={`fleet-tab-${f.key}`}
                aria-selected={i === active}
                aria-controls="fleet-panel"
                onClick={() => setActive(i)}
                className={`font-sans text-[14px] font-medium rounded-[3px] px-4 py-2.5 border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                  i === active ? 'bg-white text-brand-navy border-white' : 'bg-transparent text-[#CBD5E1] border-white/25 hover:border-white/60'
                }`}
              >
                {f.tab}
              </button>
            ))}
          </div>
        )}

        <div id="fleet-panel" role={fleets.length > 1 ? 'tabpanel' : undefined} aria-labelledby={fleets.length > 1 ? `fleet-tab-${fleet.key}` : undefined}>
          {/* the summary, in the product's own terms */}
          <dl className={`${fleets.length > 1 ? 'mt-8' : 'mt-12'} grid grid-cols-2 md:grid-cols-4 border-y border-white/15`} aria-live="polite">
            {kpis.map((k, i) => (
              <div
                key={k.label}
                className={`flex flex-col-reverse justify-end py-4 pr-4 ${i % 2 === 1 ? 'pl-4 border-l border-white/15' : ''} ${i >= 2 ? 'border-t border-white/15 md:border-t-0' : ''} ${i === 2 ? 'md:pl-4 md:border-l' : ''}`}
              >
                <dt className="mt-2 font-sans text-[13px] font-medium text-[#94A3B8]">{k.label}</dt>
                <dd className={`m-0 font-mono font-medium tabular-nums text-[clamp(28px,3.4vw,42px)] leading-none tracking-[-0.02em] ${k.tone}`}>{k.n}</dd>
              </div>
            ))}
          </dl>

          {/* the calendar */}
          <div className="relative mt-6 select-none">
            <div className={`${ROW} h-9 items-center font-mono text-[12px] text-[#94A3B8]`} aria-hidden="true">
              <div />
              <div className="relative h-full">
                {AXIS.map((d, i) => (
                  <span
                    key={d}
                    className={`absolute top-1/2 -translate-y-1/2 whitespace-nowrap ${i === 0 ? '' : i === AXIS.length - 1 ? '-translate-x-full' : '-translate-x-1/2'} ${i % 2 === 1 ? 'hidden sm:inline' : ''}`}
                    style={{ left: `${pct(d)}%`, opacity: Math.abs(d - t) < 75 ? 0 : 1 }}
                  >
                    {d === 0 ? 'Now' : monthLabel(d)}
                  </span>
                ))}
              </div>
            </div>

            <ul className="border-b border-white/15">
              {fleet.assets.map((a) => {
                const inWindow = a.days !== null;
                const reached = inWindow && (a.days as number) <= t;
                const pos = inWindow ? pct(a.days as number) : 100;
                const s = STATE[a.state];
                return (
                  <li
                    key={a.id}
                    className={`${ROW} items-center border-t border-white/15 py-2 md:py-0 md:h-[52px] transition-opacity duration-300 ${reached ? 'opacity-100' : 'opacity-60'}`}
                  >
                    <div className="font-sans min-w-0">
                      <div className="font-semibold text-[14px] leading-tight truncate">{a.id}</div>
                      <div className="font-body text-[12.5px] leading-snug text-[#94A3B8] truncate">{a.type}</div>
                    </div>
                    <div className="relative h-9" aria-hidden="true">
                      {/* below md the status text wraps under the track, so the playhead is drawn per row */}
                      <div className="md:hidden absolute inset-y-0 right-0 bg-hub-base/40" style={{ left: `${pct(t)}%` }} />
                      <div className="md:hidden absolute inset-y-0 w-[2px] -ml-px bg-brand-teal" style={{ left: `${pct(t)}%` }} />
                      <div className="absolute top-1/2 left-0 h-[2px] -mt-px bg-white/20" style={{ width: `${pos}%` }} />
                      {inWindow ? (
                        <>
                          <div
                            className={`absolute top-2 bottom-2 w-[3px] -ml-[1.5px] transition-colors ${reached ? s.tick : 'bg-[#94A3B8]'}`}
                            style={{ left: `${pos}%` }}
                          />
                          <span
                            className={`absolute top-1/2 -translate-y-1/2 font-mono text-[11.5px] text-[#94A3B8] whitespace-nowrap hidden sm:block ${pos > 80 ? '-translate-x-full -ml-2' : 'ml-2'}`}
                            style={{ left: `${pos}%` }}
                          >
                            {(a.days as number) < 0 ? `${a.days} d` : monthLabel(a.days as number)}
                          </span>
                        </>
                      ) : (
                        <span className="absolute right-0 top-1/2 -translate-y-1/2 font-mono text-[11.5px] text-[#94A3B8]">→ later</span>
                      )}
                    </div>
                    <div className="col-span-2 md:col-span-1 font-body text-[13.5px] leading-[1.35] text-[#94A3B8] min-w-0 pt-1 md:pt-0">
                      {!inWindow ? (
                        <>
                          <Tag className={WAIT_TAG}>Later</Tag>
                          {a.detail}
                        </>
                      ) : reached ? (
                        <span className="text-[#CBD5E1]">
                          <Tag className={s.tag}>{s.label}</Tag>
                          {a.detail || monthLabel(a.days as number)}
                        </span>
                      ) : (
                        <>
                          <Tag className={WAIT_TAG}>Due</Tag>
                          {monthLabel(a.days as number)}
                        </>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>

            {/* month grid, shade beyond the playhead, the playhead, and the drag area */}
            <div
              ref={overlay}
              className={`${OVERLAY} cursor-ew-resize touch-pan-y`}
              onPointerDown={(e) => {
                dragging.current = true;
                e.currentTarget.setPointerCapture(e.pointerId);
                fromPointer(e.clientX);
              }}
              onPointerMove={(e) => dragging.current && fromPointer(e.clientX)}
              onPointerUp={() => (dragging.current = false)}
              onPointerCancel={() => (dragging.current = false)}
              aria-hidden="true"
            >
              {QUARTERS.map((d) => (
                <i key={d} className="hidden md:block absolute top-9 bottom-0 w-px bg-white/[0.06] pointer-events-none" style={{ left: `${pct(d)}%` }} />
              ))}
              <div className="hidden md:block absolute top-9 bottom-0 right-0 bg-hub-base/40 pointer-events-none" style={{ left: `${pct(t)}%` }} />
              <div className="absolute top-0 bottom-0 pointer-events-none" style={{ left: `${pct(t)}%` }}>
                <div className="absolute top-8 h-1 md:h-auto md:bottom-0 -left-px w-[2px] bg-brand-teal" />
                <span
                  className={`absolute top-0 -translate-x-1/2 bg-brand-teal text-brand-navy font-mono text-[12px] font-semibold rounded-sm px-2 py-1.5 whitespace-nowrap ${focused ? 'ring-2 ring-white ring-offset-2 ring-offset-brand-navy' : ''}`}
                >
                  {t === 0 ? 'NOW' : monthLabel(t).toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          {/* keyboard and screen readers: the same control as a range input */}
          <label htmlFor="fleet-months" className="sr-only">
            Months ahead
          </label>
          <input
            id="fleet-months"
            type="range"
            min={0}
            max={WINDOW_DAYS}
            step={1}
            value={t}
            onChange={(e) => move(Number(e.target.value))}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="sr-only"
            aria-valuetext={`${months(t)} months ahead, ${t === 0 ? 'today' : monthLabel(t)}`}
          />

          <div className="mt-5 flex flex-wrap items-center gap-2 font-body text-[13px] text-[#94A3B8]">
            <span className="mr-1">Drag across the calendar, or jump to</span>
            {[
              [0, 'Today'],
              [182, '6 mo'],
              [365, '12 mo'],
              [730, '24 mo'],
            ].map(([d, l]) => (
              <button
                key={l}
                type="button"
                onClick={() => move(d as number)}
                aria-pressed={t === d}
                className={`font-sans text-[13px] font-medium rounded-[3px] px-3 py-1.5 border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                  t === d ? 'border-brand-teal text-white' : 'border-white/20 text-[#CBD5E1] hover:border-white/50'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
          <p className="mt-4 font-body text-[13px] text-[#94A3B8]">{fleet.caption}</p>
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <a href="#waitlist" className="inline-flex items-center bg-brand-teal text-brand-navy font-sans text-[15px] font-semibold rounded-[3px] px-5 py-3.5 hover:bg-brand-teal-light transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white">
            See this with your own fleet
          </a>
          <a
            href="#investors"
            data-investor-cta=""
            className="inline-flex items-center border border-white/40 text-white font-sans text-[15px] font-semibold rounded-[3px] px-5 py-3.5 hover:border-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Request the investor deck
          </a>
        </div>
      </div>
    </section>
  );
}

function Tag({ className, children }: { className: string; children: React.ReactNode }) {
  return (
    <b className={`inline-block mr-2 rounded-sm px-1.5 py-1 font-sans text-[11px] font-semibold uppercase tracking-[0.04em] leading-none align-[1px] ${className}`}>
      {children}
    </b>
  );
}
