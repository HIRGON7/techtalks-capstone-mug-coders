import { connectDB } from "@/lib/mongodb";

import Bookmark from "@/models/Bookmark";

import "@/models/Post";
import "@/models/User";
import "@/models/Community";

export async function getBookmarksByUser(userId: string) {
  await connectDB();

  const bookmarks = await Bookmark.find({
    user: userId,
  })
    .populate({
      path: "post",
      populate: [
        {
          path: "author",
          select: "name username",
        },
        {
          path: "community",
          select: "name slug",
        },
      ],
    })
    .sort({ createdAt: -1 })
    .lean();

  return bookmarks;
}