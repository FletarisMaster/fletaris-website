'use client';

import { useState } from 'react';
import Image from 'next/image';
import SectionRail from '@/components/SectionRail';
import { VERTICALS, type VerticalKey } from '@/lib/verticals';
import { CAROUSEL_DATA, type CarouselRow } from '@/lib/carouselData';

const STATUS_BADGE: Record<NonNullable<CarouselRow['color']>, string> = {
  amber: 'bg-status-amber/15 border-status-amber/50 text-status-amber',
  red: 'bg-status-red/15 border-status-red/50 text-status-red',
  green: 'bg-status-green/15 border-status-green/50 text-status-green',
};
const DEFAULT_BADGE = 'bg-brand-teal/12 border-brand-teal/40 text-brand-teal';

// land.jpg: Sam's replacement fixed the highway-motion-shot issue (now a
// static yard shot), cropped further to exclude the legible company names
// visible in the original upload.
const IMAGE_AVAILABLE: Record<VerticalKey, boolean> = {
  air: true,
  drone: true,
  land: true,
  sea: true,
  space: true,
};

function Row({ row }: { row: CarouselRow }) {
  const badgeClass = row.color ? STATUS_BADGE[row.color] : DEFAULT_BADGE;
  return (
    <div className="flex items-center justify-between gap-3 py-2 border-b border-white/10 last:border-b-0">
      <span className="text-[12.5px] text-white/65">
        {row.prefix ?? row.suffix}
      </span>
      <span
        className={`font-mono text-[11px] tabular-nums font-medium px-2 py-1 rounded-sm border shrink-0 ${badgeClass}`}
      >
        {row.value}
      </span>
    </div>
  );
}

export default function AssetCarousel() {
  const [active, setActive] = useState<VerticalKey>('air');
  const entry = CAROUSEL_DATA[active];
  const hasImage = IMAGE_AVAILABLE[active];

  return (
    <section className="bg-surface-page">
      <div className="max-w-content mx-auto px-5 sm:px-7 py-[clamp(32px,5vw,72px)]">
        <SectionRail index="03" label="WHAT COUNTS AS AN ASSET" tone="light" />

        <h2
          className="font-body font-bold text-brand-navy leading-[1.05] tracking-[-0.02em] text-[clamp(28px,3.5vw,44px)] max-w-[720px]"
          style={{ textWrap: 'balance' }}
        >
          Five industries. <span className="text-brand-teal">The same three questions.</span>
        </h2>

        {/* Tabs */}
        <div className="mt-10 flex gap-8 border-b border-surface-border" role="tablist">
          {VERTICALS.map((v) => {
            const isActive = active === v.key;
            return (
              <button
                key={v.key}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(v.key)}
                className={`font-sans text-[11px] font-semibold uppercase tracking-[0.14em] pb-3 border-b-2 -mb-px transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal ${
                  isActive
                    ? 'text-brand-navy border-brand-teal'
                    : 'text-text-secondary border-transparent hover:text-brand-teal hover:border-brand-teal/30'
                }`}
              >
                {v.label}
              </button>
            );
          })}
        </div>

        {/* Panel — photo as full-bleed background, data card overlaid so the
            data (the actual point) reads first; the photo is supporting
            texture, not the focus. */}
        <div
          key={active}
          className="relative mt-10 w-full aspect-[4/3] sm:aspect-[16/9] rounded overflow-hidden bg-hub-card animate-[carouselFade_200ms_ease]"
        >
          {hasImage ? (
            <Image
              src={`/images/hub/${active}.jpg`}
              alt={entry.imageAlt}
              fill
              sizes="(min-width: 1140px) 1140px, 100vw"
              className="object-cover"
              style={{ filter: 'grayscale(0.75) contrast(1.05)' }}
              priority={active === 'air'}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-hub-dim">
                ASSET PENDING — {entry.imageAlt}
              </span>
            </div>
          )}
          {/* navy duotone + legibility gradient, per §8.3 */}
          <div className="absolute inset-0 bg-brand-navy/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
            <div className="relative w-full max-w-[380px] bg-hub-base/80 backdrop-blur-md border border-white/10 rounded overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-teal/70 to-transparent" />
              <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-white/10">
                <span className="font-mono text-xs uppercase tracking-[0.06em] text-white/70">{entry.assetId}</span>
                {entry.illustrative ? (
                  <span className="font-mono text-[8.5px] uppercase tracking-[0.14em] text-white/40">
                    Illustrative
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.1em] text-status-green">
                    <span className="w-1.5 h-1.5 rounded-full bg-status-green shadow-[0_0_6px_#22C55E]" />
                    Live
                  </span>
                )}
              </div>
              <div className="px-5 pb-4 pt-1">
                {entry.rows.map((row, i) => (
                  <Row key={i} row={row} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
