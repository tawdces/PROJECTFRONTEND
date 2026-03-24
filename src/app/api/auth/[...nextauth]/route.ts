import NextAuth from "next-auth";
import { authOptions } from "./authOptions";

const handler =
  typeof NextAuth === "function"
    ? NextAuth(authOptions)
    : (() => new Response(null, { status: 500 })) as any;

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export { handler as GET, handler as POST };