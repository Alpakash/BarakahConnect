import { createClient } from 'next-sanity'
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

// Write client zonder stega voor mutations (create, patch, delete)
export const writeClient = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
})
