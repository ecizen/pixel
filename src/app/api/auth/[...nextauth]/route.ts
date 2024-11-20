import NextAuth, { NextAuthOptions, Session, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Helper function to get environment variables
function getEnvVar(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
}

const GOOGLE_CLIENT_ID = getEnvVar("GOOGLE_CLIENT_ID");
const GOOGLE_CLIENT_SECRET = getEnvVar("GOOGLE_CLIENT_SECRET");

// Type augmentation for next-auth directly inside the configuration
declare module "next-auth" {
  interface User {
    id: string; // Add `id` property to the User type
  }

  interface Session {
    user: User; // Ensure `session.user` includes `id`
  }
}

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // If the user is authenticated, add the user ID to the token
      if (user) {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email as string },
        });

        if (!existingUser) {
          const newUser = await prisma.user.create({
            data: {
              email: user.email as string,
              name: user.name || "",
              image: user.image || "",
            },
          });
          token.id = newUser.id; // Only store the ID in the token
        } else {
          token.id = existingUser.id; // Only store the ID in the token
        }
      }
      return token;
    },

    async session({ session, token }) {
      // Safely add the ID from the token to the session
      if (session?.user) { // Ensure session.user exists before assigning ID
        session.user.id = token.id as string; // Add the ID to the session
      }
      return session;
    },
  },
};
export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);
