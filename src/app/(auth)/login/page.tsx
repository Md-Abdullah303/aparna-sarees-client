export default function LoginPage() {
  return (
    <section className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[var(--color-surface)] p-8 text-center shadow-xl">
        <h1 className="font-display text-3xl text-[var(--color-primary)]">Login</h1>
        <p className="mt-3 text-sm text-[var(--color-text-muted)]">
          Authentication page — no navbar or footer on this layout.
        </p>
      </div>
    </section>
  );
}
