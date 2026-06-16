import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/sanity/fallback-data";
import { CustomPortableText } from "@/components/portable-text/CustomPortableText";
import { Media, MediaGallery } from "@/components/media/Media";

type ProjectDetailProps = {
  project: Project;
};

export function ProjectDetail({ project }: ProjectDetailProps) {
  return (
    <article className="mb-5">
      <section
        className={cn(
          "layout-grid highlight-img-txtnarrow",
          "mb-5 border-b border-ink/20 pb-5",
        )}
      >
        <div className="content-type-column">
          {project.services?.join(", ") || "Projet"}
        </div>
        <div className="content-column">
          <h1 className="mb-4 text-2xl font-normal leading-tight text-ink lg:text-3xl">
            {project.title}
          </h1>
          {project.projectStatus === "concept" && (
            <p className="mb-4 text-xs font-bold uppercase tracking-wide text-ink/50">
              Axe — travail présenté, projet non sélectionné
            </p>
          )}
          <Media
            image={project.coverImage}
            placeholderLabel={project.title}
            lightbox
            priority
            sizes="(max-width: 1100px) 100vw, 50vw"
          />
        </div>
        <div className="description-column text-ink">
          {project.summary && <p className="mb-4">{project.summary}</p>}
          {project.services && (
            <ul className="m-0 list-none space-y-1 p-0 text-ink/70">
              {project.services.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="layout-grid mb-5">
        <div className="content-type-column">Texte</div>
        <div className="content-column">
          <CustomPortableText value={project.body} />
        </div>
      </section>

      <section className="layout-grid mb-5">
        <div className="content-type-column">Galerie</div>
        <div className="content-column">
          <MediaGallery images={project.gallery} title={project.title} />
        </div>
      </section>

      <section className="layout-grid border-t border-ink/20 pt-5">
        <div className="content-type-column">Navigation</div>
        <div className="content-column">
          <Link
            href="/"
            className="text-sm font-bold text-ink no-underline transition-colors hover:text-brand"
          >
            ← Tous les projets
          </Link>
        </div>
      </section>
    </article>
  );
}
