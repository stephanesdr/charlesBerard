type ProjectCaptionProps = {
  caption?: string | null;
};

export function ProjectCaption({ caption }: ProjectCaptionProps) {
  if (!caption) return null;

  return (
    <p className="mt-4 max-w-[500px] font-caption normal-case text-ink">
      {caption}
    </p>
  );
}
