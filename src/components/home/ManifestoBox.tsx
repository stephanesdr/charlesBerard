type ManifestoBoxProps = {
  text: string;
};

export function ManifestoBox({ text }: ManifestoBoxProps) {
  return (
    <section
      data-home-section="manifesto"
      className="container flex justify-center py-section-y"
    >
      <blockquote className="m-0 max-w-[48rem] border-[6px] border-ink px-6 py-6 text-center font-body font-semibold text-ink lg:px-8 lg:py-7">
        {text}
      </blockquote>
    </section>
  );
}
