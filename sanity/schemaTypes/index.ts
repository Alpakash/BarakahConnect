import { type SchemaTypeDefinition } from 'sanity'
import { eventType } from './event'
import { submissionType } from './submission'
import { homePageType } from './homePage'
import { aboutPageType } from './aboutPage'
import { speakerType } from './speaker'
import { eventsPageType } from './eventsPage'

export const schemaTypes: { types: SchemaTypeDefinition[] } = {
  types: [eventType, submissionType, homePageType, aboutPageType, speakerType, eventsPageType],
}
