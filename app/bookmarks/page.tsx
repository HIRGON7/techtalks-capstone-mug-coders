
import Link from "next/link";
import { redirect } from "next/navigation";
import RosePet from "@/components/RosePet";
import IcePet from "@/components/IcePet";
import LavaPet from "@/components/LavaPet";
import CorePet from "@/components/CorePet";
import FloraPet from "@/components/FloraPet";
import { auth } from "@/auth";
import { connectDB } from "@/lib/mongodb";
import { getBookmarksByUser } from "@/lib/queries/bookmarks";
import User from "@/models/User";

function EmptyBookmarks() {
  return (
    <div className="relative isolate mt-20 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-6 pb-8 pt-10 text-center sm:px-8">
        <RosePet />
        <IcePet />
        <LavaPet />
        <CorePet />
        <FloraPet />
      <div className="relative z-10">
        <h2 className="text-base font-semibold text-[var(--foreground)]">
          No bookmarks yet
        </h2>

        <p className="mt-2 text-sm text-[var(--muted)]">
          Save a post and it will appear here.
        </p>

        <Link
          href="/blogs"
          className="mt-5 inline-block text-sm font-medium text-[var(--accent)] transition-colors hover:text-[var(--accent-hover)]"
        >
          Explore posts →
        </Link>
      </div>
    </div>
  );
}

export default async function BookmarksPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/api/auth/signin");
  }

  await connectDB();

  const currentUser = await User.findOne({
    email: session.user.email,
  });

  if (!currentUser) {
    return (
      <div className="mx-auto max-w-4xl">
        <EmptyBookmarks />
      </div>
    );
  }

  const bookmarks: any[] = await getBookmarksByUser(
    currentUser._id.toString()
  );

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8">
        <p className="mb-2 text-sm font-medium text-[var(--accent)]">
          Saved posts
        </p>

        <h1 className="text-3xl font-semibold tracking-tight text-[var(--foreground)]">
          My Bookmarks
        </h1>

        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
          Posts you saved to revisit later.
        </p>
      </div>

      {bookmarks.length === 0 ? (
        <EmptyBookmarks />
      ) : (
        <div className="space-y-4">
          {bookmarks.map((bookmark) => {
            const post = bookmark.post;

            if (!post) return null;

            return (
              <article
                key={bookmark._id.toString()}
                className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-colors hover:bg-[var(--surface-hover)]"
              >
                <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-[var(--muted)]">
                  <span>
                    {post.author?.name || "Unknown author"}
                  </span>

                  <span>•</span>

                  <span>
                    {post.community?.name || "Unknown community"}
                  </span>
                </div>

                <h2 className="text-lg font-semibold text-[var(--foreground)]">
                  <Link
                    href={`/blogs/${post.slug}`}
                    className="transition-colors hover:text-[var(--accent)]"
                  >
                    {post.title}
                  </Link>
                </h2>

                <p className="mt-3 line-clamp-3 text-sm leading-6 text-[var(--muted-light)]">
                  {post.content}
                </p>

                <Link
                  href={`/blogs/${post.slug}`}
                  className="mt-4 inline-block text-sm font-medium text-[var(--accent)] hover:text-[var(--accent-hover)]"
                >
                  Read post →
                </Link>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
