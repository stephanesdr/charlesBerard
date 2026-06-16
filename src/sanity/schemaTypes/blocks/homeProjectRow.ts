import { defineArrayMember, defineField, defineType } from "sanity";

export const homeProjectRow = defineType({
  name: "homeProjectRow",
  title: "Ligne de projets",
  type: "object",
  fields: [
    defineField({
      name: "layout",
      title: "Projets sur cette ligne",
      type: "string",
      options: {
        list: [
          { title: "1 projet", value: "single" },
          { title: "2 projets côte à côte", value: "pair" },
        ],
        layout: "radio",
      },
      initialValue: "single",
    }),
    defineField({
      name: "projects",
      title: "Projets",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "project" }],
        }),
      ],
      validation: (rule) =>
        rule.custom((projects, context) => {
          const layout = (context.parent as { layout?: string })?.layout ?? "single";
          const count = projects?.length ?? 0;
          if (layout === "single" && count !== 1) {
            return "Choisissez exactement 1 projet pour une ligne simple.";
          }
          if (layout === "pair" && count !== 2) {
            return "Choisissez exactement 2 projets pour une ligne double.";
          }
          return true;
        }),
    }),
  ],
  preview: {
    select: {
      layout: "layout",
      titles: "projects[].title",
    },
    prepare({ layout, titles }) {
      const list = (titles as string[] | undefined)?.filter(Boolean) ?? [];
      const layoutLabel = layout === "pair" ? "2 projets" : "1 projet";
      return {
        title: list.join(" · ") || "Ligne",
        subtitle: layoutLabel,
      };
    },
  },
});
