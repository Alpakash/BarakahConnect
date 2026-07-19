import EventCard from "@/components/EventCard";
import PromoVideoBlock from "@/components/PromoVideoBlock";
import { CalendarIcon } from "@/components/icons";
import { client } from "@/sanity/client";

export const metadata = {
  title: 'Bijeenkomsten',
  description: 'Sluit je aan bij onze tweewekelijkse bijeenkomsten en ontbijtsessies. Breid je netwerk uit, deel kennis en versterk elkaar.',
  openGraph: {
    title: 'Bijeenkomsten | Barakah Connect',
    description: 'Sluit je aan bij onze tweewekelijkse bijeenkomsten en ontbijtsessies. Breid je netwerk uit en deel kennis met gelijkgestemden.',
  }
}

export default async function Bijeenkomsten() {
  const events = await client.fetch(
    `*[_type == "event"] | order(date asc)`,
    {},
    { next: { revalidate: 60 } }
  );

  const allGuests = await client.fetch(
    `*[_type == "speaker"] | order(_createdAt asc){ _id, name, role, bio, photo, video{ asset-> { url } }, socialLink }`,
    {},
    { next: { revalidate: 60 } }
  );

  // Alleen gasten met een geuploade video tonen; dit blok bestaat om de video te promoten.
  const guests = (allGuests || []).filter((g: any) => g.video?.asset?.url);

  const nextEvent = events?.[0];
  const nextEventDateStr = nextEvent?.date
    ? new Intl.DateTimeFormat('nl-NL', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date(nextEvent.date))
    : null;

  return (
    <div className="py-24 bg-stone-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-4xl md:text-5xl mb-6 text-stone-900 text-center">Onze Bijeenkomsten</h1>
        <p className="text-center text-stone-500 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
          Sluit je aan bij onze tweewekelijkse ontbijtsessies. Kom om te netwerken, kennis te delen, of gewoon voor een goed gesprek en lekker eten.
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

        {guests && guests.length > 0 && (
          <div className="mt-24">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="font-serif text-2xl md:text-3xl text-stone-900 font-medium mb-4">Ondernemers nodigen ondernemers uit</h2>
              <p className="text-stone-500 text-lg leading-relaxed">
                {nextEventDateStr
                  ? `Schuif zelf aan op ${nextEventDateStr}.`
                  : 'Schuif zelf aan bij onze volgende bijeenkomst.'}
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-10 max-w-3xl mx-auto">
              {guests.map((guest: any) => (
                <PromoVideoBlock
                  key={guest._id}
                  guest={guest}
                  text={guest.bio}
                  buttonText="Meld je aan"
                  buttonLink="/aanmelden"
                />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
