import type { Metadata } from 'next';
import Link from 'next/link';
import TopNav from '@/components/TopNav';
import Footer from '@/components/Footer';
import Waitlist from '@/components/Waitlist';
import HeroVideo from '@/components/site/HeroVideo';
import DemoVideo from '@/components/site/DemoVideo';
import CapabilityTabs from '@/components/site/CapabilityTabs';
import FleetTimeline from '@/components/site/FleetTimeline';
import { Container, H2, Lede, RolesTable } from '@/components/site/Sections';
import { pageMetadata } from '@/lib/site';
import { FLEETS } from '@/lib/timelineFleets';
import { AIR_RECORD } from '@/lib/heroRecords';

export const metadata: Metadata = pageMetadata({
  path: '/air',
  title: 'Fletaris Air — Every aircraft, months ahead',
  description:
    'Fletaris reads the technical records lessors already keep and shows what each aircraft will need, cost and owe in the months ahead: maintenance, redelivery and reserves, before they are due.',
  ogImage: '/og/air.jpg?v=3', // ?v= makes social sites refetch after a redesign
  ogAlt: 'Every aircraft, months ahead: an A320 on a wet apron with its redelivery record, example data',
});

// /air (direction v2, 21 Oct 2026; decisions in docs/brand/website-brand-decisions.md): the
// aircraft and its record, then the product, the three questions, the aircraft timeline and the
// roles. Investors and the market live on the hub.
export default function AirPage() {
  return (
    <div className="tw bg-white">
      <TopNav />
      <main id="main">
        <HeroVideo
          video="/media/air-hero.mp4"
          poster="/media/air-hero.jpg"
          heading="Every aircraft, months ahead."
          lede="Fletaris reads the technical records lessors already keep and shows what each aircraft will need, cost and owe before it is due: maintenance, redelivery and reserves."
          records={[AIR_RECORD]}
          forwardLine
          below={
            <>
              We onboard a small group of lessors ourselves.{' '}
              <a href="#demo" className="text-white underline underline-offset-2">
                Watch the 60-second demo
              </a>
            </>
          }
        />

        <section className="bg-surface-band">
          <Container className="py-[clamp(64px,8vw,104px)]">
            <H2>The product, working today on example data.</H2>
            <Lede>Sixty seconds through the live app: the hangar, an aircraft’s full technical picture, and every return in the portfolio on one screen.</Lede>
            <div className="mt-10">
              <DemoVideo />
            </div>
          </Container>
        </section>

        <section className="bg-white">
          <Container className="py-[clamp(72px,9vw,120px)]">
            <H2>Three questions decide every return.</H2>
            <Lede>Fletaris answers them from the records, months before the aircraft comes back.</Lede>
            <CapabilityTabs
              items={[
                {
                  key: 'cost',
                  when: 'Coming up',
                  q: 'What is coming, and what will it cost?',
                  cap: 'Each aircraft’s full technical picture: checks, life-limited parts and shop visits projected from the records, and priced. Each figure links to the record it came from.',
                  video: '/media/cap-cost.mp4',
                  poster: '/media/cap-cost.jpg',
                  alt: 'An aircraft’s technical picture in Fletaris: identity, parties, check schedule and life-limited parts',
                },
                {
                  key: 'returns',
                  when: 'Next returns',
                  q: 'Who is returning next, and will they be ready?',
                  cap: 'Every return in the portfolio on one timeline, with readiness at the date and whether reserves cover it.',
                  video: '/media/cap-returns.mp4',
                  poster: '/media/cap-returns.jpg',
                  alt: 'The Fletaris lease and redelivery waterfall: each aircraft’s return date and readiness',
                },
                {
                  key: 'owes',
                  when: 'On return day',
                  q: 'Who owes whom, and how much?',
                  cap: 'What must close before return, the compensation due, and the record gaps, found by you first.',
                  video: '/media/cap-owes.mp4',
                  poster: '/media/cap-owes.jpg',
                  alt: 'Fletaris return conditions for one aircraft: conditions failing at the date and the compensation due',
                },
              ]}
            />
          </Container>
        </section>

        <FleetTimeline
          heading="Drag the line through an example fleet."
          lede="Eight aircraft from the product’s example portfolio. Move into the months ahead and see what Fletaris sees: which aircraft come back, and which will not be ready on the date."
          fleets={[FLEETS.air]}
          investorHref="/#investors"
        />

        <section className="bg-white">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/air/air-engine.jpg"
            alt="A turbofan engine on a wet apron, under the wing of a narrowbody airliner"
            width={1600}
            height={1226}
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
            <p className="mt-10 font-body text-[16px] text-text-body">
              Running a procurement or security review?{' '}
              <Link href="/air/trust" className="text-brand-navy underline underline-offset-2">
                Where your data is hosted, who processes it, and what happens to it if you leave
              </Link>
            </p>
            <p className="mt-3 font-body text-[16px] text-text-body">
              Investing?{' '}
              <Link href="/#investors" className="text-brand-navy underline underline-offset-2">
                Request the investor deck on fletaris.com
              </Link>
            </p>
          </Container>
        </section>

        <Waitlist vertical="air" />
      </main>
      <Footer />
    </div>
  );
}
