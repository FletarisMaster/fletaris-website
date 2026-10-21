import type { Metadata } from 'next';
import TopNav from '@/components/TopNav';
import Footer from '@/components/Footer';
import Waitlist from '@/components/Waitlist';
import HeroVideo from '@/components/site/HeroVideo';
import FleetTimeline from '@/components/site/FleetTimeline';
import { Container, H2, Lede, MarketStatement, TeamAndInvestors } from '@/components/site/Sections';
import { FleetsList, PhysicalWorld, ThreePatterns } from '@/components/site/HubSections';
import { pageMetadata } from '@/lib/site';
import { FLEETS } from '@/lib/timelineFleets';
import { HUB_RECORDS } from '@/lib/heroRecords';

export const metadata: Metadata = pageMetadata({
  path: '/',
  title: 'Fletaris — Fleet intelligence that sees forward',
  description:
    'Fletaris turns the technical records behind regulated fleets into a forward view of what each asset will need, cost and owe in the months ahead. Live for aviation today.',
  ogImage: '/og/hub.jpg?v=3', // ?v= makes social sites refetch after a redesign
  ogAlt: 'Fleet intelligence that sees forward: an airliner on the apron with one aircraft’s record, example data',
});

// The hub (direction v2, 21 Oct 2026; decisions in docs/brand/website-brand-decisions.md):
// five fleets, one method. Nothing here repeats /air except the closing form and the footer.
export default function HubPage() {
  return (
    <div className="tw bg-white">
      <TopNav />
      <main id="main">
        <HeroVideo
          video="/media/hub-hero.mp4"
          poster="/media/hub-hero.jpg"
          heading="Fleet intelligence that sees forward."
          lede="Aircraft, drones, trucks, vessels and satellites wear out, answer to rules and build up records. Fletaris turns those records into what each asset will need, cost and owe in the months ahead. Aviation is live today."
          placeholder="you@company.com"
          records={HUB_RECORDS}
          segment={4.5}
          below={
            <>
              <a href="/air" className="text-white underline underline-offset-2">
                See Fletaris Air
              </a>{' '}
              or{' '}
              <a href="#fleet-timeline" className="text-white underline underline-offset-2">
                try the fleet timeline
              </a>
            </>
          }
        />

        <section className="bg-white">
          <Container className="py-[clamp(64px,7vw,104px)]">
            <H2>One method, five kinds of fleet.</H2>
            <Lede>We start where the stakes are highest. Aviation is live, drones are next, and trucks, vessels and satellites are in research on the same core.</Lede>
            <FleetsList />
          </Container>
        </section>

        <FleetTimeline
          heading="Pick a fleet and see what comes due."
          lede="Aircraft are the live product’s example portfolio; drones, trucks, vessels and satellites are illustrative fleets using the same method. Drag the line into the months ahead and see what comes due, and what will not be ready on the date."
          fleets={[FLEETS.air, FLEETS.drone, FLEETS.land, FLEETS.sea, FLEETS.space]}
        />

        <section className="bg-surface-band">
          <Container className="py-[clamp(64px,7vw,104px)]">
            <H2>Different assets, the same three questions.</H2>
            <ThreePatterns />
          </Container>
        </section>

        <section className="bg-white" id="monitor">
          <Container className="py-[clamp(64px,7vw,104px)]">
            <H2>Fletaris on the asset itself.</H2>
            <Lede>
              The Fletaris monitor, in development, is a small device fixed to the asset. It measures the asset’s condition on its
              own and sends it to Fletaris, so the foresight follows the asset every day, not only when someone visits.
            </Lede>
            <PhysicalWorld />
          </Container>
        </section>

        <MarketStatement />
        <TeamAndInvestors />
        <Waitlist />
      </main>
      <Footer />
    </div>
  );
}
