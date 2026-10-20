type AboutManifestoProps = {
  children: string;
};

export function AboutManifesto({ children }: AboutManifestoProps) {
  return (
    <blockquote className="mx-auto flex min-h-[7.875rem] max-w-[44.375rem] items-center p-0 text-[clamp(1.75rem,2.22vw,2.1rem)] leading-[1.26] tracking-[-0.02em]">
      <p className="m-0">{children}</p>
    </blockquote>
  );
}
