import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type SiteContainerProps = {
  children: ReactNode;
  className?: string;
  fullBleed?: boolean;
};

/**
 * Wrapper site — utilise la classe Tailwind `container` (max 90rem + padding responsive).
 * Préférer `className="container"` directement quand pas besoin de fullBleed.
 */
export function SiteContainer({
  children,
  className,
  fullBleed = false,
}: SiteContainerProps) {
  return (
    <div className={cn(fullBleed ? "w-full" : "container", className)}>
      {children}
    </div>
  );
}
