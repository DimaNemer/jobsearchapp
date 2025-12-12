import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Job from "@/models/Job";
import User from "@/models/User";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    await connectDB();

    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "employer") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const employer = await User.findById(decoded.id).populate("company");
    if (!employer || !employer.company) {
      return NextResponse.json(
        { error: "Employer company not found" },
        { status: 400 }
      );
    }

    const data = await req.json();

    const job = await Job.create({
      ...data,
      employer: employer._id,
      company: employer.company._id,
    });

    return NextResponse.json({ message: "Job created", job });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();

    const jobs = await Job.find({ status: "active" })
      .populate("company", "name location")
      .sort({ createdAt: -1 });

    return NextResponse.json({ jobs });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 });
  }
}
