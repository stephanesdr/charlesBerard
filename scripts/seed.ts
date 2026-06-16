/**
 * Seed Sanity from CSV content + site pages.
 * Requires NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_TOKEN in .env.local
 */
import { createClient } from "@sanity/client";
import {
  fallbackAboutPage,
  fallbackContactPage,
  fallbackHome,
  fallbackProjects,
  fallbackSiteSettings,
} from "../src/lib/sanity/fallback-data";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN in environment.",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01",
  token,
  useCdn: false,
});

async function seed() {
  console.log("Seeding Sanity dataset:", dataset);

  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    ...fallbackSiteSettings,
  });

  await client.createOrReplace({
    _id: "home",
    _type: "home",
    ...fallbackHome,
  });

  await client.createOrReplace({
    _id: `page-${fallbackAboutPage.slug}`,
    _type: "page",
    title: fallbackAboutPage.title,
    slug: { _type: "slug", current: fallbackAboutPage.slug },
    intro: fallbackAboutPage.intro,
    body: fallbackAboutPage.body,
    seo: fallbackAboutPage.seo,
  });

  await client.createOrReplace({
    _id: `page-${fallbackContactPage.slug}`,
    _type: "page",
    title: fallbackContactPage.title,
    slug: { _type: "slug", current: fallbackContactPage.slug },
    intro: fallbackContactPage.intro,
    body: fallbackContactPage.body,
    seo: fallbackContactPage.seo,
  });

  for (const project of fallbackProjects) {
    await client.createOrReplace({
      _id: project._id,
      _type: "project",
      title: project.title,
      slug: { _type: "slug", current: project.slug },
      services: project.services,
      summary: project.summary,
      body: project.body,
      projectStatus: project.projectStatus,
      order: project.order,
    });
  }

  console.log("Seed complete:", fallbackProjects.length, "projects");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
