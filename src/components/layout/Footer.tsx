import Link from "next/link";
import { cn } from "@/lib/utils";
import { SiteContainer } from "./SiteContainer";

type FooterProps = {
  text?: string;
  links?: { label: string; href: string; openInNewTab?: boolean }[];
};

export function Footer({ text, links }: FooterProps) {
  return (
    <footer className={cn("layout-grid border-t border-ink/20", "mt-20 py-8")}>
      <SiteContainer>
        <div className="grid gap-6 sm:grid-cols-[1fr_auto] sm:items-end">
          {text && (
            <p className="text-sm leading-relaxed text-ink/70 max-w-prose">
              {text}
            </p>
          )}
          {links && links.length > 0 && (
            <ul className="flex flex-wrap gap-x-6 gap-y-2 list-none m-0 p-0">
              {links.map((link) => (
                <li key={link.href + link.label}>
                  {link.href.startsWith("http") ? (
                    <a
                      href={link.href}
                      className="text-sm font-bold text-ink hover:text-accent no-underline transition-colors"
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
                      className="text-sm font-bold text-ink hover:text-accent no-underline transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </SiteContainer>
    </footer>
  );
}
