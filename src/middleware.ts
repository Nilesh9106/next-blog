import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./utils/auth";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const isAuthRoute = url.pathname.startsWith("/auth");
  const isDashboardRoute = url.pathname.startsWith("/admin");
  const authToken = cookies().get("token");
  if (isDashboardRoute) {
    if (!authToken) {
      return NextResponse.redirect(new URL("/auth", request.url));
    }
    const payload = await verifyToken(authToken.value);
    if (!payload || !payload.isAdmin) {
      return NextResponse.redirect(new URL("/auth", request.url));
    }
    return NextResponse.next();
  } else {
    return NextResponse.next();
  }
}
