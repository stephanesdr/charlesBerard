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
      name: "columnLayout",
      title: "Grille de la liste",
      type: "string",
      options: {
        list: [
          { title: "1 colonne", value: "one" },
          { title: "2 colonnes", value: "two" },
        ],
        layout: "radio",
      },
      initialValue: "two",
    }),
    defineField({
      name: "projectSource",
      title: "Source des projets",
      type: "string",
      options: {
        list: [
          { title: "Tous les projets (ordre global)", value: "all" },
          { title: "Sélection manuelle", value: "manual" },
        ],
        layout: "radio",
      },
      initialValue: "all",
    }),
    defineField({
      name: "items",
      title: "Projets",
      type: "array",
      of: [defineArrayMember({ type: "homeProjectIndexItem" })],
      hidden: ({ parent }) => parent?.projectSource !== "manual",
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
  ],
  preview: {
    select: {
      label: "label",
      columnLayout: "columnLayout",
      projectSource: "projectSource",
      items: "items",
    },
    prepare({ label, columnLayout, projectSource, items }) {
      const cols = columnLayout === "one" ? "1 col" : "2 col";
      const source =
        projectSource === "manual"
          ? `${items?.length ?? 0} sélectionnés`
          : "tous";
      const wideCount =
        items?.filter((item: { listSpan?: string }) => item.listSpan === "wide")
          .length ?? 0;
      const wide =
        columnLayout === "two" && wideCount > 0 ? ` · ${wideCount} large` : "";

      return {
        title: label || "Index projets",
        subtitle: `Index · ${cols} · ${source}${wide}`,
      };
    },
  },
});
