import type { PortableTextBlock } from "@portabletext/types";

export type ProjectStatus = "realized" | "concept";

export type SanityImage = {
  _type: "image";
  asset?: { _ref: string; _type: "reference" };
  alt?: string;
  lqip?: string;
};

export type MediaRowLayout = "single" | "pair";

export type HomeIntroMedia = {
  kind: "image" | "video";
  image?: SanityImage | null;
  poster?: SanityImage | null;
  videoUrl?: string | null;
  alt?: string | null;
};

export type HomeMediaRow = {
  _key: string;
  layout: MediaRowLayout;
  media?: SanityImage[];
  caption?: string | null;
};

export type Project = {
  _id: string;
  title: string;
  slug: string;
  category?: string | null;
  client?: string | null;
  year?: string | null;
  services?: string[];
  summary?: string;
  body?: PortableTextBlock[];
  coverImage?: SanityImage;
  homeRows?: HomeMediaRow[];
  gallery?: SanityImage[];
  projectStatus?: ProjectStatus;
  orderRank?: string;
  order?: number;
  seo?: {
    title?: string;
    description?: string;
    ogImage?: SanityImage;
  };
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

export type AboutEditorialSection = {
  _key: string;
  title: string;
  body?: PortableTextBlock[];
};

export type AboutContent = {
  heroLines: [string, string] | string[];
  standfirst: string;
  clients: string;
  sections: AboutEditorialSection[];
  manifesto: string;
  closing: string;
  footer: {
    tagline: string;
    phone?: string | null;
    email?: string | null;
  };
};

export type Page = {
  title: string;
  slug: string;
  intro?: string;
  body?: PortableTextBlock[];
  about?: AboutContent | null;
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
  media?: HomeIntroMedia | null;
};

export type HomeManifestoSection = {
  _type: "homeManifestoSection";
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
  projects?: Project[];
  rows?: HomeProjectRow[];
  /** @deprecated Utiliser `projects` */
  columnLayout?: ColumnLayout;
  /** @deprecated Utiliser `projects` */
  projectSource?: ProjectSource;
  showSidebar?: boolean;
  sidebarLink?: {
    label: string;
    href: string;
    openInNewTab?: boolean;
  };
  /** @deprecated Utiliser `projects` */
  items?: HomeProjectIndexItem[];
};

export type ResolvedHomeProject = {
  project: Project;
  rows: HomeMediaRow[];
};

export type ResolvedHomeProjectRow = {
  _key: string;
  layout: RowLayout;
  projects: Project[];
};

export type ResolvedHomeProjectIndexSection = HomeProjectIndexSection & {
  resolvedRows: ResolvedHomeProjectRow[];
  resolvedProjects: ResolvedHomeProject[];
};

export type HomeSection =
  | HomeIntroSection
  | HomeManifestoSection
  | HomeProjectIndexSection
  | ResolvedHomeProjectIndexSection;

export type Home = {
  title?: string;
  heroTitle?: string | null;
  marqueeText?: string | null;
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

function aboutBlock(
  key: string,
  text: string,
  options?: {
    style?: "normal" | "h3";
    listItem?: "bullet";
    strong?: boolean;
  },
): PortableTextBlock {
  return {
    _type: "block",
    _key: key,
    style: options?.style ?? "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: `${key}-span`,
        text,
        marks: options?.strong ? ["strong"] : [],
      },
    ],
    ...(options?.listItem
      ? { listItem: options.listItem, level: 1 }
      : {}),
  };
}

const fallbackAboutContent: AboutContent = {
  heroLines: ["CHARLES", "BéRARD"],
  standfirst:
    "Brand & creative designer for 17 years. I work across the whole creative chain, from concept to rollout, connecting branding, UX, motion and AI into coherent systems that make sense at every touchpoint.",
  clients:
    "Client : Loewe, KTM, (re)space, Cartier, Massimo Dutti, Zara, Inditex, Easyfairs, Batibouw, Tandem, Les 3 Vallées, Wolfers, Maje, Puig, Spotify, Royal Museums of Fine Arts of Belgium, Ruinart, Mettet, Cornette de Saint Cyr, Azar, ESF, ULiège, European Commission, IBA, Belfius, The Shy Guy, Griffé, Casarose, Instore, Radio Contact, Agoria, Evaux, Playlabel Records, Fami-QS, Animal Law, M. Lascar, Jet Import, Les Tailleurs Festival, Terramezza, ESIMAP, LKQ, visit.brussels, Atrium, FISA, …",
  sections: [
    {
      _key: "approach",
      title: "Bringing experiences to life through image.",
      body: [
        aboutBlock("approach-title", "Approach", { style: "h3" }),
        aboutBlock(
          "approach-1",
          "Built on solid graphic-design foundations, my practice has spread across many disciplines, with real agility in visual creation. I started in a publishing house, co-founded a graphic studio (Feelink Studio) and now work in an events agency.",
        ),
        aboutBlock(
          "approach-2",
          "From paper to Figma, I work across media to translate each message as precisely as possible: concept, typography, print, web design, production, management, automation, UX, motion. AI (Google AI Studio, NotebookLM, Weavy) has just joined my workflow, to push creative limits further. I’ve done this every day for 17 years. I love it, especially when the challenge is shared within a team.",
        ),
      ],
    },
    {
      _key: "skills",
      title: "Skills",
      body: [
        aboutBlock("strengths-title", "Strengths", { style: "h3" }),
        ...[
          "Brand & strategy",
          "Positioning & copy",
          "Naming, storytelling, concept",
          "Typography, layout",
          "Web design, UX, social media",
          "AI & generative design",
          "Print & paper",
        ].map((text, index) =>
          aboutBlock(`strength-${index}`, text, { listItem: "bullet" }),
        ),
        aboutBlock("tools-title", "Tools", { style: "h3" }),
        aboutBlock(
          "tools",
          "InDesign, Photoshop, Illustrator, After Effects, Figma, Cavalry, Jitter, Office, Google AI Studio, NotebookLM, Weavy, …",
        ),
        aboutBlock("education-title", "Education", { style: "h3" }),
        ...[
          "2025 — English course and AI training.",
          "2009 — Bachelor in Graphic Communication, with distinction. École de l’Art de l’Image Le 75, Brussels.",
          "2005 — Upper secondary diploma, technical qualification in computer graphics, with distinction. Collège de Court-Saint-Étienne.",
        ].map((text, index) =>
          aboutBlock(`education-${index}`, text, { listItem: "bullet" }),
        ),
      ],
    },
    {
      _key: "career",
      title: "Career",
      body: [
        aboutBlock("career-profirst-title", "2024 → 2026 PROFIRST", {
          style: "h3",
        }),
        aboutBlock(
          "career-profirst",
          "A renowned events agency, Profirst opened the doors of luxury fashion and high-end events. Fashion shows, striking invitations, generous budgets: room to push creation further. I rarely produced so many concepts and images in so little time.",
        ),
        aboutBlock("career-feelink-title", "2016 → 2024 — Feelink Studio", {
          style: "h3",
        }),
        aboutBlock(
          "career-feelink",
          "Co-founding Feelink Studio remains my biggest adventure. I built a team, worked with a wide range of clients and led projects from concept to delivery. Passion, pleasure and a human-centred approach were the guides, day and night. Years full of learning and success.",
        ),
        aboutBlock("career-hoet-title", "2015 → 2016 — Hoet&Hoet", {
          style: "h3",
        }),
        aboutBlock(
          "career-hoet",
          "Short but intense. Large-budget projects alongside experienced talents: a lot learned in little time. Graphic creation and production for various clients, plus teamwork on graphic research, presentations and productions.",
        ),
        aboutBlock("career-incha-title", "2014 → 2016 — INCHA", {
          style: "h3",
        }),
        aboutBlock(
          "career-incha",
          "Launched a creative collective selling screen-printed textile designs, alongside a freelance graphic design career. Wonderful artistic encounters, inspiring workshop sessions, hands stained with paint.",
        ),
        aboutBlock("career-finess-title", "2014 → 2015 — Fi-Ness Brands", {
          style: "h3",
        }),
        aboutBlock(
          "career-finess",
          "A brief stint in an agency specialised in brand identity and publishing, working on ever larger projects. In direct contact with clients, I designed and rolled out editorial, graphic and web guidelines. Catalogues, visual identities, websites, advertising campaigns, stationery.",
        ),
        aboutBlock("career-nm-title", "2009 → 2014 — NM Editions", {
          style: "h3",
        }),
        aboutBlock(
          "career-nm",
          "Working with sales teams and editors, I was solely in charge of creating new A3 magazines centred on the Sablon and Louise districts of Brussels. Graphic line, layout, advertising design, project management, relations with editors, translators and printers: all mine. Around 35 magazines in five years.",
        ),
      ],
    },
  ],
  manifesto:
    "My ground: turning complexity into clear, distinctive and lasting experiences.",
  closing:
    "My path is varied, and I’ll keep it built on sharing, learning and performance.\nReach out, I’d love to walk you through all over a coffee or a call.",
  footer: {
    tagline: "Good vibes, hot coffee, big ideas",
    phone: "+32 477 20 38 05",
    email: "kisskiss@charlesberard.com",
  },
};

export const fallbackProjects: Project[] = [
  {
    _id: "project-massimo-dutti",
    title: "Fashion Show Massimo Dutti SS25",
    slug: "fashion-show-massimo-dutti-ss25",
    category: "Identité — Print",
    client: "Massimo Dutti",
    year: "2025",
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
    category: "Identité — Scénographie",
    client: "SPF BOSA",
    year: "2026",
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
    category: "Identité — Affiche",
    client: "Les Tailleurs",
    year: "2019",
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
    category: "Naming — Identité",
    client: "Belgian Foundation for Food Sciences",
    year: "2024",
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

function fallbackMediaRows(
  project: Project,
  index: number,
  caption: string,
): HomeMediaRow[] {
  const startWithSingle = index % 2 === 0;
  const cover = project.coverImage ? [project.coverImage] : [];
  const gallery = project.gallery?.slice(0, 2) ?? [];

  return startWithSingle
    ? [
        {
          _key: `${project._id}-r1`,
          layout: "single",
          media: cover,
          caption,
        },
        {
          _key: `${project._id}-r2`,
          layout: "pair",
          media: gallery,
          caption: null,
        },
      ]
    : [
        {
          _key: `${project._id}-r1`,
          layout: "pair",
          media: gallery,
          caption: null,
        },
        {
          _key: `${project._id}-r2`,
          layout: "single",
          media: cover,
          caption,
        },
      ];
}

function buildFallbackHomeSections(): HomeSection[] {
  const [p1, p2, p3, p4] = fallbackProjects;
  const captions = [
    "Presskit et papeterie événementielle.",
    "Identité et trophée.",
    "Affiche et identité du festival.",
    "Logo et contre-formes.",
  ];

  return [
    {
      _type: "homeIntroSection",
      _key: "services",
      label: "Services",
      text: "Defining brand strategy. — Translating trends into tangible touchpoints and communication strategies. — Shaping multichannel brand experiences that engage, inspire and accelerate positive change through distinctive positioning. — Designing smart print and visual identities that consumers notice, desire and remember. — Telling brand stories. — Crafting websites. — Leading creative teams and facilitating co-creation.",
    },
    {
      _type: "homeManifestoSection",
      _key: "manifesto",
      label: "Manifesto",
      text: "Seeking meaning is our most reckless obsession. Yet form only achieves beauty when purpose gives it shape. Isn’t that beautiful?",
    },
    {
      _type: "homeProjectIndexSection",
      _key: "projects",
      label: "Projects",
      projects: [p1, p2, p3, p4],
      resolvedRows: [
        { _key: "row-1", layout: "single", projects: [p1] },
        { _key: "row-2", layout: "pair", projects: [p2, p3] },
        { _key: "row-3", layout: "single", projects: [p4] },
      ],
      resolvedProjects: [p1, p2, p3, p4].map((project, index) => ({
        project,
        rows: fallbackMediaRows(project, index, captions[index] ?? ""),
      })),
    },
  ];
}

export const fallbackSiteSettings: SiteSettings = {
  siteTitle: "Charles Berard",
  headerNavigation: [
    { label: "HOME", href: "/", variant: "primary" },
    { label: "ABOUT", href: "/about", variant: "secondary" },
  ],
  footerText:
    "Charles Berard — art direction, visual identity and print design.",
  footerLinks: [
    { label: "HOME", href: "/" },
    { label: "ABOUT", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  seo: {
    title: "Charles Berard — Art direction",
    description:
      "Charles Berard portfolio — art direction and visual identity.",
  },
};

export const fallbackHome: Home = {
  title: "Home",
  heroTitle: "Charles Bérard",
  marqueeText: "Charles Bérard, brand designer & creative director",
  sections: buildFallbackHomeSections(),
  seo: {
    title: "Charles Berard — Art direction",
    description: "A selection of projects by Charles Berard.",
  },
};

export const fallbackAboutPage: Page = {
  title: "About",
  slug: "about",
  about: fallbackAboutContent,
  intro:
    "Direction graphique indépendante, entre papier, identité et mise en scène.",
  body: textToBlocks(
    "Charles Berard accompagne des institutions, des maisons de mode et des festivals dans la conception d'identités visuelles et de systèmes graphiques complets.\nDu naming à la scénographie, du print au digital, chaque projet est pensé pour durer et pour tenir en grand format autant qu'en détail.\nCe portfolio présente une sélection de travaux réalisés et d'axes de recherche graphique — des projets menés jusqu'au bout, et d'autres qui restent des explorations abouties.",
  ),
  seo: {
    title: "About — Charles Berard",
    description: "Art direction and visual identity.",
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
