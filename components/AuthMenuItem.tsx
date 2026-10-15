
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getSession, signIn, signOut } from "next-auth/react";
import type { Session } from "next-auth";

export default function AuthMenuItem() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    getSession()
      .then((data) => {
        if (active) setSession(data);
      })
      .catch(() => {
        if (active) setSession(null);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="border-t border-[var(--border)] px-4 py-4 text-sm text-[var(--muted)]">
        Checking account...
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="border-t border-[var(--border)] p-3">
        <button
          type="button"
          onClick={() => signIn()}
          className="w-full rounded-lg bg-[var(--accent)] px-4 py-3 text-sm font-semibold text-[var(--foreground)] transition-colors hover:bg-[var(--accent-hover)]"
        >
          Log in →
        </button>
      </div>
    );
  }

  const fullName =
    session.user.name?.trim() ||
    session.user.email ||
    "My Account";

  return (
    <div className="border-t border-[var(--border)] p-3">
      <Link
        href="/profile"
        className="block truncate rounded-lg px-3 py-3 text-sm font-semibold text-[var(--foreground)] transition-colors hover:bg-[var(--surface-hover)]"
      >
        {fullName}
      </Link>

      <button
        type="button"
        onClick={() => signOut()}
        className="mt-1 w-full rounded-lg px-3 py-3 text-left text-sm font-medium text-[var(--muted-light)] transition-colors hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)]"
      >
        Sign out →
      </button>
    </div>
  );
}
