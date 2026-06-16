# Vercel + Sanity

## Intégration marketplace

1. [Sanity sur Vercel Marketplace](https://vercel.com/integrations/sanity) → Add Integration → projet `charles-berard`
2. L’intégration provisionne `NEXT_PUBLIC_SANITY_*`, `SANITY_API_WRITE_TOKEN`, etc.
3. Ce repo lit aussi les alias Vercel (`SANITY_API_PROJECT_ID`, `SANITY_API_WRITE_TOKEN`).

## Variables requises

| Variable | Usage |
|----------|--------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Client Next.js + Studio |
| `NEXT_PUBLIC_SANITY_DATASET` | Dataset |
| `NEXT_PUBLIC_SANITY_API_VERSION` | API version |
| `NEXT_PUBLIC_SITE_URL` | Presentation Tool preview (`https://charles-berard.vercel.app`) |
| `SANITY_API_READ_TOKEN` | Draft mode + Presentation preview |
| `SANITY_API_TOKEN` ou `SANITY_API_WRITE_TOKEN` | Seed local (`pnpm seed`) |

## Sync local → Vercel

Projet lié : `stadler-design/charles-berard` (`.vercel/` après `vercel link`).

```bash
pnpm sync-vercel-env   # pousse .env.local vers production + development
npx vercel env pull .env.local   # inverse : Vercel → local
```

## CORS Sanity

Origines configurées sur `x4xhmesz` :

- `http://localhost:3000`
- `https://charles-berard.vercel.app`
- `https://*.vercel.app`

Via Sanity MCP : `add_cors_origin` si nouveau domaine.

**Preview** : dans Vercel → Settings → Environment Variables, cocher **Preview** sur les mêmes clés (ou dupliquer depuis Production).

## Déploiement

Push sur `main` → déploiement auto Vercel. Studio : `/studio`, Presentation : `/studio/presentation`.
