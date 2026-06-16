import { apiVersion, dataset, projectId, siteUrl } from "./env";

/** Vercel Marketplace / Sanity integration token names. */
export const readToken =
  process.env.SANITY_API_READ_TOKEN ??
  process.env.SANITY_API_READ_WRITE_TOKEN;

export const writeToken =
  process.env.SANITY_API_TOKEN ??
  process.env.SANITY_API_WRITE_TOKEN;

export const sanityEnv = {
  projectId:
    projectId ??
    process.env.SANITY_API_PROJECT_ID ??
    process.env.SANITY_STUDIO_API_PROJECT_ID,
  dataset:
    dataset ??
    process.env.SANITY_API_DATASET ??
    process.env.SANITY_STUDIO_API_DATASET,
  apiVersion,
  siteUrl,
};
