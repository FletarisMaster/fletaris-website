import SectionRail from '@/components/SectionRail';

// Section opener for /air, in the hub's type system (D7): mono rail label, Outfit Bold
// capitals, optional lede. `accent` is the part of the title set in the accent colour:
// teal on dark sections; navy with a teal underline on light ones (teal text on white
// fails contrast).
export default function SectionHeading({
  index,
  label,
  title,
  accent,
  lede,
  tone = 'dark',
  as: Tag = 'h2',
}: {
  index: string;
  label: string;
  title: string;
  accent?: string;
  lede?: string;
  tone?: 'dark' | 'light';
  as?: 'h1' | 'h2';
}) {
  const dark = tone === 'dark';
  return (
    <div className="max-w-[860px]">
      <SectionRail index={index} label={label} tone={tone} />
      <Tag
        className={`font-body font-bold uppercase leading-[1.05] tracking-[-0.02em] text-[clamp(28px,3.5vw,44px)] ${
          dark ? 'text-text-on-dark' : 'text-brand-navy'
        }`}
        style={{ textWrap: 'balance' }}
      >
        {title}
        {accent && (
          <>
            {' '}
            <span
              className={
                dark
                  ? 'text-brand-teal'
                  : 'text-brand-navy underline decoration-brand-teal decoration-[3px] underline-offset-[6px]'
              }
            >
              {accent}
            </span>
          </>
        )}
      </Tag>
      {lede && (
        <p
          className={`mt-5 font-body text-[17px] leading-[1.6] max-w-[620px] ${
            dark ? 'text-text-on-dark-dim' : 'text-text-secondary'
          }`}
        >
          {lede}
        </p>
      )}
    </div>
  );
}
