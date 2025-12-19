// src/app/api/admin/jobs/[id]/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Job from "@/models/Job";
import Application from "@/models/Application";
import jwt from "jsonwebtoken";

export async function DELETE(req, context) {
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

    const { id } = await context.params;

    // Delete all applications for this job
    await Application.deleteMany({ job: id });

    // Delete the job
    await Job.deleteOne({ _id: id });

    return NextResponse.json({ message: "Job deleted successfully" });
  } catch (err) {
    console.error("Admin delete job error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PATCH(req, context) {
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

    const { id } = await context.params;
    const { status } = await req.json();

    const job = await Job.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    return NextResponse.json({ job });
  } catch (err) {
    console.error("Admin update job error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}