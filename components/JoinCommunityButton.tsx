"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function JoinCommunityButton({
  communityId,
  initiallyJoined,
}: {
  communityId: string;
  initiallyJoined: boolean;
}) {
  const router = useRouter();

  const [joined, setJoined] = useState(initiallyJoined);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleClick() {
    if (loading) return;

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        `/api/communities/${communityId}/join`,
        {
          method: joined ? "DELETE" : "POST",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Something went wrong");
        return;
      }

      setJoined(!joined);
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
          joined
            ? "border border-[var(--border)] bg-[var(--surface)] text-[var(--muted-light)] hover:bg-[var(--surface-hover)] hover:text-white"
            : "bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)]"
        }`}
      >
        {loading
          ? joined
            ? "Leaving..."
            : "Joining..."
          : joined
            ? "Leave Community"
            : "Join Community"}
      </button>

      {message && (
        <p className="text-sm text-[var(--danger)]">
          {message}
        </p>
      )}
    </div>
  );
}