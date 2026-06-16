import { defineLocations } from "sanity/presentation";
import type { PresentationPluginOptions } from "sanity/presentation";

export const resolve: PresentationPluginOptions["resolve"] = {
  locations: {
    home: defineLocations({
      select: { title: "title" },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || "Accueil",
            href: "/",
          },
        ],
      }),
    }),
    project: defineLocations({
      select: { title: "title", slug: "slug.current" },
      resolve: (doc) => {
        if (!doc?.slug) return { locations: [] };
        return {
          locations: [
            {
              title: doc.title || "Projet",
              href: `/projets/${doc.slug}`,
            },
          ],
        };
      },
    }),
    page: defineLocations({
      select: { title: "title", slug: "slug.current" },
      resolve: (doc) => {
        if (!doc?.slug) return { locations: [] };
        return {
          locations: [
            {
              title: doc.title || "Page",
              href: `/${doc.slug}`,
            },
          ],
        };
      },
    }),
  },
};
