import FleetFields from '@/components/FleetFields';
import WaitlistBehavior from '@/components/WaitlistBehavior';
import type { Vertical } from '@/lib/fleet-options';
import { DATA_OWNERSHIP_LINE, DATA_TRUST_URL, PRIVACY_POLICY_URL, WAITLIST_PRIVACY_LINE } from '@/lib/waitlist';

// The one signup form, shared by the hub and /air. It is also each page's closing band (direction
// v2): navy, with the second of the two caps lines a page may have (W2), running into the footer. Element ids are the
// contract with the binder in src/lib/waitlist.ts (via <WaitlistBehavior />) and with the hero
// email field (src/components/site/HeroEmail.tsx), which fills #email and focuses the next empty
// required field (#vertical on the hub, #fleetsize on /air).
// `vertical` fixes the vertical (/air → "air"); without it the form asks "What do you manage?".
// The submit button's first child must stay its text label (the binder swaps it while sending).

const LABEL = 'block font-sans text-[14px] font-medium text-brand-navy mb-2';
const FIELD =
  'w-full bg-white border border-[#94A3B8] rounded-[3px] px-4 py-3.5 text-text-primary font-body text-[16px] outline-none focus:border-brand-navy focus:ring-2 focus:ring-brand-teal/50';

export default function Waitlist({ vertical }: { vertical?: Vertical }) {
  return (
    <section className="bg-brand-navy text-white" id="waitlist">
      <div className="max-w-content mx-auto px-5 sm:px-10 py-[clamp(72px,9vw,128px)] grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
        <div>
          <h2
            className="font-body font-bold uppercase text-white text-[clamp(34px,calc(3.4vw+12px),56px)] leading-[1] tracking-[-0.01em]"
            style={{ textWrap: 'balance' }}
          >
            See your fleet, months ahead.
          </h2>
          <p className="mt-6 font-body text-[18px] leading-[1.6] text-[#E2E8F0] max-w-[480px]">
            We onboard a small group of lessors and CAMOs ourselves, starting from the records you already keep. No sales
            sequence: one of the founders will write to you.
          </p>
          <p className="mt-4 font-body text-[16px] leading-[1.6] text-[#CBD5E1] max-w-[480px]">
            {DATA_OWNERSHIP_LINE}{' '}
            <a href={DATA_TRUST_URL} className="text-white underline underline-offset-2">
              How we protect your data
            </a>
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/air/air-records.webp"
            alt="Towers of paper files with tabs on an office desk"
            loading="lazy"
            width={2000}
            height={1333}
            className="mt-10 w-full h-auto max-w-[520px] aspect-[3/2] object-cover block"
          />
          <p className="mt-3 font-body text-[13px] text-[#CBD5E1]">Where most fleets’ technical data lives today.</p>
        </div>

        <div>
          <form id="waitlist-form" noValidate className="relative bg-white text-text-primary rounded-[3px] p-7 sm:p-9">
            {/* Honeypot: hidden from people, filled in by bots; the Worker drops those entries. */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
              <label htmlFor="website">Website</label>
              <input id="website" name="website" tabIndex={-1} autoComplete="off" />
            </div>
            <h3 className="font-body font-semibold text-[22px] text-brand-navy">Request early access</h3>
            <noscript>
              <p className="mt-3 font-body text-[15px] text-text-body">This form needs JavaScript. You can also write to operations@fletaris.com.</p>
            </noscript>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstname" className={LABEL}>
                  First name
                </label>
                <input id="firstname" autoComplete="given-name" className={FIELD} />
              </div>
              <div>
                <label htmlFor="lastname" className={LABEL}>
                  Last name
                </label>
                <input id="lastname" autoComplete="family-name" className={FIELD} />
              </div>
            </div>

            <div id="group-email" className="mt-4">
              <label htmlFor="email" className={LABEL}>
                Work email <span aria-hidden="true">*</span>
              </label>
              <input id="email" type="email" required autoComplete="email" aria-describedby="email-error" placeholder="you@lessor.com" className={FIELD} />
              <p id="email-error" data-field-error="" hidden className="mt-2 font-body text-[14px] text-[#B91C1C]">
                Enter a valid work email, like name@company.com.
              </p>
            </div>

            <div className="mt-4">
              <label htmlFor="company" className={LABEL}>
                Company
              </label>
              <input id="company" autoComplete="organization" className={FIELD} />
            </div>

            <FleetFields vertical={vertical} labelClass={LABEL} fieldClass={FIELD} />

            <div data-turnstile-slot="" className="[&:not(:empty)]:mt-4" />

            <div
              id="form-error-banner"
              role="alert"
              style={{ display: 'none' }}
              className="mt-4 bg-[#FEF2F2] border border-[#FECACA] px-4 py-3 font-body text-[14px] text-[#B91C1C]"
            >
              Something went wrong. Please try again.
            </div>

            <button
              type="submit"
              disabled
              className="mt-6 w-full bg-brand-navy text-white font-sans text-[16px] font-semibold rounded-[3px] px-4 py-4 hover:bg-brand-navy-alt transition-colors disabled:opacity-60 disabled:cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-teal"
            >
              Request early access
            </button>

            <p className="mt-4 font-body text-[13px] leading-[1.55] text-text-secondary">
              {WAITLIST_PRIVACY_LINE}{' '}
              <a href={PRIVACY_POLICY_URL} className="text-brand-navy underline underline-offset-2">
                Privacy Policy
              </a>
            </p>
          </form>

          <div id="form-success" style={{ display: 'none' }} className="bg-white rounded-[3px] border-t-[3px] border-t-status-green p-9">
            <h3 className="font-body font-semibold text-[22px] text-brand-navy">You’re on the list.</h3>
            <p className="mt-3 font-body text-[16px] leading-[1.6] text-text-body">
              One of the founders will write to you if your portfolio is a fit for the first cohort.
            </p>
          </div>
        </div>
      </div>

      <WaitlistBehavior />
    </section>
  );
}
