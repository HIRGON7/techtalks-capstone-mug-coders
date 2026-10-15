export default function Loading() {
  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8">
        <div className="h-4 w-24 animate-pulse rounded bg-[var(--surface-hover)]" />
        <div className="mt-3 h-8 w-48 animate-pulse rounded bg-[var(--surface-hover)]" />
        <div className="mt-3 h-4 w-72 max-w-full animate-pulse rounded bg-[var(--surface-hover)]" />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6"
          >
            <div className="h-5 w-40 animate-pulse rounded bg-[var(--surface-hover)]" />

            <div className="mt-4 space-y-2">
              <div className="h-4 w-full animate-pulse rounded bg-[var(--surface-hover)]" />
              <div className="h-4 w-4/5 animate-pulse rounded bg-[var(--surface-hover)]" />
            </div>

            <div className="mt-5 flex gap-2">
              <div className="h-7 w-16 animate-pulse rounded-md bg-[var(--surface-hover)]" />
              <div className="h-7 w-20 animate-pulse rounded-md bg-[var(--surface-hover)]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}