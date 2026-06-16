"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/sanity/fallback-data";
import { Media } from "@/components/media/Media";
import { useRevealOnScroll } from "@/lib/animation/useRevealOnScroll";

type ProjectListProps = {
  projects: Project[];
  label?: string;
};

export function ProjectList({ projects, label = "Projets" }: ProjectListProps) {
  const sectionRef = useRevealOnScroll<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      className={cn(
        "layout-grid library-overview-2columns",
        "margin-bottom-l border-b border-ink/20 pb-5",
      )}
    >
      <div className="content-type-column hidden sm:grid text-sm leading-[1.375]">
        {label}
      </div>
      <div className="library-column font-m sm:col-span-12">
        <ul
          className={cn(
            "m-0 grid list-none gap-x-5 gap-y-3 p-0",
            "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
          )}
        >
          {projects.map((project) => (
            <li key={project._id} className="group">
              <Link
                href={`/projets/${project.slug}`}
                className="block no-underline"
              >
                <Media
                  image={project.coverImage}
                  placeholderLabel={project.title}
                  className="mb-3"
                  sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 33vw"
                />
                <span className="block text-base font-normal leading-[1.35] text-ink group-hover:text-accent transition-colors">
                  {project.title}
                </span>
                {project.projectStatus === "concept" && (
                  <span className="mt-1 block text-xs font-bold uppercase tracking-wide text-ink/50">
                    Axe
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
