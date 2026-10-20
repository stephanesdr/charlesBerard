import { defineField, defineType } from "sanity";
import { BlockContentIcon } from "@sanity/icons";

export const homeIntroSection = defineType({
  name: "homeIntroSection",
  title: "Introduction",
  type: "object",
  icon: BlockContentIcon,
  fields: [
    defineField({
      name: "label",
      title: "Label colonne",
      type: "string",
      initialValue: "Intro",
    }),
    defineField({
      name: "text",
      title: "Texte",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "media",
      title: "Intro media",
      type: "homeIntroMedia",
      description:
        "Large image or silent looping video displayed before the intro statement.",
    }),
  ],
  preview: {
    select: { title: "label", text: "text" },
    prepare({ title, text }) {
      return {
        title: title || "Introduction",
        subtitle: text?.slice(0, 60) || "Introduction",
      };
    },
  },
});
