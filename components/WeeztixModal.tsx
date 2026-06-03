'use client';

import { useState, useEffect, useCallback } from 'react';
import WeeztixShop from './WeeztixShop';

export default function WeeztixModal({ compact }: { compact?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, close]);

  return (
    <>
      {/* Trigger button */}
      <div className={compact ? '' : 'text-center'}>
        <button
          onClick={open}
          className={
            compact
              ? 'inline-flex items-center justify-center w-full bg-emerald-700 hover:bg-emerald-800 text-white font-medium py-3 rounded transition-all gap-2 mt-3'
              : 'bg-emerald-700 hover:bg-emerald-800 px-10 py-4 rounded-lg font-medium text-white shadow-lg transition-all inline-flex items-center gap-2 hover:-translate-y-0.5 text-lg'
          }
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
          Koop tickets
        </button>
      </div>

      {/* Modal overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
            onClick={close}
          />

          {/* Modal content */}
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
            {/* Close button */}
            <button
              onClick={close}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 hover:text-stone-800 transition-colors"
              aria-label="Sluiten"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>

            {/* Header */}
            <div className="pt-8 px-8 pb-4 border-b border-stone-100">
              <h2 className="font-serif text-2xl text-stone-900 text-center">Koop je tickets</h2>
              <p className="text-center text-stone-500 text-sm mt-1">
                Bestel hier eenvoudig je tickets voor onze aankomende bijeenkomsten
              </p>
            </div>

            {/* Weeztix Shop */}
            <div className="p-6">
              <WeeztixShop />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
