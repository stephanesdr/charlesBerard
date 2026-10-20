import { defineField, defineType } from "sanity";

export const aboutFooter = defineType({
  name: "aboutFooter",
  title: "About footer",
  type: "object",
  fields: [
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (rule) => rule.email(),
    }),
  ],
});
