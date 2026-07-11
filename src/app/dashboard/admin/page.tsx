export default function AdminDashboardPage() {
  return (
    <section className="flex min-h-screen items-center justify-center px-6">
      <div className="text-center">
        <h1 className="font-display text-3xl text-[var(--color-primary)]">
          Admin Dashboard
        </h1>
        <p className="mt-3 text-sm text-[var(--color-text-muted)]">
          Dashboard layout — no navbar or footer.
        </p>
      </div>
    </section>
  );
}
