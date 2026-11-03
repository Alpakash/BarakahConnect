import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { stegaClean } from 'next-sanity'
import EventLanding from '@/components/EventLanding'
import { sanityFetch } from '@/sanity/lib/fetch'
import { EVENT_PAGE_QUERY, type EventPageDoc, formatEventDate, toEventLandingProps } from '@/sanity/lib/eventPage'

// Eventpagina's die de redacteur in Sanity maakt, op een eigen link: barakahconnect.nl/<link>.
// Vaste pagina's (/bijeenkomsten, /contact, …) gaan in Next.js altijd voor deze route.

export const revalidate = 60

type Props = { params: Promise<{ slug: string }> }

async function getEventPage(slug: string) {
  // Bestandsnamen (favicon.ico, …) komen hier ook langs; een eventlink heeft nooit een punt
  if (slug.includes('.')) return null
  return sanityFetch<EventPageDoc | null>({ query: EVENT_PAGE_QUERY, params: { slug } })
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const doc = await getEventPage(slug)
  if (!doc) return {}

  const title = `${stegaClean(doc.title)} | ${formatEventDate(doc.date)}`
  const intro = stegaClean(doc.intro) || ''
  const description = intro.length > 160 ? `${intro.slice(0, 157).trimEnd()}…` : intro

  return {
    title,
    description,
    alternates: { canonical: `/${slug}` },
    openGraph: { type: 'website', locale: 'nl_NL', url: `/${slug}`, siteName: 'Barakah Connect', title, description },
    twitter: { card: 'summary_large_image', title, description },
  }
}

export default async function EventPage({ params }: Props) {
  const { slug } = await params
  const doc = await getEventPage(slug)
  if (!doc) notFound()

  return <EventLanding {...toEventLandingProps(doc)} />
}
