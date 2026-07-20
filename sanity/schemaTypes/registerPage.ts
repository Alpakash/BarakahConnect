import { defineField, defineType } from 'sanity'

export const registerPageType = defineType({
  name: 'registerPage',
  title: 'Pagina: Aanmelden',
  type: 'document',
  preview: {
    prepare() {
      return { title: 'Aanmelden Pagina', subtitle: 'Titel & teksten' }
    },
  },
  fields: [
    defineField({ name: 'title', title: 'Titel', type: 'string', initialValue: 'Meld je aan' }),
    defineField({
      name: 'intro',
      title: 'Introductietekst',
      type: 'text',
      initialValue: 'Sluit je aan bij ons netwerk en blijf op de hoogte van onze aankomende bijeenkomsten. We kijken ernaar uit je te ontmoeten!',
    }),
    defineField({ name: 'ticketsTitle', title: 'Titel tickets-sectie', type: 'string', initialValue: 'Of koop direct je tickets' }),
    defineField({
      name: 'ticketsText',
      title: 'Tekst tickets-sectie',
      type: 'text',
      initialValue: 'Bestel hier eenvoudig je tickets voor onze aankomende bijeenkomsten via Weeztix.',
    }),
  ],
})
