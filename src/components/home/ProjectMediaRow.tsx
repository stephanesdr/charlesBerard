"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";
import type { HomeMediaRow } from "@/lib/sanity/fallback-data";
import { Media } from "@/components/media/Media";
import { ProjectCaption } from "./ProjectCaption";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type ProjectMediaRowProps = {
  row: HomeMediaRow;
  projectTitle: string;
};

export function ProjectMediaRow({ row, projectTitle }: ProjectMediaRowProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const isPair = row.layout === "pair";
  const media = row.media ?? [];
  const slots = isPair ? [media[0] ?? null, media[1] ?? null] : [media[0] ?? null];
  const ratio = isPair ? "0.77 / 1" : "1.65 / 1";

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const images = rootRef.current?.querySelectorAll("[data-parallax]");
      if (!images?.length || reduced) return;

      images.forEach((image) => {
        gsap.fromTo(
          image,
          { scale: 1.2 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: image,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });
    },
    { scope: rootRef, dependencies: [row._key] },
  );

  return (
    <div ref={rootRef} data-media-row={row.layout} className="w-full">
      <div
        className={cn(
          "flex",
          isPair ? "gap-6 lg:gap-8" : "flex-col",
        )}
      >
        {slots.map((item, index) => (
          <div
            key={`${row._key}-${index}`}
            className={cn(
              "relative overflow-hidden",
              isPair && "flex-1",
              isPair && index === 1 && "-translate-y-0 lg:-translate-y-section-y",
            )}
            style={{ aspectRatio: ratio }}
          >
            <div data-parallax className="absolute inset-0 origin-center will-change-transform">
              <Media
                image={item}
                fill
                ratio={ratio}
                placeholderLabel={projectTitle}
                alt={`${projectTitle} — média ${index + 1}`}
                sizes={
                  isPair
                    ? "(max-width: 1100px) 50vw, 30vw"
                    : "(max-width: 1100px) 100vw, 60vw"
                }
                className="h-full w-full"
              />
            </div>
          </div>
        ))}
      </div>
      <ProjectCaption caption={row.caption} />
    </div>
  );
}
