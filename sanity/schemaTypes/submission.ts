import { defineField, defineType } from 'sanity'

export const submissionType = defineType({
  name: 'submission',
  title: 'Formulier Inzending',
  type: 'document',
  readOnly: false,
  fields: [
    defineField({
      name: 'name',
      title: 'Naam',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'type',
      title: 'Type Formulier',
      type: 'string',
      options: {
        list: ['Aanmelding Bijeenkomst', 'Contact'],
      },
      readOnly: true,
    }),
    defineField({
      name: 'message',
      title: 'Bericht / Bedrijfsinfo',
      type: 'text',
      readOnly: true,
    }),
    defineField({
      name: 'eventTitle',
      title: 'Betreft Bijeenkomst',
      type: 'string',
    }),
    defineField({
      name: 'packageName',
      title: 'Gekozen Pakket',
      type: 'string',
    }),
  ],
})
