import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [GitHub, Google],

  callbacks: {
    async signIn({ user }) {
      await connectDB();

      if (!user.email) {
        return false;
      }

      const existingUser = await User.findOne({
        email: user.email,
      });

      if (!existingUser) {
        const baseUsername =
          user.email.split("@")[0].toLowerCase();

        await User.create({
          name: user.name || baseUsername,
          username: baseUsername,
          email: user.email,
          image: user.image || "",
          bio: "",
          skills: [],
        });
      }

      return true;
    },
  },
});