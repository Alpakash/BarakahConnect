'use client';

import Script from 'next/script';

export default function WeeztixShop() {
  return (
    <>
      <div
        id="shop-frame"
        data-url="https://shop.weeztix.com/dc8ecdc7-5df0-11f1-8e27-d65b0659bc31"
        style={{ maxWidth: 600, margin: '0 auto' }}
      />
      <Script
        src="https://shop.weeztix.com/build/integrate.js"
        strategy="afterInteractive"
      />
    </>
  );
}
