import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import TopNav from '@/components/TopNav';
import Footer from '@/components/Footer';
import Waitlist from '@/components/Waitlist';
import { Container } from '@/components/site/Sections';
import { pageMetadata } from '@/lib/site';
import { INSIGHTS, formatDate, insightBySlug } from '@/lib/insights';

export function generateStaticParams() {
  return INSIGHTS.map((n) => ({ slug: n.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const n = insightBySlug(params.slug);
  if (!n) return {};
  return pageMetadata({
    path: `/insights/${n.slug}`,
    title: `${n.title} — Fletaris Insights`,
    description: n.summary,
    ogImage: '/og/hub.jpg?v=3',
    ogAlt: n.title,
  });
}

export default function InsightPage({ params }: { params: { slug: string } }) {
  const n = insightBySlug(params.slug);
  if (!n) notFound();
  return (
    <div className="tw bg-white">
      <TopNav />
      <main id="main">
        <article className="bg-white">
          <Container className="pt-[clamp(48px,7vw,96px)] pb-[clamp(64px,8vw,104px)]">
            <div className="max-w-[700px]">
              <Link href="/insights" className="font-sans text-[14px] font-medium text-text-secondary hover:text-brand-navy">
                ← Insights
              </Link>
              <h1
                className="mt-6 font-body font-semibold text-brand-navy text-[clamp(30px,3.4vw,44px)] leading-[1.1] tracking-[-0.02em]"
                style={{ textWrap: 'balance' }}
              >
                {n.title}
              </h1>
              <p className="mt-4 font-sans text-[14px] font-medium text-text-secondary">
                <time dateTime={n.date}>{formatDate(n.date)}</time> · Fletaris team
              </p>
              <p className="mt-8 font-body text-[21px] leading-[1.55] text-brand-navy">{n.summary}</p>
              {n.blocks.map((b, i) => (
                <section key={i} className="mt-10">
                  {b.h && <h2 className="font-body font-semibold text-[24px] leading-[1.25] text-brand-navy">{b.h}</h2>}
                  <div className={`${b.h ? 'mt-4' : ''} space-y-5`}>
                    {b.p.map((p) => (
                      <p key={p.slice(0, 32)} className="font-body text-[18px] leading-[1.7] text-[#334155]">
                        {p}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
              <p className="mt-14 pt-8 border-t border-surface-border font-body text-[17px] leading-[1.6] text-text-body">
                Fletaris reads the records lessors already keep and shows what each aircraft will need, cost and owe in the months
                ahead. It does not audit those records; it turns them into foresight.{' '}
                <Link href="/air" className="text-brand-navy underline underline-offset-2">
                  See Fletaris Air
                </Link>
              </p>
            </div>
          </Container>
        </article>
        <Waitlist vertical="air" />
      </main>
      <Footer />
    </div>
  );
}
