import { draftMode } from 'next/headers'
import type { Any, QueryParams } from 'next-sanity'
import { client } from '../client'

/**
 * Fetch content for the site. Normal visitors get clean strings, cached by
 * Next.js and refreshed at most once a minute. In Draft Mode (the Presentation
 * tool in /studio) strings carry stega for click-to-edit, and Next.js skips its
 * fetch cache.
 */
export async function sanityFetch<QueryResponse = Any>({
  query,
  params = {},
}: {
  query: string
  params?: QueryParams
}): Promise<QueryResponse> {
  const { isEnabled: isDraftMode } = await draftMode()

  return client.fetch<QueryResponse>(query, params, {
    // Published content in Draft Mode too: without a read token the 'drafts' perspective
    // can't return drafts, it hides every document that has unpublished changes instead
    perspective: 'published',
    stega: isDraftMode,
    next: { revalidate: 60 },
  })
}
