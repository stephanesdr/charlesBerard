# shadcn/ui — registre @shadcn

Style installé : **base-nova** (Base UI + Tailwind v4).  
Installer un composant : `pnpm dlx shadcn@latest add <nom>`

## Installé

| Composant | Chemin | Notes |
|-----------|--------|-------|
| `button` | `src/components/ui/button.tsx` | Variants CB : `navPrimary`, `navSecondary`, size `nav` |

## Composants UI (@shadcn)

| Composant | Usage typique portfolio |
|-----------|-------------------------|
| `accordion` | FAQ, sections repliables |
| `alert` | Messages statut / erreur |
| `alert-dialog` | Confirmation destructive |
| `aspect-ratio` | Ratios médias fixes |
| `avatar` | Profil / équipe |
| `badge` | Tags projet, statut « Axe » |
| `breadcrumb` | Fil d’Ariane |
| `button` | CTA, nav (installé) |
| `button-group` | Groupes de filtres |
| `calendar` | Dates événements |
| `card` | Blocs contenu CMS |
| `carousel` | Galeries swipe |
| `chart` | Stats (si besoin) |
| `checkbox` | Filtres multi-sélection |
| `collapsible` | Accordéons légers |
| `combobox` | Recherche + sélection |
| `command` | Palette commande / recherche |
| `context-menu` | Menu contextuel |
| `dialog` | Modales (alternative lightbox) |
| `drawer` | Panneau mobile (menu) |
| `dropdown-menu` | Menus déroulants |
| `empty` | État vide liste |
| `field` | Champ formulaire structuré |
| `form` | Formulaires (contact) |
| `hover-card` | Preview projet au survol |
| `input` | Champs texte |
| `input-group` | Input + bouton/icon |
| `input-otp` | Code OTP |
| `item` | Liste structurée |
| `label` | Labels formulaire |
| `menubar` | Barre menu desktop |
| `navigation-menu` | Nav complexe |
| `pagination` | Liste longue projets |
| `popover` | Infobulles riches |
| `progress` | Chargement |
| `radio-group` | Choix unique |
| `resizable` | Panels ajustables |
| `scroll-area` | Scroll custom |
| `select` | Sélecteurs |
| `separator` | Séparateurs |
| `sheet` | Panneau latéral |
| `sidebar` | Layout admin / studio |
| `skeleton` | Placeholders chargement |
| `slider` | Curseurs |
| `sonner` | Notifications toast |
| `spinner` | Indicateur chargement |
| `switch` | Toggle |
| `table` | Tableaux données |
| `tabs` | Onglets contenu |
| `textarea` | Message contact |
| `toggle` | Bouton toggle |
| `toggle-group` | Filtres toggle |
| `tooltip` | Infobulles |
| `kbd` | Raccourcis clavier |
| `native-select` | Select natif stylé |
| `direction` | RTL / LTR |

## Utilitaires & libs

| Item | Description |
|------|-------------|
| `utils` | Helper `cn()` — déjà dans `src/lib/utils.ts` |
| `use-mobile` | Hook breakpoint mobile |

## Blocks (templates)

Login `login-01` … `login-05`, Signup `signup-01` … `signup-05`, Dashboard `dashboard-01`, Sidebar `sidebar-01` … `sidebar-16`, previews `preview`, `preview-02`.

## Fonts (registry)

`font-geist` (actif via layout), `font-inter`, `font-noto-sans`, familles heading dédiées, etc.

## Thème Charles Berard

Tokens projet dans `src/app/globals.css` :

| Token | Utility | Valeur |
|-------|---------|--------|
| `--color-surface` | `bg-surface` | `#fafafa` |
| `--color-ink` | `text-ink` | `#000000` |
| `--color-brand` | `text-brand`, `bg-brand` | `#e60000` |
| `--color-border-muted` | `border-border-muted` | `#a0a0a0` |
| `--primary` (shadcn) | `bg-primary` | = brand rouge |
| `--radius` | coins | `0` (carré area-font) |
| `container` | `class="container"` | max `90rem`, padding responsive |

**Important** : le rouge CB = `brand` / `primary`, pas `accent` (shadcn `accent` = gris hover).
