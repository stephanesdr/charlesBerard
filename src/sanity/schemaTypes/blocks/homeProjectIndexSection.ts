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
      name: "rows",
      title: "Lignes",
      type: "array",
      of: [defineArrayMember({ type: "homeProjectRow" })],
      description:
        "Empilez des lignes : 1 projet ou 2 projets côte à côte. L’ordre définit l’index sur la page.",
    }),
    defineField({
      name: "showSidebar",
      title: "Afficher la colonne latérale",
      type: "boolean",
      initialValue: true,
      description: "Colonne droite (compteur + lien), comme grillitype.com.",
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
      rows: "rows",
    },
    prepare({ label, rows }) {
      const count = rows?.length ?? 0;
      const pairCount =
        rows?.filter((row: { layout?: string }) => row.layout === "pair").length ?? 0;
      const pairHint = pairCount > 0 ? ` · ${pairCount} double(s)` : "";

      return {
        title: label || "Index projets",
        subtitle: `${count} ligne${count > 1 ? "s" : ""}${pairHint}`,
      };
    },
  },
});
