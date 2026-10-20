import { defineField, defineType } from "sanity";

export const aboutEditorialSection = defineType({
  name: "aboutEditorialSection",
  title: "About editorial section",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Left-column title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Content",
      type: "blockContent",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "title" },
  },
});
