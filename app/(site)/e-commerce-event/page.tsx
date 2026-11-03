import type { Metadata } from 'next'
import Image from 'next/image'
import { Fraunces } from 'next/font/google'
import WeeztixShop from '@/components/WeeztixShop'
import { CalendarIcon, ClockIcon, MapPinIcon } from '@/components/icons'

// Landingspagina voor het e-commerce event van zondag 13 december 2026, om te delen via
// LinkedIn, Instagram en WhatsApp. De inhoud staat bewust hier (niet in Sanity): het is een
// eenmalige pagina en moest snel live.

const fraunces = Fraunces({ variable: '--font-fraunces', subsets: ['latin'] })

const TITLE = 'Ondernemen op een halal manier'
const DESCRIPTION =
  'Zondag 13 december in Amsterdam: vier sprekers over e-commerce, bol.com, Meta Ads en ondernemen met tawakkul. Bekijk het programma en koop je tickets.'
const ADDRESS = 'Rhoneweg 12, 1043 AH Amsterdam'
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`

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

const SPEAKERS = [
  {
    name: 'Ustadh Mohamed Akkouh',
    role: 'Islamitische Finance & E-commerce',
    topic: 'E-commerce en dropshipping: wat is halal en wat is haram?',
    text: 'Ustadh Mohamed Akkouh opent het gezamenlijke programma. Hij bespreekt e-commerce en dropshipping vanuit de islamitische regels rond handel en financiën. Na zijn lezing is er ruimte voor jullie vragen.',
    // Uitgesneden uit de flyer: dezelfde foto met kantoorachtergrond
    photo: '/events/e-commerce-event/mohamed-akkouh.jpg',
    position: '50% 70%',
    panel: 'bg-white',
  },
  {
    name: 'Soufiane',
    role: 'Verkopen via bol.com',
    topic: 'Succesvol verkopen via bol.com',
    text: 'Soufiane deelt hoe je als ondernemer succesvol verkoopt via bol.com.',
    photo: '/events/e-commerce-event/soufiane.jpg',
    position: '50% 30%',
    panel: 'bg-[#f5a774]',
  },
  {
    name: 'Walid',
    role: 'Meta Ads Expert',
    topic: 'Online zichtbaar worden',
    text: 'Walid deelt zijn kennis over Meta Ads en hoe je als ondernemer online beter zichtbaar wordt.',
    photo: '/events/e-commerce-event/walid.jpg',
    position: '50% 30%',
    panel: 'bg-[#cddfe8]',
  },
  {
    name: 'Nassira Tihani',
    role: 'Businesscoach',
    topic: 'Ondernemen met tawakkul',
    text: 'Nassira Tihani weet hoe uitdagend die balans kan zijn. Van 17-jarige schoolverlater tot succesvolle businesscoach ontdekte ze dat groei niet alleen vraagt om strategie, actie en doorzettingsvermogen, maar ook om het loslaten van de behoefte aan controle.',
    photo: '/events/e-commerce-event/nassira-tihani.jpg',
    position: '85% 100%',
    panel: 'bg-white',
    badge: 'Alleen voor de dames',
  },
]

type Audience = 'Zusters' | 'Broeders' | 'Iedereen'

const PROGRAM: { time: string; title: string; text: string; audience: Audience; muted?: boolean; list?: string[] }[] = [
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

const AUDIENCE_STYLE: Record<Audience, string> = {
  Zusters: 'bg-[#ddd1f5] text-[#3d2a6b]',
  Broeders: 'bg-[#cddfe8] text-[#1f3d4d]',
  Iedereen: 'bg-[#dce98f] text-[#1d4a2e]',
}

const LOCATION_NOTES = [
  'Op loopafstand van station Amsterdam Sloterdijk',
  'Parkeren bij P+R Station Sloterdijk: €6 per 24 uur, ongeveer 8 minuten lopen',
  'Bij de zaal zijn ook betaalde parkeerplaatsen beschikbaar',
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
    <div className={`${fraunces.variable} bg-[#f7f2e8] text-[#16281c]`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(EVENT_JSON_LD) }} />

      {/* 1. Flyer en introductie */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 md:pt-16 md:pb-24">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 items-center">
          <div>
            <p className="inline-flex items-center gap-2 bg-[#1d4a2e] text-[#dce98f] px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <CalendarIcon className="w-4 h-4" /> Zondag 13 december 2026
            </p>
            <h1 className="font-[family-name:var(--font-fraunces)] text-5xl md:text-6xl xl:text-7xl font-semibold leading-[1.02] tracking-tight mb-6">
              Ondernemen op een halal manier.
            </h1>
            <p className="text-lg md:text-xl text-[#16281c]/80 leading-relaxed mb-4 max-w-xl">
              Een middag vol kennis en ontmoeting voor moslimondernemers. Vier sprekers delen wat werkt:
              van e-commerce en dropshipping binnen de islamitische regels, tot verkopen via bol.com,
              online zichtbaar worden met Meta Ads en ondernemen met tawakkul.
            </p>
            <p className="text-lg text-[#16281c]/80 leading-relaxed mb-8 max-w-xl">
              Je gaat naar huis met praktische kennis, nieuwe contacten en inspiratie om je onderneming
              op een halal manier te laten groeien.
            </p>

            <ul className="space-y-3 mb-10 text-[#16281c]">
              <li className="flex items-start gap-3">
                <CalendarIcon className="w-5 h-5 mt-0.5 text-[#2f6b45] shrink-0" />
                <span><strong>Zondag 13 december 2026</strong></span>
              </li>
              <li className="flex items-start gap-3">
                <ClockIcon className="w-5 h-5 mt-0.5 text-[#2f6b45] shrink-0" />
                <span>
                  <strong>Dames</strong> inloop 13:30 · Nassira start 14:00
                  <br />
                  <strong>Heren</strong> inloop 15:00 · gezamenlijk programma vanaf 15:30
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MapPinIcon className="w-5 h-5 mt-0.5 text-[#2f6b45] shrink-0" />
                <span>{ADDRESS}</span>
              </li>
            </ul>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#tickets"
                className="inline-flex items-center justify-center bg-[#1d4a2e] hover:bg-[#163a24] text-white px-8 py-4 rounded-full font-semibold text-lg transition-colors"
              >
                Koop tickets
              </a>
              <a
                href="#programma"
                className="inline-flex items-center justify-center border-2 border-[#1d4a2e] text-[#1d4a2e] hover:bg-[#1d4a2e] hover:text-white px-8 py-4 rounded-full font-semibold text-lg transition-colors"
              >
                Bekijk het programma
              </a>
            </div>
          </div>

          {/* De flyer in zijn geheel: vaste verhouding, niets bijgesneden. Op mobiel bovenaan */}
          <a
            href="/events/e-commerce-event/flyer.webp"
            target="_blank"
            rel="noopener"
            className="order-first lg:order-none block w-full max-w-[560px] mx-auto lg:mx-0 lg:justify-self-end"
            aria-label="Open de flyer op volledige grootte"
          >
            <Image
              src="/events/e-commerce-event/flyer.webp"
              alt="Flyer: Ondernemen op een halal manier, 13 december. Sprekers Soufiane, Walid, Ustadh Mohamed Akkouh en Nassira Tihani. Locatie Rhoneweg 12, 1043 AH Amsterdam."
              width={1121}
              height={1403}
              priority
              sizes="(min-width: 1024px) 560px, 100vw"
              className="w-full h-auto rounded-3xl shadow-[0_20px_60px_-20px_rgba(22,40,28,0.35)]"
            />
          </a>
        </div>
      </section>

      {/* 2. Sprekers */}
      <section id="sprekers" className="scroll-mt-28 bg-[#dce98f]/40 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-fraunces)] text-4xl md:text-5xl font-semibold mb-4">De sprekers</h2>
          <p className="text-lg text-[#16281c]/75 mb-12 max-w-2xl">Vier ondernemers en kenners, elk met een eigen onderwerp.</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SPEAKERS.map((s) => (
              <article key={s.name} className="bg-white rounded-3xl overflow-hidden flex flex-col shadow-sm">
                <div className="relative aspect-[3/4] bg-[#e9e4d8]">
                  <Image
                    src={s.photo}
                    alt={s.name}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                    style={{ objectPosition: s.position }}
                  />
                  {s.badge && (
                    <span className="absolute top-4 left-4 bg-[#ddd1f5] text-[#3d2a6b] text-sm font-semibold px-3 py-1.5 rounded-full">
                      {s.badge}
                    </span>
                  )}
                </div>
                <div className={`${s.panel} p-6 flex-grow border-t border-black/5`}>
                  <h3 className="font-[family-name:var(--font-fraunces)] text-2xl font-semibold leading-tight mb-1">{s.name}</h3>
                  <p className="text-sm font-semibold text-[#16281c]/70 mb-3">{s.role}</p>
                  <p className="font-semibold mb-2">{s.topic}</p>
                  <p className="text-[#16281c]/80 leading-relaxed text-[15px]">{s.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Programma */}
      <section id="programma" className="scroll-mt-28 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-fraunces)] text-4xl md:text-5xl font-semibold mb-4">Het programma</h2>
          <p className="text-lg text-[#16281c]/75 mb-10">
            Zondag 13 december. De zusters beginnen om 14:00 met Nassira Tihani; vanaf 15:30 is het programma gezamenlijk.
          </p>

          <ol className="relative border-l-2 border-[#1d4a2e]/15 ml-2 space-y-6">
            {PROGRAM.map((item) => (
              <li key={item.title} className="pl-8 relative">
                <span
                  className={`absolute -left-[9px] top-6 w-4 h-4 rounded-full border-2 border-[#f7f2e8] ${item.muted ? 'bg-[#9bb3a2]' : 'bg-[#1d4a2e]'}`}
                />
                <div className={`rounded-2xl p-5 md:p-6 ${item.muted ? 'bg-white/60' : 'bg-white shadow-sm'}`}>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-2">
                    <span className="font-[family-name:var(--font-fraunces)] text-xl font-semibold text-[#1d4a2e] tabular-nums">{item.time}</span>
                    <span className={`text-xs font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full ${AUDIENCE_STYLE[item.audience]}`}>
                      {item.audience}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                  <p className="text-[#16281c]/80 leading-relaxed">{item.text}</p>
                  {item.list && (
                    <ul className="mt-3 space-y-1.5">
                      {item.list.map((point) => (
                        <li key={point} className="flex gap-2.5 text-[#16281c]/80">
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#2f6b45] shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 4. Locatie en praktische informatie */}
      <section id="locatie" className="scroll-mt-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
        <div className="bg-[#1d4a2e] text-white rounded-3xl p-8 md:p-14 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-[#dce98f] text-sm font-semibold uppercase tracking-widest mb-3">Locatie</p>
            <h2 className="font-[family-name:var(--font-fraunces)] text-4xl md:text-5xl font-semibold leading-tight mb-6">
              Rhoneweg 12, 1043 AH Amsterdam
            </h2>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#dce98f] text-[#1d4a2e] hover:bg-white px-6 py-3 rounded-full font-semibold transition-colors"
            >
              <MapPinIcon className="w-5 h-5" /> Route in Google Maps
            </a>
          </div>
          <ul className="space-y-4 text-lg text-white/90">
            {LOCATION_NOTES.map((note) => (
              <li key={note} className="flex gap-3">
                <span className="mt-2.5 w-2 h-2 rounded-full bg-[#dce98f] shrink-0" />
                {note}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. Tickets */}
      <section id="tickets" className="scroll-mt-28 bg-white py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-[family-name:var(--font-fraunces)] text-4xl md:text-5xl font-semibold mb-4">Tickets</h2>
          <p className="text-lg text-[#16281c]/75 mb-10">
            Bestel hieronder je ticket voor zondag 13 december. Zusters: inloop 13:30. Broeders: inloop 15:00.
          </p>
          <WeeztixShop />
        </div>
      </section>
    </div>
  )
}
