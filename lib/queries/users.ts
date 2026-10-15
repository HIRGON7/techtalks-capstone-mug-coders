import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function getUserByUsername(username: string) {
  await connectDB();

  const user = await User.findOne({
    username: username,
  }).lean();

  return user;
}