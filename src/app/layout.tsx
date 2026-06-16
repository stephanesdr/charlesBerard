import type { Metadata } from "next";
import "./globals.css";
import { getSiteSettings } from "@/lib/sanity/fetch";
import { Space_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    title: {
      default: settings.seo?.title || settings.siteTitle,
      template: `%s — ${settings.siteTitle}`,
    },
    description:
      settings.seo?.description ||
      "Portfolio Charles Berard — direction graphique.",
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDraft = (await draftMode()).isEnabled;

  return (
    <html
      lang="fr"
      className={cn("font-sans", spaceMono.variable)}
      suppressHydrationWarning
    >
      <body className="min-h-screen" suppressHydrationWarning>
        {children}
        {isDraft && <VisualEditing />}
      </body>
    </html>
  );
}
