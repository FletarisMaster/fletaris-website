import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/site';
import TopNav from '@/components/TopNav';
import AirLifecycleTabs from '@/components/AirLifecycleTabs';
import WaitlistBehavior from '@/components/WaitlistBehavior';
import { AIR_BODY_HTML } from './airBody';
import './air.css';

export const metadata: Metadata = pageMetadata({
  path: '/air',
  title: 'Fletaris Air — Fleet intelligence for technical asset managers',
  description:
    'A rolling forward view of maintenance commitments, redelivery exposure and compliance posture, built from the technical records you already keep.',
  ogImage: '/og/air.jpg',
  ogAlt: 'Fletaris Air — your fleet’s technical condition, projected forward',
});

export default function AirPage() {
  return (
    <div className="air-page">
      <TopNav />
      <div dangerouslySetInnerHTML={{ __html: AIR_BODY_HTML }} />
      <AirLifecycleTabs />
      <WaitlistBehavior />
    </div>
  );
}
