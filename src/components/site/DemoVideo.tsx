'use client';

import { useEffect, useRef, useState } from 'react';

// The ~60 s Website cut of the demo (D9). A silent 9.6 s loop plays while the frame is on
// screen (not under reduced motion or Data Saver); "Play" swaps in the full cut with controls.
// Captions are burned in. Self-hosted in public/media. Before hydration: the poster only.

const POSTER = '/media/fletaris-air-poster.webp';
const LOOP = '/media/fletaris-air-loop.mp4';
const FULL = '/media/fletaris-air-demo.mp4';

const TRANSCRIPT = [
  'Given the technical state of your fleet today, what does it mean for your commitments in the months ahead?',
  'Eight aircraft. Eight operators. Four continents. On a spreadsheet, it all looks fine. Fletaris shows you where it isn’t.',
  'Every aircraft and every engine carries its full technical picture.',
  'Across the portfolio, the lease waterfall puts it on one screen: who’s returning, when, and whether the reserves will cover it.',
  'Fletaris. Fleet intelligence that sees forward. Request early access at fletaris.com/air.',
];

type Mode = 'poster' | 'loop' | 'full';

export default function DemoVideo() {
  const [mode, setMode] = useState<Mode>('poster');
  const frameRef = useRef<HTMLDivElement>(null);
  const fullRef = useRef<HTMLVideoElement>(null);

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

  // Any "#demo" link on the page plays the full cut.
  useEffect(() => {
    const onHash = () => {
      if (window.location.hash === '#demo') setMode('full');
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  return (
    <figure className="m-0" id="demo">
      <div ref={frameRef} className="relative aspect-video bg-white border border-[#CBD5E1] overflow-hidden">
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
              <video className="absolute inset-0 w-full h-full object-cover" src={LOOP} poster={POSTER} muted autoPlay loop playsInline aria-hidden="true" />
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
              onClick={() => setMode('full')}
              className="absolute inset-0 flex items-center justify-center bg-brand-navy/0 hover:bg-brand-navy/10 transition-colors group focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-teal"
              aria-label="Play the 60-second Fletaris demo (captions burned in)"
            >
              <span className="flex items-center gap-3 bg-brand-navy text-white rounded-full pl-4 pr-5 py-3 font-sans text-[15px] font-semibold transition-transform group-hover:scale-[1.03]">
                <svg width="14" height="14" viewBox="0 0 12 12" aria-hidden="true">
                  <path d="M3 1.5L10.5 6L3 10.5Z" fill="currentColor" />
                </svg>
                Play the 60-second demo
              </span>
            </button>
          </>
        )}
      </div>
      <figcaption className="mt-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 font-body text-[14px] text-text-body">
        <span>The live product on example data. Captions on, no sound needed.</span>
        <details>
          <summary className="cursor-pointer text-brand-navy underline underline-offset-2 list-none [&::-webkit-details-marker]:hidden">
            Read the transcript
          </summary>
          <div className="mt-3 max-w-[560px] space-y-2 text-text-body leading-[1.55]">
            {TRANSCRIPT.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </details>
      </figcaption>
    </figure>
  );
}
