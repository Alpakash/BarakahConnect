import Image from 'next/image'
import { urlFor } from '../sanity/lib/image'
import Link from 'next/link'
import { stegaClean } from 'next-sanity'
import WeeztixModal from './WeeztixModal'
import { CalendarIcon, ClockIcon, MapPinIcon } from './icons'

export default function EventCard({ event }: { event: any }) {
  const isTBD = !event.date;
  const dateStr = isTBD 
    ? 'Datum: Nader te bepalen' 
    : new Intl.DateTimeFormat('nl-NL', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        // The server runs in UTC; always show Dutch time
        timeZone: 'Europe/Amsterdam',
      }).format(new Date(event.date));

  // In Draft Mode the title carries invisible Visual Editing (stega) characters; keep them out of the sign-up link
  const title = stegaClean(event.title);
  const isFree = event.isFree === true || /\bgratis\b/i.test(title);
  // Eventpagina van deze bijeenkomst: een gekoppelde eventpagina uit Sanity gaat voor een losse link
  const pageHref: string | null = event.eventPageSlug
    ? `/${stegaClean(event.eventPageSlug)}`
    : stegaClean(event.pageLink) || null;

  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-stone-100 shadow-[0_2px_10px_-3px_rgba(22,40,28,0.08)] hover:shadow-[0_20px_50px_-25px_rgba(22,40,28,0.35)] transition-shadow group flex flex-col h-full">
      <CardLink href={pageHref} label={`${title}: bekijk de eventpagina`} className="block aspect-[4/5] w-full relative bg-emerald-50 overflow-hidden">
        {event.image ? (
          <Image 
            src={urlFor(event.image).width(800).url()} 
            alt={event.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-contain"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-emerald-700/40">
            <CalendarIcon className="w-14 h-14" />
          </div>
        )}
      </CardLink>

      <div className="p-7 flex flex-col flex-grow">
        {/* Label boven de titel, niet over de flyer heen */}
        <span className="self-start bg-emerald-700 px-3 py-1 rounded-full text-xs font-semibold tracking-wide text-lime uppercase mb-4">
          {isTBD ? 'Binnenkort' : 'Gepland'}
        </span>
        <h3 className="font-serif text-2xl font-medium text-stone-900 mb-4 leading-snug">
          {pageHref ? (
            <Link href={pageHref} className="hover:text-emerald-700 transition-colors">{event.title}</Link>
          ) : (
            event.title
          )}
        </h3>
        <p className="text-stone-500 text-sm flex items-center gap-2 mb-2">
          <ClockIcon className="w-4 h-4 text-emerald-700 shrink-0" /> <span className="capitalize">{dateStr}</span>
        </p>
        {event.location && (
          <p className="text-stone-500 text-sm flex items-center gap-2 mb-4">
            <MapPinIcon className="w-4 h-4 text-emerald-700 shrink-0" /> {event.location}
          </p>
        )}
        {event.description && (
           <p className="text-stone-600 line-clamp-3 leading-relaxed mb-8 flex-grow">
             {event.description}
           </p>
        )}
        
        {pageHref && (
          <Link
            href={pageHref}
            className="inline-flex items-center justify-center w-full bg-lime hover:bg-emerald-200 text-emerald-900 font-semibold py-3 rounded-full transition-colors mb-3"
          >
            Bekijk het programma
          </Link>
        )}
        <Link 
          href={`/aanmelden?event=${encodeURIComponent(title)}${isFree ? '&gratis=1' : ''}`} 
          className="inline-flex items-center justify-center w-full border-2 border-emerald-700 text-emerald-700 hover:bg-emerald-700 hover:text-white font-semibold py-3 rounded-full transition-colors mt-auto"
        >
          Meld je aan
        </Link>
        {!isFree && <WeeztixModal compact />}
      </div>
    </div>
  )
}

// Foto van de kaart: klikbaar als de bijeenkomst een eventpagina heeft
function CardLink({ href, label, className, children }: { href: string | null; label: string; className: string; children: React.ReactNode }) {
  if (!href) return <div className={className}>{children}</div>
  return (
    <Link href={href} aria-label={label} className={className}>
      {children}
    </Link>
  )
}
