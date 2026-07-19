import { defineField, defineType } from 'sanity'

export const speakerType = defineType({
  name: 'speaker',
  title: 'Spreker / Gast',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Naam',
      type: 'string',
      description: 'Optioneel: mag je leeg laten als je de naam nog niet weet. De video kun je alvast los uploaden.',
    }),
    defineField({
      name: 'role',
      title: 'Functie / Titel',
      type: 'string',
      description: 'Bijv. "Ondernemer & Spreker" of "Oprichter XYZ"',
    }),
    defineField({
      name: 'photo',
      title: 'Foto',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'bio',
      title: 'Korte Bio',
      type: 'text',
    }),
    defineField({
      name: 'video',
      title: 'Video',
      type: 'file',
      options: {
        accept: 'video/mp4',
      },
      description: 'Upload hier de mp4 van de spreker. Comprimeer het bestand vooraf (bijv. met HandBrake, CRF 22-24, 1080p H.264) voor snellere laadtijden op de site.',
    }),
    defineField({
      name: 'socialLink',
      title: 'Social Media / Website Link',
      type: 'url',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'photo',
      hasVideo: 'video.asset',
    },
    prepare({ title, subtitle, media, hasVideo }: any) {
      return {
        title: title || (hasVideo ? 'Video (naam nog invullen)' : 'Nieuwe spreker / gast'),
        subtitle,
        media,
      }
    },
  },
})
