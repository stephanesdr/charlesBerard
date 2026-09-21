"use client";

type SiteMarqueeProps = {
  text: string;
};

export function SiteMarquee({ text }: SiteMarqueeProps) {
  const chunk = `${text} — `;
  const loop = Array.from({ length: 8 }, () => chunk).join("");

  return (
    <div
      data-home-section="marquee"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-40 h-[100px] overflow-hidden mix-blend-difference"
      aria-hidden="true"
    >
      <p className="site-marquee-track m-0 flex h-full items-center whitespace-nowrap font-tag uppercase tracking-[0.6px] text-surface">
        <span>{loop}</span>
        <span>{loop}</span>
      </p>
    </div>
  );
}
