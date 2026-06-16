"use client";

import Link from "next/link";
import { stegaClean } from "@sanity/client/stega";
import { cn } from "@/lib/utils";
import type {
  Project,
  ResolvedHomeProjectIndexSection,
} from "@/lib/sanity/fallback-data";
import { useRevealOnScroll } from "@/lib/animation/useRevealOnScroll";

type HomeProjectIndexSectionProps = {
  section: ResolvedHomeProjectIndexSection;
};

const defaultSidebarLink = {
  label: "Contact",
  href: "/contact",
  openInNewTab: false,
};

function ProjectIndexLink({ project }: { project: Project }) {
  const slug = stegaClean(project.slug) || project.slug;

  return (
    <Link href={`/projets/${slug}`}>
      {project.title}
      {project.projectStatus === "concept" && (
        <span className="mt-2 block text-[0.35em] font-bold uppercase tracking-wide text-ink/50">
          Axe
        </span>
      )}
    </Link>
  );
}

export function HomeProjectIndexSection({
  section,
}: HomeProjectIndexSectionProps) {
  const sectionRef = useRevealOnScroll<HTMLElement>();
  const rows = section.resolvedRows ?? [];
  const projectCount = new Set(
    rows.flatMap((row) => row.projects.map((project) => project._id)),
  ).size;

  const sidebarLink = {
    label: section.sidebarLink?.label ?? defaultSidebarLink.label,
    href: section.sidebarLink?.href ?? defaultSidebarLink.href,
    openInNewTab:
      section.sidebarLink?.openInNewTab ?? defaultSidebarLink.openInNewTab,
  };
  const sidebarHref =
    stegaClean(sidebarLink.href) || defaultSidebarLink.href;
  const isExternalLink = sidebarHref.startsWith("http");

  return (
    <section
      ref={sectionRef}
      className="layout-grid library-overview-2columns mb-5 border-b border-ink/20 pb-5"
    >
      <div className="content-type-column">{section.label || "Projets"}</div>
      <div className="library-column font-xxl project-index-rows">
        {rows.map((row) => (
          <ul
            key={row._key}
            className={cn(
              "project-index-row",
              row.layout === "pair"
                ? "project-index-row-pair"
                : "project-index-row-single",
            )}
          >
            {row.projects.map((project) => (
              <li key={project._id}>
                <ProjectIndexLink project={project} />
              </li>
            ))}
          </ul>
        ))}
      </div>
      {section.showSidebar && (
        <div className="trial-download-column">
          <p className="mb-4 text-ink/70">
            {projectCount} projet{projectCount > 1 ? "s" : ""}
          </p>
          {isExternalLink ? (
            <a
              href={sidebarHref}
              className="font-bold text-ink no-underline transition-colors hover:text-brand"
              target={sidebarLink.openInNewTab ? "_blank" : undefined}
              rel={
                sidebarLink.openInNewTab ? "noreferrer noopener" : undefined
              }
            >
              {sidebarLink.label}
            </a>
          ) : (
            <Link
              href={sidebarHref}
              className="font-bold text-ink no-underline transition-colors hover:text-brand"
            >
              {sidebarLink.label}
            </Link>
          )}
        </div>
      )}
    </section>
  );
}
