import type { ResolvedHomeProjectIndexSection } from "@/lib/sanity/fallback-data";
import { ProjectBlock } from "./ProjectBlock";

type ProjectIndexProps = {
  section: ResolvedHomeProjectIndexSection;
};

export function ProjectIndex({ section }: ProjectIndexProps) {
  const projects = section.resolvedProjects ?? [];

  if (!projects.length) return null;

  return (
    <section data-home-section="index" className="relative z-30">
      {projects.map((item, index) => (
        <ProjectBlock
          key={item.project._id}
          item={item}
          priority={index === 0}
        />
      ))}
    </section>
  );
}
