import Image from 'next/image';
import { client } from '@/sanity/client';
import { urlFor } from '@/sanity/lib/image';
import { draftMode } from 'next/headers';

export const metadata = {
  title: 'Over Ons | Barakah Connect',
}

export const revalidate = 60;

export default async function OverOns() {
  const { isEnabled } = await draftMode()
  const content = await client
    .withConfig({ 
      useCdn: !isEnabled, 
      perspective: isEnabled ? 'drafts' : 'published',
      stega: isEnabled
    })
    .fetch(`*[_type == "aboutPage"][0]`, {}, { stega: isEnabled }) || {};
  const pageTitle = content.title || "Over Barakah Connect";
  const blocks = content.blocks || [];

  return (
    <div className="py-24 bg-stone-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-4xl md:text-5xl mb-8 text-stone-900 text-center">{pageTitle}</h1>
        <div className="w-24 h-1 bg-emerald-700 mx-auto mb-16 opacity-50"></div>

        <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-8 md:p-12 prose prose-stone max-w-none prose-headings:font-serif">
          {blocks.length > 0 ? (
            blocks.map((block: any, i: number) => {
              if (block._type === 'textSection') {
                return (
                  <div key={block._key || i}>
                    <h2 className="text-emerald-900 mt-8">{block.heading}</h2>
                    <p className="text-lg leading-relaxed text-stone-600">{block.text}</p>
                  </div>
                )
              }
              if (block._type === 'imageBlock') {
                return (
                  <div key={block._key || i} className="my-10 relative h-96 w-full rounded-2xl overflow-hidden shadow-sm not-prose">
                    <Image 
                      src={urlFor(block).width(800).height(600).url()} 
                      alt="Afbeelding Barakah Connect" 
                      fill 
                      className="object-cover" 
                    />
                  </div>
                )
              }
              return null;
            })
          ) : (
            <>
              <h2 className="text-emerald-900">Onze Missie</h2>
              <p className="text-lg leading-relaxed text-stone-600">
                Barakah Connect is een netwerkorganisatie die broeders en zusters samenbrengt.
                Onze missie is om een krachtig, ondersteunend netwerk op te bouwen waar leden elkaar
                kunnen versterken, zowel proactief in het ondernemerschap als op persoonlijk vlak.
              </p>

              <h2 className="text-emerald-900 mt-8">Wat we doen</h2>
              <p className="text-lg leading-relaxed text-stone-600">
                We organiseren elke twee weken een bijeenkomst in de ochtend, compleet met een verzorgd ontbijt.
                Tijdens deze sessies is er alle ruimte om te netwerken, kennis op te doen, en ideeën uit te wisselen.
              </p>

              <h2 className="text-emerald-900 mt-8">Voor wie?</h2>
              <p className="text-lg leading-relaxed text-stone-600">
                Broeders en zusters nemen deel in aparte groepen, zodat iedereen zich comfortabel en gerespecteerd voelt.
                Onze organisatie staat open voor iedereen. Ook niet-moslims zijn van harte welkom om aan te sluiten en te bouwen aan betekenisvolle connecties.
              </p>

              <div className="mt-10 bg-emerald-50/50 border-l-4 border-emerald-700 p-6 rounded-r-lg">
                <h3 className="mt-0 text-emerald-900 mb-2">Versterk de Ummah</h3>
                <p className="mb-0 text-emerald-800 leading-relaxed font-medium">
                  Ons uiteindelijke doel is het versterken van de ummah. We geloven dat we samen verder komen.
                  Door elkaar te steunen in kennis en ondernemerschap creëren we sterke fundamenten voor de toekomst.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
