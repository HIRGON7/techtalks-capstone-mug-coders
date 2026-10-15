"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { createPostSchema } from "@/schemas/post";

type CommunityOption = {
  id: string;
  name: string;
};

export default function CreatePostForm({
  communities,
}: {
  communities: CommunityOption[];
}) {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [community, setCommunity] = useState("");
  const [topics, setTopics] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setErrors({});
    setMessage("");

    const topicsArray = topics
      .split(",")
      .map((topic) => topic.trim())
      .filter(Boolean);

    const formData = {
      title,
      content,
      community,
      topics: topicsArray,
    };

    const result = createPostSchema.safeParse(formData);

    if (!result.success) {
      const newErrors: Record<string, string> = {};

      for (const issue of result.error.issues) {
        const field = issue.path[0]?.toString();

        if (field && !newErrors[field]) {
          newErrors[field] = issue.message;
        }
      }

      setErrors(newErrors);
      setMessage("Please fix the errors below.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(result.data),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Failed to create post");
        return;
      }

      router.push(`/blogs/${data.post.slug}`);
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6"
    >
      <div>
        <label
          htmlFor="title"
          className="mb-2 block text-sm font-medium text-white"
        >
          Title
        </label>

        <input
          id="title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Give your post a clear title"
          className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--accent)]"
        />

        {errors.title && (
          <p className="mt-2 text-sm text-[var(--danger)]">
            {errors.title}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="content"
          className="mb-2 block text-sm font-medium text-white"
        >
          Content
        </label>

        <textarea
          id="content"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Share your idea, project, question, or technical insight..."
          rows={10}
          className="w-full resize-y rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm leading-6 text-white outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--accent)]"
        />

        {errors.content && (
          <p className="mt-2 text-sm text-[var(--danger)]">
            {errors.content}
          </p>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label
            htmlFor="community"
            className="mb-2 block text-sm font-medium text-white"
          >
            Community
          </label>

          <select
            id="community"
            value={community}
            onChange={(event) => setCommunity(event.target.value)}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-[var(--accent)]"
          >
            <option value="">Select a community</option>

            {communities.map((community) => (
              <option
                key={community.id}
                value={community.id}
              >
                {community.name}
              </option>
            ))}
          </select>

          {errors.community && (
            <p className="mt-2 text-sm text-[var(--danger)]">
              {errors.community}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="topics"
            className="mb-2 block text-sm font-medium text-white"
          >
            Topics
          </label>

          <input
            id="topics"
            type="text"
            value={topics}
            onChange={(event) => setTopics(event.target.value)}
            placeholder="React, Next.js, MongoDB"
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--accent)]"
          />

          <p className="mt-2 text-xs text-[var(--muted)]">
            Separate topics with commas.
          </p>
        </div>
      </div>

      {message && (
        <div
          className={`rounded-lg border px-4 py-3 text-sm ${
            message === "Please fix the errors below."
              ? "border-[var(--danger)]/30 bg-[var(--danger)]/10 text-[var(--danger)]"
              : "border-[var(--border)] bg-[var(--background)] text-[var(--muted-light)]"
          }`}
        >
          {message}
        </div>
      )}

      <div className="flex justify-end border-t border-[var(--border)] pt-5">
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--accent-hover)] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Post"}
        </button>
      </div>
    </form>
  );
}