import type { Metadata } from "next";
import "./globals.css";
import { AreaHeader } from "@/components/layout/AreaHeader";
import { Footer } from "@/components/layout/Footer";
import { SiteContainer } from "@/components/layout/SiteContainer";
import { AnimationOrchestratorProvider } from "@/lib/animation/orchestrator";
import { getSiteSettings } from "@/lib/sanity/fetch";
import { Space_Mono } from "next/font/google";
import { cn } from "@/lib/utils";

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
  const settings = await getSiteSettings();

  return (
    <html lang="fr" className={cn("font-sans", spaceMono.variable)}>
      <body className="min-h-screen">
        <AnimationOrchestratorProvider>
          <AreaHeader
            siteTitle={settings.siteTitle}
            navigation={settings.headerNavigation ?? []}
          />
          <main className="pt-14 sm:pt-12">
            <SiteContainer>{children}</SiteContainer>
          </main>
          <Footer text={settings.footerText} links={settings.footerLinks} />
        </AnimationOrchestratorProvider>
      </body>
    </html>
  );
}
