'use client'

import { useEffect } from 'react'
import type { LayoutProps } from 'sanity'
import { useRouter } from 'sanity/router'

// De Studio is voor een redacteur zonder technische achtergrond. Sanity laat je wisselen tussen
// "Gepubliceerd" en "Concepten" (de keuzelijst bovenaan en de knopjes boven elk document). In
// "Gepubliceerd" kun je niets aanmaken of bewerken, en die keuze plakt in de URL
// (?perspective=published), dus ook in een bladwijzer. Sanity heeft geen instelling om dat uit te
// zetten. Daarom: de keuze verbergen, en een URL met perspective=published terugzetten naar de
// standaard (Concepten).
const VERBORGEN = `
  [data-ui="ReleasesNav"],
  [data-testid="document-perspective-list"] { display: none !important; }
`

export function AlleenConcepten(props: LayoutProps) {
  const router = useRouter()
  const perspective = router.stickyParams.perspective

  useEffect(() => {
    if (perspective === 'published') {
      router.navigate({ stickyParams: { perspective: null }, replace: true })
    }
  }, [perspective, router])

  return (
    <>
      <style>{VERBORGEN}</style>
      {props.renderDefault(props)}
    </>
  )
}
