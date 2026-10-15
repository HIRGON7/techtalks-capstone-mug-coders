import { auth } from "@/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8">
        <p className="mb-2 text-sm font-medium text-[var(--accent)]">
          Dashboard
        </p>

        <h1 className="text-3xl font-semibold tracking-tight text-white">
          Welcome back{session.user?.name ? `, ${session.user.name}` : ""}
        </h1>

        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
          Manage your activity and quickly access the main parts of MUG Coders.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <DashboardCard
          title="Create a post"
          description="Share an idea, project, question, or technical topic."
          href="/create"
          action="Create Post"
        />

        <DashboardCard
          title="Your bookmarks"
          description="View the posts you saved for later."
          href="/bookmarks"
          action="View Bookmarks"
        />

        <DashboardCard
          title="Communities"
          description="Explore developer communities and join conversations."
          href="/communities"
          action="Browse Communities"
        />
      </div>

      <section className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
        <h2 className="text-base font-semibold text-white">
          Account
        </h2>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
              Name
            </p>

            <p className="mt-1 text-sm text-white">
              {session.user?.name || "Not available"}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
              Email
            </p>

            <p className="mt-1 text-sm text-white">
              {session.user?.email || "Not available"}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function DashboardCard({
  title,
  description,
  href,
  action,
}: {
  title: string;
  description: string;
  href: string;
  action: string;
}) {
  return (
    <div className="flex flex-col rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
      <h2 className="text-base font-semibold text-white">
        {title}
      </h2>

      <p className="mt-2 flex-1 text-sm leading-6 text-[var(--muted)]">
        {description}
      </p>

      <Link
        href={href}
        className="mt-5 text-sm font-medium text-[var(--accent)] transition-colors hover:text-[var(--accent-hover)]"
      >
        {action} →
      </Link>
    </div>
  );
}