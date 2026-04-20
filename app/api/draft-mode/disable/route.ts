import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

// Disables draft mode and redirects back to the home page
export async function GET() {
  const draft = await draftMode()
  draft.disable()
  redirect('/')
}
