import { ProjectList } from "@/components/blocks/ProjectList";
import { getHome, getProjects } from "@/lib/sanity/fetch";

export default async function HomePage() {
  const [home, projects] = await Promise.all([getHome(), getProjects()]);

  return (
    <div id="main-content">
      {home.intro && (
        <section className="layout-grid margin-bottom-l border-b border-ink/20 pb-5">
          <div className="content-type-column hidden sm:grid text-sm">
            Intro
          </div>
          <div className="content-column sm:col-span-9">
            <p className="text-xl leading-[1.35] text-ink">{home.intro}</p>
          </div>
        </section>
      )}
      <ProjectList
        projects={projects}
        label={home.projectsLabel || "Projets"}
      />
    </div>
  );
}
