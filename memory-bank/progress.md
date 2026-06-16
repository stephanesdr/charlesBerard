# Progress

## Statut global

**V1+ fonctionnel** — site live, CMS page builder home, typo Space Mono.

| Zone | Statut |
|------|--------|
| Repo GitHub | ✅ `main` |
| Vercel production | ✅ https://charles-berard.vercel.app |
| Sanity projet | ✅ `x4xhmesz` / `production` |
| Seed contenu | ✅ 4 projets + home sections + settings + pages |
| Studio embedded | ✅ `/studio` + structure + orderable |
| shadcn + Tailwind v4 | ✅ button, container, thème CB |
| Memory bank | ✅ À jour |
| Typo Space Mono | ✅ |

## Ce qui fonctionne

- Home : page builder sections (intro + index projets 1/2 col, span wide)
- Ordre projets : plugin orderable + sélection manuelle home
- Détail projet : Portable Text, badge Axe, galerie lightbox
- À propos / Contact : contenu CMS
- Header area-font + scroll-hide GSAP
- Grille 14 col + index typographique Grilli
- `pnpm build` + deploy Vercel
- `pnpm seed` depuis CSV
- Fallback si Sanity env absent

## En cours / partiel

- Images réelles projet (placeholders)
- `sanity schema deploy` CLI (SIGABRT local)
- Contenu Sanity production : peut nécessiter re-seed pour `home.sections`

## À faire (backlog)

- [ ] Assets images par projet dans Sanity
- [ ] Visual Editing / `defineLive`
- [ ] TypeGen (`pnpm typegen`)
- [ ] Animations page transition
- [ ] Domaine custom
- [ ] `SANITY_API_READ_TOKEN` sur Vercel

## Problèmes connus

| Issue | Impact | Mitigation |
|-------|--------|------------|
| Schema deploy CLI SIGABRT | Schéma cloud via CLI | Studio schémas locaux |
| Pas d’images CMS | Placeholders | Upload Studio |
| Tokens local only | Seed / write local | sanity.io/manage |

## Historique milestones

| Date | Milestone |
|------|-----------|
| 2026-06-16 | Scaffold Next.js + Tailwind v4 |
| 2026-06-16 | Push GitHub + deploy Vercel |
| 2026-06-16 | Sanity MCP + seed.mjs |
| 2026-06-16 | Memory bank |
| 2026-06-16 | Home page builder + orderable + shadcn |
| 2026-06-16 | Space Mono + échelle typo Grilli |

## Évolution des décisions

- **Framework** : Next.js (vs TanStack Start)
- **Menu** : area-font (vs blazetype)
- **Index home** : liste typo Grilli, pas cartes image
- **Font texte** : Space Mono (vs Geist / system)
