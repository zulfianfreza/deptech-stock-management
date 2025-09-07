import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { COOKIE_KEY } from "./constant/common.constant";

// 1. Specify protected and public routes
const publicRoutes = ["/login"];

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isPublicRoute = publicRoutes.includes(path);

  // 3. Decrypt the session from the cookie
  const cookieStore = await cookies();
  const cookie = cookieStore.get(COOKIE_KEY.ACCESS_TOKEN)?.value;

  // 5. Handle public routes
  if (isPublicRoute) {
    // If the user is already authenticated, redirect to home
    if (cookie) {
      return NextResponse.redirect(new URL("/", req.nextUrl));
    }
    // If the user is not authenticated, allow access to /login
    return NextResponse.next();
  }

  // 6. Protect all other routes
  if (!cookie) {
    // If the user is not authenticated, redirect to /login
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // 7. Allow access to protected routes if the user is authenticated
  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
