import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, siteUrl } from "./env";

const studioUrl = `${siteUrl.replace(/\/$/, "")}/studio`;

export const client = createClient({
  projectId: projectId || "placeholder",
  dataset,
  apiVersion,
  useCdn: true,
  stega: {
    enabled: false,
    studioUrl,
  },
});
