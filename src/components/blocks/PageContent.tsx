import type { Metadata } from "next";
import { CustomPortableText } from "@/components/portable-text/CustomPortableText";
import { getPageBySlug } from "@/lib/sanity/fetch";

type PageContentProps = {
  slug: string;
};

export async function generatePageMetadata(slug: string): Promise<Metadata> {
  const page = await getPageBySlug(slug);
  if (!page) return {};

  return {
    title: page.seo?.title || page.title,
    description: page.seo?.description || page.intro,
  };
}

export async function PageContent({ slug }: PageContentProps) {
  const page = await getPageBySlug(slug);
  if (!page) return null;

  return (
    <article className="layout-grid mb-5">
      <div className="content-type-column">{page.title}</div>
      <div className="content-column">
        <h1 className="mb-4 text-2xl font-normal leading-tight lg:text-3xl">
          {page.title}
        </h1>
        {page.intro && (
          <p className="mb-6 font-m text-ink">{page.intro}</p>
        )}
        <CustomPortableText value={page.body} />
      </div>
    </article>
  );
}
