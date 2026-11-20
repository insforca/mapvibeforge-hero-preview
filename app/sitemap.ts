import type { MetadataRoute } from 'next'
import { SITE_URL, entriesForStyle, published, taxonomy } from '@/lib/content'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/styles`, changeFrequency: 'weekly', priority: 0.9 },
    // Only style pages that already have gallery entries (the rest are noindex).
    ...taxonomy.styles
      .filter((s) => entriesForStyle(s.slug).length > 0)
      .map((s) => ({ url: `${SITE_URL}/styles/${s.slug}`, changeFrequency: 'weekly' as const, priority: 0.8 })),
    ...published.map((e) => ({
      url: `${SITE_URL}/prints/${e.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
      images: e.image ? [`${SITE_URL}${e.image.src}`] : undefined,
    })),
  ]
}
