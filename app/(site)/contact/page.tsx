import SubmissionForm from "@/components/SubmissionForm";

export const metadata = {
  title: 'Contact | Barakah Connect',
}

export default function Contact() {
  return (
    <div className="py-24 bg-stone-50 min-h-screen flex items-center">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <h1 className="font-serif text-4xl md:text-5xl mb-6 text-stone-900">Neem Contact Op</h1>
            <div className="w-24 h-1 bg-emerald-700 mb-10 opacity-50"></div>
            <p className="text-stone-600 text-lg leading-relaxed mb-12">
              Heb je vragen over Barakah Connect, wil je samenwerken, of ben je op zoek naar meer informatie? 
              Laat gerust een bericht achter, we proberen zo snel mogelijk te reageren.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start gap-5">
                <div className="bg-emerald-50 text-emerald-800 p-4 rounded-xl">
                  <span className="text-2xl">✉</span>
                </div>
                <div className="pt-1">
                  <h3 className="font-serif text-lg font-medium text-stone-900 mb-1">E-mail</h3>
                  <a href="mailto:info@barakahconnect.nl" className="text-stone-500 hover:text-emerald-700 transition-colors">info@barakahconnect.nl</a>
                </div>
              </div>
              <div className="flex items-start gap-5">
                <div className="bg-emerald-50 text-emerald-800 p-4 rounded-xl">
                  <span className="text-2xl">📍</span>
                </div>
                <div className="pt-1">
                  <h3 className="font-serif text-lg font-medium text-stone-900 mb-1">Locatie</h3>
                  <p className="text-stone-500">Regio Nederland</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-stone-100 p-8 md:p-10">
            <h2 className="font-serif text-2xl text-stone-900 mb-8">Stuur een bericht</h2>
            <SubmissionForm type="Contact" />
          </div>
        </div>
      </div>
    </div>
  )
}
