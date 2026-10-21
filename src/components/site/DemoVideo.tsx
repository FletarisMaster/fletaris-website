'use client';

import { useEffect, useRef, useState } from 'react';

// The ~60 s Website cut of the demo (D9): the poster until "Play", then the full cut with
// controls. No autoplaying loop any more: the hero footage is the page's one ambient motion
// (W10, revised 21 Oct 2026). Captions are burned in. Self-hosted in public/media.

const POSTER = '/media/fletaris-air-poster.webp';
const FULL = '/media/fletaris-air-demo.mp4';

const TRANSCRIPT = [
  'Given the technical state of your fleet today, what does it mean for your commitments in the months ahead?',
  'Eight aircraft. Eight operators. Four continents. On a spreadsheet, it all looks fine. Fletaris shows you where it isn’t.',
  'Every aircraft and every engine carries its full technical picture.',
  'Across the portfolio, the lease waterfall puts it on one screen: who’s returning, when, and whether the reserves will cover it.',
  'Fletaris. Fleet intelligence that sees forward. Request early access at fletaris.com/air.',
];

type Mode = 'poster' | 'full';

export default function DemoVideo() {
  const [mode, setMode] = useState<Mode>('poster');
  const fullRef = useRef<HTMLVideoElement>(null);

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
      <div className="relative aspect-video bg-white border border-[#CBD5E1] overflow-hidden">
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
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={POSTER}
              alt="The Fletaris hangar view: eight aircraft with their redelivery countdowns and status badges"
              width={1600}
              height={900}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={() => setMode('full')}
              className="absolute inset-0 flex items-center justify-center bg-brand-navy/0 hover:bg-brand-navy/10 transition-colors group focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-teal"
              aria-label="Play the 60-second Fletaris demo (captions burned in)"
            >
              <span className="flex items-center gap-3 bg-brand-navy text-white rounded-[3px] pl-4 pr-5 py-3 font-sans text-[15px] font-semibold transition-transform group-hover:scale-[1.03]">
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
