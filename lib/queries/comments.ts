import { connectDB } from "@/lib/mongodb";
import Comment from "@/models/Comment";

import "@/models/User";

export async function getCommentsByPost(postId: string) {
  await connectDB();

  const comments = await Comment.find({
    post: postId,
  })
    .populate("author", "name username")
    .sort({ createdAt: -1 })
    .lean();

  return comments;
}