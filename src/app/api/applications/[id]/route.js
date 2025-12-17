import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Application from "@/models/Application";
import jwt from "jsonwebtoken";

// Get single application
export async function GET(req, context) {
  try {
    await connectDB();

    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id } = await context.params;

    const application = await Application.findById(id)
      .populate("job")
      .populate("candidate", "fullName email")
      .populate("employer", "fullName email");

    if (!application) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      );
    }

    // Check permissions
    if (
      decoded.role === "candidate" &&
      String(application.candidate._id) !== String(decoded.id)
    ) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    if (
      decoded.role === "employer" &&
      String(application.employer._id) !== String(decoded.id)
    ) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json({ application });
  } catch (err) {
    console.error("Get application error:", err);
    return NextResponse.json(
      { error: "Failed to fetch application" },
      { status: 500 }
    );
  }
}

// Update application status (employer only)
export async function PATCH(req, context) {
  try {
    await connectDB();

    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Only employers can update status
    if (decoded.role !== "employer") {
      return NextResponse.json(
        { error: "Only employers can update application status" },
        { status: 403 }
      );
    }

    const { id } = await context.params;
    const { status, notes } = await req.json();

    if (!["pending", "reviewed", "accepted", "rejected"].includes(status)) {
      return NextResponse.json(
        { error: "Invalid status" },
        { status: 400 }
      );
    }

    const application = await Application.findById(id);

    if (!application) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      );
    }

    // Check if this employer owns the application
    if (String(application.employer) !== String(decoded.id)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Update application
    application.status = status;
    if (notes) application.notes = notes;
    await application.save();

    // Send email notification to candidate
    const { sendApplicationStatusEmail } = await import("@/lib/emailService");
    
    // Populate employer data for email
    const populatedApp = await Application.findById(application._id)
      .populate("employer", "fullName email")
      .populate("job", "title");
    
    await sendApplicationStatusEmail({
      candidateEmail: application.candidateSnapshot.email,
      candidateName: application.candidateSnapshot.fullName,
      jobTitle: populatedApp.job.title,
      companyName: application.jobSnapshot.company,
      status: status,
      employerEmail: populatedApp.employer.email,
    });

    return NextResponse.json({
      message: "Application updated successfully",
      application,
    });
  } catch (err) {
    console.error("Update application error:", err);
    return NextResponse.json(
      { error: "Failed to update application" },
      { status: 500 }
    );
  }
}