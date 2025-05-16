import NextAuth from "next-auth";
import { authOptions } from "@/libs/next-auth/auth-option";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
