export default function Loading() {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8">
        <div className="h-4 w-20 animate-pulse rounded bg-[var(--surface-hover)]" />
        <div className="mt-3 h-8 w-40 animate-pulse rounded bg-[var(--surface-hover)]" />
        <div className="mt-3 h-4 w-72 max-w-full animate-pulse rounded bg-[var(--surface-hover)]" />
      </div>

      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <article
            key={index}
            className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6"
          >
            <div className="flex items-center gap-2">
              <div className="h-4 w-24 animate-pulse rounded bg-[var(--surface-hover)]" />
              <div className="h-4 w-16 animate-pulse rounded bg-[var(--surface-hover)]" />
            </div>

            <div className="mt-4 h-6 w-2/3 animate-pulse rounded bg-[var(--surface-hover)]" />

            <div className="mt-4 space-y-2">
              <div className="h-4 w-full animate-pulse rounded bg-[var(--surface-hover)]" />
              <div className="h-4 w-11/12 animate-pulse rounded bg-[var(--surface-hover)]" />
              <div className="h-4 w-3/4 animate-pulse rounded bg-[var(--surface-hover)]" />
            </div>

            <div className="mt-5 flex gap-2">
              <div className="h-7 w-16 animate-pulse rounded-md bg-[var(--surface-hover)]" />
              <div className="h-7 w-20 animate-pulse rounded-md bg-[var(--surface-hover)]" />
              <div className="h-7 w-14 animate-pulse rounded-md bg-[var(--surface-hover)]" />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}