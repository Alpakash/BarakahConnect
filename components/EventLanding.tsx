import Image from 'next/image'
import { Fraunces } from 'next/font/google'
import WeeztixShop from '@/components/WeeztixShop'
import { CalendarIcon, ClockIcon, MapPinIcon } from '@/components/icons'

// Opmaak van een eventpagina (flyer, intro, sprekers, programma, locatie, tickets) in de stijl
// van de flyer. Gebruikt door /e-commerce-event (inhoud in code) en door de eventpagina's die de
// redacteur in Sanity maakt (app/(site)/[slug]).

const fraunces = Fraunces({ variable: '--font-fraunces', subsets: ['latin'] })

export type Audience = 'Zusters' | 'Broeders' | 'Iedereen'
export type PanelColor = 'wit' | 'oranje' | 'blauw' | 'lila' | 'lichtgroen'

export type EventLandingProps = {
  title: string
  dateLabel: string
  intro: string[]
  times: string[]
  address: string
  flyer?: { src: string; width: number; height: number; alt: string }
  speakers: {
    name: string
    role?: string
    topic?: string
    text?: string
    photo?: string
    position?: string
    panel?: PanelColor
    badge?: string
  }[]
  program: { time: string; title: string; text?: string; audience?: Audience; muted?: boolean; list?: string[] }[]
  locationNotes: string[]
  tickets: { show: boolean; text?: string }
  jsonLd?: object
}

const PANEL_STYLE: Record<PanelColor, string> = {
  wit: 'bg-white',
  oranje: 'bg-[#f5a774]',
  blauw: 'bg-[#cddfe8]',
  lila: 'bg-[#ddd1f5]',
  lichtgroen: 'bg-[#dce98f]',
}

const AUDIENCE_STYLE: Record<Audience, string> = {
  Zusters: 'bg-[#ddd1f5] text-[#3d2a6b]',
  Broeders: 'bg-[#cddfe8] text-[#1f3d4d]',
  Iedereen: 'bg-[#dce98f] text-[#1d4a2e]',
}

const HEADING = 'font-[family-name:var(--font-fraunces)] font-semibold'

export default function EventLanding({
  title,
  dateLabel,
  intro,
  times,
  address,
  flyer,
  speakers,
  program,
  locationNotes,
  tickets,
  jsonLd,
}: EventLandingProps) {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`

  return (
    <div className={`${fraunces.variable} bg-[#f7f2e8] text-[#16281c]`}>
      {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}

      {/* 1. Flyer en introductie */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 md:pt-16 md:pb-24">
        <div className={`grid gap-10 lg:gap-16 items-center ${flyer ? 'lg:grid-cols-[1.1fr_1fr]' : 'max-w-3xl'}`}>
          <div>
            <p className="inline-flex items-center gap-2 bg-[#1d4a2e] text-[#dce98f] px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <CalendarIcon className="w-4 h-4" /> {dateLabel}
            </p>
            <h1 className={`${HEADING} text-5xl md:text-6xl xl:text-7xl leading-[1.02] tracking-tight mb-6`}>{title}</h1>
            {intro.map((paragraph, i) => (
              <p key={i} className={`text-[#16281c]/80 leading-relaxed mb-4 max-w-xl ${i === 0 ? 'text-lg md:text-xl' : 'text-lg'}`}>
                {paragraph}
              </p>
            ))}

            <ul className="space-y-3 mt-8 mb-10">
              <li className="flex items-start gap-3">
                <CalendarIcon className="w-5 h-5 mt-0.5 text-[#2f6b45] shrink-0" />
                <strong>{dateLabel}</strong>
              </li>
              {times.length > 0 && (
                <li className="flex items-start gap-3">
                  <ClockIcon className="w-5 h-5 mt-0.5 text-[#2f6b45] shrink-0" />
                  <span>
                    {times.map((line, i) => (
                      <span key={i} className="block">{line}</span>
                    ))}
                  </span>
                </li>
              )}
              <li className="flex items-start gap-3">
                <MapPinIcon className="w-5 h-5 mt-0.5 text-[#2f6b45] shrink-0" />
                <span>{address}</span>
              </li>
            </ul>

            <div className="flex flex-col sm:flex-row gap-4">
              {tickets.show && (
                <a
                  href="#tickets"
                  className="inline-flex items-center justify-center bg-[#1d4a2e] hover:bg-[#163a24] text-white px-8 py-4 rounded-full font-semibold text-lg transition-colors"
                >
                  Koop tickets
                </a>
              )}
              {program.length > 0 && (
                <a
                  href="#programma"
                  className="inline-flex items-center justify-center border-2 border-[#1d4a2e] text-[#1d4a2e] hover:bg-[#1d4a2e] hover:text-white px-8 py-4 rounded-full font-semibold text-lg transition-colors"
                >
                  Bekijk het programma
                </a>
              )}
            </div>
          </div>

          {/* De flyer in zijn geheel: vaste verhouding, niets bijgesneden. Op mobiel bovenaan */}
          {flyer && (
            <a
              href={flyer.src}
              target="_blank"
              rel="noopener"
              className="order-first lg:order-none block w-full max-w-[560px] mx-auto lg:mx-0 lg:justify-self-end"
              aria-label="Open de flyer op volledige grootte"
            >
              <Image
                src={flyer.src}
                alt={flyer.alt}
                width={flyer.width}
                height={flyer.height}
                priority
                sizes="(min-width: 1024px) 560px, 100vw"
                className="w-full h-auto rounded-3xl shadow-[0_20px_60px_-20px_rgba(22,40,28,0.35)]"
              />
            </a>
          )}
        </div>
      </section>

      {/* 2. Sprekers */}
      {speakers.length > 0 && (
        <section id="sprekers" className="scroll-mt-28 bg-[#dce98f]/40 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className={`${HEADING} text-4xl md:text-5xl mb-12`}>
              {speakers.length === 1 ? 'De spreker' : 'De sprekers'}
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {speakers.map((s) => (
                <article key={s.name} className="bg-white rounded-3xl overflow-hidden flex flex-col shadow-sm">
                  <div className="relative aspect-[3/4] bg-[#e9e4d8]">
                    {s.photo && (
                      <Image
                        src={s.photo}
                        alt={s.name}
                        fill
                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover"
                        style={{ objectPosition: s.position || '50% 30%' }}
                      />
                    )}
                    {s.badge && (
                      <span className="absolute top-4 left-4 bg-[#ddd1f5] text-[#3d2a6b] text-sm font-semibold px-3 py-1.5 rounded-full">
                        {s.badge}
                      </span>
                    )}
                  </div>
                  <div className={`${PANEL_STYLE[s.panel || 'wit']} p-6 flex-grow border-t border-black/5`}>
                    <h3 className={`${HEADING} text-2xl leading-tight mb-1`}>{s.name}</h3>
                    {s.role && <p className="text-sm font-semibold text-[#16281c]/70 mb-3">{s.role}</p>}
                    {s.topic && <p className="font-semibold mb-2">{s.topic}</p>}
                    {s.text && <p className="text-[#16281c]/80 leading-relaxed text-[15px]">{s.text}</p>}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3. Programma */}
      {program.length > 0 && (
        <section id="programma" className="scroll-mt-28 py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className={`${HEADING} text-4xl md:text-5xl mb-10`}>Het programma</h2>

            <ol className="relative border-l-2 border-[#1d4a2e]/15 ml-2 space-y-6">
              {program.map((item, i) => (
                <li key={i} className="pl-8 relative">
                  <span
                    className={`absolute -left-[9px] top-6 w-4 h-4 rounded-full border-2 border-[#f7f2e8] ${item.muted ? 'bg-[#9bb3a2]' : 'bg-[#1d4a2e]'}`}
                  />
                  <div className={`rounded-2xl p-5 md:p-6 ${item.muted ? 'bg-white/60' : 'bg-white shadow-sm'}`}>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-2">
                      <span className={`${HEADING} text-xl text-[#1d4a2e] tabular-nums`}>{item.time}</span>
                      {item.audience && (
                        <span className={`text-xs font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full ${AUDIENCE_STYLE[item.audience]}`}>
                          {item.audience}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                    {item.text && <p className="text-[#16281c]/80 leading-relaxed">{item.text}</p>}
                    {item.list && item.list.length > 0 && (
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
      )}

      {/* 4. Locatie en praktische informatie */}
      <section id="locatie" className="scroll-mt-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
        <div className="bg-[#1d4a2e] text-white rounded-3xl p-8 md:p-14 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-[#dce98f] text-sm font-semibold uppercase tracking-widest mb-3">Locatie</p>
            <h2 className={`${HEADING} text-4xl md:text-5xl leading-tight mb-6`}>{address}</h2>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#dce98f] text-[#1d4a2e] hover:bg-white px-6 py-3 rounded-full font-semibold transition-colors"
            >
              <MapPinIcon className="w-5 h-5" /> Route in Google Maps
            </a>
          </div>
          {locationNotes.length > 0 && (
            <ul className="space-y-4 text-lg text-white/90">
              {locationNotes.map((note) => (
                <li key={note} className="flex gap-3">
                  <span className="mt-2.5 w-2 h-2 rounded-full bg-[#dce98f] shrink-0" />
                  {note}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* 5. Tickets */}
      {tickets.show && (
        <section id="tickets" className="scroll-mt-28 bg-white py-16 md:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className={`${HEADING} text-4xl md:text-5xl mb-4`}>Tickets</h2>
            {tickets.text && <p className="text-lg text-[#16281c]/75 mb-10">{tickets.text}</p>}
            <WeeztixShop />
          </div>
        </section>
      )}
    </div>
  )
}
