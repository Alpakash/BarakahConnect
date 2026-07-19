'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/sanity/lib/image';

export default function PromoVideoBlock({
  guest,
  title,
  text,
  buttonText,
  buttonLink,
}: {
  guest?: any;
  title?: string;
  text?: string;
  buttonText?: string;
  buttonLink?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [videoState, setVideoState] = useState<'loading' | 'ready' | 'error'>('loading');
  const [retryKey, setRetryKey] = useState(0);
  const videoUrl = guest?.video?.asset?.url;

  const openModal = () => {
    setVideoState('loading');
    setIsOpen(true);
  };

  const retry = () => {
    setVideoState('loading');
    setRetryKey((k) => k + 1);
  };

  return (
    <>
      <div className="flex flex-col items-center text-center w-full max-w-xs mx-auto">
        <div className="relative w-full aspect-[9/16] rounded-[1.75rem] overflow-hidden shadow-xl border border-stone-100 bg-gradient-to-br from-emerald-800 to-emerald-950">
          {guest?.photo ? (
            <Image
              src={urlFor(guest.photo).width(600).height(1067).url()}
              alt={guest.name || 'Gast'}
              fill
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-emerald-100/70">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-2.36A.75.75 0 0121.5 8.8v6.4a.75.75 0 01-1.03.66L15.75 13.5m-15 3.75h9a1.5 1.5 0 001.5-1.5v-7.5a1.5 1.5 0 00-1.5-1.5h-9a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5z" />
              </svg>
              <span className="text-xs font-medium tracking-wide uppercase">Video</span>
            </div>
          )}
          {videoUrl && (
            <button
              type="button"
              onClick={openModal}
              aria-label={`Bekijk video van ${guest?.name || 'gast'}`}
              className="absolute inset-0 flex items-center justify-center bg-black/10 hover:bg-black/30 transition-colors cursor-pointer group"
            >
              <span className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5 text-emerald-800 ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6 4l12 6-12 6V4z" />
                </svg>
              </span>
            </button>
          )}
        </div>

        {(guest?.name || title || text) && (
          <div className="mt-5">
            {guest?.name && (
              <p className="text-emerald-700 font-medium text-sm">
                {guest.name}
                {guest.role ? ` · ${guest.role}` : ''}
              </p>
            )}
            {title && (
              <h3 className="font-serif text-xl text-stone-900 mt-1">{title}</h3>
            )}
            {text && (
              <p className="text-stone-500 text-sm mt-2 leading-relaxed">{text}</p>
            )}
          </div>
        )}

        {buttonText && (
          <Link
            href={buttonLink || '/bijeenkomsten'}
            className="mt-5 inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 px-6 py-3 rounded-full font-medium text-white text-sm shadow-md transition-all hover:-translate-y-0.5"
          >
            {buttonText}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        )}
      </div>

      {isOpen && videoUrl && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Sluiten"
            className="absolute top-6 right-6 text-white/80 hover:text-white text-3xl leading-none cursor-pointer"
          >
            &times;
          </button>

          {videoState === 'loading' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 pointer-events-none text-white/80">
              <div className="w-10 h-10 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <p className="text-sm">Video laden…</p>
            </div>
          )}

          {videoState === 'error' ? (
            <div
              className="max-w-sm w-full bg-stone-900 border border-stone-700 rounded-2xl p-8 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-white font-medium mb-2">De video kon niet geladen worden</p>
              <p className="text-stone-400 text-sm mb-6">Dit kan door een trage of onstabiele verbinding komen. Probeer het opnieuw, of open de video direct.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  type="button"
                  onClick={retry}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2.5 rounded-lg font-medium text-sm transition-colors cursor-pointer"
                >
                  Probeer opnieuw
                </button>
                <a
                  href={videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-lg font-medium text-sm transition-colors"
                >
                  Open in nieuw tabblad
                </a>
              </div>
            </div>
          ) : (
            <video
              key={retryKey}
              src={videoUrl}
              controls
              autoPlay
              preload="auto"
              className="max-h-[85vh] w-auto rounded-lg shadow-2xl aspect-[9/16]"
              onClick={(e) => e.stopPropagation()}
              onCanPlay={() => setVideoState('ready')}
              onPlaying={() => setVideoState('ready')}
              onError={() => setVideoState('error')}
            />
          )}
        </div>
      )}
    </>
  );
}
