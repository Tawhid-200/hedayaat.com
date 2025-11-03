import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const intlMiddleware = createMiddleware(routing);

export async function proxy(request: NextRequest) {
  const intlResponse = intlMiddleware(request);
  if (intlResponse?.status !== 200) return intlResponse;

  let pathname = request.nextUrl.pathname;

  // Detect locale prefix
  const pathParts = pathname.split("/");
  let possibleLocale = pathParts[1];
  let localeIncluded = (routing.locales as readonly string[]).includes(
    possibleLocale
  );

  // If locale is present, remove it for path checking
  if (localeIncluded) {
    pathParts.shift(); // removes ""
    pathParts.shift(); // removes locale
    pathname = "/" + pathParts.join("/");
  }

  // Auth check for admin pages
  if (pathname.startsWith("/admin")) {
    const sessionCookie = getSessionCookie(request);

    if (!sessionCookie) {
      // redirect preserving locale if it exists
      const redirectPath = localeIncluded ? `/${possibleLocale}` : `/`;
      return NextResponse.redirect(new URL(redirectPath, request.url));
    }
  }

  return intlResponse;
}

export const config = {
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)", "/:locale/admin/:path*"],
};
