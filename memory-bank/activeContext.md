# Active Context

> Fichier le plus volatile — mettre à jour après chaque session significative.

## Focus actuel

Home et About alignées sur les maquettes Figma, avec contenu About structuré dans Sanity et hero Three.js accessible.

## Travail récent

- **About Figma** : grille éditoriale 1352px, colonnes 482/656px, rythme 230px, typographies/sections/footer dédiés et responsive mobile
- **Hero About shader** : `CHARLES / BéRARD` en texture Canvas locale sur plane Three.js subdivisé, déplacement pointer + ombre, géométrie synchronisée au `h1` HTML
- **Cycle WebGL** : DPR limité, `ResizeObserver`, pause hors viewport, context loss, disposal complet et fallback HTML en reduced-motion/échec WebGL
- **About Sanity** : objet structuré (hero, standfirst, clients, sections Portable Text, manifeste, conclusion, footer), `page-a-propos` migré et publié
- **Navigation active** : état violet dérivé de `usePathname`, lien inactif vert et `aria-current="page"`
- **Validation About** : géométrie Figma vérifiée à 1512px, fallback mobile/reduced-motion vérifié, 20 tests Playwright verts sur desktop/mobile
- **Intro media Sanity** : `homeIntroMedia` image ou vidéo MP4/WebM, poster/alt, autoplay silencieux hors reduced-motion et bouton play/pause accessible
- **Premier viewport Figma** : menu HOME / ABOUT centré sans wordmark secondaire ; titre à 10dvh, média centré à 40dvh avec 12px de débordement sous un viewport 1920×1080 ; marquee en arrière-plan
- **Marquee first viewport** : couche `z-10` derrière le média `z-30`, fade CSS dès `scrollY > 2`, retour visible uniquement en haut, reduced-motion sans transition
- **Navigation anglaise** : HOME / ABOUT, route canonique `/about`, redirection permanente `/a-propos`, document Sanity migré et publié
- **Feature flag** : `PROJECT_LINKS_ENABLED=false` par défaut et configuré sur Vercel (production/preview/development) ; cover statique sans faux lien quand désactivé
- **Grille home** : conteneur global 90rem, espace sticky/content > 100px, captions 14px, row gap 20dvh / stagger 8dvh
- **Validation** : typecheck, lint, build et 20 tests Playwright desktop/mobile verts
- **Playwright e2e** : desktop 1440 + mobile 390, `pnpm test:e2e` (20 tests verts, 4 skips ciblés)
- **Index home sticky** : `ProjectIndex` / `ProjectBlock` — colonne gauche sticky, rangées `single` (1.65:1) et `pair` (0.77) + légendes
- **Lenis + GSAP** : smooth scroll sans `overflow:hidden` html/body ; parallax scale médias ; `scrollerProxy`
- **Tokens Figma** : `surface` `#fef5f9`, `ink` `#212a37`, `accent-violet` `#8537f9`, `accent-green` `#2ec864`, `violet-10`
- **Typo** : stack `"Neue Montreal"` + Inter Tight (fallback tant que `.woff2` absents dans `src/fonts/`)
- **Sanity** : `project.category`, `homeRows[]` (`homeMediaRow`), `home.projects[]`, `homeManifestoSection` ; `rows` legacy en fallback
- **Figma** : Home 3 renommé (00–06), collections `color/space/radius/type`, styles Display/H2/Body/Caption/Tag, grille 12 col, composants Caption/Marquee/MediaRow/ProjectHeader
- **Google Sheet client mis à jour** : onglets `Projets v2` (gid `781421263`, 19 colonnes, 4 projets) + `Structure colonnes` ; `Feuille 1` legacy conservée. Export CSV public → `pnpm seed` (vérifié 0 diff avec le miroir repo)
- Seed CSV v2 : `scripts/templates/projets-v2.csv` (miroir du Sheet)

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
| UI/URLs publiques en anglais | Un seul langage public, sans couche i18n |
| Dark mode reporté | Attendre la maquette About dédiée |

## Prochaines étapes suggérées

1. Renseigner l’image ou la vidéo d’intro dans le singleton Home Sanity
2. Traduire les contenus éditoriaux CMS encore en français
3. Déposer `.woff2` Neue Montreal dans `src/fonts/` et basculer `next/font/local`
4. Activer `PROJECT_LINKS_ENABLED=true` quand les pages projet seront prêtes
5. Dark mode après validation finale du contenu About
6. Domaine custom

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
- Google Sheet client : `1yLcbjm6QTVtzUvIui47mzSf6LQqLyRA6cmYQgnQAUTU` (édition anonyme — ne pas écraser `Feuille 1`)
