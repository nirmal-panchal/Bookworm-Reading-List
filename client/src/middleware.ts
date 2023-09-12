import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// middleware file for handling the encrypted routes and route handling.
export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const isLoggedIn = request.cookies.get("token");
  if (isLoggedIn) {
    if (request.nextUrl.pathname.startsWith("/auth")) {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  if (!isLoggedIn) {
    if (request.nextUrl.pathname.startsWith("/shelf")) {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }
}
