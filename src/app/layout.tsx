import type { Metadata } from 'next';
import './globals.css';
import { SITE_URL } from '@/lib/site';

// Site-wide defaults. Each page sets its own title, description, canonical URL and Open Graph
// card (src/lib/site.ts → pageMetadata), so no page inherits another page's canonical.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  twitter: { card: 'summary_large_image' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Fonts are self-hosted (public/fonts, @font-face in globals.css): no request to Google.
            Preload the two faces the first screen of each page renders with. */}
        <link rel="preload" href="/fonts/outfit-latin-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/poppins-latin-700.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
