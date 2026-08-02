'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const VERTICALS = [
  { label: 'Air', href: '/air', live: true },
  { label: 'Drone', href: '/drone', live: false },
  { label: 'Land', href: '/land', live: false },
  { label: 'Sea', href: '/sea', live: false },
  { label: 'Space', href: '/space', live: false },
] as const;

export default function TopNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-hub-base/[.92] backdrop-blur-sm border-b border-hub-line">
      <div className="max-w-content mx-auto px-5 sm:px-7 h-16 flex items-center justify-between">
        <Link href="/" className="shrink-0" aria-label="Fletaris home">
          <Image
            src="/images/logo-horizontal-darkbg.png"
            alt="Fletaris"
            width={140}
            height={24}
            className="h-6 w-auto"
            style={{ width: 'auto', height: '1.5rem' }}
            priority
          />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {VERTICALS.map((v) => {
            const active = pathname === v.href;
            if (!v.live) {
              return (
                <span
                  key={v.label}
                  aria-disabled="true"
                  className="font-sans text-[11px] font-medium uppercase tracking-[0.14em] text-text-on-dark-dim cursor-default"
                >
                  {v.label}
                </span>
              );
            }
            return (
              <Link
                key={v.label}
                href={v.href}
                className={`font-sans text-[11px] font-medium uppercase tracking-[0.14em] transition-colors ${
                  active ? 'text-brand-teal' : 'text-text-on-dark hover:text-brand-teal'
                }`}
              >
                {v.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden md:flex items-center gap-5">
          <a
            href="https://app.fletaris.com"
            className="font-sans text-[12px] font-medium uppercase tracking-[0.1em] text-text-on-dark-dim hover:text-text-on-dark transition-colors"
          >
            Sign in
          </a>
          <a
            href="#waitlist"
            className="font-sans text-[12px] font-semibold uppercase tracking-[0.08em] text-brand-teal border border-brand-teal px-4 py-2 hover:bg-brand-teal hover:text-hub-base transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal"
          >
            Request access
          </a>
        </div>

        <button
          type="button"
          className="md:hidden text-text-on-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
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
        <div className="md:hidden fixed inset-0 top-16 z-40 bg-hub-base px-5 sm:px-7 py-10 overflow-y-auto">
          <div className="flex flex-col gap-6">
            {VERTICALS.map((v) =>
              v.live ? (
                <Link
                  key={v.label}
                  href={v.href}
                  onClick={() => setOpen(false)}
                  className="font-sans text-lg font-medium uppercase tracking-[0.1em] text-text-on-dark"
                >
                  {v.label}
                </Link>
              ) : (
                <span
                  key={v.label}
                  aria-disabled="true"
                  className="font-sans text-lg font-medium uppercase tracking-[0.1em] text-text-on-dark-dim cursor-default"
                >
                  {v.label}
                </span>
              )
            )}
          </div>
          <div className="mt-10 pt-10 border-t border-hub-line flex flex-col gap-5">
            <a href="https://app.fletaris.com" className="font-sans text-sm uppercase tracking-[0.1em] text-text-on-dark-dim">
              Sign in
            </a>
            <a
              href="#waitlist"
              onClick={() => setOpen(false)}
              className="font-sans text-sm font-semibold uppercase tracking-[0.08em] text-brand-teal border border-brand-teal px-4 py-3 text-center"
            >
              Request access
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
