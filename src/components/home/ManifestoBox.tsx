type ManifestoBoxProps = {
  text: string;
};

export function ManifestoBox({ text }: ManifestoBoxProps) {
  return (
    <section
      data-home-section="manifesto"
      className="flex justify-center px-5 py-section-y lg:px-20"
    >
      <blockquote className="m-0 max-w-[44rem] border-[6px] border-ink px-6 py-6 text-center font-body text-ink lg:px-8 lg:py-7">
        {text}
      </blockquote>
    </section>
  );
}
