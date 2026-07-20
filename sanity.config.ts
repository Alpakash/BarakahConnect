import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { presentationTool } from 'sanity/presentation'
import { schemaTypes } from './sanity/schemaTypes'
import { projectId, dataset } from './sanity/env'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  title: 'Barakah Connect Studio',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Inhoud')
          .items([
            // Singleton: Home Pagina
            S.listItem()
              .title('Home Pagina')
              .id('homePage')
              .child(
                S.document()
                  .schemaType('homePage')
                  .documentId('mainHomePage')
                  .title('Home Pagina')
              ),
            // Singleton: Over Ons Pagina
            S.listItem()
              .title('Over Ons Pagina')
              .id('aboutPage')
              .child(
                S.document()
                  .schemaType('aboutPage')
                  .documentId('mainAboutPage')
                  .title('Over Ons Pagina')
              ),
            // Singleton: Bijeenkomsten Pagina
            S.listItem()
              .title('Bijeenkomsten Pagina')
              .id('eventsPage')
              .child(
                S.document()
                  .schemaType('eventsPage')
                  .documentId('mainEventsPage')
                  .title('Bijeenkomsten Pagina')
              ),
            S.divider(),
            // All other types except Singletons
            ...S.documentTypeListItems().filter(
              (listItem) => !['homePage', 'aboutPage', 'eventsPage'].includes(listItem.getId() as string)
            ),
          ]),
    }),
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
  ],
  schema: {
    types: schemaTypes.types,
    // Verberg singleton documenten van 'Create new' knop
    templates: (templates) =>
      templates.filter(({ schemaType }) => !['homePage', 'aboutPage', 'eventsPage'].includes(schemaType)),
  },
  document: {
    // Voorkom 'duplicate' en 'delete' acties voor singletons, en 'create' voor submissions in de studio
    actions: (input, context) => {
      if (['homePage', 'aboutPage', 'eventsPage'].includes(context.schemaType)) {
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
