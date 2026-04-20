import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';

export default function HomeSections({ sections }: { sections: any[] }) {
  if (!sections || sections.length === 0) return null;

  return (
    <>
      {sections.map((section: any, index: number) => {
        switch (section._type) {
          case 'hero':
            return (
              <section key={section._key || index} className="relative w-full py-28 md:py-40 overflow-hidden bg-stone-50 border-b border-stone-200">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-50 via-stone-50 to-stone-100 z-0 opacity-70"></div>
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-100/50 rounded-full blur-[100px] -mr-48 -mt-48 z-0 pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                  <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="text-left">
                      <h1 className="font-serif text-5xl md:text-7xl font-medium tracking-tight mb-8 text-stone-900 leading-[1.1]">
                        {section.title}<br />
                        <span className="text-emerald-800">{section.subtitle}</span>
                      </h1>
                      <p className="text-lg md:text-xl text-stone-600 max-w-lg mb-12 leading-relaxed font-light">
                        {section.text}
                      </p>
                      <div className="flex flex-col sm:flex-row gap-5">
                        {section.primaryButtonText && (
                          <Link href={section.primaryButtonLink || '/bijeenkomsten'} className="bg-emerald-700 hover:bg-emerald-800 px-8 py-4 rounded font-medium text-white shadow-lg transition-all text-center flex items-center justify-center gap-2 hover:-translate-y-0.5">
                            {section.primaryButtonText}
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </Link>
                        )}
                        <Link href="/over-ons" className="bg-white hover:bg-stone-50 border border-stone-200 px-8 py-4 rounded font-medium text-stone-700 shadow-sm transition-all text-center hover:-translate-y-0.5">
                          Lees ons verhaal
                        </Link>
                      </div>
                    </div>

                    <div className="hidden lg:block relative">
                      <div className="absolute -inset-4 bg-emerald-100 opacity-30 blur-3xl rounded-full z-0"></div>
                      <div className="relative z-10 w-full h-[500px] flex items-center justify-center">
                        {section.image ? (
                          <Image
                            src={urlFor(section.image).width(1000).url()}
                            alt={section.title}
                            fill
                            className="object-contain p-12 drop-shadow-sm"
                          />
                        ) : (
                           <div className="w-full h-full bg-stone-100 flex items-center justify-center text-emerald-800/20 text-8xl">🖼️</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
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
                        <div className="text-4xl mb-8 w-20 h-20 bg-stone-50 shadow-sm rounded-2xl flex items-center justify-center border border-stone-100">
                          {item.emoji || '✨'}
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

          default:
            return null;
        }
      })}
    </>
  );
}
