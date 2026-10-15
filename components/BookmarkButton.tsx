"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BookmarkButton({
  postId,
  initiallyBookmarked,
}: {
  postId: string;
  initiallyBookmarked: boolean;
}) {
  const router = useRouter();

  const [bookmarked, setBookmarked] = useState(initiallyBookmarked);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleBookmark() {
    if (loading) return;

    setLoading(true);

    try {
      const response = await fetch(`/api/posts/${postId}/bookmark`, {
        method: bookmarked ? "DELETE" : "POST",
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Something went wrong");
        return;
      }

      setBookmarked(!bookmarked);
      setMessage("");

      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <button
        type="button"
        onClick={handleBookmark}
        disabled={loading}
        className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
          bookmarked
            ? "border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]"
            : "border-[var(--border)] bg-[var(--surface)] text-[var(--muted-light)] hover:bg-[var(--surface-hover)] hover:text-white"
        }`}
      >
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill={bookmarked ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M6 4.75A1.75 1.75 0 0 1 7.75 3h8.5A1.75 1.75 0 0 1 18 4.75V21l-6-3.75L6 21V4.75Z" />
        </svg>

        {loading
          ? "Updating..."
          : bookmarked
            ? "Bookmarked"
            : "Bookmark"}
      </button>

      {message && (
        <p className="text-sm text-[var(--danger)]">
          {message}
        </p>
      )}
    </div>
  );
}