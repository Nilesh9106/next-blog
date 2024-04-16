import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const isAuthRoute = url.pathname.startsWith("/auth");
  const isDashboardRoute = url.pathname.startsWith("/dashboard");
  if (isDashboardRoute) {
    return NextResponse.next();
  } else {
    return NextResponse.next();
  }
}
