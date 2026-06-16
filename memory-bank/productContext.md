# Product Context

## Pourquoi ce projet existe

Charles Berard a besoin d’un portfolio professionnel qui présente des projets institutionnels, mode et culturel avec le même niveau de finition que les livrables qu’il produit. Le site est le vecteur principal de crédibilité pour de nouvelles missions en direction graphique.

## Problèmes résolus

| Problème | Solution |
|----------|----------|
| Contenu dispersé (CSV, textes longs) | CMS Sanity + seed automatisé |
| Mise en page rigide | Grille 14 col éditoriale, labels CMS |
| Navigation trop « e-commerce » | Header area-font : boutons fixes Projets / À propos / Contact |
| Projets « axe » vs réalisés | Champ `projectStatus` : `realized` \| `concept` avec badge UI |
| Pas d’images finalisées | Placeholders gradient + lightbox prête pour assets |

## Utilisateurs

- **Visiteurs** — clients, institutions, studios : parcourir projets, lire contexte, contacter
- **Charles / éditeur** — ajouter projets, images, textes via Studio

## Expérience cible

- Lecture fluide, typo sobre, marges générées par `SiteContainer`
- Home : scan rapide des projets (grille 1→2→3 colonnes)
- Détail : colonne label (services), corps texte large, sidebar résumé, galerie cliquable
- Menu toujours accessible (fixed header, scroll-hide GSAP)
- FR partout : titres, labels Studio, metadata

## Contenu initial (4 projets)

1. Fashion Show Massimo Dutti SS25 — réalisé
2. Federal Innovation Award — réalisé
3. Les Tailleurs — réalisé
4. Brussels Food Campus — **axe** (non sélectionné mais travail abouti présenté)

## Pages éditoriales

- **À propos** — bio direction graphique, périmètre de travail
- **Contact** — email, localisation Bruxelles, types de missions
