"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP);

type HeroTitleProps = {
  title: string;
};

export function HeroTitle({ title }: HeroTitleProps) {
  const rootRef = useRef<HTMLElement>(null);
  const chars = Array.from(title);

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const nodes = rootRef.current?.querySelectorAll("[data-char]");
      if (!nodes?.length || reduced) return;

      gsap.fromTo(
        nodes,
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.03,
        },
      );
    },
    { scope: rootRef, dependencies: [title] },
  );

  return (
    <section
      ref={rootRef}
      data-home-section="hero"
      className="flex min-h-dvh items-end px-5 pb-[20dvh] pt-24 lg:px-20"
    >
      <h1
        aria-label={title}
        className={cn(
          "font-display m-0 max-w-full uppercase text-ink",
          "leading-[1.2] font-bold",
        )}
      >
        <span aria-hidden="true" className="flex flex-wrap">
          {chars.map((char, index) => (
            <span key={`${char}-${index}`} className="inline-block overflow-hidden">
              <span data-char className="inline-block">
                {char === " " ? "\u00a0" : char}
              </span>
            </span>
          ))}
        </span>
      </h1>
    </section>
  );
}
