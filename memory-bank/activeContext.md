# Active Context

> Fichier le plus volatile — mettre à jour après chaque session significative.

## Focus actuel

Mise en place de la **memory-bank** (méthodologie Cline) pour persistance du contexte agent entre sessions.

## Travail récent

- Portfolio Next.js + Sanity scaffold complet
- Projet Sanity `x4xhmesz` créé via plugin Sanity MCP
- Seed `scripts/seed.mjs` depuis CSV (4 projets + pages + settings)
- Deploy Vercel + variables `NEXT_PUBLIC_SANITY_*`
- Menu **area-font** (boutons fixes), grille **Grilli**, FR

## Décisions actives

| Décision | Raison |
|----------|--------|
| Menu area-font, pas Blaze Type | Consigne client |
| `projectStatus: concept` pour axes | Brussels Food Campus affiché avec badge « Axe » |
| Fallback data si pas d’env | Build Vercel / CI sans secrets |
| Memory bank en français | Aligné produit et client |
| Pas de shadcn full en V1 | Scope minimal, Tailwind suffisant |

## Prochaines étapes suggérées

1. Upload images couverture + galerie dans Studio pour chaque projet
2. Résoudre `sanity schema deploy` local (esbuild / approve-builds) si besoin schéma cloud
3. Ajouter `SANITY_API_READ_TOKEN` sur Vercel si preview live
4. Polish animations (transitions page, orchestrator)
5. Domaine custom quand disponible

## Patterns à respecter

- Lire `memory-bank/` avant tâches non triviales
- Après changements architecture/contenu : mettre à jour `activeContext.md` + `progress.md`
- Ne pas committer `.env.local` ni tokens
- Garder seed.mjs aligné avec schéma Sanity

## Fichiers sensibles session

- `.env.local` — tokens Sanity (local)
- CSV source : `/Users/stephanestadler/Downloads/Projets Feuille 1.csv`
