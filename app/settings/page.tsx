import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8">
        <p className="mb-2 text-sm font-medium text-[var(--accent)]">
          Account
        </p>

        <h1 className="text-3xl font-semibold tracking-tight text-white">
          Settings
        </h1>

        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
          Manage your MUG Coders account and profile preferences.
        </p>
      </div>

      <div className="space-y-4">
        <section className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
          <h2 className="text-base font-semibold text-white">
            Account information
          </h2>

          <p className="mt-1 text-sm text-[var(--muted)]">
            Information connected to your current account.
          </p>

          <div className="mt-6 space-y-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
                Name
              </p>

              <p className="mt-1 text-sm text-white">
                {session.user?.name || "Not available"}
              </p>
            </div>

            <div className="border-t border-[var(--border)] pt-4">
              <p className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
                Email
              </p>

              <p className="mt-1 text-sm text-white">
                {session.user?.email || "Not available"}
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
          <h2 className="text-base font-semibold text-white">
            Profile preferences
          </h2>

          <p className="mt-1 text-sm leading-6 text-[var(--muted)]">
            Profile editing and additional account preferences can be added
            here in a future version of MUG Coders.
          </p>
        </section>
      </div>
    </div>
  );
}