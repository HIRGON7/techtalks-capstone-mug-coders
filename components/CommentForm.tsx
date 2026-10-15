"use client";

import { commentSchema } from "@/schemas/comment";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CommentForm({
  postId,
}: {
  postId: string;
}) {
  const router = useRouter();

  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const result = commentSchema.safeParse({
      content,
    });

    if (!result.success) {
      setMessage(result.error.issues[0].message);
      return;
    }

    if (loading) return;

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`/api/posts/${postId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(result.data),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Failed to post comment");
        return;
      }

      setContent("");
      setMessage("");

      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4"
    >
      <textarea
        value={content}
        onChange={(event) => setContent(event.target.value)}
        placeholder="Write a comment..."
        rows={4}
        className="w-full resize-none rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--accent)]"
      />

      <div className="mt-3 flex items-center justify-between gap-4">
        <div className="min-h-5">
          {message && (
            <p className="text-sm text-[var(--danger)]">
              {message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[var(--accent-hover)] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Posting..." : "Post Comment"}
        </button>
      </div>
    </form>
  );
}