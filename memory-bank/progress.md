# Progress

## Statut global

**V1+ fonctionnel** — site live, CMS page builder home, Studio embedded corrigé, typo Space Mono.

| Zone | Statut |
|------|--------|
| Repo GitHub | ✅ `main` (commit `a8efa5f` studio routing) |
| Vercel production | ✅ https://charles-berard.vercel.app |
| Sanity projet | ✅ `x4xhmesz` / `production` |
| Seed contenu | ✅ 4 projets + home sections + settings + pages |
| Home index lignes | ✅ `homeProjectRow` (1 ou 2 projets par ligne) |
| Presentation preview | ✅ Sans refresh loop en draft |
| orderRank production | ✅ 4 projets patchés |
| shadcn + Tailwind v4 | ✅ button, container, thème CB |
| Memory bank | ✅ À jour |
| Typo Space Mono | ✅ |
| Hydration warning fix | ⚠️ local (`layout.tsx` — à commit si besoin) |

## Ce qui fonctionne

- Home : page builder sections (intro + index projets 1/2 col, span wide)
- Ordre projets : plugin orderable + `pnpm patch-order-rank` pour legacy docs
- Détail projet : Portable Text, badge Axe, galerie lightbox
- À propos / Contact : contenu CMS
- Header area-font + scroll-hide GSAP (route group `(site)` uniquement)
- Grille 14 col + index typographique Grilli
- Studio : plein écran sans header site (`studio/layout.tsx`)
- `pnpm build` + deploy Vercel
- `pnpm seed` depuis CSV
- Fallback si Sanity env absent

## En cours / partiel

- Images réelles projet (placeholders)
- `sanity schema deploy` CLI (SIGABRT local)
- `layout.tsx` suppressHydrationWarning — peut être non commité

## À faire (backlog)

- [ ] Assets images par projet dans Sanity
- [ ] Visual Editing / `defineLive`
- [ ] TypeGen (`pnpm typegen`)
- [ ] Animations page transition
- [ ] Domaine custom
- [ ] Preview env vars sur Vercel (cocher Preview dans le dashboard)

## Problèmes connus

| Issue | Impact | Mitigation |
|-------|--------|------------|
| Schema deploy CLI SIGABRT | Schéma cloud via CLI | Studio schémas locaux |
| Pas d’images CMS | Placeholders | Upload Studio |
| Tokens local only | Seed / write local | sanity.io/manage |
| Hydration mismatch dev | Warning console | `suppressHydrationWarning` ; ou désactiver extensions (HireCarta) |
| WebSocket Studio warning | Transitoire | Réseau / onglet background — non bloquant |

## Historique milestones

| Date | Milestone |
|------|-----------|
| 2026-06-16 | Scaffold Next.js + Tailwind v4 |
| 2026-06-16 | Push GitHub + deploy Vercel |
| 2026-06-16 | Sanity MCP + seed.mjs |
| 2026-06-16 | Memory bank |
| 2026-06-16 | Home page builder + orderable + shadcn |
| 2026-06-16 | Space Mono + échelle typo Grilli |
| 2026-06-16 | Route groups `(site)` / `studio` — layout Studio isolé |
| 2026-06-16 | Fix `basePath` Studio + patch orderRank + script `patch-order-rank` |

## Évolution des décisions

- **Framework** : Next.js (vs TanStack Start)
- **Menu** : area-font (vs blazetype)
- **Index home** : liste typo Grilli, pas cartes image
- **Font texte** : Space Mono (vs Geist / system)
- **Studio mount** : `basePath: "/studio"` requis pour embedded Next.js
