import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import Job from "@/models/Job";
import Application from "@/models/Application";
import jwt from "jsonwebtoken";

export async function GET(req) {
  try {
    await connectDB();

    // Check admin auth
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") {
      return NextResponse.json({ error: "Admin access only" }, { status: 403 });
    }

    // Get statistics
    const [
      totalUsers,
      totalCandidates,
      totalEmployers,
      totalJobs,
      activeJobs,
      totalApplications,
      pendingApplications,
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ role: "candidate" }),
      User.countDocuments({ role: "employer" }),
      Job.countDocuments(),
      Job.countDocuments({ status: "active" }),
      Application.countDocuments(),
      Application.countDocuments({ status: "pending" }),
    ]);

    return NextResponse.json({
      totalUsers,
      totalCandidates,
      totalEmployers,
      totalJobs,
      activeJobs,
      totalApplications,
      pendingApplications,
    });
  } catch (err) {
    console.error("Admin stats error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}