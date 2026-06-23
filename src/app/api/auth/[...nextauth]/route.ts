import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PROGRAM_CONFIG } from "@/config/program";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "dummy-google-client-id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "dummy-google-client-secret",
    })
  ],
  callbacks: {
    async signIn({ user, account }) {
      const email = user.email?.trim().toLowerCase();
      if (!email) return false;
      
      const allowedDomain = PROGRAM_CONFIG.allowedEmailDomain.toLowerCase();
      if (!email.endsWith(allowedDomain)) {
        // This will redirect with ?error=AccessDenied in NextAuth callback
        return false;
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id as string;
      }
      return session;
    }
  },
  pages: {
    signIn: "/",
    error: "/", // Redirect back to login page on authentication failure
  },
  secret: process.env.NEXTAUTH_SECRET || "acmw-build-accelerator-secret-2026-key",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
