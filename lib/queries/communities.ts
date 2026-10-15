import { connectDB } from "@/lib/mongodb";
import Community from "@/models/Community";

export async function getCommunities() {
  await connectDB();

  const communities = await Community.find()
    .sort({ createdAt: -1 })
    .lean();

  return communities;
}
export async function getCommunityBySlug(slug: string) {
  await connectDB();

  const community = await Community.findOne({
    slug: slug,
  }).lean();

  return community;
}