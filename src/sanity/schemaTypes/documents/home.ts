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
      name: "heroTitle",
      title: "Titre hero",
      type: "string",
      initialValue: "Charles Bérard",
    }),
    defineField({
      name: "marqueeText",
      title: "Texte marquee",
      type: "string",
      initialValue: "Charles Bérard, brand designer & creative director",
    }),
    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      of: [
        defineArrayMember({ type: "homeIntroSection" }),
        defineArrayMember({ type: "homeManifestoSection" }),
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
