import type { PortableTextBlock } from "@portabletext/types";

export type ProjectStatus = "realized" | "concept";

export type SanityImage = {
  _type: "image";
  asset?: { _ref: string; _type: "reference" };
  alt?: string;
  lqip?: string;
};

export type Project = {
  _id: string;
  title: string;
  slug: string;
  services?: string[];
  summary?: string;
  body?: PortableTextBlock[];
  coverImage?: SanityImage;
  gallery?: SanityImage[];
  projectStatus?: ProjectStatus;
  orderRank?: string;
  order?: number;
  seo?: { title?: string; description?: string };
};

export type NavigationItem = {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
  openInNewTab?: boolean;
};

export type SiteSettings = {
  siteTitle: string;
  headerNavigation?: NavigationItem[];
  footerText?: string;
  footerLinks?: { label: string; href: string; openInNewTab?: boolean }[];
  seo?: { title?: string; description?: string };
};

export type Page = {
  title: string;
  slug: string;
  intro?: string;
  body?: PortableTextBlock[];
  seo?: { title?: string; description?: string };
};

export type ListSpan = "single" | "wide";
export type ColumnLayout = "one" | "two";
export type ProjectSource = "all" | "manual";
export type RowLayout = "single" | "pair";

export type HomeIntroSection = {
  _type: "homeIntroSection";
  _key: string;
  label?: string;
  text?: string;
};

export type HomeProjectRow = {
  _key: string;
  _type?: "homeProjectRow";
  layout?: RowLayout;
  projects?: Project[];
};

export type HomeProjectIndexItem = {
  listSpan?: ListSpan;
  project?: Project;
};

export type HomeProjectIndexSection = {
  _type: "homeProjectIndexSection";
  _key: string;
  label?: string;
  rows?: HomeProjectRow[];
  /** @deprecated Utiliser `rows` */
  columnLayout?: ColumnLayout;
  /** @deprecated Utiliser `rows` */
  projectSource?: ProjectSource;
  showSidebar?: boolean;
  sidebarLink?: {
    label: string;
    href: string;
    openInNewTab?: boolean;
  };
  /** @deprecated Utiliser `rows` */
  items?: HomeProjectIndexItem[];
};

export type ResolvedHomeProjectRow = {
  _key: string;
  layout: RowLayout;
  projects: Project[];
};

export type ResolvedHomeProjectIndexSection = HomeProjectIndexSection & {
  resolvedRows: ResolvedHomeProjectRow[];
};

export type HomeSection =
  | HomeIntroSection
  | HomeProjectIndexSection
  | ResolvedHomeProjectIndexSection;

export type Home = {
  title?: string;
  sections?: HomeSection[];
  seo?: { title?: string; description?: string };
};

function textToBlocks(text: string): PortableTextBlock[] {
  return text
    .split(/\n\n+/)
    .filter(Boolean)
    .map((paragraph, i) => ({
      _type: "block" as const,
      _key: `block-${i}`,
      style: "normal" as const,
      markDefs: [],
      children: [
        {
          _type: "span" as const,
          _key: `span-${i}`,
          text: paragraph.replace(/\n/g, " "),
          marks: [],
        },
      ],
    }));
}

export const fallbackProjects: Project[] = [
  {
    _id: "project-massimo-dutti",
    title: "Fashion Show Massimo Dutti SS25",
    slug: "fashion-show-massimo-dutti-ss25",
    services: [
      "Direction graphique",
      "conception",
      "papeterie",
      "gestion projet",
    ],
    summary:
      "Pour le lancement SS25 de Massimo Dutti à Barcelone, j'ai pris en charge toute la communication papier d'un événement où chaque détail devait être à la hauteur de la salle. Invitation, signalétique, presskit cousu main sur Fedrigoni. Un objet qu'on emporte chez soi et qui parle encore longtemps après la soirée.",
    body: textToBlocks(
      "Un brief, une identité existante, et l'envie d'aller plus loin. Pour le lancement SS25 de Massimo Dutti à Barcelone, j'ai pris en charge toute la communication papier d'un événement où chaque détail devait être à la hauteur de la salle.\nLe concept Art in Progress de Massimo Dutti place la créativité locale au centre d'une expérience immersive, là où la mode rencontre l'art contemporain. Mon rôle : faire en sorte que chaque pièce imprimée raconte la même histoire.\nInvitation, signalétique, menu, name tag, cartels des oeuvres exposées. Et surtout le presskit, pièce centrale de l'événement. Une pochette Fedrigoni Imitlin cousue au fil, encrage à chaud noir, avec à l'intérieur plusieurs fiches imprimées en offset sur Fedrigoni Tintoretto Ceylon. Chaque fiche raconte le concept Art in Progress, la direction du défilé, les oeuvres présentes. Un objet que les guests emportent chez eux et qui continue de parler longtemps après la soirée.\nUn travail de recherche papier, de suivi de production, de présence sur place, de cohérence visuelle de bout en bout.",
    ),
    projectStatus: "realized",
    order: 0,
    orderRank: "0|hzzzzz:",
  },
  {
    _id: "project-federal-innovation",
    title: "Federal Innovation Award",
    slug: "federal-innovation-award",
    services: [
      "Direction graphique",
      "identité",
      "scénographie",
      "gestion projet",
    ],
    summary:
      "Un projet institutionnel qui ne devait pas ressembler à un formulaire. Identité complète repensée de zéro, du logotype au trophée, de la scénographie au webdesign.",
    body: textToBlocks(
      "Le Federal Innovation Award récompense chaque année les initiatives les plus innovantes au sein de l'administration fédérale belge. Un projet institutionnel, donc. Mais un projet institutionnel ne devrait pas ressembler à un formulaire administratif.\nL'identité existante était là. Je l'ai reprise, questionnée, et recommencée. Le logotype s'inspire du symbole de Nido, la cellule d'innovation du SPF BOSA. J'ai dupliqué cette forme en pétales autour d'un centre rond rose : les acteurs publics réunis autour du citoyen, l'innovation qui fleurit à partir de lui. Un concept simple, lisible, qui porte le sens sans l'expliquer.\nDe là, tout le reste a suivi. Ligne graphique complète, guidelines, réseaux sociaux, animations, webdesign, scénographie événementielle, bâche, badge, photobooth, présentoir totem, flyers, roll up, affiche. Et le trophée remis aux lauréats, conçu dans le même esprit.\nUn projet de A à Z, du concept jusqu'au soir de la cérémonie. Réalisé chez Profirst, en collaboration avec Tamara Maréchal à la gestion de projet.",
    ),
    projectStatus: "realized",
    order: 1,
    orderRank: "0|i00007:",
  },
  {
    _id: "project-les-tailleurs",
    title: "Les Tailleurs",
    slug: "les-tailleurs",
    services: [
      "Identité",
      "logo",
      "affiche",
      "scénographie",
      "merchandising",
      "gestion projet",
    ],
    summary:
      "Une identité créée en 2019 pour un festival des arts de rue insolite et insolent. Toujours debout en 2026, à la 12ème édition.",
    body: textToBlocks(
      "Un festival des arts de rue, insolite et insolent, ancré dans le village d'Ecaussinnes. Le projet existait depuis plusieurs années, le slogan aussi. Ce qui manquait, c'était une identité qui soit à la hauteur de l'ambition.\nEn 2019, j'ai repris tout de zéro. Logo, ligne graphique, affiche, programme, flyers, bâche, signalétique, merchandising, scénographie. Un univers visuel construit pour durer, pour fonctionner en grand format comme en petit, dans la rue comme sur les réseaux.\nLa preuve que ça tient : l'identité est toujours là en 2026, à la 12ème édition. J'ai décliné une nouvelle affiche pour les éditions 2022, 2023 et 2024, en respectant l'esprit de départ tout en gardant la fraîcheur de chaque nouvelle année.\nUn projet solo, de bout en bout.",
    ),
    projectStatus: "realized",
    order: 2,
    orderRank: "0|i0000f:",
  },
  {
    _id: "project-brussels-food-campus",
    title: "Brussels Food Campus",
    slug: "brussels-food-campus",
    services: [
      "Naming",
      "identité",
      "baseline",
      "ligne graphique",
      "workshop",
    ],
    summary:
      "Naming, baseline et identité complète pour un campus agro alimentaire international à Bruxelles. Un projet graphiquement abouti qui n'a pas su voir le jour.",
    body: textToBlocks(
      "Former les professionnels de l'alimentation de demain, des cinq continents, dans un campus unique à Bruxelles. Le projet était porté par la Belgian Foundation for Food Sciences, financé par Extensa, ancré à Tour & Taxis. Une ambition réelle, un brief solide.\nTout est parti d'un workshop avec le client. Le nom d'abord. Brussels Food Campus s'est imposé par sa clarté et sa portée internationale. Puis la baseline : \"Feeding the future\". Trois mots qui disent l'essentiel sans en faire trop.\nLe logo joue sur les contre-formes des initiales BFC. Pas de forme plaquée sur un concept, le concept naît de la forme elle-même. Ludique, accessible, ouvert. Une identité qui devait parler autant à un étudiant de Nairobi qu'à un chef bruxellois.\nLe projet n'a pas vu le jour, coincé entre les tensions politiques des universités partenaires. C'est le genre de travail qui reste dans les dossiers et qui aurait mérité mieux.",
    ),
    projectStatus: "concept",
    order: 3,
    orderRank: "0|i0001f:",
  },
];

function buildFallbackHomeSections(): HomeSection[] {
  const introText =
    "Direction graphique, identité et conception pour des projets culturels, institutionnels et événementiels.";

  const [p1, p2, p3, p4] = fallbackProjects;

  return [
    {
      _type: "homeIntroSection",
      _key: "intro",
      label: "Intro",
      text: introText,
    },
    {
      _type: "homeProjectIndexSection",
      _key: "projects",
      label: "Projets",
      showSidebar: true,
      sidebarLink: {
        label: "Contact",
        href: "/contact",
        openInNewTab: false,
      },
      resolvedRows: [
        { _key: "row-1", layout: "single", projects: [p1] },
        { _key: "row-2", layout: "pair", projects: [p2, p3] },
        { _key: "row-3", layout: "single", projects: [p4] },
      ],
    },
  ];
}

export const fallbackSiteSettings: SiteSettings = {
  siteTitle: "Charles Berard",
  headerNavigation: [
    { label: "Projets", href: "/", variant: "primary" },
    { label: "À propos", href: "/a-propos", variant: "secondary" },
    { label: "Contact", href: "/contact", variant: "secondary" },
  ],
  footerText:
    "Charles Berard — direction graphique, identité et conception print.",
  footerLinks: [
    { label: "Projets", href: "/" },
    { label: "À propos", href: "/a-propos" },
    { label: "Contact", href: "/contact" },
  ],
  seo: {
    title: "Charles Berard — Direction graphique",
    description:
      "Portfolio de Charles Berard, direction graphique et identité visuelle.",
  },
};

export const fallbackHome: Home = {
  title: "Accueil",
  sections: buildFallbackHomeSections(),
  seo: {
    title: "Charles Berard — Direction graphique",
    description: "Portfolio de projets sélectionnés.",
  },
};

export const fallbackAboutPage: Page = {
  title: "À propos",
  slug: "a-propos",
  intro:
    "Direction graphique indépendante, entre papier, identité et mise en scène.",
  body: textToBlocks(
    "Charles Berard accompagne des institutions, des maisons de mode et des festivals dans la conception d'identités visuelles et de systèmes graphiques complets.\nDu naming à la scénographie, du print au digital, chaque projet est pensé pour durer et pour tenir en grand format autant qu'en détail.\nCe portfolio présente une sélection de travaux réalisés et d'axes de recherche graphique — des projets menés jusqu'au bout, et d'autres qui restent des explorations abouties.",
  ),
  seo: {
    title: "À propos — Charles Berard",
    description: "Direction graphique et identité visuelle.",
  },
};

export const fallbackContactPage: Page = {
  title: "Contact",
  slug: "contact",
  intro: "Pour un projet, une collaboration ou une question.",
  body: textToBlocks(
    "Email : contact@charlesberard.eu\nBruxelles, Belgique\n\nDisponible pour des missions en direction graphique, identité, papeterie et scénographie événementielle.",
  ),
  seo: {
    title: "Contact — Charles Berard",
    description: "Contactez Charles Berard pour vos projets graphiques.",
  },
};
