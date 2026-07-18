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
  mediaPosition = 'left',
}: {
  guest?: any;
  title?: string;
  text?: string;
  buttonText?: string;
  buttonLink?: string;
  mediaPosition?: 'left' | 'right';
}) {
  const [isOpen, setIsOpen] = useState(false);
  const videoUrl = guest?.video?.asset?.url;

  return (
    <>
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className={`relative mx-auto w-full max-w-xs ${mediaPosition === 'right' ? 'lg:order-2' : ''}`}>
          <div className="absolute -inset-4 bg-emerald-100 opacity-40 blur-3xl rounded-full z-0"></div>
          <div className="relative z-10 aspect-[9/16] w-full rounded-[2rem] overflow-hidden shadow-2xl border border-stone-100 bg-stone-100">
            {guest?.photo ? (
              <Image
                src={urlFor(guest.photo).width(600).height(1067).url()}
                alt={guest.name || 'Gast'}
                fill
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-emerald-800/5">
                <span className="text-5xl opacity-40">🎬</span>
              </div>
            )}
            {videoUrl && (
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                aria-label={`Bekijk video van ${guest?.name || 'gast'}`}
                className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/35 transition-colors cursor-pointer group"
              >
                <span className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-emerald-800 ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6 4l12 6-12 6V4z" />
                  </svg>
                </span>
              </button>
            )}
          </div>
        </div>

        <div className={`text-center lg:text-left ${mediaPosition === 'right' ? 'lg:order-1' : ''}`}>
          {guest?.name && (
            <p className="text-emerald-700 font-medium uppercase tracking-wide text-sm mb-4">
              {guest.name}
              {guest.role ? ` · ${guest.role}` : ''}
            </p>
          )}
          {title && (
            <h2 className="font-serif text-3xl md:text-4xl text-stone-900 mb-6 font-medium">{title}</h2>
          )}
          {text && (
            <p className="text-stone-600 text-lg leading-relaxed mb-8">{text}</p>
          )}
          {buttonText && (
            <Link
              href={buttonLink || '/bijeenkomsten'}
              className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 px-8 py-4 rounded font-medium text-white shadow-lg transition-all hover:-translate-y-0.5"
            >
              {buttonText}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          )}
        </div>
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
          <video
            src={videoUrl}
            controls
            autoPlay
            preload="none"
            className="max-h-[85vh] w-auto rounded-lg shadow-2xl aspect-[9/16]"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
