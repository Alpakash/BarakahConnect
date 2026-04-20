import { client } from '@/sanity/client';
import { draftMode } from 'next/headers';
import HomeSections from '@/components/HomeSections';

export const metadata = {
  title: 'Pakketten | Barakah Connect',
  description: 'Ontdek onze lidmaatschappen en word onderdeel van de Barakah Connect community.',
}

export default async function LidWorden() {
  const { isEnabled } = await draftMode()

  // Fetch content specifically for the membership page or fallback to homepage memberships
  // For now, we allow the user to manage it via a block on a 'singleton' or similar.
  // To keep it simple and consistent with our builder, we'll look for a membershipSection.
  const content = await client
    .withConfig({
      useCdn: !isEnabled,
      perspective: isEnabled ? 'drafts' : 'published',
      stega: isEnabled
    })
    .fetch(`*[_type == "homePage"][0]`, {}, { stega: isEnabled }) || {};

  const sections = content.sections?.filter((s: any) => s._type === 'membershipSection') || [];

  return (
    <div className="flex flex-col flex-grow">
      {/* Hero-achtig begin voor de pagina */}
      <section className="bg-stone-50 py-20 border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-5xl md:text-6xl text-stone-900 mb-6">Pakketten</h1>
          <p className="text-stone-500 text-xl max-w-2xl mx-auto font-light">
            Klaar om te groeien? Kies het pakket dat bij jouw doelen past.
          </p>
        </div>
      </section>

      {sections.length > 0 ? (
        <HomeSections sections={sections} hideItemHeaders={true} />
      ) : (
        <div className="py-40 text-center">
          <p className="text-stone-400">Geen pakketten geconfigureerd in Sanity.</p>
        </div>
      )}

      {/* Extra info sectie */}
      <section className="py-20 bg-stone-50/50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl text-stone-900 mb-8">Waarom Barakah Connect?</h2>
          <div className="grid md:grid-cols-2 gap-12 text-left">
            <div>
              <h3 className="font-serif text-xl mb-3 text-emerald-800">Netwerk & Groei</h3>
              <p className="text-stone-600 leading-relaxed">
                Toegang tot een besloten groep ondernemers die elkaar écht willen helpen groeien, zowel zakelijk als spiritueel.
              </p>
            </div>
            <div>
              <h3 className="font-serif text-xl mb-3 text-emerald-800">Halal Ondernemen</h3>
              <p className="text-stone-600 leading-relaxed">
                Focus op ethisch en islamitisch verantwoord zakendoen in een vertrouwde omgeving.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
