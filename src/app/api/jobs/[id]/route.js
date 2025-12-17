// import { NextResponse } from "next/server";
// import { connectDB } from "@/lib/mongodb";
// import Job from "@/models/Job";
// import jwt from "jsonwebtoken";
// import mongoose from "mongoose";

// export async function GET(req, context) {
//   try {
//     await connectDB();

//     // ✅ FIX: Properly await params
//     const params = await context.params;
//     const id = params.id;

//     console.log("📍 GET JOB - Received ID:", id);

//     if (!id) {
//       return NextResponse.json({ error: "Job ID is required" }, { status: 400 });
//     }

//     // Try to find by slug first
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       console.log("🔍 Searching by slug:", id);
//       const jobBySlug = await Job.findOne({ slug: id })
//         .populate("employer", "fullName email")
//         .populate("company", "name location website");

//       if (!jobBySlug) {
//         return NextResponse.json({ error: "Job not found" }, { status: 404 });
//       }

//       return NextResponse.json(jobBySlug);
//     }

//     // If valid ObjectId, search by _id
//     console.log("🔍 Searching by ObjectId:", id);
//     const job = await Job.findById(id)
//       .populate("employer", "fullName email")
//       .populate("company", "name location website");

//     if (!job) {
//       return NextResponse.json({ error: "Job not found" }, { status: 404 });
//     }

//     return NextResponse.json(job);
//   } catch (err) {
//     console.error("❌ GET /api/jobs/[id] error:", err);
//     return NextResponse.json(
//       { error: "Failed to fetch job" },
//       { status: 500 }
//     );
//   }
// }

// export async function PUT(req, context) {
//   try {
//     await connectDB();

//     // ✅ FIX: Properly await params
//     const params = await context.params;
//     const id = params.id;

//     console.log("📝 PUT JOB - Received ID:", id);

//     if (!id || !mongoose.Types.ObjectId.isValid(id)) {
//       return NextResponse.json({ error: "Invalid job ID" }, { status: 400 });
//     }

//     // Verify authentication
//     const token = req.cookies.get("token")?.value;
//     if (!token) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     if (decoded.role !== "employer") {
//       return NextResponse.json({ error: "Forbidden" }, { status: 403 });
//     }

//     // Check if job exists and belongs to employer
//     const existing = await Job.findById(id);
//     if (!existing) {
//       return NextResponse.json({ error: "Job not found" }, { status: 404 });
//     }

//     if (String(existing.employer) !== String(decoded.id)) {
//       return NextResponse.json({ error: "Not allowed" }, { status: 403 });
//     }

//     const payload = await req.json();
//     const updated = await Job.findByIdAndUpdate(id, payload, { new: true });

//     console.log("✅ Job updated successfully");
//     return NextResponse.json({ message: "Job updated", job: updated });
//   } catch (err) {
//     console.error("❌ PUT /api/jobs/[id] error:", err);
//     return NextResponse.json(
//       { error: err.message || "Server error" },
//       { status: 500 }
//     );
//   }
// }

// export async function DELETE(req, context) {
//   try {
//     await connectDB();

//     // ✅ FIX: Properly await params
//     const params = await context.params;
//     const id = params.id;

//     console.log("🗑️ DELETE JOB - Received ID:", id);

//     if (!id || !mongoose.Types.ObjectId.isValid(id)) {
//       return NextResponse.json({ error: "Invalid job ID" }, { status: 400 });
//     }

//     // Verify authentication
//     const token = req.cookies.get("token")?.value;
//     if (!token) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     if (decoded.role !== "employer") {
//       return NextResponse.json({ error: "Forbidden" }, { status: 403 });
//     }

//     // Check if job exists and belongs to employer
//     const job = await Job.findById(id);
//     if (!job) {
//       return NextResponse.json({ error: "Job not found" }, { status: 404 });
//     }

//     if (String(job.employer) !== String(decoded.id)) {
//       return NextResponse.json({ error: "Not allowed" }, { status: 403 });
//     }

//     await Job.deleteOne({ _id: id });

//     console.log("✅ Job deleted successfully");
//     return NextResponse.json({ message: "Job deleted successfully" });
//   } catch (err) {
//     console.error("❌ DELETE /api/jobs/[id] error:", err);
//     return NextResponse.json(
//       { error: err.message || "Server error" },
//       { status: 500 }
//     );
//   }
// }
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Job from "@/models/Job";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

// GET single job by ID or slug
export async function GET(req, context) {
  try {
    await connectDB();

    const params = await context.params;
    const id = params.id;

    console.log("📍 GET JOB - Received ID:", id);

    if (!id) {
      return NextResponse.json(
        { error: "Job ID is required" },
        { status: 400 }
      );
    }

    let job;

    // Try to find by slug first (if not a valid ObjectId)
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log("🔍 Searching by slug:", id);
      job = await Job.findOne({ slug: id })
        .populate("employer", "fullName email")
        .populate("company", "name location website logo");
    } else {
      // If valid ObjectId, search by _id
      console.log("🔍 Searching by ObjectId:", id);
      job = await Job.findById(id)
        .populate("employer", "fullName email")
        .populate("company", "name location website logo");
    }

    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    console.log("✅ Job found:", job.title);
    return NextResponse.json(job);
  } catch (err) {
    console.error("❌ GET /api/jobs/[id] error:", err);
    return NextResponse.json(
      { error: "Failed to fetch job" },
      { status: 500 }
    );
  }
}

// PUT - Update job
export async function PUT(req, context) {
  try {
    await connectDB();

    const params = await context.params;
    const id = params.id;

    console.log("📝 PUT JOB - Received ID:", id);

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid job ID" }, { status: 400 });
    }

    // Verify authentication
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "employer") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Check if job exists and belongs to employer
    const existing = await Job.findById(id);
    if (!existing) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    if (String(existing.employer) !== String(decoded.id)) {
      return NextResponse.json({ error: "Not allowed" }, { status: 403 });
    }

    const payload = await req.json();

    // Update job
    const updated = await Job.findByIdAndUpdate(
      id,
      {
        title: payload.title,
        location: payload.location,
        employmentType: payload.employmentType,
        experienceLevel: payload.experienceLevel,
        categories: payload.categories,
        description: payload.description,
        responsibilities: payload.responsibilities,
        requirements: payload.requirements,
        salary: payload.salary,
        logo: payload.logo,
      },
      { new: true }
    ).populate("company", "name location");

    console.log("✅ Job updated successfully");
    return NextResponse.json({ message: "Job updated", job: updated });
  } catch (err) {
    console.error("❌ PUT /api/jobs/[id] error:", err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}

// DELETE job
export async function DELETE(req, context) {
  try {
    await connectDB();

    const params = await context.params;
    const id = params.id;

    console.log("🗑️ DELETE JOB - Received ID:", id);

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid job ID" }, { status: 400 });
    }

    // Verify authentication
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "employer") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Check if job exists and belongs to employer
    const job = await Job.findById(id);
    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    if (String(job.employer) !== String(decoded.id)) {
      return NextResponse.json({ error: "Not allowed" }, { status: 403 });
    }

    await Job.deleteOne({ _id: id });

    console.log("✅ Job deleted successfully");
    return NextResponse.json({ message: "Job deleted successfully" });
  } catch (err) {
    console.error("❌ DELETE /api/jobs/[id] error:", err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}