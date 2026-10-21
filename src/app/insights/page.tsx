import type { Metadata } from 'next';
import Link from 'next/link';
import TopNav from '@/components/TopNav';
import Footer from '@/components/Footer';
import Waitlist from '@/components/Waitlist';
import { Container, H2 } from '@/components/site/Sections';
import { pageMetadata } from '@/lib/site';
import { INSIGHTS, formatDate } from '@/lib/insights';

export const metadata: Metadata = pageMetadata({
  path: '/insights',
  title: 'Insights — Fletaris',
  description: 'Short notes on redelivery, maintenance reserves and the technical records behind leased aircraft, from the team building Fletaris.',
  ogImage: '/og/hub.jpg?v=3',
  ogAlt: 'Fletaris Insights',
});

export default function InsightsPage() {
  return (
    <div className="tw bg-white">
      <TopNav />
      <main id="main">
        <section className="bg-white">
          <Container className="pt-[clamp(56px,8vw,112px)] pb-[clamp(64px,8vw,104px)]">
            <h1 className="font-body font-semibold text-brand-navy text-[clamp(40px,5vw,64px)] leading-[1.04] tracking-[-0.025em]">Insights</h1>
            <p className="mt-5 font-body text-[19px] leading-[1.6] text-text-body max-w-[640px]">
              Short notes on redelivery, maintenance reserves and the technical records behind leased aircraft.
            </p>
            <ul className="mt-12 grid gap-10 max-w-[860px]">
              {INSIGHTS.map((n) => (
                <li key={n.slug}>
                  <Link href={`/insights/${n.slug}`} className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal rounded-[3px]">
                    <time dateTime={n.date} className="font-sans text-[14px] font-medium text-text-secondary">
                      {formatDate(n.date)}
                    </time>
                    <H2 className="mt-2 !text-[clamp(24px,2.6vw,32px)] group-hover:underline decoration-2 underline-offset-4">{n.title}</H2>
                    <p className="mt-3 font-body text-[17px] leading-[1.6] text-text-body max-w-[700px]">{n.summary}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
        <Waitlist />
      </main>
      <Footer />
    </div>
  );
}
