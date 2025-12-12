import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Job from "@/models/Job";
import User from "@/models/User"; // ensure this path matches your project

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    // Expect an employerId from the client (demo mode)
    const { employerId } = body;
    if (!employerId) {
      return NextResponse.json({ error: "employerId is required" }, { status: 400 });
    }

    // Validate that the user exists and is an employer
    const employer = await User.findById(employerId);
    if (!employer) {
      return NextResponse.json({ error: "Employer not found" }, { status: 404 });
    }
    if (employer.role !== "employer") {
      return NextResponse.json({ error: "Only employers can create jobs" }, { status: 403 });
    }

    // Build job payload; ignore employerId in body when setting employer
    const jobPayload = {
      title: body.title,
      company: body.company,
      location: body.location,
      salary: body.salary,
      image: body.image,
      description: body.description,
      skills: Array.isArray(body.skills) ? body.skills : (body.skills || []).map?.(s => s) || [],
      employer: employer._id,
    };

    const job = await Job.create(jobPayload);
    return NextResponse.json(job, { status: 201 });
  } catch (err) {
    console.error("POST /api/jobs error:", err);
    return NextResponse.json({ error: "Failed to create job" }, { status: 500 });
  }
}