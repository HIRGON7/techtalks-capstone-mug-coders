
import { redirect, notFound } from "next/navigation";
import { auth } from "@/auth";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/api/auth/signin");
  }

  await connectDB();

  const user = await User.findOne({
    email: session.user.email,
  });

  if (!user?.username) {
    notFound();
  }

  redirect(`/profile/${encodeURIComponent(user.username)}`);
}
