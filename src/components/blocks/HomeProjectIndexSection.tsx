"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ResolvedHomeProjectIndexSection } from "@/lib/sanity/fallback-data";
import { useRevealOnScroll } from "@/lib/animation/useRevealOnScroll";

type HomeProjectIndexSectionProps = {
  section: ResolvedHomeProjectIndexSection;
};

export function HomeProjectIndexSection({
  section,
}: HomeProjectIndexSectionProps) {
  const sectionRef = useRevealOnScroll<HTMLElement>();
  const items = section.resolvedItems ?? [];
  const columnLayout = section.columnLayout ?? "two";
  const isTwoCol = columnLayout === "two";

  const sidebarLink = section.sidebarLink ?? {
    label: "Contact",
    href: "/contact",
    openInNewTab: false,
  };

  return (
    <section
      ref={sectionRef}
      className={cn(
        "layout-grid mb-5 border-b border-ink/20 pb-5",
        isTwoCol ? "library-overview-2columns" : "library-overview-1column",
      )}
    >
      <div className="content-type-column">{section.label || "Projets"}</div>
      <div className="library-column font-xxl">
        <ul>
          {items.map(({ project, listSpan }) => (
            <li
              key={project._id}
              className={cn(
                isTwoCol && listSpan === "wide" && "project-index-wide",
              )}
            >
              <Link href={`/projets/${project.slug}`}>
                {project.title}
                {project.projectStatus === "concept" && (
                  <span className="mt-2 block text-[0.35em] font-bold uppercase tracking-wide text-ink/50">
                    Axe
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {section.showSidebar && (
        <div className="trial-download-column">
          <p className="mb-4 text-ink/70">
            {items.length} projet{items.length > 1 ? "s" : ""}
          </p>
          {sidebarLink.href.startsWith("http") ? (
            <a
              href={sidebarLink.href}
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
              href={sidebarLink.href}
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
