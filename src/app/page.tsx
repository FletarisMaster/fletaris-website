import type { Metadata } from 'next';
import TopNav from '@/components/TopNav';
import Footer from '@/components/Footer';
import Waitlist from '@/components/Waitlist';
import HeroEmail from '@/components/site/HeroEmail';
import ForwardLine from '@/components/site/ForwardLine';
import FleetTimeline from '@/components/site/FleetTimeline';
import { CompanyAndInvestors, Container, H2, Lede, MarketStatement, PhotoWithScreen } from '@/components/site/Sections';
import { ThreePatterns, VerticalsRow } from '@/components/site/HubSections';
import { pageMetadata } from '@/lib/site';

export const metadata: Metadata = pageMetadata({
  path: '/',
  title: 'Fletaris — Fleet intelligence for assets that carry life limits',
  description:
    'Fletaris turns the technical records behind regulated fleets into a forward view of what each asset will need, cost and owe. Live for aviation today.',
  ogImage: '/og/hub.jpg',
  ogAlt: 'Fletaris — fleet intelligence for regulated asset managers',
});

// The hub in direction D (F36; decisions in docs/brand/website-brand-decisions.md).
export default function HubPage() {
  return (
    <div className="tw bg-white">
      <TopNav />
      <main>
        <section className="bg-white">
          <Container className="pt-[clamp(40px,6vw,88px)]">
            <div className="grid grid-cols-1 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-12 md:gap-14 items-center">
              <div>
                <h1
                  className="font-body font-semibold text-brand-navy text-[clamp(40px,5vw,66px)] leading-[1.04] tracking-[-0.025em]"
                  style={{ textWrap: 'balance' }}
                >
                  Fleet intelligence for assets that carry life limits.
                </h1>
                <p className="mt-6 font-body text-[19px] leading-[1.6] text-text-body max-w-[500px]">
                  Aircraft, drones, trucks, vessels and satellites run on the same three things: parts that wear out, rules
                  that must be met, and records that decide what happens next. Fletaris turns those records into a view of
                  what is coming. Aviation is live today.
                </p>
                <div className="mt-8">
                  <HeroEmail />
                </div>
                <p className="mt-4 font-body text-[15px] text-text-secondary">
                  <a href="/air" className="text-brand-navy underline underline-offset-2">
                    See Fletaris Air
                  </a>{' '}
                  or{' '}
                  <a href="#fleet-timeline" className="text-brand-navy underline underline-offset-2">
                    try the fleet timeline
                  </a>
                </p>
              </div>
              <PhotoWithScreen
                photo="/images/hub/air.webp"
                photoAlt="An A320 on a wet apron with maintenance stairs at the forward door"
                screen="/media/fletaris-air-poster.webp"
                screenAlt="The Fletaris hangar view in the live product, with example data"
                caption="Fletaris Air, live today: the hangar view with example data"
              />
            </div>
            <ForwardLine
              points={[
                { when: 'Today', what: 'Your records, exactly as they are' },
                { when: 'In 3 months', what: 'The next inspection or overhaul' },
                { when: 'In 6 months', what: 'The commitments coming due' },
                { when: 'In 12 months', what: 'The handover or the return' },
                { when: 'In 24 months', what: 'The fleet you will be running' },
              ]}
            />
          </Container>
        </section>

        <section className="bg-white">
          <Container className="py-[clamp(72px,9vw,120px)]">
            <H2>One method, five kinds of fleet. We start where the stakes are highest.</H2>
            <Lede>Aviation is live. Drones are next. Trucks, vessels and satellites are in research, built on the same core.</Lede>
            <VerticalsRow />
          </Container>
        </section>

        <FleetTimeline
          heading="Start with aviation. Drag the line and watch an example fleet come due."
          lede="Eight aircraft from Fletaris Air’s example portfolio. Move from today to 24 months ahead and see which aircraft come back, and which will not be ready on the date."
        />

        <section className="bg-surface-band">
          <Container className="py-[clamp(72px,9vw,120px)]">
            <H2>Different assets. The same three questions.</H2>
            <ThreePatterns />
          </Container>
        </section>

        <MarketStatement />
        <CompanyAndInvestors />
        <Waitlist />
      </main>
      <Footer />
    </div>
  );
}
