import { PortableText, type PortableTextBlock } from "@portabletext/react";
import type { PortableTextComponents } from "@portabletext/react";
import { projectBodyComponents } from "./config";

type CustomPortableTextProps = {
  value?: PortableTextBlock[] | null;
  components?: PortableTextComponents;
  className?: string;
};

export function CustomPortableText({
  value,
  components = projectBodyComponents,
  className,
}: CustomPortableTextProps) {
  if (!value?.length) return null;

  return (
    <div className={className}>
      <PortableText value={value} components={components} />
    </div>
  );
}
