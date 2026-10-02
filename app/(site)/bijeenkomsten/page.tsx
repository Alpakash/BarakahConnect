import EventCard from "@/components/EventCard";
import { CalendarIcon } from "@/components/icons";
import { sanityFetch } from "@/sanity/lib/fetch";

export const metadata = {
  title: 'Bijeenkomsten',
  description: 'Sluit je aan bij onze tweewekelijkse bijeenkomsten en ontbijtsessies. Breid je netwerk uit, deel kennis en versterk elkaar.',
  openGraph: {
    title: 'Bijeenkomsten | Barakah Connect',
    description: 'Sluit je aan bij onze tweewekelijkse bijeenkomsten en ontbijtsessies. Breid je netwerk uit en deel kennis met gelijkgestemden.',
  }
}

// Calendar date in Dutch time (YYYY-MM-DD), so an event stays listed until the end of the day it takes place
const dutchDate = (date: string | Date) =>
  new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Amsterdam' }).format(new Date(date));

export default async function Bijeenkomsten() {
  const allEvents = await sanityFetch({ query: `*[_type == "event"] | order(date asc)` });

  // Hide events whose day has passed; events without a date ("Nader te bepalen") stay visible
  const today = dutchDate(new Date());
  const events = allEvents.filter((evt: { date?: string }) => !evt.date || dutchDate(evt.date) >= today);

  const pageContent = await sanityFetch({ query: `*[_type == "eventsPage"][0]{ title, intro }` });
  const pageTitle = pageContent?.title || 'Onze Bijeenkomsten';
  const pageIntro = pageContent?.intro || 'Sluit je aan bij onze tweewekelijkse ontbijtsessies. Kom om te netwerken, kennis te delen, of gewoon voor een goed gesprek en lekker eten.';

  return (
    <div className="py-24 bg-stone-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-4xl md:text-5xl mb-6 text-stone-900 text-center">{pageTitle}</h1>
        <p className="text-center text-stone-500 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
          {pageIntro}
        </p>
        <div className="w-24 h-1 bg-emerald-700 mx-auto mb-16 opacity-50"></div>

        {events && events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {events.map((evt: any) => (
              <EventCard key={evt._id} event={evt} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-stone-100 p-16 text-center max-w-2xl mx-auto">
            <CalendarIcon className="w-16 h-16 mx-auto mb-6 text-emerald-800/30" />
            <h3 className="font-serif text-2xl text-stone-800 mb-4">Agenda wordt nog bijgewerkt</h3>
            <p className="text-stone-500 text-lg leading-relaxed">
              De datums en details van de volgende bijeenkomsten worden momenteel afgestemd.
              Zodra deze gereed zijn, verschijnen ze hier op de pagina.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
