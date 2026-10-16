'use client';

import SectionHeading from '@/components/air/SectionHeading';
import { useInView } from '@/lib/useInView';

// /air §04: the three pillars, named as in the demo video and the deck ("Foresight.
// Visibility. Readiness."). Each glyph animates once when the row scrolls into view.

const PILLARS = [
  {
    key: 'foresight',
    name: 'Foresight',
    eyebrow: 'Rolling forward projection',
    title: 'See what’s coming.',
    body: 'Project component life limits and shop visit forecasts forward. Know cost exposure before it becomes a constraint.',
  },
  {
    key: 'visibility',
    name: 'Visibility',
    eyebrow: 'One screen · entire portfolio',
    title: 'One screen, every aircraft.',
    body: 'Your fleet on one dashboard, current as of your last import. Airframe, engines, APU, gear, ADs: one place.',
  },
  {
    key: 'readiness',
    name: 'Readiness',
    eyebrow: 'Before the audit or the return',
    title: 'Arrive prepared.',
    body: 'Know your compliance and airworthiness posture before your next audit or redelivery. No last-minute surprises.',
  },
] as const;

function Glyph({ kind, on }: { kind: (typeof PILLARS)[number]['key']; on: boolean }) {
  const t = (delay = 0) => ({ transition: `stroke-dashoffset 900ms ease-out ${delay}ms, opacity 400ms ease-out ${delay}ms` });
  if (kind === 'foresight') {
    // a line projecting forward, then the arrowhead
    return (
      <svg width="88" height="48" viewBox="0 0 88 48" fill="none" aria-hidden="true">
        <path d="M4 24H80" stroke="#00C4CC" strokeWidth="6" strokeLinecap="round" pathLength={1} strokeDasharray="1" strokeDashoffset={on ? 0 : 1} style={t()} />
        <path d="M60 6L80 24L60 42" stroke="#00C4CC" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray="1" strokeDashoffset={on ? 0 : 1} style={t(500)} />
      </svg>
    );
  }
  if (kind === 'visibility') {
    // a 4×3 grid of aircraft tiles filling in
    return (
      <svg width="88" height="48" viewBox="0 0 88 48" fill="none" aria-hidden="true">
        {Array.from({ length: 12 }, (_, i) => (
          <rect
            key={i}
            x={2 + (i % 4) * 22}
            y={2 + Math.floor(i / 4) * 16}
            width="18"
            height="12"
            rx="1.5"
            fill="#00C4CC"
            opacity={on ? (i === 5 ? 1 : 0.35) : 0}
            style={{ transition: `opacity 300ms ease-out ${i * 60}ms` }}
          />
        ))}
      </svg>
    );
  }
  // readiness: three checks ticking in turn
  return (
    <svg width="88" height="48" viewBox="0 0 88 48" fill="none" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          d={`M${6 + i * 28} 26L${13 + i * 28} 33L${26 + i * 28} 16`}
          stroke="#00C4CC"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          strokeDasharray="1"
          strokeDashoffset={on ? 0 : 1}
          style={t(i * 250)}
        />
      ))}
    </svg>
  );
}

export default function Pillars() {
  const { ref, show } = useInView<HTMLDivElement>();
  return (
    <section className="bg-hub-base" id="pillars">
      <div className="max-w-content mx-auto px-5 sm:px-7 py-[clamp(48px,7vw,104px)]">
        <SectionHeading index="04" label="THREE PILLARS" title="Technical data," accent="translated into decisions." />
        <div ref={ref} className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-px bg-hub-line border border-hub-line rounded overflow-hidden">
          {PILLARS.map((p, i) => (
            <div key={p.key} className="bg-hub-base p-8 transition-colors hover:bg-hub-raised">
              <div className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-brand-teal">
                / 4.{i + 1} — {p.name}
              </div>
              <div className="mt-6 h-12">
                <Glyph kind={p.key} on={show} />
              </div>
              <div className="mt-6 font-mono text-[10.5px] uppercase tracking-[0.12em] text-hub-dim">{p.eyebrow}</div>
              <h3 className="mt-2 font-sans font-semibold text-text-on-dark text-lg">{p.title}</h3>
              <p className="mt-3 font-body text-text-on-dark-dim text-[15px] leading-[1.55]">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
