import { auth } from "@/auth";
import { redirect, notFound } from "next/navigation";

import { getRandomForbiddenMessage } from "@/lib/forbiddenMessages";
import { getPostBySlug } from "@/lib/queries/posts";
import { getCommunities } from "@/lib/queries/communities";
import { connectDB } from "@/lib/mongodb";

import User from "@/models/User";

import EditPostForm from "@/components/EditPostForm";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/api/auth/signin");
  }

  await connectDB();

  const { slug } = await params;

  const post: any = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const currentUser = await User.findOne({
    email: session.user.email,
  });

  if (!currentUser) {
    return (
      <div className="mx-auto max-w-xl">
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center">
          <h1 className="text-2xl font-semibold text-white">
            User not found
          </h1>

          <p className="mt-2 text-sm text-[var(--muted)]">
            We couldn&apos;t load your account information.
          </p>
        </div>
      </div>
    );
  }

  if (
    post.author._id.toString() !==
    currentUser._id.toString()
  ) {
    const message = getRandomForbiddenMessage();

    console.log(`[403] ${message}`);

    return (
      <div className="mx-auto flex min-h-[60vh] max-w-xl items-center justify-center">
        <div className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[var(--danger)]/30 bg-[var(--danger)]/10 text-lg font-semibold text-[var(--danger)]">
            403
          </div>

          <h1 className="mt-5 text-2xl font-semibold tracking-tight text-white">
            Access denied
          </h1>

          <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
            {message}
          </p>
        </div>
      </div>
    );
  }

  const communities = await getCommunities();

  const communityOptions = communities.map((community) => ({
    id: community._id.toString(),
    name: community.name,
  }));

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8">
        <p className="mb-2 text-sm font-medium text-[var(--accent)]">
          Post management
        </p>

        <h1 className="text-3xl font-semibold tracking-tight text-white">
          Edit Post
        </h1>

        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
          Update your post content, community, or topics.
        </p>
      </div>

      <EditPostForm
        post={{
          id: post._id.toString(),
          slug: post.slug,
          title: post.title,
          content: post.content,
          community: post.community._id.toString(),
          topics: post.topics,
        }}
        communities={communityOptions}
      />
    </div>
  );
}