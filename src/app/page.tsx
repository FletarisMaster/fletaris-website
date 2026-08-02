import TopNav from '@/components/TopNav';
import CaseFileStamp from '@/components/CaseFileStamp';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Atom from '@/components/Atom';
import AssetCarousel from '@/components/AssetCarousel';
import ThreePatterns from '@/components/ThreePatterns';
import AirProofBand from '@/components/AirProofBand';
import FivePersonas from '@/components/FivePersonas';
import Waitlist from '@/components/Waitlist';
import { HoverSyncProvider } from '@/components/HoverSyncContext';

export default function HubPage() {
  return (
    <div className="hub-page">
      <HoverSyncProvider>
        <CaseFileStamp />
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
