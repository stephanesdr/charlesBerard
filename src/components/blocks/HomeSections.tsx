import type {
  HomeIntroSection,
  HomeManifestoSection,
  HomeSection,
  ResolvedHomeProjectIndexSection,
} from "@/lib/sanity/fallback-data";
import { HeroTitle } from "@/components/home/HeroTitle";
import { SiteMarquee } from "@/components/home/SiteMarquee";
import { ServicesStatement } from "@/components/home/ServicesStatement";
import { HomeIntroMedia } from "@/components/home/HomeIntroMedia";
import { ManifestoBox } from "@/components/home/ManifestoBox";
import { ProjectIndex } from "@/components/home/ProjectIndex";
import { HomeFooter } from "@/components/home/HomeFooter";

type HomeSectionsProps = {
  sections: HomeSection[];
  heroTitle: string;
  marqueeText: string;
  siteTitle: string;
  projectLinksEnabled: boolean;
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
  projectLinksEnabled,
}: HomeSectionsProps) {
  const intro = sections.find(
    (section): section is HomeIntroSection =>
      section._type === "homeIntroSection",
  );

  return (
    <>
      <div data-home-hero-stage className="relative h-[105dvh]">
        <HeroTitle title={heroTitle} />
        <HomeIntroMedia media={intro?.media} />
      </div>
      <SiteMarquee text={marqueeText} />
      {sections.map((section) => {
        if (section._type === "homeIntroSection") {
          return section.text ? (
            <ServicesStatement key={section._key} text={section.text} />
          ) : null;
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
          return (
            <ProjectIndex
              key={section._key}
              section={section}
              projectLinksEnabled={projectLinksEnabled}
            />
          );
        }

        return null;
      })}
      <HomeFooter siteTitle={siteTitle} />
    </>
  );
}
