import { defineArrayMember, defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Paramètres du site",
  type: "document",
  fields: [
    defineField({
      name: "siteTitle",
      title: "Titre du site",
      type: "string",
      initialValue: "Charles Berard",
    }),
    defineField({
      name: "headerNavigation",
      title: "Navigation (boutons fixes)",
      type: "array",
      of: [defineArrayMember({ type: "navigationItem" })],
    }),
    defineField({
      name: "footerText",
      title: "Texte footer",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "footerLinks",
      title: "Liens footer",
      type: "array",
      of: [defineArrayMember({ type: "link" })],
    }),
    defineField({
      name: "seo",
      title: "SEO global",
      type: "seo",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Paramètres du site" };
    },
  },
});
