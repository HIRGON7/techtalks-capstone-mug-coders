import { auth } from "@/auth";
import { connectDB } from "@/lib/mongodb";

import User from "@/models/User";
import Community from "@/models/Community";
import Membership from "@/models/Membership";

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

  const community = await Community.findById(id);

  if (!community) {
    return Response.json(
      { message: "Community not found" },
      { status: 404 }
    );
  }

  const existingMembership = await Membership.findOne({
    user: currentUser._id,
    community: community._id,
  });

  if (existingMembership) {
    return Response.json(
      { message: "Already joined" },
      { status: 400 }
    );
  }

  await Membership.create({
    user: currentUser._id,
    community: community._id,
  });

  return Response.json(
    {
      success: true,
      message: "Community joined successfully",
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

  const membership = await Membership.findOneAndDelete({
    user: currentUser._id,
    community: id,
  });

  if (!membership) {
    return Response.json(
      { message: "Membership not found" },
      { status: 404 }
    );
  }

  return Response.json({
    success: true,
    message: "Community left successfully",
  });
}