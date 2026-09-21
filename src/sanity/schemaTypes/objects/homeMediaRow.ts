import { defineArrayMember, defineField, defineType } from "sanity";

export const homeMediaRow = defineType({
  name: "homeMediaRow",
  title: "Rangée médias (home)",
  type: "object",
  fields: [
    defineField({
      name: "layout",
      title: "Disposition",
      type: "string",
      options: {
        list: [
          { title: "1 média", value: "single" },
          { title: "2 médias", value: "pair" },
        ],
        layout: "radio",
      },
      initialValue: "single",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "media",
      title: "Médias",
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
      validation: (rule) => rule.max(2),
    }),
    defineField({
      name: "caption",
      title: "Légende",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    select: { layout: "layout", caption: "caption", media: "media.0" },
    prepare({ layout, caption, media }) {
      return {
        title: layout === "pair" ? "Rangée paire" : "Rangée simple",
        subtitle: caption || "Sans légende",
        media,
      };
    },
  },
});
