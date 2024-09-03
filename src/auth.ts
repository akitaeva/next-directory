import NextAuth from "next-auth";
import GitHub from "@auth/core/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from '@/db';

 const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
 const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

 if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET ) {
  throw new Error('Missing GitHub credentials in .env file')
 }

 export const { handlers: { GET, POST}, auth, signOut, signIn } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    GitHub({
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
    })
  ],
  callbacks: {
    // To fix a in the nxt auth version bug
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({ session, user }: any) {
      if(session && user) {
        session.user.id = user.id;
      }
      return session;
    }
  }
 });
