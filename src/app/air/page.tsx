import type { Metadata } from 'next';
import TopNav from '@/components/TopNav';
import { AIR_BODY_HTML } from './airBody';
import './air.css';

export const metadata: Metadata = {
  title: 'Fletaris Air — Fleet intelligence for technical asset managers',
  description:
    "Fletaris gives technical asset managers a rolling forward view of maintenance commitments, redelivery exposure, and compliance posture — built from the technical data you already have.",
};

export default function AirPage() {
  return (
    <div className="air-page">
      <TopNav />
      <div dangerouslySetInnerHTML={{ __html: AIR_BODY_HTML }} />
      <script src="/js/air-lifecycle.js" defer />
      <script src="/js/app.js" defer />
    </div>
  );
}
