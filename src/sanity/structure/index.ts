import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import { DocumentsIcon, HomeIcon } from "@sanity/icons";
import type { StructureResolver } from "sanity/structure";

const HIDDEN_TYPES = ["home", "siteSettings", "project"];

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title("Contenu")
    .items([
      S.listItem()
        .title("Accueil")
        .id("home")
        .icon(HomeIcon)
        .child(
          S.document()
            .schemaType("home")
            .documentId("home")
            .title("Accueil"),
        ),
      S.listItem()
        .title("Paramètres du site")
        .id("siteSettings")
        .icon(DocumentsIcon)
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
            .title("Paramètres du site"),
        ),
      S.divider(),
      orderableDocumentListDeskItem({
        type: "project",
        title: "Projets (ordre)",
        icon: DocumentsIcon,
        id: "orderable-projects",
        S,
        context,
      }),
      ...S.documentTypeListItems().filter(
        (item) => !HIDDEN_TYPES.includes(item.getId() ?? ""),
      ),
    ]);
