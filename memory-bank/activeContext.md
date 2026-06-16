# Active Context

> Fichier le plus volatile — mettre à jour après chaque session significative.

## Focus actuel

Home éditoriale complète + stack UI/Typo stabilisée pour production.

## Travail récent

- **Page builder home** : `home.sections` (`homeIntroSection`, `homeProjectIndexSection`)
- Index projets **1 col / 2 col** (section + span `wide` par projet)
- **`@sanity/orderable-document-list`** — ordre global projets (`orderRank`)
- **shadcn** base-nova + thème Charles Berard + `container` Tailwind
- **Space Mono** — typo texte, proportions calées sur grillitype.com
- Grille index typographique (sans vignettes) style Grilli

## Décisions actives

| Décision | Raison |
|----------|--------|
| Menu area-font | Consigne client |
| `projectStatus: concept` → badge « Axe » | Brussels Food Campus |
| Rouge CB = `brand` / `primary`, pas `accent` shadcn | Éviter conflit tokens |
| `projectSource: all \| manual` sur index home | Flexibilité éditeur |
| Space Mono pour tout le texte | Consigne client ; échelle Grilli conservée |
| Fallback data si pas d’env | Build Vercel / CI sans secrets |

## Prochaines étapes suggérées

1. `pnpm seed` si home Sanity encore sur ancien schéma (intro plat)
2. Upload images couverture + galerie dans Studio
3. Domaine custom
4. Visual Editing / `defineLive`
5. Animations transitions page

## Patterns à respecter

- Lire `memory-bank/` avant tâches non triviales
- Après changements architecture : `activeContext.md` + `progress.md`
- Ne pas committer `.env.local` ni tokens
- Typo : utiliser `font-m`, `font-label`, `font-xxl` (pas des tailles ad hoc)

## Fichiers sensibles

- `.env.local` — tokens Sanity
- CSV : `~/Downloads/Projets Feuille 1.csv`
