'use client'

import { VisualEditing } from '@sanity/visual-editing/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

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
