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
    <article className="margin-bottom-l">
      <section
        className={cn(
          "layout-grid border-b border-ink/20",
          "margin-bottom-l pb-5",
        )}
      >
        <div className="content-type-column hidden sm:grid text-sm leading-[1.375]">
          {project.services?.join(", ") || "Projet"}
        </div>
        <div className="content-column sm:col-span-9">
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
            sizes="(max-width: 1100px) 100vw, 66vw"
          />
        </div>
        <div className="description-column sm:col-span-3 text-sm leading-[1.375] text-ink">
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

      <section className="layout-grid margin-bottom-m">
        <div className="content-type-column hidden sm:grid text-sm leading-[1.375]">
          Texte
        </div>
        <div className="content-column sm:col-span-9">
          <CustomPortableText value={project.body} />
        </div>
      </section>

      <section className="layout-grid margin-bottom-l">
        <div className="content-type-column hidden sm:grid text-sm leading-[1.375]">
          Galerie
        </div>
        <div className="content-column sm:col-span-12">
          <MediaGallery images={project.gallery} title={project.title} />
        </div>
      </section>

      <section className="layout-grid border-t border-ink/20 pt-5">
        <div className="content-type-column hidden sm:grid text-sm">Navigation</div>
        <div className="content-column sm:col-span-9">
          <Link
            href="/"
            className="text-sm font-bold text-ink hover:text-accent no-underline transition-colors"
          >
            ← Tous les projets
          </Link>
        </div>
      </section>
    </article>
  );
}
