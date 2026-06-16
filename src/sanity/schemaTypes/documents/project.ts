import {
  orderRankField,
  orderRankOrdering,
} from "@sanity/orderable-document-list";
import { defineArrayMember, defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Projet",
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
      name: "services",
      title: "Services",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "summary",
      title: "Résumé",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "body",
      title: "Texte",
      type: "blockContent",
    }),
    defineField({
      name: "coverImage",
      title: "Image de couverture",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "gallery",
      title: "Galerie",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", title: "Alt", type: "string" }),
          ],
        }),
      ],
    }),
    defineField({
      name: "projectStatus",
      title: "Statut",
      type: "string",
      options: {
        list: [
          { title: "Réalisé", value: "realized" },
          { title: "Axe / non sélectionné", value: "concept" },
        ],
        layout: "radio",
      },
      initialValue: "realized",
      description:
        "« Axe » : travail présenté même si le projet n'a pas été sélectionné ou publié.",
    }),
    orderRankField({ type: "project", hidden: true }),
    defineField({
      name: "order",
      title: "Ordre (legacy)",
      type: "number",
      hidden: true,
      deprecated: {
        reason: "Utiliser « Projets (ordre) » pour réordonner via orderRank.",
      },
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
  orderings: [
    orderRankOrdering,
    {
      title: "Ordre legacy",
      name: "orderAsc",
      by: [
        { field: "order", direction: "asc" },
        { field: "_createdAt", direction: "desc" },
      ],
    },
  ],
  preview: {
    select: { title: "title", media: "coverImage", status: "projectStatus" },
    prepare({ title, media, status }) {
      return {
        title,
        media,
        subtitle: status === "concept" ? "Axe" : "Réalisé",
      };
    },
  },
});
