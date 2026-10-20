import { type SchemaTypeDefinition } from "sanity";
import { homeIntroSection } from "./blocks/homeIntroSection";
import { homeManifestoSection } from "./blocks/homeManifestoSection";
import { homeProjectIndexItem } from "./blocks/homeProjectIndexItem";
import { homeProjectRow } from "./blocks/homeProjectRow";
import { homeProjectIndexSection } from "./blocks/homeProjectIndexSection";
import { homeMediaRow } from "./objects/homeMediaRow";
import { homeIntroMedia } from "./objects/homeIntroMedia";
import { aboutEditorialSection } from "./objects/aboutEditorialSection";
import { aboutFooter } from "./objects/aboutFooter";
import { aboutContent } from "./objects/aboutContent";
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
  homeMediaRow,
  homeIntroMedia,
  aboutEditorialSection,
  aboutFooter,
  aboutContent,
  homeIntroSection,
  homeManifestoSection,
  homeProjectIndexItem,
  homeProjectRow,
  homeProjectIndexSection,
  project,
  siteSettings,
  page,
  home,
];
