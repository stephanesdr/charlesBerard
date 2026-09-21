"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type ServicesStatementProps = {
  text: string;
};

export function ServicesStatement({ text }: ServicesStatementProps) {
  const rootRef = useRef<HTMLElement>(null);
  const words = text.split(/\s+/).filter(Boolean);

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const nodes = rootRef.current?.querySelectorAll("[data-word]");
      if (!nodes?.length || reduced) return;

      gsap.from(nodes, {
        yPercent: 40,
        opacity: 0.2,
        stagger: 0.02,
        ease: "power2.out",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 80%",
          end: "top 20%",
          scrub: 0.6,
        },
      });
    },
    { scope: rootRef, dependencies: [text] },
  );

  return (
    <section
      ref={rootRef}
      data-home-section="services"
      className="px-5 py-section-y lg:px-20"
    >
      <p
        aria-label={text}
        className="font-h2 m-0 max-w-[70rem] uppercase text-ink"
      >
        <span aria-hidden="true">
          {words.map((word, index) => (
            <span key={`${word}-${index}`} className="mr-[0.35em] inline-block">
              <span data-word className="inline-block">
                {word}
              </span>
            </span>
          ))}
        </span>
      </p>
    </section>
  );
}
