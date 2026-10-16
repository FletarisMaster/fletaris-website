'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Drives "animate when it scrolls into view". `show` is true before hydration (so the static
 * HTML has the finished state and nothing is hidden without JavaScript), turns false once the
 * component has mounted below the fold, and true again when it scrolls into view. Under
 * reduced motion it stays true, so animations just show the end state.
 */
export function useInView<T extends Element>(rootMargin = '0px 0px -15% 0px') {
  const ref = useRef<T>(null);
  const [armed, setArmed] = useState(false);
  const [inView, setInView] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setReduced(true);
      return;
    }
    if (!el || typeof IntersectionObserver === 'undefined') return;
    if (el.getBoundingClientRect().top < window.innerHeight) return; // already visible: no flicker
    setArmed(true);
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return { ref, show: !armed || inView, reduced };
}
