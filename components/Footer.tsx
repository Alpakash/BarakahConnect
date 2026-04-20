import Link from 'next/link'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="bg-stone-900 border-t border-stone-800 text-stone-300 py-16 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Kolom 1: Logo */}
          <div className="lg:col-span-1 flex flex-col justify-start">
            <Link href="/" className="inline-block bg-white p-4 rounded-2xl w-fit xl:hover:shadow-md transition-shadow">
              <Logo className="w-36 lg:w-44 h-auto" />
            </Link>
          </div>

          {/* Kolom 2: Introductietekst */}
          <div className="lg:col-span-2 lg:pr-8">
            <h3 className="text-stone-50 font-serif text-lg mb-5 md:mb-6">Over Barakah Connect</h3>
            <p className="text-stone-400 text-sm md:text-base leading-relaxed">
              Een islamitische netwerkorganisatie die broeders en zusters samenbrengt. Ontdek nieuwe connecties, deel kennis, en versterk de ummah tijdens onze bijeenkomsten.
            </p>
          </div>
          
          <div>
            <h3 className="text-stone-50 font-serif text-lg mb-6">Navigatie</h3>
            <ul className="space-y-4">
              <li><Link href="/over-ons" className="hover:text-emerald-500 transition-colors">Over ons</Link></li>
              <li><Link href="/bijeenkomsten" className="hover:text-emerald-500 transition-colors">Bijeenkomsten</Link></li>
              <li><Link href="/lid-worden" className="hover:text-emerald-500 transition-colors">Pakketten</Link></li>
              <li><Link href="/contact" className="hover:text-emerald-500 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-stone-50 font-serif text-lg mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-stone-400 hover:text-emerald-500 transition-colors">
                <span className="text-lg">✉</span>
                <a href="mailto:info@barakahconnect.nl">info@barakahconnect.nl</a>
              </li>
              <li className="flex items-center gap-3 text-stone-400 hover:text-emerald-500 transition-colors">
                <span className="text-lg">📞</span>
                <a href="tel:+31613687860">+31 6 13687860</a>
              </li>
              <li className="flex items-center gap-3 text-stone-400">
                <span className="text-lg">📍</span>
                <span>Regio Nederland</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-stone-500">
          <p>&copy; {new Date().getFullYear()} Barakah Connect. Alle rechten voorbehouden.</p>
          <div className="flex gap-4">
            <Link href="/studio" className="hover:text-stone-300 transition-colors">Beheer (Admin)</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
