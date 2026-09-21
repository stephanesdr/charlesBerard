# Structure contenu — home & projets

Structure Sheet / CSV alignée sur l’index maisonauge (un projet = header sticky + rangées médias).

## Google Sheet client

[Projet copie](https://docs.google.com/spreadsheets/d/1yLcbjm6QTVtzUvIui47mzSf6LQqLyRA6cmYQgnQAUTU/edit) — partage « tous les utilisateurs disposant du lien » (édition anonyme possible).

| Onglet | gid | Rôle |
|--------|-----|------|
| `Feuille 1` | `0` | Structure v1 (titre / service / résumé / texte) — legacy, conservée |
| `Projets v2` | `781421263` | **Source de vérité** — 19 colonnes ci-dessous, 4 projets |
| `Structure colonnes` | `1167553328` | Mode d’emploi des colonnes pour le client |

Export CSV public (sans connexion) :

```
https://docs.google.com/spreadsheets/d/1yLcbjm6QTVtzUvIui47mzSf6LQqLyRA6cmYQgnQAUTU/export?format=csv&gid=781421263
```

Miroir versionné dans le repo : `scripts/templates/projets-v2.csv` (identique à l’onglet `Projets v2` au 2026-09-21).

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

Depuis le miroir repo (défaut) :

```bash
pnpm seed
```

Depuis le Sheet client (onglet `Projets v2`) :

```bash
curl -sL "https://docs.google.com/spreadsheets/d/1yLcbjm6QTVtzUvIui47mzSf6LQqLyRA6cmYQgnQAUTU/export?format=csv&gid=781421263" -o /tmp/projets-v2.csv
CSV_PATH=/tmp/projets-v2.csv pnpm seed
```

Le seed fusionne les champs v2 sans écraser `coverImage` / `gallery` / `homeRows.media` déjà en CMS. Colonnes v1 (`titre,service,résumé,texte`) restent lisibles. Les colonnes `cover` / `rowN_media_*` (liens) ne sont pas encore importées — prochain plan : téléchargement des assets + upload Sanity.

Attention CSV : toute valeur contenant une virgule doit être entre guillemets (Sheets le fait automatiquement à l’export).
