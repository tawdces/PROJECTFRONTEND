import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    // Redirect unauthenticated users
    return NextResponse.redirect(new URL("/api/auth/signin", req.url));
  }

  // Access token properties: token.id, token.name, token.email, token.role
  if (req.nextUrl.pathname.startsWith("/admin") && token.role !== "admin") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/booking/:path*", "/mybooking/:path*", "/admin/:path*"],
};