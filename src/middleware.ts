import { NextRequest, NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

const locales = ["en", "fr"];
const defaultLocale = "en";

function getPreferredLocale(request: NextRequest): string {
    const acceptLanguage = request.headers.get("accept-language");

    if (!acceptLanguage) return defaultLocale;

    // Example: "fr-CA,fr;q=0.9,en;q=0.8"
    const preferred = acceptLanguage.split(",").map((lang) => lang.split(";")[0].trim().split("-")[0]);

    for (const lang of preferred) {
        if (locales.includes(lang)) {
            return lang;
        }
    }

    return defaultLocale;
}

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Skip internal paths
    if (pathname.startsWith("/_next") || pathname.startsWith("/api") || pathname.startsWith("/admin") || PUBLIC_FILE.test(pathname)) {
        return;
    }

    // Check if pathname already has locale
    const pathnameHasLocale = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);

    if (pathnameHasLocale) return;

    // Detect preferred locale
    const locale = getPreferredLocale(request);

    // Redirect to locale version
    request.nextUrl.pathname = `/${locale}${pathname}`;

    return NextResponse.redirect(request.nextUrl);
}

export const config = {
    matcher: [
        /*
         * Match all paths except:
         * - api
         * - _next
         * - static files
         * - admin (Payload)
         */
        "/((?!api|_next|.*\\..*|admin).*)",
    ],
};
