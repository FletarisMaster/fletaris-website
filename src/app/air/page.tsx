import type { Metadata } from 'next';
import TopNav from '@/components/TopNav';
import Footer from '@/components/Footer';
import Waitlist from '@/components/Waitlist';
import Reveal from '@/components/Reveal';
import AirHero from '@/components/air/AirHero';
import ProblemDiptych from '@/components/air/ProblemDiptych';
import SectionHeading from '@/components/air/SectionHeading';
import LifecycleTimeline from '@/components/air/LifecycleTimeline';
import Pillars from '@/components/air/Pillars';
import WhyNow from '@/components/air/WhyNow';
import BuiltFor from '@/components/air/BuiltFor';
import { pageMetadata } from '@/lib/site';

export const metadata: Metadata = pageMetadata({
  path: '/air',
  title: 'Fletaris Air — Fleet intelligence for technical asset managers',
  description:
    'A rolling forward view of maintenance commitments, redelivery exposure and compliance posture, built from the technical records you already keep.',
  ogImage: '/og/air.jpg',
  ogAlt: 'Fletaris Air — your fleet’s technical condition, projected forward',
});

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

/** The timeline's 12-month window, starting at the month the site was built (static export). */
function forwardWindow() {
  const now = new Date();
  return Array.from({ length: 12 }, (_, i) => {
    const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + i, 1));
    const m = d.getUTCMonth();
    return { label: MONTHS[m], quarter: m % 3 === 0 ? `Q${m / 3 + 1} ${d.getUTCFullYear()}` : undefined };
  });
}

// /air as React components (F36 PR 4b), in the hub's visual system and /air's section order
// (Sam, D7). Shares TopNav, Waitlist and Footer with the hub.
export default function AirPage() {
  return (
    <div className="tw bg-hub-base">
      <TopNav />
      <main>
        <AirHero />
        <Reveal>
          <ProblemDiptych />
        </Reveal>
        <Reveal>
          <section className="bg-hub-base" id="lifecycle">
            <div className="max-w-content mx-auto px-5 sm:px-7 py-[clamp(48px,7vw,104px)]">
              <SectionHeading
                index="03"
                label="ASSET LIFECYCLE INTELLIGENCE"
                title="Every event. Every aircraft."
                accent="Every month forward."
                lede="Maintenance, lease and compliance commitments mapped against a rolling forward projection: every event, every component, current as of your last records update."
              />
              <LifecycleTimeline months={forwardWindow()} />
            </div>
          </section>
        </Reveal>
        <Reveal>
          <Pillars />
        </Reveal>
        <Reveal>
          <WhyNow />
        </Reveal>
        <Reveal>
          <BuiltFor />
        </Reveal>
        <Reveal>
          <Waitlist />
        </Reveal>
      </main>
      <Footer />
    </div>
  );
}
