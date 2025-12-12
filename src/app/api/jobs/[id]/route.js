import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Job from "@/models/Job";
import mongoose from "mongoose";

export async function GET(req, { params }) {
  try {
    await connectDB();

    const { id } = params;

    // Allow numeric ids only if you use numeric ids; this app uses Mongo ObjectIds
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid job ID" }, { status: 400 });
    }

    const job = await Job.findById(id).populate("employer", "fullName email");
    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    return NextResponse.json(job);
  } catch (err) {
    console.error(`GET /api/jobs/${params?.id} error:`, err);
    return NextResponse.json({ error: "Failed to fetch job" }, { status: 500 });
  }
}