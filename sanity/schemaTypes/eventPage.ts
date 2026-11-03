import { defineArrayMember, defineField, defineType } from 'sanity'

// Een losse pagina voor één event, met een eigen link om te delen (barakahconnect.nl/<link>).
// Opmaak: components/EventLanding.tsx; pagina: app/(site)/[slug]/page.tsx.

// Adressen die al een pagina van de site zijn; die kan een eventpagina niet overnemen
export const RESERVED_SLUGS = [
  'studio', 'api', 'bijeenkomsten', 'lid-worden', 'over-ons', 'aanmelden', 'contact',
  'e-commerce-event', 'events', 'sitemap.xml', 'robots.txt', 'icon.png',
]

export const eventPageType = defineType({
  name: 'eventPage',
  title: 'Eventpagina',
  type: 'document',
  groups: [
    { name: 'basis', title: 'Basis', default: true },
    { name: 'sprekers', title: 'Sprekers' },
    { name: 'programma', title: 'Programma' },
    { name: 'locatie', title: 'Locatie en tickets' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      group: 'basis',
      description: 'De grote kop bovenaan, bijv. "Ondernemen op een halal manier."',
      validation: (rule) => rule.required().error('Vul een titel in.'),
    }),
    defineField({
      name: 'slug',
      title: 'Link',
      type: 'slug',
      group: 'basis',
      description: 'Het laatste stuk van het webadres, bijv. "ramadan-event" wordt barakahconnect.nl/ramadan-event. Klik op "Genereer" om hem uit de titel te maken.',
      options: { source: 'title', maxLength: 60 },
      validation: (rule) =>
        rule.required().error('Vul een link in of klik op "Genereer".').custom((slug) => {
          const value = slug?.current
          if (!value) return true
          if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(value)) return 'Alleen kleine letters, cijfers en streepjes, bijv. "ramadan-event".'
          if (RESERVED_SLUGS.includes(value)) return `"${value}" is al een pagina van de website. Kies een andere link.`
          return true
        }),
    }),
    defineField({
      name: 'date',
      title: 'Datum',
      type: 'date',
      group: 'basis',
      options: { dateFormat: 'D MMMM YYYY' },
      validation: (rule) => rule.required().error('Vul de datum van het event in.'),
    }),
    defineField({
      name: 'times',
      title: 'Tijden',
      type: 'array',
      group: 'basis',
      description: 'Eén regel per tijd, bijv. "Dames: inloop 13:30" en "Heren: inloop 15:00".',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'intro',
      title: 'Introductie',
      type: 'text',
      rows: 6,
      group: 'basis',
      description: 'Een paar zinnen over het event en wat bezoekers kunnen verwachten. Een lege regel maakt een nieuwe alinea.',
      validation: (rule) => rule.required().error('Schrijf een korte introductie.'),
    }),
    defineField({
      name: 'flyer',
      title: 'Flyer',
      type: 'image',
      group: 'basis',
      description: 'De flyer staat in zijn geheel naast de introductie (op de telefoon bovenaan). Wordt ook gebruikt als plaatje bij delen via WhatsApp en LinkedIn.',
      fields: [
        defineField({
          name: 'alt',
          title: 'Korte beschrijving',
          type: 'string',
          description: 'Voor blinde bezoekers: wat staat er op de flyer? Bijv. "Flyer: Ramadan-event 10 maart, vier sprekers".',
        }),
      ],
    }),
    defineField({
      name: 'speakers',
      title: 'Sprekers',
      type: 'array',
      group: 'sprekers',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'eventSpeaker',
          title: 'Spreker',
          fields: [
            defineField({ name: 'name', title: 'Naam', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'role', title: 'Functie', type: 'string', description: 'Bijv. "Meta Ads Expert".' }),
            defineField({ name: 'topic', title: 'Onderwerp', type: 'string', description: 'Waar spreekt hij of zij over?' }),
            defineField({ name: 'text', title: 'Korte omschrijving', type: 'text', rows: 4 }),
            defineField({
              name: 'photo',
              title: 'Foto',
              type: 'image',
              description: 'Een staande foto werkt het best. Zet met "hotspot" het gezicht in het midden.',
              options: { hotspot: true },
            }),
            defineField({
              name: 'panel',
              title: 'Kleur van het tekstblok',
              type: 'string',
              initialValue: 'wit',
              options: {
                list: [
                  { title: 'Wit', value: 'wit' },
                  { title: 'Oranje', value: 'oranje' },
                  { title: 'Lichtblauw', value: 'blauw' },
                  { title: 'Lila', value: 'lila' },
                  { title: 'Lichtgroen', value: 'lichtgroen' },
                ],
                layout: 'radio',
                direction: 'horizontal',
              },
            }),
            defineField({ name: 'badge', title: 'Label op de foto (optioneel)', type: 'string', description: 'Bijv. "Alleen voor de dames".' }),
          ],
          preview: { select: { title: 'name', subtitle: 'topic', media: 'photo' } },
        }),
      ],
    }),
    defineField({
      name: 'program',
      title: 'Programma',
      type: 'array',
      group: 'programma',
      description: 'Eén onderdeel per tijdsblok, in de volgorde van de dag. Sleep om te verplaatsen.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'programItem',
          title: 'Onderdeel',
          fields: [
            defineField({ name: 'time', title: 'Tijd', type: 'string', description: 'Bijv. "14:00 – 15:00".', validation: (rule) => rule.required() }),
            defineField({ name: 'title', title: 'Titel', type: 'string', description: 'Bijv. "Inloop zusters" of de naam van de spreker.', validation: (rule) => rule.required() }),
            defineField({ name: 'text', title: 'Uitleg', type: 'text', rows: 3 }),
            defineField({
              name: 'audience',
              title: 'Voor wie',
              type: 'string',
              options: { list: ['Iedereen', 'Zusters', 'Broeders'], layout: 'radio', direction: 'horizontal' },
            }),
            defineField({
              name: 'muted',
              title: 'Rustig blok',
              type: 'boolean',
              initialValue: false,
              description: 'Zet aan voor inloop of pauze: het blok krijgt dan een lichtere kleur.',
            }),
            defineField({ name: 'list', title: 'Opsomming (optioneel)', type: 'array', of: [defineArrayMember({ type: 'string' })] }),
          ],
          preview: { select: { title: 'title', subtitle: 'time' } },
        }),
      ],
    }),
    defineField({
      name: 'address',
      title: 'Adres',
      type: 'string',
      group: 'locatie',
      description: 'Bijv. "Rhoneweg 12, 1043 AH Amsterdam". De knop "Route in Google Maps" gaat hier vanzelf naartoe.',
      validation: (rule) => rule.required().error('Vul het adres in.'),
    }),
    defineField({
      name: 'locationNotes',
      title: 'Praktische informatie',
      type: 'array',
      group: 'locatie',
      description: 'Eén punt per regel, bijv. "Op loopafstand van station Sloterdijk" of parkeerinformatie.',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'isFree',
      title: 'Gratis event',
      type: 'boolean',
      group: 'locatie',
      initialValue: false,
      description: 'Zet aan als er geen tickets nodig zijn: de ticketshop staat dan niet op de pagina.',
    }),
    defineField({
      name: 'ticketUrl',
      title: 'Eigen ticketlink (optioneel)',
      type: 'url',
      group: 'locatie',
      description: 'Verkoop je de tickets voor dit event ergens anders (een eigen Weeztix-shop, Eventbrite)? Plak hier de link. Leeg laten: de algemene Barakah Connect-ticketshop staat op de pagina.',
      hidden: ({ document }) => document?.isFree === true,
      validation: (rule) => rule.uri({ scheme: ['https'] }),
    }),
    defineField({
      name: 'ticketsText',
      title: 'Tekst boven de ticketshop',
      type: 'string',
      group: 'locatie',
      description: 'Bijv. "Bestel hieronder je ticket voor zondag 10 maart."',
      hidden: ({ document }) => document?.isFree === true,
    }),
  ],
  preview: {
    select: { title: 'title', slug: 'slug.current', date: 'date', media: 'flyer' },
    prepare({ title, slug, date, media }) {
      return { title, subtitle: [date, slug && `/${slug}`].filter(Boolean).join(' · '), media }
    },
  },
  orderings: [{ title: 'Datum, nieuwste eerst', name: 'dateDesc', by: [{ field: 'date', direction: 'desc' }] }],
})
