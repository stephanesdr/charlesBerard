"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";
import type { NavigationItem } from "@/lib/sanity/fallback-data";

type AreaHeaderProps = {
  siteTitle: string;
  navigation: NavigationItem[];
};

export function AreaHeader({ siteTitle, navigation }: AreaHeaderProps) {
  const headerRef = useRef<HTMLElement>(null);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useGSAP(
    () => {
      const header = headerRef.current;
      if (!header) return;

      gsap.to(header, {
        y: hidden ? -48 : 0,
        duration: 0.3,
        ease: "power2.out",
      });
    },
    { dependencies: [hidden] },
  );

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y > lastY.current && y > 80) setHidden(true);
      else setHidden(false);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      ref={headerRef}
      className={cn(
        "site-header fixed left-0 right-0 top-0 z-[1000]",
        "flex items-center justify-between gap-4",
        "px-4 py-2 sm:px-6 lg:px-8",
      )}
    >
      <Link
        href="/"
        className={cn(
          "font-bold text-sm leading-none text-ink no-underline",
          "hover:text-accent transition-colors duration-150",
        )}
      >
        {siteTitle}
      </Link>

      <nav
        className="flex items-center gap-2 sm:gap-3"
        aria-label="Navigation principale"
      >
        {navigation.map((item) => {
          const isPrimary = item.variant === "primary";
          const isExternal = item.href.startsWith("http");

          const className = cn(
            "btn-fixed inline-flex items-center justify-center",
            "px-3 py-2 text-xs font-bold leading-none no-underline",
            "transition-colors duration-150 sm:px-4 sm:text-sm",
            isPrimary
              ? "btn-primary bg-accent text-surface hover:bg-accent/90"
              : "btn-secondary border border-ink/20 bg-surface/80 text-ink hover:border-accent hover:text-accent",
          );

          if (isExternal) {
            return (
              <a
                key={item.href + item.label}
                href={item.href}
                className={className}
                target={item.openInNewTab ? "_blank" : undefined}
                rel={item.openInNewTab ? "noreferrer noopener" : undefined}
              >
                {item.label}
              </a>
            );
          }

          return (
            <Link key={item.href + item.label} href={item.href} className={className}>
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
