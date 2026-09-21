"use client";

import { usePathname } from "next/navigation";
import { Footer } from "./Footer";

type SiteFooterProps = {
  text?: string;
  links?: { label: string; href: string; openInNewTab?: boolean }[];
};

export function SiteFooter(props: SiteFooterProps) {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return <Footer {...props} />;
}
