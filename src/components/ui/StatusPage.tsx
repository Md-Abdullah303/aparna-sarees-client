import Link from "next/link";

type StatusPageProps = {
  code: string;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
};

export function StatusPage({
  code,
  title,
  description,
  actionLabel = "Back to Home",
  actionHref = "/",
}: StatusPageProps) {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(197,160,89,0.15),transparent_65%)]" />

      <div className="relative z-10 w-full max-w-lg text-center">
        <p className="font-hero text-[7rem] leading-none text-[var(--color-primary)]/30 sm:text-[9rem]">
          {code}
        </p>
        <h1 className="font-display -mt-6 text-3xl font-semibold text-[var(--color-text)] sm:text-4xl">
          {title}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-[var(--color-text-muted)]">
          {description}
        </p>
        <Link
          href={actionHref}
          className="mt-8 inline-flex items-center justify-center rounded-full bg-[var(--color-primary)] px-8 py-3.5 text-sm font-semibold text-[var(--color-primary-foreground)] transition-transform hover:scale-[1.02]"
        >
          {actionLabel}
        </Link>
      </div>
    </section>
  );
}
