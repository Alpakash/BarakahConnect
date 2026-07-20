import { defineField, defineType } from 'sanity'

export const pakkettenPageType = defineType({
  name: 'pakkettenPage',
  title: 'Pagina: Pakketten',
  type: 'document',
  preview: {
    prepare() {
      return { title: 'Pakketten Pagina', subtitle: 'Titel, tekst & "Waarom Barakah Connect"' }
    },
  },
  fields: [
    defineField({ name: 'title', title: 'Titel', type: 'string', initialValue: 'Pakketten' }),
    defineField({
      name: 'subtitle',
      title: 'Ondertitel',
      type: 'text',
      initialValue: 'Klaar om te groeien? Kies het pakket dat bij jouw doelen past.',
    }),
    defineField({ name: 'reasonsTitle', title: 'Titel "Waarom"-sectie', type: 'string', initialValue: 'Waarom Barakah Connect?' }),
    defineField({
      name: 'reasons',
      title: 'Redenen',
      type: 'array',
      of: [{
        type: 'object',
        name: 'reason',
        fields: [
          { name: 'heading', type: 'string', title: 'Kop' },
          { name: 'text', type: 'text', title: 'Tekst' },
        ],
      }],
      initialValue: [
        { heading: 'Netwerk & Groei', text: 'Toegang tot een besloten groep ondernemers die elkaar écht willen helpen groeien, zowel zakelijk als spiritueel.' },
        { heading: 'Halal Ondernemen', text: 'Focus op ethisch en islamitisch verantwoord zakendoen in een vertrouwde omgeving.' },
      ],
    }),
  ],
})
