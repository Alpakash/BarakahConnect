import { CalendarIcon, DocumentsIcon, EnvelopeIcon, UsersIcon } from '@sanity/icons'
import type { StructureResolver } from 'sanity/structure'

// Vaste pagina's: precies één document per pagina, met een vast id. Niet aan te maken, te
// dupliceren of te verwijderen (zie sanity.config.ts).
export const SINGLETONS = [
  { type: 'homePage', id: 'mainHomePage', title: 'Home' },
  { type: 'aboutPage', id: 'mainAboutPage', title: 'Over ons' },
  { type: 'eventsPage', id: 'mainEventsPage', title: 'Bijeenkomsten (pagina)' },
  { type: 'pakkettenPage', id: 'mainPakkettenPage', title: 'Pakketten' },
  { type: 'registerPage', id: 'mainRegisterPage', title: 'Aanmelden' },
  { type: 'contactPage', id: 'mainContactPage', title: 'Contact' },
] as const

export const SINGLETON_TYPES: string[] = SINGLETONS.map((s) => s.type)

// Wat de redacteur het vaakst doet staat bovenaan; de paginateksten zitten in één map.
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Inhoud')
    .items([
      S.documentTypeListItem('event').title('Bijeenkomsten').icon(CalendarIcon),
      S.documentTypeListItem('speaker').title('Sprekers en gasten').icon(UsersIcon),
      S.documentTypeListItem('submission').title('Aanmeldingen en berichten').icon(EnvelopeIcon),
      S.divider(),
      S.listItem()
        .title('Website-teksten')
        .icon(DocumentsIcon)
        .child(
          S.list()
            .title('Website-teksten')
            .items(
              SINGLETONS.map(({ type, id, title }) =>
                S.listItem()
                  .title(title)
                  .id(type)
                  .child(S.document().schemaType(type).documentId(id).title(title))
              )
            )
        ),
    ])
