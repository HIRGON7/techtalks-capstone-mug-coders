import Link from "next/link";
import { notFound } from "next/navigation";

import { auth } from "@/auth";
import { connectDB } from "@/lib/mongodb";
import { getPostBySlug } from "@/lib/queries/posts";
import { getCommentsByPost } from "@/lib/queries/comments";

import User from "@/models/User";
import Bookmark from "@/models/Bookmark";

import BookmarkButton from "@/components/BookmarkButton";
import DeletePostButton from "@/components/DeletePostButton";
import CommentForm from "@/components/CommentForm";
import DeleteCommentButton from "@/components/DeleteCommentButton";

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post: any = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const comments: any[] = await getCommentsByPost(
    post._id.toString()
  );

  const session = await auth();

  let isOwner = false;
  let bookmarked = false;
  let currentUser: any = null;

  if (session?.user?.email) {
    await connectDB();

    currentUser = await User.findOne({
      email: session.user.email,
    });

    if (currentUser) {
      isOwner =
        post.author._id.toString() ===
        currentUser._id.toString();

      const existingBookmark = await Bookmark.findOne({
        user: currentUser._id,
        post: post._id,
      });

      bookmarked = !!existingBookmark;
    }
  }

  return (
    <div className="mx-auto max-w-4xl">
      <Link
        href="/blogs"
        className="mb-6 inline-flex text-sm font-medium text-[var(--muted)] transition-colors hover:text-white"
      >
        ← Back to posts
      </Link>

      <article className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-2 text-sm text-[var(--muted)]">
          {post.author?.username ? (
            <Link
              href={`/profile/${post.author.username}`}
              className="font-medium text-[var(--muted-light)] transition-colors hover:text-white"
            >
              {post.author.name}
            </Link>
          ) : (
            <span className="font-medium text-[var(--muted-light)]">
              {post.author.name}
            </span>
          )}

          <span>•</span>

          {post.community?.slug ? (
            <Link
              href={`/communities/${post.community.slug}`}
              className="transition-colors hover:text-[var(--accent)]"
            >
              {post.community.name}
            </Link>
          ) : (
            <span>{post.community.name}</span>
          )}
        </div>

        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          {post.title}
        </h1>

        {post.topics?.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {post.topics.map((topic: string) => (
              <span
                key={topic}
                className="rounded-md border border-[var(--border)] bg-[var(--background)] px-2.5 py-1 text-xs font-medium text-[var(--muted-light)]"
              >
                #{topic}
              </span>
            ))}
          </div>
        )}

        <div className="mt-8 border-t border-[var(--border)] pt-8">
          <p className="whitespace-pre-wrap text-[15px] leading-7 text-[var(--muted-light)]">
            {post.content}
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-[var(--border)] pt-5">
          {session && (
            <BookmarkButton
              postId={post._id.toString()}
              initiallyBookmarked={bookmarked}
            />
          )}

          {isOwner && (
            <>
              <Link
                href={`/blogs/${post.slug}/edit`}
                className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm font-medium text-[var(--muted-light)] transition-colors hover:bg-[var(--surface-hover)] hover:text-white"
              >
                Edit Post
              </Link>

              <DeletePostButton
                postId={post._id.toString()}
              />
            </>
          )}
        </div>
      </article>

      <section className="mt-8">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">
            Comments
          </h2>

          <span className="text-sm text-[var(--muted)]">
            {comments.length} comment
            {comments.length === 1 ? "" : "s"}
          </span>
        </div>

        {session ? (
          <CommentForm postId={post._id.toString()} />
        ) : (
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 text-sm text-[var(--muted)]">
            <Link
              href="/api/auth/signin"
              className="font-medium text-[var(--accent)] hover:text-[var(--accent-hover)]"
            >
              Sign in
            </Link>{" "}
            to join the discussion.
          </div>
        )}

        {comments.length === 0 ? (
          <div className="mt-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center">
            <h3 className="text-sm font-semibold text-white">
              No comments yet
            </h3>

            <p className="mt-2 text-sm text-[var(--muted)]">
              Be the first to start the discussion.
            </p>
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            {comments.map((comment) => {
              const isCommentOwner =
                currentUser &&
                comment.author._id.toString() ===
                  currentUser._id.toString();

              return (
                <article
                  key={comment._id.toString()}
                  className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      {comment.author?.username ? (
                        <Link
                          href={`/profile/${comment.author.username}`}
                          className="text-sm font-semibold text-white transition-colors hover:text-[var(--accent)]"
                        >
                          {comment.author.name}
                        </Link>
                      ) : (
                        <p className="text-sm font-semibold text-white">
                          {comment.author.name}
                        </p>
                      )}

                      {comment.author?.username && (
                        <p className="mt-0.5 text-xs text-[var(--muted)]">
                          @{comment.author.username}
                        </p>
                      )}
                    </div>

                    {isCommentOwner && (
                      <DeleteCommentButton
                        commentId={comment._id.toString()}
                      />
                    )}
                  </div>

                  <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-[var(--muted-light)]">
                    {comment.content}
                  </p>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}