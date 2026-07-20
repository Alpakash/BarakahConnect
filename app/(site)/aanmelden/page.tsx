import SubmissionForm from "@/components/SubmissionForm";
import WeeztixModal from "@/components/WeeztixModal";
import { client } from "@/sanity/client";

export const metadata = {
  title: 'Aanmelden',
  description: 'Meld je aan voor het Barakah Connect netwerk en blijf op de hoogte van onze aankomende bijeenkomsten en activiteiten.',
  openGraph: {
    title: 'Aanmelden | Barakah Connect',
    description: 'Meld je aan voor het Barakah Connect netwerk en ontmoet gelijkgestemden.',
  }
}

export default async function Aanmelden() {
  const pageContent = await client.fetch(
    `*[_type == "registerPage"][0]{ title, intro, ticketsTitle, ticketsText }`,
    {},
    { next: { revalidate: 60 } }
  );

  const pageTitle = pageContent?.title || 'Meld je aan';
  const pageIntro = pageContent?.intro || 'Sluit je aan bij ons netwerk en blijf op de hoogte van onze aankomende bijeenkomsten. We kijken ernaar uit je te ontmoeten!';
  const ticketsTitle = pageContent?.ticketsTitle || 'Of koop direct je tickets';
  const ticketsText = pageContent?.ticketsText || 'Bestel hier eenvoudig je tickets voor onze aankomende bijeenkomsten via Weeztix.';

  return (
    <div className="py-24 bg-stone-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-4xl md:text-5xl mb-6 text-stone-900 text-center">{pageTitle}</h1>
        <p className="text-center text-stone-500 mb-8 max-w-xl mx-auto text-lg leading-relaxed">
          {pageIntro}
        </p>
        <div className="w-24 h-1 bg-emerald-700 mx-auto mb-12 opacity-50"></div>

        <div className="bg-white rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-stone-100 p-8 md:p-12">
          <SubmissionForm type="Aanmelding Bijeenkomst" />
        </div>

        <div className="mt-16 pt-12 border-t border-stone-200">
          <h2 className="font-serif text-3xl md:text-4xl mb-4 text-stone-900 text-center">{ticketsTitle}</h2>
          <p className="text-center text-stone-500 mb-8 max-w-xl mx-auto text-lg leading-relaxed">
            {ticketsText}
          </p>
          <div className="w-24 h-1 bg-emerald-700 mx-auto mb-12 opacity-50"></div>
          <WeeztixModal />
        </div>
      </div>
    </div>
  )
}
