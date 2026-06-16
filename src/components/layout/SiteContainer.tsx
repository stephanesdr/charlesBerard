import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type SiteContainerProps = {
  children: ReactNode;
  className?: string;
  fullBleed?: boolean;
};

export function SiteContainer({
  children,
  className,
  fullBleed = false,
}: SiteContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full",
        fullBleed ? "max-w-none" : "max-w-[1440px]",
        "px-4 sm:px-6 lg:px-8",
        className,
      )}
    >
      {children}
    </div>
  );
}
