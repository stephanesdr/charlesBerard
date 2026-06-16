import type {
  HomeIntroSection,
  HomeSection,
  ResolvedHomeProjectIndexSection,
} from "@/lib/sanity/fallback-data";
import { HomeIntroSection as HomeIntroSectionBlock } from "./HomeIntroSection";
import { HomeProjectIndexSection } from "./HomeProjectIndexSection";

type HomeSectionsProps = {
  sections: HomeSection[];
};

function isResolvedProjectIndex(
  section: HomeSection,
): section is ResolvedHomeProjectIndexSection {
  return section._type === "homeProjectIndexSection" && "resolvedItems" in section;
}

export function HomeSections({ sections }: HomeSectionsProps) {
  return (
    <>
      {sections.map((section) => {
        if (section._type === "homeIntroSection") {
          return (
            <HomeIntroSectionBlock
              key={section._key}
              section={section as HomeIntroSection}
            />
          );
        }

        if (section._type === "homeProjectIndexSection" && isResolvedProjectIndex(section)) {
          return (
            <HomeProjectIndexSection key={section._key} section={section} />
          );
        }

        return null;
      })}
    </>
  );
}
