# Project Brief — Charles Berard

## Vision

Portfolio éditorial pour **Charles Berard**, direction graphique indépendante (print, identité, scénographie, gestion de projet). Le site doit refléner un niveau de design « top tier », avec une grille éditoriale soignée et une navigation minimaliste.

## Objectifs

1. **Portfolio CMS** — Projets éditables via Sanity Studio, contenu seed depuis CSV client.
2. **Référence visuelle contenu** — Grille et mise en page inspirée de [grillitype.com](https://www.grillitype.com/) (14 colonnes, labels, hiérarchie éditoriale).
3. **Référence navigation** — Header style [area-font.eu](https://area-font.eu/) (boutons fixes, pas menu hamburger Blaze Type).
4. **Langue** — Français uniquement (FR).
5. **Déploiement** — Vercel + GitHub, domaine Vercel pour l’instant.

## Périmètre V1 (livré)

- Home : liste projets en grille
- Pages projet `/projets/[slug]` avec Portable Text + galerie lightbox
- Pages `/a-propos` et `/contact` (contenu CMS + seed)
- Sanity embedded Studio `/studio`
- Images placeholder jusqu’à assets client
- Statut projet `concept` pour axes non sélectionnés (ex. Brussels Food Campus) — travail présenté, pas masqué

## Hors périmètre V1

- Shop / panier / login
- Blog / articles
- Font tester interactif (Grilli typeface)
- Visual Editing / `defineLive` (phase 2)
- i18n

## Sources de vérité contenu

- CSV client : `Projets Feuille 1.csv` (4 projets)
- Sanity dataset `production` sur projet `x4xhmesz`
- Fallback local : `src/lib/sanity/fallback-data.ts` (build sans env)

## Critères de succès

- Contenu éditable dans Studio sans toucher au code
- Responsive 390 / 768 / 1440
- Build Vercel stable avec variables Sanity publiques
- Memory bank maintenue à jour après changements significatifs
