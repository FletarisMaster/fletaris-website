import { useId } from 'react';

// A vertical that has no page yet, with its status ("Next up", "Coming soon") as a tooltip on
// hover and keyboard focus. CSS-only so it also works in the server-rendered footer; touch
// screens have no hover, so the mobile menu shows the status inline instead.
export default function SoonLabel({
  label,
  soon,
  className,
  placement = 'below',
}: {
  label: string;
  soon: string;
  className: string;
  placement?: 'below' | 'above';
}) {
  const id = useId();
  return (
    <span
      tabIndex={0}
      aria-disabled="true"
      aria-describedby={id}
      className={`group relative cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal rounded-[2px] ${className}`}
    >
      {label}
      <span
        id={id}
        role="tooltip"
        className={`pointer-events-none absolute left-1/2 -translate-x-1/2 ${
          placement === 'below' ? 'top-full mt-2' : 'bottom-full mb-2'
        } whitespace-nowrap rounded-[3px] bg-white px-2.5 py-1 font-sans text-[12px] font-semibold text-brand-navy shadow-md opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100 z-10`}
      >
        {soon}
      </span>
    </span>
  );
}
