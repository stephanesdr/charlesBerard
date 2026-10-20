import { defineField, defineType } from "sanity";

export const page = defineType({
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "intro",
      title: "Introduction",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "body",
      title: "Contenu",
      type: "blockContent",
    }),
    defineField({
      name: "about",
      title: "About page content",
      type: "aboutContent",
      hidden: ({ document }) => {
        const slug = document?.slug;
        return !(
          typeof slug === "object" &&
          slug !== null &&
          "current" in slug &&
          slug.current === "about"
        );
      },
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
  preview: {
    select: { title: "title" },
  },
});
