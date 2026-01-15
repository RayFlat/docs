import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect root to /es
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/es", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon|healthz|llms-full.txt|llms.txt|icon.svg|apple-icon.png|sitemap.xml|robots.txt|manifest|preview.webp).*)",
  ],
};
