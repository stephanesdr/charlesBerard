import type { AboutContent } from "@/lib/sanity/fallback-data";

type AboutFooterProps = {
  footer: AboutContent["footer"];
};

export function AboutFooter({ footer }: AboutFooterProps) {
  const phoneHref = footer.phone?.replace(/[^\d+]/g, "");

  return (
    <footer
      className="mx-auto mt-[clamp(10rem,20.899vw,19.75rem)] flex min-h-[13.5rem] w-full max-w-[84.5rem] items-center bg-violet-10 px-6 py-10 sm:px-10"
      data-about-footer
    >
      <div className="grid w-full gap-10 sm:grid-cols-[1fr_auto] sm:items-end">
        <p className="m-0 max-w-[33rem] text-[clamp(1.75rem,2.016vw,1.905rem)] leading-[1.15]">
          {footer.tagline}
        </p>
        <address className="flex flex-col items-start gap-1 text-[clamp(1rem,1.323vw,1.25rem)] leading-[1.21] not-italic sm:items-end">
          {footer.phone && phoneHref ? (
            <a
              href={`tel:${phoneHref}`}
              className="transition-colors hover:text-accent-violet focus-visible:text-accent-violet"
            >
              {footer.phone}
            </a>
          ) : null}
          {footer.email ? (
            <a
              href={`mailto:${footer.email}`}
              className="transition-colors hover:text-accent-violet focus-visible:text-accent-violet"
            >
              {footer.email}
            </a>
          ) : null}
        </address>
      </div>
    </footer>
  );
}
