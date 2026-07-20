import { type SchemaTypeDefinition } from 'sanity'
import { eventType } from './event'
import { submissionType } from './submission'
import { homePageType } from './homePage'
import { aboutPageType } from './aboutPage'
import { speakerType } from './speaker'
import { eventsPageType } from './eventsPage'
import { contactPageType } from './contactPage'
import { pakkettenPageType } from './pakkettenPage'
import { registerPageType } from './registerPage'

export const schemaTypes: { types: SchemaTypeDefinition[] } = {
  types: [
    eventType,
    submissionType,
    homePageType,
    aboutPageType,
    speakerType,
    eventsPageType,
    contactPageType,
    pakkettenPageType,
    registerPageType,
  ],
}
