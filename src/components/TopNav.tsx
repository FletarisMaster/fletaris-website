'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import SoonLabel from '@/components/SoonLabel';

const VERTICALS = [
  { label: 'Air', href: '/air', live: true, soon: '' },
  { label: 'Drone', href: '/drone', live: false, soon: 'Next up' },
  { label: 'Land', href: '/land', live: false, soon: 'Coming soon' },
  { label: 'Sea', href: '/sea', live: false, soon: 'Coming soon' },
  { label: 'Space', href: '/space', live: false, soon: 'Coming soon' },
] as const;

export default function TopNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  // Every page has the signup form (#waitlist) except /air/trust, which sends people to /air's.
  const cta = pathname === '/air/trust' ? '/air#waitlist' : '#waitlist';
  const onAir = pathname === '/air' || pathname.startsWith('/air/');

  // While the menu is open: no page scroll behind it, and Escape closes it.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  // No backdrop-blur on the nav: a filter makes it the containing block for the menu panel,
  // which then collapsed to the nav's own height and hid every link but the first.
  return (
    <nav className="tw sticky top-0 z-50 bg-brand-navy border-b border-white/10" aria-label="Main">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60] focus:bg-white focus:text-brand-navy focus:px-4 focus:py-2 focus:rounded-[3px] font-sans text-[14px] font-semibold"
      >
        Skip to content
      </a>
      <div className="max-w-content mx-auto px-5 sm:px-10 h-16 flex items-center justify-between">
        {/* The Air pages add "Air" beside the logo (the fletaris-air lockup's "Air" is too small to
            read at nav height); the logo itself is 32px tall everywhere. */}
        <Link
          href={onAir ? '/air' : '/'}
          className="shrink-0 flex items-center rounded-[2px] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal"
          aria-label={onAir ? 'Fletaris Air home' : 'Fletaris home'}
        >
          <Image
            src="/images/logo-horizontal-darkbg.webp"
            alt=""
            width={240}
            height={74}
            className="h-8 w-auto"
            style={{ width: 'auto', height: '2rem' }}
            priority
          />
          {onAir && (
            <span className="ml-3 pl-3 border-l border-white/25 font-sans text-[20px] font-medium leading-none text-[#CBD5E1]">Air</span>
          )}
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {VERTICALS.map((v) => {
            const active = pathname === v.href || pathname.startsWith(`${v.href}/`);
            if (!v.live) {
              return (
                <SoonLabel
                  key={v.label}
                  label={v.label}
                  soon={v.soon}
                  className="font-sans text-[14px] font-medium text-[#94A3B8]"
                />
              );
            }
            return (
              <Link
                key={v.label}
                href={v.href}
                aria-current={active ? 'page' : undefined}
                className={`font-sans text-[14px] font-medium transition-colors ${
                  active ? 'text-white underline decoration-brand-teal decoration-2 underline-offset-[10px]' : 'text-[#CBD5E1] hover:text-white'
                }`}
              >
                {v.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden md:flex items-center gap-5">
          <Link
            href="/insights"
            aria-current={pathname.startsWith('/insights') ? 'page' : undefined}
            className="font-sans text-[14px] font-medium text-[#CBD5E1] hover:text-white transition-colors"
          >
            Insights
          </Link>
          <a href="/#investors" className="font-sans text-[14px] font-medium text-[#CBD5E1] hover:text-white transition-colors">
            Investors
          </a>
          <a href="https://app.fletaris.com" className="font-sans text-[14px] font-medium text-[#CBD5E1] hover:text-white transition-colors">
            Sign in
          </a>
          <a
            href={cta}
            className="font-sans text-[14px] font-semibold text-brand-navy bg-brand-teal rounded-[3px] px-4 py-2.5 hover:bg-brand-teal-light transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Request early access
          </a>
        </div>

        <button
          type="button"
          className="md:hidden flex items-center justify-center -mr-2 p-2 bg-transparent border-0 cursor-pointer text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M3 7h18M3 12h18M3 17h18" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div
          id="mobile-menu"
          className="md:hidden absolute inset-x-0 top-full h-[calc(100dvh-4rem)] z-40 bg-brand-navy px-5 sm:px-10 py-10 overflow-y-auto"
        >
          <div className="flex flex-col gap-6">
            {VERTICALS.map((v) =>
              v.live ? (
                <Link
                  key={v.label}
                  href={v.href}
                  onClick={() => setOpen(false)}
                  className="font-sans text-xl font-medium text-white"
                >
                  {v.label}
                </Link>
              ) : (
                <span
                  key={v.label}
                  aria-disabled="true"
                  className="font-sans text-xl font-medium text-[#94A3B8] cursor-default"
                >
                  {v.label}
                  <span className="ml-3 font-sans text-[13px] font-semibold text-brand-teal-light">{v.soon}</span>
                </span>
              )
            )}
          </div>
          <div className="mt-10 pt-10 border-t border-white/15 flex flex-col gap-5">
            <Link href="/insights" onClick={() => setOpen(false)} className="font-sans text-base text-[#CBD5E1]">
              Insights
            </Link>
            <a href="/#investors" onClick={() => setOpen(false)} className="font-sans text-base text-[#CBD5E1]">
              Investors
            </a>
            <a href="https://app.fletaris.com" className="font-sans text-base text-[#CBD5E1]">
              Sign in
            </a>
            <a
              href={cta}
              onClick={() => setOpen(false)}
              className="font-sans text-base font-semibold text-brand-navy bg-brand-teal rounded-[3px] px-4 py-3 text-center"
            >
              Request early access
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
