import Link from "next/link";
import { cn } from "@/lib/utils";

type FooterProps = {
  text?: string;
  links?: { label: string; href: string; openInNewTab?: boolean }[];
};

export function Footer({ text, links }: FooterProps) {
  return (
    <footer className={cn("container mt-20 border-t border-ink/20 py-8")}>
      <div className="grid gap-6 sm:grid-cols-[1fr_auto] sm:items-end">
        {text && (
          <p className="max-w-prose text-sm leading-relaxed text-ink/70">
            {text}
          </p>
        )}
        {links && links.length > 0 && (
          <ul className="m-0 flex list-none flex-wrap gap-x-6 gap-y-2 p-0">
            {links.map((link) => (
              <li key={link.href + link.label}>
                {link.href.startsWith("http") ? (
                  <a
                    href={link.href}
                    className="text-sm font-bold text-ink no-underline transition-colors hover:text-brand"
                    target={link.openInNewTab ? "_blank" : undefined}
                    rel={
                      link.openInNewTab ? "noreferrer noopener" : undefined
                    }
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    href={link.href}
                    className="text-sm font-bold text-ink no-underline transition-colors hover:text-brand"
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </footer>
  );
}
