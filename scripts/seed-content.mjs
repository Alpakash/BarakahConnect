/**
 * Seed script: vult Sanity met de standaard content van de website (Block v2).
 * Voer uit met: npx pnpm run seed
 */

import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: join(__dirname, '../.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_WRITE_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

async function seed() {
  console.log('🌱 Seeding Sanity content (Builder Mode)...\n')

  // We overschrijven de bestaande homePage om naar het nieuwe sections model te gaan
  const homeDoc = await client.fetch(`*[_type == "homePage"][0]`)
  
  const homeData = {
    _type: 'homePage',
    sections: [
      {
        _type: 'hero',
        _key: 'hero-1',
        title: 'Samen sterker,',
        subtitle: 'versterk de ummah.',
        text: 'Barakah Connect brengt broeders en zusters samen. Ontmoet nieuwe mensen, deel kennis en ondersteun elkaar binnen het ondernemerschap en de samenleving.',
        primaryButtonText: 'Ontdek Bijeenkomsten',
        primaryButtonLink: '/bijeenkomsten'
      },
      {
        _type: 'textSection',
        _key: 'text-1',
        title: 'Missie & Visie',
        text: 'Wij organiseren om de twee weken inspirerende bijeenkomsten met ontbijt. Onze missie is eenduidig: Elkaar versterken, waardevolle netwerken opbouwen en oprechte ondersteuning bieden—zowel in je persoonlijke groei als binnen het ondernemerschap. Iedereen is welkom!'
      },
      {
        _type: 'featuresSection',
        _key: 'features-1',
        title: 'Onze Kernwaarden',
        items: [
          {
            _key: 'feat-1',
            emoji: '🤝',
            title: 'Verbinden',
            text: 'Gelijkgestemden ontmoeten wordt laagdrempelig. Vorm diepgaande vriendschappen en professionele relaties in een vertrouwde omgeving.'
          },
          {
            _key: 'feat-2',
            emoji: '💡',
            title: 'Kennis delen',
            text: 'Praktische masterclasses, pitches en open gesprekken. We ondersteunen elkaars ondernemingen actief door samen te sparren.'
          },
          {
            _key: 'feat-3',
            emoji: '🌙',
            title: 'Voor iedereen',
            text: 'Broeders en zusters komen samen in aparte, comfortabele groepen. En ook niet-moslims zijn meer dan welkom om de barakah te ervaren.'
          }
        ]
      }
    ]
  }

  if (homeDoc) {
    // Update existing
    await client.patch(homeDoc._id).set(homeData).commit()
    console.log('✅ Pagina: Home bijgewerkt naar Builder indeling!')
  } else {
    await client.create(homeData)
    console.log('✅ Pagina: Home nieuw aangemaakt met Builder indeling!')
  }

  console.log('\n🎉 Seeding voltooid! Refresh je Studio.')
}

seed().catch(err => {
  console.error('❌ Fout tijdens seeding:', err.message)
  process.exit(1)
})
