'use client';

import { useEffect, useRef } from 'react';

// Fades its content up into place the first time it scrolls into view (F36 D1: motion
// instead of glows). Content is visible by default: the hidden starting state is only set
// from JavaScript, only for blocks that start below the fold, and never when the visitor
// prefers reduced motion. So no-JS visitors, crawlers and thumbnails always see everything,
// and the first screen never flickers.
export default function Reveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return; // already on screen

    el.dataset.reveal = 'pending';
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          el.dataset.reveal = 'shown';
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -10% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
