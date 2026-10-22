import { nlNLLocale } from '@sanity/locale-nl-nl'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { presentationTool } from 'sanity/presentation'
import { schemaTypes } from './sanity/schemaTypes'
import { projectId, dataset } from './sanity/env'
import { AlleenConcepten } from './sanity/studio/AlleenConcepten'
import { SINGLETON_TYPES, structure } from './sanity/studio/structure'
import { welkomTool } from './sanity/studio/welkom'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  title: 'Barakah Connect Studio',
  plugins: [
    welkomTool(),
    structureTool({ title: 'Inhoud', structure }),
    presentationTool({
      previewUrl: {
        // Studio draait op hetzelfde domein als de site zelf (lokaal of live),
        // dus de huidige origin is altijd de juiste preview-URL. Hardcoded
        // localhost hier brak de Presentation-tool volledig op de live site.
        origin: typeof window !== 'undefined' ? window.location.origin : 'https://barakahconnect.nl',
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
    }),
    nlNLLocale(),
  ],
  // Studio voor een redacteur zonder technische achtergrond: geen "Uitgaven" (releases), geen
  // ingeplande concepten en geen taken, en de tab "Presentatie" (live meekijken op de site) alleen
  // voor beheerders.
  releases: { enabled: false },
  scheduledDrafts: { enabled: false },
  tasks: { enabled: false },
  tools: (prev, { currentUser }) =>
    currentUser?.roles.some((role) => role.name === 'administrator')
      ? prev
      : prev.filter((tool) => tool.name !== 'presentation'),
  studio: {
    components: { layout: AlleenConcepten },
  },
  schema: {
    types: schemaTypes.types,
    // Verberg singleton documenten van 'Create new' knop. Inzendingen ook: die komen alleen via het
    // formulier binnen, onder een privé-id ('submissions.…', zie app/api/submissions/route.ts). Een
    // in Studio aangemaakte inzending krijgt een id zonder punt en is dan voor iedereen leesbaar.
    templates: (templates) =>
      templates.filter(({ schemaType }) => ![...SINGLETON_TYPES, 'submission'].includes(schemaType)),
  },
  document: {
    // Voorkom 'duplicate' en 'delete' acties voor singletons, en 'duplicate' voor submissions
    // (een kopie krijgt net als een nieuw aangemaakte inzending een publiek id)
    actions: (input, context) => {
      if (SINGLETON_TYPES.includes(context.schemaType)) {
        return input.filter(({ action }) => !['duplicate', 'delete'].includes(action as string))
      }
      if (context.schemaType === 'submission') {
        // Alleen bekijken, bewerken (notities evt), en verwijderen staan we toe
        return input.filter(({ action }) => !['duplicate'].includes(action as string))
      }
      return input
    },
  },
})
