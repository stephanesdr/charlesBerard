import { defineArrayMember, defineField, defineType } from "sanity";

export const aboutContent = defineType({
  name: "aboutContent",
  title: "About content",
  type: "object",
  fields: [
    defineField({
      name: "heroLines",
      title: "Hero lines",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      validation: (rule) =>
        rule.required().length(2).error("The shader hero requires two lines."),
    }),
    defineField({
      name: "standfirst",
      title: "Standfirst",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "clients",
      title: "Clients",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "sections",
      title: "Editorial sections",
      type: "array",
      of: [defineArrayMember({ type: "aboutEditorialSection" })],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "manifesto",
      title: "Manifesto",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "closing",
      title: "Closing statement",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "footer",
      title: "Footer",
      type: "aboutFooter",
      validation: (rule) => rule.required(),
    }),
  ],
});
