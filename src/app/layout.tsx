import type { Metadata } from 'next';
import './globals.css';

// next/font/google requires a build-time fetch to fonts.googleapis.com, which is
// blocked by TLS interception in this environment. Loaded via <link> instead —
// matches how the original static site loaded these same three families.
export const metadata: Metadata = {
  title: 'Fletaris — Fleet intelligence software for regulated asset managers',
  description:
    "Fletaris is fleet intelligence software and a forward-projection solution for regulated asset managers — covering aircraft, drones, trucks, vessels, and satellites. If you're responsible for assets that carry life limits, answer to a regulator, and underwrite commitments you've already signed, Fletaris projects what your technical data means for what's coming.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
