import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import NextAuth from "next-auth";
import authConfig from "@/lib/auth/auth.config";
import { privateRoutes } from "@/lib/routes/privateRoutes";

// Habilitar autenticación en middleware
const { auth } = NextAuth(authConfig);

export default auth(async (req: NextRequest) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth; // req.auth se añade dinámicamente por Auth.js

  const isPrivateRoute = privateRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  const isAuthRoute = pathname.startsWith("/auth");
  const isApiRoute = pathname.startsWith("/api");

  const url = req.nextUrl.origin;

  if (pathname.startsWith("/_next") || pathname === "/favicon.ico") return;

  if (isApiRoute) return;

  if (isLoggedIn && isAuthRoute) {
    return NextResponse.redirect(`${url}/dashboard`);
  }

  if (!isLoggedIn && isPrivateRoute) {
    return NextResponse.redirect(`${url}/auth/login`);
  }

  return NextResponse.next();
});
