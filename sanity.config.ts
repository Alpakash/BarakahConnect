import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { presentationTool } from 'sanity/presentation'
import { schemaTypes } from './sanity/schemaTypes'

export default defineConfig({
  basePath: '/studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
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
            S.divider(),
            // All other types except Singletons
            ...S.documentTypeListItems().filter(
              (listItem) => !['homePage', 'aboutPage'].includes(listItem.getId() as string)
            ),
          ]),
    }),
    presentationTool({
      previewUrl: {
        origin: 'http://localhost:3000',
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
      templates.filter(({ schemaType }) => !['homePage', 'aboutPage'].includes(schemaType)),
  },
  document: {
    // Voorkom 'duplicate' en 'delete' acties voor singletons, en 'create' voor submissions in de studio
    actions: (input, context) => {
      if (['homePage', 'aboutPage'].includes(context.schemaType)) {
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
