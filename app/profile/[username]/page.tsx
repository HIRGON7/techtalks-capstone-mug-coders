import { getUserByUsername } from "@/lib/queries/users";
import { notFound } from "next/navigation";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  const user: any = await getUserByUsername(username);

  if (!user) {
    notFound();
  }

  const initials = user.name
    ? user.name
        .split(" ")
        .map((part: string) => part.charAt(0))
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : user.username.slice(0, 2).toUpperCase();

  return (
    <div className="mx-auto max-w-4xl">
      <section className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--background)] text-2xl font-semibold text-white">
            {initials}
          </div>

          <div className="min-w-0">
            <p className="mb-2 text-sm font-medium text-[var(--accent)]">
              Developer Profile
            </p>

            <h1 className="text-3xl font-semibold tracking-tight text-white">
              {user.name}
            </h1>

            <p className="mt-1 text-sm text-[var(--muted)]">
              @{user.username}
            </p>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-[var(--muted-light)]">
              {user.bio || "This developer has not added a bio yet."}
            </p>
          </div>
        </div>
      </section>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <section className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 md:col-span-2">
          <h2 className="text-base font-semibold text-white">
            About
          </h2>

          <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
            {user.bio || "No profile description has been added yet."}
          </p>
        </section>

        <section className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
          <h2 className="text-base font-semibold text-white">
            Skills
          </h2>

          {user.skills && user.skills.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {user.skills.map((skill: string) => (
                <span
                  key={skill}
                  className="rounded-md border border-[var(--border)] bg-[var(--background)] px-2.5 py-1 text-xs font-medium text-[var(--muted-light)]"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="mt-3 text-sm text-[var(--muted)]">
              No skills listed yet.
            </p>
          )}
        </section>
      </div>
    </div>
  );
}