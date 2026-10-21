// Building blocks shared by the hub and /air (brand decisions: docs/brand/website-brand-decisions.md).
// Light ground, navy type, teal only as a line or fill, sentence-case section headlines (caps only
// in the hero and the closing band, W2), real photos and real product footage.

import InvestorForm from '@/components/site/InvestorForm';

export function Container({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`max-w-content mx-auto px-5 sm:px-10 ${className}`}>{children}</div>;
}

export function H2({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <h2
      className={`font-body font-semibold text-brand-navy text-[clamp(30px,3.6vw,46px)] leading-[1.1] tracking-[-0.02em] max-w-[860px] ${className}`}
      style={{ textWrap: 'balance' }}
    >
      {children}
    </h2>
  );
}

export function Lede({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`mt-5 font-body text-[18px] leading-[1.6] text-text-body max-w-[640px] ${className}`} style={{ textWrap: 'pretty' }}>
      {children}
    </p>
  );
}

/** The market, written as a sentence with its sources (W14). On the band, so it never runs into the white section above. */
export function MarketStatement() {
  return (
    <section className="bg-surface-band">
      <Container className="py-[clamp(64px,7vw,104px)]">
        <p className="font-body font-medium text-brand-navy text-[clamp(26px,3.2vw,42px)] leading-[1.3] tracking-[-0.01em] max-w-[1040px]">
          About <Num>25,000</Num> airliners fly today. Airbus expects about <Num>49,000</Num> by 2044. Roughly{' '}
          <Num>half</Num> are leased, and the 31 largest lessors alone hold about <Num>$318B</Num> of aircraft. Every one of
          those leases ends in a redelivery that the technical record decides.
        </p>
        <p className="mt-8 font-body text-[14px] leading-[1.6] text-text-secondary max-w-[900px]">
          Sources: Airbus Global Market Forecast 2025–2044; industry estimates, 2025 (nearly half to about 58% leased); AvBench
          Aircraft Lessors Portfolio Review, January 2026 (data: ch-aviation).
        </p>
      </Container>
    </section>
  );
}

function Num({ children }: { children: React.ReactNode }) {
  return <b className="font-semibold underline decoration-brand-teal decoration-[3px] underline-offset-[6px]">{children}</b>;
}

/** Who uses it: a table from 720px up (W16), stacked blocks on phones so nothing is cut off. */
export function RolesTable({ rows }: { rows: Array<{ who: string; q: string; where: string }> }) {
  return (
    <>
      <table className="hidden sm:table mt-8 w-full border-collapse font-body text-[16px]">
        <thead>
          <tr className="text-left font-sans text-[14px] text-text-secondary border-b-2 border-brand-navy">
            <th className="py-3 pr-4 font-medium">Role</th>
            <th className="py-3 px-4 font-medium">What they have to answer for</th>
            <th className="py-3 pl-4 font-medium">Where they work in Fletaris</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.who} className="border-b border-surface-border align-top">
              <td className="py-[18px] pr-4 font-semibold text-brand-navy">{r.who}</td>
              <td className="py-[18px] px-4 text-[#334155] leading-[1.5]">{r.q}</td>
              <td className="py-[18px] pl-4 text-[#334155]">{r.where}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <dl className="sm:hidden mt-8 grid gap-7 font-body text-[16px]">
        {rows.map((r) => (
          <div key={r.who}>
            <dt className="font-semibold text-[18px] text-brand-navy">{r.who}</dt>
            <dd className="m-0 mt-1 text-[#334155] leading-[1.5]">{r.q}</dd>
            <dd className="m-0 mt-1 text-text-secondary">Works in: {r.where}</dd>
          </div>
        ))}
      </dl>
    </>
  );
}

// Anonymous for now (Sam, 21 Oct 2026): what the team has done, not who they are. Every line
// must hold up to "who on the team did that?".
const EXPERIENCE = [
  'Technical asset management for aircraft lessors',
  'Aircraft and engine asset valuation',
  'Lease transitions and redeliveries',
  'Continuing airworthiness (CAMO) and technical records',
  'MRO, heavy checks and engine shop visits',
  'Maintenance reserves and aviation finance',
  'Software and data engineering',
];

/** The team line and the investor path, on the hub only. The deck form opens in place. */
export function TeamAndInvestors() {
  return (
    <section className="bg-white" id="investors">
      <Container className="py-[clamp(64px,7vw,104px)] grid grid-cols-1 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] gap-12 md:gap-16 items-start">
        <div>
          <H2>Built by people who have done the work.</H2>
          <Lede>
            Fletaris is made by Uchuva Tech, a small team of aviation and software professionals. Between us, we have worked in:
          </Lede>
          <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-3 font-body text-[17px] leading-[1.45] text-brand-navy">
            {EXPERIENCE.map((e) => (
              <li key={e} className="flex gap-3">
                <span className="mt-[0.55em] h-1.5 w-1.5 shrink-0 bg-brand-teal" aria-hidden="true" />
                {e}
              </li>
            ))}
          </ul>
          <dl className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 font-body text-[16px]">
            <div>
              <dt className="font-semibold text-brand-navy">The product</dt>
              <dd className="m-0 mt-1 text-text-body">Live at app.fletaris.com, aviation first</dd>
            </div>
            <div>
              <dt className="font-semibold text-brand-navy">Founding Partner Programme</dt>
              <dd className="m-0 mt-1 text-text-body">A small number of lessors bring real portfolios and shape what we build next</dd>
            </div>
            <div>
              <dt className="font-semibold text-brand-navy">Next verticals</dt>
              <dd className="m-0 mt-1 text-text-body">Drones, then trucks, vessels and satellites</dd>
            </div>
          </dl>
        </div>
        <aside className="bg-surface-band p-8 sm:p-9">
          <h3 className="font-body font-semibold text-[24px] leading-[1.2] text-brand-navy">For investors</h3>
          <p className="mt-3 font-body text-[16px] leading-[1.6] text-text-body">
            The investor deck covers the market model, the product and the Founding Partner Programme.
          </p>
          <details id="investor-details" className="mt-6 group">
            <summary className="list-none [&::-webkit-details-marker]:hidden inline-flex cursor-pointer font-sans text-[15px] font-semibold text-white bg-brand-navy rounded-[3px] px-5 py-3.5 hover:bg-brand-navy-alt transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-teal group-open:hidden">
              Get the investor deck
            </summary>
            <InvestorForm />
          </details>
          <p className="mt-5 font-body text-[14px] text-text-secondary">Or write to operations@fletaris.com</p>
        </aside>
      </Container>
    </section>
  );
}
