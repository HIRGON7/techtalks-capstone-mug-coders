
import Link from "next/link";
import { getCommunities } from "@/lib/queries/communities";

export default async function CommunitiesPage() {
  const communities = await getCommunities();

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8">
        <p className="mb-2 text-sm font-medium text-[var(--accent)]">
          Discover
        </p>

        <h1 className="text-3xl font-semibold tracking-tight text-[var(--foreground)]">
          Communities
        </h1>

        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
          Explore developer communities and join the conversations that
          interest you.
        </p>
      </div>

      {communities.length === 0 ? (
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center">
          <h2 className="text-base font-semibold text-[var(--foreground)]">
            No communities yet
          </h2>

          <p className="mt-2 text-sm text-[var(--muted)]">
            Communities will appear here once they are available.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {communities.map((community) => (
            <Link
              key={community._id.toString()}
              href={`/communities/${community.slug}`}
              className="community-card group relative isolate block overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-all duration-500 hover:bg-[var(--surface-hover)]"
            >
              <span
                aria-hidden="true"
                className="community-card-ornament pointer-events-none absolute inset-0 z-0"
              />

              <div className="relative z-10 flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h2 className="text-lg font-semibold text-[var(--foreground)] transition-colors duration-300 group-hover:text-[var(--accent)]">
                    {community.name}
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                    {community.description}
                  </p>
                </div>

                <span className="shrink-0 text-sm text-[var(--muted)] transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[var(--accent)]">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
