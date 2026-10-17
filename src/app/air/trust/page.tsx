import type { Metadata } from 'next';
import TopNav from '@/components/TopNav';
import Footer from '@/components/Footer';
import { Container, Lede } from '@/components/site/Sections';
import { pageMetadata } from '@/lib/site';
import trust from '@/data/app/trust.json';

export const metadata: Metadata = pageMetadata({
  path: '/air/trust',
  title: 'Security and data handling — Fletaris Air',
  description:
    'Where Fletaris hosts your data, who processes it, how each customer’s data is kept separate, the audit trail, and what happens to your data if you leave.',
  ogImage: '/og/air.jpg',
  ogAlt: 'Fletaris Air — security and data handling',
});

// The trust page from F31, published under /air in direction D (F36 goal 6). Linked from /air
// and the footer, never a nav tab (Sam, 2026-10-16). Residency and subprocessors come only from
// src/data/app/trust.json, the app's F02 list (scripts/sync-app-data.mjs): no literals here.

const APP = 'https://app.fletaris.com';
const CONTACT = 'operations@fletaris.com';

const STATUS_LABEL: Record<string, string> = {
  ACTIVE: 'In use',
  WHEN_ENABLED: 'When billing is enabled',
  PLANNED: 'Planned',
};

const LINK = 'text-brand-navy underline underline-offset-2 decoration-brand-teal decoration-2 hover:decoration-brand-navy';

/** One question and its answer, ledger style: a rule above, question left, answer right (W16). */
function Entry({ id, q, children }: { id: string; q: string; children: React.ReactNode }) {
  return (
    <div id={id} className="scroll-mt-24 grid grid-cols-1 md:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] gap-4 md:gap-12 py-10 border-t border-surface-border">
      <h2 className="font-body font-semibold text-brand-navy text-[24px] leading-[1.25] tracking-[-0.015em]" style={{ textWrap: 'balance' }}>
        {q}
      </h2>
      <div className="font-body text-[17px] leading-[1.65] text-text-body space-y-4 max-w-[680px]">{children}</div>
    </div>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((t) => (
        <li key={t} className="pl-5 relative">
          <span aria-hidden="true" className="absolute left-0 top-[0.7em] w-2.5 h-[2px] bg-brand-teal" />
          {t}
        </li>
      ))}
    </ul>
  );
}

export default function TrustPage() {
  return (
    <div className="tw bg-white">
      <TopNav />
      <main>
        <section className="bg-white">
          <Container className="pt-[clamp(40px,6vw,88px)] pb-[clamp(32px,4vw,56px)]">
            <p className="font-sans text-[15px] font-medium text-text-secondary">
              <a href="/air" className="hover:text-brand-navy">
                Fletaris Air
              </a>{' '}
              / Security and data handling
            </p>
            <h1
              className="mt-4 font-body font-semibold text-brand-navy text-[clamp(36px,4.4vw,58px)] leading-[1.06] tracking-[-0.025em] max-w-[900px]"
              style={{ textWrap: 'balance' }}
            >
              Answers for your procurement and security review.
            </h1>
            <Lede>
              Where your data is hosted, who processes it, how it is kept apart from other customers’ data, and what happens
              to it if you leave.
            </Lede>
          </Container>
        </section>

        <section className="bg-white">
          <Container className="pb-[clamp(64px,8vw,104px)]">
            <Entry id="hosting" q="Where is our data hosted?">
              <p>
                <b className="font-semibold text-brand-navy">Today:</b> {trust.dataResidency.current}.
              </p>
              <p>
                <b className="font-semibold text-brand-navy">Planned, not yet live:</b> {trust.dataResidency.planned}.
                Write to us for its status.
              </p>
            </Entry>

            <Entry id="subprocessors" q="Who processes our data?">
              <p>
                These are the companies that process customer data on our behalf. The same list is part of our{' '}
                <a href={`${APP}/legal/dpa`} className={LINK}>
                  Data Processing Agreement
                </a>
                .
              </p>
            </Entry>
            <div className="overflow-x-auto -mt-2 mb-4">
              <table className="w-full min-w-[760px] border-collapse font-body text-[15px]">
                <thead>
                  <tr className="text-left font-sans text-[14px] text-text-secondary border-b-2 border-brand-navy">
                    <th className="py-3 pr-4 font-medium">Company</th>
                    <th className="py-3 px-4 font-medium">What it does for us</th>
                    <th className="py-3 px-4 font-medium">Data it handles</th>
                    <th className="py-3 px-4 font-medium">Location</th>
                    <th className="py-3 pl-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {trust.subprocessors.map((s) => (
                    <tr key={s.name} className="border-b border-surface-border align-top">
                      <td className="py-4 pr-4 font-semibold text-brand-navy">{s.name}</td>
                      <td className="py-4 px-4 text-[#334155] leading-[1.5]">{s.purpose}</td>
                      <td className="py-4 px-4 text-[#334155] leading-[1.5]">{s.dataCategories}</td>
                      <td className="py-4 px-4 text-[#334155]">{s.location}</td>
                      <td className="py-4 pl-4 text-[#334155] whitespace-nowrap">{STATUS_LABEL[s.status] ?? s.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Entry id="isolation" q="How is our data kept separate from other customers’?">
              <Bullets
                items={[
                  'Every record belongs to exactly one customer organisation, and every database query is limited to the signed-in organisation.',
                  'A request for another organisation’s record returns “not found”. The system does not confirm that the record exists.',
                  'An automated isolation test suite runs on every change before it is released.',
                ]}
              />
            </Entry>

            <Entry id="audit" q="Can we see who changed what?">
              <Bullets
                items={[
                  'Every create, update and delete is recorded in an audit trail: who made the change, when, and the value of each field before and after.',
                  'The audit entry is written in the same database transaction as the change, so a change is never saved without its record.',
                  'Nobody can edit or delete an audit entry in the product. Fletaris staff can read the trail to give support, never change it.',
                ]}
              />
            </Entry>

            <Entry id="exit" q="What happens to our data if we leave?">
              <Bullets
                items={[
                  'Your aircraft data remains yours.',
                  'After termination you have 30 days to export it, as CSV or Excel from the product or on request. After that we delete it from active systems, and backups roll off within our backup retention period.',
                ]}
              />
              <p>
                The full terms are in{' '}
                <a href={`${APP}/legal/terms#term-termination-and-your-data`} className={LINK}>
                  Terms of Service §13
                </a>
                .
              </p>
            </Entry>

            <Entry id="practices" q="How is the service secured?">
              <Bullets
                items={[
                  'TLS encryption for all traffic in transit.',
                  'Encryption at rest, managed by our database and hosting providers.',
                  'Roles within your organisation: Owner, Manager and Viewer.',
                  'Every change is scanned for vulnerable dependencies and committed secrets before it is released.',
                ]}
              />
            </Entry>
          </Container>
        </section>

        {/* The page's one navy band (W1): the security contact */}
        <section className="bg-brand-navy">
          <Container className="py-[clamp(56px,7vw,88px)] grid grid-cols-1 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] gap-8 md:gap-16 items-end">
            <div>
              <h2 className="font-body font-semibold text-white text-[clamp(26px,3vw,38px)] leading-[1.15] tracking-[-0.02em]" style={{ textWrap: 'balance' }}>
                A question this page does not answer?
              </h2>
              <p className="mt-4 font-body text-[17px] leading-[1.6] text-white/75 max-w-[560px]">
                Send us your security questionnaire, report a vulnerability, or ask for the status of EU hosting. A founder
                replies.
              </p>
            </div>
            <div className="md:justify-self-end">
              <a
                href={`mailto:${CONTACT}?subject=${encodeURIComponent('Security question')}`}
                className="inline-block bg-brand-teal text-brand-navy font-sans font-semibold text-[15px] px-6 py-3.5 rounded-[3px] hover:bg-white"
              >
                Email {CONTACT}
              </a>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
