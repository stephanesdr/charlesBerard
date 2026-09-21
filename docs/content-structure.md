# Structure contenu — home & projets

Gabarit Sheet / CSV aligné sur l’index maisonauge (un projet = header sticky + rangées médias). Copie manuelle vers Google Sheets : le fichier n’est pas éditable par outil.

Gabarit : `scripts/templates/projets-v2.csv`

## Colonnes

| Colonne | Description |
|---------|-------------|
| `slug` | Identifiant URL (`fashion-show-massimo-dutti-ss25`) |
| `titre` | Titre projet |
| `catégorie` | Label court type « Identité — Print » |
| `services` | Liste séparée par virgules |
| `résumé` | Accroche |
| `texte` | Corps (paragraphes séparés par une ligne vide) |
| `cover` | URL ou chemin image couverture (ratio 2:3) |
| `row1_type` | `1` ou `2` (single \| pair) |
| `row1_media_a` | Média principal rangée 1 |
| `row1_media_b` | Second média si pair |
| `row1_legende` | Légende rangée 1 |
| `row2_type` | `1` ou `2` |
| `row2_media_a` | Média principal rangée 2 |
| `row2_media_b` | Second média si pair |
| `row2_legende` | Légende rangée 2 |
| `statut` | `réalisé` \| `axe` |
| `ordre` | Entier, 0-based |
| `client` | Nom client |
| `année` | Année |

## Mapping Sanity

| CSV | Sanity |
|-----|--------|
| `titre` / `slug` | `project.title` / `project.slug` |
| `catégorie` | `project.category` |
| `services` | `project.services[]` |
| `résumé` / `texte` | `project.summary` / `project.body` |
| `cover` | `project.coverImage` (requis pour l’index) |
| `rowN_*` | `project.homeRows[]` (`layout: single\|pair`, `media[]`, `caption`) |
| `statut` | `project.projectStatus` (`realized` \| `concept`) |
| `ordre` | `orderRank` |
| `client` / `année` | `project.client` / `project.year` |

## Home CMS

- `home.heroTitle`, `home.marqueeText`
- `home.sections[]` :
  - `homeIntroSection` → services (uppercase)
  - `homeManifestoSection` → box manifeste
  - `homeProjectIndexSection.projects[]` → ordre de l’index
  - `homeProjectIndexSection.rows` → **legacy**, caché, lu en fallback

## Seed

```bash
CSV_PATH=scripts/templates/projets-v2.csv pnpm seed
```

Le seed fusionne les champs v2 sans écraser `coverImage` / `gallery` déjà en CMS. Colonnes v1 (`titre,service,résumé,texte`) restent lisibles.
