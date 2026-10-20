import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ProjectDetail } from "@/components/blocks/ProjectDetail";
import { getProjects, getProjectBySlug } from "@/lib/sanity/fetch";
import { urlFor } from "@/lib/sanity/image";
import type { SanityImage } from "@/lib/sanity/fallback-data";

const siteUrl = "https://charles-berard.vercel.app";

function ogImageUrl(image?: SanityImage | null) {
  if (!image?.asset) return null;
  return urlFor(image).width(1200).height(630).fit("crop").auto("format").url();
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};

  const title = project.seo?.title || `${project.title} — Charles Berard`;
  const description = project.seo?.description || project.summary;
  const image = project.seo?.ogImage?.asset
    ? project.seo.ogImage
    : project.coverImage;
  const imageUrl = ogImageUrl(image);
  const canonical = `${siteUrl}/projets/${slug}`;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "article",
      images: imageUrl
        ? [{ url: imageUrl, alt: image?.alt || project.title }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) notFound();

  return <ProjectDetail project={project} />;
}
