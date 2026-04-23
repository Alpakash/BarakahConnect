import SubmissionForm from "@/components/SubmissionForm";

export const metadata = {
  title: 'Aanmelden',
  description: 'Meld je aan voor het Barakah Connect netwerk en blijf op de hoogte van onze aankomende bijeenkomsten en activiteiten.',
  openGraph: {
    title: 'Aanmelden | Barakah Connect',
    description: 'Meld je aan voor het Barakah Connect netwerk en ontmoet gelijkgestemden.',
  }
}

export default function Aanmelden() {
  return (
    <div className="py-24 bg-stone-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-4xl md:text-5xl mb-6 text-stone-900 text-center">Meld je aan</h1>
        <p className="text-center text-stone-500 mb-8 max-w-xl mx-auto text-lg leading-relaxed">
          Sluit je aan bij ons netwerk en blijf op de hoogte van onze aankomende bijeenkomsten. 
          We kijken ernaar uit je te ontmoeten!
        </p>
        <div className="w-24 h-1 bg-emerald-700 mx-auto mb-12 opacity-50"></div>
        
        <div className="bg-white rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-stone-100 p-8 md:p-12">
          <SubmissionForm type="Aanmelding Bijeenkomst" />
        </div>
      </div>
    </div>
  )
}
