# charlesBerard

Portfolio Charles Berard — direction graphique.

## Stack

Next.js App Router, Sanity CMS, Tailwind v4, GSAP, Portable Text.

## Setup

```bash
pnpm install
cp .env.example .env.local
# Ajouter SANITY_API_TOKEN (write) depuis sanity.io/manage
pnpm seed   # lit ~/Downloads/Projets Feuille 1.csv par défaut
pnpm dev
```

**Projet Sanity** : `x4xhmesz` (dataset `production`)

Studio : http://localhost:3000/studio

## Memory Bank (Cline)

Contexte persistant pour les agents IA :

```
memory-bank/
├── memory-bank-instructions.md  # Lire en premier
├── projectbrief.md
├── productContext.md
├── systemPatterns.md
├── techContext.md
├── activeContext.md
└── progress.md
```

Commande utile : **update memory bank** — relire et synchroniser tous les fichiers avec l’état du repo.

## Deploy

Connecté à Vercel + GitHub `stephanesdr/charlesBerard`.
