import { draftMode } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

// This endpoint is called by Sanity's Presentation Tool to enable Draft Mode
// so that the live preview iframe can render draft content
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const secret = searchParams.get('secret')
  const redirectTo = searchParams.get('sanity-preview-pathname') || searchParams.get('redirect') || '/'

  // Optional secret validation — set SANITY_PREVIEW_SECRET in .env.local to enable
  const expectedSecret = process.env.SANITY_PREVIEW_SECRET
  // Note: Sanity sends its own secret if not configured, so we only check if we HAVE a secret set locally
  if (expectedSecret && secret !== expectedSecret) {
    return new Response('Invalid secret', { status: 401 })
  }

  const draft = await draftMode()
  draft.enable()

  return NextResponse.redirect(new URL(redirectTo, req.url))
}
