import type { PortableTextComponents } from "@portabletext/react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const projectBodyComponents = {
  marks: {
    link: ({ children, value }) => {
      const href = value?.href as string | undefined;
      if (!href) return <>{children}</>;
      const isExternal = href.startsWith("http");
      if (isExternal) {
        return (
          <a
            href={href}
            className="underline underline-offset-2 hover:text-brand"
            target="_blank"
            rel="noreferrer noopener"
          >
            {children}
          </a>
        );
      }
      return (
        <Link
          href={href}
          className="underline underline-offset-2 hover:text-brand"
        >
          {children}
        </Link>
      );
    },
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
  },
  block: {
    normal: ({ children }) => (
      <p className={cn("mb-5 text-base leading-[1.375] text-ink last:mb-0")}>
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="mb-4 text-xl font-bold leading-tight text-ink">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-3 text-lg font-bold leading-tight text-ink">
        {children}
      </h3>
    ),
    unknownBlockStyle: () => null,
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-5 list-disc pl-5 space-y-2">{children}</ul>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-[1.375]">{children}</li>,
  },
  unknownMark: () => null,
  unknownType: () => null,
} satisfies PortableTextComponents;
