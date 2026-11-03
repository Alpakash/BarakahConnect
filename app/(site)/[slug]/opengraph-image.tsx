import { client } from '@/sanity/client'
import { urlFor } from '@/sanity/lib/image'
import { EVENT_PAGE_QUERY, type EventPageDoc, formatEventDate } from '@/sanity/lib/eventPage'
import { eventShareImage, SHARE_IMAGE_SIZE } from '@/components/EventShareImage'

// Deelplaatje van een eventpagina uit Sanity: flyer links, titel, datum en adres rechts
export const alt = 'Eventpagina van Barakah Connect'
export const size = SHARE_IMAGE_SIZE
export const contentType = 'image/png'

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const doc = await client.fetch<EventPageDoc | null>(EVENT_PAGE_QUERY, { slug }, { perspective: 'published', next: { revalidate: 60 } })

  if (!doc) {
    return eventShareImage({ dateLabel: 'Barakah Connect', title: 'Bijeenkomsten', footer: 'barakahconnect.nl' })
  }

  const speakers = (doc.speakers || []).filter((s) => s.name).length
  return eventShareImage({
    flyerSrc: doc.flyer?.asset ? urlFor(doc.flyer).width(503).height(630).format('jpg').url() : undefined,
    dateLabel: formatEventDate(doc.date),
    title: doc.title,
    subtitle: speakers > 1 ? `${speakers} sprekers` : undefined,
    footer: [doc.address, 'barakahconnect.nl'].filter(Boolean).join(' · '),
  })
}
