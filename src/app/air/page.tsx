import type { Metadata } from 'next';
import TopNav from '@/components/TopNav';
import Footer from '@/components/Footer';
import Waitlist from '@/components/Waitlist';
import HeroEmail from '@/components/site/HeroEmail';
import ForwardLine from '@/components/site/ForwardLine';
import DemoVideo from '@/components/site/DemoVideo';
import FleetTimeline from '@/components/site/FleetTimeline';
import { CompanyAndInvestors, Container, H2, Lede, MarketStatement, PhotoWithScreen, RolesTable, ThreeQuestions } from '@/components/site/Sections';
import { pageMetadata } from '@/lib/site';

export const metadata: Metadata = pageMetadata({
  path: '/air',
  title: 'Fletaris Air — Every aircraft’s next 24 months, on one screen',
  description:
    'Fletaris turns the technical records lessors already keep into a forward view of maintenance, redelivery and reserves, and shows what each aircraft will need, cost and owe before it is due.',
  ogImage: '/og/air.jpg',
  ogAlt: 'Fletaris Air — your fleet’s technical condition, projected forward',
});

// /air in direction D (F36; decisions in docs/brand/website-brand-decisions.md).
export default function AirPage() {
  return (
    <div className="tw bg-white">
      <TopNav />
      <main>
        {/* Hero: the claim, the email field, and the real aircraft with the live product over it */}
        <section className="bg-white">
          <Container className="pt-[clamp(40px,6vw,88px)]">
            <div className="grid grid-cols-1 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-12 md:gap-14 items-center">
              <div>
                <h1
                  className="font-body font-semibold text-brand-navy text-[clamp(40px,5vw,66px)] leading-[1.04] tracking-[-0.025em]"
                  style={{ textWrap: 'balance' }}
                >
                  Every aircraft’s next 24 months, on one screen.
                </h1>
                <p className="mt-6 font-body text-[19px] leading-[1.6] text-text-body max-w-[500px]">
                  Fletaris turns the technical records lessors already keep into a forward view of maintenance, redelivery and
                  reserves, and shows what each aircraft will need, cost and owe before it is due.
                </p>
                <div className="mt-8">
                  <HeroEmail />
                </div>
                <p className="mt-4 font-body text-[15px] text-text-secondary">
                  We onboard a small group of lessors ourselves.{' '}
                  <a href="#demo" className="text-brand-navy underline underline-offset-2">
                    Watch the 60-second demo
                  </a>
                </p>
              </div>
              <PhotoWithScreen
                photo="/images/hub/air.webp"
                photoAlt="An A320 on a wet apron with maintenance stairs at the forward door"
                screen="/media/fletaris-air-poster.webp"
                screenAlt="The Fletaris hangar view in the live product, with example data"
                caption="The hangar view in the live product, with example data"
              />
            </div>
            <ForwardLine
              points={[
                { when: 'Today', what: 'Your records, exactly as they are' },
                { when: 'In 3 months', what: 'The shop visit, and its cost' },
                { when: 'In 6 months', what: 'Every return in the portfolio' },
                { when: 'In 12 months', what: 'Return day: who owes whom' },
                { when: 'In 24 months', what: 'A fleet that keeps growing' },
              ]}
            />
          </Container>
        </section>

        {/* Evidence: the product itself */}
        <section className="bg-surface-band mt-[clamp(64px,8vw,104px)]">
          <Container className="py-[clamp(64px,8vw,104px)]">
            <H2>This is the product, working today on example data.</H2>
            <Lede>Sixty seconds through the live app: the hangar, an aircraft’s full technical picture, and every return in the portfolio on one screen.</Lede>
            <div className="mt-10">
              <DemoVideo />
            </div>
          </Container>
        </section>

        {/* Three questions, on the forward line */}
        <section className="bg-white">
          <Container className="py-[clamp(72px,9vw,120px)]">
            <H2>Every return comes down to three questions. Fletaris answers them months early.</H2>
            <ThreeQuestions
              items={[
                {
                  when: 'In 3 months',
                  q: 'What is coming, and what will it cost?',
                  img: '/images/air/screen-foresight.webp',
                  alt: 'Fletaris Foresight for one aircraft: maintenance value position, component by component',
                  cap: 'Life-limited parts, checks and shop visits projected from the records, and priced. Each figure links to the record it came from.',
                },
                {
                  when: 'In 6 months',
                  q: 'Who is returning next, and will they be ready?',
                  img: '/images/air/screen-waterfall.webp',
                  alt: 'Fletaris lease and redelivery waterfall across the portfolio',
                  cap: 'Every return in the portfolio on one timeline, with readiness at the date and reserve cover.',
                },
                {
                  when: 'On return day',
                  q: 'Who owes whom, and how much?',
                  img: '/images/air/screen-return.webp',
                  alt: 'Fletaris return conditions and redelivery cash position for one aircraft',
                  cap: 'What must close before return, the compensation due, and the record gaps, found by you first.',
                },
              ]}
            />
          </Container>
        </section>

        {/* The section built to make people stay: drag the line */}
        <FleetTimeline
          heading="Drag the line. Watch an example fleet come due."
          lede="Eight aircraft from the product’s example portfolio. Move from today to 24 months ahead and see what Fletaris sees: which aircraft come back, and which will not be ready on the date."
        />

        <MarketStatement />

        {/* Who uses it */}
        <section className="bg-white border-t border-surface-border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/air/air-inspection.webp"
            alt="A ground engineer looks up at a widebody engine and main landing gear on the apron"
            loading="lazy"
            className="w-full h-[clamp(220px,30vw,420px)] object-cover object-[center_45%] block"
          />
          <Container className="py-[clamp(72px,9vw,120px)]">
            <H2>Who uses it, and for what</H2>
            <RolesTable
              rows={[
                { who: 'Technical asset manager', q: 'What the state of each aircraft means for the leases already signed', where: 'Foresight, return conditions' },
                { who: 'Lessor or portfolio owner', q: 'Which aircraft come back when, and whether reserves cover them', where: 'Lease waterfall, MR summary' },
                { who: 'Independent CAMO', q: 'Being ready for the audit and the return before anyone asks', where: 'Findings, LLP exposure' },
                { who: 'Transition manager', q: 'What has to close before an aircraft can move to its next lessee', where: 'Return conditions, assistant' },
              ]}
            />
          </Container>
        </section>

        <CompanyAndInvestors />
        <Waitlist />
      </main>
      <Footer />
    </div>
  );
}
