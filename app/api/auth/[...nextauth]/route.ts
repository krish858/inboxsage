"use server";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { dbConnect } from "@/app/db";
import { userModel } from "@/models/userModel";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.CLIENT_ID || "",
      clientSecret: process.env.CLIENT_SECRET || "",
      authorization: {
        params: {
          scope: [
            "openid",
            "email",
            "profile",
            "https://www.googleapis.com/auth/gmail.readonly",
          ].join(" "),
          prompt: "consent",
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || "",
  callbacks: {
    async signIn({ user }) {
      try {
        await dbConnect();

        if (!user.email) return false;

        const userExists = await userModel.findOne({ email: user.email });
        if (!userExists) {
          await userModel.create({
            name: user.name || "Unnamed",
            email: user.email,
          });
        }

        return true;
      } catch (err) {
        console.error("SignIn Error:", err);
        return false;
      }
    },

    async jwt({ token, account }) {
      if (account?.access_token) {
        token.accessToken = account.access_token;
      }
      return token;
    },

    async session({ session, token }) {
      if (token?.accessToken) {
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
