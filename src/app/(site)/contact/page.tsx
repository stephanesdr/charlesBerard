import type { Metadata } from "next";
import {
  generatePageMetadata,
  PageContent,
} from "@/components/blocks/PageContent";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata("contact");
}

export default function ContactPage() {
  return <PageContent slug="contact" />;
}
