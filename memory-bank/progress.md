# Progress

## Statut global

**Home maisonauge livrée** — index sticky, tokens Figma, Playwright e2e, seed CSV v2.

| Zone | Statut |
|------|--------|
| Repo GitHub | 🔄 push `main` après commits de session |
| Vercel production | ✅ https://charles-berard.vercel.app |
| Sanity projet | ✅ `x4xhmesz` / `production` |
| Seed contenu | ✅ CSV v2 + `homeRows` / `projects[]` / manifeste |
| Home index sticky | ✅ `ProjectIndex` + rangées médias 1\|2 |
| Playwright e2e | ✅ desktop 1440 + mobile 390 (12 specs) |
| Tokens + Neue Montreal stack | ✅ fallback Inter Tight |
| Figma Home 3 | ✅ nommage, variables, grille 12, composants |
| Memory bank | ✅ À jour |

## Ce qui fonctionne

- Home : hero (`h1`), marquee fixe, services, manifeste, index sticky, footer violet-10
- Index : colonne gauche sticky (titre `h2`, catégorie, cover 2:3), rangées single/pair + légende
- Lenis + GSAP ScrollTrigger (parallax, split chars/mots, reduced-motion)
- Détail projet : Portable Text, badge Axe, galerie lightbox
- À propos / Contact : contenu CMS
- Header pills violet/vert (area-font)
- Studio embedded `/studio`
- `pnpm build` + `pnpm test:e2e` + `pnpm seed`
- Fallback si Sanity env absent ; manifesto injecté si absent du CMS

## En cours / partiel

- Fichiers `.woff2` Neue Montreal à fournir (`src/fonts/README.md`)
- Images réelles projet (placeholders si pas d’asset)
- `sanity schema deploy` CLI (SIGABRT local)

## À faire (backlog)

- [ ] Assets images par projet + médias `homeRows` dans Sanity
- [ ] `next/font/local` une fois les woff2 fournis
- [ ] Visual Editing / `defineLive`
- [ ] TypeGen (`pnpm typegen`)
- [ ] Pages projet dans le même langage visuel
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

## Évolution des décisions

- **Framework** : Next.js (vs TanStack Start)
- **Menu** : area-font (vs blazetype)
- **Index home** : sticky maisonauge (plus liste typo Grilli)
- **Font** : Neue Montreal (Inter Tight fallback) vs Space Mono
- **Palette** : surface/ink/violet/green (rouge `brand` secondaire)
- **Studio mount** : `basePath: "/studio"` requis pour embedded Next.js
