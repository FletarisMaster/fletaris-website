import { Clock, ShieldCheck, History } from 'lucide-react';
import SectionRail from '@/components/SectionRail';

const PATTERNS = [
  {
    n: '01',
    icon: Clock,
    title: 'Life limits',
    body: 'Everything has a clock. Hours, cycles, kilometres, propellant. Something is always running out.',
  },
  {
    n: '02',
    icon: ShieldCheck,
    title: 'Compliance',
    body: "Everything answers to an authority, on a schedule it doesn't control.",
  },
  {
    n: '03',
    icon: History,
    title: 'History',
    body: 'Everything accumulates a record, and the record decides what happens next.',
  },
];

export default function ThreePatterns() {
  return (
    <section className="bg-hub-base">
      <div className="max-w-content mx-auto px-5 sm:px-7 py-[clamp(32px,5vw,72px)]">
        <SectionRail index="04" label="THE SAME PATTERN" />

        <h2
          className="font-body font-bold uppercase text-text-on-dark leading-[1.05] tracking-[-0.02em] text-[clamp(28px,3.5vw,44px)] max-w-[760px]"
          style={{ textWrap: 'balance' }}
        >
          Different assets. The same questions.
        </h2>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-px bg-hub-line border border-hub-line rounded overflow-hidden">
          {PATTERNS.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.n} className="relative bg-hub-base p-8 overflow-hidden group transition-colors hover:bg-hub-raised">
                <span
                  aria-hidden="true"
                  className="absolute -top-3 right-4 font-body font-extrabold text-hub-line text-[96px] leading-none select-none transition-colors group-hover:text-brand-teal/10"
                >
                  {p.n}
                </span>
                <div className="relative flex items-center justify-center w-12 h-12 rounded bg-brand-teal/10 border border-brand-teal/25 mb-6">
                  <Icon size={22} strokeWidth={1.5} className="text-brand-teal" />
                </div>
                <div className="relative font-mono text-[10.5px] uppercase tracking-[0.16em] text-brand-teal">
                  / Pattern {p.n}
                </div>
                <h3 className="relative mt-3 font-sans font-semibold text-text-on-dark text-lg">{p.title}</h3>
                <p className="relative mt-3 font-body text-text-on-dark-dim text-[15px] leading-[1.55]">{p.body}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-8 pt-6 border-t border-hub-line">
          <p className="font-body text-[19px] leading-[1.5]">
            <span className="text-text-on-dark-dim">Execution systems tell you what happened. </span>
            <span className="text-text-on-dark font-medium">Fletaris tells you what&apos;s coming.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
