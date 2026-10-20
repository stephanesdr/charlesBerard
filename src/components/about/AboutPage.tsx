import { CustomPortableText } from "@/components/portable-text/CustomPortableText";
import { getPageBySlug } from "@/lib/sanity/fetch";
import { AboutFooter } from "./AboutFooter";
import { AboutManifesto } from "./AboutManifesto";
import { AboutSection } from "./AboutSection";
import { AboutShaderHero } from "./shader/AboutShaderHero";

const editorialWidth =
  "mx-auto w-[calc(100%-2rem)] max-w-[84.5rem] sm:w-[calc(100%-3rem)] lg:w-[calc(100%-4rem)]";

export async function AboutPage() {
  const page = await getPageBySlug("about");
  if (!page) return null;

  const content = page.about;
  if (!content) {
    return (
      <article className={`${editorialWidth} py-24`}>
        <h1 className="mb-10 text-4xl font-bold">{page.title}</h1>
        <CustomPortableText value={page.body} />
      </article>
    );
  }

  const lines: readonly [string, string] = [
    content.heroLines[0] || "CHARLES",
    content.heroLines[1] || "BéRARD",
  ];

  return (
    <article className="pb-8 lg:pb-12" data-about-page>
      <AboutShaderHero lines={lines} />

      <div className={editorialWidth} data-about-editorial>
        <section aria-label="Introduction">
          <p className="m-0 text-[clamp(1.625rem,2.016vw,1.905rem)] leading-[1.2] tracking-[-0.01em]">
            {content.standfirst}
          </p>
          <p className="mt-[4.5rem] mb-0 text-sm leading-[1.25] font-medium tracking-[0.01em] uppercase">
            {content.clients}
          </p>
        </section>

        <div className="mt-[clamp(8rem,15.21vw,14.375rem)] space-y-[clamp(8rem,15.21vw,14.375rem)]">
          {content.sections.map((section) => (
            <AboutSection key={section._key} section={section} />
          ))}

          <AboutManifesto>{content.manifesto}</AboutManifesto>

          <p className="m-0 min-h-[4.5rem] whitespace-pre-line text-[clamp(1.625rem,2.016vw,1.905rem)] leading-[1.18] tracking-[-0.01em]">
            {content.closing}
          </p>
        </div>
      </div>

      <AboutFooter footer={content.footer} />
    </article>
  );
}
