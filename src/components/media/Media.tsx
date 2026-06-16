"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { cn } from "@/lib/utils";
import { urlFor } from "@/lib/sanity/image";
import type { SanityImage } from "@/lib/sanity/fallback-data";

type MediaProps = {
  image?: SanityImage | null;
  alt?: string;
  priority?: boolean;
  className?: string;
  lightbox?: boolean;
  placeholderLabel?: string;
  sizes?: string;
};

function PlaceholderImage({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex aspect-[4/3] w-full items-center justify-center",
        "bg-gradient-to-br from-neutral-200 via-neutral-100 to-neutral-300",
        "text-xs font-bold uppercase tracking-widest text-ink/40",
        className,
      )}
      aria-label={`Image placeholder — ${label}`}
    >
      {label}
    </div>
  );
}

export function Media({
  image,
  alt = "",
  priority = false,
  className,
  lightbox = false,
  placeholderLabel = "Image",
  sizes = "(max-width: 768px) 100vw, 66vw",
}: MediaProps) {
  const [open, setOpen] = useState(false);
  const hasAsset = image?.asset?._ref;

  if (!hasAsset) {
    return <PlaceholderImage label={placeholderLabel} className={className} />;
  }

  const src = urlFor(image).width(1600).auto("format").url();
  const blur =
    image.lqip
      ? { blurDataURL: image.lqip, placeholder: "blur" as const }
      : undefined;

  const img = (
    <Image
      src={src}
      alt={alt || image.alt || placeholderLabel}
      width={1600}
      height={1200}
      sizes={sizes}
      priority={priority}
      className={cn("h-auto w-full object-cover", className)}
      {...blur}
    />
  );

  if (!lightbox) return img;

  return (
    <>
      <button
        type="button"
        className="block w-full cursor-zoom-in border-0 bg-transparent p-0"
        onClick={() => setOpen(true)}
        aria-label="Ouvrir en plein écran"
      >
        {img}
      </button>
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={[{ src, alt: alt || image.alt || placeholderLabel }]}
      />
    </>
  );
}

type MediaGalleryProps = {
  images?: SanityImage[];
  title?: string;
};

export function MediaGallery({ images, title }: MediaGalleryProps) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const slides =
    images
      ?.filter((img) => img.asset?._ref)
      .map((img) => ({
        src: urlFor(img).width(2000).auto("format").url(),
        alt: img.alt || title || "Image",
      })) ?? [];

  if (!slides.length) {
    return (
      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2">
        <PlaceholderImage label={title || "Galerie"} />
        <PlaceholderImage label={title || "Galerie"} />
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2">
        {slides.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            className="cursor-zoom-in border-0 bg-transparent p-0"
            onClick={() => {
              setIndex(i);
              setOpen(true);
            }}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              width={1200}
              height={900}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="h-auto w-full object-cover"
            />
          </button>
        ))}
      </div>
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
      />
    </>
  );
}
