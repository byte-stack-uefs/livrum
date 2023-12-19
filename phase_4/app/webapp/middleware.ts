import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    if (request.nextUrl.pathname == "/") {
        return;
    }

    if (request.cookies.has("token")) {
        return;
    }

    return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        "/((?!api|login|admin/login|recuperacao-senha|catalogo|_next/static|_next/image|favicon.ico).*)",
    ],
};
