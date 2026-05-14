import { getSessionCookie } from "better-auth/cookies";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
    const session = getSessionCookie(request);

    if (!session) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/rules/:path*",
        "/transactions/:path*",
        "/settings/:path*",
        "/simulate",
        "/onboarding",
    ],
};
