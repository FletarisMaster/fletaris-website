import Image from 'next/image';
import Link from 'next/link';
import { PRIVACY_POLICY_URL } from '@/lib/waitlist';

const VERTICALS = [
  { label: 'Air', href: '/air', live: true },
  { label: 'Drone', href: '/drone', live: false },
  { label: 'Land', href: '/land', live: false },
  { label: 'Sea', href: '/sea', live: false },
  { label: 'Space', href: '/space', live: false },
] as const;

export default function Footer() {
  return (
    <footer className="bg-brand-navy">
      <div className="max-w-content mx-auto px-5 sm:px-7 py-6">
        <div className="flex flex-wrap items-center justify-between gap-8 pb-8 border-b border-white/15">
          <Image
            src="/images/logo-horizontal-darkbg.png"
            alt="Fletaris"
            width={140}
            height={24}
            className="h-6 w-auto"
            style={{ width: 'auto', height: '1.5rem' }}
          />
          <p className="font-body text-[13px] text-white/60">
            Intelligence layer for <b className="font-sans font-semibold text-brand-teal">regulated asset management</b>
          </p>
          <div className="flex items-center gap-2 font-mono text-[11px] text-white/45 tracking-[0.04em]">
            <span className="w-1.5 h-1.5 rounded-full bg-status-green shadow-[0_0_6px_#22C55E]" />
            SYSTEMS NOMINAL · LAST SYNC 14:32 UTC
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6 py-6 border-b border-white/15">
          {VERTICALS.map((v) =>
            v.live ? (
              <Link
                key={v.label}
                href={v.href}
                className="font-sans text-[12px] font-semibold uppercase tracking-[0.1em] text-brand-teal"
              >
                {v.label}
              </Link>
            ) : (
              <span
                key={v.label}
                className="font-sans text-[12px] font-medium uppercase tracking-[0.1em] text-white/35 cursor-default"
              >
                {v.label}
              </span>
            )
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-6 pt-6">
          <div className="flex flex-col gap-1">
            <p className="font-body text-xs text-white/55">© 2026 Uchuva Tech. All rights reserved.</p>
            <p className="font-body text-[11px] text-white/32">Fletaris™ is a trademark of Uchuva Tech.</p>
          </div>
          <div className="flex items-center gap-4">
            <a href={PRIVACY_POLICY_URL} className="font-sans text-xs font-semibold text-brand-teal">
              Privacy
            </a>
            <div className="w-px h-3.5 bg-white/15" />
            <a href="mailto:operations@fletaris.com" className="font-sans text-xs font-semibold text-brand-teal">
              operations@fletaris.com
            </a>
            <div className="w-px h-3.5 bg-white/15" />
            <div className="flex items-center gap-1.5">
              <span className="font-body text-[11px] text-white/45">Powered by</span>
              <Image src="/images/uchuva-sm.png" alt="Uchuva" width={14} height={14} className="h-3.5 w-auto" />
              <span className="font-sans text-[11px] font-semibold text-white/70">Uchuva</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
