# Project Brief — Charles Berard

## Vision

Portfolio éditorial pour **Charles Berard**, direction graphique indépendante (print, identité, scénographie, gestion de projet). Le site doit refléner un niveau de design « top tier », avec une grille éditoriale soignée et une navigation minimaliste.

## Objectifs

1. **Portfolio CMS** — Projets éditables via Sanity Studio, contenu seed depuis CSV client.
2. **Référence visuelle home** — [maisonauge.com](https://maisonauge.com/) (index sticky + rangées médias) et Figma Home 3.
3. **Référence navigation** — Header style [area-font.eu](https://area-font.eu/) (boutons pills, pas hamburger).
4. **Langue** — Français uniquement (FR).
5. **Déploiement** — Vercel + GitHub, domaine Vercel pour l’instant.

## Périmètre V1 (livré)

- Home : hero, marquee, services, manifeste, index sticky + rangées médias
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

- Gabarit CSV : `scripts/templates/projets-v2.csv`
- Analyse référence : `docs/reference-analysis-maisonauge.md`
- Sanity dataset `production` sur projet `x4xhmesz`
- Fallback local : `src/lib/sanity/fallback-data.ts` (build sans env)

## Critères de succès

- Contenu éditable dans Studio sans toucher au code
- Responsive 390 / 768 / 1440
- Build Vercel stable avec variables Sanity publiques
- Memory bank maintenue à jour après changements significatifs
