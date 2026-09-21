import { AreaHeader } from "@/components/layout/AreaHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
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
      <SmoothScroll>
        <AreaHeader
          siteTitle={settings.siteTitle}
          navigation={settings.headerNavigation ?? []}
        />
        <main className="pt-14 sm:pt-12">{children}</main>
        <SiteFooter text={settings.footerText} links={settings.footerLinks} />
      </SmoothScroll>
    </AnimationOrchestratorProvider>
  );
}
