import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import Hero from './Hero';
import PromoVideoBlock from './PromoVideoBlock';
import { ResolvedIcon } from './icons';
import { PortableText } from '@portabletext/react';

const ptComponents = {
  block: {
    normal: ({children}: any) => <p className="mb-6">{children}</p>,
    h2: ({children}: any) => <h2 className="text-3xl md:text-4xl font-serif text-stone-900 mb-6 mt-12">{children}</h2>,
    h3: ({children}: any) => <h3 className="text-2xl font-serif text-stone-900 mb-4 mt-8">{children}</h3>,
    blockquote: ({children}: any) => <blockquote className="border-l-4 border-emerald-700 pl-6 italic my-8 text-stone-700 text-xl">{children}</blockquote>,
  },
  marks: {
    strong: ({children}: any) => <strong className="font-semibold text-stone-900">{children}</strong>,
    link: ({value, children}: any) => <a href={value?.href} className="text-emerald-700 underline underline-offset-2 hover:text-emerald-900 transition-colors">{children}</a>,
  },
  list: {
    bullet: ({children}: any) => <ul className="list-disc pl-6 mb-6 space-y-2 marker:text-emerald-700">{children}</ul>,
    number: ({children}: any) => <ol className="list-decimal pl-6 mb-6 space-y-2 marker:text-stone-500 font-medium">{children}</ol>,
  }
};

export default function HomeSections({ sections, hideItemHeaders }: { sections: any[], hideItemHeaders?: boolean }) {
  if (!sections || sections.length === 0) return null;

  // Groepeer opeenvolgende promoVideoSection-blokken tot één rij i.p.v. los
  // gestapelde secties met veel dode ruimte ertussen. Een textSection die daar
  // direct op volgt (bijv. Missie & Visie) wordt ernaast gezet i.p.v. eronder.
  const groupedSections: any[] = [];
  sections.forEach((section: any) => {
    const previous = groupedSections[groupedSections.length - 1];
    if (section._type === 'promoVideoSection' && previous?._type === 'promoVideoGroup') {
      previous.items.push(section);
    } else if (section._type === 'promoVideoSection') {
      groupedSections.push({ _type: 'promoVideoGroup', _key: section._key, items: [section] });
    } else if (section._type === 'textSection' && previous?._type === 'promoVideoGroup') {
      previous._type = 'promoVideoWithText';
      previous.textSection = section;
    } else {
      groupedSections.push(section);
    }
  });

  return (
    <>
      {groupedSections.map((section: any, index: number) => {
        switch (section._type) {
          case 'hero':
            return (
              <Hero
                key={section._key || index}
                title={section.title}
                subtitle={section.subtitle}
                text={section.text}
                image={section.image}
                primaryButtonText={section.primaryButtonText}
                primaryButtonLink={section.primaryButtonLink}
              />
            );

          case 'textSection':
            return (
              <section key={section._key || index} className="py-24 bg-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                  <h2 className="font-serif text-4xl md:text-5xl text-stone-900 mb-8 font-medium">{section.title}</h2>
                  <div className="w-16 h-1 bg-emerald-700 mx-auto mb-12 rounded-full"></div>
                  <p className="text-lg md:text-xl text-stone-600 max-w-4xl mx-auto leading-relaxed mb-12 min-h-[50px]">
                    {section.text}
                  </p>
                </div>
              </section>
            );

          case 'richTextSection':
            return (
              <section key={section._key || index} className="py-16 md:py-24 bg-white relative overflow-hidden">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                  <div className="text-lg md:text-xl text-stone-600 leading-relaxed font-light">
                    <PortableText value={section.content} components={ptComponents} />
                  </div>
                </div>
              </section>
            );

          case 'featuresSection':
            return (
              <section key={section._key || index} className="py-24 bg-stone-50/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  {section.title && (
                    <h2 className="font-serif text-3xl text-center text-stone-900 mb-16">{section.title}</h2>
                  )}
                  <div className="grid md:grid-cols-3 gap-10">
                    {section.items?.map((item: any, i: number) => (
                      <div key={item._key || i} className="bg-white p-10 rounded-2xl border border-stone-100 flex flex-col items-center text-center hover:shadow-[0_8px_30px_rgba(16,185,129,0.08)] hover:-translate-y-1 transition-all duration-300">
                        <div className="mb-8 w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-700">
                          <ResolvedIcon emoji={item.emoji} className="w-7 h-7" />
                        </div>
                        <h3 className="font-serif text-2xl font-medium mb-4 text-stone-900">{item.title}</h3>
                        <p className="text-stone-600 leading-relaxed">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );

          case 'ctaSection':
            return (
              <section key={section._key || index} className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="bg-emerald-800 rounded-3xl p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-700/30 rounded-full blur-3xl -mr-32 -mt-32"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-900/40 rounded-full blur-3xl -ml-32 -mb-32"></div>
                    
                    <div className="relative z-10 max-w-2xl mx-auto">
                      <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">{section.title}</h2>
                      <p className="text-emerald-100 text-lg mb-10 leading-relaxed">
                        {section.text}
                      </p>
                      <Link 
                        href={section.buttonLink || '/bijeenkomsten'} 
                        className="inline-block bg-white text-emerald-800 hover:bg-emerald-50 px-10 py-4 rounded-full font-bold text-lg transition-all shadow-lg hover:scale-105 active:scale-95"
                      >
                        {section.buttonText}
                      </Link>
                    </div>
                  </div>
                </div>
              </section>
            );

          case 'imageBlock':
            return (
              <section key={section._key || index} className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="relative h-[600px] w-full rounded-3xl overflow-hidden shadow-xl">
                    <Image
                      src={urlFor(section).width(1600).height(900).url()}
                      alt={section.caption || 'Barakah Connect Afbeelding'}
                      fill
                      className="object-cover"
                    />
                    {section.caption && (
                       <div className="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-md p-6 text-white text-center">
                         <p className="text-lg font-light tracking-wide">{section.caption}</p>
                       </div>
                    )}
                  </div>
                </div>
              </section>
            );

          case 'promoVideoGroup':
          case 'promoVideoWithText': {
            const textSection = section.textSection;

            const videos = (
              <div className="flex flex-wrap justify-center gap-14">
                {section.items.map((item: any, i: number) => (
                  <PromoVideoBlock
                    key={item._key || i}
                    guest={item.guest}
                    title={item.title}
                    text={item.text}
                  />
                ))}
              </div>
            );

            const cta = (
              <div className="mt-16 flex flex-col items-center text-center">
                <Link
                  href="/bijeenkomsten"
                  className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 px-8 py-4 rounded-full font-semibold text-white shadow-md transition-all hover:-translate-y-0.5"
                >
                  Meld je aan voor de bijeenkomst
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
                <p className="mt-4 text-stone-500 text-sm">
                  Met Kosso, Mo Max Pro, Umair Bantvawala en Enriqueo Beerthuizen
                </p>
              </div>
            );

            return (
              <section key={section._key || index} className="py-20 bg-white relative overflow-hidden">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="font-serif text-3xl md:text-4xl text-stone-900 font-medium">Maak kennis met Barakah Connect</h2>
                  </div>
                  {textSection ? (
                    <>
                      <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>{videos}</div>
                        <div>
                          <h3 className="font-serif text-2xl md:text-3xl text-stone-900 mb-4 font-medium">{textSection.title}</h3>
                          <div className="w-16 h-1 bg-emerald-700 mb-6 rounded-full"></div>
                          <p className="text-lg text-stone-600 leading-relaxed">
                            {textSection.text}
                          </p>
                        </div>
                      </div>
                      {cta}
                    </>
                  ) : (
                    <>
                      {videos}
                      {cta}
                    </>
                  )}
                </div>
              </section>
            );
          }

          case 'membershipSection':
            return (
              <section key={section._key || index} className="py-32 bg-white relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                  {!hideItemHeaders && (
                    <div className="text-center max-w-2xl mx-auto mb-24">
                      <h2 className="font-serif text-4xl md:text-5xl text-stone-900 mb-8 font-medium">{section.title}</h2>
                      <p className="text-stone-500 text-lg leading-relaxed font-light">{section.description}</p>
                    </div>
                  )}

                  <div className="grid lg:grid-cols-3 gap-10 items-stretch">
                    {section.plans?.map((plan: any, i: number) => (
                      <div 
                        key={plan._key || i} 
                        className={`group relative flex flex-col p-10 rounded-[2rem] transition-all duration-700 border ${
                          plan.isPopular 
                            ? 'bg-emerald-900 text-white border-emerald-800 shadow-2xl scale-105 z-20' 
                            : 'bg-white text-stone-900 border-stone-100 hover:border-emerald-100 hover:shadow-[0_20px_50px_rgba(0,0,0,0.04)] '
                        }`}
                      >
                        {plan.isPopular && (
                          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 text-stone-900 px-6 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-[0_4px_20px_rgba(212,175,55,0.3)]">
                            Meest gekozen
                          </div>
                        )}

                        <div className="mb-10 text-center">
                          <h3 className={`font-serif text-2xl font-medium mb-6 ${plan.isPopular ? 'text-white' : 'text-stone-900'}`}>
                            {plan.name}
                          </h3>
                          <div className="flex flex-col items-center justify-center">
                             <span className={`text-5xl font-bold tracking-tight mb-1 ${plan.isPopular ? 'text-white' : 'text-stone-900'}`}>{plan.price}</span>
                             {plan.priceSubtext && (
                               <span className={`text-sm tracking-wide font-medium uppercase opacity-60 ${plan.isPopular ? 'text-amber-200' : 'text-stone-500'}`}>
                                 {plan.priceSubtext}
                               </span>
                             )}
                          </div>
                        </div>

                        <div className={`w-full h-px mb-10 ${plan.isPopular ? 'bg-emerald-800' : 'bg-stone-50'}`}></div>

                        <ul className="space-y-5 mb-12 flex-grow">
                          {plan.features?.map((feature: string, j: number) => (
                            <li key={j} className="flex items-start gap-4 text-left">
                              <svg className="flex-shrink-0 w-5 h-5 mt-0.5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              <span className={`text-base leading-relaxed ${plan.isPopular ? 'text-emerald-50' : 'text-stone-600'} font-light`}>
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>

                        {(() => {
                          const baseUrl = plan.buttonLink || '/contact';
                          const finalHref = baseUrl.includes('package=') 
                            ? baseUrl 
                            : `${baseUrl}${baseUrl.includes('?') ? '&' : '?'}package=${encodeURIComponent(plan.name)}`;
                          
                          return (
                            <Link 
                              href={finalHref} 
                              className={`w-full py-5 rounded-2xl font-semibold text-base text-center transition-all duration-300 ${
                                plan.isPopular 
                                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-stone-900 hover:from-amber-400 hover:to-amber-500 shadow-[0_10px_20px_rgba(212,175,55,0.2)]' 
                                  : 'bg-emerald-700 text-white hover:bg-emerald-800 shadow-lg'
                              } active:scale-[0.98]`}
                            >
                              {plan.buttonText || 'Meld je aan'}
                            </Link>
                          );
                        })()}
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );

          default:
            return null;
        }
      })}
    </>
  );
}
