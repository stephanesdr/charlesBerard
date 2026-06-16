import { defineField, defineType } from "sanity";

export const link = defineType({
  name: "link",
  title: "Lien",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "href",
      title: "URL",
      type: "string",
      description: "Chemin interne (/projets) ou URL externe",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "openInNewTab",
      title: "Nouvel onglet",
      type: "boolean",
      initialValue: false,
    }),
  ],
});
