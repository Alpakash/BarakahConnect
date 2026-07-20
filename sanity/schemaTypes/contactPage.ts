import { defineField, defineType } from 'sanity'

export const contactPageType = defineType({
  name: 'contactPage',
  title: 'Pagina: Contact',
  type: 'document',
  preview: {
    prepare() {
      return { title: 'Contact Pagina', subtitle: 'Titel, tekst & contactgegevens' }
    },
  },
  fields: [
    defineField({ name: 'title', title: 'Titel', type: 'string', initialValue: 'Neem Contact Op' }),
    defineField({
      name: 'intro',
      title: 'Introductietekst',
      type: 'text',
      initialValue: 'Heb je vragen over Barakah Connect, wil je samenwerken, of ben je op zoek naar meer informatie? Laat gerust een bericht achter, we proberen zo snel mogelijk te reageren.',
    }),
    defineField({ name: 'email', title: 'E-mailadres', type: 'string', initialValue: 'info@barakahconnect.nl' }),
    defineField({ name: 'phone', title: 'Telefoonnummer', type: 'string', initialValue: '+31 6 13687860' }),
    defineField({ name: 'location', title: 'Locatie', type: 'string', initialValue: 'Regio Nederland' }),
  ],
})
