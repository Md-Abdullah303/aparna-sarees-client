export function LoadingScreen() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[var(--color-background)] px-6">
      <div className="relative flex h-20 w-20 items-center justify-center">
        <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-[var(--color-primary)] border-r-[var(--color-primary)]/40" />
        <div className="absolute inset-2 animate-spin rounded-full border-2 border-transparent border-b-[var(--color-primary)]/60 [animation-direction:reverse] [animation-duration:1.2s]" />
        <span className="font-display text-sm font-semibold text-[var(--color-primary)]">
          AS
        </span>
      </div>

      <div className="text-center">
        <p className="font-display text-xl text-[var(--color-text)]">Aparna Sarees</p>
        <p className="mt-2 text-sm text-[var(--color-text-muted)]">Loading your experience...</p>
      </div>
    </div>
  );
}
