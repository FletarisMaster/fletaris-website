'use client';

import { useEffect, useRef, useState } from 'react';

// The three questions on /air as a list with one clip each (Samsara's "in action" pattern,
// direction v2). Each clip is a cut of the product's own demo recording, cropped to the panel
// its caption describes, so the figures can be read. The clip plays muted while on screen
// (not under reduced motion or Data Saver; poster only without script) and has a pause button.

export interface Capability {
  key: string;
  when: string;
  q: string;
  cap: string;
  video: string;
  poster: string;
  alt: string;
}

export default function CapabilityTabs({ items }: { items: Capability[] }) {
  const [active, setActive] = useState(0);
  const [motion, setMotion] = useState(false);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const item = items[active];

  useEffect(() => {
    const v = ref.current;
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    if (!v || window.matchMedia('(prefers-reduced-motion: reduce)').matches || nav.connection?.saveData) return;
    if (typeof IntersectionObserver === 'undefined') return;
    setMotion(true);
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.3 });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  // (Re)start the current clip whenever it changes, comes into view, or is un-paused.
  useEffect(() => {
    const v = ref.current;
    if (!v || !motion) return;
    if (visible && !paused) v.play().catch(() => {});
    else v.pause();
  }, [active, motion, visible, paused]);

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const d = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const n = (i + d + items.length) % items.length;
    setActive(n);
    tabs.current[n]?.focus();
  };

  return (
    <div className="mt-12 grid grid-cols-1 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-8 md:gap-14 items-start">
      <div role="tablist" aria-label="Three questions" aria-orientation="vertical" className="flex flex-col">
        {items.map((it, i) => {
          const on = i === active;
          return (
            <button
              key={it.key}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`cap-tab-${it.key}`}
              aria-selected={on}
              aria-controls="cap-panel"
              tabIndex={on ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onKey(e, i)}
              className={`text-left px-5 py-5 rounded-[3px] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal ${
                on ? 'bg-surface-band' : 'hover:bg-surface-band/60'
              }`}
            >
              <span className="block font-sans text-[14px] font-semibold text-text-secondary">{it.when}</span>
              <span className={`mt-1 block font-body font-semibold text-[22px] leading-[1.25] ${on ? 'text-brand-navy' : 'text-text-body'}`}>{it.q}</span>
              {on && <span className="mt-2 block font-body text-[16px] leading-[1.55] text-text-body">{it.cap}</span>}
            </button>
          );
        })}
      </div>

      <figure id="cap-panel" role="tabpanel" aria-labelledby={`cap-tab-${item.key}`} className="m-0">
        <div className="relative aspect-video bg-white border border-[#CBD5E1] overflow-hidden">
          <video
            ref={ref}
            key={item.video}
            className="absolute inset-0 w-full h-full object-cover"
            poster={item.poster}
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={item.alt}
          >
            <source src={item.video} type="video/mp4" />
          </video>
          {motion && (
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-pressed={paused}
              aria-label={paused ? 'Play the clip' : 'Pause the clip'}
              className="absolute bottom-3 right-3 w-11 h-11 grid place-items-center rounded-[3px] bg-brand-navy/80 text-white hover:bg-brand-navy transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal"
            >
              <svg width="14" height="14" viewBox="0 0 12 12" aria-hidden="true">
                {paused ? <path d="M3 1.5L10.5 6L3 10.5Z" fill="currentColor" /> : <path d="M2 1h3v10H2zM7 1h3v10H7z" fill="currentColor" />}
              </svg>
            </button>
          )}
        </div>
        <figcaption className="mt-3 font-body text-[14px] text-text-secondary">From the live product, on example data.</figcaption>
      </figure>
    </div>
  );
}
