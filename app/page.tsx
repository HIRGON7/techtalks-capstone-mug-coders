
import Link from "next/link";

export default function Home() {
  return (
    <div className="flora-home py-12 sm:py-20">
      <section className="mx-auto max-w-3xl text-center">
        <div className="flora-home-badge mb-6 inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-sm text-[var(--muted-light)]">
          Built for developers
        </div>

        <h1 className="flora-home-title text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
          Share ideas.
          <br />
          Build together.
        </h1>

        <p className="flora-home-description mx-auto mt-6 max-w-2xl text-base leading-7 text-[var(--muted)] sm:text-lg">
          MUG Coders is a community where developers can share technical
          content, discuss ideas, discover communities, and connect through
          code.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/blogs"
            className="flora-home-action rounded-lg bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--accent-hover)]"
          >
            Explore Posts
          </Link>

          <Link
            href="/create"
            className="flora-home-action rounded-lg border border-[var(--border)] bg-[var(--surface)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--surface-hover)]"
          >
            Create Post
          </Link>
        </div>
      </section>

      <section className="mx-auto mt-20 grid max-w-5xl gap-4 md:grid-cols-3">
        <FeatureCard
          title="Share"
          description="Publish posts, ideas, projects, and technical knowledge with other developers."
        />

        <FeatureCard
          title="Discover"
          description="Explore developer discussions, topics, and communities that interest you."
        />

        <FeatureCard
          title="Connect"
          description="Join communities and interact with developers through posts and comments."
        />
      </section>
    </div>
  );
}

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="community-card flora-home-feature relative isolate overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-colors hover:bg-[var(--surface-hover)]">
      <div
        aria-hidden="true"
        className="community-card-ornament pointer-events-none absolute inset-0"
      />

      <div className="relative z-10">
        <div className="flora-home-feature-line mb-4 h-1 w-8 rounded-full bg-[var(--accent)]" />

        <h2 className="text-lg font-semibold text-white">
          {title}
        </h2>

        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
          {description}
        </p>
      </div>
    </div>
  );
}
