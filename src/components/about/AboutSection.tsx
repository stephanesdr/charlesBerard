import { CustomPortableText } from "@/components/portable-text/CustomPortableText";
import type { AboutEditorialSection } from "@/lib/sanity/fallback-data";
import { aboutPortableTextComponents } from "./aboutPortableText";

type AboutSectionProps = {
  section: AboutEditorialSection;
};

export function AboutSection({ section }: AboutSectionProps) {
  const desktopMinHeight =
    section._key === "approach"
      ? "lg:min-h-[19.5rem]"
      : section._key === "skills"
        ? "lg:min-h-[36rem]"
        : section._key === "career"
          ? "lg:min-h-[54rem]"
          : "";

  return (
    <section
      className={`grid gap-12 lg:grid-cols-[minmax(0,30.125rem)_minmax(0,41rem)] lg:justify-between lg:gap-[13.375rem] ${desktopMinHeight}`}
      data-about-section={section._key}
    >
      <h2 className="m-0 max-w-[30.125rem] text-[clamp(1.625rem,2.016vw,1.905rem)] font-normal leading-[1.18]">
        {section.title}
      </h2>
      <CustomPortableText
        value={section.body}
        components={aboutPortableTextComponents}
        className="max-w-[41rem] [&>h3:first-child]:mt-0"
      />
    </section>
  );
}
