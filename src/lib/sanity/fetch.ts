import { sanityFetch } from "./live";
import { isSanityConfigured } from "./env";
import {
  fallbackAboutPage,
  fallbackContactPage,
  fallbackHome,
  fallbackProjects,
  fallbackSiteSettings,
  type Home,
  type HomeMediaRow,
  type HomeSection,
  type MediaRowLayout,
  type Page,
  type Project,
  type ResolvedHomeProject,
  type ResolvedHomeProjectIndexSection,
  type ResolvedHomeProjectRow,
  type RowLayout,
  type SiteSettings,
} from "./fallback-data";

const projectListFields = `
  _id,
  title,
  "slug": slug.current,
  projectStatus,
  category,
  client,
  year,
  services,
  summary,
  coverImage,
  gallery,
  homeRows[]{
    _key,
    layout,
    caption,
    media
  }
`;

const projectFields = `
  _id,
  title,
  "slug": slug.current,
  category,
  client,
  year,
  services,
  summary,
  body,
  coverImage,
  homeRows[]{
    _key,
    layout,
    caption,
    media
  },
  gallery,
  projectStatus,
  orderRank,
  order,
  seo
`;

export async function getProjects(): Promise<Project[]> {
  if (!isSanityConfigured) return fallbackProjects;

  try {
    const { data: projects } = await sanityFetch({
      query: `*[_type == "project"] | order(orderRank asc, order asc, _createdAt desc) { ${projectFields} }`,
    });
    const list = projects as Project[] | null;
    return list?.length ? list : fallbackProjects;
  } catch {
    return fallbackProjects;
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  if (!isSanityConfigured) {
    return fallbackProjects.find((p) => p.slug === slug) ?? null;
  }

  try {
    const { data: project } = await sanityFetch({
      query: `*[_type == "project" && slug.current == $slug][0] { ${projectFields} }`,
      params: { slug },
    });
    const doc = project as Project | null;
    return doc ?? fallbackProjects.find((p) => p.slug === slug) ?? null;
  } catch {
    return fallbackProjects.find((p) => p.slug === slug) ?? null;
  }
}

export async function getSiteSettings(
  options?: { stega?: boolean },
): Promise<SiteSettings> {
  if (!isSanityConfigured) return fallbackSiteSettings;

  try {
    const { data: settings } = await sanityFetch({
      query: `*[_type == "siteSettings"][0] {
        siteTitle,
        headerNavigation,
        footerText,
        footerLinks,
        seo
      }`,
      stega: options?.stega ?? false,
    });
    return (settings as SiteSettings | null) ?? fallbackSiteSettings;
  } catch {
    return fallbackSiteSettings;
  }
}

const homeQuery = `*[_type == "home"][0] {
  title,
  heroTitle,
  marqueeText,
  sections[]{
    _type,
    _key,
    label,
    text,
    "projects": projects[]->{ ${projectListFields} },
    rows[]{
      _key,
      layout,
      "projects": projects[]->{ ${projectListFields} }
    },
    columnLayout,
    projectSource,
    showSidebar,
    sidebarLink,
    items[]{
      listSpan,
      project->{ ${projectListFields} }
    }
  },
  seo
}`;

export async function getHome(): Promise<Home> {
  if (!isSanityConfigured) return fallbackHome;

  try {
    const { data: home } = await sanityFetch({
      query: homeQuery,
    });
    return (home as Home | null) ?? fallbackHome;
  } catch {
    return fallbackHome;
  }
}

function normalizeMediaRow(
  row: HomeMediaRow,
  fallbackKey: string,
): HomeMediaRow {
  const layout: MediaRowLayout = row.layout === "pair" ? "pair" : "single";
  const media = (row.media ?? []).filter(Boolean);
  return {
    _key: row._key || fallbackKey,
    layout,
    media: layout === "pair" ? media.slice(0, 2) : media.slice(0, 1),
    caption: row.caption ?? null,
  };
}

export function synthesizeHomeRows(
  project: Project,
  index: number,
): HomeMediaRow[] {
  if (project.homeRows?.length) {
    return project.homeRows.map((row, rowIndex) =>
      normalizeMediaRow(row, `${project._id}-row-${rowIndex}`),
    );
  }

  const startWithSingle = index % 2 === 0;
  const cover = project.coverImage ? [project.coverImage] : [];
  const gallery = (project.gallery ?? []).filter(Boolean).slice(0, 2);
  const caption = project.summary ?? null;

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

function uniqueProjects(projects: Project[]): Project[] {
  const seen = new Set<string>();
  return projects.filter((project) => {
    if (!project?._id || seen.has(project._id)) return false;
    seen.add(project._id);
    return true;
  });
}

export function resolveHomeSections(
  sections: HomeSection[] | undefined,
  allProjects: Project[],
): HomeSection[] {
  if (!sections?.length) return [];

  return sections.map((section) => {
    if (section._type !== "homeProjectIndexSection") return section;

    let resolvedRows: ResolvedHomeProjectRow[] = [];
    let orderedProjects: Project[] = [];

    if (section.projects?.length) {
      orderedProjects = uniqueProjects(
        section.projects.filter((project) => project?._id),
      );
    } else if (section.rows?.length) {
      resolvedRows = section.rows
        .map((row) => {
          const projects =
            row.projects?.filter((project) => project?._id) ?? [];
          if (!projects.length) return null;

          const layout: RowLayout =
            row.layout === "pair" && projects.length >= 2 ? "pair" : "single";

          return {
            _key: row._key,
            layout,
            projects:
              layout === "pair" ? projects.slice(0, 2) : projects.slice(0, 1),
          };
        })
        .filter((row): row is ResolvedHomeProjectRow => row !== null);
      orderedProjects = uniqueProjects(
        resolvedRows.flatMap((row) => row.projects),
      );
    } else if (section.items?.length) {
      resolvedRows = section.items
        .filter((item) => item.project?._id)
        .map((item, index) => ({
          _key: `legacy-item-${index}`,
          layout: "single" as RowLayout,
          projects: [item.project!],
        }));
      orderedProjects = uniqueProjects(
        resolvedRows.flatMap((row) => row.projects),
      );
    } else {
      orderedProjects = allProjects;
      resolvedRows = allProjects.map((project) => ({
        _key: project._id,
        layout: "single" as RowLayout,
        projects: [project],
      }));
    }

    if (!resolvedRows.length) {
      resolvedRows = orderedProjects.map((project) => ({
        _key: project._id,
        layout: "single" as RowLayout,
        projects: [project],
      }));
    }

    const resolvedProjects: ResolvedHomeProject[] = orderedProjects.map(
      (project, index) => ({
        project,
        rows: synthesizeHomeRows(project, index),
      }),
    );

    return {
      ...section,
      resolvedRows,
      resolvedProjects,
    } satisfies ResolvedHomeProjectIndexSection;
  });
}

function ensureHomeSections(sections: HomeSection[]): HomeSection[] {
  const next = [...sections];

  if (!next.some((section) => section._type === "homeIntroSection")) {
    const intro = fallbackHome.sections?.find(
      (section) => section._type === "homeIntroSection",
    );
    if (intro) next.unshift(intro);
  }

  if (!next.some((section) => section._type === "homeManifestoSection")) {
    const manifesto = fallbackHome.sections?.find(
      (section) => section._type === "homeManifestoSection",
    );
    const index = next.findIndex(
      (section) => section._type === "homeProjectIndexSection",
    );
    if (manifesto) {
      next.splice(index === -1 ? next.length : index, 0, manifesto);
    }
  }

  return next;
}

export async function getHomePageData(): Promise<{
  home: Home;
  sections: HomeSection[];
}> {
  const [home, projects] = await Promise.all([getHome(), getProjects()]);
  const rawSections =
    home.sections?.length ? home.sections : fallbackHome.sections ?? [];
  const sections = resolveHomeSections(
    ensureHomeSections(rawSections),
    projects,
  );
  return { home, sections };
}

export async function getPageBySlug(slug: string): Promise<Page | null> {
  if (!isSanityConfigured) {
    if (slug === "a-propos") return fallbackAboutPage;
    if (slug === "contact") return fallbackContactPage;
    return null;
  }

  try {
    const { data: page } = await sanityFetch({
      query: `*[_type == "page" && slug.current == $slug][0] {
        title,
        "slug": slug.current,
        intro,
        body,
        seo
      }`,
      params: { slug },
    });
    const doc = page as Page | null;
    if (doc) return doc;
    if (slug === "a-propos") return fallbackAboutPage;
    if (slug === "contact") return fallbackContactPage;
    return null;
  } catch {
    if (slug === "a-propos") return fallbackAboutPage;
    if (slug === "contact") return fallbackContactPage;
    return null;
  }
}
