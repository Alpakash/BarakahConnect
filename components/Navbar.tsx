'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Logo from './Logo';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-300 border-b ${scrolled
        ? 'bg-white/50 backdrop-blur-lg border-stone-200 shadow-sm py-0'
        : 'bg-white border-transparent py-1'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 md:h-24">
          <Link href="/" className="flex items-center h-full py-3 shrink-0 group">
            <Logo className="h-full w-auto transition-transform group-hover:scale-[1.02]" />
          </Link>
          <div className="hidden md:flex gap-8 items-center">
            <Link href="/" className="text-stone-600 hover:text-emerald-700 font-medium transition-colors">Home</Link>
            <Link href="/over-ons" className="text-stone-600 hover:text-emerald-700 font-medium transition-colors">Over ons</Link>
            <Link href="/bijeenkomsten" className="text-stone-600 hover:text-emerald-700 font-medium transition-colors">Bijeenkomsten</Link>
            <Link href="/lid-worden" className="text-stone-600 hover:text-emerald-700 font-medium transition-colors">Pakketten</Link>
            <Link href="/contact" className="text-stone-600 hover:text-emerald-700 font-medium transition-colors">Contact</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/aanmelden" className="bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-2.5 rounded-sm font-medium transition-all shadow-sm hover:shadow-md">
              Meld je aan
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
