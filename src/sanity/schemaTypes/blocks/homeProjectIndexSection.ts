import { defineArrayMember, defineField, defineType } from "sanity";
import { ThListIcon } from "@sanity/icons";

export const homeProjectIndexSection = defineType({
  name: "homeProjectIndexSection",
  title: "Index projets",
  type: "object",
  icon: ThListIcon,
  fields: [
    defineField({
      name: "label",
      title: "Label colonne",
      type: "string",
      initialValue: "Projets",
    }),
    defineField({
      name: "projects",
      title: "Projets (index)",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "project" }],
        }),
      ],
      description:
        "Ordre des blocs sticky sur la home. Chaque projet expose ses rangées médias (homeRows).",
    }),
    defineField({
      name: "rows",
      title: "Lignes (legacy)",
      type: "array",
      of: [defineArrayMember({ type: "homeProjectRow" })],
      hidden: true,
      deprecated: {
        reason:
          "Utiliser `projects` : un projet = un bloc sticky + rangées médias.",
      },
    }),
    defineField({
      name: "showSidebar",
      title: "Afficher la colonne latérale",
      type: "boolean",
      initialValue: false,
      hidden: true,
      deprecated: {
        reason: "L’index sticky n’utilise plus de colonne latérale Grilli.",
      },
    }),
    defineField({
      name: "sidebarLink",
      title: "Lien colonne latérale",
      type: "link",
      hidden: ({ parent }) => !parent?.showSidebar,
    }),
    // Legacy — migré automatiquement côté frontend si `rows` est vide
    defineField({
      name: "columnLayout",
      title: "Grille (legacy)",
      type: "string",
      hidden: true,
      deprecated: { reason: "Utiliser les lignes (rows) pour composer l’index." },
    }),
    defineField({
      name: "projectSource",
      title: "Source (legacy)",
      type: "string",
      hidden: true,
      deprecated: { reason: "Utiliser les lignes (rows) pour composer l’index." },
    }),
    defineField({
      name: "items",
      title: "Projets (legacy)",
      type: "array",
      of: [defineArrayMember({ type: "homeProjectIndexItem" })],
      hidden: true,
      deprecated: { reason: "Utiliser les lignes (rows) pour composer l’index." },
    }),
  ],
  preview: {
    select: {
      label: "label",
      projects: "projects",
    },
    prepare({ label, projects }) {
      const count = projects?.length ?? 0;
      return {
        title: label || "Index projets",
        subtitle: `${count} projet${count > 1 ? "s" : ""}`,
      };
    },
  },
});
