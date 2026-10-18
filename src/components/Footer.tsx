import Image from 'next/image';
import Link from 'next/link';
import SoonLabel from '@/components/SoonLabel';
import { PRIVACY_POLICY_URL } from '@/lib/waitlist';

const VERTICALS = [
  { label: 'Air', href: '/air', live: true, soon: '' },
  { label: 'Drone', href: '/drone', live: false, soon: 'Next up' },
  { label: 'Land', href: '/land', live: false, soon: 'Coming soon' },
  { label: 'Sea', href: '/sea', live: false, soon: 'Coming soon' },
  { label: 'Space', href: '/space', live: false, soon: 'Coming soon' },
] as const;

export default function Footer() {
  return (
    <footer className="tw bg-brand-navy">
      <div className="max-w-content mx-auto px-5 sm:px-10 py-8">
        <div className="flex flex-wrap items-center justify-between gap-8 pb-8 border-b border-white/15">
          <Image
            src="/images/logo-horizontal-darkbg.webp"
            alt="Fletaris"
            width={140}
            height={24}
            className="h-6 w-auto"
            style={{ width: 'auto', height: '1.5rem' }}
          />
          <p className="font-body text-[13px] text-white/60">
            Intelligence layer for <b className="font-sans font-semibold text-brand-teal">regulated asset management</b>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 py-6 border-b border-white/15">
          {VERTICALS.map((v) =>
            v.live ? (
              <Link
                key={v.label}
                href={v.href}
                className="font-sans text-[14px] font-semibold text-brand-teal"
              >
                {v.label}
              </Link>
            ) : (
              <SoonLabel
                key={v.label}
                label={v.label}
                soon={v.soon}
                placement="above"
                className="font-sans text-[14px] font-medium text-white/50"
              />
            )
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-6 pt-6">
          <div className="flex flex-col gap-1">
            <p className="font-body text-xs text-white/55">© 2026 Uchuva Tech. All rights reserved.</p>
            <p className="font-body text-[11px] text-white/60">Fletaris™ is a trademark of Uchuva Tech.</p>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
            <a href={PRIVACY_POLICY_URL} className="font-sans text-xs font-semibold text-brand-teal">
              Legal
            </a>
            <div className="w-px h-3.5 bg-white/15" />
            <Link href="/air/trust" className="font-sans text-xs font-semibold text-brand-teal">
              Security
            </Link>
            <div className="w-px h-3.5 bg-white/15" />
            <a href="mailto:operations@fletaris.com" className="font-sans text-xs font-semibold text-brand-teal">
              operations@fletaris.com
            </a>
            <div className="w-px h-3.5 bg-white/15" />
            <div className="flex items-center gap-1.5">
              <span className="font-body text-[11px] text-white/60">Powered by</span>
              <Image src="/images/uchuva-tech-mark.png" alt="" width={16} height={16} className="h-4 w-4" />
              <span className="font-sans text-[11px] font-semibold text-white/70">Uchuva Tech</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
