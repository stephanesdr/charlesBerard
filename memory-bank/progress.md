# Progress

## Statut global

**V1 fonctionnel** — site live, CMS connecté, contenu seedé.

| Zone | Statut |
|------|--------|
| Repo GitHub | ✅ `main` |
| Vercel production | ✅ https://charles-berard.vercel.app |
| Sanity projet | ✅ `x4xhmesz` / `production` |
| Seed contenu | ✅ 4 projets + home + settings + 2 pages |
| Studio embedded | ✅ `/studio` |
| Memory bank | ✅ En place |

## Ce qui fonctionne

- Home : grille projets avec placeholders image
- Détail projet : Portable Text, badge Axe, galerie lightbox (placeholders)
- À propos / Contact : contenu CMS
- Header area-font + scroll-hide GSAP
- Grille 14 col responsive
- `pnpm build` + deploy Vercel
- `pnpm seed` depuis CSV
- Sitemap `/sitemap.xml`
- Fallback si Sanity env absent

## En cours / partiel

- Images réelles projet (placeholders uniquement)
- `sanity schema deploy` CLI (crash SIGABRT local — Studio OK via schémas locaux)
- shadcn/ui non intégré (hors scope V1)

## À faire (backlog)

- [ ] Assets images par projet dans Sanity
- [ ] Visual Editing / `defineLive`
- [ ] TypeGen workflow (`pnpm typegen`)
- [ ] Animations page transition (orchestrator)
- [ ] Domaine custom
- [ ] `SANITY_API_READ_TOKEN` sur Vercel (preview)
- [ ] Tests E2E smoke (optionnel)

## Problèmes connus

| Issue | Impact | Mitigation |
|-------|--------|------------|
| Schema deploy CLI SIGABRT | Schéma cloud non déployé via CLI | Studio utilise fichiers locaux |
| Pas d’images CMS | UI placeholder | Upload Studio |
| Tokens uniquement en local | Seed / write local only | sanity.io/manage pour regen |

## Historique milestones

| Date | Milestone |
|------|-----------|
| 2026-06-16 | Scaffold Next.js + Tailwind v4 |
| 2026-06-16 | Push GitHub + premier deploy Vercel |
| 2026-06-16 | Sanity projet MCP + seed.mjs |
| 2026-06-16 | Memory bank Cline initialisée |

## Évolution des décisions

- **Framework** : Next.js confirmé (vs TanStack Start) pour Sanity
- **Menu** : area-font confirmé (vs blazetype.eu)
- **Brussels Food Campus** : affiché comme axe (`concept`), pas exclu du portfolio
