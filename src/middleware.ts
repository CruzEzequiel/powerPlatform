// middleware.ts
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value;
    const { pathname } = request.nextUrl;

    if (pathname === "/") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (!token && pathname !== "/login") {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (token && pathname === "/login") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/", "/login", "/dashboard/:path*"],
};
