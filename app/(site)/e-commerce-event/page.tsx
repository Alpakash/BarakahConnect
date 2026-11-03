import type { Metadata } from 'next'
import EventLanding, { type EventLandingProps } from '@/components/EventLanding'

// Landingspagina voor het e-commerce event van zondag 13 december 2026, om te delen via
// LinkedIn, Instagram en WhatsApp. De inhoud staat bewust hier (niet in Sanity): het is een
// eenmalige pagina en moest snel live. Nieuwe events maakt de redacteur als "Eventpagina" in Sanity.

const TITLE = 'Ondernemen op een halal manier'
const DESCRIPTION =
  'Zondag 13 december in Amsterdam: vier sprekers over e-commerce, bol.com, Meta Ads en ondernemen met tawakkul. Bekijk het programma en koop je tickets.'
const ADDRESS = 'Rhoneweg 12, 1043 AH Amsterdam'

export const metadata: Metadata = {
  title: `${TITLE} | E-commerce event 13 december`,
  description: DESCRIPTION,
  alternates: { canonical: '/e-commerce-event' },
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    url: '/e-commerce-event',
    siteName: 'Barakah Connect',
    title: `${TITLE} | zondag 13 december`,
    description: DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${TITLE} | zondag 13 december`,
    description: DESCRIPTION,
  },
}

const SPEAKERS: EventLandingProps['speakers'] = [
  {
    name: 'Ustadh Mohamed Akkouh',
    role: 'Islamitische Finance & E-commerce',
    topic: 'E-commerce en dropshipping: wat is halal en wat is haram?',
    text: 'Ustadh Mohamed Akkouh opent het gezamenlijke programma. Hij bespreekt e-commerce en dropshipping vanuit de islamitische regels rond handel en financiën. Na zijn lezing is er ruimte voor jullie vragen.',
    // Uitgesneden uit de flyer: dezelfde foto met kantoorachtergrond
    photo: '/events/e-commerce-event/mohamed-akkouh.jpg',
    position: '50% 70%',
    panel: 'wit',
  },
  {
    name: 'Soufiane',
    role: 'Verkopen via bol.com',
    topic: 'Succesvol verkopen via bol.com',
    text: 'Soufiane deelt hoe je als ondernemer succesvol verkoopt via bol.com.',
    photo: '/events/e-commerce-event/soufiane.jpg',
    position: '50% 30%',
    panel: 'oranje',
  },
  {
    name: 'Walid',
    role: 'Meta Ads Expert',
    topic: 'Online zichtbaar worden',
    text: 'Walid deelt zijn kennis over Meta Ads en hoe je als ondernemer online beter zichtbaar wordt.',
    photo: '/events/e-commerce-event/walid.jpg',
    position: '50% 30%',
    panel: 'blauw',
  },
  {
    name: 'Nassira Tihani',
    role: 'Businesscoach',
    topic: 'Ondernemen met tawakkul',
    text: 'Nassira Tihani weet hoe uitdagend die balans kan zijn. Van 17-jarige schoolverlater tot succesvolle businesscoach ontdekte ze dat groei niet alleen vraagt om strategie, actie en doorzettingsvermogen, maar ook om het loslaten van de behoefte aan controle.',
    photo: '/events/e-commerce-event/nassira-tihani.jpg',
    position: '85% 100%',
    panel: 'wit',
    badge: 'Alleen voor de dames',
  },
]

const PROGRAM: EventLandingProps['program'] = [
  {
    time: '13:30 – 14:00',
    title: 'Inloop zusters',
    text: 'De zusters kunnen binnenkomen en plaatsnemen in de zaal.',
    audience: 'Zusters',
    muted: true,
  },
  {
    time: '14:00 – 15:00',
    title: 'Nassira Tihani',
    text: 'Nassira deelt haar verhaal en kennis over ondernemen met tawakkul.',
    audience: 'Zusters',
  },
  {
    time: '15:00 – 15:30',
    title: 'Inloop broeders',
    text: 'Vanaf 15:00 uur kunnen ook de broeders binnenkomen en plaatsnemen in de zaal.',
    audience: 'Broeders',
    muted: true,
  },
  {
    time: '15:30 – ±16:15',
    title: 'Opening door Ustadh Mohamed Akkouh',
    text: 'De eerste spreker van het gezamenlijke programma: ongeveer 30 minuten spreektijd, gevolgd door circa 15 minuten voor vragen.',
    audience: 'Iedereen',
  },
  {
    time: '±16:15 – 16:45',
    title: 'Soufiane',
    text: 'Soufiane spreekt over succesvol verkopen via bol.com.',
    audience: 'Iedereen',
  },
  {
    time: '16:45 – 17:15',
    title: 'Pauze',
    text: 'Een pauze met gelegenheid om te eten, voor de broeders en zusters.',
    audience: 'Iedereen',
    muted: true,
  },
  {
    time: '17:15 – 17:45/18:00',
    title: 'Walid',
    text: 'Walid deelt zijn kennis over Meta Ads en hoe ondernemers online beter zichtbaar kunnen worden.',
    audience: 'Iedereen',
  },
  {
    time: 'Na Walid',
    title: 'Toelichting Barakah Connect',
    text: 'Na de laatste spreker nemen wij zelf 10 à 15 minuten om kort te vertellen over de nieuwe plannen en ontwikkelingen van Barakah Connect. Naar verwachting zijn we rond 18:00 uur klaar.',
    audience: 'Iedereen',
    muted: true,
  },
  {
    time: '18:00 – 19:00',
    title: 'Netwerkmoment',
    text: 'De broeders en zusters krijgen afzonderlijk van elkaar de gelegenheid om:',
    audience: 'Iedereen',
    list: [
      'Nieuwe ondernemers te leren kennen',
      'Te netwerken en ervaringen uit te wisselen',
      'Samenwerkingen te bespreken',
      'Contactgegevens uit te wisselen',
    ],
  },
]

// Gestructureerde gegevens zodat Google het event herkent
const EVENT_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: `${TITLE}: e-commerce event`,
  description: DESCRIPTION,
  startDate: '2026-12-13T13:30:00+01:00',
  endDate: '2026-12-13T19:00:00+01:00',
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  location: {
    '@type': 'Place',
    name: ADDRESS,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Rhoneweg 12',
      postalCode: '1043 AH',
      addressLocality: 'Amsterdam',
      addressCountry: 'NL',
    },
  },
  image: ['https://barakahconnect.nl/events/e-commerce-event/flyer.webp'],
  organizer: { '@type': 'Organization', name: 'Barakah Connect', url: 'https://barakahconnect.nl' },
  performer: SPEAKERS.map((s) => ({ '@type': 'Person', name: s.name })),
  offers: { '@type': 'Offer', url: 'https://barakahconnect.nl/e-commerce-event#tickets', availability: 'https://schema.org/InStock', validThrough: '2026-12-13T19:00:00+01:00' },
}

export default function ECommerceEvent() {
  return (
    <EventLanding
      title="Ondernemen op een halal manier."
      dateLabel="Zondag 13 december 2026"
      intro={[
        'Een middag vol kennis en ontmoeting voor moslimondernemers. Vier sprekers delen wat werkt: van e-commerce en dropshipping binnen de islamitische regels, tot verkopen via bol.com, online zichtbaar worden met Meta Ads en ondernemen met tawakkul.',
        'Je gaat naar huis met praktische kennis, nieuwe contacten en inspiratie om je onderneming op een halal manier te laten groeien.',
      ]}
      times={['Dames: inloop 13:30 · Nassira start 14:00', 'Heren: inloop 15:00 · gezamenlijk programma vanaf 15:30']}
      address={ADDRESS}
      flyer={{
        src: '/events/e-commerce-event/flyer.webp',
        width: 1121,
        height: 1403,
        alt: 'Flyer: Ondernemen op een halal manier, 13 december. Sprekers Soufiane, Walid, Ustadh Mohamed Akkouh en Nassira Tihani. Locatie Rhoneweg 12, 1043 AH Amsterdam.',
      }}
      speakers={SPEAKERS}
      program={PROGRAM}
      locationNotes={[
        'Op loopafstand van station Amsterdam Sloterdijk',
        'Parkeren bij P+R Station Sloterdijk: €6 per 24 uur, ongeveer 8 minuten lopen',
        'Bij de zaal zijn ook betaalde parkeerplaatsen beschikbaar',
      ]}
      tickets={{
        show: true,
        text: 'Bestel hieronder je ticket voor zondag 13 december. Zusters: inloop 13:30. Broeders: inloop 15:00.',
      }}
      jsonLd={EVENT_JSON_LD}
    />
  )
}
