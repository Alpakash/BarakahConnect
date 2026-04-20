import Link from 'next/link';
import { client } from '@/sanity/client';
import { draftMode } from 'next/headers';
import HomeSections from '@/components/HomeSections';

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
    .fetch(`*[_type == "homePage"][0]`, {}, { stega: isEnabled }) || {};

  const sections = content.sections || [];

  return (
    <div className="flex flex-col flex-grow">
      {sections.length > 0 ? (
        <HomeSections sections={sections} />
      ) : (
        <>
          {/* Fallback layout for when no sections are defined in Sanity yet */}
          <section className="relative w-full py-28 md:py-40 overflow-hidden bg-stone-50 border-b border-stone-200">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-50 via-stone-50 to-stone-100 z-0 opacity-70"></div>
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-100/50 rounded-full blur-[100px] -mr-48 -mt-48 z-0 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="text-left">
                  <h1 className="font-serif text-5xl md:text-7xl font-medium tracking-tight mb-8 text-stone-900 leading-[1.1]">
                    Samen sterker,<br />
                    <span className="text-emerald-800">versterk de ummah.</span>
                  </h1>
                  <p className="text-lg md:text-xl text-stone-600 max-w-lg mb-12 leading-relaxed font-light">
                    Barakah Connect brengt broeders en zusters samen. Ontmoet nieuwe mensen, deel kennis en ondersteun elkaar binnen het ondernemerschap en de samenleving.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-5">
                    <Link href="/bijeenkomsten" className="bg-emerald-700 hover:bg-emerald-800 px-8 py-4 rounded font-medium text-white shadow-lg transition-all text-center flex items-center justify-center gap-2 hover:-translate-y-0.5">
                      Ontdek Bijeenkomsten
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </Link>
                    <Link href="/over-ons" className="bg-white hover:bg-stone-50 border border-stone-200 px-8 py-4 rounded font-medium text-stone-700 shadow-sm transition-all text-center hover:-translate-y-0.5">
                      Lees ons verhaal
                    </Link>
                  </div>
                </div>

                <div className="hidden lg:grid grid-cols-2 gap-6 relative">
                  <div className="absolute -inset-4 bg-emerald-100 opacity-50 blur-3xl rounded-full z-0"></div>
                  <div className="space-y-6 pt-12 relative z-10">
                    <div className="bg-white/80 backdrop-blur-xl border border-stone-100 rounded-2xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgba(16,185,129,0.1)] transition-all">
                      <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-700 mb-6 font-serif text-2xl">01</div>
                      <h3 className="text-xl font-medium text-stone-900 mb-2 font-serif">Kennisdeling</h3>
                      <p className="text-stone-500 text-sm leading-relaxed">Verrijk jezelf met waardevolle inzichten uit ons netwerk van ondernemers.</p>
                    </div>
                  </div>
                  <div className="space-y-6 relative z-10">
                    <div className="bg-white/80 backdrop-blur-xl border border-stone-100 rounded-2xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgba(16,185,129,0.1)] transition-all">
                      <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-700 mb-6 font-serif text-2xl">02</div>
                      <h3 className="text-xl font-medium text-stone-900 mb-2 font-serif">Netwerk</h3>
                      <p className="text-stone-500 text-sm leading-relaxed">Bouw betekenisvolle connecties op tijdens onze actieve bijeenkomsten.</p>
                    </div>
                    <div className="bg-emerald-800 border border-emerald-700 rounded-2xl p-8 shadow-xl relative overflow-hidden">
                      <div className="absolute right-0 top-0 w-32 h-32 bg-emerald-600/30 rounded-full blur-2xl -mr-10 -mt-10"></div>
                      <h3 className="text-xl font-medium text-white mb-2 font-serif relative z-10">Ontbijtsessies</h3>
                      <p className="text-emerald-100/90 text-sm leading-relaxed relative z-10">Ervaar de warme sfeer van onze tweewekelijkse zondagochtend ontbijten.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="py-24 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
              <h2 className="font-serif text-4xl md:text-5xl text-stone-900 mb-8 font-medium">Missie & Visie</h2>
              <div className="w-16 h-1 bg-emerald-700 mx-auto mb-12 rounded-full"></div>
              <p className="text-lg md:text-xl text-stone-600 max-w-4xl mx-auto leading-relaxed mb-24 min-h-[50px]">
                Wij organiseren om de twee weken inspirerende bijeenkomsten met ontbijt. Onze missie is eenduidig: Elkaar versterken, waardevolle netwerken opbouwen en oprechte ondersteuning bieden—zowel in je persoonlijke groei als binnen het ondernemerschap. Iedereen is welkom!
              </p>

              <div className="grid md:grid-cols-3 gap-10">
                <div className="bg-stone-50/50 p-10 rounded-2xl border border-stone-100 flex flex-col items-center text-center hover:bg-white hover:shadow-[0_8px_30px_rgba(16,185,129,0.08)] hover:-translate-y-1 transition-all duration-300">
                  <div className="text-4xl mb-8 w-20 h-20 bg-white shadow-sm rounded-2xl flex items-center justify-center border border-stone-100">🤝</div>
                  <h3 className="font-serif text-2xl font-medium mb-4 text-stone-900">Verbinden</h3>
                  <p className="text-stone-600 leading-relaxed">Gelijkgestemden ontmoeten wordt laagdrempelig. Vorm diepgaande vriendschappen en professionele relaties in een vertrouwde omgeving.</p>
                </div>

                <div className="bg-stone-50/50 p-10 rounded-2xl border border-stone-100 flex flex-col items-center text-center hover:bg-white hover:shadow-[0_8px_30px_rgba(16,185,129,0.08)] hover:-translate-y-1 transition-all duration-300">
                  <div className="text-4xl mb-8 w-20 h-20 bg-white shadow-sm rounded-2xl flex items-center justify-center border border-stone-100">💡</div>
                  <h3 className="font-serif text-2xl font-medium mb-4 text-stone-900">Kennis delen</h3>
                  <p className="text-stone-600 leading-relaxed">Praktische masterclasses, pitches en open gesprekken. We ondersteunen elkaars ondernemingen actief door samen te sparren.</p>
                </div>

                <div className="bg-stone-50/50 p-10 rounded-2xl border border-stone-100 flex flex-col items-center text-center hover:bg-white hover:shadow-[0_8px_30px_rgba(16,185,129,0.08)] hover:-translate-y-1 transition-all duration-300">
                  <div className="text-4xl mb-8 w-20 h-20 bg-white shadow-sm rounded-2xl flex items-center justify-center border border-stone-100">🌙</div>
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
