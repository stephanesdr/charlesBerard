"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { NavigationItem } from "@/lib/sanity/fallback-data";

type AreaHeaderProps = {
  navigation: NavigationItem[];
};

export function AreaHeader({ navigation }: AreaHeaderProps) {
  const headerRef = useRef<HTMLElement>(null);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const pathname = usePathname();

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
        "site-header fixed inset-x-0 top-0 z-[1000]",
        "flex items-center justify-center",
        "container py-2",
      )}
    >
      <nav
        className="flex items-center gap-2 sm:gap-3"
        aria-label="Main navigation"
      >
        {navigation.map((item) => {
          const isExternal = item.href.startsWith("http");
          const isActive =
            !isExternal &&
            (item.href === "/"
              ? pathname === "/"
              : pathname === item.href || pathname.startsWith(`${item.href}/`));

          const className = cn(
            buttonVariants({
              variant: isActive ? "navPrimary" : "navSecondary",
              size: "nav",
            }),
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
            <Link
              key={item.href + item.label}
              href={item.href}
              className={className}
              aria-current={isActive ? "page" : undefined}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
