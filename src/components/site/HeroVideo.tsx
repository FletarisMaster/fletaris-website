'use client';

import { useEffect, useRef, useState } from 'react';
import HeroEmail from '@/components/site/HeroEmail';
import RecordCard from '@/components/site/RecordCard';
import type { HeroRecord } from '@/lib/heroRecords';

// The footage hero (direction v2, 21 Oct 2026; brand decisions W21 video, W22 product over
// footage). A muted stock loop under a flat navy tint (W9 allows a flat tint, no gradient),
// a caps headline (W2: caps only here and in the closing band), the email field, and one
// asset's record set in HTML over the footage. With several records (the hub) the card follows
// the clip: the montage is one cut per fleet, `segment` seconds each, in the records' order.
//
// The video only plays from script, and only when it is on screen, motion is allowed and Data
// Saver is off; otherwise the poster stays (no `autoPlay` attribute, so no-JS also gets the
// poster). A visible pause button covers WCAG 2.2.2. The forward line (W11) runs once along the
// bottom of /air's hero, from "Today" to "Months ahead" (no fixed horizon).

export default function HeroVideo({
  video,
  poster,
  heading,
  lede,
  records,
  segment = 0,
  placeholder,
  below,
  forwardLine = false,
}: {
  video: string;
  poster: string;
  heading: string;
  lede: string;
  records: HeroRecord[];
  segment?: number;
  placeholder?: string;
  below?: React.ReactNode;
  forwardLine?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const [motion, setMotion] = useState(false);
  const [paused, setPaused] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const v = ref.current;
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    if (!v || window.matchMedia('(prefers-reduced-motion: reduce)').matches || nav.connection?.saveData) return;
    if (typeof IntersectionObserver === 'undefined') return;
    setMotion(true);
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !userPaused.current) v.play().catch(() => {});
      else v.pause();
    });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    userPaused.current = !userPaused.current;
    setPaused(userPaused.current);
    if (userPaused.current) v.pause();
    else v.play().catch(() => {});
  };

  const onTime = () => {
    const v = ref.current;
    if (!v || records.length < 2 || !segment) return;
    const i = Math.min(records.length - 1, Math.floor(v.currentTime / segment));
    if (i !== index) setIndex(i);
  };

  return (
    <section className="relative bg-brand-navy text-white overflow-hidden">
      <video
        ref={ref}
        className="absolute inset-0 w-full h-full object-cover"
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        onTimeUpdate={onTime}
      >
        <source src={video} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-[#152032]/75" aria-hidden="true" />

      {motion && (
        <button
          type="button"
          onClick={toggle}
          aria-pressed={paused}
          aria-label={paused ? 'Play the background video' : 'Pause the background video'}
          className="absolute z-10 top-4 right-5 sm:right-10 w-11 h-11 grid place-items-center rounded-[3px] bg-[#0B1120]/55 border border-white/35 text-white hover:bg-[#0B1120]/75 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal"
        >
          <svg width="14" height="14" viewBox="0 0 12 12" aria-hidden="true">
            {paused ? <path d="M3 1.5L10.5 6L3 10.5Z" fill="currentColor" /> : <path d="M2 1h3v10H2zM7 1h3v10H7z" fill="currentColor" />}
          </svg>
        </button>
      )}

      <div className="relative max-w-content mx-auto px-5 sm:px-10 pt-[clamp(56px,7vw,104px)] pb-[clamp(40px,5vw,64px)] md:min-h-[min(80vh,780px)] flex flex-col">
        <div className="flex-1 grid grid-cols-1 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] gap-10 md:gap-14 items-end">
          <div>
            <h1
              className="font-body font-bold uppercase text-white text-[clamp(34px,calc(5.2vw+14px),68px)] leading-[0.98] tracking-[-0.01em]"
              style={{ textWrap: 'balance' }}
            >
              {heading}
            </h1>
            <p className="mt-6 font-body text-[19px] leading-[1.6] text-[#E2E8F0] max-w-[540px]" style={{ textWrap: 'pretty' }}>
              {lede}
            </p>
            <div className="mt-8">
              <HeroEmail tone="dark" placeholder={placeholder} />
            </div>
            {below && <div className="mt-4 font-body text-[15px] text-[#CBD5E1]">{below}</div>}
          </div>
          <div className="md:justify-self-end w-full md:w-auto">
            {/* keyed, so a new record fades in (globals.css .record-card) instead of snapping */}
            <RecordCard key={index} record={records[index]} />
          </div>
        </div>

        {forwardLine && (
          <div className="mt-14" aria-hidden="true">
            <div className="relative h-px bg-white/30">
              <div className="forward-draw absolute inset-x-0 -top-px h-[3px] bg-brand-teal origin-left" />
            </div>
            <div className="mt-3 flex justify-between font-sans text-[14px] font-semibold text-white">
              <span>Today</span>
              <span>Months ahead</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
