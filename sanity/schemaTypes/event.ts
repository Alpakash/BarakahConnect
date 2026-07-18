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
