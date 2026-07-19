import Link from 'next/link'
import Logo from './Logo'
import { MailIcon, PhoneIcon, MapPinIcon } from './icons'

export default function Footer() {
  return (
    <footer className="bg-stone-900 border-t border-stone-800 text-stone-300 py-16 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Kolom 1: Logo */}
          <div className="lg:col-span-1 flex flex-col justify-start gap-5">
            <Link href="/" className="inline-block bg-white p-4 rounded-2xl w-fit xl:hover:shadow-md transition-shadow">
              <Logo className="w-36 lg:w-44 h-auto" />
            </Link>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/officialbarakahconnect/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Barakah Connect op Instagram"
                className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-stone-700 text-stone-300 hover:text-white hover:border-emerald-600 hover:bg-emerald-700 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75}>
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/@barakah.connect"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Barakah Connect op TikTok"
                className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-stone-700 text-stone-300 hover:text-white hover:border-emerald-600 hover:bg-emerald-700 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.05z" />
                </svg>
              </a>
            </div>
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
                <MailIcon className="w-4 h-4 shrink-0" />
                <a href="mailto:info@barakahconnect.nl">info@barakahconnect.nl</a>
              </li>
              <li className="flex items-center gap-3 text-stone-400 hover:text-emerald-500 transition-colors">
                <PhoneIcon className="w-4 h-4 shrink-0" />
                <a href="tel:+31613687860">+31 6 13687860</a>
              </li>
              <li className="flex items-center gap-3 text-stone-400">
                <MapPinIcon className="w-4 h-4 shrink-0" />
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
