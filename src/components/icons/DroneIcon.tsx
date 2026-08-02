// Custom top-view quadcopter glyph, matched to Lucide's outline weight/rounding —
// Lucide has no clean drone icon (per build decision, a custom SVG beats the
// closest substitute).
export default function DroneIcon({ size = 28, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="10" y="10" width="4" height="4" rx="0.5" />
      <path d="M10 10.5L5 5.5M14 10.5L19 5.5M10 13.5L5 18.5M14 13.5L19 18.5" />
      <circle cx="4.5" cy="4.5" r="2.3" />
      <circle cx="19.5" cy="4.5" r="2.3" />
      <circle cx="4.5" cy="19.5" r="2.3" />
      <circle cx="19.5" cy="19.5" r="2.3" />
    </svg>
  );
}
