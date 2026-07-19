import Image from 'next/image';
import Link from 'next/link';
import { client } from '@/sanity/client';
import { urlFor } from '@/sanity/lib/image';
import { draftMode } from 'next/headers';
import { HandshakeIcon, LightbulbIcon, MoonStarIcon } from '@/components/icons';

export const metadata = {
  title: 'Over Ons',
  description: 'Lees over de missie en visie van Barakah Connect. Ontdek hoe we broeders en zusters samenbrengen en ondersteunen in kennis en ondernemerschap.',
  openGraph: {
    title: 'Over Ons | Barakah Connect',
    description: 'Lees over de missie en visie van Barakah Connect. Ontdek hoe we broeders en zusters samenbrengen.',
  }
}

export const revalidate = 60;

const INTRO_IMAGE_URL =
  'https://images.unsplash.com/photo-1758691737543-09a1b2b715fa?fm=jpg&q=80&w=1600&auto=format&fit=crop';

const DEFAULTS = {
  intro: {
    heading: 'Onze Missie',
    text: 'Barakah Connect is een netwerkorganisatie die broeders en zusters samenbrengt. Onze missie is om een krachtig, ondersteunend netwerk op te bouwen waar leden elkaar versterken — zowel in het ondernemerschap als op persoonlijk vlak.',
  },
  pillar1: {
    heading: 'Wat we doen',
    text: 'We organiseren elke twee weken een bijeenkomst in de ochtend, compleet met een verzorgd ontbijt. Tijdens deze sessies is er alle ruimte om te netwerken, kennis op te doen, en ideeën uit te wisselen.',
  },
  pillar2: {
    heading: 'Voor wie?',
    text: 'Broeders en zusters nemen deel in aparte groepen, zodat iedereen zich comfortabel en gerespecteerd voelt. Onze organisatie staat open voor iedereen. Ook niet-moslims zijn van harte welkom om aan te sluiten en te bouwen aan betekenisvolle connecties.',
  },
  quote: {
    heading: 'Ons uiteindelijke doel is het versterken van de ummah. We geloven dat we samen verder komen.',
    text: 'Door elkaar te steunen in kennis en ondernemerschap creëren we sterke fundamenten voor de toekomst.',
  },
};

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

  // Deze pagina heeft een vast sjabloon (intro, 2 pijlers, quote). De eerste vier
  // Tekst Secties in Sanity vullen die sloten op volgorde; overige tekst-blokken
  // (indien toegevoegd) verschijnen als extra alinea's onderaan.
  const textBlocks = blocks.filter((b: any) => b._type === 'textSection');
  const imageBlocks = blocks.filter((b: any) => b._type === 'imageBlock');
  const [introBlock, pillar1Block, pillar2Block, quoteBlock, ...extraBlocks] = textBlocks;

  const intro = introBlock || DEFAULTS.intro;
  const pillar1 = pillar1Block || DEFAULTS.pillar1;
  const pillar2 = pillar2Block || DEFAULTS.pillar2;
  const quote = quoteBlock || { heading: DEFAULTS.quote.heading, text: DEFAULTS.quote.text };
  const introImageUrl = imageBlocks[0] ? urlFor(imageBlocks[0]).width(1600).height(1200).url() : INTRO_IMAGE_URL;

  return (
    <div className="flex flex-col flex-grow">
      {/* Intro: foto + missie */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h1 className="font-serif text-4xl md:text-5xl mb-8 text-stone-900 leading-[1.15]">{pageTitle}</h1>
              <p className="text-lg md:text-xl text-stone-600 leading-relaxed">
                {intro.text}
              </p>
            </div>
            <div className="relative h-80 md:h-[420px] rounded-3xl overflow-hidden shadow-xl">
              <Image
                src={introImageUrl}
                alt="Leden van Barakah Connect in gesprek"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pijlers */}
      <section className="py-20 md:py-24 bg-stone-50/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10">
            <div className="bg-white p-10 rounded-2xl border border-stone-100 shadow-sm">
              <div className="mb-6 w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-700">
                <LightbulbIcon className="w-6 h-6" />
              </div>
              <h2 className="font-serif text-2xl font-medium text-stone-900 mb-4">{pillar1.heading}</h2>
              <p className="text-stone-600 leading-relaxed">{pillar1.text}</p>
            </div>
            <div className="bg-white p-10 rounded-2xl border border-stone-100 shadow-sm">
              <div className="mb-6 w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-700">
                <HandshakeIcon className="w-6 h-6" />
              </div>
              <h2 className="font-serif text-2xl font-medium text-stone-900 mb-4">{pillar2.heading}</h2>
              <p className="text-stone-600 leading-relaxed">{pillar2.text}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Uitgelichte quote */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-12 h-12 mx-auto mb-8 text-emerald-700">
            <MoonStarIcon className="w-full h-full" />
          </div>
          <p className="font-serif text-2xl md:text-4xl text-stone-900 leading-snug mb-6">
            {quote.heading}
          </p>
          <p className="text-stone-500 text-lg leading-relaxed max-w-2xl mx-auto">
            {quote.text}
          </p>
        </div>
      </section>

      {/* Extra tekst-blokken (indien toegevoegd in Studio, boven op de vaste 4) */}
      {(extraBlocks.length > 0 || imageBlocks.length > 1) && (
        <section className="py-20 bg-stone-50/60">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-8 md:p-12 prose prose-stone max-w-none prose-headings:font-serif">
              {extraBlocks.map((block: any, i: number) => (
                <div key={block._key || i}>
                  <h2 className="text-emerald-900 mt-8">{block.heading}</h2>
                  <p className="text-lg leading-relaxed text-stone-600">{block.text}</p>
                </div>
              ))}
              {imageBlocks.slice(1).map((block: any, i: number) => (
                <div key={block._key || i} className="my-10 relative h-96 w-full rounded-2xl overflow-hidden shadow-sm not-prose">
                  <Image
                    src={urlFor(block).width(800).height(600).url()}
                    alt="Afbeelding Barakah Connect"
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-emerald-800 rounded-3xl p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-700/30 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-900/40 rounded-full blur-3xl -ml-32 -mb-32"></div>
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">Wees erbij tijdens onze volgende bijeenkomst</h2>
              <p className="text-emerald-100 text-lg mb-10 leading-relaxed">
                Ontmoet de community, netwerk met gelijkgestemden en ervaar het zelf.
              </p>
              <Link
                href="/bijeenkomsten"
                className="inline-block bg-white text-emerald-800 hover:bg-emerald-50 px-10 py-4 rounded-full font-bold text-lg transition-all shadow-lg hover:scale-105 active:scale-95"
              >
                Bekijk Bijeenkomsten
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
