import { defineArrayMember, defineField, defineType } from "sanity";
import { HomeIcon } from "@sanity/icons";

export const home = defineType({
  name: "home",
  title: "Accueil",
  type: "document",
  icon: HomeIcon,
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      type: "string",
      initialValue: "Accueil",
    }),
    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      of: [
        defineArrayMember({ type: "homeIntroSection" }),
        defineArrayMember({ type: "homeProjectIndexSection" }),
      ],
      options: {
        layout: "grid",
      },
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
  preview: {
    select: { sections: "sections" },
    prepare({ sections }) {
      return {
        title: "Accueil",
        subtitle: `${sections?.length ?? 0} section(s)`,
      };
    },
  },
});
