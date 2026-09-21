import { HomeSections } from "@/components/blocks/HomeSections";
import { getHomePageData, getSiteSettings } from "@/lib/sanity/fetch";

export default async function HomePage() {
  const [{ home, sections }, settings] = await Promise.all([
    getHomePageData(),
    getSiteSettings(),
  ]);

  return (
    <div id="main-content">
      <HomeSections
        sections={sections}
        heroTitle={home.heroTitle || settings.siteTitle}
        marqueeText={
          home.marqueeText ||
          `${settings.siteTitle}, brand designer & creative director`
        }
        siteTitle={settings.siteTitle}
      />
    </div>
  );
}
