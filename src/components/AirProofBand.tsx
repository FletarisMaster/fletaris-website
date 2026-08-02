import SectionRail from '@/components/SectionRail';
import ForwardCalendarSnapshot from '@/components/ForwardCalendarSnapshot';

export default function AirProofBand() {
  return (
    <section className="bg-surface-page">
      <div className="max-w-content mx-auto px-5 sm:px-7 py-[clamp(32px,5vw,72px)]">
        <SectionRail index="05" label="WHERE THE MODEL IS BUILT" tone="light" />

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <h2 className="font-body font-bold text-brand-navy leading-[1.05] tracking-[-0.02em] text-[clamp(28px,3.5vw,44px)]">
            Built for aviation, first.
          </h2>
          <p className="font-body text-text-secondary text-[15px] leading-[1.6] max-w-[440px]">
            Tested where the tolerance for a surprise is lowest. Whatever asset
            you manage — aircraft, drones, trucks, vessels, satellites — your
            fleet software can look like this.
          </p>
        </div>

        <ForwardCalendarSnapshot />
      </div>
    </section>
  );
}
