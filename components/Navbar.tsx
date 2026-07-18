'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Logo from './Logo';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/over-ons', label: 'Over ons' },
  { href: '/bijeenkomsten', label: 'Bijeenkomsten' },
  { href: '/lid-worden', label: 'Pakketten' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-300 border-b ${scrolled || menuOpen
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
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="text-stone-600 hover:text-emerald-700 font-medium transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Link href="/aanmelden" className="hidden sm:inline-flex bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-2.5 rounded-sm font-medium transition-all shadow-sm hover:shadow-md">
              Meld je aan
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? 'Sluit menu' : 'Open menu'}
              aria-expanded={menuOpen}
              className="md:hidden inline-flex items-center justify-center w-11 h-11 -mr-2 text-stone-700 hover:text-emerald-700 transition-colors cursor-pointer"
            >
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-[max-height] duration-300 ease-in-out border-t ${menuOpen ? 'max-h-[28rem] border-stone-200' : 'max-h-0 border-transparent'
          } bg-white/95 backdrop-blur-lg`}
      >
        <div className="px-4 sm:px-6 py-6 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-stone-700 hover:text-emerald-700 hover:bg-stone-50 font-medium px-4 py-3 rounded-lg transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/aanmelden"
            className="mt-3 bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-3.5 rounded-sm font-medium transition-all shadow-sm text-center"
          >
            Meld je aan
          </Link>
        </div>
      </div>
    </nav>
  )
}
