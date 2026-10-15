import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

// Built into out/robots.txt. Cloudflare's managed robots.txt (content signals) is prepended
// to this file at the edge, so only the crawl rules and the sitemap live here.
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
