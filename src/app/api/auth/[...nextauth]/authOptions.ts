import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth";
import userLogIn from "@/libs/userLogIn";
import getUserProfile from "@/libs/getUserProfile";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        try {
          const loginRes = await userLogIn(credentials.email, credentials.password);
          if (!loginRes.success || !loginRes.token) return null;

          const profile = await getUserProfile(loginRes.token);
          if (!profile.success) return null;

          return {
            id: profile.data._id,
            name: profile.data.name,
            email: profile.data.email,
            role: profile.data.role,
            token: loginRes.token,
          };
        } catch (err) {
          return null;
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = {
        _id: token._id as string,
        name: token.name as string,
        email: token.email as string,
        role: token.role as string,
        token: token.token as string,
      };
      return session;
    },
  },
};