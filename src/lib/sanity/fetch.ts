import { client } from "./client";
import { isSanityConfigured } from "./env";
import {
  fallbackAboutPage,
  fallbackContactPage,
  fallbackHome,
  fallbackProjects,
  fallbackSiteSettings,
  type Home,
  type HomeSection,
  type ListSpan,
  type Page,
  type Project,
  type ResolvedHomeProjectIndexSection,
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
    const projects = await client.fetch<Project[]>(
      `*[_type == "project"] | order(orderRank asc, order asc, _createdAt desc) { ${projectFields} }`,
    );
    return projects?.length ? projects : fallbackProjects;
  } catch {
    return fallbackProjects;
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  if (!isSanityConfigured) {
    return fallbackProjects.find((p) => p.slug === slug) ?? null;
  }

  try {
    const project = await client.fetch<Project | null>(
      `*[_type == "project" && slug.current == $slug][0] { ${projectFields} }`,
      { slug },
    );
    return project ?? fallbackProjects.find((p) => p.slug === slug) ?? null;
  } catch {
    return fallbackProjects.find((p) => p.slug === slug) ?? null;
  }
}

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!isSanityConfigured) return fallbackSiteSettings;

  try {
    const settings = await client.fetch<SiteSettings | null>(
      `*[_type == "siteSettings"][0] {
        siteTitle,
        headerNavigation,
        footerText,
        footerLinks,
        seo
      }`,
    );
    return settings ?? fallbackSiteSettings;
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
    const home = await client.fetch<Home | null>(homeQuery);
    return home ?? fallbackHome;
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

    const resolvedItems =
      section.projectSource === "manual"
        ? (section.items
            ?.filter((item) => item.project?._id)
            .map((item) => ({
              listSpan: (item.listSpan ?? "single") as ListSpan,
              project: item.project!,
            })) ?? [])
        : allProjects.map((project) => ({
            listSpan: "single" as ListSpan,
            project,
          }));

    return {
      ...section,
      resolvedItems,
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
    const page = await client.fetch<Page | null>(
      `*[_type == "page" && slug.current == $slug][0] {
        title,
        "slug": slug.current,
        intro,
        body,
        seo
      }`,
      { slug },
    );
    if (page) return page;
    if (slug === "a-propos") return fallbackAboutPage;
    if (slug === "contact") return fallbackContactPage;
    return null;
  } catch {
    if (slug === "a-propos") return fallbackAboutPage;
    if (slug === "contact") return fallbackContactPage;
    return null;
  }
}
