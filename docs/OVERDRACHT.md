# Overdracht barakahconnect.nl

Voor de nieuwe developer (de website is van de opdrachtgever Mory van Barakah Connect; de vorige beheerder draagt het beheer over). Dit document beschrijft wat de site is, wat hij nodig heeft om te draaien, hoe je lokaal
werkt en hoe er live gaat. Het bevat bewust geen geheimen: waarden van wachtwoorden en tokens horen in een
wachtwoordmanager, niet in de repo.

Stand: 3 november 2026. Wat hier niet is nagegaan staat bij elk onderdeel genoemd en verzameld onder
[Nog te controleren bij de overdracht](#nog-te-controleren-bij-de-overdracht).

## Wat is het

De website van Barakah Connect, een islamitische netwerkgemeenschap in Nederland: bijeenkomsten, sprekers en gasten,
pakketten, aanmeldformulieren en een ticketshop. Live op https://www.barakahconnect.nl (het kale domein stuurt door
naar `www`).

## Stack

| Onderdeel | Keuze |
|---|---|
| Framework | Next.js 16 (App Router), React 19, TypeScript. Let op: `AGENTS.md` waarschuwt dat deze Next.js-versie afwijkt van wat je kent; lees de gids in `node_modules/next/dist/docs/` voor je iets bouwt. |
| Inhoud | Sanity v5 (project `z7hlx5cz`, dataset `production`), met de Studio ingebouwd op `/studio` |
| Styling | Tailwind CSS 4, `styled-components` voor de Studio |
| Mail | `nodemailer` over SMTP, voor meldingen van formulieren |
| Pakketbeheer | pnpm; Vercel draait Node 24.x (de repo legt geen versie vast) |
| Hosting | Vercel, project `barakah-connect` |

Mappen: `app/(site)/` pagina's, `app/api/` routes, `components/`, `sanity/schemaTypes/` inhoudstypes, `sanity/studio/`
Studio-opzet (menu, startscherm, alleen concepten), `scripts/` losse hulpscripts, `public/` vaste bestanden.

## Lokaal draaien

```bash
git clone https://github.com/Alpakash/BarakahConnect.git
cd BarakahConnect
pnpm install
pnpm dev        # http://localhost:3000, Studio op http://localhost:3000/studio
```

Voor de site zelf heb je geen `.env.local` nodig: project-id en dataset van Sanity hebben ingebouwde standaardwaarden in
`sanity/env.ts`. De hulpscripts in `scripts/` hebben die standaardwaarden niet en hebben `NEXT_PUBLIC_SANITY_PROJECT_ID`
en `NEXT_PUBLIC_SANITY_DATASET` wel nodig in `.env.local`. `README.md` is op onderdelen verouderd (Node 20+, een
placeholder-kloon-URL, een verplichte `.env.local`); volg dit document en werk de README bij in een kleine vervolg-PR. Andere commando's: `pnpm build`, `pnpm start`, `pnpm lint`. Er zijn geen geautomatiseerde tests.

### Omgevingsvariabelen (alleen de namen)

| Naam | Waarvoor | Verplicht |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity-project; valt terug op `z7hlx5cz` | nee voor de site, ja voor de scripts |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity-dataset; valt terug op `production` | nee voor de site, ja voor de scripts |
| `NEXT_PUBLIC_SANITY_API_VERSION` | API-versie; valt terug op `2024-04-20` | nee |
| `SANITY_API_WRITE_TOKEN` | Schrijftoken (Editor). Slaat formulierinzendingen op in Sanity; ook voor de scripts. Zonder dit komen inzendingen alleen per e-mail binnen. | nee, maar zonder token komen inzendingen alleen per mail binnen |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | Mailserver voor de meldingsmail (poort standaard 465) | nee, maar zonder mail komen inzendingen alleen in Sanity |
| `SMTP_SECURE` | `false` voor STARTTLS (poort 587); standaard `true` (poort 465) | nee |
| `SMTP_FROM` | Afzenderadres; valt terug op `SMTP_USER` | nee |
| `SANITY_PREVIEW_SECRET` | Optioneel slot op `/api/draft-mode/enable`. Zet dit **niet** aan zonder te testen: de Presentatie-tool in Studio stuurt dit geheim niet mee en raakt dan geblokkeerd. | nee |

In Vercel staan nu (gecontroleerd 3 nov 2026, alleen namen): `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`
voor Production en Preview; `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET` en
`SANITY_API_WRITE_TOKEN` alleen voor Production. Preview-deploys hebben dus geen schrijftoken: formulieren slaan daar
niets op in Sanity. De waarden zijn niet uit te lezen en horen via een wachtwoordmanager van de huidige beheerder naar
de nieuwe. `SMTP_SECURE`, `SMTP_FROM` en `SANITY_PREVIEW_SECRET` staan niet in Vercel (`SMTP_FROM` valt terug op `SMTP_USER`, daarna op `no-reply@barakahconnect.nl`); het mailadres waarop meldingen
binnenkomen (`info@barakahconnect.nl`) staat vast in `app/api/submissions/route.ts`.

**Er is maar één dataset (`production`).** Elk schrijftoken, ook een eigen, schrijft dus naar de live inhoud. Lokaal een
formulier testen slaat een echte inzending op in productie, en `pnpm seed` (`scripts/seed-content.mjs`) overschrijft de
gepubliceerde homepage (`mainHomePage`). Draai de scripts alleen bewust. Wil je veilig testen, maak dan eerst een aparte
dataset (bijvoorbeeld `development`) en kies die met `NEXT_PUBLIC_SANITY_DATASET`.

Preview-deploys hebben wel `SMTP_*`: een formulier testen op een preview-URL stuurt een echte mail naar
`info@barakahconnect.nl`, terwijl de inzending niet in Sanity komt.

## Uitrol

Vercel bouwt automatisch vanuit de GitHub-repo `Alpakash/BarakahConnect`:

- merge op `main` geeft een productie-uitrol naar barakahconnect.nl;
- elke andere branch of PR krijgt een preview-URL en een statuscheck "Vercel".

De repo heeft geen eigen CI-bestanden (`.github/` bestaat niet) en geen branch protection: alles wat gemerged wordt, gaat
live. Bouw dus altijd eerst lokaal met `pnpm build` en bekijk de preview. Terugdraaien kan in Vercel (Deployments,
vorige uitrol opnieuw promoten). De Studio-inhoud staat los van de code: publiceren in Sanity werkt direct, zonder
nieuwe uitrol.

## Inhoud (Sanity en handleiding)

- Studio: https://www.barakahconnect.nl/studio. Inloggen gaat met een eigen Sanity-account dat als lid van het project is
  toegevoegd; de Studio kent geen eigen wachtwoorden.
- `HANDLEIDING-STUDIO.md` is de handleiding voor de redacteur (bijeenkomst online zetten, aanpassen, verwijderen). Houd
  hem bij als de Studio verandert.
- De Studio is bewust eenvoudig gehouden: alleen concepten bewerken, geen releases, ingeplande concepten of taken. De tab
  Presentatie (live meekijken) is er alleen voor leden met de rol `administrator` (`sanity.config.ts`).
- Formulierinzendingen komen binnen als documenten met een id dat met `submissions.` begint. Dat is bewust: Sanity
  levert alleen documenten met een punt in het id aan ingelogde gebruikers, zodat persoonsgegevens niet publiek zijn.
  Maak inzendingen nooit met de hand in Studio aan en verander dit id-voorvoegsel niet.
- De dataset zelf is publiek leesbaar (dat is nodig voor de site). Alles wat in Sanity gepubliceerd staat, is dus
  openbaar.
- Hulpscripts in `scripts/` (alle drie lezen `.env.local`): `seed-content.mjs` (startinhoud, `pnpm seed`),
  `add-promo-videos.mjs` (`pnpm add-promo-videos`), `migrate-submissions.mjs` (eenmalig: oude inzendingen naar een privé-id;
  vraagt om bevestiging). Draai ze niet zonder te lezen wat ze schrijven; ze gebruiken het schrijftoken.

## Externe diensten

| Dienst | Hoe de site het gebruikt | Waar het zit |
|---|---|---|
| GitHub | Broncode, publieke repo `Alpakash/BarakahConnect` | Persoonlijk account van de huidige beheerder, geen organisatie |
| Vercel | Hosting, project `barakah-connect`, team `alpakashs-projects` (Hobby-plan), regio Frankfurt | Persoonlijk team van de huidige beheerder |
| Sanity | Inhoud en Studio, project `z7hlx5cz` | Ledenlijst en rollen: niet nagegaan, zie onderaan |
| Domein `barakahconnect.nl` | Staat aan bij Vercel als domein van het project; het kale domein stuurt door naar `www` | Nameservers `pdns1/pdns2.registrar-servers.com` (Namecheap-DNS). Registrar, eigenaar en betaalmethode: niet nagegaan |
| E-mail | Inkomende mail via Google (de MX-record wijst naar `smtp.google.com`); meldingen gaan via SMTP naar `info@barakahconnect.nl` | Welke SMTP-aanbieder er achter `SMTP_HOST` zit, is niet af te leiden uit de code |
| Weeztix | Ticketshop, ingebed via `components/WeeztixShop.tsx` en `WeeztixModal.tsx`; de shop-URL staat in de code | Weeztix-account van de organisator, niet van de code afhankelijk |
| Meta Pixel | Advertentiemeting, vast pixel-id in `components/MetaPixel.tsx` | Meta Business-account: niet nagegaan |
| TikTok Pixel | Advertentiemeting, vast pixel-id in `components/TikTokPixel.tsx` | TikTok Ads-account: niet nagegaan |
| GitGuardian | GitHub-app die op PR's naar uitgelekte geheimen zoekt (check "GitGuardian Security Checks") | Gekoppeld aan het GitHub-account van de huidige beheerder |
| Vercel-apps op GitHub | Checks "Vercel" en "Vercel Preview Comments" | Hoort bij het Vercel-project |

Let op:

- De repo is **publiek**. Zet nooit een geheim in de code, in een PR of in een commit; ook niet tijdelijk.
- Een Vercel Hobby-account is bedoeld voor persoonlijk, niet-commercieel gebruik. Voor een site van een organisatie hoort
  het project in een Pro-team (of een team van de nieuwe beheerder met passend plan). Controleer dit bij de verhuizing.
- De pixels tellen alle bezoekers zonder toestemmingsbanner (er is geen cookiebanner in de code gevonden). Dat is een
  AVG/cookiewet-punt dat bij de nieuwe beheerder en Mory ligt.

## Werkafspraken die in de repo zichtbaar zijn

Er is geen CONTRIBUTING-bestand; dit is wat de geschiedenis laat zien:

- Werk gaat via een branch en een pull request op `main`; alle 18 eerdere PR's zijn zo gemerged. Branches heten
  `feat/…` of `claude/…`. Commitberichten zijn in het Nederlands of Engels, vaak met `feat:` of `fix:` ervoor.
- Een PR krijgt automatisch een Vercel-preview en een GitGuardian-check; die moeten groen zijn.
- De checks `review/claude` en `review/klaar` op eerdere PR's komen uit de werkwijze van de vorige beheerder en zijn niet
  in de repo vastgelegd. Ze verdwijnen na de overdracht. Spreek zelf af wie reviewt; aanrader: iedere PR door een
  tweede paar ogen, en branch protection op `main` aanzetten met "pull request vereist" en de Vercel-check verplicht.
- De PR-tekst begon in de laatste PR's met een korte samenvatting in gewone taal. Behouden is aan te raden.
- Teksten voor bezoekers staan in het Nederlands.

## Openstaande punten

Uit `TASKS.md`:

- Na zondag 13 december 2026: `/e-commerce-event` opruimen. Haal de pagina weg of stuur hem door naar `/bijeenkomsten`
  en haal de regel uit `app/sitemap.ts`. De ticketshop op die pagina is de algemene Weeztix-shop en blijft anders
  zichtbaar.

- `README.md` bijwerken (verouderde Node-versie, placeholder-kloon-URL, verplichte `.env.local`) en laten verwijzen naar dit
  document.

Pull requests: PR 19 (eventpagina's die de redacteur zelf in Sanity maakt) en PR 21 (stijlupdate) zijn gemerged; op
moment van schrijven staat alleen deze overdracht-PR nog open. Controleer `gh pr list` voor de actuele stand.

## Nog te controleren bij de overdracht

Deze punten zijn niet vanuit de code of het openbare internet vast te stellen:

1. Of Node 24.x in Vercel nog klopt; de repo legt geen versie vast (geen `engines`, geen `.nvmrc`).
2. Wie lid is van Sanity-project `z7hlx5cz`, met welke rol, en welke API-tokens, CORS-origins en webhooks er bestaan.
3. Bij welke registrar en op wiens naam `barakahconnect.nl` staat, wanneer het verloopt en wie de DNS bij Namecheap kan
   wijzigen.
4. Welke SMTP-aanbieder achter `SMTP_HOST` zit en op wiens account.
5. Wie de eigenaar is van het Meta-, TikTok- en Weeztix-account.
6. Of er nog andere GitHub-apps of -webhooks aan de repo hangen (de ledenlijst van de repo toont alleen de eigenaar als
   collaborator).
