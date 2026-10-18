// Direction D building blocks shared by the hub and /air (brand decisions:
// docs/brand/website-brand-decisions.md). Light ground, navy type, teal only as a line or fill,
// sentence-case headlines, real photos and real product screens.

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
  return <p className={`mt-5 font-body text-[18px] leading-[1.6] text-text-body max-w-[640px] ${className}`}>{children}</p>;
}

/**
 * Hero picture: a real photo with a real product screen laid over its corner (Flexport-style).
 * Pass `picture` instead of `photo` for a composed picture (the hub's verticals mosaic); it
 * should fill the same 16:11 frame.
 */
export function PhotoWithScreen({
  photo,
  photoAlt,
  picture,
  screen,
  screenAlt,
  caption,
}: {
  screen: string;
  screenAlt: string;
  caption: string;
} & ({ photo: string; photoAlt: string; picture?: never } | { picture: React.ReactNode; photo?: never; photoAlt?: never })) {
  return (
    <figure className="m-0 relative pb-16 md:pb-20">
      {picture ?? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={photo} alt={photoAlt} className="w-full aspect-[16/11] object-cover object-[center_45%] block grayscale" />
      )}
      <div className="absolute left-0 md:-left-8 bottom-0 w-[70%] md:w-[62%] bg-white border border-[#CBD5E1] p-1.5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={screen} alt={screenAlt} className="w-full block" />
      </div>
      <figcaption className="hidden md:block absolute right-0 bottom-4 max-w-[34%] text-right font-body text-[13px] leading-[1.4] text-text-secondary">
        {caption}
      </figcaption>
    </figure>
  );
}

/** Three questions on the forward line, each answered by a real product screen. */
export function ThreeQuestions({
  items,
}: {
  items: Array<{ when: string; q: string; img: string; alt: string; cap: string }>;
}) {
  return (
    <>
      <div className="mt-12 border-t-[3px] border-brand-teal" />
      <div className="mt-7 grid grid-cols-1 md:grid-cols-3 gap-10">
        {items.map((it) => (
          <figure key={it.q} className="m-0">
            <div className="font-sans text-[14px] font-semibold text-brand-navy">{it.when}</div>
            <h3 className="mt-2 font-body font-semibold text-[23px] leading-[1.25] text-text-primary">{it.q}</h3>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={it.img}
              alt={it.alt}
              loading="lazy"
              className="mt-5 w-full aspect-[16/10] object-cover object-left-top block border border-[#CBD5E1]"
            />
            <figcaption className="mt-3 font-body text-[15px] leading-[1.55] text-text-body">{it.cap}</figcaption>
          </figure>
        ))}
      </div>
    </>
  );
}

/** The market, written as a sentence with its sources (W14). Light section. */
export function MarketStatement() {
  return (
    <section className="bg-white">
      <Container className="py-[clamp(72px,9vw,128px)]">
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

/** Who uses it: a table, the way lessor sites present it (W16). */
export function RolesTable({ rows }: { rows: Array<{ who: string; q: string; where: string }> }) {
  return (
    <div className="mt-8 overflow-x-auto">
      <table className="w-full min-w-[640px] border-collapse font-body text-[16px]">
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
              <td className="py-[18px] pr-4 font-semibold text-brand-navy whitespace-nowrap">{r.who}</td>
              <td className="py-[18px] px-4 text-[#334155] leading-[1.5]">{r.q}</td>
              <td className="py-[18px] pl-4 text-[#334155]">{r.where}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Company and investors (the section lessor sites always have). No founder names yet. */
export function CompanyAndInvestors() {
  return (
    // #investors sits on the section, not the form panel: the panel stacks below the copy on
    // mobile, so anchoring it skipped the heading. scroll-mt-16 clears the sticky nav.
    <section className="bg-surface-band scroll-mt-16" id="investors">
      <Container className="py-[clamp(72px,9vw,120px)] grid grid-cols-1 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] gap-12 md:gap-16 items-start">
        <div>
          <H2>Built by engineers who have sat on the lessor side of a redelivery.</H2>
          <Lede>
            Fletaris is made by Uchuva Tech. We work with a small group of lessors through the Founding Partner Programme:
            they bring real portfolios and real returns, and shape what we build next.
          </Lede>
          <ul className="mt-8 border-t border-surface-border font-body text-[16px]">
            <li className="flex flex-wrap justify-between gap-x-4 gap-y-1 py-4 border-b border-surface-border">
              <span className="font-semibold text-brand-navy">The product</span>
              <span className="text-text-body">Live at app.fletaris.com, aviation first</span>
            </li>
            <li className="flex flex-wrap justify-between gap-x-4 gap-y-1 py-4 border-b border-surface-border">
              <span className="font-semibold text-brand-navy">Founding Partner Programme</span>
              <span className="text-text-body">Open to a small number of lessors</span>
            </li>
            <li className="flex flex-wrap justify-between gap-x-4 gap-y-1 py-4 border-b border-surface-border">
              <span className="font-semibold text-brand-navy">Next verticals</span>
              <span className="text-text-body">Drones, then trucks, vessels and satellites</span>
            </li>
          </ul>
        </div>
        <aside className="bg-brand-navy text-white p-9 border-t-4 border-brand-teal">
          <h3 className="font-body font-semibold text-[26px] leading-[1.2]">For investors</h3>
          <p className="mt-3 font-body text-[16px] leading-[1.6] text-[#CBD5E1]">
            The investor deck covers the market model, the product and the Founding Partner Programme.
          </p>
          <InvestorForm />
          <p className="mt-4 font-body text-[14px] text-[#CBD5E1]">Or write to operations@fletaris.com</p>
        </aside>
      </Container>
    </section>
  );
}
