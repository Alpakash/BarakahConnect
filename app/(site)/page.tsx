import { client } from '@/sanity/client';
import { draftMode } from 'next/headers';
import HomeSections from '@/components/HomeSections';
import Hero from '@/components/Hero';
import { HandshakeIcon, LightbulbIcon, MoonStarIcon } from '@/components/icons';

export const revalidate = 60;

export default async function Home() {
  const { isEnabled } = await draftMode()
  
  // Fetch the new sections array (Page Builder)
  const content = await client
    .withConfig({ 
      useCdn: !isEnabled, 
      perspective: isEnabled ? 'drafts' : 'published',
      stega: isEnabled
    })
    .fetch(
      `*[_type == "homePage"][0]{
        ...,
        sections[]{
          ...,
          guest->{ _id, name, role, bio, photo, video{ asset-> { url } }, socialLink }
        }
      }`,
      {},
      { stega: isEnabled }
    ) || {};

  // Pakketten heeft een eigen pagina (/lid-worden), dus niet nogmaals tonen op de homepage.
  // De uitnodigingsvideo "15 jaar aan ondernemen" is op verzoek verborgen; het blok kan ook
  // direct in Studio (Home Pagina -> Pagina Indeling) verwijderd worden.
  const sections = (content.sections || []).filter((section: any) => {
    if (section._type === 'membershipSection') return false;
    if (section._type === 'promoVideoSection' && section.guest?.name === '15 jaar aan ondernemen') return false;
    return true;
  });

  return (
    <div className="flex flex-col flex-grow">
      {sections.length > 0 ? (
        <HomeSections sections={sections} />
      ) : (
        <>
          {/* Fallback layout for when no sections are defined in Sanity yet */}
          <Hero
            title="Samen sterker,"
            subtitle="versterk de ummah."
            text="Barakah Connect brengt broeders en zusters samen. Ontmoet nieuwe mensen, deel kennis en ondersteun elkaar binnen het ondernemerschap en de samenleving."
            primaryButtonText="Ontdek Bijeenkomsten"
            primaryButtonLink="/bijeenkomsten"
          />

          <section className="py-24 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
              <h2 className="font-serif text-4xl md:text-5xl text-stone-900 mb-8 font-medium">Missie & Visie</h2>
              <div className="w-16 h-1 bg-emerald-700 mx-auto mb-12 rounded-full"></div>
              <p className="text-lg md:text-xl text-stone-600 max-w-4xl mx-auto leading-relaxed mb-24 min-h-[50px]">
                Wij organiseren om de twee weken inspirerende bijeenkomsten met ontbijt. Onze missie is eenduidig: Elkaar versterken, waardevolle netwerken opbouwen en oprechte ondersteuning bieden, zowel in je persoonlijke groei als binnen het ondernemerschap. Iedereen is welkom!
              </p>

              <div className="grid md:grid-cols-3 gap-10">
                <div className="bg-stone-50/50 p-10 rounded-2xl border border-stone-100 flex flex-col items-center text-center hover:bg-white hover:shadow-[0_8px_30px_rgba(16,185,129,0.08)] hover:-translate-y-1 transition-all duration-300">
                  <div className="mb-8 w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-700">
                    <HandshakeIcon className="w-7 h-7" />
                  </div>
                  <h3 className="font-serif text-2xl font-medium mb-4 text-stone-900">Verbinden</h3>
                  <p className="text-stone-600 leading-relaxed">Gelijkgestemden ontmoeten wordt laagdrempelig. Vorm diepgaande vriendschappen en professionele relaties in een vertrouwde omgeving.</p>
                </div>

                <div className="bg-stone-50/50 p-10 rounded-2xl border border-stone-100 flex flex-col items-center text-center hover:bg-white hover:shadow-[0_8px_30px_rgba(16,185,129,0.08)] hover:-translate-y-1 transition-all duration-300">
                  <div className="mb-8 w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-700">
                    <LightbulbIcon className="w-7 h-7" />
                  </div>
                  <h3 className="font-serif text-2xl font-medium mb-4 text-stone-900">Kennis delen</h3>
                  <p className="text-stone-600 leading-relaxed">Praktische masterclasses, pitches en open gesprekken. We ondersteunen elkaars ondernemingen actief door samen te sparren.</p>
                </div>

                <div className="bg-stone-50/50 p-10 rounded-2xl border border-stone-100 flex flex-col items-center text-center hover:bg-white hover:shadow-[0_8px_30px_rgba(16,185,129,0.08)] hover:-translate-y-1 transition-all duration-300">
                  <div className="mb-8 w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-700">
                    <MoonStarIcon className="w-7 h-7" />
                  </div>
                  <h3 className="font-serif text-2xl font-medium mb-4 text-stone-900">Voor iedereen</h3>
                  <p className="text-stone-600 leading-relaxed">Broeders en zusters komen samen in aparte, comfortabele groepen. En ook niet-moslims zijn meer dan welkom om de barakah te ervaren.</p>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  )
}
