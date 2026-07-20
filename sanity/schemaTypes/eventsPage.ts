import { defineField, defineType } from 'sanity'

export const eventsPageType = defineType({
  name: 'eventsPage',
  title: 'Pagina: Bijeenkomsten',
  type: 'document',
  preview: {
    prepare() {
      return {
        title: 'Bijeenkomsten Pagina',
        subtitle: 'Titel & introductietekst',
      }
    },
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      initialValue: 'Onze Bijeenkomsten',
    }),
    defineField({
      name: 'intro',
      title: 'Introductietekst',
      type: 'text',
      initialValue: 'Sluit je aan bij onze tweewekelijkse ontbijtsessies. Kom om te netwerken, kennis te delen, of gewoon voor een goed gesprek en lekker eten.',
    }),
  ],
})
