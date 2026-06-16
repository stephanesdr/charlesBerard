import { defineField, defineType } from "sanity";

export const home = defineType({
  name: "home",
  title: "Accueil",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      type: "string",
      initialValue: "Accueil",
    }),
    defineField({
      name: "projectsLabel",
      title: "Label section projets",
      type: "string",
      initialValue: "Projets",
    }),
    defineField({
      name: "intro",
      title: "Introduction",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Accueil" };
    },
  },
});
