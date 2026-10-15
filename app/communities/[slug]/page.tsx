import { getCommunityBySlug } from "@/lib/queries/communities";
import { auth } from "@/auth";
import { connectDB } from "@/lib/mongodb";
import { notFound } from "next/navigation";
import User from "@/models/User";
import Membership from "@/models/Membership";
import JoinCommunityButton from "@/components/JoinCommunityButton";

export default async function CommunityDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const community: any = await getCommunityBySlug(slug);

  if (!community) {
    notFound();
  }

  const session = await auth();

  let joined = false;

  if (session?.user?.email) {
    await connectDB();

    const currentUser = await User.findOne({
      email: session.user.email,
    });

    if (currentUser) {
      const membership = await Membership.findOne({
        user: currentUser._id,
        community: community._id,
      });

      joined = !!membership;
    }
  }

  return (
    <div className="mx-auto max-w-4xl">
      <section className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <p className="mb-2 text-sm font-medium text-[var(--accent)]">
              Community
            </p>

            <h1 className="text-3xl font-semibold tracking-tight text-white">
              {community.name}
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--muted)]">
              {community.description}
            </p>
          </div>

          {session && (
            <div className="shrink-0">
              <JoinCommunityButton
                communityId={community._id.toString()}
                initiallyJoined={joined}
              />
            </div>
          )}
        </div>
      </section>

      <section className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
        <h2 className="text-base font-semibold text-white">
          Topics
        </h2>

        {community.topics && community.topics.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {community.topics.map((topic: string) => (
              <span
                key={topic}
                className="rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-1.5 text-xs font-medium text-[var(--muted-light)]"
              >
                #{topic}
              </span>
            ))}
          </div>
        ) : (
          <p className="mt-3 text-sm text-[var(--muted)]">
            No topics have been added yet.
          </p>
        )}
      </section>
    </div>
  );
}