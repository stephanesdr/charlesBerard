import Link from "next/link";

type HomeFooterProps = {
  email?: string | null;
  location?: string | null;
  siteTitle: string;
};

export function HomeFooter({
  email = "contact@charlesberard.eu",
  location = "Bruxelles",
  siteTitle,
}: HomeFooterProps) {
  return (
    <footer
      data-home-section="footer"
      className="bg-violet-10 px-5 py-16 text-ink lg:px-20"
    >
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="font-h2 m-0 uppercase">{siteTitle}</p>
          <p className="mt-3 font-caption m-0">
            Direction graphique — {location}
          </p>
        </div>
        <div className="flex flex-col gap-2 font-tag uppercase tracking-[0.6px]">
          {email ? (
            <a
              href={`mailto:${email}`}
              className="text-ink no-underline hover:text-accent-violet"
            >
              {email}
            </a>
          ) : null}
          <Link
            href="/contact"
            className="text-ink no-underline hover:text-accent-violet"
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
