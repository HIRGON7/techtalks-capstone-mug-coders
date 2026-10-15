import { auth } from "@/auth";
import { connectDB } from "@/lib/mongodb";

import User from "@/models/User";
import Comment from "@/models/Comment";

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

  const comment = await Comment.findById(id);

  if (!comment) {
    return Response.json(
      { message: "Comment not found" },
      { status: 404 }
    );
  }

  if (comment.author.toString() !== currentUser._id.toString()) {
    return Response.json(
      { message: "Forbidden" },
      { status: 403 }
    );
  }

  await comment.deleteOne();

  return Response.json({
    success: true,
    message: "Comment deleted successfully",
  });
}