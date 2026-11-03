import { ImageResponse } from 'next/og'

// Deelplaatje (1200×630) voor WhatsApp, LinkedIn en X: de flyer links, de kern rechts.
// Gebruikt door de opengraph-image van /e-commerce-event en van de eventpagina's uit Sanity.

export const SHARE_IMAGE_SIZE = { width: 1200, height: 630 }

export function eventShareImage({
  flyerSrc,
  dateLabel,
  title,
  subtitle,
  footer,
}: {
  flyerSrc?: string
  dateLabel: string
  title: string
  subtitle?: string
  footer: string
}) {
  return new ImageResponse(
    (
      <div style={{ display: 'flex', width: '100%', height: '100%', background: '#f7f2e8' }}>
        {/* ImageResponse rendert gewone <img>; next/image werkt hier niet */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {flyerSrc && <img src={flyerSrc} width={503} height={630} alt="" style={{ objectFit: 'cover' }} />}
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
            {dateLabel}
          </div>
          <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.05, marginBottom: 28 }}>{title}</div>
          {subtitle && <div style={{ fontSize: 28, color: 'rgba(255,255,255,0.85)', marginBottom: 12 }}>{subtitle}</div>}
          <div style={{ fontSize: 28, color: '#dce98f' }}>{footer}</div>
        </div>
      </div>
    ),
    { ...SHARE_IMAGE_SIZE },
  )
}
