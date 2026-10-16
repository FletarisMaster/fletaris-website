// The forward line (brand decision W11): a thin teal line from "Today" to "In 24 months" that
// draws once across the hero. The only motion in the first screen; off under reduced motion.
export default function ForwardLine({ points }: { points: Array<{ when: string; what: string }> }) {
  return (
    <div className="relative mt-16" aria-label="What Fletaris shows, from today to 24 months ahead">
      <div className="h-px bg-[#CBD5E1]" />
      <div className="forward-draw absolute left-0 right-0 -top-px h-[3px] bg-brand-teal origin-left" aria-hidden="true" />
      <ol className="mt-5 grid grid-cols-2 md:grid-cols-5 gap-x-4 gap-y-5">
        {points.map((p) => (
          <li key={p.when}>
            <div className="font-sans text-[14px] font-semibold text-brand-navy">{p.when}</div>
            <div className="mt-1 font-body text-[15px] leading-[1.45] text-text-body">{p.what}</div>
          </li>
        ))}
      </ol>
    </div>
  );
}
