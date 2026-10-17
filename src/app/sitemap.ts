import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

// Static export: built once into out/sitemap.xml. Add a line here for every new public page.
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE_URL}/air`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/air/trust`, changeFrequency: 'monthly', priority: 0.5 },
  ];
}
