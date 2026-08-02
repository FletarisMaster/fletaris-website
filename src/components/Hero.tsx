'use client';

import { useEffect, useRef, useState } from 'react';
import { Plane, Truck, Ship, Satellite, type LucideIcon } from 'lucide-react';
import DroneIcon from '@/components/icons/DroneIcon';
import SectionRail from '@/components/SectionRail';
import { HERO_ENUMERATION_ORDER, getVertical, type VerticalKey } from '@/lib/verticals';
import { useHoverSync } from '@/components/HoverSyncContext';

const ICONS: Record<VerticalKey, LucideIcon | typeof DroneIcon> = {
  air: Plane,
  land: Truck,
  sea: Ship,
  drone: DroneIcon,
  space: Satellite,
};

const CYCLE_INTERVAL_MS = 1700;

export default function Hero() {
  const { hovered, setHovered } = useHoverSync();
  const [ambientIndex, setAmbientIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (reducedMotion || hovered !== null) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      setAmbientIndex((i) => (i + 1) % HERO_ENUMERATION_ORDER.length);
    }, CYCLE_INTERVAL_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [reducedMotion, hovered]);

  const ambientKey = HERO_ENUMERATION_ORDER[ambientIndex];

  return (
    <section className="bg-hub-base">
      <div className="max-w-content mx-auto px-5 sm:px-7 py-[clamp(32px,5vw,72px)]">
        <SectionRail index="01" label="INTELLIGENCE LAYER" />

        <h1
          className="font-body font-extrabold uppercase text-text-on-dark leading-[0.94] tracking-[-0.02em] text-[clamp(40px,6.5vw,78px)] max-w-[900px]"
          style={{ textWrap: 'balance' }}
        >
          Do you manage a fleet?
        </h1>

        <div className="mt-8 flex flex-wrap items-center border-t border-hub-line">
          {HERO_ENUMERATION_ORDER.map((key) => {
            const v = getVertical(key);
            const Icon = ICONS[key];
            const isActive = hovered === key || (hovered === null && ambientKey === key);
            return (
              <div
                key={key}
                tabIndex={0}
                onMouseEnter={() => setHovered(key)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(key)}
                onBlur={() => setHovered(null)}
                className="flex items-center gap-3 border-b border-r border-hub-line px-6 py-4 cursor-default outline-none focus-visible:ring-2 focus-visible:ring-brand-teal"
              >
                <Icon
                  size={28}
                  strokeWidth={1.5}
                  className={`shrink-0 transition-colors duration-200 ${
                    isActive ? 'text-brand-teal' : 'text-text-on-dark'
                  }`}
                />
                <span
                  className={`font-body text-base transition-colors duration-200 ${
                    isActive ? 'text-brand-teal' : 'text-text-on-dark'
                  }`}
                >
                  {v.enumerationWord}
                </span>
              </div>
            );
          })}
        </div>

        <p className="font-body font-light text-text-on-dark-dim text-[clamp(15px,1.5vw,18px)] leading-[1.55] max-w-[620px] mt-6">
          If you&apos;re responsible for assets that carry life limits, answer to a
          regulator, and underwrite commitments you&apos;ve already signed — Fletaris
          projects what your technical data means for what&apos;s coming.
        </p>
      </div>
    </section>
  );
}
