import { defineField, defineType } from 'sanity'

export const aboutPageType = defineType({
  name: 'aboutPage',
  title: 'Pagina: Over Ons',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Hoofdtitel', type: 'string', initialValue: 'Over Barakah Connect' }),
    defineField({ 
      name: 'blocks', 
      title: "Inhoud (Secties & Foto's)", 
      type: 'array', 
      of: [
        {
          type: 'object',
          name: 'textSection',
          title: 'Tekst Sectie',
          fields: [
            { name: 'heading', type: 'string', title: 'Koptekst' },
            { name: 'text', type: 'text', title: 'Tekst (Alinea)' }
          ]
        },
        {
          type: 'image',
          name: 'imageBlock',
          title: 'Losse Afbeelding',
          options: { hotspot: true }
        }
      ] 
    }),
  ]
})
