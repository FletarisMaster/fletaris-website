'use client';

import { useState } from 'react';

// Email field in the hero (direction D: every reference site puts it there). It does not send
// anything itself: it carries the address into the one real form (#waitlist, the shared
// Waitlist component and its binder) and moves the visitor there to add their fleet size, so
// there is still exactly one submission path.
// `tone="dark"`: on the footage heroes and the navy closing band (teal button, light error text).
export default function HeroEmail({
  id = 'hero-email',
  tone = 'light',
  placeholder = 'you@lessor.com',
}: {
  id?: string;
  tone?: 'light' | 'dark';
  placeholder?: string;
}) {
  const dark = tone === 'dark';
  const [error, setError] = useState('');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = (new FormData(e.currentTarget).get('email') as string | null)?.trim() ?? '';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
      setError('Enter a valid work email, like name@company.com.');
      return;
    }
    setError('');
    const target = document.getElementById('email') as HTMLInputElement | null;
    if (target) {
      target.value = value;
      target.dispatchEvent(new Event('input', { bubbles: true }));
    }
    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // Next empty required field: "What do you manage?" on the hub (fleet size is disabled until
    // it's answered), fleet size on /air.
    const vertical = document.getElementById('vertical') as HTMLSelectElement | null;
    const next = vertical && !vertical.value ? vertical : document.getElementById('fleetsize');
    setTimeout(() => next?.focus({ preventScroll: true }), 500);
  };

  return (
    <form onSubmit={onSubmit} noValidate className="max-w-[500px]">
      <div className="flex flex-wrap gap-2">
        <label htmlFor={id} className="sr-only">
          Work email
        </label>
        <input
          id={id}
          name="email"
          type="email"
          autoComplete="email"
          placeholder={placeholder}
          spellCheck={false}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`flex-[1_1_220px] min-w-0 font-body text-[16px] text-text-primary bg-white border rounded-[3px] px-4 py-3.5 outline-none focus:ring-2 ${
            dark ? 'border-white focus:ring-brand-teal' : 'border-[#94A3B8] focus:border-brand-navy focus:ring-brand-teal/50'
          }`}
        />
        <button
          type="submit"
          className={`font-sans text-[15px] font-semibold rounded-[3px] px-5 py-3.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
            dark
              ? 'text-brand-navy bg-brand-teal hover:bg-brand-teal-light focus-visible:ring-white focus-visible:ring-offset-brand-navy'
              : 'text-white bg-brand-navy hover:bg-brand-navy-alt focus-visible:ring-brand-teal'
          }`}
        >
          Request early access
        </button>
      </div>
      {error && (
        <p id={`${id}-error`} className={`mt-2 font-body text-[14px] ${dark ? 'text-[#FCA5A5]' : 'text-[#B91C1C]'}`}>
          {error}
        </p>
      )}
    </form>
  );
}
