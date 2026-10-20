"use client";

import { useEffect, useRef, useState } from "react";

type SiteMarqueeProps = {
  text: string;
};

export function SiteMarquee({ text }: SiteMarqueeProps) {
  const [isAtTop, setIsAtTop] = useState(true);
  const animationFrame = useRef<number | null>(null);
  const chunk = `${text} — `;
  const loop = Array.from({ length: 8 }, () => chunk).join("");

  useEffect(() => {
    const updateVisibility = () => {
      animationFrame.current = null;
      setIsAtTop(window.scrollY <= 2);
    };

    const onScroll = () => {
      if (animationFrame.current !== null) return;
      animationFrame.current = window.requestAnimationFrame(updateVisibility);
    };

    animationFrame.current = window.requestAnimationFrame(updateVisibility);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (animationFrame.current !== null) {
        window.cancelAnimationFrame(animationFrame.current);
      }
    };
  }, []);

  return (
    <div
      data-home-section="marquee"
      data-marquee-visible={isAtTop ? "true" : "false"}
      className={`pointer-events-none fixed inset-x-0 bottom-0 z-10 h-[100px] overflow-hidden mix-blend-difference transition-opacity duration-500 ease-out motion-reduce:transition-none ${
        isAtTop ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      <p className="site-marquee-track m-0 flex h-full items-center whitespace-nowrap font-tag font-bold tracking-[0.6px] text-surface">
        <span>{loop}</span>
        <span>{loop}</span>
      </p>
    </div>
  );
}
