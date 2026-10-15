import { connectDB } from "@/lib/mongodb";

import Post from "@/models/Post";

import "@/models/User";
import "@/models/Community";

export async function getPosts({
  search = "",
  community = "",
  topic = "",
  sort = "newest",
  page = 1,
  limit = 5,
}: {
  search?: string;
  community?: string;
  topic?: string;
  sort?: string;
  page?: number;
  limit?: number;
} = {}) {
  await connectDB();

  const query: any = {
    published: true,
  };

  if (search) {
    const escapedSearch = search.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&"
    );

    query.$or = [
      {
        title: {
          $regex: escapedSearch,
          $options: "i",
        },
      },
      {
        content: {
          $regex: escapedSearch,
          $options: "i",
        },
      },
      {
        topics: {
          $regex: escapedSearch,
          $options: "i",
        },
      },
    ];
  }

  if (community) {
    query.community = community;
  }

  if (topic) {
    query.topics = topic;
  }

  const skip = (page - 1) * limit;

  let sortOption: any = {
    createdAt: -1,
  };

  if (sort === "oldest") {
    sortOption = {
      createdAt: 1,
    };
  }

  if (sort === "title") {
    sortOption = {
      title: 1,
    };
  }

  const posts = await Post.find(query)
    .populate("author", "name username")
    .populate("community", "name slug")
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .lean();

  const totalPosts = await Post.countDocuments(query);

  return {
    posts,
    totalPosts,
    totalPages: Math.ceil(totalPosts / limit),
  };
}

export async function getPostTopics() {
  await connectDB();

  const topics = await Post.distinct("topics", {
    published: true,
  });

  return topics.sort();
}

export async function getPostBySlug(slug: string) {
  await connectDB();

  const post = await Post.findOne({
    slug,
    published: true,
  })
    .populate("author", "name username")
    .populate("community", "name slug")
    .lean();

  return post;
}