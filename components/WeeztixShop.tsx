'use client';

import { useEffect } from 'react';

export default function WeeztixShop() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://shop.weeztix.com/build/integrate.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      id="shop-frame"
      data-url="https://shop.weeztix.com/dc8ecdc7-5df0-11f1-8e27-d65b0659bc31"
      style={{ maxWidth: 600, margin: '0 auto' }}
    />
  );
}
