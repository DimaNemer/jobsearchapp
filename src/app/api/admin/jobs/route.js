// src/app/api/admin/jobs/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Job from "@/models/Job";
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

    // Get all jobs with employer and company details
    const jobs = await Job.find()
      .populate("employer", "fullName email")
      .populate("company", "name")
      .sort({ createdAt: -1 });

    return NextResponse.json({ jobs });
  } catch (err) {
    console.error("Admin jobs fetch error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}