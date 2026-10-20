# Progress

## Statut global

**Home + About Figma livrées** — About éditoriale Sanity avec hero shader Three.js et fallback accessible.

| Zone | Statut |
|------|--------|
| Repo GitHub | 🔄 push `main` après commits de session |
| Vercel production | ✅ https://charles-berard.vercel.app |
| Sanity projet | ✅ `x4xhmesz` / `production` |
| Seed contenu | ✅ CSV v2 + `homeRows` / `projects[]` / manifeste |
| Google Sheet client | ✅ Onglets `Projets v2` + `Structure colonnes` — export CSV → seed OK |
| Home index sticky | ✅ `ProjectIndex` + rangées médias 1\|2 |
| Playwright e2e | ✅ desktop 1440 + mobile 390 (20 tests, 4 skips ciblés) |
| Tokens + Neue Montreal stack | ✅ fallback Inter Tight |
| Figma Home 3 | ✅ nommage, variables, grille 12, composants |
| Feedback Figma homepage | ✅ composition first viewport, marquee fade/stacking, intro media, marges, gutter, captions, rythme vertical |
| Navigation anglaise | ✅ HOME / ABOUT + `/about` canonique |
| About Figma | ✅ grille 1352px, contenu structuré, hero shader et footer dédié |
| Liens projet | ✅ `PROJECT_LINKS_ENABLED=false` sur Vercel + fallback local |
| Memory bank | ✅ À jour |

## Ce qui fonctionne

- Home : hero (`h1`), marquee, intro image/vidéo, services, manifeste, index sticky, footer violet-10
- Index : colonne gauche sticky (titre `h2`, catégorie, cover 2:3), rangées single/pair + légende
- Lenis + GSAP ScrollTrigger (parallax, split chars/mots, reduced-motion)
- Détail projet : Portable Text, badge Axe, galerie lightbox
- About `/about` : contenu Sanity structuré, hero WebGL local, sections éditoriales et footer contact ; `/a-propos` redirige vers `/about`
- Header pills violet/vert actives via pathname + `aria-current`
- Studio embedded `/studio`
- `pnpm build` + `pnpm lint` + 20 tests Playwright desktop/mobile
- Fallback si Sanity env absent ; manifesto injecté si absent du CMS

## En cours / partiel

- Fichiers `.woff2` Neue Montreal à fournir (`src/fonts/README.md`)
- Média intro à renseigner dans Sanity (placeholder sinon)
- `sanity schema deploy` CLI (SIGABRT local)

## À faire (backlog)

- [ ] Client : liens `cover` / `rowN_media_*` dans le Sheet `Projets v2`
- [ ] Seed assets : télécharger les liens Sheet → upload Sanity (`coverImage`, `homeRows.media`)
- [ ] Nettoyer le brouillon `drafts.project-fashion-show-massimo-dutti-ss25` (juin, pré-v2)
- [ ] `next/font/local` une fois les woff2 fournis
- [ ] Visual Editing / `defineLive`
- [ ] TypeGen (`pnpm typegen`)
- [ ] Pages projet dans le même langage visuel
- [ ] Traduire les contenus éditoriaux CMS encore en français
- [ ] Dark mode après validation de la maquette About
- [ ] Domaine custom
- [ ] Preview env vars sur Vercel

## Problèmes connus

| Issue | Impact | Mitigation |
|-------|--------|------------|
| Schema deploy CLI SIGABRT | Schéma cloud via CLI | Studio schémas locaux |
| Pas de woff2 Neue Montreal | Fallback Inter Tight | `src/fonts/` + `next/font/local` |
| Pas d’images CMS | Placeholders | Upload Studio |
| Tokens local only | Seed / write local | sanity.io/manage |
| Sticky + overflow iOS | Safari | wrapper sans overflow hidden |
| Hydration mismatch dev | Warning console | `suppressHydrationWarning` |

## Historique milestones

| Date | Milestone |
|------|-----------|
| 2026-06-16 | Scaffold Next.js + Tailwind v4 |
| 2026-06-16 | Push GitHub + deploy Vercel |
| 2026-06-16 | Sanity MCP + seed.mjs |
| 2026-06-16 | Memory bank |
| 2026-06-16 | Home page builder + orderable + shadcn |
| 2026-06-16 | Space Mono + échelle typo Grilli |
| 2026-06-16 | Route groups `(site)` / `studio` |
| 2026-06-16 | Fix `basePath` Studio + patch orderRank |
| 2026-06-21 | Transposition homepage maisonauge + Playwright + Figma tokens |
| 2026-10-15 | About Figma + contenu Sanity structuré + hero shader Three.js |

## Évolution des décisions

- **Framework** : Next.js (vs TanStack Start)
- **Menu** : area-font (vs blazetype)
- **Index home** : sticky maisonauge (plus liste typo Grilli)
- **Font** : Neue Montreal (Inter Tight fallback) vs Space Mono
- **Palette** : surface/ink/violet/green (rouge `brand` secondaire)
- **Studio mount** : `basePath: "/studio"` requis pour embedded Next.js
