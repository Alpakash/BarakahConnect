import Link from 'next/link'

// Onbekend adres, bijv. een eventpagina die (nog) niet bestaat of al is weggehaald
export default function NotFound() {
  return (
    <div className="py-24 bg-stone-50 min-h-[60vh] flex items-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="font-serif text-4xl md:text-5xl mb-6 text-stone-900">Deze pagina bestaat niet</h1>
        <p className="text-stone-500 text-lg leading-relaxed mb-10">
          Misschien is de link verlopen of verkeerd overgenomen. Bekijk onze aankomende bijeenkomsten.
        </p>
        <Link
          href="/bijeenkomsten"
          className="inline-flex items-center justify-center bg-emerald-700 hover:bg-emerald-800 text-white px-8 py-4 rounded font-medium transition-all"
        >
          Naar de bijeenkomsten
        </Link>
      </div>
    </div>
  )
}
