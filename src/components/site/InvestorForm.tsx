import InvestorBehavior from '@/components/InvestorBehavior';
import { INVESTOR_PRIVACY_LINE } from '@/lib/investor';
import { PRIVACY_POLICY_URL } from '@/lib/waitlist';

// The investor deck request, on the navy "For investors" panel (CompanyAndInvestors). Element
// ids are the contract with the binder in src/lib/investor.ts; they are prefixed `investor-`
// so they never clash with the waitlist form on the same page. The submit button's first
// child must stay its text label (the binder swaps it while sending).

const LABEL = 'block font-sans text-[14px] font-medium text-white mb-2';
const FIELD =
  'w-full bg-white border border-white rounded-[3px] px-4 py-3 text-text-primary font-body text-[16px] outline-none focus:ring-2 focus:ring-brand-teal';
// Light red: 6.9:1 on navy (the waitlist's #B91C1C would fail on this ground).
const ERROR = 'mt-2 font-body text-[14px] text-[#FCA5A5]';

export default function InvestorForm() {
  return (
    <>
      <form id="investor-form" noValidate className="relative mt-6" aria-label="Request the investor deck">
        {/* Honeypot: hidden from people, filled in by bots; the Worker drops those entries. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor="investor-website">Website</label>
          <input id="investor-website" name="website" tabIndex={-1} autoComplete="off" />
        </div>

        <div id="group-investor-name">
          <label htmlFor="investor-name" className={LABEL}>
            Name <span aria-hidden="true">*</span>
          </label>
          <input id="investor-name" required autoComplete="name" aria-describedby="investor-name-error" className={FIELD} />
          <p id="investor-name-error" data-field-error="" hidden className={ERROR}>
            Enter your name.
          </p>
        </div>

        <div id="group-investor-email" className="mt-4">
          <label htmlFor="investor-email" className={LABEL}>
            Work email <span aria-hidden="true">*</span>
          </label>
          <input
            id="investor-email"
            type="email"
            required
            autoComplete="email"
            aria-describedby="investor-email-error"
            placeholder="you@fund.com"
            className={FIELD}
          />
          <p id="investor-email-error" data-field-error="" hidden className={ERROR}>
            Enter a valid work email, like name@fund.com.
          </p>
        </div>

        <div className="mt-4">
          <label htmlFor="investor-fund" className={LABEL}>
            Fund or firm
          </label>
          <input id="investor-fund" autoComplete="organization" className={FIELD} />
        </div>

        <div data-turnstile-slot="" className="[&:not(:empty)]:mt-4" />

        <div
          id="investor-error-banner"
          role="alert"
          style={{ display: 'none' }}
          className="mt-4 bg-[#FEF2F2] border border-[#FECACA] px-4 py-3 font-body text-[14px] text-[#B91C1C]"
        >
          Something went wrong. Please try again.
        </div>

        <button
          type="submit"
          disabled
          className="mt-6 inline-flex font-sans text-[15px] font-semibold text-brand-navy bg-brand-teal rounded-[3px] px-[18px] py-[13px] hover:bg-brand-teal-light transition-colors disabled:opacity-60 disabled:cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          Request the investor deck
        </button>

        <p className="mt-4 font-body text-[13px] leading-[1.55] text-[#CBD5E1]">
          {INVESTOR_PRIVACY_LINE}{' '}
          <a href={PRIVACY_POLICY_URL} className="text-white underline underline-offset-2">
            Privacy Policy
          </a>
        </p>
      </form>

      <div id="investor-success" style={{ display: 'none' }} className="mt-6 border-t border-white/30 pt-5 outline-none">
        <p className="font-body font-semibold text-[18px] text-white">Thank you. Your request is in.</p>
        <p className="mt-2 font-body text-[16px] leading-[1.6] text-[#CBD5E1]">
          One of the founders will send you the deck by email.
        </p>
      </div>

      <InvestorBehavior />
    </>
  );
}
