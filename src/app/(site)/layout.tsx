import { AreaHeader } from "@/components/layout/AreaHeader";
import { Footer } from "@/components/layout/Footer";
import { SiteContainer } from "@/components/layout/SiteContainer";
import { AnimationOrchestratorProvider } from "@/lib/animation/orchestrator";
import { getSiteSettings } from "@/lib/sanity/fetch";

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();

  return (
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
  );
}
