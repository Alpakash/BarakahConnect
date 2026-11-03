import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

// Deelplaatje voor WhatsApp, LinkedIn en Instagram: de flyer links, de kern rechts
export const alt = 'Ondernemen op een halal manier: zondag 13 december, Rhoneweg 12, Amsterdam'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  const flyer = await readFile(join(process.cwd(), 'app/(site)/e-commerce-event/flyer-og.jpg'), 'base64')

  return new ImageResponse(
    (
      <div style={{ display: 'flex', width: '100%', height: '100%', background: '#f7f2e8' }}>
        <img src={`data:image/jpeg;base64,${flyer}`} width={503} height={630} alt="" />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '0 56px',
            flex: 1,
            background: '#1d4a2e',
            color: 'white',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignSelf: 'flex-start',
              background: '#dce98f',
              color: '#1d4a2e',
              fontSize: 28,
              fontWeight: 700,
              padding: '10px 24px',
              borderRadius: 999,
              marginBottom: 32,
            }}
          >
            Zondag 13 december
          </div>
          <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.05, marginBottom: 28 }}>
            Ondernemen op een halal manier.
          </div>
          <div style={{ fontSize: 28, color: 'rgba(255,255,255,0.85)', marginBottom: 12 }}>
            4 sprekers · e-commerce, bol.com, Meta Ads en tawakkul
          </div>
          <div style={{ fontSize: 28, color: '#dce98f' }}>Rhoneweg 12, Amsterdam · barakahconnect.nl</div>
        </div>
      </div>
    ),
    { ...size },
  )
}
