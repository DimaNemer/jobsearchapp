// Create this file: src/app/api/auth/verify/route.js

import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function GET(req) {
  try {
    // Get token from cookies
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "No token found" },
        { status: 401 }
      );
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Return user data (you might want to fetch fresh data from database)
    return NextResponse.json({
      user: {
        id: decoded.id || decoded.userId,
        email: decoded.email,
        role: decoded.role,
        fullName: decoded.fullName,
      },
    });
  } catch (error) {
    console.error("Token verification failed:", error);
    return NextResponse.json(
      { error: "Invalid token" },
      { status: 401 }
    );
  }
}