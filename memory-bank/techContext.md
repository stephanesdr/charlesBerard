# Tech Context

## Stack

| Couche | Choix | Notes |
|--------|-------|-------|
| Framework | Next.js 16 App Router | vs TanStack Start — écosystème Sanity |
| CMS | Sanity v6 embedded | Studio `/studio` |
| Styling | Tailwind CSS v4 | `@import "tailwindcss"`, tokens dans `globals.css` |
| UI | shadcn base-nova | `button` + thème CB dans `globals.css` |
| Animation | GSAP + `@gsap/react` + Lenis | ScrollTrigger + scrollerProxy ; pas d’overflow hidden html/body |
| Tests | Playwright | `pnpm test:e2e` — desktop 1440, mobile 390 |
| Rich text | `@portabletext/react` | |
| Lightbox | `yet-another-react-lightbox` | |
| Package manager | pnpm | |
| Hosting | Vercel (stadler-design) | https://charles-berard.vercel.app |
| Repo | github.com/stephanesdr/charlesBerard | |

## Typographie

| Élément | Font | Échelle |
|---------|------|---------|
| Stack global | **Neue Montreal** + Inter Tight fallback | Body 22px / lh 1.3 |
| Display | `font-display` | clamp 3rem–156px / lh 1.2 |
| H2 | `font-h2` | 30px |
| Caption / Tag | `font-caption` / `font-tag` | 20px / 12px tracking 0.6 |

Variable CSS : `--font-inter-tight` (layout) ; `font-family` commence par `"Neue Montreal"`. Woff2 à placer dans `src/fonts/`.

## Sanity

| Variable | Valeur / usage |
|----------|----------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `x4xhmesz` |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | `2025-01-01` |
| `SANITY_API_TOKEN` | Write — seed, local only |
| `SANITY_API_READ_TOKEN` | Read — optionnel preview |

**Plugins Studio** : `@sanity/orderable-document-list`, `presentationTool` (`sanity/presentation`)

**Presentation** : `src/sanity/presentation/resolve.ts` — locations home / project / page ; draft mode `/api/draft-mode/enable|disable` ; `SANITY_API_READ_TOKEN` requis en preview

**Embedded Studio** : `basePath: "/studio"` dans `sanity.config.ts` et `sanity.cli.ts` (`project.basePath`) — **obligatoire** avec `app/studio/[[...tool]]/page.tsx`

**CORS** : localhost:3000, charles-berard.vercel.app, `*.vercel.app`

**Schema** : `src/sanity/schemaTypes/` + `sanity.config.ts` racine

**Structure** : `src/sanity/structure/index.ts` — singletons + liste orderable projets

**Deploy schéma cloud** : `pnpm exec sanity schema deploy` (SIGABRT local possible — Studio utilise schémas locaux)

## Commandes

```bash
pnpm dev          # http://localhost:3000
pnpm build        # production build
pnpm seed         # node scripts/seed.mjs (CSV v2 par défaut)
pnpm test:e2e     # Playwright desktop + mobile
pnpm test:e2e:home  # e2e sans spec @reference
pnpm patch-order-rank  # backfill orderRank sur projets legacy
pnpm lint
```

Seed CSV par défaut : `scripts/templates/projets-v2.csv`  
Override : `CSV_PATH=/path/to.csv node scripts/seed.mjs`  
Depuis le Sheet client : export public `…/export?format=csv&gid=781421263` → `CSV_PATH` (voir `docs/content-structure.md`)

**orderRank** : format seed/patch `0|${100000 + index * 4096}:` — lancer `pnpm patch-order-rank` si docs créés avant le champ

## Structure repo clé

```
CharlesBerard/
├── memory-bank/           # Contexte persistant (Cline)
├── docs/shadcn-registry.md
├── sanity.config.ts       # basePath: "/studio"
├── sanity.cli.ts
├── scripts/
│   ├── seed.mjs
│   └── templates/projets-v2.csv
├── tests/e2e/           # Playwright
├── docs/                # audit référence + structure contenu
├── src/
│   ├── app/
│   │   ├── layout.tsx           # html/body racine, suppressHydrationWarning
│   │   ├── (site)/              # pages publiques + header/footer
│   │   ├── studio/              # NextStudio plein viewport
│   │   └── globals.css
│   ├── components/        # layout, blocks, ui, portable-text, media
│   ├── lib/sanity/        # client, fetch, fallback, image
│   ├── lib/animation/
│   ├── sanity/schemaTypes/blocks/  # home page builder
│   └── sanity/structure/
└── .cursor/rules/         # Règles agent incl. memory-bank
```

## Contraintes techniques

- Build doit passer **sans** `.env.local` (fallback data)
- Images Sanity : `cdn.sanity.io` dans `next.config.ts` remotePatterns
- FR uniquement — `lang="fr"` dans layout
- Placeholders images tant qu’assets non uploadés
- Classe Tailwind `container` — max 90rem, padding responsive
- `suppressHydrationWarning` sur `<html>` / `<body>` — extensions navigateur modifient le DOM racine en dev

## Intégrations futures (phase 2)

- `defineLive` + Visual Editing
- `sanity typegen` (script `pnpm typegen` préparé)
- Domaine custom + env tokens Vercel server-side
