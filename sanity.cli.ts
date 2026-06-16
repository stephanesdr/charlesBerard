import { defineCliConfig } from "sanity/cli";

const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  process.env.SANITY_API_PROJECT_ID ||
  process.env.SANITY_STUDIO_API_PROJECT_ID;
const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  process.env.SANITY_API_DATASET ||
  process.env.SANITY_STUDIO_API_DATASET ||
  "production";

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
  studioHost: process.env.SANITY_STUDIO_HOST,
  project: {
    basePath: "/studio",
  },
});
