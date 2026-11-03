import { MetadataRoute } from 'next'
import { client } from '@/sanity/client'
import { dutchToday } from '@/sanity/lib/eventPage'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://barakahconnect.nl'
  // Eventpagina's uit Sanity zolang het event nog moet plaatsvinden
  // Hapert Sanity, dan blijven de vaste pagina's in de sitemap staan
  const eventPages = await client
    .fetch<{ slug: string; _updatedAt: string }[]>(
      `*[_type == "eventPage" && defined(slug.current) && date >= $today]{ "slug": slug.current, _updatedAt }`,
      { today: dutchToday() },
      { perspective: 'published', next: { revalidate: 3600 } },
    )
    .catch(() => [])
  return [
    ...eventPages.map((page) => ({
      url: `${baseUrl}/${page.slug}`,
      lastModified: new Date(page._updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    })),
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/bijeenkomsten`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/e-commerce-event`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/lid-worden`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/over-ons`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/aanmelden`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ]
}
