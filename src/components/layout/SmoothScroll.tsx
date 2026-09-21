"use client";

import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef, type ReactNode } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function SmoothScroll({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduced) return;

      const lenis = new Lenis({
        autoRaf: true,
        anchors: true,
      });

      // Lenis ne doit jamais verrouiller le scroll natif (a11y + sticky index).
      document.documentElement.style.removeProperty("overflow");
      document.body.style.removeProperty("overflow");

      const onScroll = () => ScrollTrigger.update();
      lenis.on("scroll", onScroll);

      ScrollTrigger.scrollerProxy(document.body, {
        scrollTop(value) {
          if (arguments.length && typeof value === "number") {
            lenis.scrollTo(value, { immediate: true });
          }
          return lenis.scroll;
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          };
        },
      });

      ScrollTrigger.refresh();

      return () => {
        lenis.off("scroll", onScroll);
        lenis.destroy();
        ScrollTrigger.scrollerProxy(document.body);
      };
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} className="min-h-dvh">
      {children}
    </div>
  );
}
