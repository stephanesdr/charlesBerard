import type { Metadata } from "next";
import { AboutPage } from "@/components/about/AboutPage";
import { generatePageMetadata } from "@/components/blocks/PageContent";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata("about");
}

export default function Page() {
  return <AboutPage />;
}
