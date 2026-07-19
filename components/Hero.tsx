import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/sanity/lib/image';

// Standaard sfeerfoto totdat er via Sanity een andere wordt geupload
// op het Hero-blok (Home Pagina -> Hero Sectie -> Achtergrond/Hero Afbeelding).
const FALLBACK_IMAGE_URL = '/muslim-mosque.jpg';

export default function Hero({
  title,
  subtitle,
  text,
  image,
  primaryButtonText,
  primaryButtonLink,
}: {
  title?: string;
  subtitle?: string;
  text?: string;
  image?: any;
  primaryButtonText?: string;
  primaryButtonLink?: string;
}) {
  const imageUrl = image ? urlFor(image).width(2400).height(1600).url() : FALLBACK_IMAGE_URL;

  return (
    <section className="relative w-full min-h-[85vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={imageUrl}
          alt=""
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/75 via-stone-900/55 to-stone-950/85" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white py-28">
        <h1 className="font-serif text-5xl md:text-7xl font-medium tracking-tight mb-8 leading-[1.1]">
          {title}
          {subtitle && (
            <>
              <br />
              <span className="text-emerald-300">{subtitle}</span>
            </>
          )}
        </h1>
        {text && (
          <p className="text-lg md:text-xl text-stone-100/90 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
            {text}
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-5 justify-center">
          {primaryButtonText && (
            <Link
              href={primaryButtonLink || '/bijeenkomsten'}
              className="bg-emerald-600 hover:bg-emerald-500 px-8 py-4 rounded font-medium text-white shadow-lg transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5"
            >
              {primaryButtonText}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          )}
          <Link
            href="/over-ons"
            className="bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-sm px-8 py-4 rounded font-medium text-white transition-all text-center hover:-translate-y-0.5"
          >
            Lees ons verhaal
          </Link>
        </div>
      </div>
    </section>
  );
}
