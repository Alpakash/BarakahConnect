'use client'

import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

// Loaded on demand: this wrapper only renders in Draft Mode, and a static import
// would ship the Visual Editing library to every public page.
const VisualEditing = dynamic(
  () => import('@sanity/visual-editing/react').then((mod) => mod.VisualEditing),
  { ssr: false }
)

export default function VisualEditingWrapper() {
  const router = useRouter()

  useEffect(() => {
    // This allows the preview to refresh when sanity data changes
    if (window.self !== window.top) {
      // In the iframe
    }
  }, [])

  return <VisualEditing 
    portal 
    refresh={async (payload) => {
      if (payload.source === 'manual') {
        router.refresh()
        return
      }
    }}
  />
}
