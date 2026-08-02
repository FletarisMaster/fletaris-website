'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import SectionRail from '@/components/SectionRail';
import { useHoverSync } from '@/components/HoverSyncContext';
import { ATOM_NODES, CORE_GEOMETRY, READOUT, type AtomNodeGeometry } from '@/lib/atomNodes';
import type { NodeKey } from '@/lib/verticals';

interface SpokeGeometry {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  ux: number;
  uy: number;
  span: number;
}

function spokeFor(node: AtomNodeGeometry): SpokeGeometry {
  const dx = node.cx - CORE_GEOMETRY.cx;
  const dy = node.cy - CORE_GEOMETRY.cy;
  const L = Math.hypot(dx, dy);
  const ux = dx / L;
  const uy = dy / L;
  const x1 = CORE_GEOMETRY.cx + ux * (CORE_GEOMETRY.r + 6);
  const y1 = CORE_GEOMETRY.cy + uy * (CORE_GEOMETRY.r + 6);
  const x2 = node.cx - ux * (node.r + 5);
  const y2 = node.cy - uy * (node.r + 5);
  const span = Math.hypot(x2 - x1, y2 - y1);
  return { x1, y1, x2, y2, ux, uy, span };
}

function tickPositions(spoke: SpokeGeometry) {
  const ticks: { cx: number; cy: number }[] = [];
  for (let d = 26; d < spoke.span - 16; d += 24) {
    ticks.push({ cx: spoke.x1 + spoke.ux * d, cy: spoke.y1 + spoke.uy * d });
  }
  return ticks;
}

const RANGE_RINGS = [150, 245, 340, 435];
const GRID_STEP = 68;
const VIEW_W = 1020;
const VIEW_H = 660;

export default function Atom() {
  const { hovered, setHovered } = useHoverSync();
  const router = useRouter();
  const active: NodeKey = hovered ?? 'core';
  const entry = READOUT[active];

  const pulseRefs = useRef<Record<string, SVGCircleElement | null>>({});
  const spokes = useRef<Record<string, SpokeGeometry>>(
    Object.fromEntries(ATOM_NODES.map((n) => [n.key, spokeFor(n)]))
  ).current;

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    let raf: number;
    let last = performance.now();
    const state = ATOM_NODES.map((n, i) => ({ n, t: i * 0.2 }));

    function frame(now: number) {
      const dt = (now - last) / 1000;
      last = now;
      state.forEach(({ n }, i) => {
        const s = state[i];
        s.t += dt * 0.3;
        if (s.t > 1.6) s.t -= 1.6;
        const u = s.t;
        const circle = pulseRefs.current[n.key];
        if (!circle) return;
        if (u > 1) {
          circle.setAttribute('opacity', '0');
          return;
        }
        const spoke = spokes[n.key];
        const cx = spoke.x2 - spoke.ux * (spoke.span * u);
        const cy = spoke.y2 - spoke.uy * (spoke.span * u);
        circle.setAttribute('cx', String(cx));
        circle.setAttribute('cy', String(cy));
        const fade = u < 0.12 ? u / 0.12 : u > 0.88 ? (1 - u) / 0.12 : 1;
        const peak = n.solid ? 0.95 : 0.5;
        circle.setAttribute('opacity', (fade * peak).toFixed(2));
      });
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [spokes]);

  return (
    <section className="bg-hub-base">
      <div className="max-w-content mx-auto px-5 sm:px-7 py-[clamp(32px,5vw,72px)]">
        <SectionRail index="02" label="FIVE VERTICALS, ONE CORE" />

        <div className="grid grid-cols-1 md:grid-cols-[1fr_288px] lg:grid-cols-[1fr_336px] md:items-stretch gap-0">
          {/* Diagram — hidden below 720px, replaced by the mobile stack */}
          <div className="hidden sm:block relative">
            <svg
              viewBox="100 80 850 590"
              width="100%"
              height="auto"
              style={{ overflow: 'visible', display: 'block' }}
              role="img"
              aria-label="Radial diagram of five Fletaris verticals connected to a shared fleet intelligence core"
            >
              <defs>
                <radialGradient id="gAir" cx="34%" cy="30%" r="72%">
                  <stop offset="0%" stopColor="#5FE3E8" />
                  <stop offset="55%" stopColor="#00A8B0" />
                  <stop offset="100%" stopColor="#00727A" />
                </radialGradient>
                <radialGradient id="gDrone" cx="34%" cy="30%" r="72%">
                  <stop offset="0%" stopColor="#4FD8DE" />
                  <stop offset="55%" stopColor="#00B3BA" />
                  <stop offset="100%" stopColor="#007A82" />
                </radialGradient>
                <radialGradient id="gShadow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#000" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="#000" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* background grid */}
              <g opacity={0.55}>
                {Array.from({ length: Math.floor(VIEW_W / GRID_STEP) + 1 }, (_, i) => i * GRID_STEP).map((x) => (
                  <line key={`gx${x}`} x1={x} y1={0} x2={x} y2={VIEW_H} stroke="#181B21" strokeWidth={1} />
                ))}
                {Array.from({ length: Math.floor(VIEW_H / GRID_STEP) + 1 }, (_, i) => i * GRID_STEP).map((y) => (
                  <line key={`gy${y}`} x1={0} y1={y} x2={VIEW_W} y2={y} stroke="#181B21" strokeWidth={1} />
                ))}
              </g>

              {/* range rings */}
              <g>
                {RANGE_RINGS.map((r, i) => (
                  <circle
                    key={r}
                    cx={CORE_GEOMETRY.cx}
                    cy={CORE_GEOMETRY.cy}
                    r={r}
                    fill="none"
                    stroke="#262A32"
                    strokeWidth={1}
                    opacity={(0.95 - i * 0.19).toFixed(2)}
                  />
                ))}
              </g>

              {/* spokes + ticks */}
              <g>
                {ATOM_NODES.map((n) => {
                  const s = spokes[n.key];
                  const ticks = tickPositions(s);
                  return (
                    <g key={n.key}>
                      <line
                        x1={s.x1}
                        y1={s.y1}
                        x2={s.x2}
                        y2={s.y2}
                        stroke="#00C4CC"
                        fill="none"
                        strokeLinecap="round"
                        strokeWidth={n.solid ? 3 : 1.2}
                        opacity={n.solid ? 0.95 : 0.5}
                      />
                      {ticks.map((t, i) => (
                        <line
                          key={i}
                          x1={t.cx + -s.uy * (n.solid ? 6 : 4)}
                          y1={t.cy + s.ux * (n.solid ? 6 : 4)}
                          x2={t.cx - -s.uy * (n.solid ? 6 : 4)}
                          y2={t.cy - s.ux * (n.solid ? 6 : 4)}
                          stroke="#00C4CC"
                          strokeWidth={1}
                          strokeLinecap="round"
                          opacity={n.solid ? 0.75 : 0.4}
                        />
                      ))}
                    </g>
                  );
                })}
              </g>

              {/* pulses */}
              <g>
                {ATOM_NODES.map((n) => (
                  <circle
                    key={n.key}
                    ref={(el) => {
                      pulseRefs.current[n.key] = el;
                    }}
                    r={n.solid ? 3.6 : 2.4}
                    fill="#ADFFE4"
                    opacity={0}
                  />
                ))}
              </g>

              {/* nodes */}
              <g>
                {ATOM_NODES.map((n) => {
                  const dimmed = hovered !== null && hovered !== n.key;
                  const isAir = n.key === 'air';
                  return (
                    <g
                      key={n.key}
                      style={{ opacity: dimmed ? 0.28 : 1, transition: 'opacity 0.3s ease' }}
                      tabIndex={0}
                      role={isAir ? 'button' : 'img'}
                      aria-label={`Fletaris ${n.short} — ${n.built ? 'Built, version 1' : n.statusLabel === 'RESEARCH' ? 'Research' : 'In development'}`}
                      onMouseEnter={() => setHovered(n.key)}
                      onMouseLeave={() => setHovered(null)}
                      onFocus={() => setHovered(n.key)}
                      onBlur={() => setHovered(null)}
                      onClick={isAir ? () => router.push('/air') : undefined}
                      onKeyDown={
                        isAir
                          ? (e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                router.push('/air');
                              }
                            }
                          : undefined
                      }
                      className="outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-teal"
                      cursor={isAir ? 'pointer' : 'default'}
                    >
                      {n.solid ? (
                        <>
                          <ellipse
                            cx={n.cx + 4}
                            cy={n.cy + n.r * 0.92}
                            rx={n.r * 0.86}
                            ry={n.r * 0.22}
                            fill="url(#gShadow)"
                          />
                          <circle cx={n.cx} cy={n.cy} r={n.r} fill={`url(#${n.key === 'air' ? 'gAir' : 'gDrone'})`} />
                        </>
                      ) : (
                        <circle cx={n.cx} cy={n.cy} r={n.r} fill="none" stroke="#00C4CC" strokeWidth={2.75} />
                      )}
                      <text
                        x={n.cx}
                        y={n.cy + n.r + 22}
                        textAnchor="middle"
                        fontFamily="Poppins, system-ui, sans-serif"
                        fontSize={17}
                        fontWeight={600}
                        letterSpacing="0.1em"
                        fill="#F5FAFB"
                      >
                        {n.short.toUpperCase()}
                      </text>
                      <text
                        x={n.cx}
                        y={n.cy + n.r + 40}
                        textAnchor="middle"
                        fontFamily="'JetBrains Mono', monospace"
                        fontSize={13}
                        letterSpacing="0.1em"
                        fill={n.built ? '#00C4CC' : '#8B929E'}
                      >
                        {n.statusLabel}
                      </text>
                      <circle
                        cx={n.cx}
                        cy={n.cy}
                        r={Math.max(n.r + 18, 36)}
                        fill="transparent"
                        style={{ cursor: isAir ? 'pointer' : 'default' }}
                      />
                    </g>
                  );
                })}
              </g>

              {/* core */}
              <g>
                <circle cx={CORE_GEOMETRY.cx} cy={CORE_GEOMETRY.cy} r={CORE_GEOMETRY.r} fill="#0E3B44" />
                <circle
                  cx={CORE_GEOMETRY.cx}
                  cy={CORE_GEOMETRY.cy}
                  r={CORE_GEOMETRY.r}
                  fill="none"
                  stroke="#00C4CC"
                  strokeWidth={2.5}
                />
                {Array.from({ length: 9 }, (_, i) => {
                  const a = (i / 9) * Math.PI * 2;
                  const rr = CORE_GEOMETRY.r * 0.5 * (i % 2 ? 0.55 : 1);
                  return (
                    <circle
                      key={i}
                      cx={CORE_GEOMETRY.cx + Math.cos(a) * rr}
                      cy={CORE_GEOMETRY.cy + Math.sin(a) * rr}
                      r={2.1}
                      fill="#00C4CC"
                      opacity={0.75}
                    />
                  );
                })}
              </g>
            </svg>
          </div>

          {/* Readout panel */}
          <aside className="hidden sm:block border-t md:border-t-0 md:border-l border-hub-line pt-6 md:pt-0 md:pl-8 min-h-[240px] flex flex-col justify-center">
            <div className="flex justify-between font-mono text-[9.5px] uppercase tracking-[0.16em] text-text-on-dark-dim mb-4">
              <span>NODE — {active === 'core' ? 'CORE' : active.toUpperCase()}</span>
              <span>{entry.code}</span>
            </div>
            <div className="font-body font-extrabold uppercase text-[30px] leading-none tracking-[-0.01em] text-text-on-dark">
              {entry.name}
            </div>
            <div
              className={`inline-flex items-center gap-[7px] mt-3.5 font-sans text-[9.5px] font-medium uppercase tracking-[0.15em] px-2.5 py-1 border rounded-sm ${
                entry.built ? 'text-brand-teal border-brand-teal/40' : 'text-text-on-dark-dim border-hub-line'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${entry.built ? 'bg-brand-teal' : 'bg-status-gray'}`} />
              {entry.status}
            </div>
            <p className="mt-5 font-body font-light text-[17px] leading-[1.45] text-text-on-dark">{entry.line}</p>
            <div className="mt-4 font-mono text-[11px] leading-[1.7] text-text-on-dark-dim">
              {entry.meta.map((m, i) => (
                <div key={i}>{m}</div>
              ))}
            </div>
            {entry.ctaHref ? (
              <Link
                href={entry.ctaHref}
                className="mt-6 inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-teal border-b border-brand-teal/40 pb-1 transition-all hover:border-brand-teal hover:gap-3.5"
              >
                {entry.ctaLabel} <span>→</span>
              </Link>
            ) : (
              <div className="mt-6 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-text-on-dark-dim">
                {entry.ctaLabel}
              </div>
            )}
            <div
              className="mt-5 font-mono text-[9.5px] uppercase tracking-[0.13em] text-hub-dim"
              style={{ visibility: active === 'core' ? 'visible' : 'hidden' }}
            >
              Hover a node to inspect
            </div>
          </aside>
        </div>

        {/* Mobile stack — replaces the SVG below 720px */}
        <div className="sm:hidden mt-8">
          <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
            <defs>
              <radialGradient id="gAirMobile" cx="34%" cy="30%" r="72%">
                <stop offset="0%" stopColor="#5FE3E8" />
                <stop offset="55%" stopColor="#00A8B0" />
                <stop offset="100%" stopColor="#00727A" />
              </radialGradient>
            </defs>
          </svg>
          {ATOM_NODES.map((n) => {
            const r = READOUT[n.key];
            const dotSize = n.solid ? (n.key === 'air' ? 15 : 10) : 8;
            const cardClassName =
              'flex gap-4 items-start py-5 border-b border-hub-line first:border-t no-underline text-inherit';
            const cardBody = (
              <>
                <svg width="34" height="34" viewBox="0 0 34 34" className="shrink-0 mt-0.5">
                  {n.solid ? (
                    <circle cx="17" cy="17" r={dotSize} fill={n.key === 'air' ? 'url(#gAirMobile)' : '#00A8B0'} />
                  ) : (
                    <circle cx="17" cy="17" r={dotSize} fill="none" stroke="#00C4CC" strokeWidth={2.75} />
                  )}
                </svg>
                <div className="flex-1 min-w-0">
                  <div className="font-body font-extrabold uppercase text-[21px] leading-none text-text-on-dark">
                    {n.short}
                  </div>
                  <div
                    className={`font-mono text-[9px] uppercase tracking-[0.14em] mt-1.5 ${
                      n.built ? 'text-brand-teal' : 'text-text-on-dark-dim'
                    }`}
                  >
                    {n.code} · {r.status}
                  </div>
                  <div className="mt-2 text-[14.5px] leading-[1.45] text-text-on-dark-dim">{r.line}</div>
                </div>
                {n.key === 'air' && <div className="text-brand-teal text-[15px] mt-0.5 shrink-0">→</div>}
              </>
            );
            return n.key === 'air' ? (
              <Link key={n.key} href="/air" className={cardClassName}>
                {cardBody}
              </Link>
            ) : (
              <div key={n.key} className={cardClassName}>
                {cardBody}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
