"use client";

import Link from "next/link";
import { stegaClean } from "@sanity/client/stega";
import type { ResolvedHomeProject } from "@/lib/sanity/fallback-data";
import { Media } from "@/components/media/Media";
import { ProjectMediaRow } from "./ProjectMediaRow";

type ProjectBlockProps = {
  item: ResolvedHomeProject;
  priority?: boolean;
};

export function ProjectBlock({ item, priority = false }: ProjectBlockProps) {
  const { project, rows } = item;
  const slug = stegaClean(project.slug) || project.slug;
  const href = `/projets/${slug}`;
  const category =
    project.category ||
    project.services?.slice(0, 2).join(" — ") ||
    "Direction graphique";

  return (
    <article
      data-project-block
      className="relative flex min-h-[200dvh] flex-col gap-12 px-5 py-section-y lg:flex-row lg:gap-16 lg:px-20"
    >
      <header
        data-project-header
        className="flex w-full flex-col justify-end lg:sticky lg:top-0 lg:h-dvh lg:w-3/12 lg:pb-[15dvh]"
      >
        <h2 className="font-h2 m-0 uppercase text-ink">{project.title}</h2>
        <p className="mt-3 font-tag uppercase tracking-[0.6px] text-ink/70">
          {category}
          {project.projectStatus === "concept" ? " — Axe" : ""}
        </p>
        <Link
          href={href}
          aria-label={`Voir le projet ${project.title}`}
          className="relative mt-8 block w-1/2 overflow-hidden lg:w-full"
        >
          <span className="sr-only">Voir le projet</span>
          <div className="relative" data-lcp={priority ? "true" : undefined} style={{ aspectRatio: "2 / 3" }}>
            <Media
              image={project.coverImage}
              fill
              ratio="2 / 3"
              priority={priority}
              placeholderLabel={project.title}
              alt={`Couverture — ${project.title}`}
              sizes="(max-width: 1100px) 50vw, 16vw"
            />
          </div>
        </Link>
      </header>

      <div className="flex w-full flex-col gap-section-y lg:w-7/12 lg:pt-[10dvh]">
        {rows.map((row) => (
          <ProjectMediaRow
            key={row._key}
            row={row}
            projectTitle={project.title}
          />
        ))}
      </div>
    </article>
  );
}
