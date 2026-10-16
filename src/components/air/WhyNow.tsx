'use client';

import { useEffect, useState } from 'react';
import SectionHeading from '@/components/air/SectionHeading';
import { useInView } from '@/lib/useInView';

// /air §05: the three sourced market figures (Sam's D3, 2026-10-15; same figures as pitch
// deck V6 §4 and the demo video). Each number counts up once on first view. Background: photo
// C (parked aircraft, Skyler Smith / Unsplash, livery softened, see CREDITS.txt) under a flat
// navy tint.

const FIGURES = [
  {
    tag: 'Fleet growth',
    prefix: '~',
    value: 49,
    suffix: 'K',
    unit: 'aircraft by 2044',
    title: 'The fleet you track is doubling',
    body: 'About 25,000 commercial aircraft were in service at the end of 2024. Airbus forecasts about 49,000 by 2044: twice the records, twice the commitments to project forward.',
    source: 'Source: Airbus Global Market Forecast 2025–2044',
  },
  {
    tag: 'Leased fleet',
    prefix: '~',
    value: 50,
    suffix: '%',
    unit: 'of the fleet leased',
    title: 'Half the fleet changes hands on a schedule',
    body: 'Roughly half of the world’s commercial fleet is leased. Every lease ends in a redelivery, and every redelivery is settled on the technical record.',
    source: 'Source: industry estimates, 2025 (range: nearly half to ~58%)',
  },
  {
    tag: 'Lessor portfolios',
    prefix: '~$',
    value: 318,
    suffix: 'B',
    unit: 'held by the top 31 lessors',
    title: 'Asset value rides on the record',
    body: 'The 31 largest lessors hold about 10,200 aircraft with an estimated portfolio value of $318B. What an aircraft is worth at return depends on what its records prove.',
    source: 'Source: AvBench Aircraft Lessors Portfolio Review, Jan 2026 (data: ch-aviation)',
  },
];

function CountUp({ value, run }: { value: number; run: boolean }) {
  const [n, setN] = useState(value);
  useEffect(() => {
    if (!run) {
      setN(0);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / 1200);
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, value]);
  return <>{n}</>;
}

export default function WhyNow() {
  const { ref, show, reduced } = useInView<HTMLDivElement>();
  return (
    <section className="relative bg-hub-base overflow-hidden" id="why-now">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/images/air/air-parked.webp)' }} aria-hidden="true" />
      <div className="absolute inset-0 bg-hub-base/85" aria-hidden="true" />
      <div className="relative max-w-content mx-auto px-5 sm:px-7 py-[clamp(48px,7vw,104px)]">
        <SectionHeading
          index="05"
          label="WHY IT MATTERS NOW"
          title="The fleet is doubling."
          accent="The spreadsheets aren’t."
          lede="More aircraft, more leases, and more asset value resting on what the technical record can prove."
        />
        <div ref={ref} className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-px bg-hub-line border border-hub-line rounded overflow-hidden">
          {FIGURES.map((f) => (
            <div key={f.tag} className="flex flex-col bg-hub-base/95 p-8">
              <div className="flex items-center gap-2 font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-text-on-dark-dim">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-teal" />
                {f.tag}
              </div>
              <div className="mt-6 font-body font-extrabold text-brand-teal leading-none tracking-[-0.03em] text-[clamp(52px,5.5vw,80px)] tabular-nums">
                <span className="sr-only">{`${f.prefix}${f.value}${f.suffix}`}</span>
                <span aria-hidden="true">
                  {f.prefix}
                  {reduced ? f.value : <CountUp value={f.value} run={show} />}
                  {f.suffix}
                </span>
              </div>
              <div className="mt-3 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-text-on-dark">{f.unit}</div>
              <h3 className="mt-6 font-sans font-semibold text-text-on-dark text-lg">{f.title}</h3>
              <p className="mt-3 font-body text-text-on-dark-dim text-[15px] leading-[1.55] flex-1">{f.body}</p>
              <p className="mt-6 pt-4 border-t border-hub-line font-body text-[12px] leading-[1.5] text-text-on-dark-dim">{f.source}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
