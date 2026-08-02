import Image from 'next/image';
import SectionRail from '@/components/SectionRail';
import { PERSONAS } from '@/lib/personas';
import { getVertical } from '@/lib/verticals';

export default function FivePersonas() {
  return (
    <section className="bg-hub-base">
      <div className="max-w-content mx-auto px-5 sm:px-7 py-[clamp(32px,5vw,72px)]">
        <SectionRail index="06" label="WHO CARRIES THIS" />

        <h2
          className="font-body font-bold uppercase text-text-on-dark leading-[1.05] tracking-[-0.02em] text-[clamp(28px,3.5vw,44px)] max-w-[760px]"
          style={{ textWrap: 'balance' }}
        >
          The person who has to answer for it.
        </h2>

        <div className="mt-10 border-t border-hub-line">
          {PERSONAS.map((p) => {
            const v = getVertical(p.key);
            // Drone reuses Air's logo (no dedicated asset yet), so each row
            // also names the asset category explicitly — the logo alone can't
            // disambiguate Air from Drone, and each vertical covers more than
            // just its headline noun (Air = aircraft & engines, etc.).
            return (
              <div
                key={p.key}
                className="grid grid-cols-1 md:grid-cols-[220px_260px_1fr] gap-x-8 gap-y-3 items-center py-7 border-b border-hub-line"
              >
                <Image
                  src={`/images/logos/fletaris-${p.key}.png`}
                  alt={`Fletaris ${v.label}`}
                  width={174}
                  height={63}
                  className="h-10 w-auto"
                  style={{ width: 'auto', height: '2.5rem' }}
                />
                <div>
                  <div className="font-mono text-[9.5px] font-medium uppercase tracking-[0.1em] text-brand-teal">
                    {v.assetCategory}
                  </div>
                  <h3 className="mt-1.5 font-sans font-semibold text-text-on-dark text-base">{p.title}</h3>
                </div>
                <p className="font-body font-light text-text-on-dark-dim text-[14.5px] leading-[1.55] max-w-[440px]">
                  {p.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
