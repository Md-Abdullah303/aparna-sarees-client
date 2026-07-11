type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--color-primary)]">
        {eyebrow}
      </p>
      <h2 className="font-display mt-3 text-3xl font-semibold text-[var(--color-text)] sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-[var(--color-text-muted)]">
          {description}
        </p>
      )}
    </div>
  );
}
