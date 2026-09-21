import type {
  HomeIntroSection,
  HomeManifestoSection,
  HomeSection,
  ResolvedHomeProjectIndexSection,
} from "@/lib/sanity/fallback-data";
import { HeroTitle } from "@/components/home/HeroTitle";
import { SiteMarquee } from "@/components/home/SiteMarquee";
import { ServicesStatement } from "@/components/home/ServicesStatement";
import { ManifestoBox } from "@/components/home/ManifestoBox";
import { ProjectIndex } from "@/components/home/ProjectIndex";
import { HomeFooter } from "@/components/home/HomeFooter";

type HomeSectionsProps = {
  sections: HomeSection[];
  heroTitle: string;
  marqueeText: string;
  siteTitle: string;
};

function isResolvedProjectIndex(
  section: HomeSection,
): section is ResolvedHomeProjectIndexSection {
  return (
    section._type === "homeProjectIndexSection" &&
    "resolvedProjects" in section
  );
}

export function HomeSections({
  sections,
  heroTitle,
  marqueeText,
  siteTitle,
}: HomeSectionsProps) {
  return (
    <>
      <HeroTitle title={heroTitle} />
      <SiteMarquee text={marqueeText} />
      {sections.map((section) => {
        if (section._type === "homeIntroSection") {
          const intro = section as HomeIntroSection;
          if (!intro.text) return null;
          return (
            <ServicesStatement key={section._key} text={intro.text} />
          );
        }

        if (section._type === "homeManifestoSection") {
          const manifesto = section as HomeManifestoSection;
          if (!manifesto.text) return null;
          return <ManifestoBox key={section._key} text={manifesto.text} />;
        }

        if (
          section._type === "homeProjectIndexSection" &&
          isResolvedProjectIndex(section)
        ) {
          return <ProjectIndex key={section._key} section={section} />;
        }

        return null;
      })}
      <HomeFooter siteTitle={siteTitle} />
    </>
  );
}
