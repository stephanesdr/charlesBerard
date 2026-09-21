# Active Context

> Fichier le plus volatile — mettre à jour après chaque session significative.

## Focus actuel

Homepage transposée depuis maisonauge.com : hero, marquee, services, manifeste, **index projets sticky** + rangées médias 1|2. Prochaine valeur : assets images CMS + pages projet.

## Travail récent

- **Playwright e2e** : desktop 1440 + mobile 390, `pnpm test:e2e` (12 specs vertes)
- **Index home sticky** : `ProjectIndex` / `ProjectBlock` — colonne gauche sticky, rangées `single` (1.65:1) et `pair` (0.77) + légendes
- **Lenis + GSAP** : smooth scroll sans `overflow:hidden` html/body ; parallax scale médias ; `scrollerProxy`
- **Tokens Figma** : `surface` `#fef5f9`, `ink` `#212a37`, `accent-violet` `#8537f9`, `accent-green` `#2ec864`, `violet-10`
- **Typo** : stack `"Neue Montreal"` + Inter Tight (fallback tant que `.woff2` absents dans `src/fonts/`)
- **Sanity** : `project.category`, `homeRows[]` (`homeMediaRow`), `home.projects[]`, `homeManifestoSection` ; `rows` legacy en fallback
- **Figma** : Home 3 renommé (00–06), collections `color/space/radius/type`, styles Display/H2/Body/Caption/Tag, grille 12 col, composants Caption/Marquee/MediaRow/ProjectHeader
- Seed CSV v2 : `scripts/templates/projets-v2.csv`

## Décisions actives

| Décision | Raison |
|----------|--------|
| Référence index = maisonauge sticky | Lisibilité par bloc projet, rythme 1\|2 médias |
| PP Neue Montreal (Inter Tight fallback) | Alignement Figma + référence |
| `homeRows` par projet, plus `homeProjectRow` 1\|2 projets | Un projet = un bloc sticky |
| `brand` rouge secondaire | Accents Figma violet/vert pour la nav |
| Pas de overflow hidden html/body | A11y / scroll natif (point faible maisonauge) |
| `h1` unique + `h2` projets | SEO / lecteurs d’écran vs split spans |
| `basePath: "/studio"` obligatoire | Next.js embedded Studio |
| Fallback data si pas d’env | Build Vercel / CI sans secrets |

## Prochaines étapes suggérées

1. Déposer `.woff2` Neue Montreal dans `src/fonts/` et basculer `next/font/local`
2. Upload images couverture + `homeRows` dans Studio
3. Pages projet / à-propos dans le même système visuel
4. Domaine custom
5. Visual Editing / `defineLive`

## Patterns à respecter

- Lire `memory-bank/` avant tâches non triviales
- Après changements architecture : `activeContext.md` + `progress.md`
- Ne pas committer `.env.local` ni tokens
- Home : `font-display`, `font-h2`, `font-body`, `font-caption`, `font-tag`
- Index : `data-project-block` / `data-media-row`
- Nouveaux projets sans `orderRank` : `pnpm patch-order-rank` après import bulk

## Fichiers sensibles

- `.env.local` — tokens Sanity
- CSV gabarit : `scripts/templates/projets-v2.csv`
