import { client } from "./client";
import { isSanityConfigured } from "./env";
import {
  fallbackAboutPage,
  fallbackContactPage,
  fallbackHome,
  fallbackProjects,
  fallbackSiteSettings,
  type Home,
  type Page,
  type Project,
  type SiteSettings,
} from "./fallback-data";

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
  order,
  seo
`;

export async function getProjects(): Promise<Project[]> {
  if (!isSanityConfigured) return fallbackProjects;

  try {
    const projects = await client.fetch<Project[]>(
      `*[_type == "project"] | order(order asc, _createdAt desc) { ${projectFields} }`,
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

export async function getHome(): Promise<Home> {
  if (!isSanityConfigured) return fallbackHome;

  try {
    const home = await client.fetch<Home | null>(
      `*[_type == "home"][0] {
        title,
        projectsLabel,
        intro,
        seo
      }`,
    );
    return home ?? fallbackHome;
  } catch {
    return fallbackHome;
  }
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
