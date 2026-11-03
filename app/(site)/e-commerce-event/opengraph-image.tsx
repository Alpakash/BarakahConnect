import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { eventShareImage, SHARE_IMAGE_SIZE } from '@/components/EventShareImage'

// Deelplaatje voor WhatsApp, LinkedIn en Instagram: de flyer links, de kern rechts
export const alt = 'Ondernemen op een halal manier: zondag 13 december, Rhoneweg 12, Amsterdam'
export const size = SHARE_IMAGE_SIZE
export const contentType = 'image/png'

export default async function Image() {
  const flyer = await readFile(join(process.cwd(), 'app/(site)/e-commerce-event/flyer-og.jpg'), 'base64')

  return eventShareImage({
    flyerSrc: `data:image/jpeg;base64,${flyer}`,
    dateLabel: 'Zondag 13 december',
    title: 'Ondernemen op een halal manier.',
    subtitle: '4 sprekers · e-commerce, bol.com, Meta Ads en tawakkul',
    footer: 'Rhoneweg 12, Amsterdam · barakahconnect.nl',
  })
}
