// §07 — the highest-risk section per the spec. The form fields, element IDs,
// validation, and submission handler are IDENTICAL to /air's — this loads the
// exact same unmodified /js/app.js against restyled markup. Nothing about the
// submission logic itself has changed; this is a second instance of it, not
// an edit to the existing one.
const TRUST_LINES = [
  'Onboarding led by founders',
  'Records imported, never resold',
  'Direct outreach only',
];

function CheckIcon() {
  return (
    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-brand-teal/12 border border-brand-teal/40 shrink-0">
      <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
        <path d="M3 8L7 12L13 4" stroke="#00C4CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export default function Waitlist() {
  return (
    <section className="relative bg-hub-base overflow-hidden" id="waitlist">
      {/* ambient texture — subtle grid + teal glow behind the form, echoing the atom */}
      <div
        className="absolute inset-0 opacity-[0.4] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(#181B21 1px, transparent 1px), linear-gradient(90deg, #181B21 1px, transparent 1px)',
          backgroundSize: '68px 68px',
        }}
      />
      <div
        className="absolute top-1/2 right-[8%] -translate-y-1/2 w-[520px] h-[520px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,196,204,0.10), transparent 70%)' }}
      />

      <div className="relative max-w-content mx-auto px-5 sm:px-7 py-[clamp(32px,5vw,72px)]">
        <div className="inline-flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.16em] text-brand-teal border border-brand-teal/30 bg-brand-teal/10 rounded-full px-3.5 py-1.5 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-teal shadow-[0_0_6px_rgba(0,196,204,0.6)]" />
          Limited cohort · By invitation
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
          <div>
            <h2 className="font-body font-bold uppercase text-text-on-dark leading-[1.05] tracking-[-0.02em] text-[clamp(32px,4.5vw,52px)]">
              Get early access.
            </h2>
            <p className="mt-6 font-body text-text-on-dark-dim text-[16px] leading-[1.6] max-w-[440px]">
              We&apos;re onboarding a limited number of organizations. No sales calls. No demos you didn&apos;t ask for.
            </p>

            <div className="mt-10 pt-8 border-t border-hub-line flex flex-col gap-4">
              {TRUST_LINES.map((text) => (
                <div key={text} className="flex items-center gap-3.5">
                  <CheckIcon />
                  <span className="font-body text-[14px] text-text-on-dark-dim">{text}</span>
                </div>
              ))}
            </div>

            <p className="mt-8 pt-6 border-t border-hub-line font-body text-[13px] text-text-on-dark-dim leading-[1.6] max-w-[440px]">
              Built by a team of industry professionals across aviation, asset
              management, asset financing, project management, and software
              development.
            </p>
          </div>

          <form
            id="waitlist-form"
            className="relative bg-hub-card border border-brand-teal/25 rounded-lg p-8 shadow-[0_24px_64px_-24px_rgba(0,196,204,0.25)] overflow-hidden"
          >
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-teal to-transparent" />
            <div className="flex items-center justify-between mb-6">
              <span className="font-sans text-sm font-semibold text-text-on-dark">REQUEST ACCESS</span>
              <span className="font-mono text-[11px] text-brand-teal tracking-[0.06em]">STEP 1 / 1</span>
            </div>

            <div className="grid grid-cols-2 gap-3.5">
              <div className="mb-4">
                <label className="block font-mono text-[10.5px] font-semibold uppercase tracking-[0.1em] text-text-on-dark-dim mb-2">
                  First name
                </label>
                <input
                  id="firstname"
                  placeholder="Maria"
                  className="w-full bg-hub-base border border-hub-line rounded px-4 py-3.5 text-text-on-dark font-body text-sm outline-none focus:border-brand-teal transition-colors"
                />
              </div>
              <div className="mb-4">
                <label className="block font-mono text-[10.5px] font-semibold uppercase tracking-[0.1em] text-text-on-dark-dim mb-2">
                  Last name
                </label>
                <input
                  id="lastname"
                  placeholder="Rodriguez"
                  className="w-full bg-hub-base border border-hub-line rounded px-4 py-3.5 text-text-on-dark font-body text-sm outline-none focus:border-brand-teal transition-colors"
                />
              </div>
            </div>

            <div id="group-email" className="mb-4">
              <label className="block font-mono text-[10.5px] font-semibold uppercase tracking-[0.1em] text-text-on-dark-dim mb-2">
                Work email *
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="m.rodriguez@avcap.com"
                className="w-full bg-hub-base border border-hub-line rounded px-4 py-3.5 text-text-on-dark font-body text-sm outline-none focus:border-brand-teal transition-colors"
              />
            </div>

            <div className="mb-4">
              <label className="block font-mono text-[10.5px] font-semibold uppercase tracking-[0.1em] text-text-on-dark-dim mb-2">
                Company
              </label>
              <input
                id="company"
                placeholder="Aero Capital Partners"
                className="w-full bg-hub-base border border-hub-line rounded px-4 py-3.5 text-text-on-dark font-body text-sm outline-none focus:border-brand-teal transition-colors"
              />
            </div>

            <div id="group-fleetsize" className="mb-4">
              <label className="block font-mono text-[10.5px] font-semibold uppercase tracking-[0.1em] text-text-on-dark-dim mb-2">
                Fleet size *
              </label>
              <select
                id="fleetsize"
                required
                defaultValue=""
                className="w-full bg-hub-base border border-hub-line rounded px-4 py-3.5 text-text-on-dark font-body text-sm outline-none focus:border-brand-teal transition-colors appearance-none"
              >
                <option value="" disabled>
                  Select fleet size
                </option>
                <option>1 – 10 aircraft</option>
                <option>11 – 30 aircraft</option>
                <option>31 – 80 aircraft</option>
                <option>80+ aircraft</option>
              </select>
            </div>

            <div
              id="form-error-banner"
              style={{ display: 'none' }}
              className="bg-status-red/10 border border-status-red/40 rounded px-4 py-3 font-mono text-xs text-status-red mb-3.5"
            >
              Something went wrong. Please try again.
            </div>

            <button
              type="submit"
              className="w-full bg-brand-teal text-hub-base font-sans text-sm font-bold rounded px-4 py-4 mt-2 hover:bg-brand-teal/90 hover:shadow-[0_8px_24px_-4px_rgba(0,196,204,0.5)] transition-all inline-flex items-center justify-center gap-2.5"
            >
              Join the waitlist
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path
                  d="M2 8H14M14 8L9 3M14 8L9 13"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </form>

          <div
            id="form-success"
            style={{ display: 'none' }}
            className="md:col-start-2 relative bg-hub-card border border-status-green/35 rounded-lg p-9 text-center overflow-hidden"
          >
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-status-green to-transparent" />
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-status-green/12 border border-status-green/40 mb-4">
              <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                <path d="M3 8L7 12L13 4" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <div className="font-body font-bold text-text-on-dark text-xl mb-2.5">You&apos;re on the list.</div>
            <div className="font-body text-sm text-text-on-dark-dim leading-[1.6]">
              Direct outreach only — you&apos;ll hear from us if your portfolio is the right fit.
            </div>
          </div>
        </div>
      </div>

      <script src="/js/app.js" defer />
    </section>
  );
}
