import { defineField, defineType } from 'sanity'

export const homePageType = defineType({
  name: 'homePage',
  title: 'Pagina: Home',
  type: 'document',
  fields: [
    defineField({
      name: 'sections',
      title: 'Pagina Indeling (Secties)',
      type: 'array',
      of: [
        // Hero Section
        {
          type: 'object',
          name: 'hero',
          title: 'Hero Sectie (Bovenzijde)',
          fields: [
            { name: 'title', type: 'string', title: 'Titel Hoofd' },
            { name: 'subtitle', type: 'string', title: 'Titel Sub (Gekleurd)' },
            { name: 'text', type: 'text', title: 'Beschrijving' },
            { name: 'image', type: 'image', title: 'Achtergrond/Hero Afbeelding', options: { hotspot: true } },
            { name: 'primaryButtonText', type: 'string', title: 'Tekst Knop 1' },
            { name: 'primaryButtonLink', type: 'string', title: 'Link Knop 1' },
          ]
        },
        // Text / Mission Section
        {
          type: 'object',
          name: 'textSection',
          title: 'Tekst / Missie Sectie',
          fields: [
            { name: 'title', type: 'string', title: 'Koptekst' },
            { name: 'text', type: 'text', title: 'Inhoud Tekst' },
          ]
        },
        // Features / Cards Section
        {
          type: 'object',
          name: 'featuresSection',
          title: 'Features / Kaarten Sectie',
          fields: [
            { name: 'title', type: 'string', title: 'Sectie Titel (Optioneel)' },
            {
              name: 'items',
              title: 'Kaarten',
              type: 'array',
              of: [{
                type: 'object',
                fields: [
                  { name: 'emoji', type: 'string', title: 'Emoji/Icoon' },
                  { name: 'title', type: 'string', title: 'Titel' },
                  { name: 'text', type: 'text', title: 'Beschrijving' },
                ]
              }]
            }
          ]
        },
        // Call to Action Section
        {
          type: 'object',
          name: 'ctaSection',
          title: 'Call to Action (Grote Knop)',
          fields: [
            { name: 'title', type: 'string', title: 'Titel' },
            { name: 'text', type: 'text', title: 'Omschrijving' },
            { name: 'buttonText', type: 'string', title: 'Tekst op knop' },
            { name: 'buttonLink', type: 'string', title: 'Link naar pagina' },
          ]
        },
        // Simple Image Section
        {
          type: 'image',
          name: 'imageBlock',
          title: 'Losse Afbeelding',
          options: { hotspot: true },
          fields: [
            { name: 'caption', type: 'string', title: 'Onderschrift', options: { isHighlighted: true } }
          ]
        },
        // Membership / Pricing Section
        {
          type: 'object',
          name: 'membershipSection',
          title: 'Lidmaatschap / Pakketten',
          fields: [
            defineField({ name: 'title', type: 'string', title: 'Sectie Titel' }),
            defineField({ name: 'description', type: 'text', title: 'Beschrijving' }),
            defineField({
              name: 'plans',
              type: 'array',
              title: 'Pakketten',
              of: [{
                type: 'object',
                name: 'plan',
                fields: [
                  { name: 'name', type: 'string', title: 'Naam Pakket' },
                  { name: 'price', type: 'string', title: 'Prijs (bijv. €60 of Op aanvraag)' },
                  { name: 'priceSubtext', type: 'string', title: 'Subtekst Prijs (bijv. per 2 beurten)' },
                  { name: 'features', type: 'array', title: 'Kenmerken/Vinkjes', of: [{ type: 'string' }] },
                  { name: 'buttonText', type: 'string', title: 'Tekst op knop' },
                  { name: 'buttonLink', type: 'string', title: 'Link (bijv. /aanmelden of /contact)' },
                  { name: 'isPopular', type: 'boolean', title: 'Markeren als populair/uitgelicht' }
                ]
              }]
            })
          ]
        },
        // Rich Text Section
        {
          type: 'object',
          name: 'richTextSection',
          title: 'Vrije Tekst (Uitgebreid)',
          fields: [
            {
              name: 'content',
              type: 'array',
              title: 'Inhoud',
              of: [{ type: 'block' }]
            }
          ]
        }
      ]
    })
  ]
})
