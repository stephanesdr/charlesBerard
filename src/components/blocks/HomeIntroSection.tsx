import type { HomeIntroSection as HomeIntroSectionData } from "@/lib/sanity/fallback-data";

type HomeIntroSectionProps = {
  section: HomeIntroSectionData;
};

export function HomeIntroSection({ section }: HomeIntroSectionProps) {
  if (!section.text) return null;

  return (
    <section className="layout-grid mb-5 border-b border-ink/20 pb-5">
      <div className="content-type-column">{section.label || "Intro"}</div>
      <div className="content-column">
        <p className="font-m text-ink">{section.text}</p>
      </div>
    </section>
  );
}
