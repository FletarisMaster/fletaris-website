'use client';

import { useEffect, useRef, useState } from 'react';
import SectionRail from '@/components/SectionRail';

// /air hero (F36 PR 4b, D9): headline + CTAs on the left, the ~60 s Website cut of the demo
// in a dark app-window frame on the right (the app is recorded in light mode).
//
// Video behaviour (Sam, 2026-10-15): a silent 9.6 s loop plays while the frame is on screen;
// "Play" swaps in the full cut with controls and sound. Captions are burned in, so it works
// muted. Self-hosted on Cloudflare Pages (no third-party player). Before hydration, under
// reduced motion or Data Saver, the frame shows the still poster only.

const POSTER = '/media/fletaris-air-poster.webp';
const LOOP = '/media/fletaris-air-loop.mp4';
const FULL = '/media/fletaris-air-demo.mp4';

// The Website cut's captions (fletaris-video out/website.srt), for the transcript.
const TRANSCRIPT = [
  'Given the technical state of your fleet today, what does it mean for your commitments in the months ahead?',
  'Eight aircraft. Eight operators. Four continents. On a spreadsheet, it all looks fine. Fletaris shows you where it isn’t.',
  'Every aircraft and every engine carries its full technical picture.',
  'Across the portfolio, the lease waterfall puts it on one screen: who’s returning, when, and whether the reserves will cover it.',
  'Fletaris. Fleet intelligence that sees forward. Request early access at fletaris.com/air.',
];

type Mode = 'poster' | 'loop' | 'full';

export default function AirHero() {
  const [mode, setMode] = useState<Mode>('poster');
  const frameRef = useRef<HTMLDivElement>(null);
  const fullRef = useRef<HTMLVideoElement>(null);

  // Start the silent loop only when the frame is visible and motion/data allow it.
  useEffect(() => {
    const el = frameRef.current;
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches || nav.connection?.saveData) return;
    if (typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        setMode((m) => (m === 'poster' ? 'loop' : m));
        io.disconnect();
      }
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (mode === 'full') fullRef.current?.play().catch(() => {});
  }, [mode]);

  const playFull = () => {
    setMode('full');
    frameRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <section className="bg-hub-base border-b border-hub-line">
      <div className="max-w-content mx-auto px-5 sm:px-7 py-[clamp(32px,5vw,72px)] grid grid-cols-1 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-10 md:gap-12 items-center">
        <div>
          <SectionRail index="01" label="FLETARIS AIR" />
          <h1
            className="font-body font-extrabold uppercase text-text-on-dark leading-[0.96] tracking-[-0.02em] text-[clamp(36px,4.6vw,64px)]"
            style={{ textWrap: 'balance' }}
          >
            Your fleet’s technical condition.{' '}
            <span className="air-underline text-brand-teal">Projected forward.</span>
          </h1>
          <p className="mt-6 font-body text-[17px] leading-[1.6] text-text-on-dark-dim max-w-[460px]">
            A forward view of maintenance, redelivery exposure and compliance posture, built from the records your
            team already keeps.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#waitlist"
              className="inline-flex items-center gap-2.5 bg-brand-teal text-hub-base font-sans text-sm font-bold rounded px-5 py-3.5 hover:bg-brand-teal/90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-hub-base focus-visible:ring-brand-teal"
            >
              Request early access
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M2 8H14M14 8L9 3M14 8L9 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <button
              type="button"
              onClick={playFull}
              className="inline-flex items-center gap-2.5 border border-hub-line text-text-on-dark font-sans text-sm font-semibold rounded px-5 py-3.5 hover:border-brand-teal transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                <path d="M2 1L11 6L2 11Z" fill="currentColor" />
              </svg>
              Watch the 60-second demo
            </button>
          </div>
        </div>

        <figure className="m-0 min-w-0">
          <div ref={frameRef} id="demo" className="border border-hub-line rounded bg-hub-raised overflow-hidden">
            <div className="flex items-center gap-2 h-8 px-3 border-b border-hub-line">
              <span className="w-2 h-2 rounded-full bg-hub-line" />
              <span className="w-2 h-2 rounded-full bg-hub-line" />
              <span className="w-2 h-2 rounded-full bg-hub-line" />
              <span className="ml-2 font-mono text-[11px] text-hub-dim tracking-[0.04em]">app.fletaris.com</span>
              {mode !== 'full' && (
                <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.14em] text-hub-dim">Example data</span>
              )}
            </div>
            <div className="relative aspect-video bg-surface-page">
              {mode === 'full' ? (
                <video
                  ref={fullRef}
                  className="absolute inset-0 w-full h-full"
                  src={FULL}
                  poster={POSTER}
                  controls
                  playsInline
                  preload="none"
                  aria-label="Fletaris demo, 60 seconds, captions burned in"
                />
              ) : (
                <>
                  {mode === 'loop' ? (
                    <video
                      className="absolute inset-0 w-full h-full object-cover"
                      src={LOOP}
                      poster={POSTER}
                      muted
                      autoPlay
                      loop
                      playsInline
                      aria-hidden="true"
                    />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={POSTER}
                      alt="The Fletaris hangar view: eight aircraft with their redelivery countdowns and status badges"
                      width={1600}
                      height={900}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}
                  <button
                    type="button"
                    onClick={playFull}
                    className="absolute inset-0 flex items-center justify-center bg-hub-base/10 hover:bg-hub-base/25 transition-colors group focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-teal"
                    aria-label="Play the 60-second Fletaris demo (captions burned in)"
                  >
                    <span className="flex items-center justify-center w-16 h-16 rounded-full bg-brand-teal text-hub-base transition-transform group-hover:scale-105">
                      <svg width="20" height="20" viewBox="0 0 12 12" aria-hidden="true">
                        <path d="M3 1.5L10.5 6L3 10.5Z" fill="currentColor" />
                      </svg>
                    </span>
                  </button>
                </>
              )}
            </div>
          </div>
          <figcaption className="mt-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 font-body text-[13px] text-text-on-dark-dim">
            <span>60 seconds · captions on · no sound needed</span>
            <details className="group">
              <summary className="cursor-pointer text-brand-teal underline underline-offset-2 list-none [&::-webkit-details-marker]:hidden">
                Read the transcript
              </summary>
              <div className="mt-3 max-w-[560px] space-y-2 text-text-on-dark-dim leading-[1.55]">
                {TRANSCRIPT.map((t) => (
                  <p key={t}>{t}</p>
                ))}
              </div>
            </details>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
