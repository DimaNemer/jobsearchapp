import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import jwt from "jsonwebtoken";

export async function GET(req) {
  try {
    await connectDB();

    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") {
      return NextResponse.json({ error: "Admin access only" }, { status: 403 });
    }

    const users = await User.find()
      .select("-password")
      .populate("company", "name")
      .sort({ createdAt: -1 });

    return NextResponse.json({ users });
  } catch (err) {
    console.error("Admin users fetch error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}