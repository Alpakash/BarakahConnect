import { draftMode } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

// Resolves the redirect target against this site and falls back to the home page
// for anything that would leave it (absolute URLs, //host, /\host), so this
// endpoint can't be used as an open redirect
function sameOriginUrl(target: string, req: NextRequest) {
  const home = new URL('/', req.url)
  try {
    const url = new URL(target, home)
    return url.origin === home.origin ? url : home
  } catch {
    return home
  }
}

// This endpoint is called by Sanity's Presentation Tool to enable Draft Mode,
// which turns on the click-to-edit overlays in the preview iframe
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const secret = searchParams.get('secret')
  const redirectTo = searchParams.get('sanity-preview-pathname') || searchParams.get('redirect') || '/'

  // Optional secret for manual preview links (?secret=...). Presentation doesn't send
  // this parameter (it sends its own sanity-preview-secret, which isn't checked here),
  // so setting SANITY_PREVIEW_SECRET locks the Presentation tool out as well
  const expectedSecret = process.env.SANITY_PREVIEW_SECRET
  if (expectedSecret && secret !== expectedSecret) {
    return new Response('Invalid secret', { status: 401 })
  }

  const draft = await draftMode()
  draft.enable()

  return NextResponse.redirect(sameOriginUrl(redirectTo, req))
}
