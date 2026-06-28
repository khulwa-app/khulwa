import { NextResponse, type NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const COOKIE_PREFIX = "khulwa";

export function proxy(request: NextRequest) {
  const hasSession = Boolean(getSessionCookie(request, { cookiePrefix: COOKIE_PREFIX }));
  const { pathname } = request.nextUrl;
  const isApp = pathname === "/app" || pathname.startsWith("/app/");
  const isLogin = pathname === "/login" || pathname.startsWith("/login/");

  if (isApp && !hasSession) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (isLogin && hasSession) {
    const url = request.nextUrl.clone();
    url.pathname = "/app";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.[^/]+$).*)"],
};
