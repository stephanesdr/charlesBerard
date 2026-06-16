import type { Metadata } from "next";
import {
  generatePageMetadata,
  PageContent,
} from "@/components/blocks/PageContent";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata("a-propos");
}

export default function AboutPage() {
  return <PageContent slug="a-propos" />;
}
