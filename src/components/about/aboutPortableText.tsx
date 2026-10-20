import type { PortableTextComponents } from "@portabletext/react";

export const aboutPortableTextComponents = {
  marks: {
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
  },
  block: {
    normal: ({ children }) => (
      <p className="mb-[1.05em] text-[clamp(1.0625rem,1.323vw,1.25rem)] leading-[1.21] last:mb-0">
        {children}
      </p>
    ),
    h3: ({ children }) => (
      <h3 className="mt-[1.3em] mb-[0.5em] text-[clamp(1.0625rem,1.323vw,1.25rem)] font-bold leading-[1.21] text-accent-violet first:mt-0">
        {children}
      </h3>
    ),
    unknownBlockStyle: () => null,
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-[1.55em] list-disc space-y-[0.15em] pl-[1.1em] marker:text-accent-violet">
        {children}
      </ul>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="text-[clamp(1.0625rem,1.323vw,1.25rem)] leading-[1.21]">
        {children}
      </li>
    ),
  },
  unknownMark: () => null,
  unknownType: () => null,
} satisfies PortableTextComponents;
