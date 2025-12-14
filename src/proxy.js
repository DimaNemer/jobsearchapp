import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/profile",
        "/admin/:path*",
    ],
};

export async function proxy(request) {
    const token = request.cookies.get("token")?.value;
    const url = request.nextUrl;

    if (!token) {
        url.pathname = "/login";
        return NextResponse.redirect(url);
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Role protection example
        if (url.pathname.startsWith("/dashboard/employer") && decoded.role !== "employer") {
            url.pathname = "/unauthorized";
            return NextResponse.redirect(url);
        }

        return NextResponse.next();
    } catch (err) {
        url.pathname = "/login";
        return NextResponse.redirect(url);
    }
}
