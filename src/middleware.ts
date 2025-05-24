import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const IS_AUTHENTICATED = true;

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // 1. Si viene a "/", lo mandamos a "/dashboard"
    if (pathname === '/') {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // 2. Control de acceso: si no está autenticado y no va a "/login", lo mandamos a login
    if (!IS_AUTHENTICATED && pathname !== '/login') {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // 3. En cualquier otro caso, dejamos que siga
    return NextResponse.next();
}


export const config = {
    matcher: ['/', '/dashboard/:path*'],
};
