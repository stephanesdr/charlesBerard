"use client";

import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { AboutShaderCanvas } from "./AboutShaderCanvas";
import { ABOUT_HERO_ROTATION } from "./textTexture";

type AboutShaderHeroProps = {
  lines: readonly [string, string];
  className?: string;
};

export function AboutShaderHero({ lines, className }: AboutShaderHeroProps) {
  const [shaderReady, setShaderReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(query.matches);
    updatePreference();
    query.addEventListener("change", updatePreference);
    return () => query.removeEventListener("change", updatePreference);
  }, []);

  const handleReadyChange = useCallback((ready: boolean) => {
    setShaderReady(ready);
  }, []);

  return (
    <section
      className={cn(
        "relative h-[clamp(31.25rem,49.67vw,46.9375rem)] overflow-hidden",
        className,
      )}
      aria-labelledby="about-title"
      data-about-hero
      data-shader-ready={shaderReady && !reducedMotion ? "true" : "false"}
    >
      <h1
        id="about-title"
        className={cn(
          "absolute left-[28.3%] top-[58.37%] z-10 m-0 origin-top-left",
          "font-heading text-[clamp(3rem,8.092vw,7.647rem)] font-bold leading-[1.208] text-ink",
          "transition-opacity duration-300",
          shaderReady && !reducedMotion ? "opacity-0" : "opacity-100",
        )}
        style={{ transform: `rotate(${ABOUT_HERO_ROTATION}deg)` }}
      >
        <span className="block">{lines[0]}</span>
        <span className="-mt-[0.27em] ml-[4.16vw] block">{lines[1]}</span>
      </h1>

      {!reducedMotion ? (
        <AboutShaderCanvas
          lines={lines}
          onReadyChange={handleReadyChange}
        />
      ) : null}
    </section>
  );
}
