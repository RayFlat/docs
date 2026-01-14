export { middleware } from "nextra/locales";

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: [
    "/((?!api|styles|_next/static|_next/image|favicon|favicon.ico|healthz|llms-full.txt|llms.txt|icon.svg|apple-icon.png|sitemap.xml|robots.txt|manifest).*)",
  ],
};
