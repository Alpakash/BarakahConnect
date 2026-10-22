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
      description: 'Verplicht. Bijv. "Online webinar: ondernemen met barakah".',
      validation: (rule) => rule.required().error('Vul een titel in, anders kun je niet publiceren.'),
    }),
    defineField({
      name: 'date',
      title: 'Datum en tijd (optioneel)',
      type: 'datetime',
      description: 'Laat leeg als de datum nog niet vaststaat: op de site staat dan "Nader te bepalen". De dag erna verdwijnt de bijeenkomst vanzelf van de site.',
    }),
    defineField({
      name: 'isFree',
      title: 'Gratis bijeenkomst',
      type: 'boolean',
      initialValue: false,
      description: 'Zet aan als er geen tickets nodig zijn: de knop "Koop tickets" wordt dan niet getoond. Staat "gratis" in de titel, dan gebeurt dit automatisch.',
    }),
    defineField({
      name: 'location',
      title: 'Locatie',
      type: 'string',
      description: 'Bijv. "Online (link volgt per mail)" of "Amsterdam, Wibautstraat 1".',
    }),
    defineField({
      name: 'description',
      title: 'Beschrijving',
      type: 'text',
      rows: 5,
      description: 'Waar gaat het over en voor wie is het? Een paar zinnen is genoeg.',
    }),
    defineField({
      name: 'image',
      title: 'Afbeelding',
      type: 'image',
      description: 'Optioneel. Een liggende foto of flyer werkt het best.',
      options: { hotspot: true },
    }),
  ],
})
