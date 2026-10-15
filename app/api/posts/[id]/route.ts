import { auth } from "@/auth";
import { connectDB } from "@/lib/mongodb";
import { getRandomForbiddenMessage } from "@/lib/forbiddenMessages";
import User from "@/models/User";
import Post from "@/models/Post";
import { updatePostSchema } from "@/schemas/post";

export async function PATCH(
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

  if (
  post.author.toString() !==
  currentUser._id.toString()
) {
  const message = getRandomForbiddenMessage();

  console.log(`[403] ${message}`);

  return Response.json(
    { message },
    { status: 403 }
  );
}

  const body = await request.json();

  const result = updatePostSchema.safeParse(body);

  if (!result.success) {
    return Response.json(
      {
        message: "Validation failed",
        errors: result.error.issues,
      },
      { status: 400 }
    );
  }

  const {
    title,
    content,
    community,
    topics,
  } = result.data;

  if (title !== undefined) {
    post.title = title;
  }

  if (content !== undefined) {
    post.content = content;
  }

  if (community !== undefined) {
    post.community = community;
  }

  if (topics !== undefined) {
    post.topics = topics;
  }

  await post.save();

  return Response.json({
    success: true,
    message: "Post updated successfully",
    post,
  });
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

  const post = await Post.findById(id);

  if (!post) {
    return Response.json(
      { message: "Post not found" },
      { status: 404 }
    );
  }

  if (
  post.author.toString() !==
  currentUser._id.toString()
) {
  const message = getRandomForbiddenMessage();

  console.log(`[403] ${message}`);

  return Response.json(
    { message },
    { status: 403 }
  );
}

  await post.deleteOne();

  return Response.json({
    success: true,
    message: "Post deleted successfully",
  });
}