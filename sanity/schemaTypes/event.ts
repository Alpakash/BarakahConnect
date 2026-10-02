import { defineField, defineType } from 'sanity'

export const eventType = defineType({
  name: 'event',
  title: 'Bijeenkomst',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Datum (Optioneel)',
      type: 'datetime',
      description: 'Laat leeg als de datum "Nader te bepalen" is.',
    }),
    defineField({
      name: 'isFree',
      title: 'Gratis bijeenkomst',
      type: 'boolean',
      description: 'Zet aan als er geen tickets nodig zijn: de knop "Koop tickets" wordt dan niet getoond. Staat "gratis" in de titel, dan gebeurt dit automatisch.',
    }),
    defineField({
      name: 'location',
      title: 'Locatie',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Beschrijving',
      type: 'text',
    }),
    defineField({
      name: 'image',
      title: 'Afbeelding',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
})
