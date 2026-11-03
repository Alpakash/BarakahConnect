import { stegaClean } from 'next-sanity'
import type { Audience, EventLandingProps, PanelColor } from '@/components/EventLanding'
import { urlFor } from './image'

// Een eventpagina uit Sanity (schema: sanity/schemaTypes/eventPage.ts) omzetten naar de props
// van components/EventLanding.tsx.

export const EVENT_PAGE_QUERY = `*[_type == "eventPage" && slug.current == $slug][0]{
  title, "slug": slug.current, date, times, intro, address, locationNotes, isFree, ticketsText,
  flyer{ alt, asset->{ _id, metadata{ dimensions{ width, height } } } },
  speakers[]{ name, role, topic, text, photo, panel, badge },
  program[]{ time, title, text, audience, muted, list }
}`

export type EventPageDoc = {
  title: string
  slug: string
  date: string
  times?: string[]
  intro?: string
  address?: string
  locationNotes?: string[]
  isFree?: boolean
  ticketsText?: string
  flyer?: { alt?: string; asset?: { _id: string; metadata?: { dimensions?: { width: number; height: number } } } }
  speakers?: { name?: string; role?: string; topic?: string; text?: string; photo?: { asset?: { _ref: string }; hotspot?: object; crop?: object }; panel?: string; badge?: string }[]
  program?: { time?: string; title?: string; text?: string; audience?: string; muted?: boolean; list?: string[] }[]
}

// Kalenderdatum in Nederlandse tijd (YYYY-MM-DD), zoals op /bijeenkomsten
export const dutchToday = () => new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Amsterdam' }).format(new Date())

// "2026-12-13" → "Zondag 13 december 2026". De datum is een kalenderdag zonder tijd, dus in UTC lezen.
export function formatEventDate(date: string) {
  const label = new Intl.DateTimeFormat('nl-NL', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
  }).format(new Date(`${stegaClean(date)}T00:00:00Z`))
  return label.charAt(0).toUpperCase() + label.slice(1)
}

export function flyerImage(flyer: EventPageDoc['flyer'], maxWidth = 1200) {
  const dims = flyer?.asset?.metadata?.dimensions
  if (!flyer?.asset || !dims) return undefined
  const width = Math.min(dims.width, maxWidth)
  return {
    src: urlFor(flyer).width(width).url(),
    width,
    height: Math.round((width * dims.height) / dims.width),
  }
}

export function toEventLandingProps(doc: EventPageDoc): EventLandingProps {
  const dateLabel = formatEventDate(doc.date)
  const flyer = flyerImage(doc.flyer)
  // Na de dag van het event geen ticketshop meer
  const isPast = stegaClean(doc.date) < dutchToday()
  const address = doc.address || ''

  return {
    title: doc.title,
    dateLabel,
    intro: (doc.intro || '').split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean),
    times: (doc.times || []).filter(Boolean),
    address,
    flyer: flyer && { ...flyer, alt: doc.flyer?.alt || `Flyer: ${doc.title}, ${dateLabel}` },
    speakers: (doc.speakers || [])
      .filter((s) => s.name)
      .map((s) => ({
        name: s.name!,
        role: s.role,
        topic: s.topic,
        text: s.text,
        // Uitsnede volgens de hotspot uit Sanity, dus in het midden tonen
        photo: s.photo?.asset ? urlFor(s.photo).width(600).height(800).url() : undefined,
        position: '50% 50%',
        panel: (stegaClean(s.panel) || 'wit') as PanelColor,
        badge: s.badge,
      })),
    program: (doc.program || [])
      .filter((p) => p.time && p.title)
      .map((p) => ({
        time: p.time!,
        title: p.title!,
        text: p.text,
        audience: (stegaClean(p.audience) || undefined) as Audience | undefined,
        muted: p.muted,
        list: p.list,
      })),
    locationNotes: (doc.locationNotes || []).filter(Boolean),
    tickets: { show: !doc.isFree && !isPast, text: doc.ticketsText },
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Event',
      name: stegaClean(doc.title),
      description: stegaClean(doc.intro),
      startDate: stegaClean(doc.date),
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      location: { '@type': 'Place', name: stegaClean(address), address: stegaClean(address) },
      ...(flyer && { image: [flyer.src] }),
      organizer: { '@type': 'Organization', name: 'Barakah Connect', url: 'https://barakahconnect.nl' },
      performer: (doc.speakers || []).filter((s) => s.name).map((s) => ({ '@type': 'Person', name: stegaClean(s.name) })),
      ...(!doc.isFree && {
        offers: { '@type': 'Offer', url: `https://barakahconnect.nl/${stegaClean(doc.slug)}#tickets`, availability: 'https://schema.org/InStock', validThrough: stegaClean(doc.date) },
      }),
    },
  }
}
