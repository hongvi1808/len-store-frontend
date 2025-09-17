import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ROLE_ADMIN, ROLE_CUSTOMER } from "./base/utils/constants";

export function middleware(req: NextRequest) {
  
  const accessToken = req.cookies.get("access-token")?.value;
  const role = req.cookies.get("role")?.value;
  // role admin
  if (accessToken && role === ROLE_ADMIN && req.nextUrl.pathname === "/admin/login") {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  if (req.nextUrl.pathname.startsWith("/admin") && req.nextUrl.pathname !== "/admin/login") {
    if (!accessToken || !role) return NextResponse.redirect(new URL("/admin/login", req.url));
    if (role && role !== ROLE_ADMIN) return NextResponse.redirect(new URL("/", req.url));
  }


  // role customer
  if (accessToken && role === ROLE_CUSTOMER
    && (req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/register")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}
