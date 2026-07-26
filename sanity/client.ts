import { createClient } from 'next-sanity'
import { createClient as createSanityClient } from '@sanity/client'
import { apiVersion, dataset, projectId, useCdn } from './env'

// Read client met stega voor Visual Editing
export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
  stega: {
    enabled: true,
    studioUrl: '/studio',
  },
})

// Write client via @sanity/client direct (zonder next-sanity wrapper) voor mutations
export const writeClient = createSanityClient({
  apiVersion,
  dataset,
  projectId,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
})
