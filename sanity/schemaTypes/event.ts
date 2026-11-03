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
    defineField({
      name: 'eventPage',
      title: 'Eventpagina (optioneel)',
      type: 'reference',
      to: [{ type: 'eventPage' }],
      // Zwak: de eventpagina blijft te verwijderen; de kaart toont dan gewoon geen knop meer
      weak: true,
      description: 'Heeft deze bijeenkomst een eigen eventpagina? Kies hem hier: foto en titel van de kaart op /bijeenkomsten linken dan naar die pagina, en er komt een knop "Bekijk het programma" bij.',
    }),
    defineField({
      name: 'pageLink',
      title: 'Link naar eventpagina (optioneel)',
      type: 'string',
      description: 'Alleen nodig als de eventpagina hierboven niet te kiezen is, bijv. "/e-commerce-event" of een volledige https-link. Een gekozen eventpagina gaat voor.',
      hidden: ({ document }) => !!document?.eventPage,
      validation: (rule) =>
        rule.custom((value) =>
          !value || /^\/[a-z0-9-/]*$/.test(value) || /^https:\/\//.test(value)
            ? true
            : 'Begin met "/" (bijv. "/e-commerce-event") of met "https://".'
        ),
    }),
  ],
})
