import type { Metadata } from 'next';

// Public origin of the site, used for canonical URLs, Open Graph and the sitemap.
export const SITE_URL = 'https://fletaris.com';

/**
 * Title, description, canonical URL and Open Graph card for one page. Next replaces (not
 * merges) a parent's openGraph object, so every page passes the full set through here.
 */
export function pageMetadata(p: { path: string; title: string; description: string; ogImage: string; ogAlt: string }): Metadata {
  return {
    title: p.title,
    description: p.description,
    alternates: { canonical: p.path },
    openGraph: {
      type: 'website',
      siteName: 'Fletaris',
      locale: 'en_US',
      url: p.path,
      title: p.title,
      description: p.description,
      images: [{ url: p.ogImage, width: 1200, height: 630, alt: p.ogAlt }],
    },
  };
}
