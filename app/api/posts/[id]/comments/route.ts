import { auth } from "@/auth";
import { connectDB } from "@/lib/mongodb";
import { commentSchema } from "@/schemas/comment";
import User from "@/models/User";
import Post from "@/models/Post";
import Comment from "@/models/Comment";

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

  const body = await request.json();

const result = commentSchema.safeParse(body);

if (!result.success) {
  return Response.json(
    {
      message: "Validation failed",
      errors: result.error.issues,
    },
    { status: 400 }
  );
}

const { content } = result.data;

  const comment = await Comment.create({
    content,
    author: currentUser._id,
    post: post._id,
  });

  return Response.json(
    {
      success: true,
      comment,
    },
    { status: 201 }
  );
}