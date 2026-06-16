export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ||
  process.env.SANITY_API_API_VERSION ||
  "2025-01-01";

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  process.env.SANITY_API_DATASET ||
  process.env.SANITY_STUDIO_API_DATASET ||
  "production";

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  process.env.SANITY_API_PROJECT_ID ||
  process.env.SANITY_STUDIO_API_PROJECT_ID;

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const isSanityConfigured = Boolean(projectId);
