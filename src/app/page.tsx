import TopNav from '@/components/TopNav';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Atom from '@/components/Atom';
import AssetCarousel from '@/components/AssetCarousel';
import ThreePatterns from '@/components/ThreePatterns';
import AirProofBand from '@/components/AirProofBand';
import FivePersonas from '@/components/FivePersonas';
import Waitlist from '@/components/Waitlist';
import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/site';
import { HoverSyncProvider } from '@/components/HoverSyncContext';

export const metadata: Metadata = pageMetadata({
  path: '/',
  title: 'Fletaris — Fleet intelligence software for regulated asset managers',
  description:
    'Fleet intelligence for regulated asset managers. Fletaris projects what your technical data means for the commitments ahead, starting with aircraft.',
  ogImage: '/og/hub.jpg',
  ogAlt: 'Fletaris — fleet intelligence for regulated asset managers',
});

export default function HubPage() {
  return (
    <div className="hub-page">
      <HoverSyncProvider>
        <TopNav />
        <main>
          <Hero />
          <Atom />
        </main>
      </HoverSyncProvider>
      <AssetCarousel />
      <ThreePatterns />
      <AirProofBand />
      <FivePersonas />
      <Waitlist />
      <Footer />
    </div>
  );
}
