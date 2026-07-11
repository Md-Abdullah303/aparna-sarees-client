type SareeDetailsPageProps = {
  params: Promise<{ id: string }>;
};

export default async function SareeDetailsPage({ params }: SareeDetailsPageProps) {
  const { id } = await params;

  return (
    <section className="min-h-[60vh] px-6 py-32 sm:px-10">
      <div className="mx-auto max-w-7xl">
        <h1 className="font-display text-4xl text-[var(--color-primary)]">
          Saree Details
        </h1>
        <p className="mt-4 text-[var(--color-text-muted)]">
          Product ID: {id} — Full details page coming soon.
        </p>
      </div>
    </section>
  );
}
