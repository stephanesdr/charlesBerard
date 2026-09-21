# Analyse de référence — maisonauge.com

Audit Playwright (desktop 1200 / 1440 et mobile 390) du site [maisonauge.com](https://maisonauge.com/). Baseline rejouable : `tests/e2e/reference.maisonauge.spec.ts` (`@reference`).

Captures : `docs/assets/maisonauge-desktop.png`, `docs/assets/maisonauge-mobile.png`.

## Stack observée

| Couche | Choix |
|--------|--------|
| Framework | Next.js (Turbopack en dev) |
| CMS | Prismic |
| Scroll | Lenis (smooth scroll) |
| Animation | GSAP (split chars / words, parallax scale) |
| Typo | PP Neue Montreal Bold (une famille) |
| CSS | Tailwind (classes utilitaires, `dvh`, `mix-blend-difference`) |

## Structure DOM `main`

1. **Preloader** — `h-[100dvh] z-[100]`
2. **Hero** — `min-h-[100dvh] px-[45px] justify-end`
3. **Manifesto** — `py-[20dvh]`
4. **Index projets** — `relative z-[30]`
5. **Footer** — `bg-[#222A36]`

Éléments fixes hors flux :

- Marquee bas `h-[100px] mix-blend-difference`
- Logo haut `pointer-events-none`

## Bloc projet (desktop 1200)

Chaque bloc ≈ `flex`, hauteur ≈ 2×100dvh. **5 blocs** sur la home.

- **Colonne gauche** `sticky top-0 h-[100dvh] justify-end pb-[15dvh]` (x 100→300, 2/12) :
  - titre 24px uppercase, split chars
  - catégorie 14px
  - lien « View project » enveloppant la cover 200×299 (ratio 2:3)
- **Colonne droite** (x 400→1100, 7/12) `flex-col gap-[15dvh]` :
  - 2 groupes = rangée médias + légende 14px (max ~500px)
  - Rangée A : 1 média 700×424 (≈1.65:1)
  - Rangée B : 2 médias 302×392 (≈0.77) `flex-1`, le second `-translate-y-[15dvh]`
  - Ordre A/B **alterné** à chaque projet
- Images `absolute inset-0 object-cover` sur wrapper `overflow-hidden`, scale ≈1.2 (parallax Lenis)

## Mobile 390

- `flex-col`, padding 20px
- Cover `w-1/2`
- Rangées `gap-6`
- Pair = 2× `flex-1`

## Design system observé

- **1 famille** : Neue Montreal Bold
- **Échelle** : 12 / 13 / 14 / 15 / 16 / 18.7 / 20 / 24 / 31.2 / 159px
- **Casse** : tout uppercase sauf légendes
- **Couleurs** : 2 teintes + inversion footer
- **Grille** : 12 col, marge 100px @1200
- **Espacements** : `dvh` (15 / 20 / 10)
- **Micro-interactions** : split chars/words au scroll, hover cursor custom

## Points forts à transposer

- Lisibilité de l’index par **bloc projet** (titre sticky + médias)
- Rythme **1 | 2 médias**
- Sticky qui contextualise chaque projet pendant le scroll
- Sobriété des tokens (peu de couleurs, une famille)

## Points faibles à éviter

| Problème | Impact | Mitigation Charles Berard |
|----------|--------|---------------------------|
| `overflow: hidden` sur `html` + `body` | Scroll natif cassé, a11y clavier / lecteurs | Lenis sans lock overflow ; `overflow` visible |
| `img` sans `sizes` / lazy | Perf, LCP | `next/image` + `sizes` + `loading="lazy"` (LCP en `priority`) |
| Aucun `h1` / `h2` | SEO nul | `h1` unique (hero), `h2` par projet |
| Texte split en spans | Lecteurs d’écran | `aria-label` sur le titre, spans `aria-hidden` |
| Preloader bloquant | Accès au contenu retardé | Pas de preloader bloquant |

## Décisions de transposition

Voir le plan d’implémentation : typo PP Neue Montreal (fallback Inter Tight), palette `surface` / `ink` / `accent-violet` / `accent-green` / `violet-10`, index sticky, rangées médias `single` \| `pair` par projet (plus `homeProjectRow` 1\|2 projets).
