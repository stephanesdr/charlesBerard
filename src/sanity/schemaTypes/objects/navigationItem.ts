import { defineField, defineType } from "sanity";

export const navigationItem = defineType({
  name: "navigationItem",
  title: "Élément de navigation",
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
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "variant",
      title: "Style bouton",
      type: "string",
      options: {
        list: [
          { title: "Principal", value: "primary" },
          { title: "Secondaire", value: "secondary" },
        ],
      },
      initialValue: "primary",
    }),
    defineField({
      name: "openInNewTab",
      title: "Nouvel onglet",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "href" },
  },
});
