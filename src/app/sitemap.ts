import type { MetadataRoute } from "next";
import { fallbackProjects } from "@/lib/sanity/fallback-data";
import { getProjects } from "@/lib/sanity/fetch";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects();
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://charlesberard.vercel.app";

  const projectUrls = projects.map((project) => ({
    url: `${baseUrl}/projets/${project.slug}`,
    lastModified: new Date(),
  }));

  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/a-propos`, lastModified: new Date() },
    { url: `${baseUrl}/contact`, lastModified: new Date() },
    ...projectUrls,
  ];
}
