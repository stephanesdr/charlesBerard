# Tech Context

## Stack

| Couche | Choix | Notes |
|--------|-------|-------|
| Framework | Next.js 16 App Router | vs TanStack Start — écosystème Sanity |
| CMS | Sanity v6 embedded | Studio `/studio` |
| Styling | Tailwind CSS v4 | `@import "tailwindcss"`, tokens dans `globals.css` |
| Animation | GSAP + `@gsap/react` | ScrollTrigger pour reveals |
| Rich text | `@portabletext/react` | |
| Lightbox | `yet-another-react-lightbox` | |
| Package manager | pnpm | |
| Hosting | Vercel (stadler-design) | https://charles-berard.vercel.app |
| Repo | github.com/stephanesdr/charlesBerard | |

**Non installé V1** : shadcn/ui complet (seul `cn` via clsx + tailwind-merge)

## Sanity

| Variable | Valeur / usage |
|----------|----------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `x4xhmesz` |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | `2025-01-01` |
| `SANITY_API_TOKEN` | Write — seed, local only |
| `SANITY_API_READ_TOKEN` | Read — optionnel preview |

**CORS** : localhost:3000, charles-berard.vercel.app, `*.vercel.app`

**Schema** : `src/sanity/schemaTypes/` + `sanity.config.ts` racine

**Deploy schéma cloud** : `pnpm exec sanity schema deploy` (SIGABRT local possible — Studio utilise schémas locaux)

## Commandes

```bash
pnpm dev          # http://localhost:3000
pnpm build        # production build
pnpm seed         # node scripts/seed.mjs
pnpm lint
```

Seed CSV par défaut : `~/Downloads/Projets Feuille 1.csv`  
Override : `CSV_PATH=/path/to.csv node scripts/seed.mjs`

## Structure repo clé

```
CharlesBerard/
├── memory-bank/           # Contexte persistant (Cline)
├── sanity.config.ts
├── scripts/seed.mjs
├── src/
│   ├── app/               # Routes + globals.css
│   ├── components/        # layout, blocks, portable-text, media
│   ├── lib/sanity/        # client, fetch, fallback, image
│   ├── lib/animation/
│   └── sanity/schemaTypes/
└── .cursor/rules/         # Règles agent incl. memory-bank
```

## Contraintes techniques

- Build doit passer **sans** `.env.local` (fallback data)
- Images Sanity : `cdn.sanity.io` dans `next.config.ts` remotePatterns
- FR uniquement — `lang="fr"` dans layout
- Placeholders images tant qu’assets non uploadés

## Intégrations futures (phase 2)

- `defineLive` + Visual Editing
- `sanity typegen` (script `pnpm typegen` préparé)
- Domaine custom + env tokens Vercel server-side
