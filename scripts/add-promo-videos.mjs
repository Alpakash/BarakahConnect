/**
 * Plaatst de geuploade gastvideo's (Spreker/Gast met een video) als
 * "Uitnodigingsvideo (Gast)"-blokken op de homepage, zonder bestaande
 * secties te overschrijven. Slaat gasten over die al een blok hebben.
 *
 * Voer uit met: node scripts/add-promo-videos.mjs
 * Vereist een .env.local met NEXT_PUBLIC_SANITY_PROJECT_ID,
 * NEXT_PUBLIC_SANITY_DATASET en SANITY_API_WRITE_TOKEN.
 */

import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { randomUUID } from 'crypto'

const __dirname = dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: join(__dirname, '../.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_WRITE_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

async function run() {
  console.log('🔎 Gasten met video zoeken...\n')

  const guests = await client.fetch(
    `*[_type == "speaker" && defined(video.asset)] | order(_createdAt asc){ _id, name }`
  )

  if (guests.length === 0) {
    console.log('Geen "Spreker / Gast"-documenten met een geuploade video gevonden. Niets te doen.')
    return
  }

  const homeDoc = await client.fetch(`*[_type == "homePage" && _id == "mainHomePage"][0]{ _id, sections }`)

  if (!homeDoc) {
    console.log('❌ Geen homePage document (mainHomePage) gevonden. Maak eerst de Home Pagina aan in Studio.')
    return
  }

  const existingSections = homeDoc.sections || []
  const alreadyPlacedGuestIds = new Set(
    existingSections
      .filter((s) => s._type === 'promoVideoSection' && s.guest?._ref)
      .map((s) => s.guest._ref)
  )

  const newSections = guests
    .filter((guest) => !alreadyPlacedGuestIds.has(guest._id))
    .map((guest, i) => ({
      _type: 'promoVideoSection',
      _key: randomUUID(),
      guest: { _type: 'reference', _ref: guest._id },
      buttonText: 'Meld je aan',
      buttonLink: '/bijeenkomsten',
      mediaPosition: (existingSections.length + i) % 2 === 0 ? 'left' : 'right',
    }))

  if (newSections.length === 0) {
    console.log('Alle gasten met een video staan al als blok op de homepage. Niets te doen.')
    return
  }

  await client
    .patch(homeDoc._id)
    .setIfMissing({ sections: [] })
    .append('sections', newSections)
    .commit()

  console.log(`✅ ${newSections.length} uitnodigingsvideo-blok(ken) toegevoegd aan de homepage.`)
  console.log('Ga naar /studio → Home Pagina om de volgorde/positie desgewenst aan te passen.')
}

run().catch((err) => {
  console.error('❌ Fout:', err.message)
  process.exit(1)
})
