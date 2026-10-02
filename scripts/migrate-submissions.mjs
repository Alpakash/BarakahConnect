/**
 * Zet formulier-inzendingen over naar een privé-id.
 *
 * De dataset is publiek: elk document waarvan de _id geen punt bevat, is zonder inlog op te
 * vragen. Inzendingen bevatten persoonsgegevens en horen daarom, net als nieuwe inzendingen
 * (zie app/api/submissions/route.ts), onder 'submissions.<id>' te staan. Dit script zet elke
 * inzending met een publiek id, en een eventueel concept daarvan, over naar
 * 'submissions.<oude id>'. Kopiëren en verwijderen gebeurt in één transactie: alles of niets.
 *
 * Voer uit met:
 *   node scripts/migrate-submissions.mjs                                      proefdraai, wijzigt niets
 *   node scripts/migrate-submissions.mjs --migrate --backup <bestand.ndjson>  back-up maken, dan overzetten
 *
 * Vereist een .env.local met SANITY_API_WRITE_TOKEN (Editor-rechten).
 * Het script toont alleen id's, aantallen en veldnamen, nooit de inhoud. De back-up bevat wel
 * persoonsgegevens: bewaar die buiten de repo en gooi hem weg zodra hij niet meer nodig is.
 */

import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
import { createInterface } from 'node:readline/promises'
import { mkdir, writeFile } from 'node:fs/promises'
import { fileURLToPath, pathToFileURL } from 'url'
import { dirname, join, resolve } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: join(__dirname, '../.env.local') })

// Moet gelijk blijven aan SUBMISSION_ID_PREFIX in app/api/submissions/route.ts
const SUBMISSION_ID_PREFIX = 'submissions.'
const DRAFTS_PREFIX = 'drafts.'
const VERSIONS_PREFIX = 'versions.'

// Velden die Sanity zelf beheert; die tellen niet mee bij kopiëren en vergelijken
const SYSTEM_FIELDS = new Set(['_id', '_rev', '_createdAt', '_updatedAt', '_originalId', '_system'])

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'z7hlx5cz'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = '2025-02-19'
const apiBase = `https://${projectId}.api.sanity.io`

const isPublicId = (id) => !id.includes('.')

function stableStringify(value) {
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(',')}]`
  if (value && typeof value === 'object') {
    return `{${Object.keys(value)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${stableStringify(value[key])}`)
      .join(',')}}`
  }
  return JSON.stringify(value)
}

function contentFields(doc) {
  return Object.fromEntries(Object.entries(doc).filter(([key]) => !SYSTEM_FIELDS.has(key)))
}

// Namen van velden die verschillen; de waarden zelf tonen we niet
export function differingFields(a, b) {
  const left = contentFields(a)
  const right = contentFields(b)
  const keys = new Set([...Object.keys(left), ...Object.keys(right)])
  return [...keys].filter((key) => stableStringify(left[key]) !== stableStringify(right[key]))
}

export function toCopy(original, newId) {
  return { ...contentFields(original), _id: newId, _createdAt: original._createdAt }
}

/**
 * Bepaalt voor elke inzending met een publiek id (of een concept daarvan) het privé-id en of daar
 * al een identieke kopie staat. Release-versies van publieke inzendingen en afwijkende bestaande
 * kopieën blokkeren het overzetten; die moeten eerst in Studio worden opgelost.
 */
export function planMigration(docs) {
  const byId = new Map(docs.map((doc) => [doc._id, doc]))
  const moves = []
  const blockers = []

  for (const doc of docs) {
    const id = doc._id
    let newId
    if (isPublicId(id)) {
      newId = `${SUBMISSION_ID_PREFIX}${id}`
    } else if (id.startsWith(DRAFTS_PREFIX) && isPublicId(id.slice(DRAFTS_PREFIX.length))) {
      newId = `${DRAFTS_PREFIX}${SUBMISSION_ID_PREFIX}${id.slice(DRAFTS_PREFIX.length)}`
    } else {
      // versions.<release>.<id>: bij publiceren zou de release het publieke document terugzetten
      if (id.startsWith(VERSIONS_PREFIX) && isPublicId(id.split('.').slice(2).join('.'))) {
        blockers.push(`${id}: release-versie van een publieke inzending; publiceer of verwijder die eerst in Studio`)
      }
      continue // staat al onder een privé-id
    }

    const existingCopy = byId.get(newId)
    if (existingCopy) {
      const differences = differingFields(doc, existingCopy)
      if (differences.length > 0) {
        blockers.push(`${newId} bestaat al maar verschilt van ${id} (velden: ${differences.join(', ')})`)
        continue
      }
    }
    moves.push({ original: doc, newId, copyExists: Boolean(existingCopy), copyRev: existingCopy?._rev })
  }

  moves.sort((a, b) => a.original._createdAt.localeCompare(b.original._createdAt) || a.newId.localeCompare(b.newId))
  return { moves, blockers }
}

function parseArgs(argv) {
  const migrate = argv.includes('--migrate')
  const backupIndex = argv.indexOf('--backup')
  const backup = backupIndex === -1 ? undefined : argv[backupIndex + 1]
  return { migrate, backup: backup && !backup.startsWith('--') ? resolve(backup) : undefined }
}

// Zonder token: precies wat een willekeurige bezoeker kan opvragen
async function anonymousGet(path) {
  const res = await fetch(`${apiBase}/v${apiVersion}${path}`)
  if (!res.ok) throw new Error(`Anonieme controle mislukt (HTTP ${res.status}) voor ${path.split('?')[0]}`)
  return res.json()
}

async function printPublicExposure(privateIds) {
  const query = encodeURIComponent('count(*[_type == "submission"])')
  const { result: count } = await anonymousGet(`/data/query/${dataset}?query=${query}&perspective=raw`)
  console.log(`\n🌐 Zonder inlog op te vragen: ${count} inzending(en)${count === 0 ? ' ✅' : ''}`)

  // De History API geeft publieke documenten ook anoniem terug; privé-id's horen leeg te blijven
  const sampleId = privateIds.find((id) => id.startsWith(SUBMISSION_ID_PREFIX))
  if (sampleId) {
    const time = new Date().toISOString()
    const { documents } = await anonymousGet(`/data/history/${dataset}/documents/${sampleId}?time=${time}`)
    console.log(`🌐 History API zonder inlog voor ${sampleId}: ${documents.length} document(en)${documents.length === 0 ? ' ✅' : ' ❌'}`)
  }
  return count
}

// Volledige export van alle inzendingen (ook concepten), precies zoals Sanity die levert
async function exportSubmissions(token) {
  const res = await fetch(`${apiBase}/v2021-06-07/data/export/${dataset}?types=submission`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new Error(`Export mislukt (HTTP ${res.status})`)
  const text = await res.text()
  const docs = text
    .split('\n')
    .filter((line) => line.trim())
    .map((line) => JSON.parse(line))
  return { text, docs }
}

async function confirm(question, expected) {
  const readline = createInterface({ input: process.stdin, output: process.stdout })
  const answer = await readline.question(question)
  readline.close()
  return answer.trim() === expected
}

async function run() {
  const { migrate, backup } = parseArgs(process.argv.slice(2))
  const token = process.env.SANITY_API_WRITE_TOKEN

  if (!token) {
    console.error('❌ SANITY_API_WRITE_TOKEN ontbreekt. Zet een Editor-token in .env.local in de projectmap.')
    process.exit(1)
  }
  if (migrate && !backup) {
    console.error('❌ --migrate vereist --backup <bestand.ndjson> (een pad buiten de repo, het bestand mag nog niet bestaan).')
    process.exit(1)
  }

  // Raw perspective: gepubliceerde documenten, concepten en release-versies komen los terug
  const client = createClient({ projectId, dataset, token, apiVersion, perspective: 'raw', useCdn: false })

  console.log(`🔎 Inzendingen zoeken in ${projectId}/${dataset}...\n`)
  const docs = await client.fetch(`*[_type == "submission"]`)
  const { moves, blockers } = planMigration(docs)
  const privateIds = docs
    .map((doc) => doc._id)
    .filter((id) => id.startsWith(SUBMISSION_ID_PREFIX) || id.startsWith(`${DRAFTS_PREFIX}${SUBMISSION_ID_PREFIX}`))

  console.log(`${docs.length} inzending-document(en) gevonden, waarvan ${privateIds.length} al onder een privé-id.`)

  if (moves.length > 0) {
    console.log(`\nOver te zetten (${moves.length}):`)
    for (const { original, newId, copyExists } of moves) {
      const note = copyExists ? '   (identieke kopie staat er al, alleen origineel verwijderen)' : ''
      console.log(`  ${original._id} → ${newId}   aangemaakt ${original._createdAt.slice(0, 10)}${note}`)
    }
  }

  if (blockers.length > 0) {
    console.log('\n⚠️  Dit moet eerst opgelost worden, anders zet --migrate niets over:')
    blockers.forEach((blocker) => console.log(`  ${blocker}`))
  }

  if (!migrate) {
    console.log('\nProefdraai: er is niets gewijzigd.')
    if (moves.length > 0) console.log('Overzetten: node scripts/migrate-submissions.mjs --migrate --backup <bestand.ndjson>')
    await printPublicExposure(privateIds)
    return
  }

  if (moves.length === 0) {
    console.log('\nNiets over te zetten.')
    await printPublicExposure(privateIds)
    return
  }
  if (blockers.length > 0) {
    console.error('\n❌ Er is niets gewijzigd.')
    process.exit(1)
  }

  // 1. Back-up, en controleren dat elk te verwijderen document er ongewijzigd in staat
  const exported = await exportSubmissions(token)
  const exportedById = new Map(exported.docs.map((doc) => [doc._id, doc]))
  const missing = moves.filter(({ original }) => {
    const backedUp = exportedById.get(original._id)
    return !backedUp || backedUp._rev !== original._rev || differingFields(backedUp, original).length > 0
  })
  if (missing.length > 0) {
    console.error(`\n❌ ${missing.length} document(en) ontbreken in de export of zijn net gewijzigd. Er is niets gewijzigd; draai het script opnieuw.`)
    process.exit(1)
  }
  await mkdir(dirname(backup), { recursive: true, mode: 0o700 })
  await writeFile(backup, exported.text, { mode: 0o600, flag: 'wx' })
  console.log(`\n💾 Back-up: ${backup} (${exported.docs.length} documenten, alleen leesbaar voor jou)`)

  // 2. Bevestigen
  const deleteCount = moves.length
  const createCount = moves.filter((move) => !move.copyExists).length
  console.log(`\nIn één transactie: ${createCount} privé-kopie(ën) aanmaken en ${deleteCount} origineel/originelen definitief verwijderen.`)
  if (!(await confirm('Typ "overzetten" om door te gaan: ', 'overzetten'))) {
    console.log('Afgebroken: er is niets gewijzigd. De back-up blijft staan.')
    return
  }

  // 3. Vlak voor het overzetten: is er sinds het ophalen niets veranderd?
  const ids = moves.flatMap((move) => [move.original._id, move.newId])
  const current = new Map((await client.fetch(`*[_id in $ids]{ _id, _rev }`, { ids })).map((doc) => [doc._id, doc._rev]))
  const changed = moves.filter(({ original, newId, copyRev }) =>
    current.get(original._id) !== original._rev || current.get(newId) !== copyRev
  )
  if (changed.length > 0) {
    console.error(`\n❌ ${changed.length} inzending(en) zijn intussen gewijzigd. Er is niets gewijzigd; draai het script opnieuw.`)
    process.exit(1)
  }

  // 4. Overzetten: kopieën aanmaken ('create' faalt als het id al bestaat) en originelen verwijderen
  const transaction = client.transaction()
  for (const { original, newId, copyExists } of moves) {
    if (!copyExists) transaction.create(toCopy(original, newId))
  }
  for (const { original } of moves) transaction.delete(original._id)
  await transaction.commit({ visibility: 'sync' })
  console.log('\n📦 Transactie uitgevoerd. Controleren...\n')

  // 5. Controleren tegen de back-up
  const after = new Map((await client.fetch(`*[_id in $ids]`, { ids })).map((doc) => [doc._id, doc]))
  let ok = true
  for (const { original, newId } of moves) {
    const copy = after.get(newId)
    const problems = [
      ...(after.has(original._id) ? ['origineel bestaat nog'] : []),
      ...(!copy ? ['kopie ontbreekt'] : differingFields(original, copy).map((field) => `veld ${field} verschilt`)),
    ]
    if (problems.length > 0) ok = false
    const createdAtNote = copy && copy._createdAt !== original._createdAt ? '   (aanmaakdatum niet overgenomen)' : ''
    console.log(`  ${problems.length === 0 ? '✅' : '❌'} ${original._id} → ${newId}${problems.length ? `   ${problems.join(', ')}` : ''}${createdAtNote}`)
  }
  console.log(ok ? `\nAlle ${moves.length} inzending(en) staan nu onder een privé-id.` : `\n❌ Niet alles klopt; de back-up staat in ${backup}.`)

  const publicCount = await printPublicExposure(moves.map((move) => move.newId))
  if (publicCount > 0) {
    console.log('Nog publieke inzendingen: waarschijnlijk binnengekomen via de oude code. Draai het script opnieuw zodra de nieuwe code live staat.')
  }
  if (!ok) process.exit(1)
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  run().catch((error) => {
    // Alleen status en melding, geen documentinhoud
    console.error(`\n❌ Mislukt${error.statusCode ? ` (HTTP ${error.statusCode})` : ''}: ${String(error.message).slice(0, 300)}`)
    process.exit(1)
  })
}
