export default function SectionRail({
  index,
  label,
  tone = 'dark',
}: {
  index: string;
  label: string;
  tone?: 'dark' | 'light';
}) {
  return (
    <div
      className={`font-mono text-[10.5px] uppercase tracking-[0.2em] mb-4 ${
        tone === 'dark' ? 'text-brand-teal' : 'text-brand-navy'
      }`}
    >
      / {index} — {label}
    </div>
  );
}
