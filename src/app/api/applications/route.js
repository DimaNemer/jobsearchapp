import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Application from "@/models/Application";
import User from "@/models/User";
import Job from "@/models/Job";
import jwt from "jsonwebtoken";

// Submit application (POST)
export async function POST(req) {
  try {
    await connectDB();

    // Check authentication
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized - Please login" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Only candidates can apply
    if (decoded.role !== "candidate") {
      return NextResponse.json(
        { error: "Only candidates can apply for jobs" },
        { status: 403 }
      );
    }

    const { jobId, coverLetter } = await req.json();

    if (!jobId) {
      return NextResponse.json(
        { error: "Job ID is required" },
        { status: 400 }
      );
    }

    // Get candidate with profile and resume
    const candidate = await User.findById(decoded.id);
    if (!candidate) {
      return NextResponse.json(
        { error: "Candidate not found" },
        { status: 404 }
      );
    }

    // Check if profile is complete
    if (!candidate.profile?.firstName || !candidate.profile?.mobile) {
      return NextResponse.json(
        { 
          error: "Please complete your profile before applying",
          missingProfile: true 
        },
        { status: 400 }
      );
    }

    // Check if resume is complete
    if (!candidate.resume?.skills || candidate.resume.skills.length === 0) {
      return NextResponse.json(
        { 
          error: "Please complete your resume before applying",
          missingResume: true 
        },
        { status: 400 }
      );
    }

    // Get job details
    const job = await Job.findById(jobId).populate("employer company");
    if (!job) {
      return NextResponse.json(
        { error: "Job not found" },
        { status: 404 }
      );
    }

    // Check if already applied
    const existingApplication = await Application.findOne({
      job: jobId,
      candidate: decoded.id,
    });

    if (existingApplication) {
      return NextResponse.json(
        { error: "You have already applied for this job" },
        { status: 400 }
      );
    }

    // Create application with snapshots
    const application = await Application.create({
      job: jobId,
      candidate: decoded.id,
      employer: job.employer._id,
      candidateSnapshot: {
        fullName: candidate.fullName,
        email: candidate.email,
        profile: candidate.profile,
        resume: candidate.resume,
      },
      jobSnapshot: {
        title: job.title,
        company: job.company?.name || "N/A",
        location: job.location,
      },
      coverLetter: coverLetter || "",
      status: "pending",
    });

    // Send confirmation email to candidate
    const { sendApplicationConfirmationEmail, notifyEmployerNewApplication } = await import("@/lib/emailService");
    
    await sendApplicationConfirmationEmail({
      candidateEmail: candidate.email,
      candidateName: candidate.fullName,
      jobTitle: job.title,
      companyName: job.company?.name || "Company",
    });

    // Notify employer
    await notifyEmployerNewApplication({
      employerEmail: job.employer.email,
      employerName: job.employer.fullName,
      candidateName: candidate.fullName,
      jobTitle: job.title,
      jobId: job._id,
    });

    return NextResponse.json({
      message: "Application submitted successfully",
      application: {
        _id: application._id,
        status: application.status,
        createdAt: application.createdAt,
      },
    });
  } catch (err) {
    console.error("Application submission error:", err);
    return NextResponse.json(
      { error: "Failed to submit application" },
      { status: 500 }
    );
  }
}

// Get applications (GET)
export async function GET(req) {
  try {
    await connectDB();

    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { searchParams } = new URL(req.url);
    const jobId = searchParams.get("jobId");

    let query = {};

    if (decoded.role === "candidate") {
      // Candidate sees their own applications
      query.candidate = decoded.id;
    } else if (decoded.role === "employer") {
      // Employer sees applications for their jobs
      if (jobId) {
        // Specific job
        query.job = jobId;
        query.employer = decoded.id;
      } else {
        // All their jobs
        query.employer = decoded.id;
      }
    }

    const applications = await Application.find(query)
      .populate("job", "title location employmentType")
      .populate("candidate", "fullName email")
      .sort({ createdAt: -1 });

    return NextResponse.json({ applications });
  } catch (err) {
    console.error("Get applications error:", err);
    return NextResponse.json(
      { error: "Failed to fetch applications" },
      { status: 500 }
    );
  }
}