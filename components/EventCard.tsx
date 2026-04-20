import Image from 'next/image'
import { urlFor } from '../sanity/lib/image'
import Link from 'next/link'

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
      }).format(new Date(event.date));

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all border border-stone-100 group flex flex-col h-full">
      <div className="h-52 w-full relative bg-stone-100 overflow-hidden">
        {event.image ? (
          <Image 
            src={urlFor(event.image).width(600).height(400).url()} 
            alt={event.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-emerald-800/5 flex items-center justify-center">
            <span className="text-5xl opacity-50">🗓</span>
          </div>
        )}
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur px-4 py-1.5 rounded text-xs font-bold tracking-wide text-emerald-800 shadow-sm uppercase">
          {isTBD ? 'Binnenkort' : 'Gepland'}
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="font-serif text-2xl font-medium text-stone-900 mb-3 group-hover:text-emerald-700 transition-colors">{event.title}</h3>
        <p className="text-stone-500 text-sm flex items-center gap-2 mb-3">
          <span className="text-emerald-700 shrink-0">🕒</span> <span className="capitalize">{dateStr}</span>
        </p>
        {event.location && (
          <p className="text-stone-500 text-sm flex items-center gap-2 mb-4">
            <span className="text-emerald-700 shrink-0">📍</span> {event.location}
          </p>
        )}
        {event.description && (
           <p className="text-stone-600 line-clamp-3 leading-relaxed mb-8 flex-grow">
             {event.description}
           </p>
        )}
        
        <Link 
          href={`/aanmelden?event=${encodeURIComponent(event.title)}`} 
          className="inline-flex items-center justify-center w-full bg-stone-50 hover:bg-emerald-700 text-emerald-700 hover:text-white font-medium py-3 rounded border border-emerald-100/50 hover:border-emerald-700 transition-all mt-auto tracking-wide content-end"
        >
          Meld je aan
        </Link>
      </div>
    </div>
  )
}
