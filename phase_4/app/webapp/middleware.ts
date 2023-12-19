import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

    if (request.nextUrl.pathname == '/') {
        return;
    }

    console.log(request.cookies.has('token'))

    if (request.cookies.has('token')) {

        const cookie = request.cookies.get('token')?.value;
        console.log(cookie)
        const headers = new Headers();

        headers.append('Authorization', 'Bearer ' + cookie);
        const response = await fetch('http://localhost:3000/account/isAuthenticated', {
            headers: headers,
            cache: 'no-store',
            next: {
                revalidate: 0
            }
        });
        let data = await response.text()
        console.debug(data);
    }

    return NextResponse.redirect(new URL('/login', request.url))
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
        '/((?!api|login|admin/login|recuperacao-senha|catalogo|_next/static|_next/image|favicon.ico).*)',
    ],
}