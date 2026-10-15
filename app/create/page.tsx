import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getCommunities } from "@/lib/queries/communities";
import CreatePostForm from "@/components/CreatePostForm";

export default async function CreatePage() {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin");
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
          New post
        </p>

        <h1 className="text-3xl font-semibold tracking-tight text-white">
          Create Post
        </h1>

        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
          Share an idea, project, question, or technical topic with the
          community.
        </p>
      </div>

      <CreatePostForm communities={communityOptions} />
    </div>
  );
}