'use client';

import { useEffect, useRef } from 'react';
import SectionHeading from '@/components/air/SectionHeading';

// /air §06: who it's for. Opens with photo B (a ground inspection under a widebody engine,
// Herry Sutanto / Unsplash, livery cropped out, see CREDITS.txt) as a wide strip that drifts
// up to 24px while scrolling. No drift under reduced motion.

const ROLES = ['Aviation asset managers', 'Independent CAMOs', 'Transition managers', 'Fleet directors', 'Appraisers'];

const LAYERS = [
  { name: 'Maintenance & engineering systems', desc: 'Execution-layer tools for engineers and technicians', role: 'Serves the engineer', active: false },
  { name: 'Fletaris', desc: 'Fleet intelligence · forward projection', role: 'Serves the asset manager', active: true },
  { name: 'Lessor finance & asset platforms', desc: 'Accounting-layer tools for finance teams', role: 'Serves the accountant', active: false },
];

function PhotoStrip() {
  const wrap = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = wrap.current?.getBoundingClientRect();
        if (!r || !img.current) return;
        // -1 when the strip enters at the bottom, +1 when it leaves at the top
        const p = Math.max(-1, Math.min(1, (window.innerHeight / 2 - (r.top + r.height / 2)) / window.innerHeight));
        img.current.style.transform = `translateY(${(-p * 24).toFixed(1)}px)`;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div ref={wrap} className="relative h-[clamp(220px,32vw,440px)] overflow-hidden border-y border-hub-line" aria-hidden="true">
      <div
        ref={img}
        className="absolute -inset-y-8 inset-x-0 bg-cover bg-[center_45%] will-change-transform"
        style={{ backgroundImage: 'url(/images/air/air-inspection.webp)' }}
      />
      <div className="absolute inset-0 bg-hub-base/20" />
    </div>
  );
}

export default function BuiltFor() {
  return (
    <section className="bg-hub-base" id="persona">
      <PhotoStrip />
      <div className="max-w-content mx-auto px-5 sm:px-7 py-[clamp(48px,7vw,104px)]">
        <SectionHeading
          index="06"
          label="BUILT FOR"
          title="The technical"
          accent="asset manager."
          lede="You carry the technical airworthiness of a portfolio that moves fast. Redeliveries, lease transitions, shop visit windows, reserve reconciliations: all running in parallel."
        />
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
          <div>
            <p className="border-l-2 border-brand-teal pl-6 font-sans font-medium text-[clamp(20px,2.2vw,28px)] leading-[1.35] text-text-on-dark">
              Not another maintenance system. You already have one. Fletaris is the layer above it: the one that tells you
              what next quarter looks like.
            </p>
            <ul className="mt-8 flex flex-wrap gap-2">
              {ROLES.map((r, i) => (
                <li
                  key={r}
                  className={`font-sans text-[12.5px] font-semibold rounded-full px-3.5 py-1.5 border ${
                    i === 0 ? 'bg-brand-teal text-hub-base border-brand-teal' : 'border-hub-line text-text-on-dark-dim'
                  }`}
                >
                  {r}
                </li>
              ))}
            </ul>
          </div>
          <div className="border border-hub-line rounded bg-hub-raised">
            <div className="px-6 pt-5 pb-3 font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-hub-dim">
              Where Fletaris sits
            </div>
            {LAYERS.map((l) => (
              <div
                key={l.name}
                className={`flex items-center gap-4 px-6 py-4 border-t border-hub-line ${l.active ? 'bg-brand-teal/5 border-l-2 border-l-brand-teal' : ''}`}
              >
                <div className="min-w-0 flex-1">
                  <div className={`font-sans text-[15px] font-semibold ${l.active ? 'text-brand-teal' : 'text-text-on-dark'}`}>{l.name}</div>
                  <div className="font-body text-[13px] text-text-on-dark-dim">{l.desc}</div>
                </div>
                <div className={`font-mono text-[11px] text-right w-28 shrink-0 ${l.active ? 'text-brand-teal font-semibold' : 'text-hub-dim'}`}>
                  {l.role}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
