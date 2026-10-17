'use client';

import { useEffect, useRef, useState } from 'react';

// The "drag the line" section (F36, direction D): the forward line becomes a control. An
// example fleet of eight aircraft, taken from the live product's lease & redelivery waterfall
// (demo portfolio, evaluated 15 Oct 2026; same fictional fleet as the demo video), comes due as
// the visitor moves from today to 24 months ahead. Plays once to 12 months when it first comes
// into view (not under reduced motion); after that it only moves when the visitor moves it.

const EVALUATED = Date.UTC(2026, 9, 15);
const WINDOW_DAYS = 730;
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

type State = 'late' | 'notready' | 'marginal' | 'ready';
const FLEET: Array<{ msn: string; type: string; days: number | null; state: State; detail: string }> = [
  { msn: '19000412', type: 'Embraer E190', days: -15, state: 'late', detail: '15 days past its return date' },
  { msn: '2391', type: 'Airbus A320', days: 40, state: 'notready', detail: '7 of 29 return conditions failing, est. compensation $518K' },
  { msn: '36712', type: 'Boeing 737-800', days: 80, state: 'marginal', detail: '' },
  { msn: '10488', type: 'Airbus A320neo', days: 151, state: 'ready', detail: '' },
  { msn: '1186', type: 'Airbus A330-300', days: 304, state: 'notready', detail: '15 of 29 return conditions failing' },
  { msn: '66914', type: 'Boeing 787-9', days: 488, state: 'marginal', detail: '' },
  { msn: '43991', type: 'Boeing 737 MAX 8', days: 670, state: 'ready', detail: '' },
  { msn: '233', type: 'Airbus A350-900', days: null, state: 'notready', detail: 'Returns after this 24-month window' },
];

const STATE = {
  late: { label: 'Overdue', dot: 'bg-status-red', text: 'text-[#FCA5A5]' },
  notready: { label: 'Not ready', dot: 'bg-status-red', text: 'text-[#FCA5A5]' },
  marginal: { label: 'Marginal', dot: 'bg-status-amber', text: 'text-[#FCD34D]' },
  ready: { label: 'Ready', dot: 'bg-status-green', text: 'text-[#86EFAC]' },
} as const;

function monthLabel(days: number) {
  const d = new Date(EVALUATED + days * 86400000);
  return `${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

export default function FleetTimeline({ heading, lede }: { heading: string; lede: string }) {
  const [t, setT] = useState(365); // static HTML shows the 12-month picture
  const touched = useRef(false);
  const ref = useRef<HTMLDivElement>(null);

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
        const p = Math.min(1, (now - start) / 2600);
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

  // Same reading as the product's own summary line: returns in the window, how many will not be
  // ready (or only marginal) on their date, and the aircraft already past its return date.
  const due = FLEET.filter((a) => a.days !== null && a.days >= 0 && a.days <= t);
  const returning = due.length;
  const notReady = due.filter((a) => a.state === 'notready').length;
  const marginal = due.filter((a) => a.state === 'marginal').length;
  const overdue = FLEET.filter((a) => a.state === 'late').length;
  const when = t === 0 ? 'Today' : `By ${monthLabel(t)}`;

  return (
    <section className="bg-brand-navy text-white" id="fleet-timeline">
      <div ref={ref} className="max-w-content mx-auto px-5 sm:px-10 py-[clamp(64px,8vw,120px)]">
        <h2 className="font-body font-semibold text-[clamp(30px,3.6vw,48px)] leading-[1.1] tracking-[-0.02em] max-w-[820px]" style={{ textWrap: 'balance' }}>
          {heading}
        </h2>
        <p className="mt-5 font-body text-[18px] leading-[1.6] text-[#CBD5E1] max-w-[640px]">{lede}</p>

        {/* the live reading, like the product's own summary line */}
        <p className="mt-12 font-body font-medium text-[clamp(22px,2.6vw,34px)] leading-[1.3] max-w-[900px] min-h-[2.6em]" aria-live="polite">
          {returning === 0 ? (
            <>{when}: no returns yet.</>
          ) : (
            <>
              {when}: <b className="font-semibold text-brand-teal">{returning} aircraft</b> {returning === 1 ? 'comes' : 'come'} back.
              {notReady > 0 && (
                <>
                  {' '}
                  <b className="font-semibold text-[#FCA5A5]">{notReady}</b> won’t be ready on the date
                  {marginal > 0 ? (
                    <>
                      , <b className="font-semibold text-[#FCD34D]">{marginal}</b> marginal.
                    </>
                  ) : (
                    '.'
                  )}
                </>
              )}
              {notReady === 0 && marginal > 0 && (
                <>
                  {' '}
                  <b className="font-semibold text-[#FCD34D]">{marginal}</b> marginal.
                </>
              )}
            </>
          )}{' '}
          {overdue > 0 && (
            <span className="text-[#CBD5E1]">
              And <b className="font-semibold text-[#FCA5A5]">{overdue}</b> is already past its return date.
            </span>
          )}
        </p>

        {/* the control: the forward line, draggable. Same columns as the fleet rows below, and the
            rows' tracks are inset by the handle's radius (12px), so handle and diamonds line up. */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-[220px_minmax(0,1fr)_280px] gap-x-6 gap-y-3 items-center">
          <label htmlFor="fleet-months" className="block font-sans text-[15px] font-medium text-[#CBD5E1]">
            Months ahead: <span className="text-white tabular-nums">{Math.round(t / 30.4)}</span>
          </label>
          <div>
          <input
            id="fleet-months"
            type="range"
            min={0}
            max={WINDOW_DAYS}
            step={1}
            value={t}
            onChange={(e) => {
              touched.current = true;
              setT(Number(e.target.value));
            }}
            className="fleet-range w-full block"
            style={{ ['--p' as string]: `${(t / WINDOW_DAYS) * 100}%` }}
            aria-valuetext={`${Math.round(t / 30.4)} months ahead`}
          />
          <div className="relative mt-2 mx-3 h-5 font-sans text-[13px] text-[#94A3B8]" aria-hidden="true">
            {['Today', '6 mo', '12 mo', '18 mo', '24 mo'].map((m, i) => (
              <span key={m} className="absolute -translate-x-1/2 whitespace-nowrap" style={{ left: `${i * 25}%` }}>
                {m}
              </span>
            ))}
          </div>
          </div>
        </div>

        {/* the fleet */}
        <ul className="mt-12 border-t border-white/15">
          {FLEET.map((a) => {
            const inWindow = a.days !== null;
            const reached = inWindow && (a.days as number) <= t;
            const pos = inWindow ? Math.max(0, Math.min(100, ((a.days as number) / WINDOW_DAYS) * 100)) : 100;
            const s = STATE[a.state];
            return (
              <li key={a.msn} className="grid grid-cols-1 md:grid-cols-[220px_minmax(0,1fr)_280px] gap-x-6 gap-y-2 items-center py-4 border-b border-white/15">
                <div className="font-sans">
                  <span className="font-semibold">MSN {a.msn}</span>
                  <span className="ml-2 text-[14px] text-[#94A3B8]">{a.type}</span>
                </div>
                <div className="relative h-3 mx-3" aria-hidden="true">
                  <div className="absolute inset-y-[5px] left-0 right-0 bg-white/10 rounded-full" />
                  {inWindow && (
                    <>
                      <div
                        className="absolute inset-y-[5px] left-0 rounded-full bg-brand-teal/70"
                        style={{ width: `${Math.min(pos, (t / WINDOW_DAYS) * 100)}%` }}
                      />
                      <div
                        className={`absolute top-0 w-3 h-3 -ml-1.5 rotate-45 rounded-[1px] transition-colors ${reached ? s.dot : 'bg-white/40'}`}
                        style={{ left: `${pos}%` }}
                      />
                    </>
                  )}
                </div>
                <div className="font-body text-[14px] leading-[1.4]">
                  {inWindow ? (
                    reached ? (
                      <span className={s.text}>
                        <b className="font-semibold">{s.label}</b> · {a.days! < 0 ? a.detail : [monthLabel(a.days!), a.detail].filter(Boolean).join('. ')}
                      </span>
                    ) : (
                      <span className="text-[#94A3B8]">Returns {monthLabel(a.days!)}</span>
                    )
                  ) : (
                    <span className="text-[#94A3B8]">{a.detail}</span>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
        <p className="mt-4 font-body text-[13px] text-[#94A3B8]">
          Example portfolio from the live product, evaluated 15 October 2026. Readiness is Fletaris’s estimate at each return date.
        </p>

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
