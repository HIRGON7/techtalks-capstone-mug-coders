import { auth } from "@/auth";
import { connectDB } from "@/lib/mongodb";

import User from "@/models/User";
import Post from "@/models/Post";
import Bookmark from "@/models/Bookmark";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();

  if (!session?.user?.email) {
    return Response.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  await connectDB();

  const { id } = await params;

  const currentUser = await User.findOne({
    email: session.user.email,
  });

  if (!currentUser) {
    return Response.json(
      { message: "User not found" },
      { status: 404 }
    );
  }

  const post = await Post.findById(id);

  if (!post) {
    return Response.json(
      { message: "Post not found" },
      { status: 404 }
    );
  }

  const existingBookmark = await Bookmark.findOne({
    user: currentUser._id,
    post: post._id,
  });

  if (existingBookmark) {
    return Response.json({
      success: true,
      message: "Already bookmarked",
    });
  }

  await Bookmark.create({
    user: currentUser._id,
    post: post._id,
  });

  return Response.json(
    {
      success: true,
      message: "Post bookmarked",
    },
    { status: 201 }
  );
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();

  if (!session?.user?.email) {
    return Response.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  await connectDB();

  const { id } = await params;

  const currentUser = await User.findOne({
    email: session.user.email,
  });

  if (!currentUser) {
    return Response.json(
      { message: "User not found" },
      { status: 404 }
    );
  }

  const bookmark = await Bookmark.findOneAndDelete({
    user: currentUser._id,
    post: id,
  });

  if (!bookmark) {
    return Response.json(
      { message: "Bookmark not found" },
      { status: 404 }
    );
  }

  return Response.json({
    success: true,
    message: "Bookmark removed",
  });
}