# Active Context

> Fichier le plus volatile — mettre à jour après chaque session significative.

## Focus actuel

Studio Sanity stabilisé en prod ; home éditoriale + stack UI/Typo en place. Prochaine valeur : assets images CMS.

## Travail récent

- **Presentation Tool** : `presentationTool` + `resolve` (home, project, page) + draft mode API + `VisualEditing`
- **Studio embedded** : `basePath: "/studio"` dans `sanity.config.ts` + `sanity.cli.ts` (fix « Tool not found: studio »)
- **orderRank** : `scripts/patch-order-rank.mjs` + `pnpm patch-order-rank` — 4 projets production patchés
- **Route groups** : `(site)/` = header/footer/container ; `studio/` = plein viewport (`h-dvh`)
- **Hydration dev** : `suppressHydrationWarning` sur `<html>` / `<body>` (extensions navigateur, ex. HireCarta)
- **Page builder home** : `home.sections` (`homeIntroSection`, `homeProjectIndexSection`)
- Index projets **1 col / 2 col** (section + span `wide` par projet)
- **`@sanity/orderable-document-list`** — ordre global projets (`orderRank`)
- **shadcn** base-nova + thème Charles Berard + `container` Tailwind
- **Space Mono** — typo texte, proportions calées sur grillitype.com

## Décisions actives

| Décision | Raison |
|----------|--------|
| `basePath: "/studio"` obligatoire | Next.js embedded Studio — sans ça, routing outil cassé |
| `suppressHydrationWarning` racine | Extensions modifient `<html>` avant hydrate |
| Menu area-font | Consigne client |
| `projectStatus: concept` → badge « Axe » | Brussels Food Campus |
| Rouge CB = `brand` / `primary`, pas `accent` shadcn | Éviter conflit tokens |
| `projectSource: all \| manual` sur index home | Flexibilité éditeur |
| Space Mono pour tout le texte | Consigne client ; échelle Grilli conservée |
| Fallback data si pas d’env | Build Vercel / CI sans secrets |

## Prochaines étapes suggérées

1. Commit + push `layout.tsx` (suppressHydrationWarning) si pas encore poussé
2. Upload images couverture + galerie dans Studio
3. Domaine custom
4. Visual Editing / `defineLive`
5. Animations transitions page

## Patterns à respecter

- Lire `memory-bank/` avant tâches non triviales
- Après changements architecture : `activeContext.md` + `progress.md`
- Ne pas committer `.env.local` ni tokens
- Typo : utiliser `font-m`, `font-label`, `font-xxl` (pas des tailles ad hoc)
- Nouveaux projets sans `orderRank` : `pnpm patch-order-rank` après import bulk

## Fichiers sensibles

- `.env.local` — tokens Sanity
- CSV : `~/Downloads/Projets Feuille 1.csv`
