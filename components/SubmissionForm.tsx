'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

function FormInner({ type }: { type: 'Aanmelding Bijeenkomst' | 'Contact' }) {
  const searchParams = useSearchParams();
  const eventTitle = searchParams.get('event');
  const packageName = searchParams.get('package');

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
      eventTitle: formData.get('eventTitle'), // Hidden field
      packageName: formData.get('packageName'), // Added package support
      type,
    };

    try {
      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Er is iets misgegaan bij het verzenden.');
      setStatus('success');
      (e.target as HTMLFormElement).reset();
    } catch (err: any) {
      setErrorMessage(err.message);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-8 rounded-xl text-center">
        <div className="text-4xl mb-4">✨</div>
        <h3 className="font-serif text-2xl mb-2">Bedankt voor je {type.split(' ')[0].toLowerCase()}!</h3>
        <p>We hebben je gegevens ontvangen en nemen indien nodig zo snel mogelijk contact met je op.</p>
        <button 
          onClick={() => setStatus('idle')}
          className="mt-6 text-emerald-700 underline text-sm font-medium"
        >
          Nog een bericht sturen
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 flex flex-col h-full justify-between">
      <div>
        {status === 'error' && (
          <div className="bg-red-50 text-red-800 p-4 rounded-md text-sm mb-6">
            {errorMessage}
          </div>
        )}
        
        <div className="space-y-4">
          {type === 'Aanmelding Bijeenkomst' && eventTitle && (
            <div className="bg-emerald-50/80 border border-emerald-100 p-4 rounded-md mb-6">
              <p className="text-xs text-emerald-700 font-bold uppercase tracking-wider mb-1">Geselecteerde bijeenkomst:</p>
              <p className="text-emerald-900 font-serif text-lg">{eventTitle}</p>
              <input type="hidden" name="eventTitle" value={eventTitle} />
            </div>
          )}

          {packageName && (
            <div className="bg-stone-50 border-l-4 border-emerald-700 p-4 mb-10 flex justify-between items-center rounded-r-lg">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-emerald-700" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">Geselecteerd lidmaatschap</span>
                  <div className="flex items-center flex-wrap gap-x-2">
                    <span className="font-serif text-lg md:text-xl text-stone-900 whitespace-nowrap leading-none">{packageName}</span>
                    <span className="text-emerald-700 font-medium text-sm whitespace-nowrap">
                      ({packageName === 'Proefpakket' ? '€60' : 'Prijs op aanvraag'})
                    </span>
                  </div>
                </div>
              </div>
              <Link href="/lid-worden" className="text-xs text-stone-400 hover:text-emerald-700 underline underline-offset-4 tracking-wide">
                Wijzig
              </Link>
              <input type="hidden" name="packageName" value={packageName} />
            </div>
          )}

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-1">
              Volledige naam *
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              className="w-full px-4 py-3 rounded-md border border-stone-200 focus:ring-2 focus:ring-emerald-700 focus:border-transparent outline-none transition-all bg-stone-50"
              placeholder="Je naam"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-1">
              E-mailadres *
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              className="w-full px-4 py-3 rounded-md border border-stone-200 focus:ring-2 focus:ring-emerald-700 focus:border-transparent outline-none transition-all bg-stone-50"
              placeholder="je@email.nl"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-1">
              {type === 'Contact' ? 'Je bericht *' : 'Vertel kort over jezelf/je onderneming (Optioneel)'}
            </label>
            <textarea
              name="message"
              id="message"
              required={type === 'Contact'}
              rows={4}
              className="w-full px-4 py-3 rounded-md border border-stone-200 focus:ring-2 focus:ring-emerald-700 focus:border-transparent outline-none transition-all bg-stone-50 resize-y"
              placeholder={type === 'Contact' ? 'Hoe kunnen we je helpen?' : 'Deel evt. je LinkedIn of een korte introductie...'}
            ></textarea>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-emerald-700 hover:bg-emerald-800 disabled:bg-emerald-700/50 text-white font-medium py-3.5 px-4 rounded-md transition-all shadow-sm hover:shadow active:scale-[0.98] flex justify-center mt-6"
      >
        {status === 'loading' ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Verzenden...
          </span>
        ) : (
          type === 'Contact' ? 'Verstuur Bericht' : 'Meld je aan'
        )}
      </button>
    </form>
  )
}

// Wrap in Suspense layer because we use useSearchParams()
export default function SubmissionForm({ type }: { type: 'Aanmelding Bijeenkomst' | 'Contact' }) {
  return (
    <Suspense fallback={
      <div className="animate-pulse flex flex-col space-y-4">
        <div className="h-12 bg-stone-100 rounded-md"></div>
        <div className="h-12 bg-stone-100 rounded-md"></div>
        <div className="h-32 bg-stone-100 rounded-md"></div>
      </div>
    }>
      <FormInner type={type} />
    </Suspense>
  )
}
