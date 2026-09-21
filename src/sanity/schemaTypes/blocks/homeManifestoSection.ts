import { defineField, defineType } from "sanity";
import { BlockquoteIcon } from "@sanity/icons";

export const homeManifestoSection = defineType({
  name: "homeManifestoSection",
  title: "Manifeste",
  type: "object",
  icon: BlockquoteIcon,
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      initialValue: "Manifeste",
    }),
    defineField({
      name: "text",
      title: "Texte",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "label", text: "text" },
    prepare({ title, text }) {
      return {
        title: title || "Manifeste",
        subtitle: text?.slice(0, 80) || "",
      };
    },
  },
});
