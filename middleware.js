import { NextResponse } from "next/server";
import jwt_decode from "jwt-decode";

export async function middleware(req) {
  const token = req.cookies.get("jwtToken") || localStorage.getItem("jwtToken");

  const pathname = req.nextUrl.pathname;

  // If no token found, redirect to login page
  if (!token) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  try {
    // Decode JWT token to check role
    const decodedToken = jwt_decode(token);

    // Restrict access based on role
    if (pathname.startsWith("/admin") && decodedToken.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url)); // Not admin
    }

    if (
      pathname.startsWith("/technician") &&
      decodedToken.role !== "technician"
    ) {
      return NextResponse.redirect(new URL("/", req.url)); // Not technician
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/auth/signin", req.url)); // Invalid token
  }
}

export const config = {
  matcher: ["/admin/:path*", "/technician/:path*"], // Only protect admin and technician routes
};
