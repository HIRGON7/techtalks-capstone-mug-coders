import { auth } from "@/auth";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import Post from "@/models/Post";
import { createPostSchema } from "@/schemas/post";




export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user?.email) {
    return Response.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  await connectDB();

 
  const currentUser = await User.findOne({
    email: session.user.email,
  });

  if (!currentUser) {
    return Response.json(
      { message: "User not found" },
      { status: 404 }
    );
  }


  const body = await request.json();


  const result = createPostSchema.safeParse(body);

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


  const slug =
    title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") +
    "-" +
    Date.now();


  const post = await Post.create({
    title,
    slug,
    content,
    author: currentUser._id,
    community,
    topics,
    published: true,
  });

  return Response.json(
    {
      success: true,
      post,
    },
    { status: 201 }
  );
}