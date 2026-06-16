import { type SchemaTypeDefinition } from "sanity";
import { blockContent } from "./objects/blockContent";
import { link } from "./objects/link";
import { navigationItem } from "./objects/navigationItem";
import { seo } from "./objects/seo";
import { project } from "./documents/project";
import { siteSettings } from "./documents/siteSettings";
import { page } from "./documents/page";
import { home } from "./documents/home";

export const schemaTypes: SchemaTypeDefinition[] = [
  blockContent,
  link,
  navigationItem,
  seo,
  project,
  siteSettings,
  page,
  home,
];
