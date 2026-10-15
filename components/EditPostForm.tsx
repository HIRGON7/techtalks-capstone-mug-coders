"use client";

import { updatePostSchema } from "@/schemas/post";
import { useState } from "react";
import { useRouter } from "next/navigation";

type CommunityOption = {
  id: string;
  name: string;
};

type PostData = {
  id: string;
  slug: string;
  title: string;
  content: string;
  community: string;
  topics: string[];
};

export default function EditPostForm({
  post,
  communities,
}: {
  post: PostData;
  communities: CommunityOption[];
}) {
  const router = useRouter();

  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [community, setCommunity] = useState(post.community);
  const [topics, setTopics] = useState(post.topics.join(", "));
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (loading) return;

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

    const result = updatePostSchema.safeParse(formData);

    if (!result.success) {
      setMessage(result.error.issues[0].message);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`/api/posts/${post.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(result.data),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Failed to update post");
        return;
      }

      router.push(`/blogs/${post.slug}`);
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
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-[var(--accent)]"
        />
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
          rows={10}
          className="w-full resize-y rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm leading-6 text-white outline-none transition-colors focus:border-[var(--accent)]"
        />
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
            {communities.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
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
        <div className="rounded-lg border border-[var(--danger)]/30 bg-[var(--danger)]/10 px-4 py-3 text-sm text-[var(--danger)]">
          {message}
        </div>
      )}

      <div className="flex justify-end border-t border-[var(--border)] pt-5">
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--accent-hover)] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}