"use client";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl items-center justify-center">
      <div className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[var(--danger)]/30 bg-[var(--danger)]/10 text-lg font-semibold text-[var(--danger)]">
          !
        </div>

        <h1 className="mt-5 text-2xl font-semibold tracking-tight text-white">
          Something went wrong
        </h1>

        <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
          We couldn&apos;t load this page properly.
        </p>

        {error.message && (
          <p className="mt-4 rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm text-[var(--muted-light)]">
            {error.message}
          </p>
        )}

        <button
          type="button"
          onClick={() => reset()}
          className="mt-6 rounded-lg bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--accent-hover)]"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}