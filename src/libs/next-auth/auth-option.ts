import { jwtDecode } from "jwt-decode";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authApi } from "../api/auth.api";

declare module "next-auth" {
  // eslint-disable-next-line no-unused-vars
  interface Session {
    accessToken?: string;
    userId?: string;
    error?: string;
  }
}
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        usernameOrEmail: {
          label: "Username or Email",
          type: "text",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        try {
          if (!credentials?.usernameOrEmail || !credentials?.password) {
            return null;
          }
          const response = await authApi.login({
            usernameOrEmail: credentials?.usernameOrEmail,
            password: credentials?.password,
          });
          if (response) {
            return response;
          }
          return null;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 12 * 24 * 60 * 60, // 12 hour
  },
  callbacks: {
    async redirect({ baseUrl }) {
      return baseUrl;
    },
    async jwt({ token, user }) {
      if (user) {
        const u = user as any;
        const decode: any = jwtDecode(u.accessToken);
        token.userId = decode.sub;
        token.accessToken = u.accessToken;
      }
      return token;
    },

    async session({ session, token }) {
      session.userId = token.userId as string;
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
};
