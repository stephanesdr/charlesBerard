import { sanityFetch } from "./live";
import { isSanityConfigured } from "./env";
import {
  fallbackAboutPage,
  fallbackContactPage,
  fallbackHome,
  fallbackProjects,
  fallbackSiteSettings,
  type Home,
  type HomeSection,
  type Page,
  type Project,
  type ResolvedHomeProjectIndexSection,
  type ResolvedHomeProjectRow,
  type RowLayout,
  type SiteSettings,
} from "./fallback-data";

const projectListFields = `
  _id,
  title,
  "slug": slug.current,
  projectStatus
`;

const projectFields = `
  _id,
  title,
  "slug": slug.current,
  services,
  summary,
  body,
  coverImage,
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
  sections[]{
    _type,
    _key,
    label,
    text,
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

export function resolveHomeSections(
  sections: HomeSection[] | undefined,
  allProjects: Project[],
): HomeSection[] {
  if (!sections?.length) return [];

  return sections.map((section) => {
    if (section._type !== "homeProjectIndexSection") return section;

    let resolvedRows: ResolvedHomeProjectRow[] = [];

    if (section.rows?.length) {
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
    } else if (section.items?.length) {
      resolvedRows = section.items
        .filter((item) => item.project?._id)
        .map((item, index) => ({
          _key: `legacy-item-${index}`,
          layout: "single" as RowLayout,
          projects: [item.project!],
        }));
    } else if (section.projectSource === "all") {
      resolvedRows = allProjects.map((project) => ({
        _key: project._id,
        layout: "single" as RowLayout,
        projects: [project],
      }));
    }

    return {
      ...section,
      resolvedRows,
    } satisfies ResolvedHomeProjectIndexSection;
  });
}

export async function getHomePageData(): Promise<{
  home: Home;
  sections: HomeSection[];
}> {
  const [home, projects] = await Promise.all([getHome(), getProjects()]);
  const rawSections =
    home.sections?.length ? home.sections : fallbackHome.sections ?? [];
  const sections = resolveHomeSections(rawSections, projects);
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
