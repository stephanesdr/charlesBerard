import { defineField, defineType } from "sanity";

export const homeProjectIndexItem = defineType({
  name: "homeProjectIndexItem",
  title: "Projet",
  type: "object",
  fields: [
    defineField({
      name: "project",
      title: "Projet",
      type: "reference",
      to: [{ type: "project" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "listSpan",
      title: "Largeur dans la liste",
      type: "string",
      options: {
        list: [
          { title: "1 colonne", value: "single" },
          { title: "2 colonnes (pleine largeur)", value: "wide" },
        ],
        layout: "radio",
      },
      initialValue: "single",
      description:
        "En grille 2 colonnes : « 2 colonnes » affiche le titre sur toute la largeur.",
    }),
  ],
  preview: {
    select: {
      title: "project.title",
      span: "listSpan",
      status: "project.projectStatus",
    },
    prepare({ title, span, status }) {
      const spanLabel = span === "wide" ? "2 col" : "1 col";
      return {
        title: title || "Projet",
        subtitle: `${spanLabel}${status === "concept" ? " · Axe" : ""}`,
      };
    },
  },
});
