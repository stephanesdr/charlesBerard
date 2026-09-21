import type { Metadata } from "next";
import "./globals.css";
import { getSiteSettings } from "@/lib/sanity/fetch";
import { Inter_Tight } from "next/font/google";
import { cn } from "@/lib/utils";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import { DisableDraftMode } from "@/components/sanity/DisableDraftMode";
import { SanityLive } from "@/lib/sanity/live";

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-inter-tight",
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
      className={cn("font-sans", interTight.variable)}
      suppressHydrationWarning
    >
      <body
        className="min-h-screen bg-surface text-ink"
        style={{
          fontFamily:
            '"PP Neue Montreal", var(--font-inter-tight), ui-sans-serif, system-ui, sans-serif',
          backgroundColor: "#fef5f9",
          color: "#212a37",
        }}
        suppressHydrationWarning
      >
        {children}
        {!isDraft && <SanityLive includeDrafts={false} />}
        {isDraft && (
          <>
            <VisualEditing />
            <DisableDraftMode />
          </>
        )}
      </body>
    </html>
  );
}
