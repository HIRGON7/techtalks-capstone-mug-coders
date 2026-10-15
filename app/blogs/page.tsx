import Link from "next/link";

import {
  getPosts,
  getPostTopics,
} from "@/lib/queries/posts";

import { getCommunities } from "@/lib/queries/communities";

export default async function BlogsPage({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    community?: string;
    topic?: string;
    sort?: string;
    page?: string;
  }>;
}) {
  const params = await searchParams;

  const search = params.search || "";
  const community = params.community || "";
  const topic = params.topic || "";
  const sort = params.sort || "newest";

  const page = Math.max(1, Number(params.page) || 1);

  const {
    posts,
    totalPosts,
    totalPages,
  } = await getPosts({
    search,
    community,
    topic,
    sort,
    page,
    limit: 5,
  });

  const communities = await getCommunities();
  const topics = await getPostTopics();

  function getPageLink(newPage: number) {
    const query = new URLSearchParams();

    if (search) {
      query.set("search", search);
    }

    if (community) {
      query.set("community", community);
    }

    if (topic) {
      query.set("topic", topic);
    }

    if (sort) {
      query.set("sort", sort);
    }

    query.set("page", newPage.toString());

    return `/blogs?${query.toString()}`;
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-sm font-medium text-[var(--accent)]">
            Community feed
          </p>

          <h1 className="text-3xl font-semibold tracking-tight text-white">
            Posts
          </h1>

          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
            Discover ideas, projects, questions, and technical discussions.
          </p>
        </div>

        <Link
          href="/create"
          className="inline-flex w-fit items-center rounded-lg bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--accent-hover)]"
        >
          Create Post
        </Link>
      </div>

      <form
        method="GET"
        className="mb-6 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4"
      >
        <div className="grid gap-3 md:grid-cols-2">
          <input
            type="text"
            name="search"
            defaultValue={search}
            placeholder="Search posts..."
            aria-label="Search posts"
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--accent)]"
          />

          <select
            name="community"
            defaultValue={community}
            aria-label="Filter by community"
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-sm text-white outline-none transition-colors focus:border-[var(--accent)]"
          >
            <option value="">All Communities</option>

            {communities.map((item) => (
              <option
                key={item._id.toString()}
                value={item._id.toString()}
              >
                {item.name}
              </option>
            ))}
          </select>

          <select
            name="topic"
            defaultValue={topic}
            aria-label="Filter by topic"
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-sm text-white outline-none transition-colors focus:border-[var(--accent)]"
          >
            <option value="">All Topics</option>

            {topics.map((item: string) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            name="sort"
            defaultValue={sort}
            aria-label="Sort posts"
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-sm text-white outline-none transition-colors focus:border-[var(--accent)]"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="title">Title A-Z</option>
          </select>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            type="submit"
            className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[var(--accent-hover)]"
          >
            Apply Filters
          </button>

          <Link
            href="/blogs"
            className="rounded-lg border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--muted-light)] transition-colors hover:bg-[var(--surface-hover)] hover:text-white"
          >
            Clear
          </Link>
        </div>
      </form>

      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-[var(--muted)]">
          {totalPosts} post{totalPosts === 1 ? "" : "s"} found
        </p>

        {totalPages > 1 && (
          <p className="text-sm text-[var(--muted)]">
            Page {page} of {totalPages}
          </p>
        )}
      </div>

      {posts.length === 0 ? (
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-10 text-center">
          <h2 className="text-base font-semibold text-white">
            No posts found
          </h2>

          <p className="mt-2 text-sm text-[var(--muted)]">
            Try changing your search or filters.
          </p>

          <Link
            href="/blogs"
            className="mt-5 inline-block text-sm font-medium text-[var(--accent)] hover:text-[var(--accent-hover)]"
          >
            Clear filters →
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post: any) => (
          <article
  key={post._id.toString()}
  className="post-card rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-all duration-500 hover:bg-[var(--surface-hover)]"
>
              <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--muted)]">
                <span className="font-medium text-[var(--muted-light)]">
                  {post.author?.name || "Unknown author"}
                </span>

                <span>•</span>

                <span>
                  {post.community?.name || "Unknown community"}
                </span>
              </div>

              <h2 className="mt-3 text-xl font-semibold tracking-tight text-white">
                <Link
                  href={`/blogs/${post.slug}`}
                  className="transition-colors hover:text-[var(--accent)]"
                >
                  {post.title}
                </Link>
              </h2>

              <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-[var(--muted-light)]">
                {post.content}
              </p>

              {post.topics?.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {post.topics.map((item: string) => (
                    <span
                      key={item}
                      className="rounded-md border border-[var(--border)] bg-[var(--background)] px-2.5 py-1 text-xs font-medium text-[var(--muted)]"
                    >
                      #{item}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-5 border-t border-[var(--border)] pt-4">
                <Link
                  href={`/blogs/${post.slug}`}
                  className="text-sm font-medium text-[var(--accent)] transition-colors hover:text-[var(--accent-hover)]"
                >
                  Read discussion →
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-between border-t border-[var(--border)] pt-6">
          <div>
            {page > 1 ? (
              <Link
                href={getPageLink(page - 1)}
                className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--muted-light)] transition-colors hover:bg-[var(--surface-hover)] hover:text-white"
              >
                ← Previous
              </Link>
            ) : (
              <span />
            )}
          </div>

          <span className="text-sm text-[var(--muted)]">
            Page {page} of {totalPages}
          </span>

          <div>
            {page < totalPages ? (
              <Link
                href={getPageLink(page + 1)}
                className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--muted-light)] transition-colors hover:bg-[var(--surface-hover)] hover:text-white"
              >
                Next →
              </Link>
            ) : (
              <span />
            )}
          </div>
        </div>
      )}
    </div>
  );
}