import SubmissionForm from "@/components/SubmissionForm";
import { MailIcon, MapPinIcon, PhoneIcon } from "@/components/icons";
import { client } from "@/sanity/client";

export const metadata = {
  title: 'Contact',
  description: 'Neem contact op met Barakah Connect voor vragen, samenwerkingen of meer informatie. We beantwoorden je bericht zo snel mogelijk.',
  openGraph: {
    title: 'Contact | Barakah Connect',
    description: 'Neem contact op met Barakah Connect voor vragen, samenwerkingen of meer informatie.',
  }
}

export default async function Contact() {
  const pageContent = await client.fetch(
    `*[_type == "contactPage"][0]{ title, intro, email, phone, location }`,
    {},
    { next: { revalidate: 60 } }
  );

  const pageTitle = pageContent?.title || 'Neem Contact Op';
  const pageIntro = pageContent?.intro || 'Heb je vragen over Barakah Connect, wil je samenwerken, of ben je op zoek naar meer informatie? Laat gerust een bericht achter, we proberen zo snel mogelijk te reageren.';
  const email = pageContent?.email || 'info@barakahconnect.nl';
  const phone = pageContent?.phone || '+31 6 13687860';
  const location = pageContent?.location || 'Regio Nederland';

  return (
    <div className="py-24 bg-stone-50 min-h-screen flex items-center">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <h1 className="font-serif text-4xl md:text-5xl mb-6 text-stone-900">{pageTitle}</h1>
            <div className="w-24 h-1 bg-emerald-700 mb-10 opacity-50"></div>
            <p className="text-stone-600 text-lg leading-relaxed mb-12">
              {pageIntro}
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-5">
                <div className="bg-emerald-50 text-emerald-800 p-4 rounded-xl">
                  <MailIcon className="w-6 h-6" />
                </div>
                <div className="pt-1">
                  <h3 className="font-serif text-lg font-medium text-stone-900 mb-1">E-mail</h3>
                  <a href={`mailto:${email}`} className="text-stone-500 hover:text-emerald-700 transition-colors">{email}</a>
                </div>
              </div>
              <div className="flex items-start gap-5">
                <div className="bg-emerald-50 text-emerald-800 p-4 rounded-xl">
                  <MapPinIcon className="w-6 h-6" />
                </div>
                <div className="pt-1">
                  <h3 className="font-serif text-lg font-medium text-stone-900 mb-1">Locatie</h3>
                  <p className="text-stone-500">{location}</p>
                </div>
              </div>
              <div className="flex items-start gap-5">
                <div className="bg-emerald-50 text-emerald-800 p-4 rounded-xl">
                  <PhoneIcon className="w-6 h-6" />
                </div>
                <div className="pt-1">
                  <h3 className="font-serif text-lg font-medium text-stone-900 mb-1">Telefoon</h3>
                  <a href={`tel:${phone.replace(/[^\d+]/g, '')}`} className="text-stone-500 hover:text-emerald-700 transition-colors">{phone}</a>
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
