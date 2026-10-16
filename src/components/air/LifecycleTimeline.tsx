'use client';

import { Fragment, useState } from 'react';
import { LIFECYCLE_TABS, LIFECYCLE_VIEWS, type LifecycleBar } from '@/lib/airLifecycleViews';
import { useInView } from '@/lib/useInView';

// /air §03 lifecycle timeline (example data). Desktop: a 12-month track chart whose bars
// draw left to right when it scrolls into view. Below 720px the chart can't be read, so it
// becomes a month-by-month list of the same events (audit finding B8).

const BAR: Record<string, string> = {
  'green-dim': 'bg-status-green/10 text-[#86EFAC] border border-status-green/30',
  'green-solid': 'bg-status-green/55 text-white border border-status-green/85',
  'amber-dim': 'bg-status-amber/10 text-[#FCD34D] border border-dashed border-status-amber/45',
  'amber-solid': 'bg-status-amber/55 text-white border border-status-amber/85',
  'red-dim': 'bg-status-red/10 text-[#FCA5A5] border border-status-red/35',
  'red-solid': 'bg-status-red/65 text-white border border-status-red/90',
  'teal-dim': 'bg-brand-teal/10 text-brand-teal border border-brand-teal/30',
  'teal-solid': 'bg-brand-teal/45 text-white border border-brand-teal',
};

const DOT: Record<string, string> = {
  green: 'bg-status-green',
  amber: 'bg-status-amber',
  red: 'bg-status-red',
  teal: 'bg-brand-teal',
};

/** "**x**" → <b>x</b>; the data marks emphasis this way instead of carrying HTML. */
function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split('**').map((part, i) =>
        i % 2 ? (
          <b key={i} className="font-semibold text-text-on-dark">
            {part}
          </b>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        )
      )}
    </>
  );
}

const isEvent = (b: LifecycleBar) => b.cls.endsWith('-solid') || b.cls === 'amber-dim';
const tone = (b: LifecycleBar) => b.cls.split('-')[0];

export default function LifecycleTimeline({ months }: { months: Array<{ label: string; quarter?: string }> }) {
  const [tab, setTab] = useState('msn7842');
  const view = LIFECYCLE_VIEWS[tab] ?? LIFECYCLE_VIEWS.fleet;
  const { ref, show: grow, reduced } = useInView<HTMLDivElement>();

  // Mobile list: every event-like bar, placed in the month where it starts.
  const events = view.tracks
    .flatMap((tr) => tr.bars.filter(isEvent).map((b) => ({ track: tr.name, bar: b, month: Math.min(11, Math.floor((b.l / 100) * 12)) })))
    .sort((a, b) => a.month - b.month);

  return (
    <div ref={ref} className="mt-12 border border-hub-line rounded bg-hub-raised overflow-hidden">
      {/* header */}
      <div className="flex items-center gap-4 px-5 sm:px-8 py-5 border-b border-hub-line">
        <div className="hidden sm:flex items-center justify-center w-11 h-11 rounded border border-brand-teal/40 bg-brand-teal/10 shrink-0">
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path
              d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
              fill="#00C4CC"
            />
          </svg>
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="font-sans font-bold text-[22px] text-text-on-dark">{view.msn}</span>
            <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-brand-teal">{view.reg}</span>
          </div>
          <div className="mt-1 flex flex-wrap gap-x-2 gap-y-0.5 font-mono text-[12px] text-text-on-dark-dim">
            {view.sub.map((s, i) => (
              <Fragment key={s}>
                {i > 0 && <span className="text-hub-line" aria-hidden="true">·</span>}
                <span>
                  <Rich text={s} />
                </span>
              </Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* tabs */}
      <div role="tablist" aria-label="Choose a view" className="flex overflow-x-auto border-b border-hub-line">
        {LIFECYCLE_TABS.map((t) => {
          const active = t.key === tab;
          return (
            <button
              key={t.key}
              type="button"
              role="tab"
              aria-selected={active}
              aria-controls="lc-panel"
              onClick={() => setTab(t.key)}
              className={`shrink-0 px-5 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] border-r border-hub-line border-b-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-teal ${
                active ? 'text-brand-teal border-b-brand-teal bg-brand-teal/5' : 'text-text-on-dark-dim border-b-transparent hover:text-text-on-dark'
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div id="lc-panel" role="tabpanel">
        {/* desktop chart */}
        <div className="hidden sm:block px-5 sm:px-8 pt-8 pb-4">
          <div className="grid grid-cols-[180px_minmax(0,1fr)] md:grid-cols-[220px_minmax(0,1fr)]">
            <div className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-hub-dim self-end pb-2">Forward window</div>
            <div className="relative grid grid-cols-12">
              {months.map((m, i) => (
                <div key={m.label + i} className="relative text-center pb-2">
                  {m.quarter && (
                    <div className="absolute -top-4 inset-x-0 font-mono text-[9.5px] tracking-[0.1em] text-hub-dim">{m.quarter}</div>
                  )}
                  <span className={`font-mono text-[10.5px] font-semibold tracking-[0.08em] ${i === 0 ? 'text-brand-teal' : 'text-hub-dim'}`}>
                    {i === 0 ? 'NOW' : m.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            {/* NOW line, at the middle of the first month */}
            <div className="absolute inset-y-0 grid grid-cols-[180px_minmax(0,1fr)] md:grid-cols-[220px_minmax(0,1fr)] w-full pointer-events-none" aria-hidden="true">
              <div />
              <div className="relative">
                <div
                  className="absolute inset-y-0 w-px bg-brand-teal origin-top transition-transform duration-700 ease-out"
                  style={{ left: `${100 / 24}%`, transform: grow ? 'scaleY(1)' : 'scaleY(0)' }}
                />
              </div>
            </div>
            {view.tracks.map((tr, ti) => (
              <div key={tr.name} className="grid grid-cols-[180px_minmax(0,1fr)] md:grid-cols-[220px_minmax(0,1fr)] items-center border-t border-hub-line py-4">
                <div className="pr-4 min-w-0">
                  <div className="font-sans text-[13.5px] font-semibold text-text-on-dark truncate">{tr.name}</div>
                  <div className="font-mono text-[11px] text-hub-dim truncate">{tr.sub}</div>
                </div>
                <div className="relative h-8">
                  {tr.bars.map((b, bi) => (
                    <div
                      key={bi}
                      className={`absolute top-0 h-8 rounded-sm flex items-center px-2.5 font-mono text-[10.5px] font-bold uppercase tracking-[0.06em] whitespace-nowrap overflow-hidden origin-left transition-transform duration-700 ease-out ${BAR[b.cls] ?? BAR['green-dim']}`}
                      style={{
                        left: `${b.l}%`,
                        width: `${b.w}%`,
                        transform: grow ? 'scaleX(1)' : 'scaleX(0)',
                        transitionDelay: grow && !reduced ? `${ti * 60 + bi * 90}ms` : '0ms',
                      }}
                      title={`${tr.name}: ${b.t}`}
                    >
                      {b.flag && (
                        <span className="mr-2 px-1 border border-current rounded-sm text-[9px]">{b.flag}</span>
                      )}
                      {b.t}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* mobile list */}
        <ol className="sm:hidden divide-y divide-hub-line">
          {events.map((e, i) => (
            <li key={i} className="flex gap-4 px-5 py-4">
              <div className="w-14 shrink-0 font-mono text-[11px] font-semibold tracking-[0.08em] text-brand-teal pt-0.5">
                {e.month === 0 ? 'NOW' : months[e.month]?.label}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full shrink-0 ${DOT[tone(e.bar)] ?? DOT.teal}`} aria-hidden="true" />
                  <span className="font-sans text-[14px] font-semibold text-text-on-dark">{e.bar.t}</span>
                </div>
                <div className="mt-0.5 font-mono text-[11.5px] text-text-on-dark-dim">{e.track}</div>
              </div>
            </li>
          ))}
        </ol>

        {/* alerts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-hub-line">
          {view.alerts.map((a) => (
            <div key={a.name + a.body} className="flex gap-3 px-5 sm:px-6 py-5 border-b sm:border-r border-hub-line">
              <span className="mt-1.5 w-2 h-2 rounded-full shrink-0" style={{ background: a.dot }} aria-hidden="true" />
              <div className="min-w-0">
                <div className="font-mono text-[11px] font-bold uppercase tracking-[0.1em]" style={{ color: a.tone }}>
                  {a.name}
                </div>
                <div className="mt-1 font-body text-[13.5px] text-text-on-dark-dim leading-[1.45]">{a.body}</div>
                <div className="mt-1.5 font-mono text-[12px] font-semibold text-text-on-dark tabular-nums">{a.when}</div>
              </div>
            </div>
          ))}
        </div>

        {/* legend */}
        <div className="flex flex-wrap items-center justify-between gap-4 px-5 sm:px-8 py-4 font-mono text-[10.5px] uppercase tracking-[0.1em] text-text-on-dark-dim">
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <span className="flex items-center gap-2"><span className={`w-4 h-2 rounded-sm ${BAR['green-solid']}`} />Scheduled</span>
            <span className="flex items-center gap-2"><span className={`w-4 h-2 rounded-sm ${BAR['amber-dim']}`} />Action window</span>
            <span className="flex items-center gap-2"><span className={`w-4 h-2 rounded-sm ${BAR['red-solid']}`} />Risk</span>
            <span className="flex items-center gap-2"><span className={`w-4 h-2 rounded-sm ${BAR['teal-solid']}`} />Lease milestone</span>
            <span className="flex items-center gap-2"><span className="w-4 h-2 rounded-sm border border-white/30" />Within limits</span>
          </div>
          <div>
            <Rich text={view.legR} />
          </div>
        </div>
      </div>
    </div>
  );
}
